import parse from 'yargs/yargs'

const yargs = parse(process.argv.slice(2))

const {puerto, modo} = yargs
    .alias({
        m: 'modo', 
        p: 'puerto',
    })
    .default({
        modo: 'fork',
        puerto: 8080
    })
    .argv

export {puerto, modo}