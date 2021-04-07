const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/belajar_mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Collection dari mongodb
const quoteSchema = new mongoose.Schema({
    word: String
}) 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: String,
    password: String
})

const productSchema = new mongoose.Schema({
    // name: String,
    // price: Number,
    // stock: Number,
    // status: { type: Boolean, default: true }

    // Validasi Required
    // name: { type: String, required: true },
    // price: { type: Number, required: true },
    // stock: Number,
    // status: { type: Boolean, default: true },

    // Min & Max
    // name: {
    //     type: String,
    //     required: true,
    //     minlength: 3,
    //     maxlength: 50
    // },
    // price: {
    //     type: Number,
    //     required: true,
    //     min: 1000,
    //     max: 1000000
    // },
    // stock: Number,
    // status: { type: Boolean, default: true }

    // Unique

})

// Object model
const Quote = mongoose.model('Quote', quoteSchema)
const Product = mongoose.model('Product', productSchema)
const User = mongoose.model('User', userSchema);

const db = mongoose.connection
db.on('error', console.error.bind('console', 'connection error:'))
db.once('open', async () => {
    // Query Save cara 1
    // const quote = new Quote({ word: 'Data baru' })
    // const product = new Product({
    //     name: 'Testing 1',
    //     price: 1000,
    //     stock: 8
    // })

    // product.save((error, product) => {
    //     if (error) return console.error(error)
    //     console.log(product)
    // })

    // quote.save((error, quote) => {
    //     if (error) return console.error(error)
    //     console.log(quote)
    // })

    // Query save cara ke 2
    // const newProduct = new Product()
    // newProduct.name = 'Meja'
    // newProduct.price = 15000
    // newProduct.stock = 17
    // newProduct.status = true
    // const insert = await newProduct.save();
    // console.log(insert)

    // const newUser = new User()
    // newUser.username = 'user123'
    // newUser.email = 'user123@gmail.com'
    // newUser.password = '12345'
    // const insert = await newUser.save();
    // console.log(insert)

    // try {
    //     const newProduct = await Product.create({
    //         name: null,
    //         price: 20,
    //         stock: 10,
    //         status: 1
    //     })
    //     console.log(newProduct)
    // } catch(error){
    //     console.log(error.message)
    // }

    // Query Menampilkan data
    // SELECT * FROM products
    // const products = await Product.find()
    // console.log(products)

    // await Product.find().exec((err, result) => {
    //     console.log(result);
    // })

    // Update Product
    // await Product.updateOne(
    //     { _id:  '606db03d56ce5b2e214a765d'},
    //     { name: 'Meja Laptop' }
    // )

    // Delete Product
    // await Product.deleteOne(
    //     { _id:  '606db03d56ce5b2e214a765d'}
    // )

    // Query Builder
    // const query = Product.find()
    // const list_products = await query.where({ 'stock': { $gte: 5 } }).exec()
    // console.log(list_products)

    // SELECT name, stock WHERE stock >= 5 ORDER BY stock DESC LIMIT 2
    const list_products = await Product.find()
        .select('name stock')
        .where({ 'stock': { $gte : 5 } })
        .sort({ stock: -1 })
        .limit(2)
        .exec()

    console.log(list_products)
})
