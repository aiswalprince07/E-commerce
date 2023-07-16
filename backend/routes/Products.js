//Why express? =>  kyoki router use karenge or wo express package ke ander aata h!!
const express = require("express");
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require("../controller/Product");

const router = express.Router();

//  /products .. is already added in base path
router.post("/", createProduct)
      .get("/", fetchAllProducts)
      .get('/:id',fetchProductById)
      .patch('/:id',updateProduct);
exports.router = router;
