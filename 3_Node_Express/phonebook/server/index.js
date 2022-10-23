const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const People = require('./src/models/people')

const app = express()
morgan.token('info', function (req) { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
        tokens.info(req, res),
    ].join(' ')
}))
app.use(express.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('dist'))

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/dist/index.html')
// })

app.get('/api/persons/:id', async (req, res, next) => {
    const id = req.params.id
    await People.findById(id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/api/persons', async (req, res, next) => {
    await People.find({}).then(people => {
        res.json(people)
    }).catch(error => next(error))
})

app.get('/info', async (req, res, next) => {
    const date = new Date()
    await People.find({}).then(people => {
        res.send(`<div><p>Phonebook has info for ${people.length} people</p><p>${date}</p></div>`)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', async (req, res, next) => {
    const id = req.params.id
    await People.findByIdAndDelete(id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', async (req, res, next) => {
    const id = req.params.id
    const person = await People.findById(id).catch(error => next(error))
    if (!person) {
        res.status(403).json('Wrong id, we cant find this person')
        return
    }
    if (person.name === req.body.name && person.phone === req.body.phone) {
        res.status(304).json('Nothing changed!')
        return
    }
    await People.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true, context: 'query' })
        .then(() => {
            res.status(200).json('Updated successully!')
        })
        .catch(error => next(error))
})

app.post('/api/persons', async (req, res, next) => {
    const { name, phone } = req.body
    let nameCheck = await People.findOne({ name })

    if (nameCheck) {
        return res.status(400).json({
            error: 'This name has been taken already'
        })
    }

    const person = new People({
        name,
        phone,
        'date': new Date()
    })

    person
        .save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// https://secret-shore-30720.herokuapp.com/