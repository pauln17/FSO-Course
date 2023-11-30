const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 11,
        __v: 0
    },
]

const initialUsers = [
    {
        "_id": "6567cc70dc4b1b5659da9a2c",
        "username": "User",
        "name": "Name",
        "passwordHash": "$2b$10$wCYktFAeAo2qOQMtF.1QN.Kc7K4gIFhkv6RyIoR1ExvKu/EZfDZti",
        "notes": [],
        "__v": 0
    },
    {
        "_id": "3e8e062bf09a7e2cc1c51e4d",
        "username": "User2",
        "name": "Name2",
        "passwordHash": "$2b$10$wCYktFAeAo2qOQMtF.1QN.Kc7K4gIFhkv6RyIoR1ExvKu/EZfDZti",
        "notes": [],
        "__v": 0
    },
    {
        "_id": "a1b2c3d4e5f6a7b8c9d0e1f2",
        "username": "User3",
        "name": "Name3",
        "passwordHash": "$2b$10$wCYktFAeAo2qOQMtF.1QN.Kc7K4gIFhkv6RyIoR1ExvKu/EZfDZti",
        "notes": [],
        "__v": 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog({ title: "title" })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

module.exports = {
    initialBlogs,
    initialUsers,
    usersInDb,
    blogsInDb,
    nonExistingId
}