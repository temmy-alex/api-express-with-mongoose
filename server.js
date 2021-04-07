const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.urlencoded({extended:false}));

const routers = require('./routers')
app.use(routers)

app.use(cors())

// Middleware Error 404 / Route Not Found
app.use((req, res, next) => {
    res.status(404).send('RESOURCE TIDAK DITEMUKAN');
});

// Middleware Error 500 / Internal Server Error
const errorHandling = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('TERJADI KESALAHAN / INTERNAL SERVER ERROR')
}

app.use(errorHandling)

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));