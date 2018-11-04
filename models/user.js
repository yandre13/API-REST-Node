const mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 roles ={
  values:['User', 'Admin'],
  message: '{VALUE} is not a valid role'
 },
 UserSchema = new Schema({
  name: {
   type: String,
   required: [true, 'name is required']
  },
  email:{
   type: String,
   required: [true, 'email is required'],
   unique: true
  },
  password:{
   type:String,
   required: [true, 'password is required']
  },
  picture:{
   type:String,
   required: false
  },
  role:{
   type:String,
   required: [true, 'role is required'],
   default: 'User',
   enum: roles
  },
  google:{
   type: Boolean,
   required: false,
   default: false
  },
  status:{
   type:Boolean,
   required: true,
   default: true
  }
 })

UserSchema.methods.toJSON = function () {
 let user = this,
 userObj = user.toObject()
 delete userObj.password
 return userObj
}

 module.exports= mongoose.model('User', UserSchema)