//para editar desde el modal la información de los dineros de salida, es decir gastos
const modalAlumno = new bootstrap.Modal(document.getElementById('modalAlumno'))

const on = (element, event, selector, handler) =>{
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

on(document, 'click', '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    id_editar.value = fila.children[0].innerHTML
    concepto_editar.value = fila.children[1].innerHTML
    dineroSalida_editar.value = fila.children[2].innerHTML
    fecha_editar.value = fila.children[3].innerHTML
    anotacionOpcional_editar.value = fila.children[4].innerHTML
    modalAlumno.show()
})