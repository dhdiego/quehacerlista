

// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



// Event Listeners
eventListeners();

function eventListeners () {

    // cuando el usuario agrega tweet
        formulario.addEventListener('submit', agregarTweet);

    // cuando el documento esta listo

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        console.log(tweets);

        crearHTML();
    })
}




// Funciones

function agregarTweet(e) {
    e.preventDefault();
   

    // Text area (donde escribe el usuario)

    const tweet = document.querySelector('#tweet').value 

    // validacion

    if(tweet === '') {
        mostrarError('Un Mensaje no puede estar vacio');

        return;
    }

    // añadir al arreglo de tweets

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj];

   
    // una vez agregado creamos el html

    crearHTML();

    //reiniciar el formulario

    formulario.reset();
   
}

//mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertarlo en el contenido

    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);

    // elimina el mensaje de error despues de 3seg
    setTimeout(() => {
        mensajeError.remove()
        
    }, 3000);

}

// muestra listado de tweets

function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0 ) {
        tweets.forEach( tweet => {
            // agregar un boton de eliminar

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // añadir funcion de eliminar

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');

            // añadir texto

            li.innerText = tweet.tweet;

            //asignar el boton
            li.appendChild(btnEliminar);


            // insertarlo en html

            listaTweets.appendChild(li)
        })
    }

    sincronizarStorage();
}

// agrega los tweets al LS

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

// elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
   
    crearHTML();
}


// limpiar html

function limpiarHTML() {
    while( listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}