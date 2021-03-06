$(document).ready(function(){
  initPlayer();
  getSongs();
});

var audio
var music;

audio = document.getElementById('player');

function initPlayer(){
  $('#shuffle').click(function(){
    /* empty = elimina todos los nodos secundarios
               y el contenido de los elementos
               seleccionados del DOM
    */
    $('#playlist').empty();
    console.log(shuffle(music.songs));
    genList(music);
    playSong(0);
  });
}

function getSongs(){
  $.getJSON("./js/app.json", function(mjson){
    music = mjson;
    // console.log(music);
    genList(music);
  });
}

function playSong(id){
  console.log(id);
  var long = music.songs;
  if(id>=long.length){
    console.log('se acabo');
    audio.pause();
  }else{
    $('#img-album').attr('src', music.songs[id].image);
    $('#player').attr('src', music.songs[id].song);
    audio.play();
    console.log('hay mas canciones');
    scheduleSong(id);
  }
}

function genList(music){
  $.each(music.songs, function(i, song){
    $('#playlist').append('<li class="list-group-item" id="'+i+'">'+song.name+'</li>')
  });

  $('#playlist li').click(function(){
    var selectedsong = $(this).attr('id');
    /* console.log(selectedsong); */
    playSong(selectedsong);
  });
}

function scheduleSong(id){
  /* cuando el audio ha terminado se llama a la funcion */
  audio.onended = function(){
    console.log('terminó la canción');
    playSong(parseInt(id)+1);
  }
}

function shuffle(array){
  for(var random, temp, position = array.length; position; random = Math.floor(Math.random() * position), temp = array[--position], array[position] = array[random], array[random] = temp);
  return array;
}