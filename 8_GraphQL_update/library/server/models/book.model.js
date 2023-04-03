const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaOptions = require('./schemaOptions');

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
        },
        published: {
            type: Number,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            // required: true,
            default: null
        },
        id: {
            type: String,
            required: true,
        },
        genres: [{ type: String, required: true }],
    },
    schemaOptions
);

module.exports = mongoose.model('Book', bookSchema);
