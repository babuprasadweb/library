
var mongoose = require('mongoose');
var schema   = mongoose.Schema;

var BookSchema = schema({
    title:  {type:String, required:true, max:200},
    author: {type:schema.ObjectId, ref:'Author', required: true},
    isbn : {type:String, required :true},
    summary:{type:String},
    genre: [{type:schema.ObjectId, ref:'Genre'}]
});

BookSchema.virtual('url').get(function(){
    return '/catalog/book/'+ this._id;
});

//export the db module
module.exports = mongoose.model('Book', BookSchema);