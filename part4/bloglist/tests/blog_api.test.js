const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('get requests', () => {
    test('proper amount of blogs are returned', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('verify unique identifier property of blog posts is named id', async () => {
        const response = await api.get('/api/blogs')

        const ids = response.body.map(blogs => blogs.id)
        ids.forEach(id => {
            expect(id).toBeDefined()
        })
    })
})

describe('post requests', () => {
    test('verify blog is created in database', async () => {
        const newBlog = {
            title: "Title",
            author: "Author",
            url: "URL",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)


        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

        const title = blogs.map(b => b.title)
        expect(title).toContain('Title')
    })

    test('likes default to 0', async () => {
        const newBlog = {
            title: "Title",
            author: "Author",
            url: "URL"
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('verify title and url', async () => {
        const newBlog = {
            author: "Author",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('delete requests', () => {
    test('verify blog is deleted by id', async () => {
        const id = helper.initialBlogs[0]._id

        const deletedBlog = await api
            .delete(`/api/blogs/${id}`)
            .expect(204)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initialBlogs.length - 1)
        expect(blogs).not.toContain(deletedBlog)
    })
})

describe('update requests', () => {
    test('verify blog is updated by id', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[0]
        const id = blogToUpdate.id

        const newBlog = {
            ...blogToUpdate,
            likes: 52
        }
        const response = await api
            .put(`/api/blogs/${id}`)
            .send(newBlog)
            .expect(200)

        const updatedBlog = response.body
        expect(updatedBlog).toStrictEqual(newBlog)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})