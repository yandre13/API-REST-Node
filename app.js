const express = require('express'),
 app = express(),
 router = require('./router/router'),
 fileUpload = require('express-fileupload')



 app
 .set('port', process.env.PORT)
 .use(express.urlencoded({extended: false}))
 .use(express.json())
 .use(fileUpload())
 .use('/api', router)
 .use(express.static(`${__dirname}/public`))

 
 module.exports = app