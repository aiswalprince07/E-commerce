//Why express? =>  kyoki router use karenge or wo express package ke ander aata h!!
const express = require("express");
const {createOrder, fetchOrderByUser, deleteOrder, updateOrder } = require("../controller/Order");

const router = express.Router();

//  /orders .. is already added in base path
router.post("/",createOrder)
      .get("/",fetchOrderByUser)
      .delete('/:id',deleteOrder)
      .patch('/:id',updateOrder);
      
exports.router = router;
