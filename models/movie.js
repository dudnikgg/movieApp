

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var movieSchema=new Schema({
	id:'Number',
    title:'String',
    releaseYear:'String',
    director:'String',
    genre:'String',
    image:'String',
    description: 'String'
});

module.exports=mongoose.model('Movie',movieSchema);