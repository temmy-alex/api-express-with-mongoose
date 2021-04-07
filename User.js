const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name must be filled'],
        minlength: 5,
        maxlength: 20,
        unique: true
    },
    age:{
        type: Number,
        required: [true, 'Age must be filled'],
        minlength:2,
        maxlength:2
    },
    address:{
        type: String,
        required: [true, 'Address must be filled'],
        minlength:5,
        maxlength:50
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User