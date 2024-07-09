$(function () {
    $("#loading-container").show();
    setTimeout(function () {
        $("#loading-container").hide();
        var numemp = appData.numEmp;
        var fechaActual = new Date();
        $("#cont_SPE").hide();
        antiguedad(numemp, function (resultado, mensaje) {
            //Validamos
            // Aquí recibes el resultado (true o false)
            if (resultado != false) {
                $("#cont_SPE").show();
                //------------------------------------------------------------
                obtenerNombreEmpleado(appData.email)
                    .then(function (response) {
                        var nombreUsuario = response.nombre;

                        var num = `<label  class="form-label">Empleado</label>
                    <input type="email" class="form-control" value="${numemp}"  disabled>`;
                        $("#numEmp").html(num);

                        var infor = `<label  class="form-label">Nombre</label>
                    <input type="text" class="form-control" value="${nombreUsuario}" disabled>`;
                        $("#nombre_emp").html(infor);
                    })
                    .catch(function () {
                        console.log("Error al obtener a el nombre del emppleado");
                    });
                //------------------------------------------------------------
                //Funcion q me muestra el mando del empleado
                conocer_mando();
                //------------------------------------------------------------
                getpermisos(numemp)
                    .then(function (response) {
                        //console.log(response);
                        var permisos = response.permisos;
                        var anioActual = fechaActual.getFullYear();
                        var imprimir_anio_actual = $("#anio_actual");
                        imprimir_anio_actual.append(anioActual);

                        // TABLA DE PERMISOS TOMADOS - HISTORIAL DE "COLORES"
                        // Mapear y ajustar propiedades anidadas
                        var data = permisos.map(function (item) {
                            return {
                                DESCRIPCION: item.xxhr_status
                                    ? item.xxhr_status.DESCRIPCION
                                    : "",
                                MOTIVO: item.MOTIVO,
                                COLOR: item.xxhr_status
                                    ? item.xxhr_status.COLOR
                                    : "",
                                NOTIFICACION: item.NOTIFICACION,
                                ANIO: item.ANIO,
                                EMP_NUM: item.EMP_NUM,
                                FECHA_PERMISO: item.FECHA_PERMISO,
                                FECHA_SOLICITUD: item.FECHA_SOLICITUD,
                                XXHR_CINCIDENCIAS_DESCRIPCION:
                                    item.xxhr__cincidencias
                                        ? item.xxhr__cincidencias.DESCRIPCION
                                        : "",
                            };
                        });
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
                                { data: "DESCRIPCION" },
                                { data: "MOTIVO" },
                                { data: "ANIO" },
                                { data: "EMP_NUM" },
                                { data: "FECHA_PERMISO" },
                                { data: "FECHA_SOLICITUD" },
                                {
                                    data: "XXHR_CINCIDENCIAS_DESCRIPCION",
                                },
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
                                                .search(
                                                    $(this).val(),
                                                    false,
                                                    false,
                                                    false
                                                )
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
                        // ---------------------------------------------------------
                        // COLOCAR LAS FECHAS DE PERMISOS ACEPTADOS Q SON "ARH"
                        //console.log(permisos_aceptados);
                        //var cantidadPermisos = permisos_aceptados.length;
                        //console.log(cantidadPermisos);

                        var permisos_aceptados_por_año = permisos.filter(function (
                            permiso
                        ) {
                            return (
                                permiso.ANIO == anioActual &&
                                (permiso.xxhr_status.CODIGO == "S" ||
                                    permiso.xxhr_status.CODIGO == "AJ" ||
                                    permiso.xxhr_status.CODIGO == "ARH")
                            );
                        });
                        // Aplicar la función a cada elemento del array original
                        var permisos_aceptados_por_año_formateados =
                            permisos_aceptados_por_año.map(formatearFechas);

                        // Imprimir el nuevo array con las fechas formateadas y campos adicionales
                        // console.log(permisos);
                        var indices = [1, 2, 3, 4, 5, 6, 7, 8, 9];

                        permisos_aceptados_por_año_formateados.forEach(function (
                            permiso,
                            index
                        ) {
                            // Iterar sobre cada fecha en el permiso
                            permiso.fechasFormateadas.forEach(function (fecha, i) {
                                // Verificar que haya un ID disponible en el array de índices
                                if (indices.length > 0) {
                                    // Tomar el primer índice disponible
                                    var inputIndex = indices.shift();

                                    // Construir el ID del input type="date"
                                    var inputId = "#modal-dia-" + inputIndex;
                                    var msj = "#msj_solicitud-" + inputIndex;
                                    var color = permiso.xxhr_status.COLOR;

                                    // Colocar el mensaje en el formato deseado con el color correspondiente
                                    $(msj).append(
                                        '<u style="color:' +
                                        color +
                                        ';font-size:10px; -webkit-text-stroke: .5px rgb(0, 0, 0, 0.24);">Solicitado</u>'
                                    );
                                    // Colocar la fecha en el input
                                    $(inputId).val(fecha);

                                    // Deshabilitar el input
                                    $(inputId).prop("disabled", true);
                                }
                            });
                        });
                        // ---------------------------------------------------------
                        //Traemos los permisos del empleado para contar cuantos son tipo "ARH" y restarle "9"
                        // Ahora dentro del array "permisos" buscamos a los permisos q sean "ARH"
                        var permisos_aceptados =
                            permisos_aceptados_por_año_formateados.filter(function (
                                permiso
                            ) {
                                return permiso.xxhr_status.CODIGO == "ARH";
                            });
                        // Suponiendo que ya tienes el array permisos_aceptados
                        var totalFechas = 0;

                        for (var i = 0; i < permisos_aceptados.length; i++) {
                            var permiso = permisos_aceptados[i];
                            totalFechas += permiso.fechasFormateadas.length;
                        }
                        // console.log(permisos_aceptados);
                        // console.log(totalFechas);
                        var idPE = $("#total_permisosEconomicos");
                        idPE.append(
                            '<label class="form-label">Permisos Tomados</label>' +
                            '<input type="text" class="form-control" aria-describedby="emailHelp" value="' +
                            totalFechas +
                            '" disabled>'
                        );
                        var totalPermisosPendientes = 9 - totalFechas;
                        var idPE = $("#total_permisosPendientes");
                        idPE.append(
                            '<label  class="form-label">Permisos Pendientes</label>' +
                            '<input type="text" class="form-control" value="' +
                            totalPermisosPendientes +
                            '" aria-describedby="emailHelp" disabled></input>'
                        );
                        // ---------------------------------------------------------
                    })
                    .catch(function () {
                        console.log("Error al traer Los permisos del empleado");
                    });
                // ---------------------------------------------------------
                // MUESTRA LA PALETA DE COLORES DE "STATUS"
                getstatus()
                    .then(function (response) {
                        //console.log(response);
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
                        console.log(
                            "Error al traer la paleta de colores de Status"
                        );
                    });
                //------------------------------------------------------------
                //------------------------------------------------------------
                // Obtener todos los campos de fecha habilitados... Desabilita los input para q el usuario simpre llene el primero
                setTimeout(function () {
                    borra_mensajes();
                    // Deshabilitar todos los campos excepto el primero habilitado
                    obtenerCamposHabilitados().not(":first").prop("disabled", true);
                    $('input[type="date"]').on("input", function () {
                        // borra_mensajes();
                        // Obtener el ID del campo actual
                        var idCampoActual = $(this).attr("id");
                        manejarValidacionCampo(
                            idCampoActual,
                            "Fecha solicitada",
                            false
                        );
                        // return false;
                        // Obtener el número del campo actual
                        var numeroCampoActual = parseInt(
                            idCampoActual.split("-")[2]
                        );
                        // Construir el ID del siguiente campo
                        var idSiguienteCampo =
                            "modal-dia-" + (numeroCampoActual + 1);

                        // Habilitar el siguiente campo si se ingresó un valor
                        if ($(this).val() !== "") {
                            $("#" + idSiguienteCampo).prop("disabled", false);
                        }
                    });
                }, 1000);
                //------------------------------------------------------------
                $(document).on("click", "#btn_canselar_solicitud", function (e) {
                    e.preventDefault();
                    borra_mensajes();
                    // Iterar sobre los inputs y deshabilitarlos, además de quitar sus valores
                    $("input[type='date']").each(function () {
                        if (!$(this).prop("disabled")) {
                            $(this).val("");
                        }
                        // Deshabilitar todos los campos excepto el primero habilitado
                        obtenerCamposHabilitados()
                            .not(":first")
                            .prop("disabled", true);
                    });
                });
                //------------------------------------------------------------
                // Manejar envío del formulario
                $(document).on("submit", "#form_solicitar_permiso", function (e) {
                    e.preventDefault();
                    var formData = new FormData();

                    // Recorrer los elementos input y agregar aquellos con valor al formData
                    $("input[type='date']").each(function () {
                        var value = $(this).val();
                        var isDisabled = $(this).prop("disabled");

                        if (value != "" && !isDisabled) {
                            formData.append($(this).attr("id"), value);
                        }
                    });

                    // Agregar CSRF token al formData
                    formData.append("_token", $("input[name='_token']").val());

                    // function makeRequest() {
                    var id = appData.numEmp;
                    formData.append("ID_EMP", id);
                    $.ajax({
                        url: solicitarPermisoRoute,
                        method: "POST",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (response) {
                            if (response.status == 700) {
                                setTimeout(function () {
                                    cerrarSesion();
                                }, 1000);
                            }
                            if (response.status == 200) {
                                alerta("success", response.msj);
                                setInterval(actualizar, 1000);
                            }
                            if (response.status == 400) {
                                alerta("info", response.msj);
                            }
                        },
                        error: function () {
                            // setTimeout(makeRequest, 100);
                        },
                    });
                    // }
                    // makeRequest();
                });
                //------------------------------------------------------------
            } else {
                var msj = $("#msj_tiempo");
                msj.append(mensaje);
            }
        });
    }, 2000);
});
// Función para convertir el formato hexadecimal a RGBA
function hexToRgba(hex, opacity) {
    hex = hex.replace(/^#/, "");

    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
}

function obtenerCamposHabilitados() {
    return $('input[type="date"]').filter(":enabled");
}
// Función para formatear las fechas y crear un nuevo objeto con campos adicionales
function formatearFechas(permiso) {
    // Obtener el valor de FECHA_PERMISO
    const fechas = permiso.FECHA_PERMISO.split("/");

    // Formatear las fechas en el formato deseado (YYYY-MM-DD)
    const fechasFormateadas = fechas.map((fecha) => {
        const [mes, dia] = fecha.split("-");
        const mesNumero = obtenerNumeroMes(mes);
        const anio = permiso.ANIO;
        return `${anio}-${mesNumero}-${dia}`;
    });

    // Crear un nuevo objeto con campos adicionales
    const nuevoObjeto = {
        ...permiso,
        fechasFormateadas,
        campoAdicional: "Valor adicional", // Puedes agregar más campos según sea necesario
    };

    return nuevoObjeto;
}
// Función para obtener el número del mes a partir de su nombre abreviado
function obtenerNumeroMes(mes) {
    const meses = {
        ene: "01",
        feb: "02",
        mar: "03",
        abr: "04",
        may: "05",
        jun: "06",
        jul: "07",
        ago: "08",
        sep: "09",
        oct: "10",
        nov: "11",
        dic: "12",
    };
    return meses[mes.toLowerCase()];
}
