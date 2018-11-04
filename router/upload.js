const User = require('../models/user'),
 Product = require('../models/product'),
 fs = require('fs')

const putUpload = async (req, res) => {
 const type = req.params.type,
  id = req.params.id,
  validTypes = ['product', 'user'],
  file = req.files,
  filesValids = ['png', 'jpg', 'gif', 'jpeg'],
  image = file.image,
  imageNameAndExt = image.name.split('.'),
  extension = imageNameAndExt.length - 1,
  imageName = `${imageNameAndExt.slice(0, extension)}-${id}-${new Date().getMilliseconds()}.${imageNameAndExt[extension]}`

 if (validTypes.indexOf(type) < 0) {
  return res.status(400).send({
   ok: false,
   message: `Invalid type, you can only use: ${validTypes.join(',')}`
  })
 }

 if (!file) {
  return res.status(400).send({
   ok: false,
   message: `you have not selected any file`
  })
 }

 if (filesValids.indexOf(imageNameAndExt[extension]) < 0) {
  return res.status(400).send({
   ok: false, message: `
      Invalid extension, you can only use images of type: ${filesValids.join(',')}`
  })
 }
 if (type === 'user') {

  await imageOf(type, id, res, imageName).then(() => {
   image.mv(`${__dirname}/../uploads/${type}/${imageName}`, (err) => {
    if (err) {
     return res.status(500).send({ ok: false, message: `server error. ${err.message}` })
    }
   })
  })
 } else {
  await imageOf(type, id, res, imageName).then(() => {
   image.mv(`${__dirname}/../uploads/${type}/${imageName}`, (err) => {
    if (err) {
     return res.status(500).send({ ok: false, message: `server error. ${err.message}` })
    }
   })
  })
 }
}

const imageOf = (type, id, res, image) => new Promise((resolve, reject) => {
 if (type === 'user') {
  User.findById(id, (err, userDB) => {

   if (!userDB) {
    return res.status(400).send({
     ok: false,
     message: `The user with the id was not found: ${id}`
    })
   }
   if (err) {
    return res.status(500).send({
     ok: false,
     message: `server error ${err.message}`
    })
   }
   const oldImage = userDB.picture
   deleteImage('user', oldImage)
   userDB.picture = image
   userDB.save((err, userUp) => {
    if (err) {
     return res.status(500).send({
      ok: false,
      message: `server error ${err.message}`
     })
    }
    resolve(res.status(201).send({
     ok: true,
     message: `correctly updated image`,
     user: userUp
    }))
   })
  })
 } else {
  Product.findById(id, (err, productDB) => {
   if (!productDB) {
    return res.status(400).send({
     ok: false,
     message: `The user with the id was not found: ${id}`
    })
   }
   if (err) {
    return res.status(500).send({
     ok: false,
     message: `server error ${err.message}`
    })
   }
   const oldImage = productDB.picture
   deleteImage('product', oldImage)
   productDB.picture = image
   productDB.save((err, productUp) => {
    if (err) {
     return res.status(500).send({
      ok: false,
      message: `server error ${err.message}`
     })
    }
    resolve(res.status(201).send({
     ok: true,
     message: `correctly updated image`,
     product: productUp
    }))
   })
  })
 }
})

const deleteImage = (type, imageName) => {
 const imagePath = `${__dirname}/../uploads/${type}/${imageName}`
 if (fs.existsSync(imagePath)) {
  fs.unlinkSync(imagePath)
 }
}

module.exports = { putUpload }