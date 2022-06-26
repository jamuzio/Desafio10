
const socket = io()

//Definimos esquema de Autores
const authorSchema = new normalizr.schema.Entity('autores',{},{idAttribute: 'EMAIL'})

// Definimos un esquema de mensaje
const MessageSchema = new normalizr.schema.Entity('Mesanjes', {
    AUTHOR: authorSchema
},{idAttribute: '_id'})

//Declaramos que se va a recibir un Array de Schemas
const MessagesSchema = [MessageSchema]

///// control de socket //////

socket.on('Products', (datos) => {
    console.log(datos)
    DisplayProd(datos)
})

socket.on('NewProd_res', async (Respuesta) => { 
    const divStatus = document.getElementById('Status')
    buscarPlantilla('Templates/info.hbs').then(plantilla => {
        console.log(Respuesta)
        const generarHtml = Handlebars.compile(plantilla)
        divStatus.innerHTML = generarHtml({Respuesta})
    })
})

socket.on('mensajes', (mensajes) => {
    const MsjDesNorm = normalizr.denormalize(mensajes.result, MessagesSchema, mensajes.entities)
    console.log(mensajes)
    console.log(MsjDesNorm)
    let COMPRESION = (JSON.stringify(mensajes).length / JSON.stringify(MsjDesNorm).length)*100
    COMPRESION = COMPRESION.toFixed(2)
    mostrarMensajes({MsjDesNorm, COMPRESION})
})

socket.on('Msj_res', (Respuesta) =>{
    const divMsj_info = document.getElementById('Msj_info')
    console.log(Respuesta)
    divMsj_info.innerHTML = Respuesta
})

/////  funciones axuliares /////////

async function DisplayProd(datos) {
    const divProductos = document.getElementById('Productos')
    buscarPlantilla('Templates/Productos.hbs').then(plantilla => {
        const generarHtml = Handlebars.compile(plantilla)
        divProductos.innerHTML = generarHtml(datos)
    })
}

async function mostrarMensajes(mensajes) {
    const divMensajes = document.getElementById('Mensajes')
    buscarPlantilla('Templates/chat.hbs').then(plantilla => {
        const generarHtml = Handlebars.compile(plantilla)
        console.log(mensajes)
        divMensajes.innerHTML = generarHtml(mensajes)
    })
}

function buscarPlantilla(url) {
    return fetch(url).then(res => res.text())
}

/////  control de botones //////

const btn_newProd = document.getElementById('btn_newProd')
btn_newProd.addEventListener('click', event => {
    const TITLE = document.getElementById('TITLE').value
    const PRICE = document.getElementById('PRICE').value
    const THUMBNAIL = document.getElementById('THUMBNAIL').value
    socket.emit('NewProd', { TITLE, PRICE, THUMBNAIL })
})

const btn = document.getElementById('btn_enviar')
btn.addEventListener('click', event => {
    const EMAIL = document.getElementById('inputEmail').value
    const NOMBRE = document.getElementById('inputNombre').value
    const APELLIDO = document.getElementById('inputApellido').value
    const EDAD = document.getElementById('inputEdad').value
    const ALIAS = document.getElementById('inputAlias').value
    const AVATAR = document.getElementById('inputAvatar').value
    const TEXTO = document.getElementById('inputTexto').value
    socket.emit('mensaje', { EMAIL, NOMBRE, APELLIDO, EDAD, ALIAS, AVATAR, TEXTO})
})

///// Axuliar HBS ///////

Handlebars.registerHelper('ifCond', function(v1, v2, options) { //funcion auxiliar para hbs de info.hbs
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

