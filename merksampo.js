const mongoose = require('mongoose');

const sampoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama produk harus diisi'],
    },
    description: {
        type: String,
        required: true,
        maxtlength:500 
    },
})

// Model
const sampo = mongoose.model('merkSampo', sampoSchema);

module.exports = sampo;