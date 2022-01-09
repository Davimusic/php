const Alumno = require('../model/Ingreso')
//para usar la fecha de hoy cada vez que se nesecite 
const fechaHoy = new Date()
let añoActual = fechaHoy.getFullYear()
let mesActual = fechaHoy.getMonth() + 1
let hoyActual = fechaHoy.getDate()


if(mesActual <= 9){
    mesActual = "0" + mesActual
}

if(hoyActual <= 9){
    hoyActual = "0" + hoyActual
}

const fechaHoyConcatenado = añoActual+"-"+mesActual+"-"+hoyActual

//herramientas de ingreso de dineros de arriendo
//otroMostrar
module.exports.mostrarTodo = (req, res) =>{
    var palabraReferencia = "" + req.body.otroMostrar 

    var paraDireccioneskr = palabraReferencia.indexOf("kr")

    var paraFehas = palabraReferencia.indexOf("-")
    
    if(palabraReferencia == 'arriendo' || palabraReferencia == 'cosina' || palabraReferencia == 'lavadora' || palabraReferencia == 'otro'){
        Alumno.find({"concepto":palabraReferencia}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('index', {ingresos:ingresos})
        })
    } else if(paraDireccioneskr !== -1 ){ 
        Alumno.find({"direccion":palabraReferencia}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('index', {ingresos:ingresos})
        })
    } else if(paraFehas !== -1 ){ 
        Alumno.find({"fecha":palabraReferencia}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('index', {ingresos:ingresos})
        })
    } else if(palabraReferencia == "" || palabraReferencia == "todo"){
        Alumno.find({"comodin":""}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('index', {ingresos:ingresos})
        })
    } 
}


//mostrar
module.exports.mostrar = (req, res) =>{
    Alumno.find({'fecha':fechaHoyConcatenado}, (error, ingresos)=>{
        if(error){
            return res.status(500).json({
                message: 'error mostrando alumnos'
            })
        }
        return res.render('index', {ingresos:ingresos})
    })
}

//crear
module.exports.crear = (req, res) =>{
    const alumno = new Alumno({
        direccion : req.body.direccion,
        dineroEntrante: req.body.dineroEntrante,
        concepto: req.body.concepto,
        fecha: req.body.fecha,
        anotacionOpcional: req.body.anotacionOpcional,
        comodin:""
    })
    alumno.save(function(error, ingresos, direccion, dineroEntrante, concepto, fecha, anotacionOpcional,comodin){ //verificar raro
        if(error){
            return res.status(500).json({
                message:'Error al crear el alumno'
            })
        }
        res.redirect('/')
    })
}

//editar
module.exports.editar = (req, res) =>{
    const id = req.body.id_editar
    const direccion = req.body.direccion_editar
    const dineroEntrante = req.body.dineroEntrante_editar
    const concepto = req.body.concepto_editar
    const fecha = req.body.fecha_editar
    const anotacionOpcional = req.body.anotacionOpcional_editar
    Alumno.findByIdAndUpdate(id, {direccion, dineroEntrante, concepto, fecha, anotacionOpcional}, (error, ingresos)=>{
        if(error){
            return res.status(500).json({
                message:'Error al actualizar el alumno'
            })
        }
        res.redirect('/')
    })
}

//eliminar
module.exports.borrar = (req, res) =>{
    const id = req.params.id
    Alumno.findByIdAndRemove(id, (error, ingresos)=>{
        if(error){
            return res.status(500).json({
                message:'Error al elminar el alumno'
            })
        }
        res.redirect('/')
    })
}


//es para que filtre los acumulados anuales de arriendos y conceptos
module.exports.promedios = (req, res) =>{    
 
  Alumno.find({}, (error, ingresos)=>{
        if(error) {
            return res.status(500).json({
                message: 'error mostrando alumnos'
            })
        }
        return res.render('VistaAnualArriendos', {ingresos:ingresos})
    })
}

//muestra los arriendos y conceptos acumuluados anuales
module.exports.vistaMensual = (req, res) =>{    
     
   Alumno.find({comodin:""}, (error, ingresos)=>{
         if(error) {
             return res.status(500).json({
                 message: 'error mostrando alumnos'
             })
         }
         return res.render('VistaMensualArriendos', {ingresos:ingresos})
     })
 }


///////////////////////////////////////////////////////////////////////
 ////para ingresos externos

  //Ingresar informacion en ganancias externas
module.exports.crearGananciasExternas = (req, res) =>{
    const alumno = new Alumno({
        nombre : req.body.nombre,
        dineroExterno: req.body.dineroExterno,
        fechaDineroExterno: req.body.fechaDineroExterno,
        anotacionOpcionalDineroExterno: req.body.anotacionOpcionalDineroExterno,
        comodinDineroExterno: ""
    })
    alumno.save(function(error, ingresos, nombre, dineroExterno, fechaDineroExterno, anotacionOpcionalDineroExterno, comodinDineroExterno){ //verificar raro
        if(error){
            return res.status(500).json({
                message:'Error al crear ganacia externa'
            })
        }
        res.redirect('/mostrarGananciasExternas')
    })
}

module.exports.mostrarGananciasExternas = (req, res) =>{ 
    Alumno.find({fechaDineroExterno:fechaHoyConcatenado }, (error, ingresos)=>{
          if(error) {
              return res.status(500).json({
                  message: 'error mostrando alumnos'
              })
          }
          return res.render('VistaIngresoDinerosExternos', {ingresos:ingresos})
      })
  }

  //editar
