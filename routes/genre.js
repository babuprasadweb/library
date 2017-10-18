var express = require('express');
var router  = express.Router();

var genre_controller = require ('../controllers/genreCtrl');

//list genre
router.get('/catalog/genre/list', genre_controller.genre_list);

//Get single genre details
router.get('/catalog/genre/:id', genre_controller.genre_details);

//Create genre
router.get('/catalog/genre/create', genre_controller.genre_create_get);
router.post('/catalog/genre/create', genre_controller.genre_create_post);

//Update genre
router.get('/catalog/genre/:id/update', genre_controller.genre_update_get);
router.post('/catalog/genre/:id/update', genre_controller.genre_update_post);

//Delete genre
router.get('/catalog/genre/:id/delete', genre_controller.genre_delete_get);
router.post('/catalog/genre/:id/delete', genre_controller.genre_delete_post);

module.exports = router;