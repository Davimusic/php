const express = require('express')
const router = express.Router()

const alumnoController = require('../controllers/ingresoController')

//mostrar todos los alumnos (GET)
router.get('/', alumnoController.mostrar)
//crear alumno (POST)
router.post('/crear', alumnoController.crear)
//edita alumno(POST)
router.post('/editar', alumnoController.editar)
//elimina (GET)
router.get('/borrar/:id', alumnoController.borrar)

//mio, muestra información filtrada en el index
router.post('/otroMostrar', alumnoController.mostrarTodo)

//ingreso arriendos
//promedio anual
router.get('/promedios', alumnoController.promedios)
//promedios mensuales
router.get('/vistaMensual', alumnoController.vistaMensual)

//para ingresos externos
router.post('/crearGananciasExternas', alumnoController.crearGananciasExternas)
router.get('/mostrarGananciasExternas', alumnoController.mostrarGananciasExternas)
router.post('/editarIngresoExterno', alumnoController.editarIngresoExterno)
router.post('/filtroIngresosExternos', alumnoController.filtroIngresosExternos)
router.get('/mostrarVistaMenAnulIngresosExternos', alumnoController.mostrarMesAñoIngresoExterno)

//para dineros salientes
router.get('/mostrarDinerosSalida', alumnoController.mostrarDinerosSalida)
router.post('/crearSalidaDinero', alumnoController.crearSalidaDinero)
router.post('/editarSalidaDinero', alumnoController.editarSalidaDinero)
router.post('/filtroSalidaDinero', alumnoController.filtroSalidaDinero)
router.get('/mostrarMesAnoSalidaDinero', alumnoController.mostrarMesAnoSalidaDinero)

//para validar logeo
router.get('/abrirPaginaDeLogeo', alumnoController.abrirPaginaDeLogeo)
router.post('/validarLogeo', alumnoController.validarLogeo)






module.exports = router