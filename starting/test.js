const prompt = require('prompt-sync')({sigint: true})

let message = prompt('Hola, ¿Cual es tu nombre')

console.log("Bienvenido " + message)