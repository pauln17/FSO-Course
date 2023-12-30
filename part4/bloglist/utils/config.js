require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const SECRET = process.env.SECRET
const MODE = process.env.NODE_ENV

module.exports = {
    MONGODB_URI,
    PORT,
    SECRET,
    MODE
}