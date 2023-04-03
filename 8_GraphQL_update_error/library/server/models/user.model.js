const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaOptions = require('./schemaOptions');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
        favoriteGenre: {
            type: String,
            required: true,
            default: null,
        },
        id: {
            type: String,
            required: true,
        },
    },
    schemaOptions
);

module.exports = mongoose.model('User', userSchema);
