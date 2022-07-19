import { fork } from 'child_process'


const randomController = {
    getRandoms: (req, res) => {
        let N = req.query.cant
        if(!N) N = 100000000
        const Gen_randoms = fork('./Tools/Random_Array.js')
        Gen_randoms.on('message', msg => {
                if (msg === 'listo') {
                    Gen_randoms.send(N)
                } else {
                    res.status(200).json(msg)
                }
            }
        )

    }
}

export default randomController