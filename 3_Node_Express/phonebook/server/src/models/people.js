const mongoose = require('mongoose')
require('dotenv').config()

// eslint-disable-next-line no-undef
const uri = process.env.MONGODB_URI

mongoose.connect(uri).then(() => console.log('Connected'))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    phone: {
        type: String,
        minLength: 9,
        validate: {
            validator: function (v) {
                return /^0[0-9]-\d/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

