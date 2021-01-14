const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    fiction: {type: String, default: 'Fiction'},
    image: String,
    description: String,
    isCheckedOut: Boolean,
})

const Books = mongoose.model('Books', booksSchema)

module.exports = Books