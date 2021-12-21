let formulario = document.getElementById('formulario')
let listarCita = document.getElementById('listarCita')
let buscar = document.getElementById('btnBuscar')
let busqueda = document.getElementById('busqueda')
let Citas = JSON.parse(localStorage.getItem('Citas')) || []





const capturarDatos = () => {
    let nombre = document.getElementById('nombre').value
    let fecha = document.getElementById('fecha').value
    let hora = document.getElementById('hora').value
    let sintomas = document.getElementById('sintomas').value
    let id = nombre

    let registro = {
        nombre,
        fecha,
        hora,
        sintomas,
        id
    }

    Citas.unshift(registro);
    localStorage.setItem('Citas', JSON.stringify(Citas));
    getLocalStorage();
}

formulario.addEventListener('submit', e => {

    e.preventDefault()
    capturarDatos()
    e.target.reset()
})

const getLocalStorage = () => {
    listarCita.innerHTML = ''
    let citasLocalStorage = JSON.parse(localStorage.getItem('Citas'))
    //console.log(citasLocalStorage);

    citasLocalStorage.map(cita => {
        const { nombre, fecha, hora, sintomas } = cita
        listarCita.innerHTML += `
        
            <tr>
                <td>${nombre}</td>
                <td>${fecha}</td>
                <td>${hora}</td>
                <td>${sintomas}</td>
            </tr>
       
         ` 

    })
}

document.addEventListener('DOMContentLoaded', getLocalStorage);



buscar.addEventListener('click', e => {
    e.preventDefault();
    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('Citas'));
    let filtro = data.filter(cita => cita.nombre.toLowerCase() === input.toLowerCase())
    busqueda.innerHTML = '';
    console.log(filtro)

    filtro.length === 0 ?
        busqueda.innerHTML += `<div style="color:white;">El nombre ${input} no existe</div>` :
        (
            filtro.map(cita => {
                const {
                    nombre,
                    fecha,
                    hora,
                    sintomas,
                    id
                } = cita;


                busqueda.innerHTML += `
                                    <div style="color:white;">${nombre}</div>
                                    <div style="color:white;">${fecha}</div>
                                    <div style="color:white;">${hora}</div>
                                    <div style="color:white;">${sintomas}
                                    <button id="${id}">Borrar</Button></div><br>             
                `
            })
        )

    busqueda.addEventListener('click', e => {
        e.preventDefault

        let id = e.target.id

        borrarBtn(id)




    })


})


const borrarBtn = (idI) => {

    let registroBorrar = JSON.parse(localStorage.getItem('Citas'))


    console.log(registroBorrar)

    let indexArreglo;


    registroBorrar.forEach((elemento, index) => {


        // console.log(elemento.nombre)
        console.log(idI)

        if (elemento.id == idI) {
            indexArreglo = index;
        }
        // console.log(indexArreglo)


    })

    registroBorrar.splice(indexArreglo,1);
    localStorage.setItem('Citas', JSON.stringify(registroBorrar));


    console.log(registroBorrar)
    busqueda.innerHTML = ''
    getLocalStorage()




}