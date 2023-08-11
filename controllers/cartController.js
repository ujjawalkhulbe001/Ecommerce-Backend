
const User = require('../models/userModel');
const Product = require("../models/productModel");


exports.addToCart = async (req, res) => {
  try {
    const {productId, quantity } = req.body;
    // console.log(req.body)
    const userId = req.user
    // console.log(userId)
    const user = await User.findById(req.user)
    // console.log(user)
    const exsistingProduct = user.cart.findIndex((item) => item._id===productId)
    if(exsistingProduct != -1){
      user.cart= user.cart.map((item,key) => {
        if(key===exsistingProduct){return{
          ...item,quantity:item.quantity+quantity
        }}
      })
    }
    else{user.cart.push({productId,quantity})}
    

    await user.save();

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error',err });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const {productId} = req.params;
    // console.log(productId)
    
    const user = await User.findById(req.user)
    user.cart = user.cart.filter((items)=> items.productId !== productId);

    // console.log(user.cart)

    await user.save();

    res.json({ message: 'Product removed from cart successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' , err });
  }
}; 



exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await User.findById(req.user);
    const cart = cartItems.cart
    // console.log(cart)
    const products = [];

    for(let cartItems of cart){
      // console.log(cartItems.productId)
      const product = await Product.findOne({_id: cartItems.productId});
      
      products.push({...product.toObject() , quantity:cartItems.quantity})
      
    }
    // console.log(products)

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error'  , err});
  }
};

