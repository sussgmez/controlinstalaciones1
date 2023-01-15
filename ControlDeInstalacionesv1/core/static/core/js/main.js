var instalacion_selected = null;
const input_cambios = document.querySelector('#input-cambios')
const cnte_instalaciones_pendientes = document.querySelector('.instalaciones-pendientes');
const nro_filas = 5;
const celdas = new Array(nro_filas)

/* Onload */
window.onload = function() {
    crear_celdas();

    load_ipendientes()
    load_iasignadas()    

    const fc = document.querySelector('#dia_solicitado')
    fc.onchange = function() {
        const formulario = document.querySelector('#cambiar_dia')
        formulario.submit()
    }

    const file_csv = document.querySelector('#load-csv')
    file_csv.onchange = function() {
        console.log("Prueba");
        const formulario = document.querySelector('#form-csv')
        formulario.submit()
    }
}

function sb() {
    console.log("Prueba");
}

/* Añade cambios y comprueba si una instlaación ya ha sido modificada*/
function save_cambios(modificacion){
    /* Si es el primer cambio */
    if (input_cambios.value === "") {
        input_cambios.value = modificacion
    } else {
        const cambios = input_cambios.value.split(",")
        let pre_changed = false
        let index;
        /* Comprobación por si ya ha sido modificada */
        for (let i = 0; i < cambios.length; i++) {
            const contrato = cambios[i].split(';')[0];
            const contrato_modificacion = modificacion.split(';')[0]
            if (contrato === contrato_modificacion) {
                pre_changed = true
                index = i
            }
        }

        /* Si sí, modifica el cambio anterior para no volver a cargar un mismo cambio */
        if (pre_changed) {
            cambios[index] = modificacion
            input_cambios.value = cambios;
        } else {
            input_cambios.value += ',' + modificacion
        }
    }
    console.log(input_cambios.value);
}

/* Creación de celdas */
function crear_celdas() {
    const tabla = document.querySelector('.tb-agenda')
    const nro_tecnicos = document.querySelectorAll('.tecnico').length

    for (let i = 0; i < nro_filas; i++) {
        const fila = document.createElement('tr')
        celdas[i] = new Array(nro_tecnicos)
        for (let j = 0; j < nro_tecnicos; j++) {
            const celda = document.createElement('td')
            celda.classList = `celda-agenda row-${i} col-${j}`
            fila.appendChild(celda)
            celdas[i][j] = celda
        }
        tabla.appendChild(fila)
    }
}

/* Añadir y eliminar botones de asignación en tabla */
function reset_btns_asignar() {
    /* Elimina todos los botones */
    const btns_asignar = document.querySelectorAll('.btn-asignar')
    btns_asignar.forEach(btn => { btn.remove() });

    /* Se crean si existe una instalación por asignar seleccionada*/
    if (instalacion_selected !== null) {
        for (let i = 0; i < celdas.length; i++) {
            for (let j = 0; j < celdas[i].length; j++) {
                const celda = celdas[i][j];
                /* Y si la celda no tiene ninguna instalación ya asignada */
                if (celda.querySelector('.instalacion-asignada') === null) {
                    const btn_selectcelda = document.createElement('button') 
                    btn_selectcelda.className = ('btn-asignar')
                    btn_selectcelda.innerHTML = '<p>Asignar +</p>'
    
                    btn_selectcelda.addEventListener('click', function() {
                        event_btns_asignar(celda)
                    })
                    celda.appendChild(btn_selectcelda)
                }
            }
        }
    }
}

/* Evento de los botones de asignación */
function event_btns_asignar(celda) {
    /* Se crear y se añade la instalación a la agenda */
    const instalacion = instalacion_selected;
    console.log(instalacion_selected);
    const div_instalacion = crear_instalacion_agenda(instalacion) 
    celda.appendChild(div_instalacion)

    /* Se almacenan los cambios */
    save_cambios(`${instalacion['pk']};${celda.classList[1]};${celda.classList[2]}`);

    /* Y se resetea el sistema */
    document.querySelector('.selected-instalacion').remove()
    instalacion_selected = null
    reset_btns_asignar();
}

/* Cargar instalaciones pendientes */
function load_ipendientes() {
    fetch('http://127.0.0.1:8000/instalaciones/get_pendientes/')
    .then(response => response.json())
    .then(instalaciones => {
        for (let i = 0; i < instalaciones.length; i++) {
            const instalacion = instalaciones[i];
            const div_instalacion = crear_instalacion_pendiente(instalacion)
            cnte_instalaciones_pendientes.appendChild(div_instalacion)
        }
    })
}

function crear_instalacion_pendiente(instalacion){
    const campos_instalacion = instalacion['fields']
    const div_instalacion = document.createElement('div')
    div_instalacion.className = 'instalacion-pendiente'
    div_instalacion.innerHTML = `<p><b>${instalacion['pk']}</b> ${campos_instalacion['nombre_cliente']}, ${campos_instalacion['direccion'].slice(0, 40)}...</p>`
    div_instalacion.addEventListener('click', function() {
        const div_instalaciones_pendientes = document.querySelectorAll('.instalacion-pendiente')
        if (div_instalacion.classList.contains('selected-instalacion')) {
            instalacion_selected = null;
            div_instalacion.classList.remove('selected-instalacion')
        } else {
            for (let i = 0; i < div_instalaciones_pendientes.length; i++) {
                const aux_instalacion = div_instalaciones_pendientes[i];
                aux_instalacion.classList.remove('selected-instalacion')
            }
            div_instalacion.classList.add('selected-instalacion')
            instalacion_selected = instalacion;
        }
        reset_btns_asignar();
    })
    return div_instalacion;
}

/* Cargar instalaciones asignadas */
function load_iasignadas() {
    fetch(`http://127.0.0.1:8000/instalaciones/${url_fecha}/`)
    .then(response => response.json())
    .then(instalaciones => {
        for (let i = 0; i < instalaciones.length; i++) {
            const instalacion = instalaciones[i];
            const celda = celdas[instalacion['fields']['turno_hora']][instalacion['fields']['tecnico']]
            const div_instalacion = crear_instalacion_agenda(instalacion)
            celda.appendChild(div_instalacion)
        }
    })
}

function crear_instalacion_agenda(instalacion) {
    const campos_instalacion = instalacion['fields']
    const div_instalacion = document.createElement('div')
    div_instalacion.className = 'instalacion-asignada'
    div_instalacion.innerHTML =  `<p><b>${instalacion['pk']}</b></p><p>${campos_instalacion['nombre_cliente']}</p><p>${campos_instalacion['direccion'].slice(0, 18)}...</p>`
    const btn_remove = document.createElement('button')
    btn_remove.className = 'btn-remove'
    btn_remove.innerHTML = `<img src="/static/core/img/remove.png" alt="remove">`

    btn_remove.addEventListener('click', function() {
        const div_instalacion_pendiente = crear_instalacion_pendiente(instalacion)
        cnte_instalaciones_pendientes.appendChild(div_instalacion_pendiente)
        save_cambios(`${instalacion['pk']};null`);
        div_instalacion.remove()
        reset_btns_asignar();
    })

    div_instalacion.appendChild(btn_remove)
    return div_instalacion
}

