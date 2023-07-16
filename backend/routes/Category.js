//Why express? =>  kyoki router use karenge or wo express package ke ander aata h!!
const express = require("express");
const {fetchCategories, createCategory} = require('../controller/Category');

const router = express.Router();

//  /brands .. is already added in base path
router.get("/", fetchCategories).post('/',createCategory);
exports.router = router;
