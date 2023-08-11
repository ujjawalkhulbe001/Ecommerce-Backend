const Product = require("./../models/productModel")

// exports.addProduct = async (req,res) =>{
//     try{
//         const newProduct = await Product.create(req.body);
//         res.status(200).json({
//             status:"success!!",
//             data: {
//                 product: newProduct
//             }
//         })
//     }catch(err){
//         res.status(400).json({
//             status: "error!",
//             message: err
//         })
//     }
// }
// pagination




exports.getProducts = async (req, res) => {   // added cursor pagination
    try {
      const limit = 12; 
  
      const { cursor } = req.query; 
  
      let query = {};
  
      if (cursor) {
        query = { _id: { $gt: cursor } }; 
      }
  
      const products = await Product.find(query).limit(limit);
  
      const nextPageCursor = products.length > 0 ? products[products.length - 1]._id : null;
  
      res.status(200).json({
        status: "ok",
        data: {
          products,
          nextPageCursor,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: err,
      });
    }
  };
  




exports.getProduct = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            status: "ok",
            data: {
                product
            }
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            message: err
        })
    }
}

exports.getProductBySearch = async(req, res)=>{
    try{
      const  searchQuery  = req.query.searchQuery;
      // console.log(searchQuery)
      if (!searchQuery) {
        return res.status(400).json({ message: "Search query is missing." });
      }
      const query = {
        $or: [
          { name :{ $regex: searchQuery, $options: "i" } },
          { sku_id: { $regex: searchQuery, $options: "i" } },
        ],
      };
      const products = await Product.find(query);
      if (products.length === 0) {
        return res.status(404).json({ message: "Product Not Found" });
      }
      return res.status(200).json({products});
    }catch(e){
      return res.status(500).json({message:"Internal Server Error" ,error:e.message})
    }
  }

