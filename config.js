//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//PORT
process.env.PORT = process.env.PORT ||3000

//DB
if (process.env.NODE_ENV === 'dev') {
 process.env.URLDB = 'mongodb://localhost:27017/edgrid'
}else{
 process.env.URLDB=''
}

//Seed
process.env.SEED = process.env.SEED || 'this-is-my-secret-seed'
process.env.EXPIRATION_TOKEN = process.env.EXPIRATION_TOKEN || '48h'

//google
process.env.CLIENT_ID = '279681369346-qa7qj4nqu2ivfmferm6t1ofaeiir2neu.apps.googleusercontent.com'