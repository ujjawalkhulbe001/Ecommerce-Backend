const express = require("express");
const {addProduct, getProducts, getProduct,getProductBySearch} = require("./../controllers/productController")

const router = express.Router()

// router.route("/addProduct").post(addProduct)      // removed add to cart because not made admin
router.route("/Products").get(getProducts) 
router.route("/Product/:id").get(getProduct)
router.route("/Search").get(getProductBySearch)

module.exports = router