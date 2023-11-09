// Asegúrate de tener elementos con las clases "blog-page" y "article-page" en tu HTML.
var blogPage = document.querySelector('.blog-page');
var articlePage = document.querySelector('.article-page');
var backhome = document.querySelector('.back-home');

backhome.addEventListener('click', function() {
    articlePage.style.transform = 'scale(0)';
});

// Ruta de la carpeta "articles/"
var carpeta = 'articles/';

// Array con los nombres de los archivos JSON
var nombresArchivos = [
    '11111.json',
    '22222.json',
    '33333.json',
    '44444.json',
    '55555.json',
    '66666.json',
    '77777.json'
];

// Elemento HTML donde deseas listar los archivos
var articlesZone = document.getElementById('articleszone');

// Elemento HTML donde deseas mostrar la información del archivo JSON
var infozone = document.getElementById('infozone');

// Listar los nombres de archivos JSON en la consola
console.log('Archivos JSON disponibles:');
nombresArchivos.forEach(function(nombreArchivo) {
    console.log(nombreArchivo);
});

window.onload = function() {
    // Este código se ejecutará cuando la página se cargue por completo.

    // Aquí puedes agregar tus instrucciones manualmente.
    // Por ejemplo, puedes minimizar "article-page" al cargar la página.
    articlePage.style.transform = 'scale(0)';
    articlePage.style.display = 'none';

    // También puedes realizar otras acciones según tus necesidades.
};

// Configura un manejador de eventos para el evento 'transitionend' en "blog-page"
blogPage.addEventListener('transitionend', function(event) {
    if (event.propertyName === 'transform' && getComputedStyle(this).transform === 'matrix(0, 0, 0, 0, 0, 0)') {
        // La escala ha terminado de pasar a 0
        this.style.display = 'none'; // Oculta "blog-page" después de la transición
        articlePage.style.transform = 'scale(1)';
    }
});

articlePage.addEventListener('transitionend', function(event) {
    if (event.propertyName === 'transform' && getComputedStyle(this).transform === 'matrix(0, 0, 0, 0, 0, 0)') {
        // La escala ha terminado de pasar a 0
        this.style.display = 'none';
        blogPage.style.removeProperty('display');
        blogPage.style.transform = 'scale(1)';
    }
});

nombresArchivos.forEach(function(nombreArchivo) {
    // Crea un elemento <div> para el post-box
    var postBox = document.createElement('div');
    postBox.className = 'post-box';

    // Carga el contenido del archivo JSON
    fetch(carpeta + nombreArchivo)
        .then(response => response.text())
        .then(data => {
            var contenido = JSON.parse(data);

            // Crea elementos para mostrar el contenido del archivo
            var category = document.createElement('h2');
            category.className = 'category';
            category.textContent = contenido.tipo;

            // Crea un enlace "<a>" con el nombre del archivo (sin la extensión .json)
            var postTitle = document.createElement('a');
            postTitle.className = 'post-title';
            postTitle.textContent = contenido.titulo;
            postTitle.href = '#' + nombreArchivo.split('.json')[0]; // Asigna el enlace con el nombre del archivo (sin .json)

            // Configura un manejador de eventos para minimizar y maximizar cuando se hace clic en el enlace
            postTitle.addEventListener('click', function() {
                blogPage.style.transform = 'scale(0)';
                articlePage.style.removeProperty('display');

                // Accede a la información del archivo JSON y escribirla en "infozone"
                infozone.innerHTML = ''; // Limpiar contenido anterior

                // Accede a la información del archivo JSON
                var articulo = contenido.articulo;

                // Iterar a través de los elementos dentro de la sección "articulo" y mostrar los textos
                for (var clave in articulo) {
                    if (articulo.hasOwnProperty(clave)) {
                        if (clave.startsWith('cabezera')) {
                            // Crear un elemento <h2> para la cabecera
                            var cabeceraElemento = document.createElement('h2');
                            cabeceraElemento.className = 'sub-heading';
                            cabeceraElemento.textContent = articulo[clave];

                            // Agregar el elemento al "infozone"
                            infozone.appendChild(cabeceraElemento);
                        } else if (clave.startsWith('texto')) {
                            // Crear un elemento <p> para el texto
                            var textoElemento = document.createElement('p');
                            textoElemento.className = 'post-text';
                            textoElemento.textContent = articulo[clave];

                            // Agregar el elemento al "infozone"
                            infozone.appendChild(textoElemento);
                        } else if (clave.startsWith('imagen')) {
                            // Crear un elemento <img> para la imagen
                            var imgElemento = document.createElement('img');
                            imgElemento.className = 'article-img';
                            imgElemento.src = articulo[clave]; // Asignar la URL de la imagen

                            // Agregar el elemento al "infozone"
                            infozone.appendChild(imgElemento);
                        }
                    }
                }
            });

            var postDate = document.createElement('span');
            postDate.className = 'post-date';
            postDate.textContent = contenido.fecha;

            var postDescription = document.createElement('p');
            postDescription.className = 'post-description';
            postDescription.textContent = contenido.descripcion;

            var profile = document.createElement('div');
            profile.className = 'profile';

            var profileName = document.createElement('span');
            profileName.className = 'profile-name';
            profileName.textContent = contenido.autor;

            // Verifica si el autor es "TikiTello" y ajusta la imagen de perfil
            if (contenido.autor === 'TikiTello') {
                var profileImage = document.createElement('img');
                profileImage.className = 'profile-img';
                profileImage.src = 'images/logo.png'; // Asigna la URL de la imagen de perfil personalizada
                profile.appendChild(profileImage);
            }

            // Verifica si la categoría es "Indie Studio" y agrega la clase "indiestudio" y una imagen personalizada
            if (contenido.tipo === 'Indie Studio') {
                postBox.classList.add('indiestudio');
                var postImage = document.createElement('img');
                postImage.className = 'post-img';
                postImage.src = 'images/logo.png'; // Asigna la URL de la imagen personalizada
                postBox.appendChild(postImage);
            }

            postBox.appendChild(category);
            postBox.appendChild(postTitle);
            postBox.appendChild(postDate);
            postBox.appendChild(postDescription);

            profile.appendChild(profileName);
            postBox.appendChild(profile);

            // Agrega el post-box al elemento HTML donde deseas listar los archivos
            articlesZone.appendChild(postBox);
        })
        .catch(error => {
            console.error('Error al cargar el archivo:', error);
        });
});
