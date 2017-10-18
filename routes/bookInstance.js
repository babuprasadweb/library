var express = require('express');
var router  = express.Router();

var bookInstance_controller = require ('../controllers/bookInstanceCtrl');

//list bookInstance
router.get('/catalog/bookInstance/list', bookInstance_controller.bookInstance_list);

//Get single bookInstance details
router.get('/catalog/bookInstance/:id', bookInstance_controller.bookInstance_details);

//Create bookInstance
router.get('/catalog/bookInstance/create', bookInstance_controller.bookInstance_create_get);
router.post('/catalog/bookInstance/create', bookInstance_controller.bookInstance_create_post);

//Update bookInstance
router.get('/catalog/bookInstance/:id/update', bookInstance_controller.bookInstance_update_get);
router.post('/catalog/bookInstance/:id/update', bookInstance_controller.bookInstance_update_post);

//Delete bookInstance
router.get('/catalog/bookInstance/:id/delete', bookInstance_controller.bookInstance_delete_get);
router.post('/catalog/bookInstance/:id/delete', bookInstance_controller.bookInstance_delete_post);

module.exports = router;