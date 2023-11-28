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

module.exports = {
    dummy,
    getTotalLikes,
    getFavoriteBlog
}