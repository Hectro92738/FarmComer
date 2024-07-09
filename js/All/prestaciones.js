
let contador_calculadora = 0;
let año_actual = "";
let año_anterior = "";
let datos_XML_leido = [];
let nom_empreado_prestacion = "";
let EmpNum_empreado_prestacion = 0;
let EMAIL_empreado_prestacion = '';
let total_prestacion = 0;
let total_armazon = 0;
let total_micas = 0;
let total_accesorios = 0;
let quincena_select = 0;
let tipo_de_prestación = "Lentes";
let tipo = "";
let dropArea_vandera = false;
let csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

let boton_aprobarLentes = true;
$(document).ready(function () {
    $("#todas_las_prestaciones").hide();
    $("#tabla_de_prestaciones").hide();
    $("#seccionAprobacion").hide();
    $("#seccion_configuracion").hide();
    // Obtener la fecha actual
    let currentDate = new Date();

    //----------------------PROMESA  de Topado------------------------------------------
    setTimeout(function () {
        Topado()
            .then(function (response) {
                // console.log(response);
                let cantidades = response.cantidades;
                let UMA = null;
                let TOPADO_LENTES = null;
                let LENTES_PRIMERAVEZ = null;
                let ACCESORIO_LENTES = null;

                let CORONA = null;
                let UNIDADMETALPORCELANA = null;
                let INCUSTRACION = null;
                let UNIDADREMO = null;
                let ENDOPOSTE = null;
                let PPLACASUPEINFE = null;
                for (let i = 0; i < cantidades.length; i++) {
                    if (cantidades[i].id == 1) {
                        UMA = cantidades[i].valor;
                    } else if (cantidades[i].id == 2) {
                        TOPADO_LENTES = cantidades[i].valor;
                    } else if (cantidades[i].id == 3) {
                        LENTES_PRIMERAVEZ = cantidades[i].valor;
                    } else if (cantidades[i].id == 4) {
                        ACCESORIO_LENTES = cantidades[i].valor;
                    }
                    // ---- 
                    else if (cantidades[i].id == 5) {
                        CORONA = cantidades[i].valor;
                    } else if (cantidades[i].id == 6) {
                        UNIDADMETALPORCELANA = cantidades[i].valor;
                    } else if (cantidades[i].id == 7) {
                        INCUSTRACION = cantidades[i].valor;
                    } else if (cantidades[i].id == 8) {
                        UNIDADREMO = cantidades[i].valor;
                    } else if (cantidades[i].id == 9) {
                        ENDOPOSTE = cantidades[i].valor;
                    } else if (cantidades[i].id == 10) {
                        PPLACASUPEINFE = cantidades[i].valor;
                    }
                }
                appData.UMA = UMA;
                appData.TOPADO_LENTES = TOPADO_LENTES;
                appData.LENTES_PRIMERAVEZ = LENTES_PRIMERAVEZ;
                appData.ACCESORIO_LENTES = ACCESORIO_LENTES;
                // --- 
                appData.corona = CORONA;
                appData.ProtesisFija = UNIDADMETALPORCELANA;
                appData.incrustacion = INCUSTRACION;
                appData.ProtesisRemovible = UNIDADREMO;
                appData.endoposte = ENDOPOSTE;
                appData.placa = PPLACASUPEINFE;
            })
            .catch(function () {
                console.log("Error al obtener cantidades de topado");
            });
    }, 1500);

    // Establecer la zona horaria a CST (Central Standard Time, México)
    currentDate.setUTCHours(currentDate.getUTCHours() - 6);
    // Obtener el año actual
    año_actual = currentDate.getFullYear();

    año_anterior = año_actual - 1;
    // console.log("Año actual: " + año_actual);
    // console.log("Año anterior: " + año_anterior);
    rangoFechas();
    setTimeout(function () {
        //----------------------------------------------------------------
        //----------------------------------------------------------------
        conocer_tipo_usuarios(appData.numEmp) // Primero verificamos en al tabla de "xxhr_aprobacion" despues en la tabla de la estructura
            .then(function (response) {
                //console.log(response);
                var ubi = response.ubicacion; // Departaento y Direccion de cada empleado
                var departamento = ubi.DEPT; // Departamento de cada empleado
                var job = response.jobName; //Los primeros caracteres de el JOB_NAME antes del punto"."
                var direccion = ubi.DIRE; // Departamento de cada empleado
                var organizacion = ubi.ORGANIZACION; // ORGANIZACION de cada empleado
                switch (departamento) {
                    case "PC73":
                        generarListaAños();
                        $("#todas_las_prestaciones").show();
                        // actualiza la tabla cada q selecionamos un año distinto
                        $("#fechaInput").change(function () {
                            $("#animacion_cargando").addClass("loading-animation");

                            var fecha_rango = $("#fechaInput").val();
                            appData.fecha_rango = fecha_rango;

                            setTimeout(function () {
                                $("#animacion_cargando").removeClass("loading-animation");
                                cargarTodasLasprestaciones(appData.tipo_prestacion);
                            }, 1000);
                        });
                        // ------------------------------------- 
                        // -----------------LENTES--------------
                        // ------------------------------------- 
                        // ------------------------------------- 
                        // muestra la tabla de las prestaciones de lentes al precionar
                        $(document).on("click", "#tabla_lentes", function (e) {
                            $("#config_predial").removeClass("active").css({
                                "background": ""
                            });
                            $("#tabla_predial").removeClass("active").css({
                                "background": ""
                            });
                            $("#tabla_dental").removeClass("active").css({
                                "background": ""
                            });
                            $("#tabla_lentes").addClass("active").css({
                                "background": "rgba(9, 34, 228, 0.432)"
                            });
                            // -------------------------------
                            $("#seccion_configuracion").hide();
                            ocultarCarta();
                            $("#tipo_prestacion_select").html("Lentes");
                            tipo = 'Lentes';
                            appdata_Add_tipo(tipo);
                            var añoselecionado = $("#año_select").val();
                            setTimeout(function () {
                                var fecha_rango = $("#fechaInput").val();
                                // console.log(fecha_rango);
                                appData.fecha_rango = fecha_rango;
                                $("#animacion_cargando").removeClass("loading-animation");
                                cargarTodasLasprestaciones(appData.tipo_prestacion);
                            }, 1000);
                            $("#tabla_de_prestaciones").show();
                        });
                        // ------------------------------------- 
                        // -----------------PREDIAL-------------
                        // ------------------------------------- 
                        // ------------------------------------- 
                        $(document).on("click", "#tabla_predial", function (e) {
                            $("#config_predial").removeClass("active").css({
                                "background": ""
                            });
                            $("#tabla_predial").addClass("active").css({
                                "background": "rgba(9, 34, 228, 0.432)"
                            });
                            $("#tabla_dental").removeClass("active").css({
                                "background": ""
                            });
                            $("#tabla_lentes").removeClass("active").css({
                                "background": ""
                            });
                            // -------------------------------
                            $("#seccion_configuracion").hide();
                            ocultarCarta();
                            tipo = 'Predial';
                            $("#tipo_prestacion_select").html("Predial");
                            appdata_Add_tipo(tipo);
                            var añoselecionado = $("#año_select").val();
                            setTimeout(function () {
                                var fecha_rango = $("#fechaInput").val();
                                // console.log(fecha_rango);
                                appData.fecha_rango = fecha_rango;
                                $("#animacion_cargando").removeClass("loading-animation");
                                cargarTodasLasprestaciones(appData.tipo_prestacion);
                            }, 1000);
                            $("#tabla_de_prestaciones").show();
                        });
                        // evita q cuando estamos en la aprobación de PREDIAL en el imput de total la pagina no se recarge 
                        $(document).on("submit", "#form_calculo_predial", function (e) {
                            e.preventDefault();

                            // Modificamos la URL del navegador sin agregar una nueva entrada en el historial
                            window.history.replaceState({}, document.title, window.location.href);
                        });
                        // ------------------------------------- 
                        // -----------------Dental-------------
                        // ------------------------------------- 
                        // ------------------------------------- 
                        $(document).on("click", "#tabla_dental", function (e) {
                            $("#config_predial").removeClass("active").css({
                                "background": ""
                            });
                            $("#tabla_predial").removeClass("active").css({
                                "background": ""
                            });
                            $("#tabla_dental").addClass("active").css({
                                "background": "rgba(9, 34, 228, 0.432)"
                            });
                            $("#tabla_lentes").removeClass("active").css({
                                "background": ""
                            });
                            // -------------------------------
                            $("#seccion_configuracion").hide();
                            ocultarCarta();
                            tipo = 'Dental';
                            $("#tipo_prestacion_select").html("Dental");
                            appdata_Add_tipo(tipo);
                            var añoselecionado = $("#año_select").val();
                            setTimeout(function () {
                                var fecha_rango = $("#fechaInput").val();
                                // console.log(fecha_rango);
                                appData.fecha_rango = fecha_rango;
                                $("#animacion_cargando").removeClass("loading-animation");
                                cargarTodasLasprestaciones(appData.tipo_prestacion);
                            }, 1000);
                            $("#tabla_de_prestaciones").show();
                        });
                        // ------------------------------------- 
                        // -------CONFIGURACIONES---------------
                        // ------------------------------------- 
                        // ------------------------------------- 
                        $(document).on("click", "#config_predial", function (e) {
                            $("#config_predial").addClass("active").css({
                                "background": "rgba(9, 34, 228, 0.432)"
                            });
                            $("#tabla_predial").removeClass("active").css({
                                "background": ""
                            });
                            $("#tabla_dental").removeClass("active").css({
                                "background": ""
                            });
                            $("#tabla_lentes").removeClass("active").css({
                                "background": ""
                            });
                            // -------------------------------
                            $("#tabla_de_prestaciones").hide();
                            $("#seccionAprobacion").hide();
                            $("#seccion_configuracion").show();

                            $("#crud_colores").hide();
                            $("#archivos_masivos").hide();
                        });
                        $(document).on("click", "#click_crud_colores", function (e) {
                            $("#crud_colores").show();
                            $("#archivos_masivos").hide();
                            getstatus()
                                .then(function (response) {
                                    // console.log(response);
                                    // Aquí llenamos el select con los datos de los empleados
                                    var select = $("#crud_status_colores");
                                    select.empty();
                                    $.each(response.permisos, function (i, p) {
                                        select.append(
                                            '<div onclick="crud_estatus_colores(\'' + p.DESCRIPCION + '\',\'' + p.COLOR + '\',' + p.ID + ')" class="ms-4 col-md-2 mt-3 small-btn" style="font-size: 13px;">' +
                                            '<label for="color3">' + p.DESCRIPCION + '</label>' +
                                            '<input type="color" id="color3" class="form-control" value="' + p.COLOR +
                                            '" disabled style="width: 60px;height: 27px;">' +
                                            '</div>'
                                        );
                                    });

                                })
                                .catch(function () {
                                    console.log("Error al obtener paelta de colores");
                                });
                        });
                        $(document).on("click", "#click_archivos_masivos", function (e) {
                            $("#crud_colores").hide();
                            $("#archivos_masivos").show();
                            var allowedExtensions = ["ZIP", "zip", "RAR", "rar"];
                            if (!dropArea_vandera) {
                                setTimeout(function () {
                                    initializeDropArea("drop-area", "file-input", "file-list", allowedExtensions);
                                    dropArea_vandera = true; // Marcar como inicializada
                                }, 1000);
                            }
                        });
                        $(document).on("submit", "#form_doc_masivos", function (e) {
                            $("#loading-container").show();
                            $("#btn_form_doc_masivos").prop("disabled", true);
                            e.preventDefault();
                            // Crear un objeto FormData
                            var formData = new FormData();
                            // Agregar CSRF token al formData
                            formData.append("_token", $("input[name='_token']").val());

                            uploadedFiles.forEach(function (file) {
                                formData.append("files[]", file);
                            });
                            // Enviar la solicitud al servidor para verificar el documento XML
                            $.ajax({
                                url: doc_masivosRoutee,
                                method: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                cache: false,
                                success: function (response) {
                                    if (response.status == 200) {
                                        $("#btn_form_doc_masivos").prop("disabled", false);
                                        $("#loading-container").hide();
                                        alerta("success", response.msj);
                                    } else if (response.status == 400) {
                                        $("#btn_form_doc_masivos").prop("disabled", false);
                                        $("#loading-container").hide();
                                        alerta("danger", response.msj);
                                    }
                                },
                                error: function () {
                                    console.log("Error al verificar documentos.");
                                    $("#btn_form_doc_masivos").prop("disabled", false);
                                    $("#loading-container").hide();
                                },
                            });
                        });
                        // -------------------------------------------- 
                        // -------------------------------------------- 
                        // EDITAR ESTATUS CRUD 
                        $(document).on("submit", "#form_estatus", function (e) {
                            e.preventDefault();
                            var formData = new FormData($(this)[0]);
                            formData.append("id", appData.ID_estatus);
                            $.ajax({
                                url: editarEstatusRoute,
                                method: "POST",
                                data: formData,
                                cache: false,
                                contentType: false,
                                processData: false,
                                dataType: "json",
                                success: function (response) {
                                    if (response.status == 200) {
                                        alerta("success", response.msj);
                                        setInterval(actualizar, 1000);
                                    } else if (response.status == 700) {
                                        cerrarSesion();
                                    }
                                },
                                error: function () {
                                    // error_ajax();
                                },
                            });
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
                console.log("Error en el tipo de usuario");
            });
        // ----------------------------------------------------------------
        // Promesa q muestra la paleta de colores del estatus
        getstatus()
            .then(function (response) {
                // console.log(response);
                // Aquí llenamos el select con los datos de los empleados
                var select = $("#status_colores");
                select.empty();
                // Filtrar los permisos y eliminar aquellos con CODIGO "RJ" o "AJ"
                response.permisos = response.permisos.filter(
                    (permiso) =>
                        permiso.CODIGO !== "RJ" && permiso.CODIGO !== "AJ"
                );
                $.each(response.permisos, function (i, p) {
                    select.append(
                        '<div class="ms-4 col-md-2 mt-3" style="font-size: 12px;"><label for="color3">' +
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
    }, 900);

    // ------------------------------------- 
    // ------------------------------------- 
    // ------------------------------------- 
    $("#empleados_selecAll").chosen({
        placeholder_text_multiple: "Escribe aquí para buscar...",
        no_results_text: "No se encontraron resultados para",
    });
    empleados_conPrestacionLentes()
        .then(function (response) {
            // console.log(response);
            // Aquí llenamos el select con los datos de los empleados
            var select = $("#empleados_selecAll");
            select.empty();
            select.append('<option value=""></option>'); // Agrega una opción vacía al principio
            $.each(response.Prestacion, function (i, empleado) {
                select.append(
                    '<option value="' +
                    empleado.ID_APRO +
                    '">' +
                    empleado.EMP_NAME +
                    " - " +
                    empleado.EMP_NUM +
                    "</option>"
                );
            });
            select.trigger("chosen:updated");
        })
        .catch(function () {
            console.log("Error al obtener las imágenes:");
        });
    generarQuincenas();
    $(document).on("click", "#cambia_quincenaJarcodeado", function (e) {
        // alerta("success", "rrrrr");
        let ID_APRO = $("#empleados_selecAll").val();
        let quincena = $("#quincenas_list").val();
        let total = $("#tootal").val();
        let armazoon = $("#armazoon").val();
        let micaas = $("#micaas").val();
        let accccesorios = $("#accccesorios").val();
        // console.log(ID_APRO, quincena, total);
        var formData = new FormData();
        formData.append("ID_APRO", ID_APRO);
        formData.append("total", total);
        formData.append("quincena", quincena);

        formData.append("armazoon", armazoon);
        formData.append("micaas", micaas);
        formData.append("accccesorios", accccesorios);
        $.ajax({
            url: actualizaQuincenaRoute,
            method: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status == 200) {
                    alerta("success", response.msj);
                } else if (response.status == 300) {
                    alerta("info", response.msj);
                }
            },
            error: function (xhr, status, error) {
                // Manejar el error
                console.log(xhr.responseText);
                console.log(status);
                console.log(error);
            }
        });

    });
    // ------------------------------------- 
    // ------------------------------------- 
});
//choseen--- Me trae todos los empleados de la estructura
function empleados_conPrestacionLentes() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: empleados_conPrestacionLentesRoute,
                dataType: "json",
                method: "POST",
                success: function (response) {
                    if (response.status == 700) {
                        setTimeout(cerrarSesion, 1000);
                        reject("Sesión cerrada");
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
function ocultarCarta() {
    $("#info_xml").empty();
    $("#seccionAprobacion").hide();

    // Resstablecemos los valores de la barra de progreso asi como el array 
    porsentajeUnico = 0;
    contadorPorsentaje = 0;
    DocAprobadosDentales = [];
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
    $("#año_select").html(`
    <option value="0">Todos</option>
            ${opcionesAños.join("")}
        </select>
    `);
}
function generarQuincenas() {
    // Crear una lista de quincenas del 1 al 24
    var quincenas = Array.from({ length: 24 }, (_, index) => index + 1);

    // Crear el HTML para la lista de quincenas
    var opcionesQuincenas = quincenas.map(function (num) {
        return `<option value="${num}">${num}</option>`;
    });

    // Agregar la lista de quincenas al elemento con ID "quincenas_list"
    $("#quincenas_list").html(opcionesQuincenas.join(""));
}
// --- --- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Llamar a la función para generar las quincenas
// generarQuincenas();
function cargarTodasLasprestaciones(tipo) {
    $.ajax({
        url: getAllPrestacionesLentesRoute,
        dataType: "json",
        method: "POST",
        data: {
            tipo: tipo,
            fecha_rango: appData.fecha_rango,

        },
        success: function (response) {
            // console.log(response);
            if (response.status == 700) {
                setTimeout(function () {
                    cerrarSesion();
                }, 1000);
            }
            if (response.status == 200) {
                var data = response.Prestacion;
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    data[i].FECHA_SOLICITUD = fecha_fancy(data[i].FECHA_SOLICITUD);
                }

            }
            if (response.status == 300) {
                // Limpiar la tabla si el estado es 300
                var tablaPrestaciones = $("#prestacionesTable").DataTable();
                if ($.fn.DataTable.isDataTable("#prestacionesTable")) {
                    tablaPrestaciones.clear().draw();
                    $("#prestacionesTable thead input").remove(); // Elimina los inputs de búsqueda en el encabezado
                    $("#prestacionesTable thead br").remove(); // Elimina los inputs de búsqueda en el encabezado
                }
            }
            // Destruir la instancia DataTable actual si existe
            var tablaPrestaciones = $("#prestacionesTable").DataTable();
            if ($.fn.DataTable.isDataTable("#prestacionesTable")) {
                tablaPrestaciones.destroy();
                $("#prestacionesTable thead input").remove(); // Elimina los inputs de búsqueda en el encabezado
                $("#prestacionesTable thead br").remove(); // Elimina los inputs de búsqueda en el encabezado
            }
            if (tipo == "Lentes") {
                Tabla_lentes(data);
            } else if (tipo == "Dental") {
                Tabla_Dental(data);
            } else if (tipo == "Predial") {
                Tabla_Predial(data);
            }

        },
        error: function () {
            setTimeout(makeRequest, 1000);
        },
    });
}
function Tabla_lentes(data) {
    clearTable();
    $("#prestacionesTable").html(`
    <thead>
        <tr>
            <th>documentos</th>
            <th>Nombre</th>
            <th>Núm Empleado</th>
            <th>Fecha de Solicitud</th>
            <th>Fecha de Cierre</th>
            <th>Año</th>
            <th>Quincena</th>
            <th>Descripción</th>
            <th>Folio</th>
            <th>Total</th>
            <th>Armazón</th>
            <th>Micas</th>
            <th>Accesorios</th>
            <th>Motivo</th>
        </tr>
    </thead>
    <tbody></tbody>
    `);
    // Inicializar DataTable
    $("#prestacionesTable").DataTable({
        paging: true,
        scrollCollapse: true,
        autoFill: true,
        responsive: true,
        scrollX: true,
        scrollY: "70vh",
        data: data,
        columns: [
            {
                data: null,
                render: function (data, type, row) {
                    return '<button onclick="getDatosPrestacion(' + data.EMP_NUM + ',' + data.ANIO + ',' + data.ID_APRO + ')" class="btn_Empleado" id="btn_emp_a_cargo"><i class="bi bi-file-earmark-text-fill"></i></button>';
                }
            },
            { data: "EMP_NAME" },
            { data: "EMP_NUM" },
            { data: "FECHA_SOLICITUD" },
            { data: "FECHA_CIERRE" },
            { data: "ANIO" },
            { data: "QUINCENA" },
            { data: "DESCRIPCION" },
            { data: "FOLIO" },
            { data: "TOTAL" },
            { data: "ARMAZON" },
            { data: "MICAS" },
            { data: "ACCESORIO" },
            { data: "MOTIVO" },
        ],
        createdRow: function (row, data, dataIndex) {
            var opacity = 0.35;
            $(row).css(
                "background-color",
                hexToRgba(data.COLOR, opacity)
            );
        },
        dom: "lBfrtip",
        buttons: [
            "copy",
            "csv",
            "excel",
            "pdf",
            "print",
        ],
        language: {
            decimal: "",
            emptyTable: "No hay información",
            info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
            infoFiltered: "(Filtrado de _MAX_ total entradas)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Mostrar _MENU_ Entradas",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: "Buscar:",
            zeroRecords: "Sin resultados encontrados",
            paginate: {
                first: "Primero",
                last: "Ultimo",
                next: "Siguiente",
                previous: "Anterior",
            },
        },
        // FILTRO-BUSQUEDA DE CADA COLUMNA
        initComplete: function () {
            var table = this.api();

            table.columns().every(function (index) {
                var column = this;

                // Excluir la primera columna del buscador
                if (index !== 0 && index <= table.columns().indexes().length - 5) {
                    var input = $(
                        "<br><input id='Input_cmbioColor' placeholder='Buscar...'>"
                    ).appendTo($(column.header()));

                    input.on("keyup", function () {
                        column.search($(this).val(), false, false, true).draw();
                    });
                }

                // Elimina el filtro de búsqueda en el encabezado de columna
                $(column.header()).off("click.DT");
            });
        },
    });
}
function Tabla_Dental(data) {
    clearTable();
    $("#prestacionesTable").html(`
    <thead>
        <tr>
            <th>documentos</th>
            <th>Nombre</th>
            <th>Núm Empleado</th>
            <th>Fecha de Solicitud</th>
            <th>Fecha de Cierre</th>
            <th>Año</th>
            <th>Quincena</th>
            <th>Descripción</th>
            <th>Folio</th>
            <th>Total</th>
            <th>Motivo</th>
        </tr>
    </thead>
    <tbody></tbody>
    `);
    // Inicializar DataTable
    $("#prestacionesTable").DataTable({
        paging: true,
        scrollCollapse: true,
        autoFill: true,
        responsive: true,
        scrollX: true,
        scrollY: "70vh",
        data: data,
        columns: [
            {
                data: null,
                render: function (data, type, row) {
                    return '<button onclick="getDatosPrestacion(' + data.EMP_NUM + ',' + data.ANIO + ',' + data.ID_APRO + ')" class="btn_Empleado" id="btn_emp_a_cargo"><i class="bi bi-file-earmark-text-fill"></i></button>';
                }
            },
            { data: "EMP_NAME" },
            { data: "EMP_NUM" },
            { data: "FECHA_SOLICITUD" },
            { data: "FECHA_CIERRE" },
            { data: "ANIO" },
            { data: "QUINCENA" },
            { data: "DESCRIPCION" },
            { data: "FOLIO" },
            { data: "TOTAL" },
            { data: "MOTIVO" },
        ],
        createdRow: function (row, data, dataIndex) {
            var opacity = 0.35;
            $(row).css(
                "background-color",
                hexToRgba(data.COLOR, opacity)
            );
        },
        dom: "lBfrtip",
        buttons: [
            "copy",
            "csv",
            "excel",
            "pdf",
            "print",
        ],
        language: {
            decimal: "",
            emptyTable: "No hay información",
            info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
            infoFiltered: "(Filtrado de _MAX_ total entradas)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Mostrar _MENU_ Entradas",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: "Buscar:",
            zeroRecords: "Sin resultados encontrados",
            paginate: {
                first: "Primero",
                last: "Ultimo",
                next: "Siguiente",
                previous: "Anterior",
            },
        },
        // FILTRO-BUSQUEDA DE CADA COLUMNA
        initComplete: function () {
            var table = this.api();

            table.columns().every(function (index) {
                var column = this;

                // Excluir la primera columna del buscador
                if (index !== 0 && index <= table.columns().indexes().length - 5) {
                    var input = $(
                        "<br><input id='Input_cmbioColor' placeholder='Buscar...'>"
                    ).appendTo($(column.header()));

                    input.on("keyup", function () {
                        column.search($(this).val(), false, false, true).draw();
                    });
                }

                // Elimina el filtro de búsqueda en el encabezado de columna
                $(column.header()).off("click.DT");
            });
        },
    });
}
function Tabla_Predial(data) {
    clearTable();
    $("#prestacionesTable").html(`
    <thead>
        <tr>
            <th>documentos</th>
            <th>Nombre</th>
            <th>Núm Empleado</th>
            <th>Fecha de Solicitud</th>
            <th>Fecha de Cierre</th>
            <th>Año</th>
            <th>Quincena</th>
            <th>Descripción</th>
            <th>Folio</th>
            <th>Total</th>
            <th>Clave.Ctral</th>
            <th>Comprobante</th>
            <th>Motivo</th>
        </tr>
    </thead>
    <tbody></tbody>
    `);
    // Inicializar DataTable
    $("#prestacionesTable").DataTable({
        paging: true,
        scrollCollapse: true,
        autoFill: true,
        responsive: true,
        scrollX: true,
        scrollY: "70vh",
        data: data,
        columns: [
            {
                data: null,
                render: function (data, type, row) {
                    return '<button onclick="getDatosPrestacion(' + data.EMP_NUM + ',' + data.ANIO + ',' + data.ID_APRO + ')" class="btn_Empleado" id="btn_emp_a_cargo"><i class="bi bi-file-earmark-text-fill"></i></button>';
                }
            },
            { data: "EMP_NAME" },
            { data: "EMP_NUM" },
            { data: "FECHA_SOLICITUD" },
            { data: "FECHA_CIERRE" },
            { data: "ANIO" },
            { data: "QUINCENA" },
            { data: "DESCRIPCION" },
            { data: "FOLIO" },
            { data: "TOTAL" },
            { data: "CLAVE_CATASTRAL" },
            { data: "NAME_COMPROBANTE" },
            { data: "MOTIVO" },
        ],
        createdRow: function (row, data, dataIndex) {
            var opacity = 0.35;
            $(row).css(
                "background-color",
                hexToRgba(data.COLOR, opacity)
            );
        },
        dom: "lBfrtip",
        buttons: [
            "copy",
            "csv",
            "excel",
            "pdf",
            "print",
        ],
        language: {
            decimal: "",
            emptyTable: "No hay información",
            info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
            infoFiltered: "(Filtrado de _MAX_ total entradas)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Mostrar _MENU_ Entradas",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: "Buscar:",
            zeroRecords: "Sin resultados encontrados",
            paginate: {
                first: "Primero",
                last: "Ultimo",
                next: "Siguiente",
                previous: "Anterior",
            },
        },
        // FILTRO-BUSQUEDA DE CADA COLUMNA
        initComplete: function () {
            var table = this.api();

            table.columns().every(function (index) {
                var column = this;

                // Excluir la primera columna del buscador
                if (index !== 0 && index <= table.columns().indexes().length - 5) {
                    var input = $(
                        "<br><input id='Input_cmbioColor' placeholder='Buscar...'>"
                    ).appendTo($(column.header()));

                    input.on("keyup", function () {
                        column.search($(this).val(), false, false, true).draw();
                    });
                }

                // Elimina el filtro de búsqueda en el encabezado de columna
                $(column.header()).off("click.DT");
            });
        },
    });
}
function clearTable() {
    if ($.fn.DataTable.isDataTable("#prestacionesTable")) {
        $("#prestacionesTable").DataTable().destroy();
        $("#prestacionesTable").empty(); // Elimina el contenido de la tabla
    }
}
// Función para convertir el formato hexadecimal a RGBA
function hexToRgba(hex, opacity) {
    hex = hex.replace(/^#/, "");

    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
}
function appdata_Add_tipo(tipo) {
    appData.tipo_prestacion = tipo;
}
// ------------------------------------------------------⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
// funcion q trae los datos de la prestacion de un empleado en especifico "SWITCH"
function getDatosPrestacion(emp_num, anio_prestacion, id_prestacion) {
    $("#seccionAprobacion").show();
    appData.APROBAR_DOCUMENTACION = 'no'; //para saber si los documentos q estoy lellendo ya fueron aprovados o no  
    appData.ID_PRESTACION_PRECIONADA = id_prestacion;
    // Scroll hasta el elemento con ID "seccionAprobacion" utilizando jQuery
    var seccionAprobacion = $("#seccionAprobacion");
    $('html, body').animate({
        scrollTop: seccionAprobacion.offset().top
    }, 10); // Duración del scroll en milisegundos (en este caso, 1 segundo)
    // console.log(anio_prestacion);
    // ---------------------------- 
    function makeRequest() {
        $.ajax({
            url: getDatosPrestacionRoute,
            dataType: "json",
            method: "POST",
            data: {
                emp_num: emp_num,
                anio_actual: anio_prestacion,
                id_pre: id_prestacion
            },
            success: function (response) {
                // console.log(response);
                let Prestacion_actual = response.Prestacion_actual;
                let color_id = Prestacion_actual.ID_ESTATUS;
                // console.log(color_id);
                switch (color_id) {
                    case 1:
                        ver_estado_SOLICITADO_anterior(response);
                        break;
                    case 4:
                        ver_estado_SOLICITADO_cancelado(response);
                        break;
                    case 5:
                        ver_estado_SOLICITADO_pendiente(response);
                        break;
                    case 6:
                        ver_estado_SOLICITADO_actual(response);
                        break;
                    case 7:
                        ver_estado_SOLICITADO_actual(response);
                        break;
                    case 8:
                        ver_estado_SOLICITADO_actual(response);
                        break;
                }
            },
            error: function () {
                setTimeout(makeRequest, 1000);
            },
        });
    }
    // Iniciamos la primera solicitud
    makeRequest();
}
function leer_xml() {
    if (appData.url_XML_paraLeer != 'pendiente' && appData.nombre_XML_paraLeer != 'pendiente') {
        $("#aprobacion_btn").prop("disabled", true);
        setTimeout(function () {
            $("#aprobacion_btn").prop("disabled", false);
        }, 2000);
        $.ajax({
            url: leerXMLRoute,
            dataType: "json",
            method: "POST",
            data: {
                url: appData.url_XML_paraLeer,
                xml: appData.nombre_XML_paraLeer,
            },
            success: function (response) {
                if (response.status == 200) {
                    mostrar_info_XML(response);
                    datos_XML_leido = response;
                    // console.log(datos_XML_leido);
                }
            },
            error: function () {
                console.log("error al leer el xml");
            },
        });
    } else {
        datos_XML_leido = null;
        // console.log(datos_XML_leido);
        setTimeout(function () {
            creacion_de_calculos_LENTES(datos_XML_leido);
        }, 800);
    }
}
function mostrar_info_XML(response) {
    // $("#loading-container").show(); // LA ANIMACION SE CIERRA AL MOSTRAR LOS CALCULOS "creacionForm_calculos_lentes"
    $("#contenido_del_calculo").empty();
    $("#reloat_SOPA").prop("disabled", true);
    // console.log(response);
    // #info_xml = id del body de la modal donde se van a mostrar los datos de la factura
    $("#info_xml").empty();
    var info_xml = response.informacionFactura;
    var info_xml_impuesto = response.informacionImpuestosAll;
    var info_emisor = response.informacionEmisor;
    var info_receptor = response.informacionReceptor;
    var informacionConceptos = response.informacionConceptos;
    var iinformacionTFD = response.informacionTFD;
    var cont = 1;
    // Buscar el elemento con el id "info_xml"
    var fileList = $("#info_xml");
    // Crear un contenedor para la información
    var preview = $("<div class='row'></div>");
    var re = info_emisor.rfc;
    var rr = info_receptor.rfc;
    var tt = info_xml.total;
    var id = iinformacionTFD.uuid;
    UUID_XML = iinformacionTFD.uuid;
    // console.log(iinformacionTFD.uuid);
    // console.log(re, rr, tt, id);
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------
    // Obtener la fecha de la factura
    var fecha_factura = new Date(info_xml.fecha);
    // console.log(fecha_factura);
    // Obtener el año de la fecha de la factura
    var año_factura = fecha_factura.getFullYear();
    // Comparar los años
    // Agregar la información de factura al contenedor
    preview.append(`<div class='col-md-4 ms-2'><p><strong>Estatus: </strong><span id="estado_xml" class="loading-animation"></span></p></div>
                    <div class='col-md-7 ms-2'><p><strong>Descripción: </strong><span id="codigoEstatus_xml" class="loading-animation"></span></p></div>
                    <br>
                    <div class='col-md-3 ms-2'><p><strong><i class="bi bi-cash me-1 h6"></i>Subtotal: </strong>$${formatNumber(
        info_xml.subtotal
    )}</p></div>
                    <div class='col-md-3 ms-2'><p><strong><i class="bi bi-graph-up me-1 h6"></i>IVA: </strong>$${formatNumber(
        info_xml_impuesto.TotalImpuestosTrasladados
    )}</p></div>
                    <div class='col-md-3 ms-2'><p><strong><i class="bi bi-cash-stack me-1 h6"></i>Total: </strong>$${formatNumber(
        info_xml.total
    )}</p></div>
                    <br>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-calendar-event me-1 h6"></i>Fecha: </strong>${info_xml.fecha
        }</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-person me-1 h6"></i>Nombre emisor: </strong>${info_emisor.nombre
        }</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-bookmark me-1 h6"></i>RFC emisor: </strong>${info_emisor.rfc
        }</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-person-circle me-1 h6"></i>Nombre receptor: </strong>${info_receptor.nombre
        }</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-bookmark-check me-1 h6"></i>RFC receptor: </strong>${info_receptor.rfc
        }</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-map me-1 h6"></i>Codigo postal del receptor: </strong>${info_receptor.DomicilioFiscalReceptor
        }</p></div>
                    `);

    // Crear un array para almacenar todas las promesas
    var promesas = [];
    // Agregar la información de los conceptos al contenedor
    for (var i = 0; i < informacionConceptos.length; i++) {
        var concepto = informacionConceptos[i];
        var tipo = 'lentes';

        // Utilizar una función que devuelve una promesa
        var promise = (async function () {
            try {
                // Esperar la resolución de la promesa
                var response = await validacionClaveProductoSAT(concepto.ClaveProdServ, tipo);
                // console.log(response);
                // Si la promesa se resolvió y el status es 200, la clave fue encontrada
                if (response.status == 200) {
                    var prestacion = response.Prestacion;
                    // Extrae la descripción del primer elemento y almacénala en una variable
                    var descripcion = prestacion[0].descripcion;
                    var desc = `<strong class="text-primary">${descripcion}</strong>`;
                    boton_aprobarLentes = true;
                    return desc;
                } else if (response.status == 300) {
                    var desc = `<strong class="text-danger">¡ERROR! Clave no Encontrada</strong>`;
                    boton_aprobarLentes = false;
                    return desc;
                } else if (response.status == 400) {
                    var prestacion = response.Prestacion;
                    // Extrae la descripción del primer elemento y almacénala en una variable
                    var descripcion = prestacion[0].descripcion;
                    var desc = `<strong class="text-danger">${descripcion}</strong>`;
                    boton_aprobarLentes = false;
                    return desc;
                }
            } catch (error) {
                // console.log("Error al obtener ClaveSAT");
                var desc = `<strong class="text-danger">¡ERROR! al obtener ClaveSAT - BD</strong>`;
                return desc;
            }
        })();
        // Agregar la promesa al array
        promesas.push(promise);
    }
    // Utilizar Promise.all() para esperar a que se completen todas las promesas
    Promise.all(promesas).then((resultados) => {
        // Ahora resultados es un array que contiene los resultados de todas las promesas
        // Continuar con el resto del código
        for (var i = 0; i < informacionConceptos.length; i++) {
            var concepto = informacionConceptos[i];
            // var ivaConsepto = informacionConceptos.impuestos
            preview.append(`
                    <div id="" class='col-md-10'><hr><p><strong>Concepto ${cont++}</strong></p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-box-seam me-1 h6"></i>Descripción de producto: </strong>${concepto.descripcion}</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-cash me-1 h6"></i>Valor unitario: </strong>$${formatNumber(concepto.valorUnitario)}</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-grid me-1 h6"></i>Cantidad: </strong>${concepto.cantidad}</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-cash-stack me-1 h6"></i>Importe: </strong>$${formatNumber(concepto.importe)}</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-key me-1 h6"></i>Clave.SAT: </strong>${concepto.ClaveProdServ}</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-sunglasses"> Concepto de Clave.SAT: </i></strong>${resultados[i]}</p></div>
                    `);
        }
    });
    setTimeout(function () {
        realizarConsultaSOAP(re, rr, tt, id);
    }, 1000);
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------

    // Agregar el contenedor al elemento con el id "info_xml"
    fileList.append(preview);
    // Función para formatear números a dos decimales
}
// Soliciud a SAT validación de xml 
function realizarConsultaSOAP(re, rr, tt, id) {
    $("#estado_xml").addClass("loading-animation");
    $("#codigoEstatus_xml").addClass("loading-animation");
    // console.log(datos_soap);
    $.ajax({
        url: realizarConsultaSOAPRoute,
        type: "POST",
        dataType: "json",
        data: {
            re: re,
            rr: rr,
            tt: tt,
            id: id,
        },
        timeout: 40000, // 60000 milisegundos = 1 minuto //  40000 milisegundos = 40 segundos
        success: function (response) {
            $("#estado_xml").removeClass("loading-animation");
            $("#codigoEstatus_xml").removeClass("loading-animation");
            $("#estado_xml").empty();
            $("#codigoEstatus_xml").empty();
            // console.log(response.result);
            // Parsear la respuesta XML
            var xmlDoc = $.parseXML(response.result);
            var $xml = $(xmlDoc);
            // Obtener los valores deseados
            var codigoEstatus = $xml.find("a\\:CodigoEstatus").text();
            var estado = $xml.find("a\\:Estado").text();
            switch (estado) {
                case "Cancelado":
                    var iconn =
                        '<i class="bi bi-exclamation-circle ms-1 text-warning h5 gray-background"></i>';
                    break;
                case "Vigente":
                    var iconn =
                        '<i class="bi bi-check-circle ms-1 text-success h5 gray-background"></i>';
                    setTimeout(function () {
                        if (appData.tipo_prestacion == 'Lentes') {
                            creacion_de_calculos_LENTES(datos_XML_leido); //funcion para hacer el calculo
                        }
                    }, 1500);
                    break;
                case "No Encontrado":
                    var iconn =
                        '<i class="bi bi-exclamation-triangle ms-1 text-danger h5 gray-background"></i>';
                    break;
            }
            $("#estado_xml").append(estado, iconn);
            $("#codigoEstatus_xml").append(codigoEstatus);
        },
        error: function (error) {
            if (error.statusText == "timeout") {
                if (appData.tipo_prestacion == 'Lentes') {
                    creacion_de_calculos_LENTES(datos_XML_leido); //funcion para hacer el calculo
                } else if (appData.tipo_prestacion == 'Predial') {
                    crear_claculos_Predial(appData.ID_PRESTACION_PRECIONADA); //funcion para hacer el calculo
                }
            }
        },
        complete: function () {
            $("#estado_xml").removeClass("loading-animation");
            $("#codigoEstatus_xml").removeClass("loading-animation");
        },
    });
}
// ----------------------- 
function creacion_de_calculos_LENTES(datos_XML_leido) {
    // console.log(appData.TOPADO_LENTES, appData.LENTES_PRIMERAVEZ, appData.UMA, appData.ACCESORIO_LENTES);
    if (datos_XML_leido != null) {
        // Verificar que la estructura del objeto sea válida
        if (
            datos_XML_leido &&
            datos_XML_leido.informacionConceptos &&
            Array.isArray(datos_XML_leido.informacionConceptos)
        ) {
            // Inicializar las variables para la suma de importes
            let sumaImporteArmazon = 0;
            let sumaImporteMicas = 0;
            let sumaImportesOtros = 0;
            let suma_Armazon_Micas = 0;
            let resta = 0;
            let total = 0;
            var iva = 0;
            var countar_caccesorio = 0;
            // Iterar sobre los conceptos
            for (const concepto of datos_XML_leido.informacionConceptos) {
                // Convertir tanto la descripción como las palabras clave a minúsculas
                const descripcion = concepto.descripcion.toLowerCase();
                const palabrasClaveArmazon = ["armazon", "armazón", "monturas", "montura"].map(palabra => palabra.toLowerCase());
                const palabrasClaveMicas = ["micas", "anteojos", "anteojo", "mica", "lente", "lentes"].map(palabra => palabra.toLowerCase());
                const palabraAccesorios = ["antirreflejante", "bluelight", "fotocromatico", "filtro azul", "BLUE PROTEC", "crizal", "con/ar", "BLUE FREE"].map(palabra => palabra.toLowerCase());
                // Verificar si la descripción contiene alguna de las palabras clave para armazón
                if (palabrasClaveArmazon.some(palabra => descripcion.includes(palabra))) {
                    // Sumar el importe correspondiente
                    sumaImporteArmazon += concepto.importe;
                }
                // Verificar si la descripción contiene alguna de las palabras clave para micas
                if (palabrasClaveMicas.some(palabra => descripcion.includes(palabra))) {
                    // Sumar el importe correspondiente
                    sumaImporteMicas += concepto.importe;
                    // console.log(sumaImporteMicas);
                }
                // Si no contiene ninguna de las palabras clave, sumar al total de "otros"
                // if (!palabrasClaveArmazon.some(palabra => descripcion.includes(palabra)) &&
                //     !palabrasClaveMicas.some(palabra => descripcion.includes(palabra))) {
                //     sumaImportesOtros += appData.ACCESORIO_LENTES;
                //     countar_caccesorio++;
                // }
                // Si no contiene ninguna de las palabras clave, sumar al total de "otros"
                if (palabraAccesorios.some(palabra => descripcion.includes(palabra))) {
                    sumaImportesOtros += appData.ACCESORIO_LENTES;
                    countar_caccesorio++;
                }
            }
            // Límite para sumaImporteArmazon
            if (sumaImporteArmazon > appData.TOPADO_LENTES) {
                sumaImporteArmazon = appData.TOPADO_LENTES;
                suma_Armazon_Micas = sumaImporteArmazon + sumaImporteMicas;
                resta = suma_Armazon_Micas - sumaImportesOtros;
                iva = resta * 0.16;
                total = iva + resta;
            } else {
                suma_Armazon_Micas = sumaImporteArmazon + sumaImporteMicas;
                resta = suma_Armazon_Micas - sumaImportesOtros;
                iva = resta * 0.16;
                total = iva + resta;
            }

            if (total < 0) {
                total = 0;
            }
            creacionForm_calculos_lentes(sumaImporteArmazon, sumaImporteMicas, suma_Armazon_Micas, countar_caccesorio, iva, total, sumaImportesOtros, resta);
            // Aquí puedes realizar más acciones con las sumas de importes si es necesario
            // Por ejemplo, agregar las sumas al contenido del cálculo

        } else {
            console.error("Estructura de datos inválida");
        }
    } else {
        // Inicializar las variables para la suma de importes
        let sumaImporteArmazon = 0;
        let sumaImporteMicas = 0;
        let sumaImportesOtros = 0;
        let suma_Armazon_Micas = 0;
        let resta = 0;
        let total = appData.LENTES_PRIMERAVEZ;
        var iva = 0;
        var countar_caccesorio = 0;
        creacionForm_calculos_lentes(sumaImporteArmazon, sumaImporteMicas, suma_Armazon_Micas, countar_caccesorio, iva, total, sumaImportesOtros, resta);
    }
}
function creacionForm_calculos_lentes(sumaImporteArmazon, sumaImporteMicas, suma_Armazon_Micas, countar_caccesorio, iva, total, sumaImportesOtros, resta) {
    // $("#loading-container").hide(); //LA ANIMACIÓN SE ABRE EN "mostrar_info_XML"
    // console.log(appData.APROBAR_DOCUMENTACION);
    $("#contenido_del_calculo").empty();
    if (appData.APROBAR_DOCUMENTACION == 'si') {
        // alerta("success", "hhh");
        // Cuando es 0 eso quieres decir q vas a rechazar la prestacion antes de q sea aprobada 
        var tipo_rechazo = 1;
        var contenido_del_calculo = `
            <div class="row mt-4">
                <div class="form-group col-md-6">
                    <button type="button" id="btn_aprobar_solicitud" onclick="modal_Aprobar_documentos(${appData.ID_PRESTACION_PRECIONADA})" class="btn btn-success btn-block me-3">Aprobar solicitud</button>
                </div>
                <div class="form-group col-md-3">
                    <button type="button" class="btn btn-danger  btn-block me-3" onclick="modal_rechazarPrestacion(${tipo_rechazo})">Rechazar solicitud</button>
                </div>
            </div>
        `;
        $("#contenido_del_calculo").append(contenido_del_calculo);
    } else {
        total_prestacion = total.toFixed(2);
        total_armazon = sumaImporteArmazon.toFixed(2);
        total_micas = sumaImporteMicas.toFixed(2);
        total_accesorios = sumaImportesOtros;
        var tipo_rechazo = 0;
        var contenido_del_calculo = `
        <div class="row">
            <div class="col-md-2"><h3>Cálculos</h3></div>
            <div class="col-md-2 mt-2" style="font-size: 13px"><strong>UMA</strong>: $<span id="CANTIDAD_UMA_prestacion"></span></div>
            <div class="col-md-2 mt-2" style="font-size: 13px"><strong>Topado armazón</strong>: $<span id="CANTIDAD_TOPADO_LENTES"></span></div>
            <div class="col-md-3 mt-2" style="font-size: 13px"><strong>Prestación Primera vez</strong>: $<span id="CANTIDAD_LENTES_PRIMERAVEZ"></span></div>
            <div class="col-md-2 mt-2" style="font-size: 13px"><strong>Accesorio</strong>: $<span id="CANTIDAD_ACCESORIO_LENTES"></span></div>
        </div>
        <form id="form_calculo" method="POST" enctype="multipart/form-data" class="mb-3 mt-2">
            <div class="row g-3" id="apartado_de_CALCULOS">
                    <div class="col-md-4">
                        <div class="input-group mt-2" id="group-modal-armazon">
                            <span class="input-group-text"><i class="bi bi-eyeglasses"> Armazón/Montura</i></span>
                            <input type="number" step="0.01" id="modal-armazon" max="${appData.TOPADO_LENTES}" name="modal-armazon" min="0" value="${sumaImporteArmazon}" class="form-control" placeholder="Armazón" required>
                        </div>
                        <div class="input-group mt-2" id="group-modal-micas">
                            <span class="input-group-text"><i class="bi bi-layers"> Mica/lente</i></span>
                            <input type="number" step="0.01" id="modal-micas" name="modal-micas" min="0" value="${sumaImporteMicas}" class="form-control" placeholder="Micas" required>
                        </div>
                        <div class="input-group mt-2" id="group-modal-suma_ArmaMicas">
                            <span class="input-group-text"><i class="bi bi-plus-slash-minus"> Suma</i></span>
                            <input disabled type="number" step="0.01" id="modal-suma_ArmaMicas" name="modal-suma_ArmaMicas" min="0" value="${suma_Armazon_Micas}" class="form-control" placeholder="Micas" required>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="input-group mt-2" id="group-modal-accesorios">
                            <span class="input-group-text"><i class="bi bi-menu-app"> Accesorio</i></span>
                            <input type="number" step="0.01" id="modal-accesorios" name="modal-accesorios" min="0" value="${countar_caccesorio}" class="form-control" placeholder="Accesorios" required>
                        </div>
                        <div class="input-group mt-2" id="group-modal-sumAccesorios">
                            <span class="input-group-text"> Total accesorios</span>
                            <input disabled type="number" step="0.01" id="modal-sumAccesorios" name="modal-sumAccesorios" min="0" value="${sumaImportesOtros}" class="form-control" placeholder="total accesorios" required>
                        </div>
                        <div class="input-group mt-2" id="group-modal-NEW_subtotal">
                            <span class="input-group-text"><i class="bi bi-cash-coin"> Subtotal</i></span>
                            <input disabled type="number" step="0.01" id="modal-NEW_subtotal" name="modal-NEW_subtotal" min="0" value="${resta}" class="form-control" placeholder="subtotal" required>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="input-group mt-2" id="group-modal-iva">
                            <span class="input-group-text"><i class="bi bi-coin"> Iva</i></span>
                            <input disabled type="number" step="0.01" id="modal-iva" name="modal-iva" min="0" value="${iva}" class="form-control" placeholder="iva" required>
                        </div>
                        <div class="input-group mt-2" id="group-modal-total">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"> Total</i></span>
                            <input disabled type="number" step="0.01" id="modal-total" name="modal-total" min="0" value="${total}" class="form-control" placeholder="Total" required>
                        </div>
                        <div class="input-group mt-2" id="group-modal-total">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"> Quincena</i></span>
                            <select class="selectpicker form-control col-md-4" id="quincenas_list">
                                
                            </select>
                        </div>
                    </div>
            </div>
            <div class="row mt-4">
                <div class="form-group col-md-6">
                    <button type="button" id="btn_aprobar_solicitud" onclick="modal_aprobar_solicitud()" class="btn btn-success btn-block me-3">Aprobar solicitud</button>
                </div>
                <div class="form-group col-md-3">
                    <button type="button" class="btn btn-danger  btn-block me-3" onclick="modal_rechazarPrestacion(${tipo_rechazo})">Rechazar solicitud</button>
                </div>
                <div class="form-group col-md-2">
                    <button type="button" onclick="calculadora_mostrar()" class="btn btn-dark btn-block me-3"><i class="bi bi-calculator"> Calculadora</i></button>
                </div>
            </div>
        </form>
        <div id="contenedor_calculadora">
        </div>
        `;
        $("#contenido_del_calculo").append(contenido_del_calculo);
        generarQuincenas();
        // si es la primera prestacion o el año pasado no solicite una prestacion sele dara el topado y se dasabilitan los inputs 
        if (datos_XML_leido == null) {
            // Deshabilitar los inputs
            $("#modal-armazon, #modal-micas, #modal-accesorios").prop("disabled", true);
        }
        change_calculos();
        // if (boton_aprobarLentes == false) {
        //     $("#btn_aprobar_solicitud").prop("disabled", true);
        // } else {
        //     $("#btn_aprobar_solicitud").prop("disabled", false);
        // }
    }
}
function change_calculos() {
    $("#CANTIDAD_UMA_prestacion").append(appData.UMA);
    $("#CANTIDAD_TOPADO_LENTES").append(appData.TOPADO_LENTES);
    $("#CANTIDAD_LENTES_PRIMERAVEZ").append(appData.LENTES_PRIMERAVEZ);
    $("#CANTIDAD_ACCESORIO_LENTES").append(appData.ACCESORIO_LENTES);
    // ------------------------------------- 
    // actualiza el total de los calculos autoamticamente despues d emodificar un input de el cálculo 
    $("#modal-armazon, #modal-micas, #modal-accesorios").change(function () {
        borra_mensajes();
        var val_armazon = $("#modal-armazon").val();
        var val_micas = $("#modal-micas").val();
        var val_accesorios = $("#modal-accesorios").val();
        var val_total = $("#modal-total").val();

        if ($("#modal-armazon").val() < 0 || $("#modal-armazon").val() == '') {
            manejarValidacionCampo(
                "modal-armazon",
                "No se aceptan números Negativos",
                true
            );
            return false;
        } else if ($("#modal-micas").val() < 0 || $("#modal-micas").val() == '') {
            manejarValidacionCampo(
                "modal-micas",
                "No se aceptan números Negativos",
                true
            );
            return false;
        } else if ($("#modal-accesorios").val() < 0 || $("#modal-accesorios").val() == '') {
            manejarValidacionCampo(
                "modal-accesorios",
                "No se aceptan números Negativos",
                true
            );
            return false;
        }
        // Deshabilitar los inputs
        $("#modal-armazon, #modal-micas, #modal-accesorios").prop("disabled", true);

        setTimeout(function () {
            hacer_CalculosNuevos_lentes(val_armazon, val_micas, val_accesorios);
        }, 1000);
    });
}
function hacer_CalculosNuevos_lentes(val_armazon, val_micas, val_accesorios) {
    // Convertir los valores a números usando parseFloat
    var valorArmazon = parseFloat(val_armazon);
    var valorMicas = parseFloat(val_micas);
    var valorAccesorios = parseFloat(val_accesorios);

    // Verificar si la conversión fue exitosa (no es NaN)
    if (!isNaN(valorArmazon) && !isNaN(valorMicas) && !isNaN(valorAccesorios)) {
        var accesorios_count = Math.floor(valorAccesorios);
        // Calcular el valor en función de accesorios_count
        var cantidad_accesorio = appData.ACCESORIO_LENTES;
        var valorEspecifico = accesorios_count > 0 ? accesorios_count * cantidad_accesorio : 0;
        // Resto de tu código usando las variables convertidas
        var sumaImporteArmazon = valorArmazon;
        var sumaImporteMicas = valorMicas;
        var sumaImportesOtros = valorEspecifico;
        var suma_Armazon_Micas = 0;
        var resta = 0;
        var total = 0;
        var iva = 0;
        var countar_caccesorio = 0;

        if (sumaImporteArmazon > appData.TOPADO_LENTES) {
            sumaImporteArmazon = appData.TOPADO_LENTES;
            suma_Armazon_Micas = sumaImporteArmazon + sumaImporteMicas;
            resta = suma_Armazon_Micas - sumaImportesOtros;
            iva = resta * 0.16;
            total = iva + resta;
        } else {
            suma_Armazon_Micas = sumaImporteArmazon + sumaImporteMicas;
            resta = suma_Armazon_Micas - sumaImportesOtros;
            iva = resta * 0.16;
            total = iva + resta;
        }

        if (total < 0) {
            total = 0;
        }
        setTimeout(function () {
            $("#modal-armazon").val(sumaImporteArmazon.toFixed(2));
            $("#modal-micas").val(sumaImporteMicas.toFixed(2));
            $("#modal-suma_ArmaMicas").val(suma_Armazon_Micas.toFixed(2));

            $("#modal-accesorios").val(accesorios_count);
            $("#modal-sumAccesorios").val(sumaImportesOtros.toFixed(2));
            $("#modal-NEW_subtotal").val(resta.toFixed(2));

            $("#modal-iva").val(iva.toFixed(2));
            $("#modal-total").val(total.toFixed(2));

            // Deshabilitar los inputs
            $("#modal-armazon, #modal-micas, #modal-accesorios").prop("disabled", false);
        }, 1000);

        total_prestacion = total.toFixed(2);
        total_armazon = sumaImporteArmazon.toFixed(2);
        total_micas = sumaImporteMicas.toFixed(2);
        total_accesorios = sumaImportesOtros;
    } else {
        // Manejar el caso en que la conversión no fue exitosa
        console.error("Error al convertir valores a números");
    }
}
// ----------------------------------------- 
function formatNumber(value) {
    return typeof value === "number" ? value.toFixed(2) : value;
}
// ------------ CALCULADORA ---------------- 
function calculadora_mostrar() {
    if (contador_calculadora != 0) {
        contador_calculadora = 0
        $("#contenedor_calculadora").empty();
        // Remover el evento keydown cuando cierras la calculadora
        document.removeEventListener('keydown', keydownHandler);
    } else {
        contador_calculadora = 1
        $("#contenedor_calculadora").empty();
        var calculadora = `
        <div id="calculator">
            <i class="bi bi-x-lg"  style="cursor: pointer" onclick="calculadora_mostrar()"></i>
            <input type="text" id="display_calculadora" class="mt-3" disabled>
            <br>
            <button class="calculator-button" onclick="appendToDisplay_xd('7')">7</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('8')">8</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('9')">9</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('+')">+</button>
            <br>
            <button class="calculator-button" onclick="appendToDisplay_xd('4')">4</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('5')">5</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('6')">6</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('-')">-</button>
            <br>
            <button class="calculator-button" onclick="appendToDisplay_xd('1')">1</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('2')">2</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('3')">3</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('*')">*</button>
            <br>
            <button class="calculator-button" onclick="appendToDisplay_xd('0')">0</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('.')">.</button>
            <button class="calculator-button" onclick="clearDisplay()">C</button>
            <button class="calculator-button" onclick="calculateResult()">=</button>
            <button class="calculator-button" onclick="appendToDisplay_xd('/')">/</button>
        </div>
        `;
        $("#contenedor_calculadora").append(calculadora);
        // Agregar el evento keydown
        document.addEventListener('keydown', keydownHandler);
    }
}
function appendToDisplay_xd(value) {
    document.getElementById('display_calculadora').value += value;
}
function clearDisplay() {
    document.getElementById('display_calculadora').value = '';
}
function calculateResult() {
    const expression = document.getElementById('display_calculadora').value;
    try {
        const result = math.evaluate(expression);
        document.getElementById('display_calculadora').value = result;
    } catch (error) {
        alert('Error en la expresión');
    }
}
// Declarar keydownHandler fuera de la función calculadora_mostrar
function keydownHandler(event) {
    const key = event.key;
    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay_xd(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (event.key === "Backspace") {
        var display = document.getElementById("display_calculadora");
        var currentText = display.value;
        var newText = currentText.slice(0, -1);
        display.value = newText;
    }
}
// -------------------------- CASOS DEL SWITCH --------------------------
// Funcion cuando la prestacion ya tiene documentos cargados por parte del empleado Color "Gris, Morado, Verde-turquesa"
function ver_estado_SOLICITADO_actual(response) {
    appData.APROBAR_DOCUMENTACION = 'si';
    // if (appData.prestacionTerminada == 'no') { //si la prestacion q estoy consultando es del año actual
    // aqui me trae los datos de la prestacion del año pasado 
    let Prestacion_actual = response.Prestacion_actual;
    // console.log(Prestacion_actual);
    var nombreEmpleado = Prestacion_actual.EMP_NAME;
    nom_empreado_prestacion = nombreEmpleado;
    var NumeroEmpleado = Prestacion_actual.EMP_NUM;
    EmpNum_empreado_prestacion = NumeroEmpleado;
    var EMAIL_empleado = Prestacion_actual.EMAIL;
    EMAIL_empreado_prestacion = EMAIL_empleado;
    // console.log(response);
    // --------------------------------------
    var color_id = Prestacion_actual.ID_ESTATUS;
    // console.log(response);
    // 'id' de la aprobacion  
    var id = Prestacion_actual.ID_APRO;
    // 'fecha' de la aprobación 
    var fecha = Prestacion_actual.FECHA_SOLICITUD;
    appData.nombre_XML_paraLeer = Prestacion_actual.NAME_XML;
    appData.url_XML_paraLeer = Prestacion_actual.URL;
    var fech_formateada = fecha_fancy(fecha);
    // -----------------------------------


    // muestra la foto de perfil del empleado --------- 
    setTimeout(function () {
        obtenerAvatar(Prestacion_actual.EMP_NUM, "#avatar3", "40", "40", "rounded-circle");
    }, 1500);
    var msj_desc_doc = "";
    var msj_ver_doc = "";
    $("#ver_documentos").show();
    $("#descargar_ducumentos").show();
    $("#info_xml").empty();
    $("#contenido_del_calculo").empty();
    $("#encabezado_doc_descarga").empty();
    $("#msj_desc_doc_descarga").empty();
    $("#msj_ver_doc_descarga").empty();
    $("#botonValidarSAT").empty();
    // console.log(tipo);
    if (tipo == "Lentes") {
        msj_desc_doc = `
        <div class="row">
            <div class="col-md">
                <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                    <div class="card-body">
                    <h5 class="text-center text-dark mb-1"><i class="bi bi-file-earmark-pdf"></i> PDF</h5>
                        <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_pdf(${id})"><i class="bi bi-eye"></i> Ver</button>
                            <button type="button" class="btn btn-info flex-fill ml-1" onclick="descargar_pdf(${id})"><i class="bi bi-download"></i> Descargar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md">
            <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                    <div class="card-body">
                    <h5 class="text-center text-dark mb-1"><i class="bi bi-file-earmark-pdf"></i> XML</h5>
                        <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_xml(${id})"><i class="bi bi-eye"></i> Ver</button>
                            <button type="button" class="btn btn-info flex-fill ml-1" onclick="descargar_xml(${id})"><i class="bi bi-download"></i> Descargar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        $("#msj_desc_doc_descarga").append(msj_desc_doc);
        $("#msj_ver_doc_descarga").append(msj_ver_doc);
        if (color_id != 8) {
            var encabezado = `Documentos cargados el ${fech_formateada} para su revisión de <span id="nombreEmpleado" class="text-info"></span> 
                <span id="avatar3" class="ms-3"></span>`;
            $("#encabezado_doc_descarga").append(encabezado);
            var botonValidarSAT = `<button class="btn btn-danger mt-3" onclick="leer_xml()">Aprobar documentos</button>`;
            $("#botonValidarSAT").append(botonValidarSAT);
        } else {
            var encabezado = ` Prestación <strong>Lentes</strong> terminada, documentos cargados el ${fech_formateada} de <span id="nombreEmpleado" class="text-info"></span> 
                <span id="avatar3" class="ms-3"></span>`;
            $("#encabezado_doc_descarga").append(encabezado);
            var botonValidarSAT = `<button disabled class="btn btn-danger mt-3">Aprobación terminada</button>`;
            $("#botonValidarSAT").append(botonValidarSAT);
        }
        $("#nombreEmpleado").append(nom_empreado_prestacion);
    } else if (tipo == "Predial") {
        DatosPrestacion(appData.ID_PRESTACION_PRECIONADA)
            .then(function (response) {
                // console.log(response);
                // console.log(id);
                if (response.status == 200) { //COMPROBANTE
                    // alerta("success", "ddd");
                    msj_desc_doc = `
                    <div class="row">
                        <div class="col-md">
                            <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                                <div class="card-body">
                                <h5 class="text-center text-dark mb-1"><i class="bi bi-file-earmark-post-fill"></i> Comprobante</h5>
                                    <div class="d-flex justify-content-between">
                                        <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_comprobante(${id})"><i class="bi bi-eye"></i> Ver</button>
                                        <button type="button" class="btn btn-info flex-fill ml-1" onclick="descargar_comprobante(${id})"><i class="bi bi-download"></i> Descargar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md">
                        <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                                <div class="card-body">
                                <h5 class="text-center text-dark mb-1"><i class="bi bi-file-earmark-pdf"></i> PDF</h5>
                                    <div class="d-flex justify-content-between">
                                        <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_pdf(${id})"><i class="bi bi-eye"></i> Ver</button>
                                        <button type="button" class="btn btn-info flex-fill ml-1" onclick="descargar_pdf(${id})"><i class="bi bi-download"></i> Descargar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    $("#msj_desc_doc_descarga").append(msj_desc_doc);
                    $("#msj_ver_doc_descarga").append(msj_ver_doc);
                    if (color_id != 8) {
                        var encabezado = `Documentos <strong>Predial</strong> cargados el ${fech_formateada} para su revisión de <span id="nombreEmpleado" class="text-info"></span> 
                            <span id="avatar3" class="ms-3"></span>`;
                        $("#encabezado_doc_descarga").append(encabezado);
                        // var comprobante = "si";
                        var botonValidarSAT = `<button class="btn btn-danger mt-3" onclick="crear_claculos_Predial(${appData.ID_PRESTACION_PRECIONADA})">Aprobar documentos</button>`;
                        $("#botonValidarSAT").append(botonValidarSAT);
                    } else {
                        var encabezado = ` Prestación <strong>Predial</strong> terminada, documentos cargados el ${fech_formateada} de <span id="nombreEmpleado" class="text-info"></span> 
                            <span id="avatar3" class="ms-3"></span>`;
                        $("#encabezado_doc_descarga").append(encabezado);
                        var botonValidarSAT = `<button disabled class="btn btn-danger mt-3">Aprobación terminada</button>`;
                        $("#botonValidarSAT").append(botonValidarSAT);
                    }
                } else if (response.status == 700) { //SERRAR SESION

                    setTimeout(cerrarSesion, 1000);
                    reject("Sesión cerrada");

                } else if (response.status == 900) { //SOLO "PDF"
                    msj_desc_doc = `
                    <div class="row">
                        <div class="col-md">
                            <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                                <div class="card-body">
                                <h5 class="text-center text-dark mb-1"><i class="bi bi-file-earmark-pdf"></i> PDF</h5>
                                    <div class="d-flex justify-content-between">
                                        <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_pdf(${id})"><i class="bi bi-eye"></i> Ver</button>
                                        <button type="button" class="btn btn-info flex-fill ml-1" onclick="descargar_pdf(${id})"><i class="bi bi-download"></i> Descargar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    $("#msj_desc_doc_descarga").append(msj_desc_doc);
                    $("#msj_ver_doc_descarga").append(msj_ver_doc);
                    if (color_id != 8) {
                        var encabezado = `Documentos <strong>Predial</strong> cargados el ${fech_formateada} para su revisión de <span id="nombreEmpleado" class="text-info"></span> 
                            <span id="avatar3" class="ms-3"></span>`;
                        $("#encabezado_doc_descarga").append(encabezado);
                        var botonValidarSAT = `<button class="btn btn-danger mt-3" onclick="crear_claculos_Predial(${appData.ID_PRESTACION_PRECIONADA})">Aprobar documentos</button>`;
                        $("#botonValidarSAT").append(botonValidarSAT);
                    } else {
                        var encabezado = ` Prestación <strong>Predial</strong> terminada, documentos cargados el ${fech_formateada} de <span id="nombreEmpleado" class="text-info"></span> 
                            <span id="avatar3" class="ms-3"></span>`;
                        $("#encabezado_doc_descarga").append(encabezado);
                        var botonValidarSAT = `<button disabled class="btn btn-danger mt-3">Aprobación terminada</button>`;
                        $("#botonValidarSAT").append(botonValidarSAT);
                    }
                }
                $("#nombreEmpleado").append(nom_empreado_prestacion);
            })
            .catch(function () {
                console.log("error al obtener datos de la prestación");
            });
    } else if (tipo == "Dental") {
        AnalisisDocDentales(response);
    }
    $("#mostrar_pdf").empty();
    $("#seccionAprobacion").show();
}
// Funcion q verifica si tiene o no tiene documentos cargados el año anterior "Amarillo"
function ver_estado_SOLICITADO_anterior(response) {
    // console.log(response);
    //  200 es si el empleado tiene documentos cargados el año anterior
    if (response.status == 200) {
        // console.log(response);
        // aqui me trae los datos de la prestacion del año pasado 
        var Prestacion_anterior = response.Prestacion_anterior;
        // console.log(Prestacion_anterior.ID_ESTATUS);
        var nombreEmpleado = Prestacion_anterior.EMP_NAME;
        nom_empreado_prestacion = nombreEmpleado;
        var NumeroEmpleado = Prestacion_anterior.EMP_NUM;
        EmpNum_empreado_prestacion = NumeroEmpleado;
        var EMAIL_empleado = Prestacion_anterior.EMAIL;
        EMAIL_empreado_prestacion = EMAIL_empleado;
        // --------------------------------------
        // 'id' de la aprobacion  
        var id = Prestacion_anterior.ID_APRO;
        // 'fecha' de la aprobación 
        var fecha = Prestacion_anterior.FECHA_SOLICITUD;
        if (Prestacion_anterior.ID_ESTATUS == 8 || Prestacion_anterior.ID_ESTATUS == 7 || Prestacion_anterior.ID_ESTATUS == 6) {
            appData.nombre_XML_paraLeer = Prestacion_anterior.NAME_XML;
            appData.url_XML_paraLeer = Prestacion_anterior.URL;
            // muestra la foto de perfil del empleado
            setTimeout(function () {
                obtenerAvatar(Prestacion_anterior.EMP_NUM, "#avatar3", "40", "40", "rounded-circle");
            }, 1500);
            $("#ver_documentos").show();
            $("#descargar_ducumentos").show();
            $("#info_xml").empty();
            $("#contenido_del_calculo").empty();
            $("#encabezado_doc_descarga").empty();
            $("#msj_desc_doc_descarga").empty();
            $("#msj_ver_doc_descarga").empty();
            $("#botonValidarSAT").empty();
            var fech_formateada = fecha_fancy(fecha);
            var encabezado = `Documentos cargados el ${fech_formateada} de <span id="nombreEmpleado" class="text-info"></span> 
            <span id="avatar3" class="ms-3"></span><span class="ms-3"> Para la prestación del año ${año_actual}</span> `;
            msj_desc_doc = `
            <div class="row">
                <div class="col-md">
                    <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                        <div class="card-body">
                        <h5 class="text-center text-dark mb-1"><i class="bi bi-file-earmark-pdf"></i> PDF</h5>
                            <div class="d-flex justify-content-between">
                                <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_pdf(${id})"><i class="bi bi-eye"></i> Ver</button>
                                <button type="button" class="btn btn-info flex-fill ml-1" onclick="descargar_pdf(${id})"><i class="bi bi-download"></i> Descargar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md">
                <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                        <div class="card-body">
                        <h5 class="text-center text-dark mb-1"><i class="bi bi-file-earmark-pdf"></i> XML</h5>
                            <div class="d-flex justify-content-between">
                                <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_xml(${id})"><i class="bi bi-eye"></i> Ver</button>
                                <button type="button" class="btn btn-info flex-fill ml-1" onclick="descargar_xml(${id})"><i class="bi bi-download"></i> Descargar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            $("#msj_desc_doc_descarga").append(msj_desc_doc);

            $("#encabezado_doc_descarga").append(encabezado);
            $("#mostrar_pdf").empty();
            // $("#seccionAprobacion").show();
            $("#nombreEmpleado").append(nombreEmpleado);
            var botonValidarSAT = `<button class="btn btn-danger mt-3"onclick="leer_xml()" id="aprobacion_btn">Aprobación</button>`;
            $("#botonValidarSAT").append(botonValidarSAT);

        } else if (Prestacion_anterior.ID_ESTATUS == 5) {
            // aqui es cuando el empleado no tiene datos del año pasado 
            var INFOprestacion_actual = response.Prestacion_actual;
            var nombreEmpleado = INFOprestacion_actual.EMP_NAME;
            nom_empreado_prestacion = nombreEmpleado;
            var NumeroEmpleado = INFOprestacion_actual.EMP_NUM;
            EmpNum_empreado_prestacion = NumeroEmpleado;
            var EMAIL_empleado = INFOprestacion_actual.EMAIL;
            EMAIL_empreado_prestacion = EMAIL_empleado;
            // console.log(INFOprestacion_actual);
            appData.nombre_XML_paraLeer = INFOprestacion_actual.NAME_XML;
            appData.url_XML_paraLeer = 'pendiente';
            // muestra la foto de perfil del empleado
            setTimeout(function () {
                obtenerAvatar(INFOprestacion_actual.EMP_NUM, "#avatar3", "40", "40", "rounded-circle");
            }, 1500);
            $("#ver_documentos").hide();
            $("#descargar_ducumentos").hide();
            $("#info_xml").empty();
            $("#contenido_del_calculo").empty();
            $("#encabezado_doc_descarga").empty();
            $("#msj_desc_doc_descarga").empty();
            $("#msj_ver_doc_descarga").empty();
            $("#botonValidarSAT").empty();
            var encabezado = `<span id="avatar3" class="ms-3"></span><span id="nombreEmpleado" class="text-info ms-3"></span> 
                <span class="ms-3">  La solicitud del año ${año_actual}  ha sido cancelada por incumplimiento de documentación.</span>`;
            var botonValidarSAT = `<button disabled class="btn btn-danger mt-2"onclick="leer_xml()">Aprobación denagada</button>`;
            $("#encabezado_doc_descarga").append(encabezado);
            $("#botonValidarSAT").append(botonValidarSAT);
            $("#mostrar_pdf").empty();
            $("#seccionAprobacion").show();
            $("#nombreEmpleado").append(nombreEmpleado);

        }
        else {

            estado_anterior_indeterminado(response);

        }
    }
    // 300 es si el empleado no tiene documentos cargados anteriormente 
    if (response.status == 300) {
        estado_anterior_indeterminado(response);
    }

}
// Funcion cuando la prestación se ha dado pero el empleaod ahun no sube sus documentos es el stus "verde"
function ver_estado_SOLICITADO_pendiente(response) {
    // aqui me trae los datos de la prestacion del año pasado 
    var Prestacion_actual = response.Prestacion_actual;
    // console.log(Prestacion_actual);
    var anio_prestacion = Prestacion_actual.ANIO;
    var nombreEmpleado = Prestacion_actual.EMP_NAME;
    nom_empreado_prestacion = nombreEmpleado;
    var NumeroEmpleado = Prestacion_actual.EMP_NUM;
    EmpNum_empreado_prestacion = NumeroEmpleado;
    var EMAIL_empleado = Prestacion_actual.EMAIL;
    EMAIL_empreado_prestacion = EMAIL_empleado;
    // --------------------------------------
    // 'id' de la aprobacion  
    var id = Prestacion_actual.ID_APRO;
    // 'fecha' de la aprobación 
    var fecha = Prestacion_actual.FECHA_SOLICITUD;
    appData.nombre_XML_paraLeer = Prestacion_actual.NAME_XML;
    appData.url_XML_paraLeer = Prestacion_actual.URL;
    // muestra la foto de perfil del empleado
    setTimeout(function () {
        obtenerAvatar(Prestacion_actual.EMP_NUM, "#avatar3", "40", "40", "rounded-circle");
    }, 1500);
    $("#ver_documentos").hide();
    $("#descargar_ducumentos").hide();
    $("#info_xml").empty();
    $("#contenido_del_calculo").empty();
    $("#encabezado_doc_descarga").empty();
    $("#msj_desc_doc_descarga").empty();
    $("#msj_ver_doc_descarga").empty();
    $("#botonValidarSAT").empty();
    var encabezado = `<span class="ms-3">Estamos en espera del XML y PDF de</span><span id="nombreEmpleado" class="text-info ms-3"></span><span id="avatar3" class="ms-3"></span>`;
    $("#encabezado_doc_descarga").append(encabezado);
    $("#mostrar_pdf").empty();
    $("#seccionAprobacion").show();
    $("#nombreEmpleado").append(nombreEmpleado);
    if (anio_prestacion == año_actual) {
        var botonValidarSAT = `<button class="btn btn-danger mt-2"onclick="modal_Enviar_mensaje_recordatorio()"><i class="bi bi-envelope-at"> Enviar mensaje</i></button>`;
        $("#botonValidarSAT").append(botonValidarSAT);
    } else {
        var botonValidarSAT = `<button disabled class="btn btn-danger mt-2"onclick="modal_Enviar_mensaje_recordatorio()"><i class="bi bi-envelope-at"> Enviar mensaje</i></button>`;
        $("#botonValidarSAT").append(botonValidarSAT);
    }
}
// FUncion cunado los empleados se le ha canselado una prestación "Rojo"
function ver_estado_SOLICITADO_cancelado(response) {
    // aqui me trae los datos de la prestacion del año pasado 
    var Prestacion_actual = response.Prestacion_actual;
    var nombreEmpleado = Prestacion_actual.EMP_NAME;
    var motivo = Prestacion_actual.MOTIVO;
    nom_empreado_prestacion = nombreEmpleado;
    var NumeroEmpleado = Prestacion_actual.EMP_NUM;
    EmpNum_empreado_prestacion = NumeroEmpleado;
    var EMAIL_empleado = Prestacion_actual.EMAIL;
    EMAIL_empreado_prestacion = EMAIL_empleado;
    console.log(motivo);
    // --------------------------------------
    // 'id' de la aprobacion  
    var id = Prestacion_actual.ID_APRO;
    // 'fecha' de la aprobación 
    var fecha = Prestacion_actual.FECHA_SOLICITUD;
    appData.nombre_XML_paraLeer = Prestacion_actual.NAME_XML;
    appData.url_XML_paraLeer = Prestacion_actual.URL;
    // muestra la foto de perfil del empleado
    setTimeout(function () {
        obtenerAvatar(Prestacion_actual.EMP_NUM, "#avatar3", "40", "40", "rounded-circle");
    }, 1500);
    $("#ver_documentos").hide();
    $("#descargar_ducumentos").hide();
    $("#info_xml").empty();
    $("#contenido_del_calculo").empty();
    $("#encabezado_doc_descarga").empty();
    $("#msj_desc_doc_descarga").empty();
    $("#msj_ver_doc_descarga").empty();
    $("#botonValidarSAT").empty();
    var encabezado = ` Solicitud Cancelada de <span id="nombreEmpleado" class="text-info ms-3"></span><span id="avatar3" class="ms-3"></span>`;
    var botonValidarSAT = `<div style="font-size: 15px;">Motivo de Cancelación: <span id="motivo" class="text-danger ms-3"></span> </div>`;
    $("#encabezado_doc_descarga").append(encabezado);
    $("#botonValidarSAT").append(botonValidarSAT);
    $("#mostrar_pdf").empty();
    $("#seccionAprobacion").show();
    $("#nombreEmpleado").append(nombreEmpleado);
    $("#motivo").append(motivo);


}
// Funcion cuando los empleados no tienen reguistro de prestacion año anterior 
function estado_anterior_indeterminado(response) {
    // aqui es cuando el empleado no tiene datos del año pasado 
    var INFOprestacion_actual = response.Prestacion_actual;
    var nombreEmpleado = INFOprestacion_actual.EMP_NAME;
    nom_empreado_prestacion = nombreEmpleado;
    var NumeroEmpleado = INFOprestacion_actual.EMP_NUM;
    EmpNum_empreado_prestacion = NumeroEmpleado;
    var EMAIL_empleado = INFOprestacion_actual.EMAIL;
    EMAIL_empreado_prestacion = EMAIL_empleado;
    // console.log(EMAIL_empreado_prestacion);
    appData.nombre_XML_paraLeer = INFOprestacion_actual.NAME_XML;
    appData.url_XML_paraLeer = 'pendiente';
    // muestra la foto de perfil del empleado
    setTimeout(function () {
        obtenerAvatar(INFOprestacion_actual.EMP_NUM, "#avatar3", "40", "40", "rounded-circle");
    }, 1500);
    $("#ver_documentos").hide();
    $("#descargar_ducumentos").hide();
    $("#info_xml").empty();
    $("#contenido_del_calculo").empty();
    $("#encabezado_doc_descarga").empty();
    $("#msj_desc_doc_descarga").empty();
    $("#msj_ver_doc_descarga").empty();
    $("#botonValidarSAT").empty();
    var encabezado = `<span id="avatar3" class="ms-3"></span><span id="nombreEmpleado" class="text-info ms-3"></span> 
            <span class="ms-3">No tiene reguistro del año ${año_anterior}</span>`;
    var botonValidarSAT = `<button class="btn btn-danger mt-2"onclick="leer_xml()">Aprobación</button>`;
    $("#encabezado_doc_descarga").append(encabezado);
    $("#botonValidarSAT").append(botonValidarSAT);
    $("#mostrar_pdf").empty();
    $("#seccionAprobacion").show();
    $("#nombreEmpleado").append(nombreEmpleado);
}
// ----------
function modal_aprobar_solicitud() {
    quincena_select = $("#quincenas_list").val();
    $("#notificacion_de_envioRechazo").modal("show");
    $("#msj_de_envioRechazo").empty();
    // ------------- 
    $("#encabezado_doc").empty();
    $("#body_de_envioRechazo").empty();
    $("#lugar_btn").empty();
    var encabezado = `Prestación para <span class="text-info">${nom_empreado_prestacion}</span>`;
    $("#encabezado_doc").append(encabezado);
    var btn = `<button onclick="aprobar_solicitud()" type="button" class="btn-primary btn" id="btn_de_envioSolicitud">
                <i class="bi bi-check2">Aceptar</i>
                </button>`;
    $("#lugar_btn").append(btn);
    // ------------- 
    $("#btn_de_envioSolicitud").prop("disabled", true);
    // ------------- 
    var encabezado = `
    Total de Armazón:<span class="text-info"> $${total_armazon}</span> <br>
    Total de Micas:<span class="text-info"> $${total_micas}</span> <br>
    Quincena seleccionada:<span class="text-info"> ${quincena_select}</span> <br>
    Prestación con un total de <span class="text-info"> $${total_prestacion}</span>
    <br><hr>
    <label for="aceptar_prestación" class="custom-checkbox-label mt-3">
        <input type="checkbox" id="aceptar_prestación" class="custom-checkbox">
           Estoy de acuerdo con la prestación 
        </label>`;
    $("#body_de_envioRechazo").append(encabezado);
    $("#aceptar_prestación").on("change", function () {
        // Habilitar o deshabilitar el botón según el estado del checkbox
        $("#btn_de_envioSolicitud").prop("disabled", !$(this).prop("checked"));
    });
}
function modal_Aprobar_documentos(id) {
    $("#notificacion_de_envioRechazo").modal("show");
    $("#msj_de_envioRechazo").empty();
    $("#encabezado_doc").empty();
    $("#body_de_envioRechazo").empty();
    $("#lugar_btn").empty();
    var encabezado = `Prestación para <span class="text-info">${nom_empreado_prestacion}</span>`;
    $("#encabezado_doc").append(encabezado);
    var btn = `<button onclick="Aprobar_documentos(${id})" type="button" class="btn-primary btn" id="btn_de_envioDoc">
                <i class="bi bi-check2">Aceptar</i>
                </button>`;
    $("#lugar_btn").append(btn);
    // ------------- 
    $("#btn_de_envioDoc").prop("disabled", true);
    // ------------- 
    var encabezado = `
    ¿Estás de acuerdo en que los documentos XML y PDF son correctos?
    <br><hr>
    <label for="aceptar_documentos" class="custom-checkbox-label mt-3">
        <input type="checkbox" id="aceptar_documentos" class="custom-checkbox">
           Estoy de acuerdo con los Documentos
        </label>`;
    $("#body_de_envioRechazo").append(encabezado);
    $("#aceptar_documentos").on("change", function () {
        // Habilitar o deshabilitar el botón según el estado del checkbox
        $("#btn_de_envioDoc").prop("disabled", !$(this).prop("checked"));
    });
}
function modal_rechazarPrestacion(tipo_rechazo) {
    console.log(appData.ID_PRESTACION_PRECIONADA);
    $("#notificacion_de_envioRechazo").modal("show");
    $("#msj_de_envioRechazo").empty();
    $("#encabezado_doc").empty();
    $("#body_de_envioRechazo").empty();
    $("#lugar_btn").empty();
    var encabezado = `Prestación para <span class="text-info">${nom_empreado_prestacion}</span>`;
    $("#encabezado_doc").append(encabezado);
    var btn = `<button onclick="aprobar_RechazoPrestacion(${appData.ID_PRESTACION_PRECIONADA}, '${tipo_rechazo}')" type="button" class="btn-primary btn" id="btn_rechazo">
                <i class="bi bi-check2">Aceptar</i>
                </button>`;
    $("#lugar_btn").append(btn);
    // ------------- 
    $("#btn_rechazo").prop("disabled", true);
    // ------------- 
    var encabezado = `
    <h5>Motivo del rechazo de la prestación</h5><br>
    <div class="input-group mt-2" id="group-modal-motivo_email">
        <span class="input-group-text"><i class="bi bi-envelope-at"> Mensaje</i></span>
        <textarea id="modal-motivo_email" name="modal-motivo_email" rows="4" cols="50"></textarea>
    </div>
    <br><hr>
    ¿Estás de acuerdo en rechazar esta prestación?
    <br><hr>
    <label for="aceptar_rechazo" class="custom-checkbox-label mt-3">
    <input type="checkbox" id="aceptar_rechazo" class="custom-checkbox">
        Estoy de acuerdo
    </label>`;
    $("#body_de_envioRechazo").append(encabezado);
    $("#aceptar_rechazo").on("change", function () {
        // Habilitar o deshabilitar el botón según el estado del checkbox
        $("#btn_rechazo").prop("disabled", !$(this).prop("checked"));
    });
}
function modal_Enviar_mensaje_recordatorio() {
    // console.log(appData.ID_PRESTACION_PRECIONADA);
    $("#notificacion_de_envioRechazo").modal("show");
    $("#encabezado_doc").empty();
    $("#msj_de_envioRechazo").empty();
    $("#body_de_envioRechazo").empty();
    $("#lugar_btn").empty();
    var encabezado = `Prestación para <span class="text-info">${nom_empreado_prestacion}</span>`;
    $("#encabezado_doc").append(encabezado);
    var btn = `<button onclick="aprobar_Enviar_mensaje_recordatorio(${appData.ID_PRESTACION_PRECIONADA})" type="button" class="btn-primary btn" id="btn_de_mensajee">
                <i class="bi bi-check2">Aceptar</i>
                </button>`;
    $("#lugar_btn").append(btn);
    // ------------- 
    $("#btn_de_mensajee").prop("disabled", true);
    // ------------- 
    var body = `
    <h5>Recordatorio de documentación</h5><br>
    <div class="input-group mt-2" id="group-modal-mensaje_email">
        <span class="input-group-text"><i class="bi bi-envelope-at"> Mensaje</i></span>
        <textarea id="modal-mensaje_email" name="modal-mensaje_email" rows="4" cols="50"></textarea>
    </div>
    <br><hr>
    ¿Estás de acuerdo en enviar el mensaje a el empleado?
    <br><hr>
    <label for="aceptar_email_msj" class="custom-checkbox-label mt-3">
        <input type="checkbox" id="aceptar_email_msj" class="custom-checkbox">
           Estoy de acuerdo con el mensaje
        </label>`;
    $("#body_de_envioRechazo").append(body);
    $("#aceptar_email_msj").on("change", function () {
        // Habilitar o deshabilitar el botón según el estado del checkbox
        $("#btn_de_mensajee").prop("disabled", !$(this).prop("checked"));
    });
}
// ---------- 
function Aprobar_documentos(id) {
    $("#btn_de_envioDoc").prop("disabled", true);
    $("#loading-container").show();
    function makeRequest() {
        $.ajax({
            url: Aprobar_documentosRoute,
            dataType: "json",
            method: "POST",
            data: {
                empNum: EmpNum_empreado_prestacion,
                nom: nom_empreado_prestacion,
                email: EMAIL_empreado_prestacion,
                id_prestacion: id,
            },
            success: function (response) {
                $("#loading-container").hide();
                if (response.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                    reject("Sesión cerrada");
                }
                if (response.status == 200) {
                    $("#msj_de_envioRechazo").empty();
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                    // ------------------ 
                    $("#animacion_cargando").addClass("loading-animation");

                    var fecha_rango = $("#fechaInput").val();
                    appData.fecha_rango = fecha_rango;
                    $("#prestacionesTable").DataTable().destroy();
                    setTimeout(function () {
                        $("#animacion_cargando").removeClass("loading-animation");
                        cargarTodasLasprestaciones(appData.tipo_prestacion);
                    }, 1000);
                    // ------------------ 
                    $("#info_xml").empty();
                    $("#seccionAprobacion").hide();
                    setTimeout(function () {
                        $("#notificacion_de_envioRechazo").modal("hide");
                    }, 2500);
                }
                if (response.status == 500) {
                    $("#btn_de_envioDoc").prop("disabled", false);
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                }
            },
            error: function () {
                $("#btn_de_envioDoc").prop("disabled", false);
                setTimeout(makeRequest, 1000);
            },
        });
    }
    makeRequest();
}
function aprobar_solicitud() {
    $("#btn_de_envioSolicitud").prop("disabled", true);
    // console.log(EMAIL_empreado_prestacion);
    $("#loading-container").show();
    function makeRequest() {
        $.ajax({
            url: aprobar_solicitudRoute,
            dataType: "json",
            method: "POST",
            data: {
                empNum: EmpNum_empreado_prestacion,
                total: total_prestacion,
                armazon: total_armazon,
                micas: total_micas,
                accesorios: total_accesorios,
                nom: nom_empreado_prestacion,
                email: EMAIL_empreado_prestacion,
                quincena: quincena_select,
            },
            success: function (response) {
                $("#loading-container").hide();
                if (response.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                    reject("Sesión cerrada");
                }
                if (response.status == 200) {
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                    // ------------------ 
                    $("#animacion_cargando").addClass("loading-animation");

                    var fecha_rango = $("#fechaInput").val();
                    appData.fecha_rango = fecha_rango;
                    $("#prestacionesTable").DataTable().destroy();
                    setTimeout(function () {
                        $("#animacion_cargando").removeClass("loading-animation");
                        cargarTodasLasprestaciones(appData.tipo_prestacion);
                    }, 1000);
                    // ------------------ 
                    $("#info_xml").empty();
                    $("#seccionAprobacion").hide();
                    setTimeout(function () {
                        $("#notificacion_de_envioRechazo").modal("hide");
                    }, 2500);
                }
                if (response.status == 500) {
                    $("#btn_de_envioSolicitud").prop("disabled", false);
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                }
            },
            error: function () {
                $("#btn_de_envioSolicitud").prop("disabled", false);
                setTimeout(makeRequest, 1000);
            },
        });
    }
    makeRequest();

}
function aprobar_Enviar_mensaje_recordatorio(id) {
    $("#btn_de_mensajee").prop("disabled", true);
    if ($("#modal-mensaje_email").val() == '') {
        manejarValidacionCampo(
            "modal-mensaje_email",
            "Escribe el motivo",
            true
        );
        return false;
    }
    var motivo = $("#modal-mensaje_email").val();
    function makeRequest() {
        $.ajax({
            url: aprobar_Enviar_mensaje_recordatorioRoute,
            dataType: "json",
            method: "POST",
            data: {
                motivo: motivo,
                id_p: id,
                empNum: EmpNum_empreado_prestacion,
                nom: nom_empreado_prestacion,
                email: EMAIL_empreado_prestacion,
            },
            success: function (response) {
                $("#loading-container").hide();
                if (response.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                    reject("Sesión cerrada");
                }
                if (response.status == 200) {
                    $("#msj_de_envioRechazo").empty();
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                    // ------------------ 
                    // $("#prestacionesTable").DataTable().destroy();
                    // cargarTodasLasprestaciones(año_actual, tipo_de_prestación);
                    // ------------------ 
                    $("#info_xml").empty();
                    $("#seccionAprobacion").hide();
                    setTimeout(function () {
                        $("#notificacion_de_envioRechazo").modal("hide");
                    }, 2500);
                }
                if (response.status == 500) {
                    $("#btn_de_mensajee").prop("disabled", false);
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                }
            },
            error: function () {
                $("#btn_de_mensajee").prop("disabled", false);
                setTimeout(makeRequest, 1000);
            },
        });
    }
    makeRequest();

}
// ESTA FUNCION CIRVE PARA RECHAZAR PREDIAL, LENTES 
function aprobar_RechazoPrestacion(id, tipo_rechazo) {
    $("#btn_rechazo").prop("disabled", true);
    if ($("#modal-motivo_email").val() == '') {
        manejarValidacionCampo(
            "modal-motivo_email",
            "Escribe el motivo",
            true
        );
        return false;
    }
    var motivo = $("#modal-motivo_email").val();
    $("#msj_de_envioRechazo").empty();
    // console.log(motivo, id);
    function makeRequest() {
        $.ajax({
            url: aprobar_RechazoPrestacionRoute,
            dataType: "json",
            method: "POST",
            data: {
                motivo: motivo,
                tipo_rechazo: tipo_rechazo,
                id_p: id,
                empNum: EmpNum_empreado_prestacion,
                nom: nom_empreado_prestacion,
                email: EMAIL_empreado_prestacion,
            },
            success: function (response) {
                $("#loading-container").hide();
                if (response.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                    reject("Sesión cerrada");
                }
                if (response.status == 200) {
                    $("#msj_de_envioRechazo").empty();
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                    // ------------------ 
                    $("#animacion_cargando").addClass("loading-animation");

                    var fecha_rango = $("#fechaInput").val();
                    appData.fecha_rango = fecha_rango;
                    $("#prestacionesTable").DataTable().destroy();
                    setTimeout(function () {
                        $("#animacion_cargando").removeClass("loading-animation");
                        cargarTodasLasprestaciones(appData.tipo_prestacion);
                    }, 1000);
                    // ------------------ 
                    $("#info_xml").empty();
                    $("#seccionAprobacion").hide();
                    setTimeout(function () {
                        $("#notificacion_de_envioRechazo").modal("hide");
                    }, 2500);
                }
                if (response.status == 500) {
                    $("#btn_rechazo").prop("disabled", false);
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                }
            },
            error: function () {
                $("#btn_rechazo").prop("disabled", false);
                setTimeout(makeRequest, 1000);
            },
        });
    }
    makeRequest();

}
function rangoFechas() {
    $("#fechaInput").daterangepicker({
        opens: "right", // Puedes ajustar la posición del calendario
        autoApply: true, // Aplica automáticamente la selección al cerrar el calendario
        locale: {
            format: "YYYY-MM-DD", // Formato de fecha
            separator: " - ", // Separador entre las fechas en el rango
            applyLabel: "Aplicar",
            cancelLabel: "Cancelar",
            fromLabel: "Desde",
            toLabel: "Hasta",
            customRangeLabel: "Rango personalizado",
            weekLabel: "S",
            daysOfWeek: [
                "Dom",
                "Lun",
                "Mar",
                "Mié",
                "Jue",
                "Vie",
                "Sáb",
            ],
            monthNames: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
            ],
            firstDay: 1,
        },
        ranges: {
            "Año actual": [
                moment().startOf("year"),
                moment().endOf("year"),
            ],
            "Año pasado": [
                moment().subtract(1, "year").startOf("year"),
                moment().subtract(1, "year").endOf("year"),
            ],
            Hoy: [moment(), moment()],
            Ayer: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Este mes": [moment().startOf("month"), moment().endOf("month")],
            "Mes pasado": [
                moment().subtract(1, "month").startOf("month"),
                moment().subtract(1, "month").endOf("month"),
            ],
        },
    });
}
function limpia_modal_download() {
}
function validacionClaveProductoSAT(clave, tipo) {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: validacionClaveProductoSATRoute,
                dataType: "json",
                method: "POST",
                data: {
                    clave: clave,
                    tipo: tipo,
                },
                success: function (response) {
                    if (response.status == 700) {
                        // Cierra sesión en caso de status 700
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                        reject(response);  // Rechaza la promesa si es necesario
                    } else {
                        resolve(response); // Resuelve la promesa si la clave fue encontrada
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
// ---------------------------
// ------------- PREDIAL -------------  
// ---------------------------
var total_predial = 0;
var clavee = '';
function crear_claculos_Predial(id) {
    DatosPrestacion(id)
        .then(function (response) {
            // console.log(response);
            var datos = response.datos;
            // console.log(appData.UMA);97
            // alerta("success", comprobante);
            $("#contenido_del_calculo").empty();
            var contenido_del_calculo = `
                <div class="row">
                    <div class="col-md-2"><h3>Cálculos</h3></div>
                    <div class="col-md-2 mt-2" style="font-size: 13px"><strong>UMA</strong>: $<span id="CANTIDAD_UMA_prestacion"></span></div>
                </div>
                <form id="form_calculo_predial" method="POST" enctype="multipart/form-data" class="mb-3 mt-2">
                <input type="hidden" name="_token" value="${csrfToken}">
                    <div class="row g-3" id="apartado_de_CALCULOS">
                        <div class="col-md-7">
                            <div class="input-group mt-2" id="group-modal-anio">
                                <span class="input-group-text"><i class="bi bi-calendar-week"> Prestación en el año ${año_actual}</i></span>
                                <div class="form-check form-check-inline ms-3">
                                    <input class="form-check-input" type="radio" name="modal-anio" id="modal-anio-si" value="si" required>
                                    <label class="form-check-label" for="modal-anio-si">Sí</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="modal-anio" id="modal-anio-no" value="no" required>
                                    <label class="form-check-label" for="modal-anio-no">No</label>
                                </div>
                            </div>
                            
                            <div class="input-group mt-2" id="group-modal-construccion">
                                <span class="input-group-text"><i class="bi bi-house-up"> Terreno en construcción</i></span>
                                <div class="form-check form-check-inline ms-3">
                                    <input class="form-check-input" type="radio" name="modal-construccion" id="modal-construccion-si" value="si" required>
                                    <label class="form-check-label" for="modal-construccion-si">Sí</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="modal-construccion" id="modal-construccion-no" value="no" required>
                                    <label class="form-check-label" for="modal-construccion-no">No</label>
                                </div>
                            </div>

                            <div class="input-group mt-2" id="group-modal-nombre">
                                <span class="input-group-text"><i class="bi bi-person"> A nombre de ${nom_empreado_prestacion}</i></span>
                                <div class="form-check form-check-inline ms-3">
                                    <input class="form-check-input" type="radio" name="modal-nombre" id="modal-nombre-si" value="si" required>
                                    <label class="form-check-label" for="modal-nombre-si">Sí</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="modal-nombre" id="modal-nombre-no" value="no" required>
                                    <label class="form-check-label" for="modal-nombre-no">No</label>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-4">
                            <div class="input-group mt-2" id="group-modal-total-predial">
                                <span class="input-group-text"><i class="bi bi-currency-dollar"> Total</i></span>
                                <input  type="number" step="0.01" id="modal-total-predial" onclick="change_calculosPREDIAL()" name="modal-total-predial" min="0" class="form-control" placeholder="Total" required>
                            </div>
                            <div class="input-group mt-2" >
                                <span class="input-group-text"><i class="bi bi-list-ol"> Quincena</i></span>
                                <select class="selectpicker form-control col-md-4" id="quincenas_list">
                                    
                                </select>
                            </div>
                            <div class="input-group mt-2" id="group-modal-clave-catastral">
                                <span class="input-group-text"><i class="bi bi-key"> Clave - Catastral</i></span>
                                <input  type="text" step="0.01" id="modal-clave-catastral" name="modal-clave-catastral" min="0" class="form-control" placeholder="Clave" required>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="form-group col-md-6">
                            <button type="button" id="btn_aprobar_solicitud" onclick="modal_aprobar_solicitudPREDIAL()" class="btn btn-success btn-block me-3">Aprobar solicitud</button>
                        </div>
                        <div class="form-group col-md-3">
                            <button type="button" class="btn btn-danger  btn-block me-3" onclick="modal_rechazarPrestacionPREDIAL()">Tipos de rechazo</button>
                        </div>
                        <div class="form-group col-md-2">
                            <button type="button" onclick="calculadora_mostrar()" class="btn btn-dark btn-block me-3"><i class="bi bi-calculator"> Calculadora</i></button>
                        </div>
                    </div>
                </form>
                <div id="contenedor_calculadora">
                </div>
                `;
            $("#contenido_del_calculo").append(contenido_del_calculo);
            generarQuincenas();
            $("#CANTIDAD_UMA_prestacion").append(appData.UMA);
            var preAño = datos.PRE_AÑO;
            var preCons = datos.PRE_CONS;
            var compro = datos.NAME_COMPROBANTE;
            var total = datos.TOTAL;
            clavee = datos.CLAVE_CATASTRAL;
            // console.log(compro);
            setTimeout(function () {
                if (preAño != "1") {
                    // Si se cumple la condición, selecciona automáticamente "No"
                    $("#modal-anio-no").prop("checked", true);
                } else {
                    // Si se cumple la condición, selecciona automáticamente "No"
                    $("#modal-anio-si").prop("checked", true);
                }
                // ---------------------------------
                if (preCons != "1") {
                    // Si se cumple la condición, selecciona automáticamente "No"
                    $("#modal-construccion-no").prop("checked", true);
                } else {
                    // Si se cumple la condición, selecciona automáticamente "No"
                    $("#modal-construccion-si").prop("checked", true);
                }
                // ---------------------------------
                if (compro == "" || compro == null) {
                    // Si se cumple la condición, selecciona automáticamente "No"
                    $("#modal-nombre-si").prop("checked", true);
                } else {
                    // Si se cumple la condición, selecciona automáticamente "No"
                    $("#modal-nombre-no").prop("checked", true);
                }
                $("#modal-clave-catastral").val(clavee);
                var totalUMA_predial = (appData.UMA * 18).toFixed(2);
                // console.log(totalUMA_predial);
                if (total <= totalUMA_predial) {
                    $("#modal-total-predial").val(total);
                    total_predial = total;
                } else {
                    $("#modal-total-predial").val(totalUMA_predial);
                    total_predial = totalUMA_predial;
                }

            }, 1500);

        })
        .catch(function () {
            console.log("error al obtener datos de la prestación");
        });
}
function modal_aprobar_solicitudPREDIAL() {
    quincena_select = $("#quincenas_list").val();
    clavee = $("#modal-clave-catastral").val();
    $("#notificacion_de_envioRechazo").modal("show");
    $("#msj_de_envioRechazo").empty();
    // ------------- 
    $("#encabezado_doc").empty();
    $("#body_de_envioRechazo").empty();
    $("#lugar_btn").empty();
    var encabezado = `Prestación para <span class="text-info">${nom_empreado_prestacion}</span>`;
    $("#encabezado_doc").append(encabezado);
    var btn = `<button onclick="aprobar_solicitudPREDIAL()" type="button" class="btn-primary btn" id="btn_de_envioSolicitud">
                <i class="bi bi-check2">Aceptar</i>
                </button>`;
    $("#lugar_btn").append(btn);
    // ------------- 
    $("#btn_de_envioSolicitud").prop("disabled", true);
    // ------------- 
    var encabezado = `
    Total :<span class="text-info"> $${total_predial}</span> <br>
    Quincena seleccionada:<span class="text-info"> ${quincena_select}</span> <br>
    Clave - Ctastral:<span class="text-info"> ${clavee}</span> <br>
    <br><hr>
    <label for="aceptar_prestación" class="custom-checkbox-label mt-3">
        <input type="checkbox" id="aceptar_prestación" class="custom-checkbox">
        Estoy de acuerdo con la prestación 
        </label>`;
    $("#body_de_envioRechazo").append(encabezado);
    $("#aceptar_prestación").on("change", function () {
        // Habilitar o deshabilitar el botón según el estado del checkbox
        $("#btn_de_envioSolicitud").prop("disabled", !$(this).prop("checked"));
    });
}
function aprobar_solicitudPREDIAL() {
    $("#btn_de_envioSolicitud").prop("disabled", true);
    // console.log(EMAIL_empreado_prestacion);
    $("#loading-container").show();
    function makeRequest() {
        $.ajax({
            url: aprobar_solicitudPREDIALRoute,
            dataType: "json",
            method: "POST",
            data: {
                empNum: EmpNum_empreado_prestacion,
                total: total_predial,
                nom: nom_empreado_prestacion,
                quincena: quincena_select,
                email: EMAIL_empreado_prestacion,
                clave: clavee,
            },
            success: function (response) {
                $("#loading-container").hide();
                if (response.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                    reject("Sesión cerrada");
                }
                if (response.status == 200) {
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                    // ------------------ 
                    $("#animacion_cargando").addClass("loading-animation");

                    var fecha_rango = $("#fechaInput").val();
                    appData.fecha_rango = fecha_rango;
                    $("#prestacionesTable").DataTable().destroy();
                    setTimeout(function () {
                        $("#animacion_cargando").removeClass("loading-animation");
                        cargarTodasLasprestaciones(appData.tipo_prestacion);
                    }, 1000);
                    // ------------------ 
                    $("#info_xml").empty();
                    $("#seccionAprobacion").hide();
                    setTimeout(function () {
                        $("#notificacion_de_envioRechazo").modal("hide");
                    }, 2500);
                }
                if (response.status == 500) {
                    $("#btn_de_envioSolicitud").prop("disabled", false);
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                }
            },
            error: function () {
                $("#btn_de_envioSolicitud").prop("disabled", false);
                setTimeout(makeRequest, 1000);
            },
        });
    }
    makeRequest();

}
function change_calculosPREDIAL() {
    // ------------------------------------- 
    // actualiza el total de los calculos autoamticamente despues d emodificar un input de el cálculo 
    $("#modal-total-predial").change(function () {
        borra_mensajes();
        var val_total = $("#modal-total-predial").val();
        var topadoUMA = (appData.UMA * 18).toFixed(2);
        if ($("#modal-total-predial").val() < 0 || $("#modal-total-predial").val() == '') {
            manejarValidacionCampo(
                "modal-total-predial",
                "No se permiten números negativos ni campos vacíos. Asegúrate de ingresar valores válidos y positivos en el campo correspondiente.",
                true
            );
            return false;
        }
        // Deshabilitar los inputs
        $("#modal-total-predial").prop("disabled", true);
        setTimeout(function () {
            if (val_total > topadoUMA) {
                $("#modal-total-predial").val(topadoUMA);
                total_predial = topadoUMA;
            } else {
                total_predial = val_total;
            }
            // Deshabilitar los inputs
            $("#modal-total-predial").prop("disabled", false);
        }, 1500)
    });
}
function aprobar_RechazoPrestacion_Predial(id) {
    $("#loading-container").show();
    let tipo_rechazo = $("input[name='motivoRechazo']:checked").val();
    // console.log("Valor seleccionado:", valorSeleccionado);
    $("#btn_rechazo").prop("disabled", true);
    if ($("#modal-motivo_email").val() == '') {
        manejarValidacionCampo(
            "modal-motivo_email",
            "Escribe el motivo",
            true
        );
        $("#loading-container").hide();
        return false;
    }
    if ($("input[name='motivoRechazo']:checked").val() == undefined) {
        alerta("info", "seleccciona un motivo")
        $("#loading-container").hide();
        return false;
    }
    var motivo = $("#modal-motivo_email").val();
    $("#msj_de_envioRechazo").empty();
    // console.log(motivo, id);
    function makeRequest() {
        $.ajax({
            url: aprobar_RechazoPrestacionRoute,
            dataType: "json",
            method: "POST",
            data: {
                motivo: motivo,
                tipo_rechazo: tipo_rechazo,
                id_p: id,
                empNum: EmpNum_empreado_prestacion,
                nom: nom_empreado_prestacion,
                email: EMAIL_empreado_prestacion,
            },
            success: function (response) {
                if (response.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                    reject("Sesión cerrada");
                }
                if (response.status == 200) {
                    $("#msj_de_envioRechazo").empty();
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                    // ------------------ 
                    $("#animacion_cargando").addClass("loading-animation");

                    var fecha_rango = $("#fechaInput").val();
                    appData.fecha_rango = fecha_rango;
                    $("#prestacionesTable").DataTable().destroy();
                    setTimeout(function () {
                        $("#animacion_cargando").removeClass("loading-animation");
                        cargarTodasLasprestaciones(appData.tipo_prestacion);
                    }, 1000);
                    // ------------------ 
                    // $("#info_xml").empty();
                    $("#seccionAprobacion").hide();
                    setTimeout(function () {
                        $("#notificacion_de_envioRechazo").modal("hide");
                        $("#loading-container").hide();
                    }, 1500);
                }
                if (response.status == 500) {
                    $("#btn_rechazo").prop("disabled", false);
                    var msj = response.msj;
                    $("#msj_de_envioRechazo").append(msj);
                }
            },
            error: function () {
                $("#btn_rechazo").prop("disabled", false);
                setTimeout(makeRequest, 1000);
            },
            complete: function () {
                // $("#loading-container").hide();
            },
        });
    }
    makeRequest();


}
function modal_rechazarPrestacionPREDIAL() {
    // console.log(appData.ID_PRESTACION_PRECIONADA);
    var tipo_rechazo = 5;
    $("#notificacion_de_envioRechazo").modal("show");
    $("#msj_de_envioRechazo").empty();
    $("#encabezado_doc").empty();
    $("#body_de_envioRechazo").empty();
    $("#lugar_btn").empty();
    var encabezado = `Prestación para <span class="text-info">${nom_empreado_prestacion}</span>`;
    $("#encabezado_doc").append(encabezado);
    var btn = `<button onclick="aprobar_RechazoPrestacion_Predial(${appData.ID_PRESTACION_PRECIONADA})" type="button" class="btn-primary btn" id="btn_rechazo">
                <i class="bi bi-check2">Aceptar</i>
                </button>`;
    $("#lugar_btn").append(btn);
    // ------------- 
    $("#btn_rechazo").prop("disabled", true);
    // ------------- 
    var encabezado = `
    <h5>Motivo del rechazo de la prestación</h5><br>

    <div class="form-check"  id="group-modal-motivo_obcionesRechazo">
        <input class="form-check-input" type="radio" name="motivoRechazo" id="opcion1" value="5">
        <label class="form-check-label" for="opcion1">
            Rechazar prestación (Rechazo absoluto)
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="motivoRechazo" id="opcion2" value="6">
        <label class="form-check-label" for="opcion2">
            Solicitar PDF de su prestación nuevamente
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="motivoRechazo" id="opcion3" value="7">
        <label class="form-check-label" for="opcion3">
            Solicitar un comprobante
        </label>
    </div>

    <div class="input-group mt-2" id="group-modal-motivo_email">
        <span class="input-group-text"><i class="bi bi-envelope-at"> Mensaje</i></span>
        <textarea id="modal-motivo_email" name="modal-motivo_email" rows="4" cols="50"></textarea>
    </div>
    
    <br><hr>
    ¿Estás de acuerdo en rechazar esta prestación?
    <br><hr>
    <label for="aceptar_rechazo" class="custom-checkbox-label mt-3">
    <input type="checkbox" id="aceptar_rechazo" class="custom-checkbox">
        Estoy de acuerdo
    </label>`;
    $("#body_de_envioRechazo").append(encabezado);
    $("#aceptar_rechazo").on("change", function () {
        // Habilitar o deshabilitar el botón según el estado del checkbox
        $("#btn_rechazo").prop("disabled", !$(this).prop("checked"));
    });
}
// ---------------------------
// -------- DENTAL -----------
// ---------------------------
let datosDental;
// Variable para almacenar los valores
let arrayValores = [];
let DocAprobadosDentales = [];
let contadorPorsentaje = 0;
let porsentajeUnico = 0;
let idPrestacion = 0;
let contInput = 0;
let ObjectCantidadesPagar = {
    "modal-corona": {},
    "modal-ProtesisFija": {},
    "modal-incrustacion": {},
    "modal-ProtesisRemovible": {},
    "modal-endoposte": {},
    "modal-placa": {},
};
let TotalesaPagar = [];
// 1°_ Area de botones para ver 👀 y descargar ⬇️
function AnalisisDocDentales(response) {
    // console.log(response);
    let Prestacion_actual = response.Prestacion_actual;
    let idPres = Prestacion_actual.ID_APRO;
    let namePDF = Prestacion_actual.NAME_PDF;
    let fecha = Prestacion_actual.FECHA_SOLICITUD;
    let fech_formateada = fecha_fancy(fecha);
    let color_id = Prestacion_actual.ID_ESTATUS;
    datosDental = response;
    let nombreEmpleado = Prestacion_actual.EMP_NAME;
    nom_empreado_prestacion = nombreEmpleado;

    llenarArrayDocDentales();
    idPrestacion = idPres;
    let tipoPDF = "pdf";
    let tipoXML = "xml";
    msj_desc_doc = `
    <div class="row">
        <div class="col-md">
            <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">Factura</label>
                <select class="form-select" id="inputGroupSelect" >
                    <option selected>Cargando...</option>
                </select>
            </div>
        </div>
        <div class="col-md-4">
            <div>Facturas cargadas <br> <h5 class="text-danger">${namePDF}</h5></div>
        </div>
    </div>

    </div>
    <div class="row">
        <div class="col-md">
            <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                <div class="card-body">
                    <h5 class="text-center text-dark mb-1"><i class="bi bi-ticket-perforated"></i> Vale</h5>
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_Vale(${idPres})"><i class="bi bi-eye"></i> Ver</button>
                        <button type="button" class="btn btn-info flex-fill ml-1" onclick="descargar_Vale(${idPres})"><i class="bi bi-download"></i> Descargar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md">
            <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                <div class="card-body">
                <h5 class="text-center text-dark mb-1"><i class="bi bi-file-earmark-pdf"></i> Odontograma</h5>
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_Odontograma(${idPres})"><i class="bi bi-eye"></i> Ver</button>
                        <button type="button" class="btn btn-info flex-fill ml-1" onclick="descarga_Odontograma(${idPres})"><i class="bi bi-download"></i> Descargar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md">
        <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                <div class="card-body">
                <h5 class="text-center text-dark mb-1"><i class="bi bi-file-earmark-pdf"></i> PDF</h5>
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_factura(${idPres}, '${tipoPDF}')"><i class="bi bi-eye"></i> Ver</button>
                        <button type="button" class="btn btn-info flex-fill ml-1" onclick="descargar_factura(${idPres}, '${tipoPDF}')"><i class="bi bi-download"></i> Descargar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md">
        <div class="card" style="background: linear-gradient(to top right, #6a00ce22 50%, transparent 50%);">
                <div class="card-body">
                <h5 class="text-center text-dark mb-1"><i class="bi bi-file-earmark-pdf"></i> XML</h5>
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-primary flex-fill mr-1" onclick="ver_factura(${idPres}, '${tipoXML}')"><i class="bi bi-eye"></i> Ver</button>
                        <button type="button" class="btn btn-info flex-fill ml-1" onclick="descargar_factura(${idPres}, '${tipoXML}')"><i class="bi bi-download"></i> Descargar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    $("#msj_desc_doc_descarga").html(msj_desc_doc);
    // $("#msj_ver_doc_descarga").html(msj_ver_doc);
    if (color_id != 8) {
        var encabezado = `Documentos cargados el ${fech_formateada} para su revisión de <span id="nombreEmpleado" class="text-info"></span> 
            <span id="avatar3" class="ms-3"></span>`;
        $("#encabezado_doc_descarga").html(encabezado);
        let botonValidarSAT = `<button class="btn btn-danger mt-3 ms-4" onclick="aprobarDocDentales()">Aprobar documentos</button>`;
        $("#botonValidarSAT").html(botonValidarSAT);
    } else {
        var encabezado = ` Prestación <strong>Lentes</strong> terminada, documentos cargados el ${fech_formateada} de <span id="nombreEmpleado" class="text-info"></span> 
            <span id="avatar3" class="ms-3"></span>`;
        $("#encabezado_doc_descarga").html(encabezado);
        var botonValidarSAT = `<button disabled class="btn btn-danger mt-3">Aprobación terminada</button>`;
        $("#botonValidarSAT").html(botonValidarSAT);
    }
    $("#nombreEmpleado").html(nom_empreado_prestacion);
    setTimeout(function () {
        // Limpiar el contenido actual del ul
        $("#inputGroupSelect").empty();
        // Iterar sobre el rango de números de 1 a conFacturas
        for (let i = 1; i <= appData.nombre_XML_paraLeer; i++) {
            // Crear un elemento <li> con un enlace <a> dentro con el texto "Factura ${i}"
            let listItem = `<option value="${i}">Factura ${i}</option>`;
            // Agregar el <li> al <ul>
            $("#inputGroupSelect").append(listItem);
        }
        $("#desc_pdf_dental").prop("disabled", false);
        $("#desc_xml_dental").prop("disabled", false);
    }, 1000);
}
// 2°_ Sección de "botones" y "inputs" para aprobar y rechazar documentos
function aprobarDocDentales() {
    // console.log(DocAprobadosDentales);
    let nombreCalculo = arrayValores[0];
    if (nombreCalculo != null || nombreCalculo != undefined) {
        var contenido_del_calculo = `
        <div class="progress col-md mt-3" role="progressbar"
                aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0"
                aria-valuemax="100" id="brra_progreso" style="height: 13px; ">
                <div class="text-bold progress-bar progress-bar-striped" id="brra_progreso_dental"
                    style="width: ${contadorPorsentaje}%; font-size: 13px; ">${contadorPorsentaje}%</div>
            </div>
            <br>
            <div class="d-flex flex-column align-items-center" >
                <h4 class="text-danger mb-3" id="nombreCalculo">${nombreCalculo}</h4>
                <div class="input-group " id="group-modal-cantidad">
                </div>
            </div>
            <form id="form_calculo" method="POST" enctype="multipart/form-data" class="mb-3 mt-2">
                <div class="row mt-4">
                    <div class="form-group col-md-6">
                        <button type="button" id="btn_aprobarDocumento" onclick="aprobarDocumento('${nombreCalculo}')" class="btn btn-success btn-block me-3">Aprobar ${nombreCalculo} <i class="bi bi-arrow-right"> </i></button>
                    </div>
                    <div class="form-group col-md-3">
                        <button type="button" id="btn_NoAprobarDocumento" class="btn btn-danger  btn-block me-3" onclick="Modal_NoAprobarDocumento('${nombreCalculo}')">Rechazar ${nombreCalculo}</button>
                    </div>
                    <div class="form-group col-md-2">
                        <button type="button" onclick="calculadora_mostrar()" class="btn btn-dark btn-block me-3"><i class="bi bi-calculator"> Calculadora</i></button>
                    </div>
                </div>
            </form>
            <div id="contenedor_calculadora">
        </div>
        `;
        $("#contenido_del_calculo").html(contenido_del_calculo);
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
        if (nombreCalculo.startsWith("Factura")) {
            $("#btn_aprobarDocumento").prop("disabled", true);
            $("#btn_NoAprobarDocumento").prop("disabled", true);
            //Analizamos si se a rechazado algun documento, si si se ha rechazado un docuemnto entonces ya no pedimos el total de cada factura ProtesisRemovible
            $("#group-modal-cantidad").html(`
            <div class="row">
                <div class="col-md">
                    <span class="input-group-text" id="addon-wrapping">Corona</span>
                    <input type="number" class="form-control" id="modal-corona" name="modal-corona" placeholder="-----" />
                </div>
                <div class="col-md">
                    <span class="input-group-text" id="addon-wrapping">Unid. prót. fija metal porcelan</span>
                    <input type="number" class="form-control" id="modal-ProtesisFija" name="modal-ClaveProtesisFija" placeholder="-----" />
                </div>
                <div class="col-md">
                    <span class="input-group-text" id="addon-wrapping">Incrustación</span>
                    <input type="number" class="form-control" id="modal-incrustacion" name="modal-incrustacion" placeholder="-----" />
                </div>
                <div class="col-md">
                    <span class="input-group-text" id="addon-wrapping">Unid. prót. removible</span>
                    <input type="number" class="form-control" id="modal-ProtesisRemovible" name="modal-ProtesisRemovible" placeholder="-----" />
                </div>
                <div class="col-md">
                    <span class="input-group-text" id="addon-wrapping">Endoposte</span>
                    <input type="number" class="form-control" id="modal-endoposte" name="modal-endoposte" placeholder="-----" />
                </div>
                <div class="col-md">
                    <span class="input-group-text" id="addon-wrapping">Placa total sup. o inf.</span>
                    <input type="number" class="form-control" id="modal-placa" name="modal-placa" placeholder="-----" />
                </div>
            </div>
            `);

            // Utilizamos una expresión regular para buscar el patrón "Factura" seguido de uno o más dígitos
            let numeroFactura = nombreCalculo.match(/Factura (\d+)/);
            // Si se encuentra el patrón "Factura" seguido de uno o más dígitos
            if (numeroFactura) {
                // El número de la factura estará en la posición 1 del array devuelto por match()
                let numero = numeroFactura[1];
                // console.log("El número de la factura es: " + numero);
                // Llamar a la función para obtener el valor de infXML
                obtenerInfXML(idPrestacion, numero);
            } else {
                console.log("No se encontró un número de factura válido.");
            }
        } else {
        }
    } else {
        var contenido_del_calculo = `
        <div class="progress col-md mt-3" role="progressbar"
            aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0"
            aria-valuemax="100" id="brra_progreso" style="height: 13px; ">
            <div class="text-bold progress-bar progress-bar-striped" id="brra_progreso_dental"
                style="width: 100%; font-size: 13px; ">100%</div>
        </div>
        <br>
        <div class="d-flex flex-column align-items-center" >
            <h4 class="text-danger mb-3" id="">Documentos aprobados</h4>
        </div>
        <div class="col-md-12" id="msj_dePrestacionDental" style="overflow-y: auto; max-height: 500px;"></div>
        
        <form id="form_calculo" method="POST" enctype="multipart/form-data" class="mb-3 mt-2">
            <div class="row mt-4">
                <div class="form-group col-md-6">
                    <button type="button" id="btn_aprobar_solicitud" onclick="Modal_TerminarAprobacion()" class="btn btn-success btn-block me-3">Terminar aprobación</button>
                </div>
                <div class="form-group col-md-3">
                    <button type="button" class="btn btn-danger  btn-block me-3" onclick="VolverAprobar()">Volver a aprobar</button>
                </div>
                <div class="form-group col-md-2">
                    <button type="button" onclick="calculadora_mostrar()" class="btn btn-dark btn-block me-3"><i class="bi bi-calculator"> Calculadora</i></button>
                </div>
            </div>
        </form>
        <div id="contenedor_calculadora">
        </div>
        `;
        $("#contenido_del_calculo").html(contenido_del_calculo);
        $("#info_xml").empty();
        $('#msj_dePrestacionDental').html(`
            <p class="text-success d-flex flex-column align-items-center"> 
                Documentación completa, la prestación se puede aprobar.
            </p>
            <p class="text-muted  text-center">Topado</p>
            <div id="Topado_Dental">
            </div>
            <hr>
            <div id="Totales_enviar">

            </div>
            <br>
            <div class="row" id="cont_card">
            
            </div>
        `);
        // ..................... ⬇️ Mustra Total a pagar topado .................
        let SumaTotales = {};
        // Iterar sobre ObjectCantidadesPagar para sumar los valores
        for (let key in ObjectCantidadesPagar) {
            let total = 0;
            for (let factura in ObjectCantidadesPagar[key]) {
                total += ObjectCantidadesPagar[key][factura];
            }
            // Remover 'modal-' del nombre de la clave
            let nombreFila = key.replace('modal-', '');
            SumaTotales[nombreFila] = total;
        }
        let Totales = `
        <div class="row">
        `;
        // Iterar sobre SumaTotales para agregar las filas al HTML
        for (let Nomtotales in SumaTotales) {
            let cantidad = SumaTotales[Nomtotales];
            let variAppData = appData[Nomtotales];
            // console.log(variAppData);
            if (cantidad >= variAppData) {
                cantidad = variAppData;
            }
            Totales += `<div class="col-md"><strong>${Nomtotales}:</strong> $${cantidad}</div>`;
            if (cantidad != 0) {
                let totalObjeto = {
                    nombre: Nomtotales,
                    cantidad: cantidad
                };
                TotalesaPagar.push(totalObjeto);
            }
        }
        Totales += `
        </div>
        `;
        $("#Totales_enviar").html(Totales);
        // ..................... ⬇️ Muestra Topado no total .....................
        let TopadoDental = `
        <div class="row">
        `;
        // Iterar sobre SumaTotales para agregar las filas al HTML
        for (let Nomtotales in SumaTotales) {
            let variAppData = appData[Nomtotales];
            TopadoDental += `<div class="col-md text-muted" style="font-size: 12px;"><strong>${Nomtotales}:</strong> $${variAppData}</div>`;
        }

        TopadoDental += `
            <div class="input-group col-md" id="group-modal-total">
                <span class="input-group-text"><i class="bi bi-currency-dollar"> Quincena</i></span>
                <select class="selectpicker form-control col-md-4" id="quincenas_list">
                                
                </select>
            </div>
        </div>
        `;
        $("#Topado_Dental").html(TopadoDental);
        // ..................... ⬇️ Mustra tabla ................................
        // Qui se crea la tabla donde se muestran los totales de cada factura cuando ya a finalizado la aprobación 
        let facturas = new Set();
        let filas = Object.keys(ObjectCantidadesPagar);

        // Recoger todas las facturas de ObjectCantidadesPagar
        Object.values(ObjectCantidadesPagar).forEach(item => {
            Object.keys(item).forEach(factura => {
                facturas.add(factura);
            });
        });
        facturas = Array.from(facturas); // Convertir el Set en un array
        let table = `
        <table class="table">
            <thead>
                <tr>
                    <th></th>
        `;
        // Agregar los encabezados de las facturas
        facturas.forEach(factura => {
            table += `<th>${factura}</th>`;
        });

        table += `
            </tr>
        </thead>
        <tbody>
        `;
        // Agregar las filas con los valores correspondientes
        filas.forEach(fila => {
            table += `<tr><td>${fila.replace('modal-', '').replace(/-/g, ' ')}</td>`;
            facturas.forEach(factura => {
                let valor = ObjectCantidadesPagar[fila][factura] || 0;
                table += `<td>$${valor}</td>`;
            });
            table += `</tr>`;
        });
        table += `
        </tbody>
            </table>
        `;
        // Agregar la tabla al contenedor con id "cont_card"
        $("#cont_card").html(table);
        generarQuincenas();
    }
}
// 3°_ Acción para aprobar un documento uno a uno 
async function aprobarDocumento(nom) {
    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    if (nom.startsWith("Factura")) {
        $("#btn_aprobarDocumento").prop("disabled", true);
        $("#btn_NoAprobarDocumento").prop("disabled", true);

        // Mostrar un cuadro de confirmación antes de agregar el objeto al array
        if (confirm(`¿Estás seguro en aprobar "${nom}"?`)) {
            // En este apartado se alamacenan las cantidades de los campos por cada factura para hacer los calculoss
            var primerElemento = arrayValores[0];
            let idInputs = await verificaInputCalculo();
            idInputs.forEach(idInput => {
                const cant = parseFloat($("#" + idInput).val());
                ObjectCantidadesPagar[idInput][primerElemento] = cant;
            });
            // console.log(ObjectCantidadesPagar);
            // Crear un objeto que contenga tanto "nom" 
            let documento = {
                nombre: nom
            };
            // Agregar el objeto al array DocAprobadosDentales
            DocAprobadosDentales.push(documento);
        } else {
            $("#btn_aprobarDocumento").prop("disabled", false);
            $("#btn_NoAprobarDocumento").prop("disabled", false);
            // Si el usuario cancela, hacer un return para salir de la función
            return;
        }
    } else {
        // Mostrar un cuadro de confirmación antes de agregar el objeto al array
        if (confirm(`¿Estás seguro en aprobar "${nom}"?`)) {
            $("#btn_aprobarDocumento").prop("disabled", true);
            $("#btn_NoAprobarDocumento").prop("disabled", true);
            // Agregar el objeto al array DocAprobadosDentales
            DocAprobadosDentales.push(nom);
            // console.log(porsentajeUnico);
        } else {
            // Si el usuario cancela, hacer un return para salir de la función
            return;
        }
    }
    contadorPorsentaje = Math.floor(porsentajeUnico + contadorPorsentaje);
    // Eliminar la posición 0 del array
    arrayValores.splice(0, 1);
    setTimeout(function () {
        $("#btn_aprobarDocumento").prop("disabled", false);
        $("#btn_NoAprobarDocumento").prop("disabled", false);
        // $("#loading-container").hide();
        aprobarDocDentales();
    }, 1000);
}
// esta funciona busca q imput tiene valores para empezar a sumar las cantidades de esta array: "ObjectCantidadesPagar" 
async function verificaInputCalculo() {
    // Obtener las claves del objeto ObjectCantidadesPagar
    let keys = Object.keys(ObjectCantidadesPagar);
    let inputsConValoresMayoresA0 = [];
    // Iterar sobre cada clave (que representa el ID de cada input)
    keys.forEach(function (id) {
        let valor = parseFloat($("#" + id).val());
        if (!isNaN(valor) && valor > 0) {
            inputsConValoresMayoresA0.push(id/* .replace("modal-", "") */);
            // inputsConValoresMayoresA0 = id;
        }
    });
    // console.log("Inputs con valores mayores a 0:", inputsConValoresMayoresA0);
    return inputsConValoresMayoresA0;
}
// 3.1°_ Acción para No aprobar un documento uno a uno 
function Modal_NoAprobarDocumento(nom) {
    $("#notificacion_de_envioRechazo").modal("show");
    $("#msj_de_envioRechazo").empty();
    $("#encabezado_doc").empty();
    $("#body_de_envioRechazo").empty();
    $("#lugar_btn").empty();
    let encabezado = `Prestación de <span class="text-info">${nom_empreado_prestacion}</span>`;
    $("#encabezado_doc").append(encabezado);
    let btn = `<button onclick="NoAprobarDocumento('${nom}')" type="button" class="btn-primary btn" id="btn_rechazo">
                <i class="bi bi-check2">Aceptar</i>
                </button>`;
    $("#lugar_btn").append(btn);
    // ------------- 
    $("#btn_rechazo").prop("disabled", true);
    // ------------- 
    let body = `
        <h5>${nom}, motivo del rechazo</h5><br>
        <div class="input-group mt-2" id="group-modal-motivo_email_dental">
            <span class="input-group-text"><i class="bi bi-envelope-at"> Mensaje</i></span>
            <textarea id="modal-motivo_email_dental" name="modal-motivo_email_dental" rows="4" cols="50"></textarea>
        </div>
        <br><hr>
        ¿Estás de acuerdo en eviar este mensaje?
        <br><hr>
        <label for="aceptar_rechazo" class="custom-checkbox-label mt-3">
        <input type="checkbox" id="aceptar_rechazo" class="custom-checkbox">
            Estoy de acuerdo
        </label>`;
    $("#body_de_envioRechazo").append(body);
    $("#aceptar_rechazo").on("change", function () {
        // Habilitar o deshabilitar el botón según el estado del checkbox
        $("#btn_rechazo").prop("disabled", !$(this).prop("checked"));
    });
}
// 4°_ Acción para rechazar un documento y q el empleado lo vuelba a subir 
function NoAprobarDocumento(nom) {
    let mensaje = $("#modal-motivo_email_dental").val();
    if ($("#modal-motivo_email_dental").val() == "") {
        manejarValidacionCampo(
            "modal-motivo_email_dental",
            "El campo no puede ir vacío",
            true
        );
        return false;
    }
    $("#notificacion_de_envioRechazo").modal("hide");
    let documento = {
        nombre: nom,
        msj: mensaje
    };
    // $("#loading-container").show();
    contadorPorsentaje = Math.floor(porsentajeUnico + contadorPorsentaje);
    // Eliminar la posición 0 del array
    arrayValores.splice(0, 1);
    setTimeout(function () {
        TotalesaPagar = [];
        let qui = null;
        ajaxTerminoaprabcion(qui, documento)
    }, 1000);

}
// 5°_ Acción para volver a  aprobar todos los documentos 
function VolverAprobar() {
    // Mostrar un cuadro de confirmación antes de agregar el objeto al array
    if (confirm(`¿Estás seguro en aprobar todos los documentos nuevamente?`)) {
        // --- --- --- --- --- --- --- ---
        // Resstablecemos los valores de la barra de progreso asi como el array 
        porsentajeUnico = 0;
        contadorPorsentaje = 0;
        DocAprobadosDentales = [];
        SumaTotales = {};
        TotalesaPagar = [];
        ObjectCantidadesPagar = {
            "modal-corona": {},
            "modal-ProtesisFija": {},
            "modal-incrustacion": {},
            "modal-ProtesisRemovible": {},
            "modal-endoposte": {},
            "modal-placa": {},
        };
        llenarArrayDocDentales();
        setTimeout(function () {
            aprobarDocDentales();
        }, 1000);
        // --- --- --- --- --- --- --- ---
    } else {
        // Si el usuario cancela, hacer un return para salir de la función
        return;
    }
}
// 1.1°_ Funcion que analiza la cantidades de factutas y la mete en un array asi como tambian hace la medicion de la barra de progreso...
function llenarArrayDocDentales() {
    // -------------------
    // Vaciar el array antes de insertar las facturas
    arrayValores.splice(0);
    // Variable que indica la cantidad de facturas a generar  ['Vale', 'Odontograma']
    let cantidadFacturas = appData.nombre_XML_paraLeer;
    let v = 'Vale';
    let c = 'Odontograma';
    arrayValores.push(v);
    arrayValores.push(c);
    // Bucle for para generar las facturas y agregarlas al array
    for (let i = 1; i <= cantidadFacturas; i++) {
        let factura = 'Factura ' + i;
        if (!arrayValores.includes(factura)) {
            arrayValores.push(factura);
        }
    }
    // Verificar el resultado
    // console.log(arrayValores);
    // ------------------- 
    let cont = arrayValores.length;
    porsentajeUnico = Math.floor(100 / cont);
}
function Modal_TerminarAprobacion() {
    // console.log(TotalesaPagar);
    $("#notificacion_de_Dental_Terminar").modal("show");
    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    let encabezado = `Prestación Dental de <span class="text-info">${nom_empreado_prestacion}</span> <p class="text-muted">Documentos aprobados, listos para aprobar y terminar prestación Dental</p>`;
    $("#encabezado_de_Dental_Terminar").html(encabezado);
    // ------------- 
    let quincenaDental = $("#quincenas_list").val();
    // console.log(quincenaDental);
    let contenidoLista = '';
    TotalesaPagar.forEach(function (item) {
        contenidoLista += `<li><strong>${item.nombre}:</strong> $${item.cantidad}</li>`;
    });
    let listaHTML = `<ul>
        <li><strong>Quincena:</strong> ${quincenaDental}</li>
        ${contenidoLista}
    </ul>`;
    $("#body_de_Dental_Terminar").html(listaHTML);
    // ------------- 
    let rechazo = null;
    let btn = `<button onclick="ajaxTerminoaprabcion(${quincenaDental}, ${rechazo})"  type="button" class="btn-primary btn" id="btn_rechazo_dental">
        <i class="bi bi-check2">Aceptar y terminar prestación</i>
        </button>`;
    $("#lugar_btn_de_Dental_Terminar").html(btn);

    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

}
function ajaxTerminoaprabcion(qui, rechazo) {
    // alerta("success", "prestación terminada");
    $.ajax({
        url: Aprobacion_dentalRoute,
        dataType: "json",
        method: "POST",
        data: {
            datos: TotalesaPagar,
            idPres: idPrestacion,
            qui: qui,
            rechazo: rechazo
        },
        success: function (response) {
            if (response.status == 700) {
                setTimeout(function () {
                    cerrarSesion();
                }, 1000);
                reject("Sesión cerrada");
            } else if (response.status == 200) {
                $("#loading-container").hide();
                $("#body_de_Dental_Terminar").html(`
                <h1 class="text-success">${response.msj}</h1>
                `);
                $("#lugar_btn_de_Dental_Terminar").html('');
                // ------ 
                $("#animacion_cargando").addClass("loading-animation");
                var fecha_rango = $("#fechaInput").val();
                appData.fecha_rango = fecha_rango;
                $("#prestacionesTable").DataTable().destroy();
                setTimeout(function () {
                    $("#animacion_cargando").removeClass("loading-animation");
                    cargarTodasLasprestaciones(appData.tipo_prestacion);
                }, 1000);
                ocultarCarta();
            } else if (response.status == 500) {
                alerta("info", response.msj);
                reject("Error interno en el servidor");
            }
        },
        error: function () {

        },
        complete: function () {
            $("#loading-container").hide();
        },
    });
}
// Llamar a la función y manejar el resultado usando async/await o then/catch
async function obtenerInfXML(idPrestacion, numero) {
    try {
        let infXML = await leerXmlDental(idPrestacion, numero);
        // console.log(infXML);
        mostrar_info_XMLDental(infXML);
    } catch (error) {
        console.error(error);
    }
}
// funcion que busca en el Controlador el XML y lo lee y me trae la información  
function leerXmlDental(idPrestacion, numero) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: LeerXmlDentalRoute,
            dataType: "json",
            method: "POST",
            data: {
                idPrestacion: idPrestacion,
                numero: numero
            },
            success: function (response) {
                if (response.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                    reject("Sesión cerrada");
                } else if (response.status == 200) {
                    resolve(response); // Resolvemos la promesa con el objeto response
                } else if (response.status == 500) {
                    alerta("info", response.msj);
                    reject("Error interno en el servidor");
                }
            },
            error: function () {
                setTimeout(() => {
                    makeRequest(idPrestacion, numero);
                }, 1000);
            },
        });
    });
}
// funcion q muestra los datos del XML
function mostrar_info_XMLDental(response) {
    // $("#loading-container").show(); // LA ANIMACION SE CIERRA AL MOSTRAR LOS CALCULOS "creacionForm_calculos_lentes"
    // $("#contenido_del_calculo").empty();
    // $("#reloat_SOPA").prop("disabled", true);
    // console.log(response);
    // #info_xml = id del body de la modal donde se van a mostrar los datos de la factura
    $("#info_xml").empty();
    var info_xml = response.informacionFactura;
    var info_xml_impuesto = response.informacionImpuestosAll;
    var info_emisor = response.informacionEmisor;
    var info_receptor = response.informacionReceptor;
    var informacionConceptos = response.informacionConceptos;
    var iinformacionTFD = response.informacionTFD;
    var cont = 1;
    // Buscar el elemento con el id "info_xml"
    var fileList = $("#info_xml");
    // Crear un contenedor para la información
    var preview = $("<div class='row'></div>");
    var re = info_emisor.rfc;
    var rr = info_receptor.rfc;
    var tt = info_xml.total;
    var id = iinformacionTFD.uuid;
    UUID_XML = iinformacionTFD.uuid;
    // console.log(iinformacionTFD.uuid);
    // console.log(re, rr, tt, id);
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------
    // Obtener la fecha de la factura
    var fecha_factura = new Date(info_xml.fecha);
    // console.log(fecha_factura);
    // Obtener el año de la fecha de la factura
    var año_factura = fecha_factura.getFullYear();
    // Comparar los años
    // Agregar la información de factura al contenedor
    preview.append(`<div class='col-md-4 ms-2'><p><strong>Estatus: </strong><span id="estado_xml" class="loading-animation"></span></p></div>
                    <div class='col-md-7 ms-2'><p><strong>Descripción: </strong><span id="codigoEstatus_xml" class="loading-animation"></span></p></div>
                    <br>
                    <div class='col-md-3 ms-2'><p><strong><i class="bi bi-cash me-1 h6"></i>Subtotal: </strong>$${formatNumber(
        info_xml.subtotal
    )}</p></div>
                    <div class='col-md-3 ms-2'><p><strong><i class="bi bi-graph-up me-1 h6"></i>IVA: </strong>$${formatNumber(
        info_xml_impuesto.TotalImpuestosTrasladados
    )}</p></div>
                    <div class='col-md-3 ms-2'><p><strong><i class="bi bi-cash-stack me-1 h6"></i>Total: </strong>$${formatNumber(
        info_xml.total
    )}</p></div>
            <br>
            <div id="letra" class='col-md-6'><p><strong><i class="bi bi-calendar-event me-1 h6"></i>Fecha: </strong>${info_xml.fecha
        }</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-person me-1 h6"></i>Nombre emisor: </strong>${info_emisor.nombre
        }</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-bookmark me-1 h6"></i>RFC emisor: </strong>${info_emisor.rfc
        }</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-person-circle me-1 h6"></i>Nombre receptor: </strong>${info_receptor.nombre
        }</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-bookmark-check me-1 h6"></i>RFC receptor: </strong>${info_receptor.rfc
        }</p></div>
                    <div id="letra" class='col-md-6'><p><strong><i class="bi bi-map me-1 h6"></i>Codigo postal del receptor: </strong>${info_receptor.DomicilioFiscalReceptor
        }</p></div>
                    `);

    // Crear un array para almacenar todas las promesas
    var promesas = [];
    // Agregar la información de los conceptos al contenedor
    for (var i = 0; i < informacionConceptos.length; i++) {
        var concepto = informacionConceptos[i];
        var tipo = 'Dental';

        // Utilizar una función que devuelve una promesa
        var promise = (async function () {
            try {
                // Esperar la resolución de la promesa
                var response = await validacionClaveProductoSAT(concepto.ClaveProdServ, tipo);
                // console.log(response);
                // Si la promesa se resolvió y el status es 200, la clave fue encontrada
                if (response.status == 200) {
                    var prestacion = response.Prestacion;
                    // Extrae la descripción del primer elemento y almacénala en una variable
                    var descripcion = prestacion[0].descripcion;
                    var desc = `<strong class="text-primary">${descripcion}</strong>`;
                    return desc;
                } else if (response.status == 300) {
                    var desc = `<strong class="text-danger">¡ERROR! Clave no Encontrada</strong>`;
                    return desc;
                } else if (response.status == 400) {
                    var prestacion = response.Prestacion;
                    // Extrae la descripción del primer elemento y almacénala en una variable
                    var descripcion = prestacion[0].descripcion;
                    var desc = `<strong class="text-danger">${descripcion}</strong>`;
                    return desc;
                }
            } catch (error) {
                // console.log("Error al obtener ClaveSAT");
                var desc = `<strong class="text-danger">¡ERROR! al obtener ClaveSAT - BD</strong>`;
                return desc;
            }
        })();
        // Agregar la promesa al array
        promesas.push(promise);
    }
    // Utilizar Promise.all() para esperar a que se completen todas las promesas
    Promise.all(promesas).then((resultados) => {
        // Ahora resultados es un array que contiene los resultados de todas las promesas
        // Continuar con el resto del código
        for (var i = 0; i < informacionConceptos.length; i++) {
            var concepto = informacionConceptos[i];
            // var ivaConsepto = informacionConceptos.impuestos
            preview.append(`
                <div id="" class='col-md-10'><hr><p><strong>Concepto ${cont++}</strong></p></div>
                <div id="letra" class='col-md-6'><p><strong><i class="bi bi-box-seam me-1 h6"></i>Descripción de producto: </strong>${concepto.descripcion}</p></div>
                <div id="letra" class='col-md-6'><p><strong><i class="bi bi-cash me-1 h6"></i>Valor unitario: </strong>$${formatNumber(concepto.valorUnitario)}</p></div>
                <div id="letra" class='col-md-6'><p><strong><i class="bi bi-grid me-1 h6"></i>Cantidad: </strong>${concepto.cantidad}</p></div>
                <div id="letra" class='col-md-6'><p><strong><i class="bi bi-cash-stack me-1 h6"></i>Importe: </strong>$${formatNumber(concepto.importe)}</p></div>
                <div id="letra" class='col-md-6'><p><strong><i class="bi bi-key me-1 h6"></i>Clave.SAT: </strong>${concepto.ClaveProdServ}</p></div>
                <div id="letra" class='col-md-6'><p><strong><i class="bi bi-sunglasses"> Concepto de Clave.SAT: </i></strong>${resultados[i]}</p></div>
            `);
        }
    });
    setTimeout(function () {
        realizarConsultaSOAP_Dental(re, rr, tt, id, informacionConceptos);
    }, 1000);
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------

    // Agregar el contenedor al elemento con el id "info_xml"
    fileList.append(preview);
    // Función para formatear números a dos decimales
}
// Soliciud a SAT validación de xml Dental
function realizarConsultaSOAP_Dental(re, rr, tt, id, infoConceptosDental) {
    $("#estado_xml").addClass("loading-animation");
    $("#codigoEstatus_xml").addClass("loading-animation");
    creacion_de_calculos_DENTAL(infoConceptosDental); //funcion para hacer el calculo
    // console.log(datos_soap);
    $.ajax({
        url: realizarConsultaSOAPRoute,
        type: "POST",
        dataType: "json",
        data: {
            re: re,
            rr: rr,
            tt: tt,
            id: id,
        },
        timeout: 40000, // 60000 milisegundos = 1 minuto //  40000 milisegundos = 40 segundos
        success: function (response) {
            $("#estado_xml").empty();
            $("#codigoEstatus_xml").empty();
            // console.log(response.result);
            // Parsear la respuesta XML
            var xmlDoc = $.parseXML(response.result);
            var $xml = $(xmlDoc);
            // Obtener los valores deseados
            var codigoEstatus = $xml.find("a\\:CodigoEstatus").text();
            var estado = $xml.find("a\\:Estado").text();
            switch (estado) {
                case "Cancelado":
                    var iconn =
                        '<i class="bi bi-exclamation-circle ms-1 text-warning h5 gray-background"></i>';
                    break;
                case "Vigente":
                    var iconn =
                        '<i class="bi bi-check-circle ms-1 text-success h5 gray-background"></i>';
                    break;
                case "No Encontrado":
                    var iconn =
                        '<i class="bi bi-exclamation-triangle ms-1 text-danger h5 gray-background"></i>';
                    break;
            }
            $("#estado_xml").append(estado, iconn);
            $("#codigoEstatus_xml").append(codigoEstatus);
        },
        error: function (error) {
            if (error.statusText == "timeout") {

            }
        },
        complete: function () {
            $("#estado_xml").removeClass("loading-animation");
            $("#codigoEstatus_xml").removeClass("loading-animation");
            $("#btn_aprobarDocumento").prop("disabled", false);
            $("#btn_NoAprobarDocumento").prop("disabled", false);
        },
    });
}
function creacion_de_calculos_DENTAL(infoConceptosDental) {
    if (infoConceptosDental != null || Array.isArray(infoConceptosDental)) {
        // console.log(infoConceptosDental)
        // Verificar que la estructura del objeto sea válida
        /*
            appData.CORONA = CORONA;
            appData.UNIDADMETALPORCELANA = UNIDADMETALPORCELANA;
            appData.INCUSTRACION = INCUSTRACION;
            appData.UNIDADREMO = UNIDADREMO;
            appData.ENDOPOSTE = ENDOPOSTE;
            appData.PPLACASUPEINFE = PPLACASUPEINFE;
        */
        // Inicializar las variables para la suma de importes
        let Corona = 0; //1
        let ClaveProtesisFija = 0; //2
        let Incristacion = 0; //3
        let ProtesisRemo = 0; //4
        let Endoposte = 0; //5
        let PlacaTotalSupInf = 0; //6
        // Iterar sobre los conceptos
        for (const concepto of infoConceptosDental) {
            // Convertir tanto la descripción como las palabras clave a minúsculas
            const descripcion = concepto.descripcion.toLowerCase();

            const palabrasClaveCorona = ["cor", "corona", "coronas"].map(palabra => palabra.toLowerCase());
            const palabrasClaveProtesisFija = [].map(palabra => palabra.toLowerCase());
            const palabrasClaveIncristacion = [].map(palabra => palabra.toLowerCase());
            const palabrasClaveProtesisRemo = [].map(palabra => palabra.toLowerCase());
            const palabrasClaveEndoposte = ["endoposte", "endo"].map(palabra => palabra.toLowerCase());
            const palabrasClavePlacaTotalSupInf = [].map(palabra => palabra.toLowerCase());
            // ------------------- 1
            if (palabrasClaveCorona.some(palabra => descripcion.includes(palabra))) {
                Corona += concepto.importe;
                $("#modal-corona").val(Corona.toFixed(2));
            }
            // ------------------- 2
            if (palabrasClaveProtesisFija.some(palabra => descripcion.includes(palabra))) {
                ClaveProtesisFija += concepto.importe;
                $("#modal-ProtesisFija").val(ClaveProtesisFija.toFixed(2));
            }

            // ------------------- 3
            if (palabrasClaveIncristacion.some(palabra => descripcion.includes(palabra))) {
                Incristacion += concepto.importe;
                $("#modal-incrustacion").val(Incristacion.toFixed(2));
            }
            // ------------------- 4
            if (palabrasClaveProtesisRemo.some(palabra => descripcion.includes(palabra))) {
                ProtesisRemo += concepto.importe;
                $("#modal-ProtesisRemovible").val(ProtesisRemo.toFixed(2));
            }
            // ------------------- 5
            if (palabrasClaveEndoposte.some(palabra => descripcion.includes(palabra))) {
                Endoposte += concepto.importe;
                $("#modal-endoposte").val(Endoposte.toFixed(2));
            }
            // ------------------- 6
            if (palabrasClavePlacaTotalSupInf.some(palabra => descripcion.includes(palabra))) {
                PlacaTotalSupInf += concepto.importe;
                $("#modal-placa").val(PlacaTotalSupInf.toFixed(2));
            }
        }

    } else {
        // Inicializar las variables para la suma de importes

    }
}
// ---------------------------
// --- CRUD - COLORES --------
// ---------------------------
var uploadInProgress = false;
var uploadedFiles = [];
let contador_de_errores = 0;
function initializeDropArea(dropAreaId, fileInputId, fileListId, tipo_doc) {
    var dropArea = $("#" + dropAreaId);
    var maxAllowedFiles = 1;
    var allowedExtensions = tipo_doc;
    dropArea
        .on(
            "drag dragstart dragend dragover dragenter dragleave drop",
            function (e) {
                e.preventDefault();
                e.stopPropagation();
            }
        )
        .on("dragover dragenter", function () {
            dropArea.addClass("is-dragover");
        })
        .on("dragleave dragend drop", function () {
            dropArea.removeClass("is-dragover");
        })
        .on("drop", function (e) {
            if (uploadInProgress) {
                return;
            }
            var files = e.originalEvent.dataTransfer.files;
            handleFiles(files);
        });

    var isInputClicked = false;
    dropArea.on("click", function () {
        if (!isInputClicked) {
            isInputClicked = true;
            $("#" + fileInputId).click();
        } else {
            isInputClicked = false;
        }
    });

    $("#" + fileInputId).change(function () {
        if (uploadInProgress) {
            return;
        }
        isInputClicked = false;
        var files = this.files;
        handleFiles(files);
    });
    function handleFiles(files) {
        if (uploadInProgress) {
            return;
        }
        var fileList = $("#" + fileListId);
        if (uploadedFiles.length + files.length > maxAllowedFiles) {
            $("#encabezado_doc_error").empty();
            $("#msj_doc").empty();
            // alerta("info", "Solo se permiten dos archivos.");
            var encabezado = `<span class="text-danger">"¡Ups! Ha ocurrido un error"</span>`;
            var msj_doc = `
            Ocurrió un error: recuerda que solo es permitido subir una carpeta en formato ZIP`;
            $("#encabezado_doc_error").append(encabezado);
            $("#msj_doc").append(msj_doc);
            $("#notificacion_documentos_guardados").modal("show");
            clearFileList();
            return;
        }
        var processedFiles = 0;
        $.each(files, function (index, file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var extension = getFileExtension(file.name).toLowerCase();
                if (allowedExtensions.includes(extension)) {
                    uploadedFiles.push(file);
                    var preview = $(
                        '<div id="card_doc" class="file-preview col-md-5 ms-2 me-2"></div>'
                    );
                    preview.append("<p>" + file.name + "</p>");
                    preview.append(
                        '<i class="bi bi-file-earmark-' +
                        extension +
                        ' h4"></i>'
                    );
                    fileList.append(preview);
                    processedFiles++;

                    if (processedFiles == files.length) {
                        uploadInProgress = false;
                    }
                } else {
                    $("#encabezado_doc_error").empty();
                    $("#msj_doc").empty();
                    var encabezado = `<span class="text-danger">"¡Ups! Ha ocurrido un error"</span>`;
                    var msj_doc = ` Ocurrió un error: el documento que intentas subir no está permitido en esta área. Por favor, 
                    verifica qué documentos son compatibles con esta sección. E-2`;
                    $("#encabezado_doc_error").append(encabezado);
                    $("#msj_doc").append(msj_doc);
                    $("#notificacion_documentos_guardados").modal("show");
                    // alerta("info", "Solo se permiten archivos PDF y XML.");
                    clearFileList();
                    // manejarError();
                    return;
                }
            };
            reader.readAsDataURL(file);
        });
    }
    function getFileExtension(filename) {
        return filename.split(".").pop();
    }
}
// --------------------------------------------------------------
// LIMPIA EL FORM DEL "AREA" DONDE SE CARGAN LOS DOCUEMENTOS 
function clearFileList() {
    $("#file-list").empty(); // Lentes
    $("#file-input").val(''); // Limpiar el valor del input en lugar de vaciar el contenido
    uploadedFiles = [];
    uploadInProgress = false;
}
function crud_estatus_colores(desc, color, id) {
    appData.ID_estatus = id;
    // console.log(desc, color, id);
    $("#notificacion_de_envioRechazo").modal("show");
    $("#encabezado_doc").html("Editar estatus <span class='text-primary'>" + desc + "</span>");
    alerta("success", id + " - Prestación: " + desc)
    // Crear un formulario
    $("#body_de_envioRechazo").empty();
    var formularioHTML = `
        <form id="form_estatus" method="POST" enctype="multipart/form-data"> 
        <input type="hidden" name="_token" value="${csrfToken}">
            <h6 class="">Descripción del Estatus</h6> 
                <div class="input-group mt-1" id="group-modal-desc"> 
                <span class="input-group-text"><i class="bi bi-fonts"></i></span> 
                <input type="text" id="modal-desc" value="${desc}" name="desc" class="form-control"> 
            </div> 
            <h6 class="mt-4"><span class="text-danger">C</span><span class="text-warning">o</span><span class="text-success">l</span><span class="text-info">o</span><span class="text-primary">r</span> del estatus</h6> 
                <div class="input-group mt-1" id="group-modal-color"> 
                <span class="input-group-text"><i class="bi bi-paint-bucket"></i></span> 
                <input type="color" value="${color}"   id="modal-color" name="color" class="form-control"> 
            </div> 
            <div class="form-group mt-5">
                <button type="submit" class="btn btn-primary col-md-3"><i class="bi bi-arrow-clockwise"> Actualizar</i></button>
            </div>
        </form>`;

    // Insertar el formulario en el elemento con id "body_de_envioRechazo"
    $("#body_de_envioRechazo").append(formularioHTML);
    // evita q cuando estamos en la aprobación de PREDIAL en el imput de total la pagina no se recarge 
}