$(document).ready(function () {
    $("#todos_los_permisos").hide();
    setTimeout(function () {
        //----------------------------------------------------------------
        // Nombre del Archivo: configuracion_roles.js
        // Autor: Cervantes Yañez Hector
        // Fecha de Creación: 16-11-2023
        // PANEL PARA ADMINISTRAR TODOS LOS PERMISOS ECONOMICOS DE TODOS LOS EMPLEADOS
        //----------------------------------------------------------------
        //----------------------------------------------------------------
        conocer_tipo_usuarios(appData.numEmp) // Primero verificamos en al tabla de "xxhr_aprobacion" despues en la tabla de la estructura
            .then(function (response) {
                $("#animacion_cargando").removeClass("loading-animation");
                //console.log(response);
                var ubi = response.ubicacion; // Departaento y Direccion de cada empleado
                var departamento = ubi.DEPT; // Departamento de cada empleado
                var job = response.jobName; //Los primeros caracteres de el JOB_NAME antes del punto"."
                var direccion = ubi.DIRE; // Departamento de cada empleado
                var organizacion = ubi.ORGANIZACION; // ORGANIZACION de cada empleado
                switch (departamento) {
                    case "PC73":
                        cargarTodosLosPermisos();
                        $("#todos_los_permisos").show();
                        // ----------------------------------------
                        getstatus()
                            .then(function (response) {
                                console.log(response);
                                // Aquí llenamos el select con los datos de los empleados
                                var select = $("#status_colores");
                                select.empty();
                                response.permisos = response.permisos.filter(
                                    (permiso) =>
                                        permiso.CODIGO !== "SOAP" 
                                );
                                $.each(response.permisos, function (i, p) {
                                    select.append(
                                        '<div class="ms-4 col-md-2" style="font-size: 10px;"><label for="color3">' +
                                            p.DESCRIPCION +
                                            "</label>" +
                                            '<input type="color" id="color3" class="form-control" value="' +
                                            p.COLOR +
                                            '" disabled style="width: 40px;height: 27px;"></div>'
                                    );
                                });
                            })
                            .catch(function () {
                                console.log("Error al obtener paelta de colores");
                            });
                        break;
                    default:
                        alerta(
                            "info",
                            "Tu usuario no tiene acceso a este panel"
                        );
                }
            })
            .catch(function () {
                // Manejar errores de la promesa
                console.log("Error al obtener las imágenes:");
            });
        // $(document).on("click", "#todos_los_permisos", async function (e) {
        //     $("#animacion_cargando").addClass("loading-animation");
        //     setTimeout(function () {
        //         $("#animacion_cargando").removeClass("loading-animation");
        //         cargarTodosLosPermisos();
        //     }, 1000);
        // });
    }, 900);
});
// TRAE DE LA BD TODOS LOS PERMISOS DE TODOS LOS EMPLEADOS
function getpermisos() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: getAllpermisosRoute,
                dataType: "json",
                method: "POST",
                success: function (response) {
                    if (response.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                    }
                    if (response.status == 200) {
                        resolve(response);
                    }
                },
                error: function () {
                    setTimeout(makeRequest, 1000);
                },
            });
        }
        makeRequest();
    });
}
// CREA UNA LISTA DE AÑOS
function generarListaAños() {
    var fechaActual = new Date();
    var añoActual = fechaActual.getFullYear();
    // Crear una lista de 10 años atrás desde el año actual
    var listaAños = [];
    for (var i = 0; i < 15; i++) {
        listaAños.push(añoActual - i);
    }
    // Crear el HTML para la lista de años
    var opcionesAños = listaAños.map(function (año) {
        return `<option value="${año}">${año}</option>`;
    });
    // Agregar la lista de años al elemento con ID "group-modal_años"
    $("#group-modal_años").html(`
        <label for="modal_años" class="form-label">Año</label>
        <select class="form-select mb-3" id="modal_años" name="modal_años">
        <option value="">Selecciona una opción</option>
            ${opcionesAños.join("")}
        </select>
    `);
}
//MUESTRA TODOS LOS PERMISOS "SIN FILTRO"
function cargarTodosLosPermisos() {
    getpermisos()
        .then(function (response) {
            // Destruir DataTable si ya está inicializado
            // if ($.fn.DataTable.isDataTable("#permisosTable")) {
            //     $("#permisosTable").DataTable().destroy();
            // }
            var permisos = response.permisos;
            // Mapear y ajustar propiedades anidadas
            //console.log(permisos);
            var data = permisos.map(function (item) {
                return {
                    EMP_NAME: item.empleado ? item.empleado.EMP_NAME : "",
                    MOTIVO: item.MOTIVO,
                    COLOR: item.xxhr_status ? item.xxhr_status.COLOR : "",
                    NOTIFICACION: item.NOTIFICACION,
                    ANIO: item.ANIO,
                    EMP_NUM: item.EMP_NUM,
                    FECHA_PERMISO: item.FECHA_PERMISO,
                    FECHA_SOLICITUD: item.FECHA_SOLICITUD,
                    XXHR_CINCIDENCIAS_DESCRIPCION: item.xxhr__cincidencias
                        ? item.xxhr__cincidencias.DESCRIPCION
                        : "",
                };
            });
            // Eliminar solo los inputs de búsqueda actuales
            // $("#permisosTable thead input").remove();
            $("#permisosTable").DataTable({
                paging: true,
                scrollCollapse: true,
                autoFill: true,
                responsive: true,
                scrollX: true,
                scrollY: "70vh",
                data: data,
                orderCellsTop: true,
                fixedHeader: true,
                columns: [
                    { data: "EMP_NAME" },
                    { data: "MOTIVO" },
                    { data: "NOTIFICACION" },
                    { data: "ANIO" },
                    { data: "EMP_NUM" },
                    { data: "FECHA_PERMISO" },
                    { data: "FECHA_SOLICITUD" },
                    { data: "XXHR_CINCIDENCIAS_DESCRIPCION" },
                ],
                // FILTRO-BUSQUEDA DE CADA COLUMNA
                initComplete: function () {
                    this.api()
                        .columns()
                        .every(function () {
                            var column = this;
                            var input = $(
                                "<br><input id='Input_cmbioColor' placeholder='Buscar...'>"
                            ).appendTo($(column.header()));

                            input.on("keyup", function () {
                                column
                                    .search($(this).val(), false, false, true)
                                    .draw();
                            });

                            // Elimina el filtro de búsqueda en el encabezado de columna
                            $(column.header()).off("click.DT");
                        });
                },
                createdRow: function (row, data, dataIndex) {
                    var opacity = 0.35; // Puedes ajustar este valor según tu preferencia
                    $(row).css(
                        "background-color",
                        hexToRgba(data.COLOR, opacity)
                    );
                },
                dom: "lBfrtip", // Agrega los botones de exportación y los controles de entrada y búsqueda
                buttons: [
                    "copy",
                    "csv",
                    "excel",
                    "pdf",
                    "print", // Tipos de exportación
                ],
                language: {
                    "decimal": "",
                    "emptyTable": "No hay información",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                    "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ Entradas",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "Sin resultados encontrados",
                    "paginate": {
                        "first": "Primero",
                        "last": "Ultimo",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                },
            });
        })
        .catch(function (error) {
            console.log("Error getpermisos:");
        });
    // Función para convertir el formato hexadecimal a RGBA
    function hexToRgba(hex, opacity) {
        hex = hex.replace(/^#/, "");

        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);

        return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
    }
}
