var bookInstance = require('../models/bookInstanceMod');
var book = require('../models/bookMod');

//diplay list of all bookInstances
exports.bookInstance_list = function(req, res, next){
    bookInstance.find().populate('book').exec(function(err, list_book_instances){
        if(err){
            return next(err);
        }
        console.log('book'+list_book_instances);
        res.render('bookInstance_list',{ title : 'Book Instances', list_book_instances: list_book_instances});
    });
};

//diplay list of all bookInstance detauks
exports.bookInstance_details = function(req, res, next){
    bookInstance.findById(req.params.id)
    .populate('book')
    .exec(function(err,result){
        if(err) {
            return next(err);
        }
        res.render('bookinstance_detail',{title:'Book', bookinstance: result});
    });
};

exports.bookInstance_create_get = function(req, res, next){
    // Display all books
    book.find({}, 'title').exec(function(err,results){
        if(err) { return next(err); }
        res.render('bookinstance_form', {title: 'Create Bookinstance', book_list:results })
    });
};

exports.bookInstance_create_post = function(req, res, next){
    req.checkBody('book', 'Book must be specified').notEmpty();
    req.checkBody('imprint', 'Imprint must be specified').notEmpty();

    req.sanitize('book').escape();
    req.sanitize('imprint').escape();
    req.sanitize('status').escape();
    req.sanitize('book').trim();
    req.sanitize('imprint').trim();   
    req.sanitize('status').trim();
    req.sanitize('due_back').toDate();
    
    var bookinstance_obj = new bookInstance ({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_date: req.body.due_date
    });

    var errors = req.validationErrors();
    if(errors) {
        book.find({}, 'title').exec(function(err, results){
            if(err) {return next(err); }
            res.render('bookinstance_form', {title: 'Create Bookinstance', book_list: results, selected_book: bookinstance_obj.book._id, errors: errors, bookinstance: bookinstance_obj });
        })
    }
    else {
        //save the object
        bookinstance_obj.save(function(err){
            if(err) {return next(err); }
            //on-successful redirect to new book-instance record
            res.redirect(bookinstance_obj.url);
        });
    }
};

exports.bookInstance_delete_get = function(req,res) {
    bookInstance.findById(req.params.id).exec(function(err,results){
        if(err) {return next(err); }
        res.render('bookinstance_delete', {title: 'Delete BookInstance', bookinstance: results});
    });
};

exports.bookInstance_delete_post = function(req,res){
    req.checkBody('bookinstanceid', 'Book Instance id should not be empty').notEmpty();
    book.findByIdAndRemove(req.body.bookinstanceid, function(err){
        if(err) {return next(err); }
        res.redirect('/catalog/bookinstances');
    });
};

exports.bookInstance_update_get = function(req,res){
    res.send('Not Implemented bookInstance update get' + req.params.id);
};

exports.bookInstance_update_post = function(req,res){
    res.send('Not Implemented bookInstance update post' + req.params.id);
};
