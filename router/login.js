const User = require('../models/user'),
 bcrypt = require('bcrypt'),
 jwt = require('jsonwebtoken'),
 { OAuth2Client } = require('google-auth-library'),
 client = new OAuth2Client(process.env.CLIENT_ID)



const postLogin = (req, res) => {
 let body = req.body
 User.findOne({ email: body.email }, (err, userDB) => {
  if (err) {
   return res.status(500).send({
    ok: false,
    message: `server error. ${err.message}`
   })
  } else if (!userDB) {
   return res.status(400).send({
    ok: false,
    message: `user incorrect`
   })
  } else if (!bcrypt.compareSync(body.password, userDB.password)) {
   return res.status(400).send({
    ok: false,
    message: `password incorrect`
   })
  } else {
   let token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN })
   return res.send({
    ok: true,
    message: 'session started correctly',
    token
   })
  }
 })
}


//google
async function verify(token) {
 const ticket = await client.verifyIdToken({
  idToken: token,
  audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  // Or, if multiple clients access the backend:
  //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
 });
 const payload = ticket.getPayload()

 return {
  name: payload.name,
  email: payload.email,
  picture: payload.picture,
  google: true
 }
}

const postGoogle = async (req, res) => {
 const token = req.body.idtoken,
  googleUser = await verify(token)
 console.log(googleUser)

 User.findOne({ email: googleUser.email }, (err, userDB) => {
  if (err) {
   return res.status(500).send({
    ok: false,
    message: `server error. ${userDB.message}`
   })
  } else {
   if (userDB) {
    if (!userDB.google) {
     return res.status(400).send({
      ok: false,
      message: `log in with your normal mail`
     })
    } else if (userDB.google) {
     const token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN })
     return res.send({
      ok: true,
      user: userDB,
      token
     })
    }
   } else {
    const user = new User(googleUser)
    user.password = ':)'

    user.save((err, userDB) => {
     if (err) {
      return res.status(500).send({
       ok: false,
       message: `server error. ${err.message}`
      })
     }
     res.status(201).send({
      ok: true,
      message: `user created with google`,
      user: userDB
     })
    })
   }
  }
 })
}


module.exports = {
 postLogin,
 postGoogle
}