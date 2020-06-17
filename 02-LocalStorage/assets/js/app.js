//variables
const listaTweets = document.querySelector("#lista-tweets");

//Event Listeners

eventListeners();

function eventListeners() {
  //cuando se envia el formulario
  document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    //borrar tweets
    listaTweets.addEventListener('click', borrarTweet);
    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//Funciones
//añadir tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  //leer el valor del textarea
  const tweet = document.querySelector('#tweet').value;
  //crear botón de eliminar
  const botonBorrar = document.createElement('a');
  botonBorrar.classList = 'borrar-tweet';
  botonBorrar.innerText = 'X';
  
  //crear elemento y añadir contenido a la lista
  const li = document.createElement('li');
  li.innerText = tweet;
  //añade el botón de borrar al tweet
  li.appendChild(botonBorrar);
  //añade el botón a la lista
  listaTweets.appendChild(li);
  //añadir a LocalStorage
  agregarTweetLocalStorage(tweet);
}

//borrar tweet del DOM
function borrarTweet(e){
  e.preventDefault();
  if(e.target.className === 'borrar-tweet'){
    e.target.parentElement.remove()
    borrarTweetLocalStorage(e.target.parentElement.innerText);
    //console.log(e.target.parentElement.innerText);
    //console.log(e.target.parentElement.remove());
    //alert('Tweet Eliminado');
  }
}

//Mostrar datos de LocalStorage en la lista
function localStorageListo(){
  let tweets;

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet){
     //crear botón de eliminar
  const botonBorrar = document.createElement('a');
  botonBorrar.classList = 'borrar-tweet';
  botonBorrar.innerText = 'X';
  
  //crear elemento y añadir contenido a la lista
  const li = document.createElement('li');
  li.innerText = tweet;
  //añade el botón de borrar al tweet
  li.appendChild(botonBorrar);
  //añade el botón a la lista
  listaTweets.appendChild(li);
  });
}

//Agrega tweet a local storage
function agregarTweetLocalStorage(tweet){
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  //añadir nuevo tweet
  tweets.push(tweet);
  //convertir de string a arreglo para local storage
  localStorage.setItem('tweets', JSON.stringify(tweets) );
}

// Comprobar que haya elementos en LocalStorage
function obtenerTweetsLocalStorage(){
  let tweets;
  //Revisamos valores de LocalStorage
  if(localStorage.getItem('tweets') ===null ){
    tweets = [];
  } else{
    //Covertir string en un arreglo
    tweets = JSON.parse(localStorage.getItem('tweets') );
  }
  return tweets;
}

//Eliminar tweet de LocalStorage
function borrarTweetLocalStorage(tweet){
  let tweets, tweetBorrar;
  //Elimina la X del tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();
  //Recorre el Array 
  tweets.forEach(function(tweet, index){
    console.log(tweet);
      if(tweetBorrar === tweet){
        //Elimina el tweet en base al indice
        tweets.splice(index, 1);
      }
  });

  localStorage.setItem('tweets', JSON.stringify(tweets) );
  //console.log(tweets);
}