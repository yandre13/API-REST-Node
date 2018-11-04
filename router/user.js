const User = require('../models/user'),
 bcrypt = require('bcrypt'),
 _ = require('underscore')

const getUser = async (req, res) => {
 let limit = req.query.limit || 10,
  skip = req.query.skip || 0
 limit = Number(limit)
 skip = Number(skip)
 await User.find({ status: true }, 'name email role picture', (err, users) => {
  if (err) {
   res.send({
    ok: false,
    message: `server error. ${err.message}`
   })
  } else {
   User.count({ status: true }, (err, count) => {
    res.send({
     ok: true,
     user: users,
     count
    })
   })
  }
 })
}


const postUser = async (req, res) => {
 const body = req.body,
  user = new User({
   name: body.name,
   email: body.email,
   password: bcrypt.hashSync(body.password, 10),
   picture: body.picture,
   role: body.role
  })
 await user.save((err, userDB) => {
  if (err) {
   res.status(500).send({
    ok: false,
    message: `server error. ${err.message}`
   })
  } else {
   res.status(201).send({
    ok: true,
    message: `User created`,
    user: userDB
   })
  }
 })
}

const putUser = async (req, res) => {
 const id = req.params.id,
  body = _.pick(req.body, ['name', 'email', 'picture'])
 await User.findById(id, (err, userDB) => {
  if (err) {
   res.status(500).send({
    ok: false,
    message: `server error. ${err.message}`
   })
  } else if (!userDB) {
   return res.status(400).send({
    ok: false,
    message: `Error. no id was found with ${id}`
   })
  } else if (userDB.email === body.email) {
   return res.status(400).send({
    ok: false,
    message: 'Use an email different from the current one.'
   })
  } else {
   User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userUp) => {
    if (err) {
     res.status(500).send({
      ok: false,
      message: `server error. ${err.message}`
     })
    } else {
     res.send({
      ok: true,
      message: 'updated user',
      user: userUp
     })
    }
   })
  }
 })
}

const deleteUser = async (req, res) => {
 const id = req.params.id,
  body = { status: false }
 await User.findById(id, (err, userDB) => {
  if (err) {
   res.status(500).send({
    ok: false,
    message: `server error. ${err.message}`
   })
  } else if (!userDB) {
   return res.status(400).send({
    ok: false,
    message: `Error. no id was found with ${id}`
   })
  } else if (userDB.status === false) {
   return res.status(400).send({
    ok: false,
    message: 'Error. the user is not active'
   })
  } else {
   User.findByIdAndUpdate(id, body, { new: true }, (err, userDel) => {
    if (err) {
     res.status(500).send({
      ok: false,
      message: `server error. ${err.message}`
     })
    } else {
     res.send({
      ok: true,
      message: 'User Deleted',
      user: userDel
     })
    }
   })
  }
 })
}

module.exports = {
 getUser,
 postUser,
 putUser,
 deleteUser
}