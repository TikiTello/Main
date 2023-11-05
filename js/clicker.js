var txt = document.getElementById('text')

var num = 0

var elements = document.getElementsByClassName("logo");

var myFunction = function() {
    num = num + 1;
    txt.innerHTML = "Haz hecho click " + num + " veces en el logo!"
};

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', myFunction, false);
}