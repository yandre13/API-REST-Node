const mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 ProductSchema = new Schema({
  name:{
   type:String,
   required: [true, 'name is required']
  },
  price:{
   type: Number,
   required: [true, 'price is required']
  },
  description:{
   type:String,
   required:false
  },
  picture:{
   type:String,
   required: false
  },
  available:{
   type:Boolean,
   required: true,
   default: true
  },
  category:{
   type:Schema.Types.ObjectId,
   ref: 'Category',
   required: true
  },
  user:{
   type: Schema.Types.ObjectId,
   ref: 'User',
   required: true
  }
 })

 module.exports= mongoose.model('Product', ProductSchema)