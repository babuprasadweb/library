var mongoose = require('mongoose');
var schema = mongoose.Schema;
var moment = require('moment');

var authorSchema = schema({
    first_name : {type: String, required:true, max: 100},
    family_name : {type:String, required: true, max: 100},
    date_of_birth : {type:Date},
    date_of_death : {type:Date}
});

//virtual name is a name that is not stored in database
authorSchema.virtual('name').get(function(){
    return this.first_name + ' ' +this.family_name;
});

//virtual url is the url that is not store in database and every author has one
authorSchema.virtual('url').get(function(){
    return '/catalog/author/'+ this._id;
});

authorSchema.virtual('fomatted_date_of_birth').get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('DD-MM-YYYY') : '';
});

authorSchema.virtual('formatted_date_of_death').get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('DD-MM-YYYY') : '';
});

//Export author model
module.exports = mongoose.model('Author', authorSchema);