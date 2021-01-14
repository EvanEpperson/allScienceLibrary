const express = require('express');
const books = express.Router()
const Books = require('../models/books.js')
// books leads to /books

// main get route to actually see all of the books 
books.get('/', (req, res) => {
    Books.find({}, (err, foundBooks) => {
        res.json(foundBooks)
    } )
})

//  edit route for editing books
books.put('/:id', (req, res) => {
    Books.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updatedBooks) => {
            if(err){
                res.send(err)
            }else{
                Books.find({}, (err, foundBooks) => {
                    res.json(foundBooks)
                })
            }
        }
    )
})

// delete route for deleting books 
books.delete('/:id', (req, res) => {
    Books.findByIdAndRemove(req.params.id, (err, deletedBook) => {
        Books.find({}, (err, foundBooks) => {
            res.json(foundBooks)
        })
    })
})

// post route for creating books
books.post('/', (req, res ) => {
    Books.create(req.body, (err, createdBooks) => {
        Books.find({}, (err, createdBooks) => {
            res.json(createdBooks)
        })
    })
})
// exporting to whatever needs it 
module.exports = books