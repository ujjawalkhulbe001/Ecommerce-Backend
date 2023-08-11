const app = require("./app");
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config({path:"./config.env"});

const db = process.env.DATABASE

mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log(`Connected to database!!`)
})

const port = process.env.PORT || 9000;
app.listen(port,()=>{
    console.log(`Server is up on ${port}!`)
})



