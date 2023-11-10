document.addEventListener('DOMContentLoaded', function () {
    var redactZone = document.getElementById('redactzone');

    var botoneraDiv = document.createElement('div');
    var guardarTodo = document.createElement('button');
    botoneraDiv.className = 'botonera';
    guardarTodo.className = 'botonera-element centrarboton';
    guardarTodo.id = 'guardado';
    guardarTodo.textContent = 'Guardar JSON';

    redactZone.appendChild(botoneraDiv);

    var tiposElementos = [
        { tipo: 'Cabecera', placeholder: 'Ingrese el título aquí', id: 'cabecera' },
        { tipo: 'Texto', placeholder: 'Ingrese el texto aquí', id: 'texto' },
        { tipo: 'Imagen', placeholder: 'Ingrese la URL de la imagen aquí', id: 'imagen' }
    ];

    var jsonDatos = {
        "tipo": "Indie Studio",
        "titulo": "Dummy Title",
        "fecha": obtenerFecha(),
        "descripcion": "Dummy Text",
        "autor": "TikiTello",
        "articulo": {}
    };

    tiposElementos.forEach(function (tipoElemento) {
        var botonElement = document.createElement('button');
        botonElement.className = 'botonera-element';
        botonElement.textContent = 'Agregar ' + tipoElemento.tipo;

        botonElement.addEventListener('click', function () {
            var nuevoElementoDiv = document.createElement('div');
            nuevoElementoDiv.className = "elementoredact";

            var inputTexto = document.createElement('textarea');
            inputTexto.className = "article-imput";
            inputTexto.placeholder = tipoElemento.placeholder;
            inputTexto.id = tipoElemento.id;

            nuevoElementoDiv.appendChild(inputTexto);

            var botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.className = "aricle-delete";
            botonEliminar.addEventListener('click', function () {
                nuevoElementoDiv.remove();
            });

            nuevoElementoDiv.appendChild(botonEliminar);

            textZone.appendChild(nuevoElementoDiv);
        });

        botoneraDiv.appendChild(botonElement);
    });

    redactZone.appendChild(botoneraDiv);

    var textZone = document.createElement('div');
    textZone.className = 'textzone';
    textZone.id = 'textzone';

    redactZone.appendChild(textZone);
    redactZone.appendChild(guardarTodo);

    guardarTodo.addEventListener('click', function () {
        var elementosInput = document.querySelectorAll('.article-imput');

        elementosInput.forEach(function (elemento) {
            var id = elemento.id;
            var contenido = elemento.value;

            // Reemplazar saltos de línea por <br>
            contenido = contenido.replace(/\n/g, '<br>');

            // Obtener el siguiente número para evitar sobrescribir
            var numero = 1;
            while (jsonDatos.articulo.hasOwnProperty(`${id} ${numero}`)) {
                numero++;
            }

            // Agregar al objeto JSON en la propiedad correspondiente
            jsonDatos.articulo[`${id} ${numero}`] = contenido;
        });

        // Convertir el objeto JSON a una cadena
        var jsonString = JSON.stringify(jsonDatos, null, 2);

        // Crear un Blob con el contenido JSON
        var blob = new Blob([jsonString], { type: 'application/json' });

        // Crear un enlace de descarga
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        // Nombre del archivo con formato "dia-mes-año-hora-minuto.json"
        var fechaArchivo = obtenerFechaArchivo();
        var nombreArchivo = `${fechaArchivo}.json`;

        // Asignar el nombre del archivo al enlace de descarga
        link.download = nombreArchivo;

        // Simular un clic en el enlace para iniciar la descarga
        link.click();
    });

    function obtenerFecha() {
        var fechaActual = new Date();
        var dia = fechaActual.getDate();
        var mes = fechaActual.getMonth() + 1;
        var anio = fechaActual.getFullYear();

        return dia + '/' + mes + '/' + anio;
    }

    function obtenerFechaArchivo() {
        var fechaActual = new Date();
        var dia = fechaActual.getDate();
        var mes = fechaActual.getMonth() + 1;
        var anio = fechaActual.getFullYear();
        var hora = fechaActual.getHours();
        var minutos = fechaActual.getMinutes();

        return `${dia}${mes}${anio}${hora}${minutos}`;
    }
});
