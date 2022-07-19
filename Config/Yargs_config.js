import parse from 'yargs/yargs'

const yargs = parse(process.argv.slice(2))

const {puerto} = yargs
    .alias({
        p: 'puerto',
    })
    .default({
        puerto: 8080
    })
    .argv

export {puerto}