const express = require('express')
const session = require('express-session')
const connectMongoSession = require('connect-mongodb-session')(session)

require('dotenv').config()

var app = express()
console.log(process.env)
var store = connectMongoSession({
    uri: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@localhost:27017`,
    collection: 'sessions'
})

app.use(session({
    secret: process.env.SESSION_DB_SECRET,
    cookie: {
        maxAge: 60 * 60 * 24 * 7 * 1000 // one week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}))

server = app.listen(8000)