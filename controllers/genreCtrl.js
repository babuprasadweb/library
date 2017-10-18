var genre = require('../models/genreMod');
var book  = require('../models/bookMod');
var async = require('async');

//diplay list of all genres
exports.genre_list = function(req, res, next){
    genre.find().sort([['name', 'ascending']]).exec(function(err, result){
        if(err) { 
            return next(err); 
        }
        res.render('genre_list', {title: 'Genre List', genre_list: result});
    });
};

//diplay details page for each specific genre selected
exports.genre_details = function(req, res, next){
    async.parallel(
        {
            each_genre: function(callback) {
                genre.findById(req.params.id).exec(callback);
            },
            genre_books: function(callback){
                book.find({'genre': req.params.id}).exec(callback);
            },

        },function(err, result){
            if(err) {
                return next(err);
            }
            res.render('genre_detail', {title : 'Genre Detail', each_genre: result.each_genre, genre_books:result.genre_books} )
        }
    );
};

exports.genre_create_get = function(req, res, next){
    res.render('genre_form',{title: 'Create Genre'});
};

exports.genre_create_post = function(req, res, next){
    //chck that the field is not empty
    req.checkBody('name', 'Genre name required').notEmpty();

    //trim and escape the name field
    req.sanitize('name').escape();
    req.sanitize('name').trim();

    //run the validators
    var errors = req.validationErrors();

    //create a Genre with trimmed and escaped data
    var genre_obj = new genre(
        {name : req.body.name}
    );

    if(errors) {
        //If there are errors then render the form again, passing the previously entered values and errors
        res.render('genre_form', {title: 'Create Genre', genre : genre_obj, errors: errors});
        return;
    }
    else {
        //Data from form is valid
        //Check with Genre with same name exists
        genre.findOne({'name': req.body.name}).exec(function(err, found_genre){
            console.log('found genre: '+ found_genre);
            if(err) { return next(err); }
            if(found_genre) {
                //genre exists -- so redirect to its detail page
                res.redirect(found_genre.url);
            }
            else {
                genre_obj.save(function(err){
                    if(err) {return next(err);}
                    // genre saved in DB
                    res.redirect(genre.url);
                });
            }
        });
    }
};

exports.genre_delete_get = function(req,res) {
    genre.findById(req.params.id).exec(function(err,results){
        if(err) {return next(err); }
        res.render('genre_delete',{title: 'Genre Book ', genre:results});
    });
};

exports.genre_delete_post = function(req,res){
    req.checkBody('genreid', 'Genre id should not be empty').notEmpty();
    genre.findByIdAndRemove(req.body.genreid, function(err){
        if(err) {return next(err); }
        res.redirect('/catalog/genres');
    });
};

exports.genre_update_get = function(req,res){
    res.send('Not Implemented genre update get' + req.params.id);
};

exports.genre_update_post = function(req,res){
    res.send('Not Implemented genre update post' + req.params.id);
};
