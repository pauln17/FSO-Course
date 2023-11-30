const loggers = require('./loggers')
const User = require('../models/user')
const config = require('./config')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    loggers.info('Method:', request.method)
    loggers.info('Path:  ', request.path)
    loggers.info('Body:  ', request.body)
    loggers.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    loggers.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }

    next()
}

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '')
        const decodedToken = jwt.verify(token, config.SECRET)

        const user = await User.findById(decodedToken.id)
        request.user = user
    }

    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}