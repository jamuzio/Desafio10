
function generateID(length=24){

    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let ID = String(Date.now())
    for(let i=0; i < 15; i++){
        let position = Math.floor(Math.random() * ID.length)
        let charToInsert = charset.charAt(Math.floor(Math.random() * charset.length))
        ID = [ID.slice(0, position), charToInsert, ID.slice(position)].join('')
    }
    return ID.slice(0,length)
}

export default generateID