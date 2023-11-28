const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const getTotalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const getFavoriteBlog = (blogs) => {
    const favoriteBlog = blogs.reduce((maxLikesBlog, currentBlog) => {
        return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog
    }, blogs[0])

    return favoriteBlog
}

const getMostBlogs = (blogs) => {
    blogsByAuthor = _.groupBy(blogs, 'author')

    const blogsCountByAuthor = _.map(blogsByAuthor, (authorBlogs) => {
        return {
            author: authorBlogs[0].author,
            blogs: authorBlogs.length
        }
    })

    const authorWithMostBlogs = _.maxBy(blogsCountByAuthor, 'blogs')

    return authorWithMostBlogs
}

const getMostLikes = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, 'author')

    const likesCountByAuthor = _.map(blogsByAuthor, (authorBlogs) => {
        return {
            author: authorBlogs[0].author,
            likes: _.sumBy(authorBlogs, 'likes')
        }
    })

    const authorWithMostLikes = _.maxBy(likesCountByAuthor, 'likes')

    return authorWithMostLikes
}

module.exports = {
    dummy,
    getTotalLikes,
    getFavoriteBlog,
    getMostBlogs,
    getMostLikes,
}