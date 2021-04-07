const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama Harus Diisi']
  },
  description: {
      type: String,
      required: [true, 'Sinopsis']
    },
  author: {
    type:String,
    required: [true, 'Nama Penulis']
  }
});

// Model
const Book = mongoose.model('Book', bookSchema)

module.exports = Book