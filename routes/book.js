var express = require('express');
var router  = express.Router();

var book_controller = require ('../controllers/bookCtrl');

//list book
router.get('/catalog/book', book_controller.book_list);

//Get single book details
router.get('/catalog/book/:id', book_controller.book_details);

//Create book
router.get('/catalog/book/create', book_controller.book_create_get);
router.post('/catalog/book/create', book_controller.book_create_post);

//Update book
router.get('/catalog/book/:id/update', book_controller.book_update_get);
router.post('/catalog/book/:id/update', book_controller.book_update_post);

//Delete book
router.get('/catalog/book/:id/delete', book_controller.book_delete_get);
router.post('/catalog/book/:id/delete', book_controller.book_delete_post);

module.exports = router;