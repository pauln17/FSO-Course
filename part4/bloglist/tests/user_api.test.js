const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('verify user info fetched is valid', () => {
    test('proper amount of users returned', async () => {
        const response = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialUsers.length)
    })
})

describe('post requests', () => {
    test('verify invalid user w/o username not created', async () => {
        const newUser = {
            // "user": "Username",
            "name": "Name",
            "password": "Password"
        }

        const response = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log(response.body.error, "HEre is data")
        expect(response.body.error).toContain("User validation failed:")

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)
    })

    test('verify invalid user w/o password not created', async () => {
        const newUser = {
            "user": "Username",
            "name": "Name",
            // "password": "Password"
        }

        const response = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log(response.body.error, "HEre is data")
        expect(response.body.error).toContain("User validation failed:")

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)
    })
})
