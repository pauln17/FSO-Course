require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

// const generateId = () => {
//     const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
//     return maxId + 1
// }

app.get('/', (request, response) => {
    response.send('')
})

app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString()
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const entries = persons.length

    // response.send(`
    //     <div><p>Phonebook has info for ${entries} people</p></div>
    //     <div><p>${currentDate} ${timeZone}</p></div>
    // `)

    Person
        .find({})
        .then(people => {
            response.send(`
                <div><p>Phonebook has info for ${people.length} people</p></div>
                <div><p>${currentDate} ${timeZone}</p></div>
            `)
        })
        .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
    // response.json(persons)

    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id)
    // const person = persons.find(person => person.id === id)

    // if (person) {
    //     response.json(person)
    // } else {
    //     response.status(404).end()
    // }

    Person
        .findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // const person = persons.filter(person => person.id !== id)

    // response.json(person)

    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    // const personExists = persons.some(person => person["name"] === String(body.name))
    // if (personExists) {
    //     return response.status(409).json({
    //         error: 'person already exists in the phonebook'
    //     })
    // }

    // const person = {
    //     id: generateId(),
    //     name: body.name,
    //     number: body.number
    // }

    // persons = persons.concat(person)
    // response.json(person)

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)