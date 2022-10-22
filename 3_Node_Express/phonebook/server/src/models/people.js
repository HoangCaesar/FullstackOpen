const mongoose = require('mongoose')
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri).then(res => console.log("Connected"))

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: Date,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema);

