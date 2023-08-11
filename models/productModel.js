const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        type: String
    },
    productPrice:{
        type: Number
    },
    productQuantity:{
        type: Number
    },
    productImages:{ // made array for images 
        type: Array
    },
    productDetails:{
        type: String
    },
    productSize:[{
        type: String
    }    ]
})



const Product = mongoose.model("Product", productSchema)
module.exports = Product;


