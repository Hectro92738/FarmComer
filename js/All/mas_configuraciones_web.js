var Contenedor_var = null;
$(function () {
    $("#modal-mando-apro").chosen({});
    $("#modal-mando-cumpleaños").chosen({});
    $("#seccion_imagen").show();
    $("#seccion_cumple").hide();
    $("#seccion_aprobacion").hide();

    $(document).on("click", "#imagen", function (e) {
        $("#seccion_imagen").show();
        $("#seccion_cumple").hide();
        $("#seccion_aprobacion").hide();
        // ]--------------} 
        $("#aprobacion").removeClass("active");
        $("#cumple").removeClass("active");
        $("#imagen").addClass("active");
    });
    $(document).on("click", "#aprobacion", function (e) {
        $("#seccion_imagen").hide();
        $("#seccion_cumple").hide();
        $("#seccion_aprobacion").show();
        // ]--------------} 
        $("#aprobacion").addClass("active");
        $("#cumple").removeClass("active");
        $("#imagen").removeClass("active");
    });
    // ------------------ 
    $(document).on("click", "#buscar_cumple", function (e) {
        e.preventDefault();
        borra_mensajes();
        if ($("#modal-mando-cumpleaños").val() == "") {
            error_formulario("modal-mando-cumpleaños", "Selecciona un empleado");
            return false;
        }
        let numEmp = $("#modal-mando-cumpleaños").val();
        // console.log(numEmp);
        var formData = new FormData();
        formData.append("empleado", numEmp);
        $.ajax({
            url: getcumpleRoute,
            method: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (response) {
                if (response.status == 200) {
                    console.log(response);
                    let empleado = response.datos[0];

                    // Acceder a cada propiedad del objeto y obtener su valor
                    let EMP_NUM = empleado.EMP_NUM;
                    let EMP_NAME = empleado.EMP_NAME;
                    let EMP_RFC = empleado.EMP_RFC;
                    let ORGANIZACION = empleado.ORGANIZACION;
                    let JOB_NAME = empleado.JOB_NAME;
                    let EMP_BIRTHDATE = empleado.EMP_BIRTHDATE;
                    let TIPO_CONTRATO = empleado.TIPO_CONTRATO;
                    let ESTATUS = empleado.ESTATUS;
                    let DIRE = empleado.DIRE;
                    let DEPT = empleado.DEPT;
                    let EMP_IMSS = empleado.EMP_IMSS;
                    let MAIL = empleado.EMAIL;

                    // Convertir la cadena de fecha en un objeto Date
                    let fecha = new Date(EMP_BIRTHDATE);

                    // Obtener el año, mes y día
                    let año = fecha.getFullYear();
                    let mes = fecha.toLocaleString('es-ES', { month: 'long' });
                    let dia = fecha.getDate();

                    // Formatear la fecha
                    let fechaFormateada = `${dia} de ${mes} del ${año} `;

                    // console.log(fechaFormateada);
                    // console.log(EMP_NAME);
                    let datosss = `
                    <p><strong>Nombre: </strong>${EMP_NAME}</p>
                    <p><strong>Núm: </strong>${EMP_NUM}</p>
                    
                    <p><strong>RFC: </strong>${EMP_RFC}</p>
                    <p><strong>Organizacón: </strong>${ORGANIZACION}</p>
                    <p><strong>JOB-NAME: </strong>${JOB_NAME}</p>
                    <p><strong>Compleaños: </strong>${fechaFormateada}</p>
                    <p><strong>Contrato: </strong>${TIPO_CONTRATO}</p>

                    <p><strong>Dirección: </strong>${DIRE}</p>
                    <p><strong>Departamento: </strong>${DEPT}</p>
                    <p><strong>IMSS: </strong>${EMP_IMSS}</p>
                    <p><strong>EMAIL: </strong>${MAIL}</p>
                    `;
                    $("#datosss").html(datosss);
                } else if (response.status == 700) {
                    cerrarSesion();
                }
            },
            error: function () {
                error_ajax();
            },
        });
    });
    //----------------------PROMESA------------------------------------------
    get_imagenes()
        .then(function (response) {
            // Filtrar las imágenes con ACTION igual a 1
            const imagenes = response.datos;
            // console.log(imagenes);
            // Iterar sobre las imágenes
            $.each(imagenes, function (index, dato) {
                if (dato.ACTION === "A") {
                    let img = dato.IMG;
                    let cont = dato.CONT;
                    let id = dato.ID_IMAGEN;
                    let titulo = dato.TITULO;
                    let contenido = dato.CONTENIDO;
                    let imgR = imagesRoute + "/" + img; // Ruta dinámica
                    let imgElement = $('<img />', {
                        src: imgR,
                        width: '30%',
                        loading: 'lazy',
                    });
                    $('#imges_action_' + cont).append(imgElement);
                    $("#btn_action_" + cont).html(`
                <button  class="btn btn-primary mt-2"><i class="bi bi-pencil-square" onclick="editar_img(${id})"></i></button>
                <div class="mt-2">
                    <p><strong>Titulo:</strong> ${titulo}</p>
                    <p class="mt-2"><strong>Contenido:</strong> ${contenido}</p>
                </div>
                `);
                }
            });
        })
        .catch(function () {
            // Manejar errores de la promesa
            console.log("Error al obtener las imágenes:");
        });
    //----------------------PROMESA------------------------------------------
    get_imagenes()
        .then(function (response) {
            // Filtrar las imágenes con ACTION igual a 1
            const imagenes = response.datos;
            const Action1 = imagenes.find((dato) => dato.ACTION == "B");
            // console.log(response);
            if (Action1) {
                // La imagen con ACTION igual a 1 existe
                const img = Action1.IMG;
                let id = Action1.ID_IMAGEN;
                let imgElement = document.querySelector("#img_action_2");
                let imgR = imagesRoute + "/" + img; // Ruta dinámica
                imgElement.innerHTML =
                    '<img src="' +
                    imgR +
                    '" width="40%" loading="lazy" alt="" />';
                $("#btn_1_action").html(`
                <button  class="btn btn-primary mt-2"><i class="bi bi-pencil-square" onclick="editar_img(${id})"></i></button>
                `);
            } else {
                // No se encontró ninguna imagen con ACTION igual a 1
                console.log("No se encontró una imagen con ACTION igual a 1");
            }
        })
        .catch(function () {
            // Manejar errores de la promesa
            console.log("Error al obtener las imágenes:");
        });
    //----------------------------------------------------------------------
    //-------------------- CRUD DE APROBACIONES ----------------------------
    //----------------------------------------------------------------------
    cargarEmpleados()
        .then(function (response) {
            //console.log(response.empleados)
            // Aquí llenamos el select con los datos de los empleados
            var select = $("#modal-mando-apro");
            select.empty();
            select.append('<option value=""></option>');
            $.each(response.empleados, function (i, empleado) {
                select.append(
                    '<option value="' +
                    empleado.EMP_NUM +
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
    //----------------------------------------------------------------
    $("#modal-empleado-apro").chosen({
        placeholder_text_multiple: "Escribe aquí para buscar...",
        no_results_text: "No se encontraron resultados para",
    });
    //------------ PROMESA DE DIRE, DEPT Y ORGANIZACION --------------
    get_distinct()
        .then(function (response) {
            // Obtén los arreglos distinctDires, distinctDepts y distinctOrganizaciones
            var distinctDires = response.distinctDires;
            var distinctDepts = response.distinctDepts;
            var distinctOrganizaciones = response.distinctOrganizaciones;

            // Obtén los elementos select
            var selectDIRE = document.getElementById("modal-select-DERE");
            var selectDEPT = document.getElementById("modal-select-DEPT");
            var selectORG = document.getElementById("modal-select-ORG");

            // Función para agregar opciones a un select
            function addOptions(selectElement, options) {
                selectElement.innerHTML =
                    '<option value="No aplica">No aplica</option>';
                options.forEach(function (option) {
                    var optionElement = document.createElement("option");
                    optionElement.value = option;
                    optionElement.textContent = option;
                    selectElement.appendChild(optionElement);
                });
            }

            // Agrega las opciones a los selects
            addOptions(selectDIRE, distinctDires);
            addOptions(selectDEPT, distinctDepts);
            addOptions(selectORG, distinctOrganizaciones);
        })
        .catch(function () {
        });
    //---------------- INSERTAR APROBACIONES -------------------------
    $(document).on("submit", "#form_insert_aprobacion", function (e) {
        e.preventDefault();
        borra_mensajes();
        if ($("#modal-mando-apro").val() == "") {
            error_formulario("modal-mando-apro", "El campo no puede ir vacío");
            return false;
        }
        if ($("#modal-select-DERE").val() == "") {
            error_formulario("modal-select-DERE", "El campo no puede ir vacío");
            return false;
        }
        if ($("#modal-select-DEPT").val() == "") {
            error_formulario("modal-select-DEPT", "El campo no puede ir vacío");
            return false;
        }
        if ($("#modal-select-ORG").val() == "") {
            error_formulario("modal-select-ORG", "El campo no puede ir vacío");
            return false;
        }
        if ($("#modal-select-motivo").val() == "") {
            error_formulario("modal-select-motivo", "El campo no puede ir vacío");
            return false;
        }
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: insertAprovacionesRoute,
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
                error_ajax();
            },
        });
    });
    get_aprobaciones()
        .then(function (response) {
            var aprobaciones = response.aprobaciones;
            var dataTable = $("#aprobacionesTable").DataTable({
                paging: true,
                scrollCollapse: true,
                autoFill: true,
                responsive: true,
                scrollX: true,
                scrollY: "70vh",
                data: aprobaciones,
                columns: [
                    { data: "EMP_NUM" },
                    {
                        data: "aprobacion.EMP_NAME",
                        render: function (data, type, row) {
                            return data;
                        },
                    },
                    { data: "DEPT" },
                    { data: "DIRE" },
                    { data: "ORGANIZACION" },
                    { data: "MOTIVO" },
                    {
                        data: "ID_APROBACION",
                        render: function (data, type, row) {
                            return (
                                '<button class="btn_aprobacion" style="background-color: rgb(147, 3, 3);" data-id="' +
                                data +
                                '"><i class="bi bi-trash"></i></button>'
                            );
                        },
                    },
                ],
                dom: "lBfrtip",
                buttons: [
                    "copy",
                    "csv",
                    "excel",
                    "pdf",
                    "print",
                ],
                // FILTRO-BUSQUEDA DE CADA COLUMNA
                initComplete: function () {
                    var table = this.api();

                    table.columns().every(function (index) {
                        var column = this;

                        // Excluir la primera columna del buscador
                        if (index <= table.columns().indexes().length - 3) {
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
        })
        .catch(function () {
            console.log("error al obtener aprobaciones");
        });
    //----------------- ELIMINAR APROBACIONES -------------------------
    $("#aprobacionesTable").on("click", ".btn_aprobacion", function () {
        var id = $(this).data("id"); // Obtiene el ID del botón
        if (confirm("¿Seguro que quieres eliminar este registro?")) {
            // Realiza una solicitud AJAX para eliminar el registro
            $.ajax({
                url: deliteAprobacionesRote,
                type: "POST",
                data: { id: id },
                success: function (response) {
                    if (response.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                    }
                    if (response.status == 200) {
                        setInterval(actualizar, 1000);
                    }
                    if (response.status == 500) {
                        alerta("info", response.msj);
                    }
                },
                error: function () {
                    error_ajax();
                },
            });
        }
    });
    $('#modal_titulo').on('input', function () {
        validateWordLimit(this, 10);
    });
    $('#modal_cont').on('input', function () {
        validateWordLimit(this, 10);
    });
    $(document).on("submit", "#form_insert_img", function (e) {
        e.preventDefault();
        borra_mensajes();

        // if ($("#modal_img").val() == "") {
        //     error_formulario("modal_img", "El campo no puede ir vacío");
        //     return false;
        // }

        var formData = new FormData($(this)[0]);
        formData.append("id", Contenedor_var); // Asegúrate de pasar una clave y un valor

        $.ajax({
            url: inretIMGRoute,
            method: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (response) {
                if (response.status == 200) {
                    alerta("success", response.msj);
                    setInterval(actualizar, 2000);
                } else if (response.status == 700) {
                    cerrarSesion();
                }
            },
            error: function () {
                // error_ajax();
            },
        });
    });
});
function editar_img(cont) {
    Contenedor_var = null;
    $("#form_editar").modal("show");
    Contenedor_var = cont;
}

function validateWordLimit(input, limit) {
    let words = $(input).val().trim().split(/\s+/);
    if (words.length > limit) {
        $(input).val(words.slice(0, limit).join(" "));
        alert("No puedes ingresar más de " + limit + " palabras.");
    }
}