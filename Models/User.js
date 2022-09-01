import error_generator from "../Tools/Error_Generator.js"
import bCrypt from "bcrypt"

export default class User {
    #id
    #email
    #pwd
  
    constructor({ id, email, pwd}) {
      this.id = id
      this.email = email
      this.pwd = pwd
    }
  
    get id() { return this.#id }
  
    set id(id) {
        if (!id) throw error_generator.MISSING_DATA('"id" es un campo requerido')
        this.#id = id
    }
  
  
    set email(email) {
        if(!email) throw error_generator.MISSING_DATA('"Email" es un campo requerido')
        if(!emailRegex.test(email)) throw error_generator.WRONG_TYPE('Ingrese un Email valido')
        this.#email = email
    }
  

    set pwd(pwd) {
        if(!pwd) throw error_generator.MISSING_DATA('"Contraseña" es un campo requerido')
        if(pwd.length < 60) pwd = createHash(pwd)
        this.#pwd = pwd
    }

    authenticate(password){
        if(!password) throw error_generator.MISSING_DATA('"Contraseña" es un campo requerido')
        if (bCrypt.compareSync(password, this.#pwd)) {
            return true
        }else {
            throw error_generator.AUTHE_ERROR()
        }
    }

    changePwd(OldPWD, NewPWD){
        if (bCrypt.compareSync(OldPWD, this.#pwd)) {
            NewPWD = createHash(NewPWD)
            this.#pwd = NewPWD
            return true
        }else {
            throw error_generator.AUTHE_ERROR()
        }
    }

    datos() {
      return Object.freeze(JSON.parse(JSON.stringify({
        _id: this.#id,
        EMAIL: this.#email
      })))
    }
    datosCompletos() {
        return Object.freeze(JSON.parse(JSON.stringify({
          _id: this.#id,
          EMAIL: this.#email,
          PWD: this.#pwd
        })))
      }
  }

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
  
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;