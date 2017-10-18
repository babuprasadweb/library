var mongoose = require('mongoose');
var schema = mongoose.Schema;
var moment = require('moment');

var bookInstanceSchema = schema({
    book: {type: schema.ObjectId, ref: 'Book', required: true},
    imprint : {type: String, required: true},
    status: {type: String, required: true, enum : ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_date: {type:Date, default: Date.now}
});

//Virtual for bookinstance for url
bookInstanceSchema.virtual('url').get(function(){return '/catalog/bookinstance/'+ this._id});

//Virtual property for due_date
bookInstanceSchema.virtual('formatted_due_date').get(function(){
    return moment(this.due_date).format('MMM Do, YYYY');
});
//Export module
module.exports = mongoose.model('BookInstance', bookInstanceSchema);