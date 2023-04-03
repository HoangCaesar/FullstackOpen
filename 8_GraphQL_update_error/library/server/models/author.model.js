const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaOptions = require('./schemaOptions');

const authorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 4,
        },
        id: {
            type: String,
        },
        born: {
            type: Number || null,
            default: null
        },
        bookCount: {
            type: Number,
            default: null
        }

    },
    schemaOptions
);

module.exports = mongoose.model('Author', authorSchema);
