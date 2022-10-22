const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config()
const People = require('./src/models/people');

const app = express();
morgan.token('info', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.info(req, res),
    ].join(' ')
}))
app.use(express.json())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/api/persons/:id', async (req, res) => {
    const id = req.params.id;
    await People.findById(id).then(person => {
        res.json(person)
    })
})

app.get('/api/persons', async (req, res) => {
    await People.find({}).then(people => {
        res.json(people)
    })
})

app.get('/info', async (req, res) => {
    // (async () => {
    const date = new Date()
    await People.find({}).then(people => {
        res.send(`<div><p>Phonebook has info for ${people.length} people</p><p>${date}</p></div>`)
    });
    // })()
})

app.delete('/api/persons/:id', async (req, res) => {
    const id = req.params.id;
    await People.findByIdAndDelete(id)
    res.status(200).json('This person has been deleted')
})

app.put('/api/persons/:id', async (req, res) => {
    const id = req.params.id;
    const person = await People.findById(id)
    if (!person) res.status(403).json("Invalid id, we can't find this person")

    if (person.name === req.body.name && person.phone === req.body.phone) {
        res.status(304).
            return;
    }
    await People.findByIdAndUpdate(
        id,
        {
            $set: req.body
        }
    )
    res.status(200).json("Updated successully!");
})

app.post('/api/persons', async (req, res) => {
    const { name, phone } = req.body;
    let nameCheck = await People.findOne({ name })

    if (!name) {
        return res.status(404).json({
            error: "Name is missing"
        })
    } else if (!phone) {
        return res.status(404).json({
            error: "Phone is missing"
        })
    }
    else if (nameCheck) {
        return res.status(404).json({
            error: "This name has been taken already"
        })
    }

    const person = new People({
        "name": name,
        "phone": phone,
        "date": new Date()
    })
    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// https://secret-shore-30720.herokuapp.com/