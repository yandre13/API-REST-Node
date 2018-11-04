const express = require('express'),
 api = express(),
 { getUser, postUser, putUser, deleteUser } = require('./user'),
 {getCategory, postCategory, putCategory, deleteCategory} = require('./category'),
 {getProduct, postProduct, putProduct, deleteProduct} = require('./product'),
 { postLogin,postGoogle } = require('./login'),
 {verifyToken, verifyRole} = require('../middlewares/auth'),
 {putUpload} = require('./upload')

api.get('/user', verifyToken, getUser)
api.post('/user', verifyToken, verifyRole, postUser)
api.put('/user/:id',verifyToken, verifyRole, putUser)
api.delete('/user/:id',verifyToken, verifyRole, deleteUser)

api.get('/category', verifyToken, getCategory)
api.post('/category', verifyToken,  postCategory)
api.put('/category/:id',verifyToken,  putCategory)
api.delete('/category/:id',verifyToken,  deleteCategory)

api.get('/product', verifyToken, getProduct)
api.post('/product', verifyToken,  postProduct)
api.put('/product/:id',verifyToken,  putProduct)
api.delete('/product/:id',verifyToken,  deleteProduct)

api.post('/login', postLogin)
api.post('/google', postGoogle)
api.put('/upload/:type/:id', putUpload)

module.exports = api