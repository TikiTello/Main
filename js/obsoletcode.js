/*
// Ruta de la carpeta a verificar (puedes modificarla según tus necesidades)
//var carpeta = 'Main/articles';
var carpeta = 'articles/';

// Array para almacenar archivos válidos
var archivosValidos = [];

// Función para validar la estructura de un archivo JSON
function validarEstructura(archivo) {
    try {
        var contenido = JSON.parse(archivo);
        return (
            contenido.tipo !== undefined &&
            contenido.titulo !== undefined &&
            contenido.fecha !== undefined &&
            contenido.descripcion !== undefined &&
            contenido.autor !== undefined &&
            contenido.articulo !== undefined &&
            contenido.articulo.cabezera !== undefined &&
            contenido.articulo.texto !== undefined
        );
    } catch (error) {
        return false;
    }
}

// Función para crear y agregar elementos HTML para cada archivo válido
function crearElementosHTML() {
    var articlesZone = document.getElementById('articleszone');

    archivosValidos.forEach(function(archivo) {
        var postBox = document.createElement('div');
        postBox.className = 'post-box';

        var category = document.createElement('h2');
        category.className = 'category';
        category.textContent = archivo.contenido.tipo;

        var postTitle = document.createElement('a');
        postTitle.className = 'post-title';
        postTitle.textContent = archivo.contenido.titulo;
        postTitle.href = '#'; // Asigna la URL apropiada

        var postDate = document.createElement('span');
        postDate.className = 'post-date';
        postDate.textContent = archivo.contenido.fecha;

        var postDescription = document.createElement('p');
        postDescription.className = 'post-decription';
        postDescription.textContent = archivo.contenido.descripcion;

        var profile = document.createElement('div');
        profile.className = 'profile';

        var profileName = document.createElement('span');
        profileName.className = 'profile-name';
        profileName.textContent = archivo.contenido.autor;

        // Verifica si el autor es "TikiTello" y ajusta la imagen de perfil
        if (archivo.contenido.autor === 'TikiTello') {
            var profileImage = document.createElement('img');
            profileImage.className = 'profile-img';
            profileImage.src = 'images/logo.png'; // Asigna la URL de la imagen de perfil personalizada
            profile.appendChild(profileImage);
        }

        // Verifica si la categoría es "Indie Studio" y agrega la clase "indiestudio" y una imagen personalizada
        if (archivo.contenido.tipo === 'Indie Studio') {
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

        articlesZone.appendChild(postBox);
    });
}

// Función para listar los archivos en la carpeta, validarlos y guardar los válidos en el array
function listFiles() {
    fetch(carpeta)
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, "text/html");
            var links = Array.from(htmlDoc.querySelectorAll('a'));
            console.log('Ruta completa de la carpeta "articles/":', window.location.origin + '/' + carpeta );
            var archivos = links
                .map(a => a.href) // Obtener rutas completas
                .filter(file => file.startsWith(window.location.origin + '/' + carpeta)); // Filtrar rutas de la carpeta "articles/"

            console.log('Archivos en la carpeta "articles/":');

            archivos.forEach(function(archivo, index) {
                fetch(archivo)
                    .then(response => response.text())
                    .then(data => {
                        if (validarEstructura(data)) {
                            console.log('Archivo válido:', archivo);
                            archivosValidos.push({ nombre: archivo.split('/').pop(), contenido: JSON.parse(data) });

                            // Verificar si se ha llegado al último archivo
                            if (index === archivos.length - 1) {
                                // Llama a la función para crear y agregar elementos HTML cuando se haya procesado el último archivo
                                crearElementosHTML();
                            }
                        } else {
                            console.log('Archivo no válido (estructura incorrecta):', archivo);
                        }
                    })
                    .catch(error => {
                        console.error('Error al leer el archivo:', archivo, error);
                    });
            });
        })
        .catch(error => {
            console.error('Error al leer la carpeta:', error);
        });
}

listFiles(); // Llama a la función para listar y validar los archivos cuando se cargue la página.
*/