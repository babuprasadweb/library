var express = require('express');
var router = express.Router();

// Require controller modules
var book_controller = require('../controllers/bookCtrl');
var author_controller = require('../controllers/authorCtrl');
var genre_controller = require('../controllers/genreCtrl');
var book_instance_controller = require('../controllers/bookInstanceCtrl');


/// BOOK ROUTES ///

/* GET catalog home page. */
router.get('/catalog', book_controller.index);

/* GET request for creating a Book. NOTE This must come before routes that display Book (uses id) */
router.get('/catalog/book/create', book_controller.book_create_get);

/* POST request for creating Book. */
router.post('/catalog/book/create', book_controller.book_create_post);

/* GET request to delete Book. */
router.get('/catalog/book/:id/delete', book_controller.book_delete_get);

// POST request to delete Book
router.post('/catalog/book/:id/delete', book_controller.book_delete_post);

/* GET request to update Book. */
router.get('/catalog/book/:id/update', book_controller.book_update_get);

// POST request to update Book
router.post('/catalog/book/:id/update', book_controller.book_update_post);

/* GET request for one Book. */
router.get('/catalog/book/:id', book_controller.book_details);

/* GET request for list of all Book items. */
router.get('/catalog/books', book_controller.book_list);

/// AUTHOR ROUTES ///

/* GET request for creating Author. NOTE This must come before route for id (i.e. display author) */
router.get('/catalog/author/create', author_controller.author_create_get);

/* POST request for creating Author. */
router.post('/catalog/author/create', author_controller.author_create_post);

/* GET request to delete Author. */
router.get('/catalog/author/:id/delete', author_controller.author_delete_get);

// POST request to delete Author
router.post('/catalog/author/:id/delete', author_controller.author_delete_post);

/* GET request to update Author. */
router.get('/catalog/author/:id/update', author_controller.author_update_get);

// POST request to update Author
router.post('/catalog/author/:id/update', author_controller.author_update_post);

/* GET request for one Author. */
router.get('/catalog/author/:id', author_controller.author_details);

/* GET request for list of all Authors. */
router.get('/catalog/authors', author_controller.author_list);

/// GENRE ROUTES ///

/* GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id) */
router.get('/catalog/genre/create', genre_controller.genre_create_get);

/* POST request for creating Genre. */
router.post('/catalog/genre/create', genre_controller.genre_create_post);

/* GET request to delete Genre. */
router.get('/catalog/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre
router.post('/catalog/genre/:id/delete', genre_controller.genre_delete_post);

/* GET request to update Genre. */
router.get('/catalog/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre
router.post('/catalog/genre/:id/update', genre_controller.genre_update_post);

/* GET request for one Genre. */
router.get('/catalog/genre/:id', genre_controller.genre_details);

/* GET request for list of all Genre. */
router.get('/catalog/genres', genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///

/* GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id) */
router.get('/catalog/bookinstance/create', book_instance_controller.bookInstance_create_get);

/* POST request for creating BookInstance. */
router.post('/catalog/bookinstance/create', book_instance_controller.bookInstance_create_post);

/* GET request to delete BookInstance. */
router.get('/catalog/bookinstance/:id/delete', book_instance_controller.bookInstance_delete_get);

// POST request to delete BookInstance
router.post('/catalog/bookinstance/:id/delete', book_instance_controller.bookInstance_delete_post);

/* GET request to update BookInstance. */
router.get('/catalog/bookinstance/:id/update', book_instance_controller.bookInstance_update_get);

// POST request to update BookInstance
router.post('/catalog/bookinstance/:id/update', book_instance_controller.bookInstance_update_post);

/* GET request for one BookInstance. */
router.get('/catalog/bookinstance/:id', book_instance_controller.bookInstance_details);

/* GET request for list of all BookInstance. */
router.get('/catalog/bookinstances', book_instance_controller.bookInstance_list);

module.exports = router;