const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
	title: {
		type: String,
		required: true,
		minlength: 5
	},
	author: {
		type: String,
		required: true,
		minlength: 5
	},
	url: {
		type: String,
		required: true
	},
	likes: {
		type: Number || 0
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	date: {
		type: Date,
		required: true
	},
},);

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Blog', blogSchema);