const express = require('express');
const server = express();
const mongoose = require('mongoose');
const { createProduct } = require('./controller/Product');
const productsRouters = require('./routes/Products');

//middlewares
server.use(express.json()); // to parse req.body
server.use('/products',productsRouters.router);




main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/E-commerce');
    console.log('database connected')
}

server.get('/',(req, res)=>{
    res.json({status:'success'})
})

server.listen(5000, ()=>{
    console.log('server started')
})