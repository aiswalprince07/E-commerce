//Why express? =>  kyoki router use karenge or wo express package ke ander aata h!!
const express = require("express");
const { addToCart, fetchCartByUser } = require("../controller/Cart");

const router = express.Router();

//  /cart .. is already added in base path
router.post("/", addToCart)
      .get("/", fetchCartByUser);
exports.router = router;
