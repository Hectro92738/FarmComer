// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>DataTables Example</title>
//     <!-- Incluye jQuery y DataTables -->
//     <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.6/css/jquery.dataTables.css">
//     <script type="text/javascript" charset="utf8" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
//     <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.6/js/jquery.dataTables.js"></script>
// </head>
// <body>

// <table id="example" class="display" style="width:100%">
//     <thead>
//         <tr>
//             <th>ID_APROBACION</th>
//             <th>EMP_NUM</th>
//             <th>DIRE</th>
//             <th>DEPT</th>
//             <th>ORGANIZACION</th>
//             <th>EMP_NAME</th>
//         </tr>
//     </thead>
//     <tbody>
//         <!-- Aquí se agregarán las filas de la tabla -->
//     </tbody>
// </table>

// <script>
// Tu response
var response = {
    status: 200,
    aprobaciones: [
        // ... (tu array aquí)
    ],
};

// Inicializar DataTable
$(document).ready(function () {
    $("#example").DataTable();
});

// Acceder a la propiedad "aprobaciones"
var aprobaciones = response.aprobaciones;

// Iterar sobre las aprobaciones y agregar filas a la tabla
aprobaciones.forEach(function (aprobacion) {
    var rowData = [
        aprobacion.ID_APROBACION,
        aprobacion.EMP_NUM,
        aprobacion.DIRE,
        aprobacion.DEPT,
        aprobacion.ORGANIZACION,
        aprobacion.aprobacion.EMP_NAME,
    ];

    // Agregar fila a la tabla
    $("#example").DataTable().row.add(rowData).draw(false);
});
var select = $("#status_colores");

var input = $("<input>", {
    type: "text",
    id: "nuevo_input",
    class: "form-control",
    placeholder: "Ingrese"
});
select.append(input);


// Entiendo y ratifico que debo realizar el curso: Tecnologías emergentes en: https://emtech.digital/santander-openacademy/

// Entiendo y ratifico que a partir del 23 de julio debo inscribirme a la segunda fase del programa iniciando sesión en mi cuenta en Santander Open Academy