const mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 CategorySchema = new Schema({
   description:{
   type: String,
   required: [true, 'description is required']
  },
  user:{
   type: Schema.Types.ObjectId,
   ref: 'User'
  }
 })

 module.exports = mongoose.model('Category', CategorySchema)