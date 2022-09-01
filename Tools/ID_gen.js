
function generateID(length=24){

    const charset = 'abcdefghijklmnopqrstuvwxyz'
    let ID = String(Date.now())
    length -= ID.length
    for(let i=0; i < length; i++){
        let position = Math.floor(Math.random() * ID.length)
        let charToInsert = charset.charAt(Math.floor(Math.random() * charset.length))
        ID = [ID.slice(0, position), charToInsert, ID.slice(position)].join('')
    }
    return ID
}

export default generateID