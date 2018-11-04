const Category = require('../models/category')


const getCategory = async ( req, res)=>{

 await Category.find({})
 .sort('name')
 .populate('user', 'name email role')
 .exec((err, categories)=>{
  if (err) {
   return res.status(500).send({
    ok: false,
    message: `server error. ${err.message}`
   })
  }else{
   res.send({
    ok: true,
    category: categories
   })
  }
 })
}

const postCategory = async ( req, res)=>{

 const body = req.body,
 user = req.user
 const category = new Category({
  description: body.description,
  user: user._id
 })
 await category.save((err, categoryDB)=>{
  if (err) {
   return res.status(500).send({
    ok: false,
    message: `serevr error. ${err.message}`
   })
  }else{
   res.status(201).send({
    ok: true,
    category: categoryDB
   })
  }
 })
}

const putCategory = async (req, res)=>{
 const id = req.params.id
 let body = req.body
 Category.findByIdAndUpdate(id, body, {new: true}, (err, categoryDB)=>{
  if (err) {
   return res.status(500).send({
    ok: false,
    message: `server error. ${err.message}`
   })
  }else if(!categoryDB){
   return res.status(400).send({
    ok: false,
    message: `Error.There is no category with the id ${id}`
   })
  }else{
   res.status(201).send({
    ok: true,
    message: `category updated`,
    category: categoryDB
   })
  }
 })
}

const deleteCategory = async (req, res)=>{
 let id = req.params.id
 Category.findByIdAndDelete(id, (err, categoryDel)=>{
  if (err) {
   return res.status(500).send({
    ok: false,
    message: `server error. ${err.message}`
   })
  }else if(!categoryDel){
   return res.status(400).send({
    ok: false,
    message: `Error.There is no category with the id ${id}`
   })
  }else{
   res.send({
    ok: true,
    message: `category deñeted`
   })
  }
 })
}

module.exports = {
 getCategory,
 postCategory,
 putCategory,
 deleteCategory
}