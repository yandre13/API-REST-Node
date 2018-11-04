require('../config')
const mongoose = require('mongoose'),
 c = console.log

 class Database{

constructor(){
 this.connection()
}
  connection(){
   mongoose.connect(process.env.URLDB, {useNewUrlParser:true})
   .then(()=>c(`connection successful to ${process.env.URLDB}`))
   .catch(e=> c(e.message))
  }
 }

 module.exports = new Database()