const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingresoSchema = new Schema({
    // para arriendos
    direccion: String,
    dineroEntrante: Number,
    concepto: String,
    fecha: String,
    anotacionOpcional: String,
    comodin:String,// este es el id que me buscaría todo archivo guardado que tenga que ver con pagos de arriendo u otros a fin

    //para ingresos externos a arriendo
    nombre: String,
    dineroExterno: Number,
    fechaDineroExterno: String,
    anotacionOpcionalDineroExterno: String,
    comodinDineroExterno: String,

    //para gastos
    conceptoSalida: String,
    dineroSalida: Number,
    fechaDineroSalida: String,
    anotacionOpcionalDineroSalida: String,
    comodinDineroSalida: String,

    //para logear la entrada
    usuario:String,
    clave:String,
    comodinLogeo: String
    

}, {versionKey:false})


module.exports = mongoose.model('ingresos',ingresoSchema )


