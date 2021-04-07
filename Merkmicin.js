const mongoose = require('mongoose')

const micinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama micin Harus Diisi']
  },
  description: {
    type: String,
    required: [true, "Nama Deskripsi harus diisi"],
    maxlength: 300
  }
})

const Micin = mongoose.model('merkMicin', micinSchema);

module.exports = Micin;