const express = require('express');
require('./connection')
const Product = require('./Product')
const merkSampo = require('./merksampo')
const Description = require('./Category')
const Book = require('./Book');
const merkMicin = require('./Merkmicin')
const User = require('./User');
const routers = express.Router();
// Get request form form-data with postman / api
const multer = require('multer');
const app = express();

// Get request raw json from postman / api
app.use(express.json());

// Get request form form-urlencoded form postman / api
app.use(express.urlencoded());

routers.get('/products', async (req, res) => {
    // SELECT * FROM products
    const products = await Product.find()
    if(products.length > 0){
        res.send({
            status: 'success',
            message: 'List product berhasil ditampilkan',
            data: products
        })
    }else{
        res.send({
            status: 'success',
            message: 'List product kosong'
        })
    }
})

routers.post('/merksampo',(req,res)=>{
    const { name, description } = req.body
    const newSampo = new merkSampo ({
        name: name,
        description: description
    })
    newSampo.save();
    res.send({
        status: "sukses tambah",
        data: newSampo
    })
})

routers.get('/merksampo', async (req,res)=>{
    const merkSampos = await merkSampo.find()
    if(merkSampos.length > 0){
        res.send({
            status: 'sukses aja',
            message: 'List produk kebanggan ditampilkan',
            data: merkSampos
        })
    }else {
        res.send({
            status:'sukses',
            message: 'TAPI KOSONG'
        })
    }
})

routers.post('/description', (req, res) => {
  const {name, description} = req.body;
  const newDescription = new Description ({
    name: name,
    description: description
  })
  newDescription.save();
  res.send({
        status: "sukses tambah",
        data: newDescription
    })
})

routers.get('/description', async (req, res) => {
  Description.find((err, description) => {
    if (err) {
      console.error(err)
    } else {  
      res.send(description)
    }
  })
})

routers.get('/merkmicin', async (req,res)=>{
    const merkMicins = await merkMicin.find()
    if (merkMicins.length > 0){
      res.send({
          status: 'sukses aja',
          message: 'List produk kebanggan ditampilkan',
          data: merkMicins
          })
      }else {
          res.send({
              status:'sukses',
              message: 'TAPI KOSONG'
          })
      }
  })
// routers.get('/book', async(req, res, next) => {
//     const {name, description, author} = req.params;
//     const 
// })
//mas fateh mati lampu kasian  

routers.get('/product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.send({
            status: 'success',
            message: 'Produk ditemukan',
            data: product
        })
    }else{
        res.send({
            status: 'warning',
            message: 'Produk tidak ditemukan'
        })
    }
})

routers.post('/product', multer().none(), async (req, res) => {
    const { name, price, stock, status } = req.body

    try {
        const product = await Product.create({
            name: name,
            price: price,
            stock: stock,
            status: status
        })

        if(product){
            res.send({
                status: 'success',
                message: 'Tambah product success',
                data: product
            })
        }else{
            res.send({
                status: 'warning',
                message: 'Tambah product gagal'
            })
        }
    } catch (error){
        res.send({
            status: 'error',
            message: error.message
        })
    }
})

routers.get('/user', async (req, res) => {
    const user = await User.find()
    if(user.length > 0){
        res.send({
            status: 'success',
            message: 'List User berhasil ditampilkan',
            data: user
        })
    }else{
        res.send({
            status: 'success',
            message: 'List User kosong'
        })
    }
})

routers.post('/user', async (req, res) => {
    const user = new user ({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    })
})

routers.put('/product/:id', multer().none(), async (req, res) => {
    const { name, price, stock, status } = req.body
    try {
        const result = await Product.updateOne(
            { _id: req.params.id },
            {
                name: name,
                price: price,
                stock: stock,
                status: status
            },
            { runValidators: true }
        )

        if (result.ok == 1){
            res.send({
                status: 'success',
                message: 'Update product success',
                data: result
            })
        }else{
            res.send({
                status: 'warning',
                message: 'Update product gagal',
                data: result
            })
        }
    } catch (error){
        res.send({
            status: 'error',
            message: error.message
        })
    }
})

routers.delete('/product/:id', async (req, res) => {
    try {
        const result = await Product.deleteOne(
            { _id: req.params.id }
        )

        if(result.deletedCount == 1){
            res.send({
                status: 'success',
                message: 'delete product success',
                data: result
            })
        }else{
            res.send({
                status: 'warning',
                message: 'Delete product gagal',
                data: result
            })
        }
    } catch (error) {
        res.send({
            status: 'error',
            message: error.message
        })        
    }
})

module.exports = routers