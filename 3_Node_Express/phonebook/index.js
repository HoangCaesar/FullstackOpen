const express = require('express');
const morgan = require('morgan'); const cors = require('cors')

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

let data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/api/persons', (req, res) => {
    res.send(data)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = data.find(data => data.id === id);

    if (person) {
        res.send(`<div><p>Name: ${person.name}</p><p>Number: ${person.number}</p><p>ID: ${person.naidme}</p></div>`)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const entries = data.length;
    const date = new Date()
    res.send(`<div><p>Phonebook has info for ${entries} people</p><p>${date}</p></div>`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    data = data.filter(data => data.id !== id);
    res.status(204).end();
})

app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    data = data.filter(item => item.id !== id);
    data = data.concat(req.body);
    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const nameCheck = data.find(data => data.name === body.name)

    if (!body.name) {
        return res.status(404).json({
            error: "Name is missing"
        })
    } else if (!body.number) {
        return res.status(404).json({
            error: "Number is missing"
        })
    } else if (nameCheck) {
        return res.status(404).json({
            error: "This name has been taken already"
        })
    }

    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number
    }
    data = data.concat(person)
    res.send(person)
})

const generateId = () => {
    const max = Math.max(...data.map(data => data.id))
    const id = Math.floor(Math.random() * max) + max + 1;
    return id;
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('webapp/dist')),
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "webapp", "dist", "index.html"));
        })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})