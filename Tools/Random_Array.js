
process.on('message', msg => {
    if(!isNaN(msg)){
        const JSON_Obj = JSON_Random_gen(parseInt(msg))
        process.send(JSON_Obj)
        process.exit()        
    } else{
        console.log('Se recibido un parametro no valido')
    }
})

process.send('listo')


function JSON_Random_gen(n){
    const MIN = 1
    const MAX = 1001
    const R_array = Random_Filler(n, MIN, MAX)
    const JSON_Obj = {}
    for(let i = 1; i < MAX; i++){
        if(R_array[i]){
            JSON_Obj[i] = R_array[i]
        }
    }
    return JSON_Obj
}

function Random_Filler(n, min = 1, max){
    let Randoms = Array(max).fill(0)
    for(let i = 0; i < n; i++){
        Randoms[getRandomInt(min, max)] +=1
    }
    return Randoms

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
