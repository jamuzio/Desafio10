import error_generator from "../Tools/Error_Generator.js"

export default class Message {
    #id
    #author
    #date
    #texto
  
    constructor({ id, email, nombre, apellido, edad, avatar, texto}) {
      this.id = id
      this.author = {EMAIL: email, NOMBRE: nombre, APELLIDO: apellido, EDAD: edad, AVATAR: avatar}
      this.#date = `${Getdate()}`
      this.texto = texto
    }
  
    set id(id) {
        if (!id) throw error_generator.MISSING_DATA('"id" es un campo requerido')
      this.#id = id
    }
  
  
    set author(author) {
        if(!author.EMAIL) throw error_generator.MISSING_DATA('"Email" es un campo requerido')
        if(!emailRegex.test(author.EMAIL)) throw error_generator.WRONG_TYPE('Ingrese un Email valido')

        if(!author.NOMBRE) throw error_generator.MISSING_DATA('"Nombre" es un campo requerido')
        if (!isNaN(author.NOMBRE)) throw error_generator.WRONG_TYPE('Ingrese un Nombre valido')

        if(!author.APELLIDO) throw error_generator.MISSING_DATA('Apellido es un campo requerido')
        if (!isNaN(author.APELLIDO))throw error_generator.WRONG_TYPE('Ingrese un Apellido valido')

        if(!author.EDAD) throw error_generator.MISSING_DATA('"Edad" es un campo requerido')
        if (isNaN(author.EDAD)) throw error_generator.WRONG_TYPE('"Edad" debe ser numérico')
        if (author.EDAD < 0) throw error_generator.WRONG_TYPE('"Edad" debe ser positivo')

        if(!author.AVATAR) throw error_generator.MISSING_DATA('"Avatar" es un campo requerido')
      this.#author = author
    }
  
    set texto(texto) {
      if (!texto) throw error_generator.MISSING_MESSAGE('Debe incluir un mensaje')
      this.#texto = texto
    }
  
    datos() {
      return Object.freeze(JSON.parse(JSON.stringify({
        _id: this.#id,
        AUTHOR: this.#author,
        DATE: this.#date,
        TEXT: this.#texto
      })))
    }
  }

function Getdate() {
    const hoy = new Date();
    const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    return fecha + ' ' + hora
}


const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
