//Variables

const listaTweets = document.querySelector('#lista-tweets')


//Event Listenners

function eventListenners () {
    //cuando se envia el formulario
    const eventFormul = document.querySelector('#formulario') 
    eventFormul.addEventListener('submit', agregarTweet);
    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet)
    //Contenido cargado
    document.addEventListener('DOMContentLoaded', LocalStorageListo)
}
eventListenners()


//Funciones

//Agregar tweet del formulario

function agregarTweet (e) {
    e.preventDefault()
    //Obtener el valor de text area
    const tweet = document.querySelector('#tweet').value
    //Crear boton de eliminar
    const botonBorrar = document.createElement('a')
    //Agregar lista y texto del boton
    botonBorrar.classList = 'borrar-tweet'
    botonBorrar.innerText = 'X'
    //Crear elemento y agregar contenido a la lita
    const li = document.createElement('li')
    //Agregar texto y li a lista tweets q es la clase donde se vana  almacenar
    li.innerText = tweet
    // Agregar boton borrar al tweet
    li.appendChild(botonBorrar)
    //Me agregua todo lo anterior como hijos de listaTweets
    listaTweets.appendChild(li)

    //LOCAL STORAGE//
    //Agregar a local storage
    agregarTweetLocalStorage(tweet);

}

function borrarTweet (e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') { //Si doy click en una clase con ese nombre eme lo borra con el codigo de abajo
        e.target.parentElement.remove() // aca esta borrando el padre de la clase q es su li, asi se borrario de la pantalla

        //LOCAL STORAGE//
        borrarTweetLocalStorage(e.target.parentElement.innerText)
    }
}

//Mostrar datos de local storage en la lista

function LocalStorageListo(){
    let tweets

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
        //Crear boton de eliminar // ACA COGEMOS EL CODIGO DE ARRBA ARA IMPRIMIR LO Q ESTA EN EL LOCAL STORAGE
        const botonBorrar = document.createElement('a')
        //Agregar lista y texto del boton
        botonBorrar.classList = 'borrar-tweet'
        botonBorrar.innerText = 'X'
        //Crear elemento y agregar contenido a la lita
        const li = document.createElement('li')
        //Agregar texto y li a lista tweets q es la clase donde se vana  almacenar
        li.innerText = tweet
        listaTweets.appendChild(li)
        // Agregar boton borrar al tweet
        li.appendChild(botonBorrar)

        
    });
}


//Agregar tweet a local storage
function agregarTweetLocalStorage(tweet){
    let tweets;

    tweets = obtenerTweetsLocalStorage()
    //Agregar nuevo tweet
    tweets.push(tweet)
    //Convertir de strin a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets))

} 

//Comprobar q haya elementos en local storage y retorna el arreglo
function obtenerTweetsLocalStorage () {
    let tweets;
    //revisamos los valores de local storage
    if(localStorage.getItem('tweets') === null){
        tweets = []
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'))
    }
    return tweets
}

function borrarTweetLocalStorage(tweet){
    
    let tweets, tweetsBorrar;
    //Elimina la X
    tweetsBorrar = tweet.substring(0, tweet.length - 1)

    tweets = obtenerTweetsLocalStorage()

    tweets.forEach(function(tweet, index){
        if(tweetsBorrar === tweet){
            tweets.splice(index, 1)
        }
    })

    localStorage.setItem('tweets', JSON.stringify(tweets))

}