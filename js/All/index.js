document.addEventListener('DOMContentLoaded', function () {
    let emojis = ['😀', '😄', '😃', '😁', '😆']; // Lista de emojis
    let i = 0;

    function animateEmoji() {
        document.title = 'Inicio ' + emojis[i];
        i = (i + 1) % emojis.length; 
        setTimeout(animateEmoji, 1000);
    }

    animateEmoji();
});
// $(function () {
//     setTimeout(function () {
//         var correo = appData.email;
//         //----------------------PROMESA------------------------------------------
//         obtenerNombreEmpleado(correo)
//             .then(function (response) {
//                 var nombreUsuario = response.nombre;
//                 var bienvenidaElement = document.querySelector("#nombre_en_index");
//                 bienvenidaElement.innerHTML = nombreUsuario;
//             })
//             .catch(function (error) { });
//         //----------------------PROMESA------------------------------------------
//         obtenerTotalEmpleado()
//             .then(function (response) {
//                 var totalEmpleados = response.totalEmpleados;
//                 var totalEmpleadosElement =
//                     document.querySelector("#total_empleados");
//                 totalEmpleadosElement.innerHTML = totalEmpleados;
//             })
//             .catch(function (error) { });
//         //----------------------PROMESA------------------------------------------
//         get_imagenes()
//             .then(function (response) {
//                 // Filtrar las imágenes con ACTION igual a 2
//                 const imagenes = response.datos;
//                 // console.log(imagenes);
//                 const Action2 = imagenes.find((dato) => dato.ACTION == "B");
//                 if (Action2) {
//                     // La imagen con ACTION igual a 2 existe
//                     const img = Action2.IMG;
//                     var imgElement = document.querySelector("#img_action_2");
//                     var imgR = imagesRoute + "/" + img; // Ruta dinámica
//                     // Cambia el atributo src de la imagen
//                     imgElement.src = imgR;
//                 } else {
//                     // No se encontró ninguna imagen con ACTION igual a 2
//                     console.log("No se encontró una imagen con ACTION igual a 2");
//                 }
//             })
//             .catch(function (error) {
//                 // Manejar errores de la promesa
//                 console.log("Error al obtener las imágenes:", error);
//             });
//         //----------------------PROMESA------------------------------------------
//         get_imagenes()
//             .then(function (response) {
//                 const imagenes = response.datos;
//                 // console.log(imagenes);
//                 // Iterar sobre las imágenes
//                 $.each(imagenes, function (index, dato) {
//                     if (dato.ACTION === "A") {
//                         var img = dato.IMG;
//                         var cont = dato.CONT;
//                         var titulo = dato.TITULO;
//                         var contenido = dato.CONTENIDO;
//                         var imgR = imagesRoute + "/" + img; // Ruta dinámica
//                         var imgElement = $('<img />', {
//                             src: imgR,
//                             loading: 'lazy',
//                         });
//                         $('#imges_action_' + cont).append(imgElement);
//                         $('#titulo_' + cont).append(titulo);
//                         $('#content_' + cont).append(contenido);
//                     }
//                 });
//             })
//             .catch(function () {
//                 console.log("Error al obtener las imágenes:");
//             });
//     }, 1200);
// });