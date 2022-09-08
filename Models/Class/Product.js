import error_generator from "../../Tools/Error_Generator.js"

export default class Product {
    #id
    #title
    #price
    #thumbnail
  
    constructor({ id, title, price, thumbnail}) {
      this.id = id
      this.title = title
      this.price = price
      this.thumbnail = thumbnail
    }
  
    set id(id) {
        if (!id) throw error_generator.MISSING_DATA('"id" es un campo requerido')
      this.#id = id
    }
  
    set title(title) {

      if (!title) throw error_generator.MISSING_DATA('"TITLE" es un campo requerido')
      this.#title = title
    }
  
    set price(price) {
      if (!price) throw error_generator.MISSING_DATA('"PRICE" es un campo requerido')
      if (isNaN(price)) throw error_generator.WRONG_TYPE('"PRICE" debe ser numérico')
      if (price < 0) throw error_generator.WRONG_TYPE('"PRICE" debe ser positivo')
      this.#price = price
    }

    set thumbnail(thumbnail){
      if (!thumbnail) throw error_generator.MISSING_DATA('"thumbnail" es un campo requerido')
      this.#thumbnail = thumbnail
    }

    updatethumbnail(newThumbnail){
      if (!newThumbnail) throw error_generator.MISSING_DATA('Ingrese la nueva direccion de imagen')
      this.#thumbnail = newThumbnail
    }
  
    updateprice(newPrice){
      if (!newPrice) throw error_generator.MISSING_DATA('Ingrese el nuevo precio')
      if (isNaN(newPrice)) throw error_generator.WRONG_TYPE('El precio debe ser numérico')
      if (newPrice < 0) throw error_generator.WRONG_TYPE('El nuevo precio debe ser positivo')
      this.#price = newPrice
    }

    datos() {
      return Object.freeze(JSON.parse(JSON.stringify({
        _id: this.#id,
        TITLE: this.#title,
        PRICE: this.#price,
        THUMBNAIL: this.#thumbnail
      })))
    }
  }
  