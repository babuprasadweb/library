var express = require('express');
var router  = express.Router();

var author_controller = require ('../controllers/authorCtrl');

//list author
router.get('/catalog/author/list', author_controller.author_list);

//Get single author details
router.get('/catalog/author/:id', author_controller.author_details);

//Create author
router.get('/catalog/author/create', author_controller.author_create_get);
router.post('/catalog/author/create', author_controller.author_create_post);

//Update author
router.get('/catalog/author/:id/update', author_controller.author_update_get);
router.post('/catalog/author/:id/update', author_controller.author_update_post);

//Delete author
router.get('/catalog/author/:id/delete', author_controller.author_delete_get);
router.post('/catalog/author/:id/delete', author_controller.author_delete_post);

module.exports = router;