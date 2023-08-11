
const Authentication = require('./middlewares/authentication');
const express = require('express');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(cors()); 

app.use('/product',Authentication, productRouter);
app.use('/user', userRouter);
app.use("/orders",Authentication, orderRoutes);
app.use('/cart',Authentication, cartRouter); 

module.exports = app;

