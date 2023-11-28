const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('when list has no blogs, equals 0', () => {
        const emptyBlogs = []

        const result = listHelper.getTotalLikes(emptyBlogs)
        expect(result).toBe(0)
    })

    test('when list has one blog, equals the likes of that', () => {
        const oneBlog = [
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
            }
        ]

        const result = listHelper.getTotalLikes(oneBlog)
        expect(result).toBe(2)
    })

    test('list has multiple blogs', () => {
        const multipleBlogs = [
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
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
        ]

        const result = listHelper.getTotalLikes(multipleBlogs)
        expect(result).toBe(22)
    })
})

describe('favourite blog', () => {
    test('when list has no blogs, equals undefined', () => {
        const blogs = []

        const result = listHelper.getFavoriteBlog(blogs)
        expect(result).toBe(undefined)
    })

    test('when list has one blog, equals to that blog', () => {
        const oneBlog = [
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
            }
        ]

        const result = listHelper.getFavoriteBlog(oneBlog)
        expect(result).toBe(oneBlog[0])
    })

    test('when list has multiple blogs, equals to highest liked blogs', () => {
        const multipleBlogs = [
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
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
        ]

        const result = listHelper.getFavoriteBlog(multipleBlogs)
        expect(result).toBe(multipleBlogs[0])
    })
})

describe('most blogs', () => {
    test('when list has no blogs, equals undefined', () => {
        const blogs = []

        const result = listHelper.getMostBlogs(blogs)
        expect(result).toStrictEqual(undefined)
    })

    test('when list has one blog, equals to that author and 1 blog', () => {
        const oneBlog = [
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
            }
        ]

        const result = listHelper.getMostBlogs(oneBlog)
        expect(result).toStrictEqual({
            author: "Robert C. Martin",
            blogs: 1
        })
    })

    test('when list has multiple blogs, equals to author w/ most blogs', () => {
        const multipleBlogs = [
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
                likes: 12,
                __v: 0
            },
        ]

        const result = listHelper.getMostBlogs(multipleBlogs)
        expect(result).toStrictEqual({
            author: "Robert C. Martin",
            blogs: 2
        })
    })
})

describe('most likes', () => {
    test('when list has no blogs, equals undefined', () => {
        const blogs = []

        const result = listHelper.getMostLikes(blogs)
        expect(result).toStrictEqual(undefined)
    })

    test('when list has one blog, equals to that author and likes of that blog', () => {
        const oneBlog = [
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
            }
        ]

        const result = listHelper.getMostLikes(oneBlog)
        expect(result).toStrictEqual({
            author: "Robert C. Martin",
            likes: 2
        })
    })

    test('when list has multiple blogs, equals to author w/ most likes', () => {
        const multipleBlogs = [
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

        const result = listHelper.getMostLikes(multipleBlogs)
        expect(result).toStrictEqual({
            author: "Robert C. Martin",
            likes: 12
        })
    })
})