const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next)=>{
 const token = req.get('token')
 jwt.verify(token, process.env.SEED, (err, decoded)=>{
  if (err) {
   return res.status(500).send({
    ok: false,
    message: `Token invalid`
   })
  }
  req.user = decoded.user
  next()
 })
}

const verifyRole = (req, res, next)=>{
 const user = req.user
 if (user.role === 'Admin') {
  next()
 }else{
  return res.status(400).send({
   ok: false,
   message: `unauthorized user`
  })
 }
}

module.exports = {
 verifyToken,
 verifyRole
}