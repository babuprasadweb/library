var author = require('../models/authorMod');
var book   = require('../models/bookMod');
var async  = require('async');

//diplay list of all authors
exports.author_list = function(req, res, next){
    author.find().sort([['family_name', 'ascending']]).exec(function(err, results){
        if(err) { return next(err); }
        //successful then return the result
        res.render('author_list', {title: 'Author list', author_list : results});
    });
};

//diplay list of all author detauks
exports.author_details = function(req, res, next){
    async.parallel({
        author: function(callback){
            author.findById(req.params.id).exec(callback);
        },
        author_books: function(callback){
            book.find({'author': req.params.id}, 'title summary').exec(callback);
        }

    }, function(err,result){
        if(err) {
            return next(err);
        }
        res.render('author_detail',{title: 'Author :', author: result.author, author_books: result.author_books});
    });
};

exports.author_create_get = function(req,res){
    res.render('author_form', {tilte : 'Create Author form'});
};

exports.author_create_post = function(req,res,next){
    req.checkBody('first_name', 'First name must be provided').notEmpty();
    req.checkBody('family_name', 'Family name must be provided').notEmpty();
    req.checkBody('family_name', 'Family name must be alpha-numeric').isAlpha();

    req.sanitize('first_name').escape();
    req.sanitize('family_name').escape();
    req.sanitize('first_name').trim();
    req.sanitize('family_name').trim();
    req.sanitize('date_of_birth').toDate();

    var errors = req.validationErrors();

    var author_obj = new author({
        first_name : req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth : req.body.date_of_birth
    });

    if(errors) { 
        res.render('author_form', {title: 'Create Author', author: author_obj, errors: errors}); 
    }
    else {
        //Data form is valid
        author_obj.save(function(err){
            if (err) {return next(err); }
            //successful - redirect to new author created record
            res.redirect(author_obj.url);
        });
    }
};

exports.author_delete_get = function(req, res, next) {
    async.parallel({
        author: function(callback) {
            author.findById(req.params.id).exec(callback);
        },
        author_books : function(callback) {
            book.find({'author': req.params.id}).exec(callback);
        }
    }, function(err,results){
        if(err) {return next(err); }
        res.render('author_delete',{title: 'Delete Author', author:results.author, author_books: results.author_books});
    });
};

exports.author_delete_post = function(req, res, next){
    req.checkBody('authorid', 'Author id must exist').notEmpty();
    async.parallel({
        author : function(callback) {
            author.findById(req.body.authorid).exec(callback);
        },
        author_books : function(callback) {
            book.find({'author': req.body.authorid}, 'title summary').exec(callback);
        }
    },function(err, results){
        if (err) { return next(err); }
        //success
        if(results.author_books.length > 0) {
            res.render('author_delete',{title: 'Delete Author', author: results.author, author_books: results.author_books});
        }
        else {
            author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err){
                if(err) {return next(err); }
                res.redirect('/catalog/authors');
            });
        }
    });
};

exports.author_update_get = function(req,res){
    res.send('Not Implemented Author update get' + req.params.id);
};

exports.author_update_post = function(req,res){
    res.send('Not Implemented Author update post' + req.params.id);
};
