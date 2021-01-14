const express = require('express');
const books = express.Router()
const Books = require('../models/books.js')
// books leads to /books
books.get('/', (req, res) => {
    Books.find({}, (err, foundBooks) => {
        res.json(foundBooks)
    } )
})

books.post('/', (req, res ) => {
    Books.create(req.body, (err, createdBooks) => {
        Books.find({}, (err, createdBooks) => {
            res.json(createdBooks)
        })
    })
})








module.exports = books