const Product = require('../models/product')

const getProduct = async (req, res) => {

 let limit = req.query.limit,
  skip = req.query.skip
 limit = Number(limit)
 skip = Number(skip)

 Product.find({ available: true })
  .sort('name')
  .populate('category')
  .populate('user', 'name email role')
  .exec((err, products) => {
   if (err) {
    return res.status(500).send({
     ok: false,
     message: `server error ${err.message}`
    })
   } else {
    Product.count({ available: true }, (err, count) => {
     res.send({
      ok: true,
      product: products,
      count
     })
    })
   }
  })
}



const postProduct = async (req, res) => {
 const body = req.body,
 userId = req.user._id
 product = new Product({
  name: body.name,
  price: body.price,
  description: body.description,
  category: body.category,
  user: userId
 })
 await product.save((err, productDB)=>{
  if (err) {
   return res.status(500).send({
    ok: false,
    message: `server error. ${err.message}`
   })
  }else{
   res.status(201).send({
    ok: true,
    product: productDB
   })
  }
 })
}

const putProduct = async(req, res)=>{
 const id = req.params.id,
  body = req.body
  Product.findByIdAndUpdate(id, body, {new: true}, (err, productDB)=>{
   if (err) {
    return res.status(500).send({
     ok: false,
     message: `server error. ${err.message}`
    })
   }else if(!productDB){
    return res.status(400).send({
     ok: false,
     message: `Error. no id was found with ${id}`
    })
   }else{
    res.status(201).send({
     ok: true,
     message: `product updated`,
     product: productDB
    })
   }
  })
}


const deleteProduct = async(req, res)=>{
 const id = req.params.id,
  body = {available: false}
  Product.findByIdAndUpdate(id, body, {new: true}, (err, productDB)=>{
   if (err) {
    return res.status(500).send({
     ok: false,
     message: `server error. ${err.message}`
    })
   }else if(!productDB){
    return res.status(400).send({
     ok: false,
     message: `Error. no id was found with ${id}`
    })
   }else{
    res.status(201).send({
     ok: true,
     message: `product deleted`,
     product: productDB
    })
   }
  })
}


module.exports = {
 getProduct,
 postProduct,
 putProduct,
 deleteProduct
}