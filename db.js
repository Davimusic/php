const mongoose = require('mongoose')
//mongodb+srv://davis:davis@cluster0.hujqu.mongodb.net/MadreContabilidad
//mongodb://localhost/db_alumnos
const url = 'mongodb://localhost/6enero'

mongoose.connect(url)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'error al conectar'))
db.once('open', function callback(){
    console.log('conectado a mongo')
})

module.exports = db