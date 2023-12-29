const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        response.status(200).json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token invalid'
        })
    }

    const user = request.user
    console.log(user, "here is user")

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: decodedToken.id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== decodedToken.id) {
        return response.status(401).json({
            error: 'invalid user'
        })
    }

    await Blog.findByIdAndRemove(request.params.id)

    const user = request.user
    console.log(user, "here is user")
    user.blogs.pull(request.params.id);
    await user.save();

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    const populatedBlog = await updatedBlog.populate('user', { blogs: 0 })

    if (updatedBlog) {
        response.status(200).json(populatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter