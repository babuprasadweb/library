var book = require('../models/bookMod');
var author = require('../models/authorMod');
var genre  = require('../models/genreMod');
var bookInstance = require('../models/bookInstanceMod');

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        book_count: function(callback) {
            book.count(callback);
        },
        book_instance_count: function(callback) {
            bookInstance.count(callback);
        },
        book_instance_available_count: function(callback) {
            bookInstance.count({status:'Available'}, callback);
        },
        author_count: function(callback){
            author.count(callback);
        },
        genre_count: function(callback){
            genre.count(callback);
        },
    }, function(err, results) {
        res.render('index',{title: 'Library Home', error: err, data: results});
    } );
};

//diplay list of all books
exports.book_list = function(req, res, next){
    book.find().populate('author').exec(function(err, list_books){
        if(err){ 
            return next(err);
        }
        res.render('book_list', {title: 'Book List', book_list: list_books});
    } );
};

//diplay list of all book detauks
exports.book_details = function(req, res, next){
    async.parallel({
        book: function(callback) {
            book.findById(req.params.id).populate('author').populate('genre').exec(callback);
        },
        bookinstance: function(callback) {
            bookInstance.find({'book': req.params.id}).exec(callback);
        }
    },
    function(err, result){
        if(err) {
            return next(err);
        }
        res.render('book_detail', {title: 'Book Details', book: result.book, bookinstance: result.bookinstance});
    });
};

exports.book_create_get = function(req, res, next){
    //Get all authors and genres, which we can use while creating our new book
    async.parallel({
        authors: function(callback) {
            author.find(callback);
        },
        genres : function(callback){
            genre.find(callback);
        }
    }, function(err, results){
        if (err) { return next(err); }
        res.render('book_form', {title: 'Create Book', authors: results.authors, genres: results.genres});
    }
    );
};

exports.book_create_post = function(req, res, next){
    req.checkBody('title', 'Title must not be empty').notEmpty();
    req.checkBody('author', 'Author must not be empty').notEmpty();
    req.checkBody('summary', 'Summary must not be empty').notEmpty();
    req.checkBody('isbn', 'ISBN must not be empty').notEmpty();
    req.sanitize('title').escape();
    req.sanitize('author').escape();
    req.sanitize('summary').escape();
    req.sanitize('isbn').escape();
    req.sanitize('title').trim();     
    req.sanitize('author').trim();
    req.sanitize('summary').trim();
    req.sanitize('isbn').trim();

    var book_obj = new book ({
        title : req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre.split(",")
    });
    console.log('Book :'+ book_obj);

    var errors = req.validationErrors();
    if(errors) {
        //some problems detected, so need to rerender the form

        //get all authors and genres for form
        aysnc.parallel({
            authors : function(callback) {
                author.find(callback);
            },
            genres: function(callback) {
                genre.find(callback);
            }
        },function(err, results) {
            if(err) { return next(err); }

            //mark our selected genres as checked
            for(i=0; i<results.genres.length; i++){
                if(book_ojb.genre.indexOf(results.genres[i]._id) > -1) {
                    //Current genre is selected, set "checked" flag
                    results.genres[i].checked='true';
                }
            }
            res.render('book_form',  {title: 'Create Book', authors: results.author, genres: results.genres, errors: errors})
        });
    }
    else {
        //data form is valid
        book_obj.save(function(err){
            if(err) { return next(err); }

            //return to the book detail url
            res.redirect(book_obj.url);
        })
    }
};

exports.book_delete_get = function(req, res, next) {
    book.findById(req.params.id).exec(function(err,results){
        if(err) {return next(err); }
        res.render('book_delete',{title: 'Delete Book ', book:results});
    });
};

exports.book_delete_post = function(req, res, next){
    req.checkBody('bookid', 'Book id should not be empty').notEmpty();
    book.findByIdAndRemove(req.body.bookid, function(err){
        if(err) {return next(err); }
        res.redirect('/catalog/books');
    });
};

exports.book_update_get = function(req, res, next){
    req.sanitize('id').escape();
    req.sanitize('id').trim();

    //Get book, author and genre for form
    async.parallel({
        book: function(callback){
            book.findById(req.params.id).populate('author').populate('genre').exec(callback);
        },
        authors: function(callback){
            author.find({}).exec(callback);
        },
        genres: function(callback){
            genre.find({}).exec(callback);
        }
    }, function(err,results){
        if(err) { return next(err); }

        //Mark our selected genres as checked
        for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
            for (var book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
                if (results.genres[all_g_iter]._id.toString()==results.book.genre[book_g_iter]._id.toString()) {
                    results.genres[all_g_iter].checked='true';
                }
            }
        }
        res.render('book_update', {title: 'Update Book', book:results.book, authors:results.authors, genres:results.genres});
    });
};

//Handle update requests
exports.book_update_post = function(req, res, next){

    //Sanitize id passed in. 
    req.sanitize('id').escape();
    req.sanitize('id').trim();
    
    //Check other data
    req.checkBody('title', 'Title must not be empty.').notEmpty();
    req.checkBody('author', 'Author must not be empty').notEmpty();
    req.checkBody('summary', 'Summary must not be empty').notEmpty();
    req.checkBody('isbn', 'ISBN must not be empty').notEmpty();
    
    req.sanitize('title').escape();
    req.sanitize('author').escape();
    req.sanitize('summary').escape();
    req.sanitize('isbn').escape();
    req.sanitize('title').trim();
    req.sanitize('author').trim(); 
    req.sanitize('summary').trim();
    req.sanitize('isbn').trim();
    req.sanitize('genre').escape();

    var book_obj = new book ({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: (typeof req.body.genre ==='undefined') ? [] : req.body.genre.split(","),
        _id: req.params.id
    });

    var errors = req.validationErrors();
    if(errors){
        //Re-render book with error
        async.parallel({
            authors: function(callback){
                authors.find(callback);
            },
            genres: function(callback){
                genres.find(callback);
            }
        },function(err,results){
            if(err) { return next(err); }

            //mark our selected genres as checked
            for(i=0; i<results.genres.length; i++){
                if(book.genre.indexOf(results.genres[i]._id) > -1) {
                    results.genre[i].checked= 'true';
                }
            }
            res.render('book_update', {title: 'Update Book', authors:results.authors, genres:results.genres, book: book, errors:errors});
        });
    }
    else {
        book.findByIdAndUpdate(req.params.id, book, {}, function(err,thebook) {
            if(err) { return next(err); }

            //successful - redirect to book detail page
            res.redirect(thebook.url);
        });
    }
};
