const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const anecdoteSchema = new Schema({
	content: {
		type: String,
		required: true,
		minlength: 5
	},
	id: {
		type: String,
		required: true,
	},
	votes: {
		type: Number || 0,
		required: true,
	},
},);

anecdoteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Anecdote', anecdoteSchema);