/* document object model (dom). --> puente entre js y html para acceder a los elementos y etiquetas 

let titulo = document.querySelector('h1') 
perimte acceder a todos los elementos --> h1 es el titulo es decir que asigna una variable al título
titulo.innerHTML = 'Juego del número secreto'
let parrafo = document.querySelector('p')
parrafo.innerHTML = 'Ingresa un número del 1 al 10'

*/


// Asignar texto al título y parrafos:




let min = undefined;
let max = undefined;
let maximosIntentos = undefined;
let intento = 0;
let numeroSecreto = 0;
let listaNumerosSorteados = [];

/*
document.addEventListener('DOMContentLoaded', function() {
    // Una vez que el DOM esté completamente cargado, habilita el botón "iniciar"
   document.querySelector('#iniciar').removeAttribute('disabled');

});
*/

function asignarTextoElemento(elemento, texto) {
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = texto;

}

function asignarParametros(numeroMin, numeroMax, xIntentos) {
    min = numeroMin;
    max = numeroMax;
    intento = 0;
    maximosIntentos = xIntentos;
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Ingresa un número del ${min} al ${max}`);
    numeroSecreto = generarNumeroSecreto();
    document.querySelector('#iniciar').removeAttribute('disabled');

}

function generarNumeroSecreto() {
    let num = Math.floor(min + Math.random() * max);
    while (listaNumerosSorteados.includes(num)) 
        num = Math.floor(min + Math.random() * max);
    listaNumerosSorteados.push(num)
    /*
    otra forma con if
    if (listaNumerosSorteados.includes(num)){
        return generarNumeroSecreto()
    } else{
        listaNumerosSorteados.push(num);
        return num;
    }

    */

    // mientras que el numero este en la lista, crear numero nuevo
    // se podría almacenar números y verificar si ya se sorteó ese numero para que siempre sean distintos
    // si ya se sortearon todos los números agregar un cartel de que ya se adivinaron o sortearon todos los números.
    return num;
}


asignarParametros(1, 10, 3);

console.log(numeroSecreto);
console.log(`Lista de números secretos: ${listaNumerosSorteados}`)

//document.querySelector('#iniciar').removeAttribute('disabled');


function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('intentoUsuario').value); //trae el valor
    intento++;
    console.log(`intento nro: ${intento}`)
    console.log('Numero de usuario: ', numeroDeUsuario);
    console.log('Coinciden numeros?: ', numeroDeUsuario === numeroSecreto);
    console.log(typeof (numeroDeUsuario))

    if (numeroDeUsuario === numeroSecreto) {
        ganaste()
    } else {
        if (numeroDeUsuario < min || numeroDeUsuario > max) {
            alert('El numero se encuentra fuera del rango del 1 al 10')
        }
        else {
            if (numeroDeUsuario < numeroSecreto) {
                asignarTextoElemento('p', 'El numero secreto es mayor');
            } else {
                asignarTextoElemento('p', 'El numero secreto es menor');
            }
        }
    }

    limpiarCaja();

    if (intento === maximosIntentos) {

        gameOver();
    }
    return;

}

function ganaste(){
    if (listaNumerosSorteados.length === max){
        finalizar()
    } else {
        asignarTextoElemento('h1', `¡GANASTE!`)
        asignarTextoElemento('p', `¡Has acertado en ${intento} ${intento == 1 ? 'intento' : 'intentos'}!. <br/>El número secreto era: ${numeroSecreto}.<br/> Puedes jugar nuevamente.`)
        document.querySelector('#reiniciar').removeAttribute('disabled');
        document.querySelector('#iniciar').setAttribute('disabled', 'true');
    }
}




function gameOver() {
    if (listaNumerosSorteados.length === max){
        finalizar()
    } else {
        asignarTextoElemento('h1', `¡Has Perdido!`);
        asignarTextoElemento('p', ` El número secreto era: ${numeroSecreto}`);
        document.querySelector('#reiniciar').removeAttribute('disabled');
        document.querySelector('#iniciar').setAttribute('disabled', 'true');
    }
}


function limpiarCaja() {
    document.querySelector('#intentoUsuario').value = '';
}

function nuevoJuego() {
    console.clear();
    limpiarCaja();
    console.log('Nuevo juego');
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');

    asignarParametros(1, 10, 3);
    console.log('Nuevo numero secreto: ', numeroSecreto);
    console.log(`Lista de números secretos: ${listaNumerosSorteados}`)
}


function finalizar(){
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    asignarTextoElemento('h1', `Jugaste todos los números`);
    asignarTextoElemento('p', `Numeros sorteados: ${listaNumerosSorteados}`);
    document.querySelector('#iniciar').setAttribute('disabled', 'true');

}