module.exports.editarIngresoExterno = (req, res) =>{
    const id = req.body.id_editar
    const nombre = req.body.nombre_editar
    const dineroExterno = req.body.dineroEntrante_editar
    const fechaDineroExterno = req.body.fecha_editar
    const anotacionOpcionalDineroExterno = req.body.anotacionOpcional_editar
    Alumno.findByIdAndUpdate(id, {nombre, dineroExterno, fechaDineroExterno, anotacionOpcionalDineroExterno}, (error, ingresos)=>{
        if(error){
            return res.status(500).json({
                message:'Error al actualizar el alumno'
            })
        }
        res.redirect('/mostrarGananciasExternas')
    })
}

//filtro busqueda
module.exports.filtroIngresosExternos = (req, res) =>{
    var palabraReferencia = "" + req.body.otroMostrar 

    var paraFehas = palabraReferencia.indexOf("-")
       
    if(paraFehas !== -1 ){ 
        Alumno.find({"fechaDineroExterno":palabraReferencia}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('VistaIngresoDinerosExternos', {ingresos:ingresos})
        })
    } else if(palabraReferencia == "" || palabraReferencia == "todo"){
        Alumno.find({"comodinDineroExterno":""}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('VistaIngresoDinerosExternos', {ingresos:ingresos})
        })
    } else if(palabraReferencia == "Margarita Fajardo" || palabraReferencia == "German David Fajardo"){
        Alumno.find({"nombre":palabraReferencia}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('VistaIngresoDinerosExternos', {ingresos:ingresos})
        })
    }
}

module.exports.mostrarMesAñoIngresoExterno = (req, res) =>{ 
    Alumno.find({comodinDineroExterno:""}, (error, ingresos)=>{
          if(error) {
              return res.status(500).json({
                  message: 'error mostrando alumnos'
              })
          }
          return res.render('VistaMesAnualDeIngresoDeDineroExterno', {ingresos:ingresos})
      })
  }


  //para los dineros de salida
  
module.exports.mostrarDinerosSalida = (req, res) =>{
    Alumno.find({fechaDineroSalida:fechaHoyConcatenado}, (error, ingresos)=>{
        if(error){
            return res.status(500).json({
                message: 'error mostrando alumnos'
            })
        }
        return res.render('VistaIngresoSalidaDeDinero', {ingresos:ingresos})
    })
}

module.exports.crearSalidaDinero = (req, res) =>{
    const alumno = new Alumno({
        conceptoSalida : req.body.conceptoSalida,
        dineroSalida: req.body.dineroSalida,
        fechaDineroSalida: req.body.fechaDineroSalida,
        anotacionOpcionalDineroSalida: req.body.anotacionOpcionalDineroSalida,
        comodinDineroSalida: ""
    })
    alumno.save(function(error, ingresos, conceptoSalida, dineroSalida, fechaDineroSalida, anotacionOpcionalDineroSalida, comodinDineroSalida){ //verificar raro
        if(error){
            return res.status(500).json({
                message:'Error al crear ganacia externa'
            })
        }
        res.redirect('/mostrarDinerosSalida')
    })
}

  //editar
  module.exports.editarSalidaDinero = (req, res) =>{
    const id = req.body.id_editar
    const conceptoSalida = req.body.concepto_editar
    const dineroSalida = req.body.dineroSalida_editar
    const fechaDineroSalida = req.body.fecha_editar
    const anotacionOpcionalDineroSalida = req.body.anotacionOpcional_editar
    Alumno.findByIdAndUpdate(id, {conceptoSalida, dineroSalida, fechaDineroSalida, anotacionOpcionalDineroSalida}, (error, ingresos)=>{
        if(error){
            return res.status(500).json({
                message:'Error al actualizar el alumno'
            })
        }
        res.redirect('/mostrarDinerosSalida')
    })
}

//filtro busqueda
module.exports.filtroSalidaDinero = (req, res) =>{
    var palabraReferencia = "" + req.body.otroMostrar 

    var paraFehas = palabraReferencia.indexOf("-")
       
    if(paraFehas !== -1 ){ 
        Alumno.find({"fechaDineroSalida":palabraReferencia}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('ingreso_dineros_salida', {ingresos:ingresos})
        })
    } else if(palabraReferencia == "" || palabraReferencia == "todo"){
        Alumno.find({"comodinDineroSalida":""}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('VistaIngresoSalidaDeDinero', {ingresos:ingresos})
        })
    } else if(palabraReferencia == "pago banco" || palabraReferencia == "pago recibos" || palabraReferencia == "comida"
           || palabraReferencia == "finca" || palabraReferencia == "otros"){
        Alumno.find({"conceptoSalida":palabraReferencia}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('VistaIngresoSalidaDeDinero', {ingresos:ingresos})
        })
    }
}

module.exports.mostrarMesAnoSalidaDinero = (req, res) =>{ 
    Alumno.find({comodinDineroSalida:""}, (error, ingresos)=>{
          if(error) {
              return res.status(500).json({
                  message: 'error mostrando alumnos'
              })
          }
          return res.render('VistaMesAnualDeSalidaDeDinero', {ingresos:ingresos})
      })
  }


  //para el loggin
  module.exports.abrirPaginaDeLogeo = (req, res) =>{
        Alumno.find({"comodinLogeo":""}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('login', {ingresos:ingresos})
        })
  }

  module.exports.validarLogeo = (req, res) =>{
    var usuario = "" + req.body.usuario 
    var clave= "" + req.body.clave
    
    if(usuario == "admin" && clave == "12345" ){
        Alumno.find({'fecha':fechaHoyConcatenado}, (error, ingresos)=>{
            if(error){
                return res.status(500).json({
                    message: 'error mostrando alumnos'
                })
            }
            return res.render('index', {ingresos:ingresos})
        })
    }
}


