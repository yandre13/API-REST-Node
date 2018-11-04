require('./config')
const app = require('./app'),
db = require('./models/db'),
c = console.log

app
.listen(app.get('port'), ()=>c(`Iniciando API REST en el puerto ${app.get('port')}`))


c(`****************************
*****Variables de entorno********
port: ${app.get('port')}
db: ${process.env.URLDB}
********************************`)