var mongoose = require('mongoose');
var schema = mongoose.Schema;

var genereSchema = schema({
    name: {type: String, required : true, max: 300}
});

genereSchema.virtual('url').get(function(){
    return '/catalog/genre/'+ this._id;
});

// Export mongoose model
module.exports = mongoose.model('Genre', genereSchema);