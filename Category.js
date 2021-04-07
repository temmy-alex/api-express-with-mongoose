const mongoose = require('mongoose')

const descriptionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama Harus Diisi']
  },
  description: {
    type: String,
    required: [true, "Deskripsi harus diisi"],
    maxlength: 300
  }
})

const Description = mongoose.model('Category', descriptionSchema);

module.exports = Description