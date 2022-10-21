const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Caesar:${password}@cluster0.xntkwfm.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: Date,
})

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        if (process.argv.length == 5) {
            const person = new Person({
                name: process.argv[3],
                phone: process.argv[4],
                date: new Date(),
            })
            console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
            return person.save()
        } else if (process.argv.length == 4) {
            console.log('Please enter enough information, missing password/name/phonenumber')
            return;
        } else if (process.argv.length > 5) {
            console.log('You enter too many information, please enter info adhere the format: password name phone')
            return;
        }
        Person
            .find({})
            .then(persons => {
                console.log("phonebook:")
                persons.forEach(person => console.log(`${person.name} ${person.phone}`))
                mongoose.connection.close();
            })
    })
    .then(() => {
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))