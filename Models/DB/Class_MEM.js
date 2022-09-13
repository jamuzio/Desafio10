import error_generator from "../../Tools/Error_Generator.js"


class Class_MEM {
    constructor (){
        this.Objects = []
        
    }
    save(NewElement){
        let obj = Object.create(NewElement)
        this.Objects.push(obj)
        return NewElement
    }
    cleanById(id){
        const indiceBuscado = this.Objects.findIndex(p => p._id == id)
        if(indiceBuscado === -1){
            throw error_generator.NOT_FOUND()
        } else {
            console.log(this.Objects[indiceBuscado])
            this.Objects.splice(indiceBuscado,1)  
        }
    }
    getAll(){
        return this.Objects
    }
    getOne(field, data){
        try{
            const ElementoBuscado = this.Objects.find(p => p[field] == data)
            if (!ElementoBuscado) {
                throw error_generator.NOT_FOUND()
            }
            return ElementoBuscado
        }
        catch(error){
            throw error         
        }
    }

    update(updateData){
        const id = updateData._id
        const indiceBuscado = this.Objects.findIndex(p => p._id == id)
        if(indiceBuscado === -1){
            throw error_generator.NOT_FOUND(`El objeto con id ${id} no fue encotrado`)
        } else {
            this.Objects.splice(indiceBuscado,1)
            let obj = Object.create(updateData)
            this.Objects.push(obj)
            return updateData
        }
    }
}

export default Class_MEM