let UUID_XML = '';
let datos_XML_leido = [];
let año_actual = "";
let previousYear = "";
let solicitud_lentes = "";
let solicitud_predial = "";
let solicitud_dental = "";
let dropAreaInitialized_lentes = false; //⛳
let dropAreaInitialized_predial_PDF = false; //⛳
let dropAreaInitialized_predial2_PDF = false; //⛳
let dropAreaInitialized_dental = false; //⛳
let ConseptosLentesSI_SAT = 1;
let archivoSeleccionado; // Variable global para almacenar el archivo
let archivoPredialEnvio = null;
// ----------------------
let letrasDentalesDocumentosAcorreguir = null;
let letrasDentalesDocumentosAcorreguirV2 = null; // Declaración global
let arrayFacturasDental = []; //array q guarda arras de facturas deltales 🦷 antes de enviar a la bd 
// ---- variables q guardan los ducumentos temporal de vale, odontogrma, factura
let documentos_dental_Vale = null;
let documentos_dental_Odontograma = null;
let documentos_dental_Fac = null;

let letrasPredialDocumentosAcorreguir = null; //
let letrasPredialDocumentosAcorreguirV2 = null; //
$(document).ready(function () {
    // console.log(arrayFacturasDental);
    // Manejar el clic en la imagen
    $('.agrandarIMG').on('click', function () {
        var imageUrl = $(this).attr('src');
        // Crear y mostrar un contenedor para la imagen expandida
        $('body').append('<div id="imagenExpandida"><img src="' + imageUrl + '"></div>');
        $('#imagenExpandida').fadeIn(300);
    });
    // Manejar el clic en el contenedor de la imagen expandida para cerrarlo
    $(document).on('click', '#imagenExpandida', function () {
        $(this).fadeOut(300, function () {
            $(this).remove();
        });
    });
    // getPrestacion_lentes(appData.numEmp);
    // Obtener la fecha actual
    var currentDate = new Date();
    // Obtener el año actual
    año_actual = currentDate.getFullYear();
    // Obtener el año anterior
    previousYear = año_actual - 1;
    // Variable para verificar si initializeDropArea se ha ejecutado
    $("#body_doc_lentes").hide();
    $("#body_doc_dental").hide();
    $("#body_doc_predial").hide();
    // verificaPrestaciones();
    $("#contenedor_pdf_predial").hide();
    // var numemp = appData.numEmp;
    $("#cont_SPE").hide();
    // $("#loading-container").show();
    setTimeout(function () {
        // $("#loading-container").hide();
        antiguedad(appData.numEmp, function (resultado, mensaje) {
            // Aquí recibes el resultado (true o false)
            if (resultado != false) {
                $(document).on("click", "#btn_historial", function (e) {
                    $("#seccion_historial").show();
                    $("#seccion_pasos").hide();
                    $("#seccion_doc_Asubir").hide();
                    // ]--------------} 
                    $("#btn_pasosDental").removeClass("active");
                    $("#btn_historial").addClass("active");
                    $("#btn_doc_Asubir").removeClass("active");
                });
                $(document).on("click", "#btn_pasosDental", function (e) {
                    $("#seccion_historial").hide();
                    $("#seccion_pasos").show();
                    $("#seccion_doc_Asubir").hide();
                    // ]--------------} 
                    $("#btn_pasosDental").addClass("active");
                    $("#btn_historial").removeClass("active");
                    $("#btn_doc_Asubir").removeClass("active");
                });
                $(document).on("click", "#btn_doc_Asubir", function (e) {
                    $("#seccion_historial").hide();
                    $("#seccion_pasos").hide();
                    $("#seccion_doc_Asubir").show();
                    // ]--------------} 
                    $("#btn_doc_Asubir").addClass("active");
                    $("#btn_historial").removeClass("active");
                    $("#btn_pasosDental").removeClass("active");
                });
                // ----------------------------------------------------------------
                $("#cont_SPE").show();
                $("#seccion_historial").show();
                $("#seccion_pasos").hide();
                $("#seccion_doc_Asubir").hide();

                $("#btn_doc_Asubir").hide();
                // ----------------------------------------------------------------
                // -----------------// LENTES //----------------------------------
                // ----------------------------------------------------------------
                $(document).on("click", "#carga_doc_lentes", function (e) {
                    $("#carga_doc_lentes").prop("disabled", true);
                    verificaPrestaciones();
                    setTimeout(function () {
                        $('title').text('Prestacion de Lentes');
                        $("#carga_doc_lentes").prop("disabled", false);
                        appData.Prestacion_actual = 'Lentes';
                        if (solicitud_lentes == 500) {
                            $("#form_doc_lentes").hide();
                            $("#carga_doc_lentes").hide();
                            $("#solicitar_prestacionButton").hide();
                            $("#body_doc_lentes").show();
                            $("#area_btn_solicitar_prestacionButton").empty();
                            var butons = `
                                <button  type="button" class="btn btn-info  mt-5"
                                    data-bs-toggle="modal" data-bs-target="#modal_solicitar_prestacion_lentes"
                                    id="solicitar_prestacionButton">
                                    <i class="bi bi-box-arrow-in-right"> Solicitar Prestación</i>
                                </button>
                                `;
                            $("#area_btn_solicitar_prestacionButton").append(butons);
                            $("#dental").hide();
                            $("#predial").hide();
                            $("#lentes").removeClass("col-md-4").addClass("col-md-10");
                            setTimeout(function () {
                                $("#prestaciones_emp").DataTable().destroy();
                                getPrestacion_lentes(appData.numEmp);
                            }, 1500);
                        } else if (solicitud_lentes == 200) {
                            $("#form_doc_lentes").show();
                            appdata_Add_ids_area("drop-area", "file-input", "file-list");
                            $("#carga_doc_lentes").hide();
                            $("#solicitar_prestacionButton").hide();
                            $("#body_doc_lentes").show();
                            $("#dental").hide();
                            $("#predial").hide();
                            $("#lentes").removeClass("col-md-4").addClass("col-md-10");
                            // Verificar si la función ya ha sido inicializada
                            var allowedExtensions = ["pdf", "xml", "PDF", "XML"];
                            var cantidad = 2;
                            if (!dropAreaInitialized_lentes) {
                                setTimeout(function () {
                                    initializeDropArea(appData.dropAreaId_area, appData.fileInputId_area, appData.fileListId_area, allowedExtensions, cantidad);
                                    dropAreaInitialized_lentes = true; // Marcar como inicializada
                                }, 1000);
                            }
                            setTimeout(function () {
                                $("#prestaciones_emp").DataTable().destroy();
                                getPrestacion_lentes(appData.numEmp);
                            }, 1500);
                        }
                    }, 1100);
                });
                $(document).on("click", "#btn_cansela_lentes", function (e) {
                    clearFileList();
                    $("#lugarTabla").empty();
                    $("#carga_doc_lentes").show();
                    $("#solicitar_prestacionButton").show();
                    $("#body_doc_lentes").hide();
                    $("#dental").show();
                    $("#predial").show();
                    $("#lentes").removeClass("col-md-10").addClass("col-md-4");
                    $('title').text('Prestacion');
                });
                $(document).on("click", "#btn_limpia_lentes", function (e) {
                    clearFileList();
                    // if ($(appData.fileInputId_area).val() == '' || $(appData.fileInputId_area).val() == null) {
                    //     alerta("info", "Aún no has cargado ningún documento ¿?")
                    // }
                });
                // solicitar prestación de lentes in subir documentos 
                $(document).on("click", "#solicitar_prestacion", function (e) { // Guarda el contenido original del botón
                    $("#texto_solicitudRealizada").empty();
                    var contenidoOriginal = $(this).html();
                    // Cambia el contenido del botón a un spinner
                    $(this).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...');

                    $("#canselar_solicitar_prestacion").prop("disabled", true);
                    $("#solicitar_prestacion").prop("disabled", true);
                    $.ajax({
                        url: solicitarPrestacionLentesDentalURL,
                        type: "POST",
                        dataType: "json",
                        data: {
                            numEmp: appData.numEmp,
                            emp: nombreEmpleadoInicioSecion,
                            tipo: 'Lentes',
                        },
                        success: function (response) {
                            console.log(response);
                            if (response.status == 500) {
                                var texto_solicitudRealizada = `<span class="text-danger">Error de Solicitud. usted ya ha realizado una solicitud este año ${año_actual}, recuerda que solo se puede hacer una solicitud por año.</span">`;
                                $("#texto_solicitudRealizada").append(texto_solicitudRealizada);
                            } else
                                if (response.status == 550) {
                                    var texto_solicitudRealizada = `<span class="text-danger">Error de Solicitud: No se puede procesar la prestación del ${año_actual} debido a que el proceso del año ${previousYear} no fue completado. </span>`;
                                    $("#texto_solicitudRealizada").append(texto_solicitudRealizada);

                                } else
                                    if (response.status == 200) {
                                        var texto_solicitudRealizada = `<span class="text-success">Solicitud exitosa. Usted ya ha realizado una solicitud para el año ${año_actual}.
                                    Por favor, espere mientras su solicitud es revisada. Se enviará una notificación a su correo electrónico con los resultados en las próximas 48 horas.
                                    Agradecemos su paciencia y le solicitamos estar atento a cualquier comunicado.<span>`;
                                        $("#texto_solicitudRealizada").append(texto_solicitudRealizada);
                                        $("#prestaciones_emp").DataTable().destroy();
                                        getPrestacion_lentes(appData.numEmp);
                                    }
                        },
                        error: function (error) {

                        },
                        complete: function () {
                            $("#solicitar_prestacion").html(contenidoOriginal);
                            $("#canselar_solicitar_prestacion").prop("disabled", false);
                            $("#solicitar_prestacion").prop("disabled", false);
                        },
                    });
                });
                // Enviar documentos LENTES para leer el XML y validar en el Web service del SAT
                $(document).on("submit", "#form_doc_lentes", function (e) {
                    // $("#loading-container").show();
                    $("#btn_verificar_lentes").prop("disabled", true);
                    $("#animacion_cargando").addClass("loading-animation");
                    $("#info_xml").empty();
                    e.preventDefault();
                    // if (uploadInProgress) {
                    //     alerta("info", "Espere a que se completen las cargas de archivos.");
                    //     return;
                    // }
                    // Crear un objeto FormData
                    var formData = new FormData();
                    // Agregar CSRF token al formData
                    formData.append("_token", $("input[name='_token']").val());

                    uploadedFiles.forEach(function (file) {
                        formData.append("files[]", file);
                    });
                    // Enviar la solicitud al servidor para verificar el documento XML
                    $.ajax({
                        url: uploadRoute,
                        method: "POST",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            // console.log(response);
                            if (response.status == 200) {
                                $("#modal_doc").modal("show");
                                $("#animacion_cargando").removeClass(
                                    "loading-animation"
                                );
                                $("#btn_verificar_lentes").prop("disabled", false);
                                $("#envio_xml_pdf").prop("disabled", true);
                                datos_XML_leido = response;
                                mostrar_info_XML(response);
                            } else if (response.status == 600) {
                                $("#loading-container").hide();
                                $("#animacion_cargando").removeClass(
                                    "loading-animation"
                                );
                                setTimeout(function () {
                                    $("#btn_verificar_lentes").prop(
                                        "disabled",
                                        false
                                    );
                                }, 2000);
                                alerta("info", response.msj);
                            } else if (response.status == 800) {
                                $("#loading-container").hide();
                                $("#animacion_cargando").removeClass(
                                    "loading-animation"
                                );
                                setTimeout(function () {
                                    $("#btn_verificar_lentes").prop(
                                        "disabled",
                                        false
                                    );
                                }, 2000);
                                alerta("info", response.msj);
                            } else if (response.status == 500) {
                                $("#loading-container").hide();
                                $("#animacion_cargando").removeClass(
                                    "loading-animation"
                                );
                                setTimeout(function () {
                                    $("#btn_verificar_lentes").prop(
                                        "disabled",
                                        false
                                    );
                                }, 2000);
                                alerta("info", response.msj);
                            }
                        },
                        error: function () {
                            console.log("Error al verificar documentos.");
                            $("#btn_verificar_lentes").prop("disabled", false);
                            $("#animacion_cargando").removeClass(
                                "loading-animation"
                            );
                        },
                    });
                });
                $(document).on("click", "#reloat_SOPA", function () {
                    // $("#loading-container").show();
                    mostrar_info_XML(datos_XML_leido);
                });
                // ----------------------------------------------------------------
                // -----------------// PREDIAL //----------------------------------
                // ----------------------------------------------------------------
                // Enviar documentos Predial para leer el XML y validar en el Web service del SAT
                $(document).on("submit", "#form_doc_predial", function (e) {
                    $("#loading-container").show();
                    $("#btn_verificar_predial").prop("disabled", true);
                    // $("#info_xml").empty();
                    e.preventDefault();
                    var formData = new FormData();
                    let dato = null;
                    // Agregar CSRF token al formData
                    // console.log(letrasPredialDocumentosAcorreguir);
                    formData.append("_token", $("input[name='_token']").val());
                    if (letrasPredialDocumentosAcorreguir != null) {
                        if (letrasPredialDocumentosAcorreguir.includes("A")) {
                            dato = 0;
                            formData.append("dato", dato);
                        } else if (letrasPredialDocumentosAcorreguir.includes("C")) {
                            dato = 1;
                            formData.append("dato", dato);
                        }
                    } else {
                        // cuando se 0 significa q voy a subir des de 0 la prestación por primera vez 
                        dato = 0;
                        formData.append("dato", dato);
                    }
                    uploadedFiles.forEach(function (file) {
                        formData.append("files[]", file);
                    });
                    // Guarda el primer archivo en la variable global
                    archivoPredialEnvio = uploadedFiles[0];
                    // Enviar la solicitud al servidor para verificar el documento XML
                    // console.log(archivoPredialEnvio);
                    $.ajax({
                        url: upload_PredialRoute,
                        method: "POST",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            // console.log(response);
                            if (response.status == 200) {
                                $("#loading-container").hide();
                                // alerta("success", response.msj);
                                $("#modal_predial").modal("show");
                                $("#encabezado_modal_predial").html(response.msj);
                                $("#btn_verificar_predial").prop(
                                    "disabled",
                                    false
                                );
                                $("#ubicacion_btn_enviarDoc_actualizado_predial").html(`
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="enviar_documentoActualizado_Predial()" >
                                Enviar documentos</button>
                                `);
                                // Verificar si archivoPredialEnvio contiene elementos  
                                if (archivoPredialEnvio) {
                                    // Guardar el primer archivo en la variable global
                                    let documento = archivoPredialEnvio;
                                    let miniaturaHtml = '';
                                    // Verificar si documento y su propiedad type están definidos
                                    if (documento && documento.type) {
                                        if (documento.type.includes('image')) {
                                            // Si es una imagen, mostrar la miniatura de la imagen
                                            let miniaturavale = '<img src="' + URL.createObjectURL(documento) + '" alt="Miniatura del documento" style="max-width: 120px; max-height: 120px;">';
                                            miniaturaHtml = miniaturavale + ' <a href="' + URL.createObjectURL(documento) + '" target="_blank" class="btn_dental_verDOC" title="Haz clic para ver el documento en una nueva ventana"><i class="bi bi-arrows-angle-expand btn-sm"></i></a>';
                                        } else if (documento.type === 'application/pdf') {
                                            let miniaturavale = '<embed src="' + URL.createObjectURL(documento) + '#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="300" height="180">';
                                            miniaturaHtml = miniaturavale + ' <a href="' + URL.createObjectURL(documento) + '" target="_blank" class="btn_dental_verDOC" title="Haz clic para ver el documento en una nueva ventana"><i class="bi bi-arrows-angle-expand btn-sm"></i></a>';
                                        }
                                    } else {
                                        console.error('El documento o su tipo son undefined.');
                                    }
                                    // Mostrar la miniatura en el body_modal_predial
                                    $("#body_modal_predial").html(miniaturaHtml);
                                } else {
                                    console.error('El archivoPredialEnvio no contiene elementos.');
                                }
                            } else if (response.status == 400) {
                                //cuando suba un PDF se ejecuta esto... 
                                $("#loading-container").hide();
                                setTimeout(function () {
                                    $("#btn_verificar_predial").prop(
                                        "disabled",
                                        false
                                    );
                                }, 2000);
                                // alerta("info", response.msj);
                                aprobar_prestacionPDF(response);
                            } else if (response.status == 800) {
                                $("#loading-container").hide();
                                setTimeout(function () {
                                    $("#btn_verificar_predial").prop(
                                        "disabled",
                                        false
                                    );
                                }, 2000);
                                alerta("danger", response.msj);
                            }
                        },
                        error: function () {
                            console.log("Error al verificar documentos.");
                            $("#btn_verificar_predial").prop("disabled", false);

                        },
                    });
                });
                // 😠😠😠😠
                // Envia el comprobante q el empleado sube para velidar q sea el formato, peso y q solo sea un archivo 
                $(document).on("submit", "#form_doc_justificaPredial", function (e) {
                    // alerta("success","holaaa")
                    e.preventDefault();
                    var formData = new FormData();
                    formData.append("_token", $("input[name='_token']").val());

                    // Asegúrate de que uploadedFiles contiene archivos
                    if (uploadedFiles.length > 0) {
                        uploadedFiles.forEach(function (file) {
                            formData.append("files[]", file);
                        });
                        // Guarda el primer archivo en la variable global
                        archivoSeleccionado = uploadedFiles[0];
                        $.ajax({
                            url: comprobantePredialRoute,
                            method: "POST",
                            data: formData,
                            contentType: false,
                            processData: false,
                            success: function (response) {
                                if (response.status == 200) {
                                    alerta("success", response.msj);
                                    var valor_boton = $("#btn_COMPROBANTEPDF_predial").html();
                                    $("#btn_COMPROBANTEPDF_predial").prop("disabled", true); //Desabilita el boton 
                                    $("#cancelar_btn_COMPROBANTEPDF_predial").prop("disabled", true); //Desabilita el boton
                                    $("#regresar_btn_COMPROBANTEPDF_predial").prop("disabled", true); //Desabilita el boton
                                    // // Cambia el contenido del botón a un spinner
                                    $("#btn_COMPROBANTEPDF_predial").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...');

                                    // // $("#preguntaDOC_prredialPDF").hide();
                                    setTimeout(function () {
                                        $("#btn_COMPROBANTEPDF_predial").prop("disabled", false); //abilita el boton 
                                        $("#btn_COMPROBANTEPDF_predial").html(valor_boton);
                                        $("#anio-actual").append(año_actual);
                                        $("#preguntaDOC_prredialPDF").hide();
                                        $("#pregunta2_prredialPDF").show();


                                        $("#cancelar_btn_COMPROBANTEPDF_predial").prop("disabled", false); //Desabilita el boton
                                        $("#regresar_btn_COMPROBANTEPDF_predial").prop("disabled", false); //Desabilita el boton
                                    }, 2000);
                                } else if (response.status == 800) {
                                    alerta("info", response.msj);

                                } else if (response.status == 500) {
                                    alerta("info", response.msj);

                                }

                            },
                            error: function () {

                            },
                        });
                    } else {
                        alerta("danger", "No has subido ningún archivo");
                    }

                });
                // ----------------------------------------------------------------
                // ------------------// DENTAL //----------------------------------
                // ----------------------------------------------------------------

                $(document).on("click", "#btn_cansela_dental", function (e) {
                    clearFileList();
                    $("#lugarTabla").empty();
                    $("#carga_doc_dental").show();
                    $("#solicitar_prestacionButton_dental").show();
                    $("#body_doc_dental").hide();
                    $("#lentes").show();
                    $("#predial").show();
                    $("#dental").removeClass("col-md-10").addClass("col-md-4");
                    let campo_oculto = "R";
                    volverSubirDoc(campo_oculto);
                });
                // Enviar documentos LENTES para leer el XML y validar en el Web service del SAT
                $(document).on("submit", "#form_doc_dental", function (e) {
                    e.preventDefault();
                    let campo_oculto;
                    if (letrasDentalesDocumentosAcorreguir != null && letrasDentalesDocumentosAcorreguir.length > 0) {
                        let contieneC1_o_cualquier_otra_C = letrasDentalesDocumentosAcorreguir.some(letra => letra.startsWith("C"));
                        if (contieneC1_o_cualquier_otra_C) {
                            campo_oculto = letrasDentalesDocumentosAcorreguir[0];
                        } else {
                            campo_oculto = $("#campo_oculto").val();
                        }
                    } else {
                        campo_oculto = $("#campo_oculto").val();
                    }
                    console.log(campo_oculto);
                    $("#loading-container").show();
                    $("#btn_verificar_dental").prop("disabled", true);
                    $("#animacion_cargando").addClass("loading-animation");
                    verificamos_inputs();
                    var formData = new FormData();
                    // Agregar CSRF token al formData
                    formData.append("_token", $("input[name='_token']").val());
                    formData.append("letra", campo_oculto);

                    uploadedFiles.forEach(function (file) {
                        formData.append("files[]", file);
                    });
                    // Enviar la solicitud al servidor para verificar el documento XML alert
                    $.ajax({
                        url: upload_DentalRoute,
                        method: "POST",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            // console.log(response);
                            if (response.status == 200) {
                                var docDental_Temporal = formData.getAll('files[]');
                                $("#btn_verificar_dental").prop("disabled", false);
                                if (response.alert) {
                                    $("#notificacion_deDocumentosCargados_Dental").modal("show");
                                    mostrar_info_XML_dental(response, docDental_Temporal, campo_oculto);
                                } else {
                                    verificaDocumentoCargado(campo_oculto, docDental_Temporal);
                                }
                            } else if (response.status == 300 || response.status == 500) {
                                $("#loading-container").hide();
                                $("#animacion_cargando").removeClass(
                                    "loading-animation"
                                );
                                setTimeout(function () {
                                    $("#btn_verificar_dental").prop(
                                        "disabled",
                                        false
                                    );
                                }, 2000);
                                alerta("danger", response.msj);
                            }
                        },
                        error: function (xhr, status, error) {
                            $("#btn_verificar_dental").prop("disabled", false);
                            // Manejar el error
                            $("#loading-container").hide();
                            console.log(xhr.responseText);
                            console.log(status);
                            console.log(error);
                        }

                    });
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
                                '<div class="ms-4 col-md-2 mt-2" style="font-size: 12px;"><label for="color3">' +
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
            } else {
                var msj = $("#msj_tiempo");
                msj.append(mensaje);
            }
        });
    }, 1200);
});// 2000 milisegundos = 2 segundos
// ------------------------------------- 
// ------------------------------------- 
// ------------------------------------- 
// ------------------------------------- 
// Función para separar los datos
const separarDatos = (dato) => {
    // Usar una expresión regular para encontrar letras seguidas opcionalmente de números
    const regex = /[A-Za-z]+(?:\d+)?/g;
    // Encontrar todas las coincidencias en la cadena de datos
    const matches = dato.match(regex);
    // Retornar las coincidencias encontradas
    return matches;
};
function verificaPrestaciones() {
    Verificar_Prestacion(appData.Prestacion_actual)
        .then(function (response) {
            // console.log(response);
            solicitud_lentes = response.lentes;
            solicitud_predial = response.predial;
            solicitud_dental = response.dental;
            let cd = response.dentalInfo;
            // console.log(cd);
            if (cd != null && appData.Prestacion_actual == "Dental") {
                let dato = cd.ESTATUSDENTAL;
                letrasDentalesDocumentosAcorreguir = separarDatos(dato);
                // console.log(letrasDentalesDocumentosAcorreguir);
                letrasDentalesDocumentosAcorreguir.sort((a, b) => {
                    // Si a es "A", debe ir primero sin importar el valor de b
                    if (a === "A") return -1;
                    // Si b es "A", debe ir primero sin importar el valor de a
                    if (b === "A") return 1;
                    // Si a es "B", debe ir después de "A" pero antes de cualquier otra cosa
                    if (a === "B") return -1;
                    // Si b es "B", debe ir después de "A" pero antes de cualquier otra cosa
                    if (b === "B") return 1;
                    // Si a comienza con "C" y b comienza con "C", ordenar alfabéticamente
                    if (a.startsWith("C") && b.startsWith("C")) {
                        // Extraer el número después de "C" en cada elemento y compararlos
                        const numA = parseInt(a.substr(1));
                        const numB = parseInt(b.substr(1));
                        return numA - numB;
                    }
                    // De lo contrario, usar orden alfabético normal
                    return a.localeCompare(b);
                });
                // letrasDentalesDocumentosAcorreguirV2 = letrasDentalesDocumentosAcorreguir;
                // Hacer la variable inmutable
                // Object.freeze(letrasDentalesDocumentosAcorreguirV2);
                letrasDentalesDocumentosAcorreguirV2 = [...letrasDentalesDocumentosAcorreguir];
                // console.log(letrasDentalesDocumentosAcorreguirV2);
            } else {
                letrasDentalesDocumentosAcorreguir = null;
            }
            if (cd != null && appData.Prestacion_actual == "Predial") {
                // console.log(cd);
                let dato = cd.ESTATUSDENTAL;
                letrasPredialDocumentosAcorreguir = separarDatos(dato);
                // console.log(letrasPredialDocumentosAcorreguir);
                letrasPredialDocumentosAcorreguir.sort((a, b) => {
                    // Si a es "A", debe ir primero sin importar el valor de b
                    if (a === "A") return -1;
                    // Si b es "A", debe ir primero sin importar el valor de a
                    if (b === "A") return 1;
                    // Si a es "B", debe ir después de "A" pero antes de cualquier otra cosa
                    if (a === "B") return -1;
                    // Si b es "B", debe ir después de "A" pero antes de cualquier otra cosa
                    if (b === "B") return 1;
                    // Si a comienza con "C" y b comienza con "C", ordenar alfabéticamente
                    if (a.startsWith("C") && b.startsWith("C")) {
                        // Extraer el número después de "C" en cada elemento y compararlos
                        const numA = parseInt(a.substr(1));
                        const numB = parseInt(b.substr(1));
                        return numA - numB;
                    }
                    // De lo contrario, usar orden alfabético normal
                    return a.localeCompare(b);
                });
                letrasPredialDocumentosAcorreguirV2 = [...letrasPredialDocumentosAcorreguir];
                // console.log(letrasPredialDocumentosAcorreguirV2);
            } else {
                letrasPredialDocumentosAcorreguir = null;
            }
        })
        .catch(function () {
            console.log("error mensajes - Verificar_Prestacion");
        });
}
// funcion que hace mostrar la tabla de historial de prestaciones de lentes
function getPrestacion_lentes(numEmp) {
    // console.log(appData.Prestacion_actual);
    function makeRequest() {
        $.ajax({
            url: getprestacionLentesRoute,
            dataType: "json",
            method: "POST",
            data: {
                numEmp: numEmp,
                tipo: appData.Prestacion_actual,
            },
            success: function (response) {
                if (response.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                }
                if (response.status == 200) {
                    // console.log(response);
                    let Prestacion = response.Prestacion;
                    // let fecha = fecha_fancy(Prestacion.FECHA_SOLICITUD);
                    // console.log(dato);
                    let data = Prestacion.map(function (item) {
                        return {
                            ANIO: item.ANIO,
                            FOLIO: item.FOLIO,
                            ID_APRO: item.ID_APRO,
                            ESTATUSDENTAL: item.ESTATUSDENTAL,
                            TOTAL: item.TOTAL,
                            ARMAZON: item.ARMAZON,
                            MICAS: item.MICAS,
                            ACCESORIO: item.ACCESORIO,
                            MOTIVO: item.MOTIVO,
                            FECHA_CIERRE: item.FECHA_CIERRE,
                            FECHA_SOLICITUD: fecha_fancy(item.FECHA_SOLICITUD),
                            TIPO: item.TIPO,
                            CODIGO: item.status ? item.status.CODIGO : "",
                            COLOR: item.status ? item.status.COLOR : "",
                            DESCRIPCION: item.status
                                ? item.status.DESCRIPCION
                                : "",
                        };
                    });
                    var tabla = '';
                    var columns = [
                        {
                            data: null,
                            render: function (data, type, row) {
                                if (data.CODIGO === "ARH" && (appData.Prestacion_actual == 'Dental' || appData.Prestacion_actual == 'Predial') && data.ESTATUSDENTAL !== null) {
                                    return '<button onclick="botones_desc_ver_documentos(' + data.ID_APRO + ', \'' + data.FECHA_SOLICITUD + '\')" class="btn btn-primary" id="btn_emp_a_cargo"><i class="bi bi-filetype-doc"></i></button>';
                                } else if (data.CODIGO === "S" || data.CODIGO === "RRH" || data.CODIGO === "ARH") {
                                    return '<button disabled class="btn btn-primary" id="btn_emp_a_cargo"><i class="bi bi-filetype-doc"></i></button>';
                                } else {
                                    return '<button onclick="botones_desc_ver_documentos(' + data.ID_APRO + ', \'' + data.FECHA_SOLICITUD + '\')" class="btn btn-primary" id="btn_emp_a_cargo"><i class="bi bi-filetype-doc"></i></button>';
                                }
                            }
                        },
                        { data: "FECHA_SOLICITUD" },
                        { data: "FECHA_CIERRE" },
                        { data: "ANIO" },
                        { data: "DESCRIPCION" },
                        { data: "FOLIO" },
                        { data: "TOTAL" },
                        { data: "MOTIVO" },
                    ];
                    if (appData.Prestacion_actual == 'Lentes') {
                        tabla = 'prestaciones_emp';
                        columns.push(
                            { data: "ARMAZON" },
                            { data: "MICAS" },
                            { data: "ACCESORIO" },
                        );
                    }
                    else if (appData.Prestacion_actual == 'Predial') {
                        tabla = 'prestaciones_predial';
                    }
                    else if (appData.Prestacion_actual == 'Dental') {
                        tabla = 'prestaciones_dental';
                    }
                    $("#" + tabla).DataTable().destroy();
                    // console.log(Prestacion);
                    $("#" + tabla).DataTable({
                        paging: true,
                        scrollCollapse: true,
                        autoFill: true,
                        responsive: true,
                        scrollX: true,
                        scrollY: "70vh",
                        data: data,
                        columns: columns,
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
                    });
                }
                if (response.status == 300) {
                    alerta("info", response.msj);
                }
            },
            error: function () {
                setTimeout(makeRequest, 1000);
            },
        });
    }
    makeRequest();
}
function hexToRgba(hex, opacity) {
    hex = hex.replace(/^#/, "");

    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
}
function formatNumber(value) {
    return typeof value === "number" ? value.toFixed(2) : value;
}
// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
function mostrar_info_XML(response) {
    $("#reloat_SOPA").prop("disabled", true);
    $("#btn_envio_doc").empty();
    // console.log(datos_XML_leido);
    // alerta("success","hhh");
    // #info_xml = id del body de la modal donde se van a mostrar los datos de la factura ClaveProdServ
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
    // Obtener el año actual
    var año_actual = new Date().getFullYear();
    // Comparar los años
    if (año_factura == 2024) {
        // alerta("info","hhh");
        // Quita todas las comas de la cadena
        var nombreEmpleadoInicioSecion_formateado = nombreEmpleadoInicioSecion.replace(/,/g, '');

        // Dividir la cadena en palabras
        var palabrasNombreEmpleado = nombreEmpleadoInicioSecion_formateado.split(' ');

        // Variable para indicar si se encontro la palabra
        var seEncontroPalabra = palabrasNombreEmpleado.every(function (palabra) {
            // Verificar si la palabra esta presente en info_receptor.nombre
            return info_receptor.nombre.includes(palabra);
        });
        // console.log('Coincidencia exacta:', seEncontroPalabra);
        // Verificar si se encontró al menos una palabra
        if (!seEncontroPalabra) {
            $("#loading-container").hide();
            preview.append(
                `<div id="letra" class='col-md-10'><p><strong>El XML está a nombre de una persona distinta.</strong></p></div>`
            );
        } else {
            // Agregar la información de factura al contenedor
            preview.append(`
                    <div class='col-md-10 d-flex align-items-center mt-3'>
                        <p class="mb-0"><strong class="text-secondary">1°_Validación ante el SAT </strong></p>
                        <i id="help-satIcon" class="bi bi-question-circle ms-2 help-icon"></i>
                        <hr class="flex-grow-1 me-2">
                        <div class="help-message" id="help-sat">
                            <p> <strong>1°_Validación ante el SAT</strong><br>
                                Estos campos representan información sobre la validación ante el SAT (Servicio de Administración Tributaria), permitiéndonos verificar el estado actual del XML.
                                <br>
                                <p><img class="ms-2" width="100" src="${appData.img_alertas_activo_sat}"></p>
                                <p><img class="ms-2" width="110" src="${appData.img_alertas_canselado_sat}"></p>
                                <p><img class="ms-2" width="140" src="${appData.img_alertas_NOconexion_sat}"></p>
                                <p><img class="ms-2" width="140" src="${appData.img_alertas_NOencontrado_sat}"></p>
                            </p>
                        </div>
                    </div>
                    <div class='col-md-4 ms-2 mt-2'><p><strong>Estatus: </strong><span id="estado_xml" class="loading-animation"></span></p></div>
                    <div class='col-md-7 ms-2 mt-2'><p><strong>Descripción: </strong><span id="codigoEstatus_xml" class="loading-animation"></span></p></div>
                    <br>
                    <div class='col-md-10 d-flex align-items-center mt-3'>
                        <p class="mb-0"><strong class="text-secondary">2°_Cantidades</strong></p>
                        <i id="help-cantidadesIcon" class="bi bi-question-circle ms-2 help-icon"></i>
                        <hr class="flex-grow-1 me-2">
                        <div class="help-message" id="help-cantidades">
                            <p> <strong>2°_Cantidades</strong><br>
                            En esta sección, presentamos las cifras clave del XML:
                            <strong>Subtotal</strong>: La suma de los conceptos.
                            <strong>IVA</strong> (Impuesto al Valor Agregado): El impuesto asociado.
                            <strong>Total</strong>: La cifra total a pagar.
                            Estos valores reflejan la esencia financiera del documento y cumplen con las normativas del SAT.
                            </p>
                        </div>
                    </div>
                    <div class='col-md-3 ms-2 mt-2'><p><strong><i class="bi bi-cash me-1 h6"></i>Subtotal: </strong>$${formatNumber(
                info_xml.subtotal
            )}</p></div>
                    <div class='col-md-3 ms-2 mt-2'><p><strong><i class="bi bi-graph-up me-1 h6"></i>IVA: </strong>$${formatNumber(
                info_xml_impuesto.TotalImpuestosTrasladados
            )}</p></div>
                    <div class='col-md-3 ms-2 mt-2'><p><strong><i class="bi bi-cash-stack me-1 h6"></i>Total: </strong>$${formatNumber(
                info_xml.total
            )}</p></div>
                    <br>
                    <div class='col-md-10 d-flex align-items-center mt-3'>
                        <p class="mb-0"><strong class="text-secondary">3°_Datos del XML</strong></p>
                        <i id="help-datosXMLIcon" class="bi bi-question-circle ms-2 help-icon"></i>
                        <hr class="flex-grow-1 me-2">
                        <div class="help-message" id="help-datosXML">
                            <p> <strong>3°_Datos del XML</strong><br>
                            En esta sección, encontrarás detalles esenciales sobre el emisor y el receptor del XML. Los datos incluyen nombres, RFC, entre otros. Revisa esta información cuidadosamente para asegurar la correcta emisión y recepción del comprobante fiscal.
                            </p>
                        </div>
                    </div>
                    <div id="letra" class='col-md-6 mt-3'><p><strong><i class="bi bi-calendar-event me-1 h6"></i>Fecha: </strong>${info_xml.fecha
                }</p></div>
                    <div id="letra" class='col-md-6 mt-3'><p><strong><i class="bi bi-person me-1 h6"></i>Nombre emisor: </strong>${info_emisor.nombre
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
            // console.log(informacionConceptos);
            // Crear un array para almacenar todas las promesas
            var promesas = [];

            if (appData.Prestacion_actual == 'Lentes') {
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
                                return 'Si';
                            } else if (response.status == 300) {
                                // Si el status es diferente de 200, la clave no fue encontrada
                                return 'Si pero No';
                            } else if (response.status == 400) {
                                // Si el status es diferente de 200, la clave no fue encontrada
                                return 'No';
                            }
                        } catch (error) {
                            console.log("Error al obtener ClaveSAT");
                            return 'No';
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
                <div id="letra" class='col-md-6'><p><strong><i class="bi bi-sunglasses"> Corresponde a Lentes: </i></strong>${resultados[i]}</p></div>
                `);
                    }
                });
            }
            setTimeout(function () {
                // -------------
                const helpIconSAT = document.getElementById("help-satIcon");
                const helpMessageSAT = document.getElementById("help-sat");
                manejarAyuda(helpIconSAT, helpMessageSAT);
                // -------------
                const helpcantidadesIcon = document.getElementById("help-cantidadesIcon");
                const helpcantidades = document.getElementById("help-cantidades");
                manejarAyuda(helpcantidadesIcon, helpcantidades);
                // ----------------
                const helpdatosXMLIcon = document.getElementById("help-datosXMLIcon");
                const helpdatosXML = document.getElementById("help-datosXML");
                manejarAyuda(helpdatosXMLIcon, helpdatosXML);
                // ----------------
                realizarConsultaSOAP(re, rr, tt, id);
            }, 1000);
        }
    } else {
        // $("#envio_xml_pdf_validados").prop("disabled", true);
        $("#loading-container").hide();
        preview.append(
            `<div id="letra" class='col-md-10'><p><strong>La factura ingresada no pertenece a el año actual de ${año_actual}</strong></p></div>`
        );
    }
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------
    // Agregar el contenedor al elemento con el id "info_xml"
    fileList.append(preview);
    // Función para formatear números a dos decimales
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
// var intentos_SOAP = 0;  // Variable para contar los intentos
// Soliciud a SAT validación de xml 
function realizarConsultaSOAP(re, rr, tt, id) {
    $("#estado_xml").addClass("loading-animation");
    $("#codigoEstatus_xml").addClass("loading-animation");
    $("#btn_envio_doc").empty();
    // console.log(datos_soap);
    // alerta("danger","hhh");
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
                    $("#loading-container").hide();
                    setTimeout(function () {
                        $("#reloat_SOPA").prop("disabled", false);
                    }, 1000);
                    break;
                case "Vigente":
                    var iconn =
                        '<i class="bi bi-check-circle ms-1 text-success h5 gray-background"></i>';
                    setTimeout(function () {
                        $("#loading-container").hide();
                        $("#encabezado_msj_envio").empty();
                        $("#contenido_msj_envio").empty();
                        $("#btn_envio_doc").empty();
                        var status = '1';
                        // alerta("info", "Solo se permiten dos archivos.");  <button type="button"  class="btn btn-primary">Si, si enviar documentos</button>
                        var encabezado_msj_envio = `<i class="bi bi-check2-all"> ¡XML validado!</i>`;
                        var btn_envio_doc = `<button type="button" onclick="proceso_envio_DOC(${status})" class="btn btn-primary">Si enviar documentos</button>`;
                        $("#encabezado_msj_envio").append(encabezado_msj_envio);
                        $("#btn_envio_doc").append(btn_envio_doc);
                        // creacion_de_calculos_LENTES(datos_XML_leido); //funcion para hacer el calculo
                        setTimeout(function () {
                            $("#reloat_SOPA").prop("disabled", false);
                        }, 1000);
                    }, 1200);
                    break;
                case "No Encontrado":
                    var iconn =
                        '<i class="bi bi-exclamation-triangle ms-1 text-danger h5 gray-background"></i>';
                    $("#loading-container").hide();
                    setTimeout(function () {
                        $("#reloat_SOPA").prop("disabled", false);
                    }, 1000);
                    break;
            }
            $("#estado_xml").append(estado, iconn);
            $("#codigoEstatus_xml").append(codigoEstatus);
        },
        error: function (error) {
            if (error.statusText == "timeout") {
                $("#estado_xml").append(
                    "Error de Conexión",
                    '<i class="bi bi-exclamation-triangle ms-1 text-danger h5 gray-background"></i>'
                );
                $("#codigoEstatus_xml").append(
                    "Error de Conexión",
                    '<i class="bi bi-exclamation-triangle ms-1 text-danger h5 gray-background"></i>'
                );
                // setTimeout(function () {
                $("#loading-container").hide();
                $("#encabezado_msj_envio").empty();
                $("#contenido_msj_envio").empty();
                $("#btn_envio_doc").empty();
                var status = '0';
                // alerta("info", "Solo se permiten dos archivos.");  <button type="button"  class="btn btn-primary">Si, si enviar documentos</button>
                var encabezado_msj_envio = `<i class="bi bi-x-lg"></i> ¡Error de conexión XML no pudo ser validado ante el sat!`;
                var contenido_msj_envio = `La verificación del XML ante el Servicio de Administración Tributaria (SAT) no pudo ser completada exitosamente.
                    <br><hr>
                    ¿Considerarías enviar tus documentos sin validar previamente ante el SAT?`;
                var btn_envio_doc = `<button type="button"  onclick="proceso_envio_DOC(${status})"  class="btn btn-primary">Si enviar documentos</button>`;
                $("#encabezado_msj_envio").append(encabezado_msj_envio);
                $("#contenido_msj_envio").append(contenido_msj_envio);
                $("#btn_envio_doc").append(btn_envio_doc);
                // creacion_de_calculos_LENTES(datos_XML_leido); //funcion para hacer el calculo
                setTimeout(function () {
                    $("#reloat_SOPA").prop("disabled", false);
                }, 1000);
                // }, 1000);
            }
        },
        complete: function () {
            $("#estado_xml").removeClass("loading-animation");
            $("#codigoEstatus_xml").removeClass("loading-animation");
        },
    });
}
// FUNCION Q ENVIA DOCUMENTOS CARGADOS DEL EMPLEDO PREDIAL, LENTES
function envio_de_XML(formulario, status) {
    if (appData.Prestacion_actual == 'Predial') {
        var URLPredial = solicitarPrestacionPredialRoute;
    } else if (appData.Prestacion_actual == 'Lentes') {
        var URLPredial = GuardarDocLentesRoute;
    }
    // Crear un objeto FormData
    var formData = new FormData($("#" + formulario)[0]);
    // Agregar el número de empleado (numEmp) al FormData
    formData.append("numEmp", appData.numEmp);
    // var formData = new FormData();
    // Agregar CSRF token al formData
    uploadedFiles.forEach(function (file) {
        formData.append("files[]", file);
    });
    // console.log(UUID_XML); nombreEmpleadoInicioSecion
    formData.append("uuid", UUID_XML);
    formData.append("status", status);
    formData.append("tipoPrestacion", appData.Prestacion_actual);
    formData.append("emp", nombreEmpleadoInicioSecion);
    // Enviar la solicitud al servidor para verificar el documento XML
    $.ajax({
        url: URLPredial,
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            setTimeout(function () {
                $("#reloat_SOPA").prop("disabled", false);
                $("#envio_xml_pdf_validados").prop("disabled", false);
                $("#No_enviar_documentos").prop("disabled", false);
            }, 1000);
            // console.log(response);
            $("#encabezado_doc").empty();
            $("#msj_doc").empty();
            if (response.status == 200) {
                var encabezado = `Documentos Guardados`;
                var msj_doc = `¡Excelente! Tus documentos han sido enviados correctamente. 
                                Hemos recibido tus archivos PDF y XML de manera exitosa. Estamos procesando 
                                la información y te notificaremos tan pronto como la verificación se complete. `;
                $("#encabezado_doc").append(encabezado);
                $("#msj_doc").append(msj_doc);
                $("#notificacion_documentos_guardados").modal(
                    "show"
                );
                $("#modal_doc").modal("hide");
                $("#file-list").empty();
                // Destruir la instancia DataTable actual
                $("#prestaciones_emp").DataTable().destroy();
                getPrestacion_lentes(appData.numEmp);
                setTimeout(function () {
                    actualizar();
                }, 6500);
                clearFileList();
            }
            if (response.status == 500) {
                setTimeout(function () {
                    $("#reloat_SOPA").prop("disabled", false);
                    $("#envio_xml_pdf_validados").prop("disabled", false);
                    $("#No_enviar_documentos").prop("disabled", false);
                }, 1000);
                var encabezado = `Error al Guardar los Documentos`;
                var msj_doc = `${response.msj}`;
                $("#encabezado_doc").append(encabezado);
                $("#msj_doc").append(msj_doc);
                $("#notificacion_documentos_guardados").modal(
                    "show"
                );
                $("#modal_doc").modal("hide");
                $("#file-list").empty();
                clearFileList();
            }
        },
        error: function () {
            $("#animacion_cargando").removeClass(
                "loading-animation"
            );

            setTimeout(function () {
                $("#reloat_SOPA").prop("disabled", false);
                $("#envio_xml_pdf_validados").prop("disabled", false);
                $("#No_enviar_documentos").prop("disabled", false);
            }, 1000);
        },
    });
}
function proceso_envio_DOC(status) {
    $("#reloat_SOPA").prop("disabled", true);
    $("#envio_xml_pdf_validados").prop("disabled", true);
    $("#No_enviar_documentos").prop("disabled", true);
    // e.preventDefault();
    if (appData.Prestacion_actual == 'Predial') {
        console.log(appData.Prestacion_actual);
        const formulario = 'form_doc_predial';
        envio_de_XML(formulario, status);
    } else if (appData.Prestacion_actual == 'Lentes') {
        console.log(appData.Prestacion_actual);
        const formulario = 'form_doc_lentes';
        envio_de_XML(formulario, status);
    }
    else {
        alerta("info", "Prestacion no conocida - L1254")
    }

}
// AREA DE CARGA DE DOCUMENTOS 
var uploadInProgress = false;
var uploadedFiles = [];
let contador_de_errores = 0;
function initializeDropArea(dropAreaId, fileInputId, fileListId, tipo_doc, cantidad) {
    var dropArea = $("#" + dropAreaId);
    var maxAllowedFiles = cantidad;
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
            $("#encabezado_doc").empty();
            $("#msj_doc").empty();
            // $("#msj_doc2").empty();
            // $("#msj_File").empty();
            // alerta("info", "Solo se permiten dos archivos.");
            var encabezado = `<span class="text-danger">"¡Ups! Ha ocurrido un error"</span>`;
            var msj_doc = `
            <strong class="text-danger">Ocurrió un error:</strong> La cantidad de documentos que estas tratando de ingresar no es la permitida.`;
            $("#encabezado_doc").append(encabezado);
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
                    // Agregar botón de eliminar
                    var deleteButton = $('<button title="Haz clic para eliminar este Documento" class="btn_Eliminar_Doc_Area  delete-file"><i class="bi bi-x"></i></button>');
                    preview.append(deleteButton);
                    // -------- 
                    preview.append("<p>" + file.name + "</p>");
                    preview.append(
                        '<i class="bi bi-filetype-' +
                        extension +
                        ' h2"></i>'
                    );
                    fileList.append(preview);
                    processedFiles++;

                    if (processedFiles == files.length) {
                        uploadInProgress = false;
                    }
                    // Evento click para el botón de eliminar
                    deleteButton.click(function (event) {
                        event.stopPropagation();
                        // Detener la propagación del evento para evitar que se active el evento de la carta
                        // Eliminar el archivo del formulario
                        var fileIndex = uploadedFiles.indexOf(file);
                        if (fileIndex !== -1) {
                            uploadedFiles.splice(fileIndex, 1);
                        }
                        // Eliminar la vista previa del archivo
                        preview.remove();
                    });
                    // Adjuntar evento click a la carta y detener la propagación del evento
                    // preview.on('click', function (event) {
                    //     event.preventDefault();
                    //     event.stopPropagation();
                    // });

                    // Ajustar la posición del botón de eliminar
                    deleteButton.css({
                        'position': 'absolute',
                        'top': '5px',
                        'right': '5px'
                    });
                } else {
                    $("#encabezado_doc").empty();
                    $("#msj_doc").empty();
                    // $("#msj_doc2").empty();
                    // $("#msj_File").empty();
                    var encabezado = `<span class="text-danger">"¡Ups! Ha ocurrido un error"</span>`;
                    var msj_doc = ` Ocurrió un error: el documento que intentas subir no está permitido en esta área. Por favor, 
                    verifica qué documentos son compatibles con esta sección. E-2`;
                    $("#encabezado_doc").append(encabezado);
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
    $("#file-list").empty();
    $("#file-list-dental").empty();
    $("#file-input-dental").val('');
    $("#file-list-predial").empty();
    $("#file-list-predial2").empty();
    $("#file-input").val('');
    $("#file-input-predial").val('');
    $("#file-input-predial2").val('');
    uploadedFiles = [];
    uploadInProgress = false;
}
function appdata_Add_ids_area(dropAreaId, fileInputId, fileListId) {
    appData.dropAreaId_area = dropAreaId;
    appData.fileInputId_area = fileInputId;
    appData.fileListId_area = fileListId;
    // console.log(appData.dropAreaId_area, appData.fileInputId_area, appData.fileListId_area);
}
// ----creacion_Btones-------- BOTONES Q SE MUESTRAN PARA VER LOS BOTONES PARA VER Y DESCARGAR DOCUEMNTOS ⬇️⬇️⬇️⬇️🤢 
function botones_desc_ver_documentos(id, fecha) {
    DatosPrestacion(id)
        .then(function (response) {
            if (response.status == 200) {
                var botones = "si";
                creacion_Btones(botones, fecha, id, response);
            } else if (response.status == 400) {
                var botones = "no";
                creacion_Btones(botones, fecha, id, response);
            } else if (response.status == 700) {
                setTimeout(cerrarSesion, 1000);
                reject("Sesión cerrada");
            } else if (response.status == 900) {
                var botones = "ninguno";
                creacion_Btones(botones, fecha, id, response);
            } else if (response.status == 600) {
                var botones = "dental";
                creacion_Btones(botones, fecha, id, response);
            } else {
                alerta("info", response.msj);
            }
        })
        .catch(function () {
            console.log("error al obtener datos de la prestación");
        });
}
function creacion_Btones(botones, fecha, id, response) {
    // console.log(response);
    let msj_desc_doc = "";
    let input;
    if (botones == "si") {
        msj_desc_doc = `
        <div class="row">

        <div class="col-md">
        <nav class="content-center" aria-label="Page navigation example">
        <h5 class=" text-dark mb-1"><i class="bi bi-file-earmark-text"> Comprobante</i></h5>
            <ul class="pagination">
                <li class="page-item"><a class="page-link bg-primary" href="#" onclick="ver_comprobante(${id})"><i class="bi bi-eye"> ver</i></a></li>
                <li class="page-item"><a class="page-link bg-info" href="#" onclick="descargar_comprobante(${id})"><i class="bi bi-download">descarga</i></a></li>
            </ul>
        </nav>
        </div>

        <div class="col-md">
        <nav class="content-center" aria-label="Page navigation example">
        <h5 class="text-dark mb-1"><i class="bi bi-file-earmark-pdf"> PDF</i></h5>
            <ul class="pagination">
                <li class="page-item"><a class="page-link bg-primary" href="#" onclick="ver_pdf(${id})"><i class="bi bi-eye"> ver</i></a></li>
                <li class="page-item"><a class="page-link bg-info" href="#" onclick="descargar_pdf(${id})"><i class="bi bi-download">descarga</i></a></li>
            </ul>
        </nav>
        </div>

        </div>
        `;
        input = '';
    } else if (botones == "no") {
        msj_desc_doc = `
        <div class="row">

        <div class="col-md">
        <nav class="content-center" aria-label="Page navigation example">
        <h5 class="text-dark mb-1"><i class="bi bi-file-earmark-pdf"> PDF</i></h5>
            <ul class="pagination">
                <li class="page-item"><a class="page-link bg-primary" href="#" onclick="ver_pdf(${id})"><i class="bi bi-eye"> ver</i></a></li>
                <li class="page-item"><a class="page-link bg-info" href="#" onclick="descargar_pdf(${id})"><i class="bi bi-download">descarga</i></a></li>
            </ul>
        </nav>
        </div>

        <div class="col-md">
        <nav class="content-center" aria-label="Page navigation example">
        <h5 class="text-dark mb-1"><i class="bi bi-filetype-xml"> XML</i></h5>
            <ul class="pagination">
                <li class="page-item"><a class="page-link bg-primary" href="#" onclick="ver_xml(${id})"><i class="bi bi-eye"> ver</i></a></li>
                <li class="page-item"><a class="page-link bg-info" href="#" onclick="descargar_xml(${id})"><i class="bi bi-download">descarga</i></a></li>
            </ul>
        </nav>
        </div>

        </div>
        `;
        input = '';
    } else if (botones == "ninguno") {
        msj_desc_doc = `
        <div class="row">

        <div class="col-md">
        <nav class="content-center" aria-label="Page navigation example">
        <h5 class="text-dark mb-1"><i class="bi bi-file-earmark-pdf"> PDF</i></h5>
            <ul class="pagination">
                <li class="page-item"><a class="page-link bg-primary" href="#" onclick="ver_pdf(${id})"><i class="bi bi-eye"> ver</i></a></li>
                <li class="page-item"><a class="page-link bg-info" href="#" onclick="descargar_pdf(${id})"><i class="bi bi-download">descarga</i></a></li>
            </ul>
        </nav>
        </div>

        </div>
        `;
        input = '';
    } else if (botones == "dental") {
        let datos = response.datos;
        let conFacturas = datos.NAME_PDF;
        // console.log(conFacturas);
        let tipoPDF = "pdf";
        let tipoXML = "xml";
        msj_desc_doc = `
        <div class="row">
        <hr>
        <div class="col-md">
        <nav class="content-center" aria-label="Page navigation example">
        <h5 class="text-dark mb-1"><i class="bi bi-ticket-perforated"> Vale</i></h5>
            <ul class="pagination">
                <li class="page-item"><a class="page-link bg-primary" href="#" onclick="ver_Vale(${id})"><i class="bi bi-eye"> ver</i></a></li>
                <li class="page-item"><a class="page-link bg-info" href="#" onclick="descargar_Vale(${id})"><i class="bi bi-download">descarga</i></a></li>
            </ul>
        </nav>
        </div>

        <div class="col-md">
        <nav class="content-center" aria-label="Page navigation example">
        <h5 class="text-dark mb-1"><i class="bi bi-upc-scan"> Odontograma</i></h5>
            <ul class="pagination">
                <li class="page-item"><a class="page-link bg-primary" href="#" onclick="ver_Odontograma(${id})"><i class="bi bi-eye"> ver</i></a></li>
                <li class="page-item"><a class="page-link bg-info" href="#" onclick="descarga_Odontograma(${id})"><i class="bi bi-download">descarga</i></a></li>
            </ul>
        </nav>
        </div>

        <div class="col-md">
        <nav class="content-center" aria-label="Page navigation example">
        <h5 class="text-dark mb-1"><i class="bi bi-file-earmark-pdf"> PDF</i></h5>
            <ul class="pagination">
                <li class="page-item"><a class="page-link bg-primary" href="#" onclick="ver_factura(${id}, '${tipoPDF}')"><i class="bi bi-eye"> ver</i></a></li>
                <li class="page-item"><a class="page-link bg-info" href="#" onclick="descargar_factura(${id}, '${tipoPDF}')"><i class="bi bi-download">descarga</i></a></li>
            </ul>
        </nav>
        </div>

        <div class="col-md">
        <nav class="content-center" aria-label="Page navigation example">
        <h5 class="text-dark mb-1"><i class="bi bi-filetype-xml"> XML</i></h5>
            <ul class="pagination">
                <li class="page-item"><a class="page-link bg-primary" href="#" onclick="ver_factura(${id}, '${tipoXML}')"><i class="bi bi-eye"> ver</i></a></li>
                <li class="page-item"><a class="page-link bg-info" href="#" onclick="descargar_factura(${id}, '${tipoXML}')"><i class="bi bi-download">descarga</i></a></li>
            </ul>
        </nav>
        </div>

        </div>
        `;
        setTimeout(function () {
            // Limpiar el contenido actual del ul
            $("#inputGroupSelect").empty();

            // Iterar sobre el rango de números de 1 a conFacturas
            for (let i = 1; i <= conFacturas; i++) {
                // Crear un elemento <li> con un enlace <a> dentro con el texto "Factura ${i}"
                let listItem = `<option value="${i}">${i}</option>`;
                // Agregar el <li> al <ul>
                $("#inputGroupSelect").append(listItem);
            }


            $("#desc_pdf_dental").prop("disabled", false);
            $("#desc_xml_dental").prop("disabled", false);

        }, 1000);
        input = `
        <div class="row">

        <div class="col-md-8">
        <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect01">Factura</label>
        <select class="form-select" id="inputGroupSelect" >
        <option selected>Cargando...</option>
        </select>
        </div>
        </div>

        <div class="col-md-4">
        <div>Facturas cargadas <br> <h5 class="text-danger">${conFacturas}</h5></div>
        </div>

        </div>
        `;

    }
    let encabezado = `Documentos cargados el ${fecha}`;
    $("#msj_desc_doc_descarga").html(msj_desc_doc);
    $("#inputDental").html(input);
    $("#encabezado_doc_descarga").html(encabezado);
    $("#notificacion_documentos_cargados").modal("show");
    $("#mostrar_pdf").empty();
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// ------- SECCIÓN DE FUNCIONES PARA PREDIAL - CUANDO EL EMPLEADO SOLO SUBE SU "PDF" ----------
// Funcion donde muetra el PDF que el empleado cargo en la pretación de predial 
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// 
// A = ACTUALIZA PDF 
// C = SUBIR O ACTUALIZA COMPROBANTE
//
// letrasPredialDocumentosAcorreguir
// letrasPredialDocumentosAcorreguirV2

// Esta funcion se ejecuta cuando preciona el boton de html de entrar 
function cargaDocpredial() {
    $('title').text('Prestacion de Predial');
    $("#loading-container").show();
    appData.Prestacion_actual = 'Predial';
    // console.log(solicitud_predial);
    $("#lentes").hide();
    $("#dental").hide();
    $("#predial").removeClass("col-md-4").addClass("col-md-10");
    $("#carga_doc_predial").hide();
    $("#body_doc_predial").show();
    $("#body_btn_predial").empty();
    verificaPrestaciones();
    setTimeout(function () {
        if (solicitud_predial == 600) {
            Modal_DocA_Actualizar();
            inicializaAreaPredial();
        } else if (solicitud_predial == 500) {
            $("#var_doca_subir").html('<span class="text-danger animacion_letra">PDF</span> o <span class="text-danger animacion_letra">Img</span> de su prestación');
            inicializaAreaPredial();
        } else if (solicitud_predial == 200) {
            $("#seccion_formPredial").hide();
            var butons = `
                    <button disabled type="button" class="btn btn-info  mt-2"
                        data-bs-toggle="modal" data-bs-target="#"
                        id="">
                        <i class="bi bi-box-arrow-in-right"> Ya has solicitado está prestación</i>
                    </button>
                `;
            $("#body_btn_predial").append(butons);
        } else {
            alerta("info", "error");
        }
        $("#prestaciones_predial").DataTable().destroy();
        getPrestacion_lentes(appData.numEmp);
        $("#loading-container").hide();
    }, 1500);
}
function regresarPredial() {
    $("#carga_doc_predial").show();
    $("#body_doc_predial").hide();
    clearFileList();
    $("#lentes").show();
    $("#dental").show();
    $("#predial").removeClass("col-md-10").addClass("col-md-4");
    $('title').text('Prestacion');
    archivoPredialEnvio = null;
    letrasPredialDocumentosAcorreguir = null;
}
function Modal_DocA_Actualizar() {
    $("#loading-container").show();
    // console.log(letrasPredialDocumentosAcorreguir); var_doca_subir
    $("#modal_predial").modal("show");
    $("#ubicacion_btn_enviarDoc_actualizado_predial").html(``);
    $("#body_modal_predial").html(``);
    let contieneA = letrasPredialDocumentosAcorreguir.includes("A");
    let contieneC = letrasPredialDocumentosAcorreguir.includes("C")
    if (contieneA && contieneC) {
        $("#encabezado_modal_predial").html(`Prestación rechazada por favor vuelva a subir su PDF y proporcione un Comprobante de su Predial si es necesario`);
        $("#var_doca_subir").html('<span class="text-danger animacion_letra">PDF</span> nuevamente');
    } else if (contieneA) {
        $("#encabezado_modal_predial").html(`Prestación rechazada por favor vuelva a subir su PDF`);
        $("#var_doca_subir").html('<span class="text-danger animacion_letra">PDF</span> nuevamente');
    } else if (contieneC) {
        $("#encabezado_modal_predial").html(`Favor de proporcionar un comprobante de su Predial para comprobar que el terreno te pertenece`);
        $("#var_doca_subir").html('comprobante en formato <span class="text-danger animacion_letra">PDF</span> o <span class="text-danger">IMAGEN</span>  que avale que la prestación le pertenence.');
    }
}
function inicializaAreaPredial() {
    // $("#btn_verificar_predial").show();
    appdata_Add_ids_area("drop-area-predial", "file-input-predial", "file-list-predial");
    // $("#drop-area-predial").show();
    $("#seccion_formPredial").show();
    // Verificar si la función ya ha sido inicializada
    var allowedExtensions = ["pdf", "PDF", "png", "PNG", "jpg", "JPG", "jpeg", "JPEG"];
    var cantidad = 1;
    if (!dropAreaInitialized_predial_PDF) {
        setTimeout(function () {
            initializeDropArea(appData.dropAreaId_area, appData.fileInputId_area, appData.fileListId_area, allowedExtensions, cantidad);
            dropAreaInitialized_predial_PDF = true; // Marcar como inicializada
        }, 1000);
    }
}
function enviar_documentoActualizado_Predial() {
    let formData = new FormData();
    formData.append('EmpNum', appData.numEmp);
    formData.append('email', appData.email);
    // Añade el archivoPredialEnvio al formulario (asegúrate de tener esta variable definida)
    formData.append('file', archivoPredialEnvio);
    $("#loading-container").show();
    $.ajax({
        url: guardarDoc_ActualizadoRoute,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.status == 200) {
                // alerta("success", response.msj);
                $('#notificacion_documentos_guardados').modal('show');
                $("#encabezado_doc").html("¡Comprobante de tu predial ha sido actualizado!");
                $("#msj_doc").html("Comprobante de tu predial ha sido actualizado, por favor estar atento a tu correo para ver si tu nuevo comprobante asido aprobado o no ");
                // $("#predial").show();
                // $("#contenedor_pdf_predial").hide();
                // $("#preguntaPRE1_prredialPDF").hide();
                setTimeout(function () {
                    cargaDocpredial();
                }, 1500);
                // setInterval(actualizar, 4000);
            } else if (response.status == 800) {
                alerta("info", response.msj);
            } else if (response.status == 500) {
                alerta("info", response.msj);
            }
        },
        error: function () {
            // Manejo de errores
        },
        complete: function () {
            $("#loading-container").hide();
        },
    });
}
/* <option value="1">One</option> */
function aprobar_prestacionPDF(response) {
    $("#contenedor_pdf_predial").show();
    $("#preguntaPRE1_prredialPDF").show();
    $("#pregunta1_prredialPDF").hide();
    $("#pregunta2_prredialPDF").hide();
    $("#pregunta3_prredialPDF").hide();
    $("#pregunta4_prredialPDF").hide();
    $("#preguntaDOC_prredialPDF").hide();
    $("#predial").hide();
    limpia_input_formulario_PDF();
    var pdfViewer = $('#pdfViewer');

    var byteCharacters = atob(response.pdfContent);
    var byteNumbers = new Array(byteCharacters.length);

    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: 'application/pdf' });
    var pdfUrl = URL.createObjectURL(blob);

    // Limpiar cualquier contenido existente y agregar el visor de PDF
    pdfViewer.empty().append('<object data="' + pdfUrl + '#zoom=100" type="application/pdf" class="pdf_css_predial" ></object>');
}
// acción del boton para salir del formulario del PDF de predial 
function cancela_predial_form_predial() {
    // Mostrar una confirmación al usuario
    var respuesta = confirm("¿Estás seguro de cancelar el formulario predial?");
    // Verificar la respuesta del usuario
    if (respuesta) {
        // Usuario ha hecho clic en "Aceptar"
        $("#contenedor_pdf_predial").hide();
        $("#predial").show();
        $("#pdfViewer").empty(); // Apartado donde  se mustra el pdf cargado por el empleado
        clearFileList();
    } else {
    }
}
// FUNCIONES QUE VALIDAN LAS OBCIONES DEL FORMULARIO 
function preguntaPRE1_prredialPDF() {
    // $("#anio-actual").empty();
    $("#msj-alerta-prediaPRE1").empty();
    $("#btn_PRE1PDF_predial").prop("disabled", true); //Desabilita el boton 
    borra_mensajes();
    if ($("#modal-clavCatastral").val() == "") {
        $("#msj-alerta-prediaPRE1").html('La clave no puede ir vacio');
        $("#btn_PRE1PDF_predial").prop("disabled", false); //abilita el boton 
        return false;
    }
    var valor_boton = $("#btn_PRE1PDF_predial").html();
    // Cambia el contenido del botón a un spinner
    $("#btn_PRE1PDF_predial").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...');
    var clavee = $("#modal-clavCatastral").val();
    Verifica_ClaveCatastral(clavee);
    setTimeout(function () {
        $("#btn_PRE1PDF_predial").prop("disabled", false); //abilita el boton 
        $("#btn_PRE1PDF_predial").html(valor_boton);
    }, 2000);
}
function pregunta1_prredialPDF() {
    $("#anio-actual").empty();
    $("#msj-alerta-predial").empty();
    $("#btn_1PDF_predial").prop("disabled", true); //Desabilita el boton 
    borra_mensajes();
    if (!$("#modal-propietario-si").is(":checked") && !$("#modal-propietario-no").is(":checked")) {
        $("#msj-alerta-predial").html('Por favor seleciona una opción');
        $("#btn_1PDF_predial").prop("disabled", false); //abilita el boton 
        return false;
    }
    else if ($("#modal-propietario-si").is(":checked") && $("#modal-propietario-no").is(":checked")) {
        $("#msj-alerta-predial").html('Por favor seleciona  solo una opción');
        $("#btn_1PDF_predial").prop("disabled", false); //abilita el boton 
        return false;
    }

    // si el empleado a mencionado q el docuemento no esta a su nombre entonces inicializamos un area 
    if ($("#modal-propietario-no").is(":checked")) {
        // Deshabilitar el estado "checked"
        // $("#modal-propietario-no").prop("checked", false);
        $("#preguntaDOC_prredialPDF").show();
        $("#pregunta1_prredialPDF").hide();
        $("#btn_1PDF_predial").prop("disabled", false); //abilita el boton 
        appdata_Add_ids_area("drop-area-predial2", "file-input-predial2", "file-list-predial2");
        // canDOC_prredialPDF();
        // Verificar si la función ya ha sido inicializada
        var allowedExtensions = ["pdf", "PDF", "png", "PNG", "jpg", "JPG", "jpeg", "JPEG"];
        var cantidad = 1;
        if (!dropAreaInitialized_predial2_PDF) {
            canDOC_prredialPDF();
            setTimeout(function () {
                initializeDropArea(appData.dropAreaId_area, appData.fileInputId_area, appData.fileListId_area, allowedExtensions, cantidad);
                dropAreaInitialized_predial2_PDF = true; // Marcar como inicializada
            }, 1000);
        }
    } else
        if ($("#modal-propietario-si").is(":checked")) {
            var valor_boton = $("#btn_1PDF_predial").html();
            $("#btn_1PDF_predial").prop("disabled", true); //Desabilita el boton 
            // // Cambia el contenido del botón a un spinner
            $("#btn_1PDF_predial").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...');
            $("#btn_1PDF_predial").prop("disabled", false); //abilita el boton 
            $("#btn_1PDF_predial").html(valor_boton);
            $("#anio-actual").append(año_actual);
            $("#pregunta1_prredialPDF").hide();
            $("#pregunta2_prredialPDF").show();

        }

}
function pregunta2_prredialPDF() {
    // $("#anio-actual").empty();
    $("#msj-alerta-predial2").empty();
    $("#btn_2PDF_predial").prop("disabled", true); //Desabilita el boton 
    borra_mensajes();
    if (!$("#modal-añoNO-actual").is(":checked") && !$("#modal-añoSI-actual").is(":checked")) {
        $("#msj-alerta-predial2").html('Por favor seleciona una opción');
        $("#btn_2PDF_predial").prop("disabled", false); //abilita el boton 
        return false;
    }
    else if ($("#modal-añoNO-actual").is(":checked") && $("#modal-añoSI-actual").is(":checked")) {
        $("#msj-alerta-predial2").html('Por favor seleciona  solo una opción');
        $("#btn_2PDF_predial").prop("disabled", false); //abilita el boton 
        return false;
    }
    var valor_boton = $("#btn_2PDF_predial").html();
    // Cambia el contenido del botón a un spinner
    $("#btn_2PDF_predial").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...');

    $("#btn_2PDF_predial").prop("disabled", false); //abilita el boton 
    $("#btn_2PDF_predial").html(valor_boton);
    $("#pregunta1_prredialPDF").hide();
    $("#pregunta2_prredialPDF").hide();

    if (appData.respuestaCLAVEcatastral == 'si') {
        $("#pregunta3_prredialPDF").hide();
        $("#pregunta4_prredialPDF").show();
    } else {
        $("#pregunta3_prredialPDF").show();
    }
}
function pregunta3_prredialPDF() {
    $("#msj-alerta-predial3").empty();
    $("#btn_3PDF_predial").prop("disabled", true); //Desabilita el boton 
    borra_mensajes();
    if (!$("#modal-construcionNO").is(":checked") && !$("#modal-construcionSI").is(":checked")) {
        $("#msj-alerta-predial3").html('Por favor seleciona una opción');
        $("#btn_3PDF_predial").prop("disabled", false); //abilita el boton 
        return false;
    }
    else if ($("#modal-construcionNO").is(":checked") && $("#modal-construcionSI").is(":checked")) {
        $("#msj-alerta-predial3").html('Por favor seleciona  solo una opción');
        $("#btn_3PDF_predial").prop("disabled", false); //abilita el boton 
        return false;
    }
    var valor_boton = $("#btn_3PDF_predial").html();
    // Cambia el contenido del botón a un spinner
    $("#btn_3PDF_predial").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...');

    $("#btn_3PDF_predial").prop("disabled", false); //abilita el boton 
    $("#btn_3PDF_predial").html(valor_boton);

    $("#pregunta1_prredialPDF").hide();
    $("#pregunta2_prredialPDF").hide();
    $("#pregunta3_prredialPDF").hide();
    $("#pregunta4_prredialPDF").show();
    // alerta("success", "formulario terminado");

}
function pregunta4_prredialPDF() {
    // $("#anio-actual").empty();
    $("#msj-alerta-predial3").empty();
    $("#btn_4PDF_predial").prop("disabled", true); //Desabilita el boton 
    borra_mensajes();
    if ($("#modal-total").val() == "") {
        $("#msj-alerta-predial4").html('El total no puede ir vacio');
        $("#btn_4PDF_predial").prop("disabled", false); //abilita el boton 
        return false;
    }

    var valor_boton = $("#btn_4PDF_predial").html();
    // Cambia el contenido del botón a un spinner
    $("#btn_4PDF_predial").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...');

    $("#btn_4PDF_predial").prop("disabled", false); //abilita el boton 
    $("#btn_4PDF_predial").html(valor_boton);
    // $("#pregunta1_prredialPDF").hide();
    // $("#pregunta2_prredialPDF").hide();
    // $("#pregunta3_prredialPDF").show();
    // alerta("success", "formulario terminado");
    analiza_preguntas_predial();


}
// linmpia el area para subir comprobante -
function canDOC_prredialPDF() {
    $("#file-list-predial2").empty();
    $("#file-input-predial2").val('');
    uploadedFiles = [];
    uploadInProgress = false;
}
function regresar2_prredialPDF() {
    $("#pregunta1_prredialPDF").show();
    $("#pregunta2_prredialPDF").hide();
    $("#pregunta3_prredialPDF").hide();
    $("#pregunta4_prredialPDF").hide();
    $("#preguntaDOC_prredialPDF").hide();
    $('#preguntas_predial_pdf').modal('hide');
}
function regresar3_prredialPDF() {
    $("#pregunta1_prredialPDF").hide();
    $("#pregunta2_prredialPDF").show();
    $("#pregunta3_prredialPDF").hide();
    $("#pregunta4_prredialPDF").hide();
    $('#preguntas_predial_pdf').modal('hide');
}
function regresar4_prredialPDF() {
    $("#pregunta1_prredialPDF").hide();
    if (appData.respuestaCLAVEcatastral == 'si') {
        $("#pregunta2_prredialPDF").show();
        $("#pregunta3_prredialPDF").hide();
    } else {
        $("#pregunta2_prredialPDF").hide();
        $("#pregunta3_prredialPDF").show();
    }
    $("#pregunta4_prredialPDF").hide();
    $('#preguntas_predial_pdf').modal('hide');
}
function regresar5_prredialPDF() {
    $("#pregunta1_prredialPDF").hide();
    $("#pregunta2_prredialPDF").hide();
    $("#pregunta3_prredialPDF").hide();
    $("#pregunta4_prredialPDF").show();
    $('#preguntas_predial_pdf').modal('hide');
}
function regresarPRE1_prredialPDF() {
    $("#preguntaPRE1_prredialPDF").show();
    $("#pregunta1_prredialPDF").hide();
    $("#pregunta2_prredialPDF").hide();
    $("#pregunta3_prredialPDF").hide();
    $("#pregunta4_prredialPDF").hide();
    $("#preguntaDOC_prredialPDF").hide();
    $('#preguntas_predial_pdf').modal('hide');
}
// ----------------------- 
function analiza_preguntas_predial() {
    $('#cont_preguntas').empty();
    $('#preguntas_predial_pdf').modal('show');
    // ----------------------------- 
    var res_1Pregunta = '';
    var icon1 = "";
    var color1 = "";
    var res_2Pregunta = '';
    var icon2 = "";
    var color2 = "";
    var res_3Pregunta = '';
    var icon3 = "";
    var color3 = "";
    var res_4Pregunta = '';
    var res_PRE1Pregunta = '';
    // ----------------------------- 
    if ($("#modal-propietario-si").is(":checked") && !$("#modal-propietario-no").is(":checked")) {
        res_1Pregunta = "Si, yo soy el propietario";
        icon1 = "bi-check2-circle";
        color1 = "success"
    } else if (!$("#modal-propietario-si").is(":checked") && $("#modal-propietario-no").is(":checked")) {
        res_1Pregunta = "No, yo no soy el propietario";
        icon1 = "bi-x-lg";
        color1 = "danger";
    }
    // -------------------------------------------- 
    if ($("#modal-añoNO-actual").is(":checked") && !$("#modal-añoSI-actual").is(":checked")) {
        res_2Pregunta = "No, el predial no pertenece a el año actual";
        icon2 = "bi-x-lg";
        color2 = "danger";
    } else if (!$("#modal-añoNO-actual").is(":checked") && $("#modal-añoSI-actual").is(":checked")) {
        res_2Pregunta = "Si, el predial si pertenece a el año actual";
        icon2 = "bi-check2-circle";
        color2 = "success"
    }
    // -------------------------------------------- 
    if ($("#modal-construcionNO").is(":checked") && !$("#modal-construcionSI").is(":checked")) {
        res_3Pregunta = "No, no esta en construcción";
        icon3 = "bi-x-lg";
        color3 = "danger";
    } else if (!$("#modal-construcionNO").is(":checked") && $("#modal-construcionSI").is(":checked")) {
        res_3Pregunta = "Si, si esta en construcción";
        icon3 = "bi-check2-circle";
        color3 = "success"
    }
    // -------------------------------------------- 
    res_4Pregunta = $("#modal-total").val();
    res_PRE1Pregunta = $("#modal-clavCatastral").val();
    // console.log("pre-1:", res_1Pregunta, "pre-2:", res_2Pregunta, "pre-3:", res_3Pregunta, "pre-4", res_4Pregunta);
    if (color2 == "danger" || color3 == "danger") {
        $("#solicitar_prestacion_predial_PDF").prop("disabled", true);
    } else {
        $("#solicitar_prestacion_predial_PDF").prop("disabled", false);
    }
    var res = `
    <div><strong>Clave - catastral</strong> <i class="text-success bi bi-cash-coin">  ${res_PRE1Pregunta}</i> <button class=" ms-2 btn btn-secondary" onclick="regresarPRE1_prredialPDF()">Corregir</button></div><br>
    <div><strong>¿El nombre del propietario está a tu nombre?</strong> <i class="text-${color1} bi ${icon1}">  ${res_1Pregunta}</i> <button class=" ms-2 btn btn-secondary" onclick="regresar2_prredialPDF()">Corregir</button></div><br>
    <div><strong>¿El periodo de pago es de este año ${año_actual}?</strong> <i class="text-${color2} bi ${icon2}">  ${res_2Pregunta}</i> <button class=" ms-2 btn btn-secondary" onclick="regresar3_prredialPDF()">Corregir</button></div><br>`;

    if (appData.respuestaCLAVEcatastral == 'no') {
        res += `<div><strong>¿La propiedad está en construcción?</strong> <i class="text-${color3} bi ${icon3}">  ${res_3Pregunta}</i> <button class=" ms-2 btn btn-secondary" onclick="regresar4_prredialPDF()">Corregir</button></div><br>`;
    }

    res += `<div><strong>Total</strong> <i class="text-success bi bi-cash-coin">  ${res_4Pregunta}</i> <button class=" ms-2 btn btn-secondary" onclick="regresar5_prredialPDF()">Corregir</button></div><br>`;

    $("#cont_preguntas").append(res);


}
function solicitar_prestacion_predial_PDF() {
    // ----------------------------- 
    var res_1Pregunta = '';
    var res_2Pregunta = '';
    var res_3Pregunta = '';
    var res_4Pregunta = '';
    var res_PRE1Pregunta = '';
    // ----------------------------- 
    if ($("#modal-propietario-si").is(":checked") && !$("#modal-propietario-no").is(":checked")) {
        res_1Pregunta = "1";
    } else if (!$("#modal-propietario-si").is(":checked") && $("#modal-propietario-no").is(":checked")) {
        res_1Pregunta = "0";
    }
    // -------------------------------------------- 
    if ($("#modal-añoNO-actual").is(":checked") && !$("#modal-añoSI-actual").is(":checked")) {
        res_2Pregunta = "0";
    } else if (!$("#modal-añoNO-actual").is(":checked") && $("#modal-añoSI-actual").is(":checked")) {
        res_2Pregunta = "1";
    }
    // -------------------------------------------- 
    if (appData.respuestaCLAVEcatastral == 'no') {
        if ($("#modal-construcionNO").is(":checked") && !$("#modal-construcionSI").is(":checked")) {
            res_3Pregunta = "0";
        } else if (!$("#modal-construcionNO").is(":checked") && $("#modal-construcionSI").is(":checked")) {
            res_3Pregunta = "1";
        }
    } else {
        res_3Pregunta = "1";
    }
    // -------------------------------------------- 
    res_4Pregunta = $("#modal-total").val();
    res_PRE1Pregunta = $("#modal-clavCatastral").val();

    // console.log("pre-1:", res_1Pregunta, "pre-2:", res_2Pregunta, "pre-3:", res_3Pregunta, "pre-4", res_4Pregunta);
    enviar_respuestasPDF(res_1Pregunta, res_2Pregunta, res_3Pregunta, res_4Pregunta, res_PRE1Pregunta);
}
// FUNCIÓN Q LIMPIA LOS INPUTS DE EL FORMULARIO Q EL EMPLEADO LLENA CUANDO SUBE SOLO PDF - PREDIAL 
function limpia_input_formulario_PDF() {
    // Desmarcar el checkbox con ID modal-construcionSI
    $("#modal-construcionSI").prop('checked', false);
    // Limpiar otros campos cambiando a prop('checked', false)
    $("#modal-propietario-si").prop('checked', false);
    $("#modal-propietario-no").prop('checked', false);

    $("#modal-añoSI-actual").prop('checked', false);
    $("#modal-añoNO-actual").prop('checked', false);

    $("#modal-construcionNO").prop('checked', false);
    $("#modal-construcionNO").prop('checked', false);
    $("#modal-total").val('');
    $("#modal-clavCatastral").val('');
}
function enviar_respuestasPDF(res_1Pregunta, res_2Pregunta, res_3Pregunta, res_4Pregunta, res_PRE1Pregunta) {
    var formData = new FormData();

    // Añade los valores de las respuestas al formulario
    formData.append('clave', res_PRE1Pregunta);
    formData.append('pre1', res_1Pregunta);
    formData.append('pre2', res_2Pregunta);
    formData.append('pre3', res_3Pregunta);
    formData.append('pre4', res_4Pregunta);
    formData.append('EmpNum', appData.numEmp);
    formData.append('email', appData.email);

    var file = null;

    // Puedes acceder a la variable archivoSeleccionado en cualquier parte de tu código
    if (res_1Pregunta == "0") {
        if (archivoSeleccionado) {
            file = archivoSeleccionado;
            formData.append('fileComprobante', file, file.name);
        } else {
            console.log('No se ha seleccionado ningún archivo fuera de la condición 1.');
        }
    }

    // Añade el archivoPredialEnvio al formulario (asegúrate de tener esta variable definida)
    formData.append('file', archivoPredialEnvio);

    $("#loading-container").show();
    // Realiza la solicitud Ajax
    $.ajax({
        url: guardarRespuestasPDFpredialRoute,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.status == 200) {
                $("#loading-container").hide();
                // alerta("success", response.msj);
                $('#preguntas_predial_pdf').modal('hide');
                $('#notificacion_documentos_guardados').modal('show');
                $("#encabezado_doc").html("¡Prestación solicitada exitosamente!");
                $("#msj_doc").html("Su solicitud de Predial ha sido enviada, por favor estar al pendiente en su correo electronico para darle seguimiento a su prestación.");
                $("#predial").show();
                $("#contenedor_pdf_predial").hide();
                $("#preguntaPRE1_prredialPDF").hide();
                setTimeout(function () {
                    cargaDocpredial();
                }, 1500);
            } else if (response.status == 800) {
                alerta("info", response.msj);
            } else if (response.status == 500) {
                alerta("info", response.msj);
            }
        },
        error: function () {
            // Manejo de errores
        }
    });
}
function Verifica_ClaveCatastral(clavee) {
    var formData = new FormData();
    formData.append('clave', clavee);
    formData.append('EmpNum', appData.numEmp);
    $.ajax({
        url: Verifica_ClaveCatastralRoute,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response);
            if (response.status == 200) {
                $("#preguntaPRE1_prredialPDF").hide();
                $("#pregunta1_prredialPDF").show();
                // si la clave q ingreso el empleado esta en la base de datos 
                appData.respuestaCLAVEcatastral = 'si';
                console.log(appData.respuestaCLAVEcatastral);
            } else if (response.status == 800) {
                $("#preguntaPRE1_prredialPDF").hide();
                $("#pregunta1_prredialPDF").show();
                // no la clave q ingreso el empleado esta en la base de datos 
                appData.respuestaCLAVEcatastral = 'no';
                console.log(appData.respuestaCLAVEcatastral);
            } else if (response.status == 400) {
                alerta("info", response.msj);
            }
        },
        error: function () {
            // Manejo de errores
        }
    });
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// ---------------------------🦷DENTAL🦷---------------------------
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// let porcentaje_barradental = 0;
// let porsentajeunico = 0;
let array_uuid_dental = [];
let UUID_XML_lentes;
let contadorr = 0;
function entrarareDental() {
    $('title').text('Prestacion Dental');
    appData.Prestacion_actual = 'Dental';
    verificaPrestaciones();
    $("#carga_doc_dental").prop("disabled", true);
    setTimeout(function () {
        $("#carga_doc_dental").prop("disabled", false);
        if (solicitud_dental == 200) {
            subirDocDental();
        } else if (solicitud_dental == 500) {
            ModalParasolicitarPrestacionDental();
        }
    }, 1000);
}
// Ajax para solicitar prestación DENTAL 
function solicitar_prestacion_Dental() {
    // $("#canselar_solicitar_prestacion_dental").prop("disabled", true);
    $("#boton_solicitar_prestacion_dental").prop("disabled", true);
    let contenidoOriginal = $("#boton_solicitar_prestacion_dental").html();
    // Cambia el contenido del botón a un spinner
    $("#boton_solicitar_prestacion_dental").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...');
    creacion_valeEMAIL(function (pdfBlob) {
        let pdf = pdfBlob;
        setTimeout(function () {
            crear_odontogramaEMAIL(function (pdfBlob) {
                let pdf2 = pdfBlob;
                var formData = new FormData();
                formData.append("numEmp", appData.numEmp);
                formData.append("emp", nombreEmpleadoInicioSecion);
                formData.append("tipo", 'Dental');
                formData.append("pdf1", pdf, "vale_servicio.pdf");
                formData.append("pdf2", pdf2, "Odontograma.pdf");
                // console.log(pdfBlob2);
                $.ajax({
                    url: solicitarPrestacionLentesDentalURL,
                    method: "POST",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        if (response.status == 200) {
                            // alerta("success", response.msj);
                            // setInterval(actualizar, 1000);
                            $("#texto_1").empty();
                            $("#botones_1").empty();
                            $("#boton_solicitar_prestacion_dental").html(contenidoOriginal);
                            $("#boton_solicitar_prestacion_dental").prop("disabled", false);
                            $("#canselar_solicitar_prestacion_dental").prop("disabled", false);
                            var datos = `
                        <div class="row">
                            <div class="col-md-4"><h2 class="text-success">¡Solicitud Exitosa!</h2><br></div>
                            <div class="col-md-6"><button type="button" class="btn btn-primary  ms-2 mt-2" onclick="descarga2PDF()" id="crear_vale"><i class="bi bi-file-earmark-arrow-down"> Descarga PDF(s)</i></button> </div>
                        </div>
                       <div class="mt-3" style="font-size: 14px">
                            <strong>Pasos a seguir: <i class="bi bi-arrow-down"></i></strong><br><br>
                            <strong>1.-</strong>Imprimir el vale dental, entregar vale dental y dos copias de su credencial de elector al Dr. Carlos Martínez (hace la valoración inicial y final)<br>
                            <strong>2.-</strong>Hacer cita con él  Dr.Carlos Martínez marcando a los teléfonos que se encuentran en el vale para que te haga la valoración inicial (vigencia del vale, 30 días naturales)<br>
                            <strong>3.-</strong>Una vez que lo valore el dentista inicial, puedes ir con el dentista que elija, tiene hasta el 30 de noviembre del año en curso, para entregarme los documentos que se generan de la solicitud.<br>
                            <strong>4.-</strong>Cuando termines el trabajo dental, el dentista que elija deberá entregarte la factura y el XML del trabajo que le hizo, en ella debe especificar sólo los conceptos que tengan que ver con prótesis y su monto (ejemplos de prótesis: corona, incrustación, endoposte etc.) Cabe señalar que cada concepto de prótesis tiene un apoyo económico ya definido por la UTEQ.<br>
                            <strong>5.-</strong>La factura (con sus datos datos fiscales) el vale original y odontograma, se subiran a el sistema para que proceda a darte el apoyo dental que corresponda por el concepto que le trabajaron. <br>
                            <strong>6.-</strong>Llevar dos tantos de su credencial de elector antes de llegar a su cita programada<br>
                            <strong>7.-</strong>Llevar dos tantos del vale dental antes de llegar a su cita programada<br><br>
                            Cualquier duda estoy a tus órdenes, Tel. cel <strong>4423434684</strong><br><br>
                            Saludos cordiales.
                       </div>
                        `;
                            var buttos = `
                        <button type="button" onclick="subirDocDental()" class="btn btn-danger"
                            data-bs-dismiss="modal"><i class="bi bi-arrow-left-short"> Salir</i>
                        </button>
                        `;
                            $("#texto_1").html(datos);
                            setTimeout(function () {
                                $("#botones_1").html(buttos);
                            }, 2000);
                            $("#prestaciones_emp").DataTable().destroy();
                            getPrestacion_lentes(appData.numEmp);
                        } else if (response.status == 500) {
                            $("#texto_2").html(response.msj);
                            // alerta("danger", response.msj);
                            $("#boton_solicitar_prestacion_dental").html(contenidoOriginal);
                            $("#boton_solicitar_prestacion_dental").prop("disabled", false);
                            $("#canselar_solicitar_prestacion_dental").prop("disabled", false);
                            $("#boton_solicitar_prestacion_dental").prop("disabled", false);
                        } else if (response.status == 700) {
                            cerrarSesion();
                        }
                    },
                    error: function () {
                        $("#boton_solicitar_prestacion_dental").prop("disabled", false);
                        $("#canselar_solicitar_prestacion_dental").prop("disabled", false);
                        console.log("error-al hacer la solicitud dental");
                    }
                });
            });
        }, 1000);
    });
}
function subirDocDental() {
    $("#loading-container").show();
    // verificaPrestaciones();
    // setInterval(actualizar, 1000);
    $("#form_doc_dental").show();
    appdata_Add_ids_area("drop-area-dental", "file-input-dental", "file-list-dental");
    $("#carga_doc_dental").hide();
    $("#solicitar_prestacionButton_dental").hide();
    $("#body_doc_dental").show();
    let butonn = `
            <div class="row">
            <div class="col-md-4">
                <h4 class="text-success">¡Pasos a seguir y descarga de documentos!</h4><br>
            </div>
            <div class="col-md-6"><button type="button" class="btn btn-primary  ms-2 mt-2"
                    onclick="descarga2PDF()" id="crear_vale"><i
                        class="bi bi-file-earmark-arrow-down"> Descargar Vale y
                        Odontograma</i></button> </div>
        </div>
        <div class="mt-3" style="font-size: 14px">
            <strong>Pasos a seguir: <i class="bi bi-arrow-down"></i></strong><br><br>
            <strong>1.-</strong>Imprimir el vale dental, entregar vale dental y dos copias de su
            credencial de elector al Dr. Carlos Martínez (hace la valoración inicial y
            final)<br>
            <strong>2.-</strong>Hacer cita con él Dr.Carlos Martínez marcando a los teléfonos
            que se encuentran en el vale para que te haga la valoración inicial (vigencia del
            vale, 30 días naturales)<br>
            <strong>3.-</strong>Una vez que lo valore el dentista inicial, puedes ir con el
            dentista que elija.<br>
            <strong>4.-</strong>Cuando termines el trabajo dental, el dentista que elija deberá
            entregarte la factura y el XML del trabajo que le hizo, en ella debe especificar
            sólo los conceptos que tengan que ver con prótesis y su monto (ejemplos de prótesis:
            corona, incrustación, endoposte etc.) Cabe señalar que cada concepto de prótesis
            tiene un apoyo económico ya definido por la UTEQ.<br>
            <strong>5.-</strong>La factura (con sus datos datos fiscales) el vale original y
            odontograma, se subiran a el sistema para que proceda a darte el apoyo
            dental que corresponda por el concepto que le trabajaron. <br>
            <strong>6.-</strong> Llevar dos tantos de su credencial de elector antes de llegar a
            su cita programada<br>
            <strong>7.-</strong> Llevar dos tantos del vale dental antes de llegar a su cita
            programada<br><br>
            Cualquier duda estoy a tus órdenes, Tel. cel <strong>4423434684</strong><br><br>
            Saludos cordiales.
        </div>
    `;
    $("#seccion_pasos").html(butonn);
    $("#lentes").hide();
    $("#predial").hide();
    $("#dental").removeClass("col-md-4").addClass("col-md-10");
    // Verificar si la función ya ha sido inicializada
    var allowedExtensions = ["pdf", "PDF", "png", "PNG", "jpg", "JPG", "jpeg", "JPEG", "XML", "xml", "docx", "DOCX"];
    var cantidad = 2;
    if (!dropAreaInitialized_dental) {
        setTimeout(function () {
            initializeDropArea(appData.dropAreaId_area, appData.fileInputId_area, appData.fileListId_area, allowedExtensions, cantidad);
            dropAreaInitialized_dental = true; // Marcar como inicializada
        }, 1000);
    }
    setTimeout(function () {
        $("#loading-container").hide();
        // Verificamos si el array es null o no 
        if (letrasDentalesDocumentosAcorreguir !== null || letrasDentalesDocumentosAcorreguir < 0) {
            VerificacióndocDental();
        } else {
            //
        }
        $("#prestaciones_dental").DataTable().destroy();
        getPrestacion_lentes(appData.numEmp);
    }, 1000);
}
function verificaDocumentoCargado(campo_oculto, docDental_Temporal) {
    $("#file-list-dental").empty();
    $("#file-input-dental").val('');
    uploadedFiles = [];
    $("#loading-container").hide();
    uploadInProgress = false;
    // console.log(docDental_Temporal);
    $("#notificacion_deDocumentosCargados_Dental").modal('show');
    let xd = `
    <div class="row text-end">
        <div class="col-md-3 mt-2">
            <button type="button" onclick="volverSubirDoc('${campo_oculto}')" class="btn btn-danger" data-bs-dismiss="modal">
            <i class="bi bi-arrow-counterclockwise">Volver a subir</i></button>
        </div>
        <div class="col-md-4 mt-2">
            <button type="button" onclick="activaSiguienteArea('${campo_oculto}')" class="btn btn-primary" id="btn_activaSiguienteArea" data-bs-dismiss="modal" disabled>
            <i class="bi bi-check-lg"> Aceptar y continuar</i></button>
        </div>
    </div>`;
    $("#volverSubir_doc_dental").html(xd);
    // ---------------- 
    if (campo_oculto == "A") {
        documentos_dental_Vale = docDental_Temporal;
        $("#btn_activaSiguienteArea").prop("disabled", false);
        $("#encabezado_doc_dental").html('<i class="bi bi-check2-circle text-success">"¡Enhorabuena! Tu vale ha sido aceptado."</i>');
        $("#msj_Doc_dental").html("Su <strong>vale</strong> ha sido aceptado.");
        $("#msj_Doc_dental2").html("¿Desea <strong>continuar</strong> o <strong>volver</strong> a subir su vale?");
        // Insertar miniatura del documento
        if (documentos_dental_Vale.length > 0) {
            var documento = documentos_dental_Vale[0]; // Suponiendo que solo hay un documento en la lista
            var miniaturaHtml = '';
            if (documento.type.includes('image')) {
                // Si es una imagen, mostrar la miniatura de la imagen
                let miniaturavale = '<img src="' + URL.createObjectURL(documento) + '" alt="Miniatura del documento" style="max-width: 120px; max-height: 120px;">';
                miniaturaHtml = '' + miniaturavale + ' <a href="' + URL.createObjectURL(documento) + '" target="_blank" class="btn_dental_verDOC" title="Haz clic para ver el documento en una nueva ventana"><i class="bi bi-arrows-angle-expand btn-sm"></i></a>';
            } else if (documento.type === 'application/pdf') {
                let miniaturavale = '<embed src="' + URL.createObjectURL(documento) + '#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="300" height="180">';
                miniaturaHtml = '' + miniaturavale + ' <a href="' + URL.createObjectURL(documento) + '" target="_blank" class="btn_dental_verDOC" title="Haz clic para ver el documento en una nueva ventana" ><i class="bi bi-arrows-angle-expand btn-sm"></i></a>';
            }
            $("#msj_File").html(miniaturaHtml); // Insertar la miniatura después del texto
        } else {
            alerta("success", "Vale no ha sido ingresado");
        }
    } else if (campo_oculto == "B") {
        documentos_dental_Odontograma = docDental_Temporal;
        $("#btn_activaSiguienteArea").prop("disabled", false);
        // $("#input_vale").prop("checked", true);
        $("#encabezado_doc_dental").html('<i class="bi bi-check2-circle text-success"> Odontograma aceptado</i>');
        $("#msj_Doc_dental").html("Su <strong>odontograma</strong> ha sido aceptados");
        $("#msj_Doc_dental2").html("A continuación, por favor ingrese su <strong>XML</strong> y <strong>PDF</strong> de tus facturas dentales.");
        // Insertar miniatura del documento
        if (documentos_dental_Odontograma.length > 0) {
            var documento = documentos_dental_Odontograma[0];
            var miniaturaodontograma = '';
            if (documento.type.includes('image')) {
                // Si es una imagen, mostrar la miniatura de la imagen
                let odontograma = '<img src="' + URL.createObjectURL(documento) + '" alt="Miniatura del documento" style="max-width: 120px; max-height: 120px;">';
                miniaturaodontograma = '' + odontograma + ' <a href="' + URL.createObjectURL(documento) + '" target="_blank" class="btn_dental_verDOC" title="Haz clic para ver el documento en una nueva ventana" ><i class="bi bi-arrows-angle-expand btn-sm"></i></a>';
            } else if (documento.type === 'application/pdf') {
                // Si es un PDF, mostrar una miniatura de PDF (puede requerir una biblioteca de terceros como PDF.js)
                let odontograma = '<embed src="' + URL.createObjectURL(documento) + '#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="300" height="180">';
                miniaturaodontograma = '' + odontograma + ' <a href="' + URL.createObjectURL(documento) + '" target="_blank" class="btn_dental_verDOC" title="Haz clic para ver el documento en una nueva ventana" ><i class="bi bi-arrows-angle-expand btn-sm"></i></a>';
            }
            $("#msj_File").html(miniaturaodontograma);
        } else {
            alerta("info", "Odontograma no ha sido ingresado")
        }
    } else if (campo_oculto == "C") {
        documentos_dental_Fac = docDental_Temporal;
        // console.log(documentos_dental_Fac);
    } else if (letrasDentalesDocumentosAcorreguir != null) {
        documentos_dental_Fac = docDental_Temporal;
    }
    // ---------------- 
}
// funcion q activa la siguiente area una vez q el empleado acepte su doc 
function activaSiguienteArea(campo_oculto) {
    // porcentaje_barradental = Math.floor(porsentajeunico + porcentaje_barradental);
    // console.log(campo_oculto)
    if (campo_oculto.includes("C") && letrasDentalesDocumentosAcorreguir != null) {
        let contieneC1_o_cualquier_otra_C = letrasDentalesDocumentosAcorreguir.some(letra => letra.startsWith("C")); // Verificamos q dentro de el arrar se encuentra la letra C

        letrasDentalesDocumentosAcorreguir.shift(); // Eliminamos la pocicion 0 de el array

        if (contieneC1_o_cualquier_otra_C) {
            $("#titulo_form_dental").html('XML y PDF');
            $("#text_form_dental").html('factura(s)');
            $("#formatos_desc_dental").html('<strong>PDF</strong>, <strong>XML</strong>');
        } else {
            // $("#input_vale").prop("checked", true);
            // $("#input_xmlpdf").prop("checked", true);
            $("#titulo_form_dental").html('!Listo documentos cargados¡ - Area bloqueada');
            $("#text_form_dental").html('!Listo documentos cargados¡ - Area bloqueada');
            $("#formatos_desc_dental").html('!Listo documentos cargados¡ - Area bloqueada');
        }
        // console.log(contieneC1_o_cualquier_otra_C);
        verificamos_inputs();
        $("#input_odontograma").prop("checked", true);

        array_uuid_dental.push(UUID_XML_lentes);
        // --- 
        for (var i = 0; i < documentos_dental_Fac.length; i += 2) {
            var parDeDocumentos = [];
            parDeDocumentos.push(documentos_dental_Fac[i]);
            if (documentos_dental_Fac[i + 1]) {
                parDeDocumentos.push(documentos_dental_Fac[i + 1]);
            }
            arrayFacturasDental.push(parDeDocumentos);
        }
        if (letrasDentalesDocumentosAcorreguir.length === 0) {
            // $("#input_vale").prop("checked", true);
            $("#input_xmlpdf").prop("checked", true);
            // $("#input_odontograma").prop("checked", true);
            $("#titulo_form_dental").html('!Listo documentos cargados¡ - Area bloqueada');
            $("#text_form_dental").html('!Listo documentos cargados¡ - Area bloqueada');
            $("#formatos_desc_dental").html('!Listo documentos cargados¡ - Area bloqueada');
            $("#dasbilitar").hide();
        }
    } else {
        if (campo_oculto == "A") {
            $("#input_vale").prop("checked", true);
            $("#titulo_form_dental").html('Odontograma');
            $("#text_form_dental").html('Odontograma');
            $("#formatos_desc_dental").html('<strong>PDF</strong>, <strong>WORD</strong>, <strong>PNG</strong>, <strong>JPG</strong> o <strong>JPEG</strong>');
            $("#campo_oculto").val("B");
        } else if (campo_oculto == "B") {
            $("#input_odontograma").prop("checked", true);
            $("#titulo_form_dental").html('XML y PDF');
            $("#campo_oculto").val("C");
            $("#text_form_dental").html('factura(s)');
            $("#formatos_desc_dental").html('<strong>PDF</strong>, <strong>XML</strong>');
        } else if (campo_oculto == "C") {
            $("#input_xmlpdf").prop("checked", true);
            $("#titulo_form_dental").html('XML y PDF');
            $("#campo_oculto").val("C");
            $("#text_form_dental").html('factura(s)');
            $("#formatos_desc_dental").html('<strong>PDF</strong>, <strong>XML</strong>');
            verificamos_inputs();
            // --- 
            contadorr = contadorr + 1;
            $("#cant_xmlpdf").html(contadorr);
            // console.log(UUID_XML_lentes);
            array_uuid_dental.push(UUID_XML_lentes);
            for (var i = 0; i < documentos_dental_Fac.length; i += 2) {
                var parDeDocumentos = [];
                parDeDocumentos.push(documentos_dental_Fac[i]);
                if (documentos_dental_Fac[i + 1]) {
                    parDeDocumentos.push(documentos_dental_Fac[i + 1]);
                }
                arrayFacturasDental.push(parDeDocumentos);
            }

            // console.log(arrayFacturasDental);
        }
    }
}
// funcion q limpia las variables de almacenamientos de los doc cargados para volver a subir 
function volverSubirDoc(campo_oculto) {
    if (campo_oculto == "A") {
        documentos_dental_Vale = "";
    } else if (campo_oculto == "B") {
        documentos_dental_Odontograma = "";
    } else if (campo_oculto == "C") {
        documentos_dental_Fac = "";
    } else if (campo_oculto == "R") {
        // console.log(letrasDentalesDocumentosAcorreguirV2);
        // console.log(letrasDentalesDocumentosAcorreguir);
        $("#envio_de_docDental").html('');
        array_uuid_dental = [];
        if (letrasDentalesDocumentosAcorreguirV2 == null) {
            // alerta("info", "no");
            documentos_dental_Vale = "";
            documentos_dental_Odontograma = "";
            documentos_dental_Fac = "";
            arrayFacturasDental = [];
            $("#input_vale").prop("checked", false);
            $("#input_odontograma").prop("checked", false);
            $("#input_xmlpdf").prop("checked", false);
            $("#campo_oculto").val("A");
            contadorr = 0;
            $("#cant_xmlpdf").html(contadorr);
            // ----
            $("#titulo_form_dental").html('Vale');
            $("#text_form_dental").html('Vale');
            $("#formatos_desc_dental").html('<strong>PDF</strong>, <strong>PNG</strong>, <strong>JPG</strong> o <strong>JPEG</strong>');

        } else {
            // alerta("success", "yes");
            documentos_dental_Vale = "";
            documentos_dental_Odontograma = "";
            documentos_dental_Fac = "";
            arrayFacturasDental = [];
            $("#dasbilitar").show();
            letrasDentalesDocumentosAcorreguir = [];
            letrasDentalesDocumentosAcorreguir = [...letrasDentalesDocumentosAcorreguirV2];
            // console.log("letrasss: " + letrasDentalesDocumentosAcorreguir);
            setTimeout(function () {
                VerificacióndocDental()
            }, 1000);
        }
    }
}
// Verifica si los inputs tipo check estan activos o no  
function verificamos_inputs() {
    // console.log(letrasDentalesDocumentosAcorreguirV2);
    let campo_oculto = "R";
    if (letrasDentalesDocumentosAcorreguir != null && letrasDentalesDocumentosAcorreguir.length === 0) {
        //
        // console.log("Todos los inputs están chequeados.");
        // Cuando quieras ocultar la barra de progreso, agrega la clase 'fadeOut'
        $("#brra_progreso").addClass("fadeOut");
        setTimeout(function () {
            $("#envio_de_docDental").html(`
            <div class="btn-group " role="group" aria-label="Botones">
                <button type="button" onclick="volverSubirDoc('${campo_oculto}')" title="Haz clic para eliminar y subir tus Documentos"  style="opacity: 0.9;" class="btn" id="btn_cancelarSubirNuevamente"><i class="bi bi-arrow-counterclockwise"></i></button>
                <button type="button" onclick="btn_Confirma_envio_Documentos()" id="btn_prEnvio" class="btn ms-2"  style="opacity: 1;"><i class="bi bi-arrow-up-right"> Enviar Documentos</i></button>
             </div>
            `);
        }, 1500);
    } else {
        let valeChecked = $("#input_vale").prop("checked");
        let odontogramaChecked = $("#input_odontograma").prop("checked");
        let xmlpdfChecked = $("#input_xmlpdf").prop("checked");
        // Verificar si todos los inputs están chequeados
        if (valeChecked && odontogramaChecked && xmlpdfChecked) {
            // console.log("Todos los inputs están chequeados.");
            // Cuando quieras ocultar la barra de progreso, agrega la clase 'fadeOut'
            $("#brra_progreso").addClass("fadeOut");
            setTimeout(function () {
                $("#envio_de_docDental").html(`
                <div class="btn-group " role="group" aria-label="Botones">
                    <button type="button" onclick="volverSubirDoc('${campo_oculto}')" title="Haz clic para eliminar y subir tus Documentos"  style="opacity: 0.9;" class="btn" id="btn_cancelarSubirNuevamente"><i class="bi bi-arrow-counterclockwise"></i></button>
                    <button type="button" onclick="btn_Confirma_envio_Documentos()" id="btn_prEnvio" class="btn ms-2"  style="opacity: 1;"><i class="bi bi-arrow-up-right"> Enviar Documentos</i></button>
                </div>
            `);
            }, 1500);
        } else {
            // console.log("No todos los inputs están chequeados.");
        }
    }
}
// Modal para mostrar todos los documentos cargados para verificar si, si los envia o no ...
function btn_Confirma_envio_Documentos() {
    // console.log(array_uuid_dental);
    let campo_oculto = "R";
    $("#msj_File").html("");
    $("#msj_Doc_dental").html("");
    $("#msj_Doc_dental2").html("");
    $("#notificacion_deDocumentosCargados_Dental").modal('show');
    $("#encabezado_doc_dental").html('<i class="bi bi-check2-circle text-success">"¡Documentos Cargados!"</i>');
    let xd = `
    <div class="row text-end">
        <div class="col-md-3 mt-2">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">
            Seguir subiendo</button>
        </div>
        <div class="col-md-3 mt-2">
            <button type="button" onclick="volverSubirDoc('${campo_oculto}')" class="btn btn-danger " data-bs-dismiss="modal">
            <i class="bi bi-arrow-repeat"> Volver a subir</i></button>
        </div>
        <div class="col-md-4 mt-2">
            <button type="button" onclick="enviar_DocsDental()" class="btn btn-primary" data-bs-dismiss="modal">
            Aceptar y enviar documentos</button>
        </div>
    </div>`;
    $("#volverSubir_doc_dental").html(xd);
    let text_doc = `
    <div class="row">
        <div class="col-md-5">
            <p class="text-bold"> Vale</p>
            <span id="vale_envio"></span>
        </div>
        <div class="col-md-5">
            <p class="text-bold"> Odontograma</p>
            <span id="odonto_envio"></span>
        </div>
        <hr class="mt-">
    </div>
    <div class="row" id="facturas">
    </div>
    `;
    $("#msj_File").html(text_doc);
    // ----------- 
    if (documentos_dental_Vale != null) {
        var documento = documentos_dental_Vale[0]; // Suponiendo que solo hay un documento en la lista
        var miniaturaHtml = '';

        if (documento.type.includes('image')) {
            // Si es una imagen, mostrar la miniatura de la imagen
            let miniaturavale = '<img src="' + URL.createObjectURL(documento) + '" alt="Miniatura del documento" style="max-width: 120px; max-height: 120px;">';
            miniaturaHtml = '<a href="' + URL.createObjectURL(documento) + '" target="_blank">' + miniaturavale + '<i class="bi bi-arrows-angle-expand btn-sm"><p>ver</p></i></a>';
        } else if (documento.type === 'application/pdf') {
            let miniaturavale = '<embed src="' + URL.createObjectURL(documento) + '#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="120" height="120">';
            miniaturaHtml = '<a href="' + URL.createObjectURL(documento) + '" target="_blank">' + miniaturavale + ' <i class="bi bi-arrows-angle-expand btn-sm"><p>ver</p></i></a>';
        }
        $("#vale_envio").html(miniaturaHtml); // Insertar la miniatura después del texto
    } else {
        // alerta("info", "Vale no ha sido ingresado");
    }
    if (documentos_dental_Odontograma != null) {
        var documento = documentos_dental_Odontograma[0];
        var miniaturaodontograma = '';
        if (documento.type.includes('image')) {
            // Si es una imagen, mostrar la miniatura de la imagen
            let odontograma = '<img src="' + URL.createObjectURL(documento) + '" alt="Miniatura del documento" style="max-width: 120px; max-height: 120px;">';
            miniaturaodontograma = '<a href="' + URL.createObjectURL(documento) + '" target="_blank">' + odontograma + '<i class="bi bi-arrows-angle-expand btn-sm"><p>ver</p></i></a>';
        } else if (documento.type === 'application/pdf') {
            // Si es un PDF, mostrar una miniatura de PDF (puede requerir una biblioteca de terceros como PDF.js)
            let odontograma = '<embed src="' + URL.createObjectURL(documento) + '#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="120" height="120">';
            miniaturaodontograma = '<a href="' + URL.createObjectURL(documento) + '" target="_blank">' + odontograma + ' <i class="bi bi-arrows-angle-expand btn-sm"><p>ver</p></i></a>';
        }
        $("#odonto_envio").html(miniaturaodontograma);
    } else {
        // alerta("info", "Odontograma no ha sido ingresado")
    }
    // ------------------------------ 
    if (arrayFacturasDental.length > 0 && arrayFacturasDental != null) {
        var facturaHtml = '';
        let cont = 0;
        arrayFacturasDental.forEach(function (facturaArray) {
            if (facturaArray.length > 0) {
                cont++;
                var miniaturasHtml = '';
                // Agregar el nombre de la factura
                facturaHtml += `<h6 class="text-bold">Factura ${cont} -------</h6>`;
                // Iterar sobre los documentos asociados a esta factura
                facturaArray.forEach(function (documento) {
                    if (documento.type === 'application/pdf') {
                        // Si es un PDF, agregar una miniatura de PDF con un enlace para abrir en una nueva ventana
                        miniaturasHtml += `
                        <div class="col-md-4">
                            <a href="${URL.createObjectURL(documento)}" target="_blank">
                                <embed src="${URL.createObjectURL(documento)}#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="180" height="auto">
                                <i class="bi bi-arrows-angle-expand btn-sm"></i>
                            </a>
                        </div>`;
                    } else if (documento.type === 'text/xml') {
                        // Si es un XML, agregar una miniatura genérica y el nombre del archivo con un enlace para abrir en una nueva ventana
                        miniaturasHtml += `
                        <div class="col-md-3">
                            <a href="${URL.createObjectURL(documento)}" target="_blank">
                                <div class="card">
                                    <div class="card-body">
                                        <img src="${appData.icoXML}" class="card-img-top ms-5" style="width: 40px;">
                                        <div style="font-size: 9px">${documento.name}</div>
                                        <i class="bi bi-arrows-angle-expand btn-sm"></i>
                                    </div>
                                </div>
                            </a>
                        </div>`;
                    }
                });
                facturaHtml += `<div class="row mt-2">${miniaturasHtml}</div>`;
            }
        });
        $("#facturas").append(facturaHtml);
    } else {
        // alerta("info", "Factura no ingresada");
    }

}
function mostrar_info_XML_dental(response, docDental_Temporal, campo_oculto) {
    verificaDocumentoCargado(campo_oculto, docDental_Temporal);
    $("#msj_File").html("");
    $("#msj_Doc_dental2").html("");
    // console.log(datos_XML_leido);
    // alerta("success","hhh");
    // #info_xml = id del body de la modal donde se van a mostrar los datos de la factura ClaveProdServ
    // $("#msj_Doc_dental").empty();
    let info_xml = response.informacionFactura;
    let info_xml_impuesto = response.informacionImpuestosAll;
    let info_emisor = response.informacionEmisor;
    let info_receptor = response.informacionReceptor;
    let informacionConceptos = response.informacionConceptos;
    let iinformacionTFD = response.informacionTFD;
    let cont = 1;
    // Buscar el elemento con el id "info_xml"
    let fileList = $("#msj_Doc_dental");
    // Crear un contenedor para la información
    let preview = $("<div class='row'></div>");
    let re = info_emisor.rfc;
    let rr = info_receptor.rfc;
    let tt = info_xml.total;
    let id = iinformacionTFD.uuid;
    UUID_XML_lentes = iinformacionTFD.uuid;
    // console.log(iinformacionTFD.uuid);
    // console.log(re, rr, tt, id);
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------
    // Obtener la fecha de la factura
    let fecha_factura = new Date(info_xml.fecha);
    // console.log(fecha_factura);
    // Obtener el año de la fecha de la factura
    let año_factura = fecha_factura.getFullYear();
    // Obtener el año actual
    let año_actual = new Date().getFullYear();
    // Comparar los años
    if (año_factura == año_actual) {
        // alerta("info","hhh");
        // Quita todas las comas de la cadena
        let nombreEmpleadoInicioSecion_formateado = nombreEmpleadoInicioSecion.replace(/,/g, '');

        // Dividir la cadena en palabras
        let palabrasNombreEmpleado = nombreEmpleadoInicioSecion_formateado.split(' ');

        // Variable para indicar si se encontro la palabra
        let seEncontroPalabra = palabrasNombreEmpleado.every(function (palabra) {
            // Verificar si la palabra esta presente en info_receptor.nombre
            return info_receptor.nombre.includes(palabra);
        });
        // console.log('Coincidencia exacta:', seEncontroPalabra);
        // Verificar si se encontró al menos una palabra
        // if (!seEncontroPalabra) {
        //     $("#loading-container").hide();
        //     preview.html(
        //         `<div id="letra" class='col-md-10'><p><strong>El XML está a nombre de una persona distinta.</strong></p></div>`
        //     );
        // } else {
            // Agregar la información de factura al contenedor
            preview.html(`
                    <div class='col-md-10 d-flex align-items-center mt-3'>
                        <p class="mb-0"><strong class="text-secondary">1°_Validación ante el SAT </strong></p>
                        <i id="help-satIcon" class="bi bi-question-circle ms-2 help-icon"></i>
                        <hr class="flex-grow-1 me-2">
                        <div class="help-message" id="help-sat">
                            <p> <strong>1°_Validación ante el SAT</strong><br>
                                Estos campos representan información sobre la validación ante el SAT (Servicio de Administración Tributaria), permitiéndonos verificar el estado actual del XML.
                                <br>
                                <p><img class="ms-2" width="100" src="${appData.img_alertas_activo_sat}"></p>
                                <p><img class="ms-2" width="110" src="${appData.img_alertas_canselado_sat}"></p>
                                <p><img class="ms-2" width="140" src="${appData.img_alertas_NOconexion_sat}"></p>
                                <p><img class="ms-2" width="140" src="${appData.img_alertas_NOencontrado_sat}"></p>
                            </p>
                        </div>
                    </div>
                    <div class='col-md-4 ms-2 mt-2'><p><strong>Estatus: </strong><span id="estado_xml_demntal" class="loading-animation"></span></p></div>
                    <div class='col-md-7 ms-2 mt-2'><p><strong>Descripción: </strong><span id="codigoEstatus_xml_dental" class="loading-animation"></span></p></div>
                    <br>
                    <div class='col-md-10 d-flex align-items-center mt-3'>
                        <p class="mb-0"><strong class="text-secondary">2°_Cantidades</strong></p>
                        <i id="help-cantidadesIcon" class="bi bi-question-circle ms-2 help-icon"></i>
                        <hr class="flex-grow-1 me-2">
                        <div class="help-message" id="help-cantidades">
                            <p> <strong>2°_Cantidades</strong><br>
                            En esta sección, presentamos las cifras clave del XML:
                            <strong>Subtotal</strong>: La suma de los conceptos.
                            <strong>IVA</strong> (Impuesto al Valor Agregado): El impuesto asociado.
                            <strong>Total</strong>: La cifra total a pagar.
                            Estos valores reflejan la esencia financiera del documento y cumplen con las normativas del SAT.
                            </p>
                        </div>
                    </div>
                    <div class='col-md-3 ms-2 mt-2'><p><strong><i class="bi bi-cash me-1 h6"></i>Subtotal: </strong>$${formatNumber(
                info_xml.subtotal
            )}</p></div>
                    <div class='col-md-3 ms-2 mt-2'><p><strong><i class="bi bi-graph-up me-1 h6"></i>IVA: </strong>$${formatNumber(
                info_xml_impuesto.TotalImpuestosTrasladados
            )}</p></div>
                    <div class='col-md-3 ms-2 mt-2'><p><strong><i class="bi bi-cash-stack me-1 h6"></i>Total: </strong>$${formatNumber(
                info_xml.total
            )}</p></div>
                    <br>
                    <div class='col-md-10 d-flex align-items-center mt-3'>
                        <p class="mb-0"><strong class="text-secondary">3°_Datos del XML</strong></p>
                        <i id="help-datosXMLIcon" class="bi bi-question-circle ms-2 help-icon"></i>
                        <hr class="flex-grow-1 me-2">
                        <div class="help-message" id="help-datosXML">
                            <p> <strong>3°_Datos del XML</strong><br>
                            En esta sección, encontrarás detalles esenciales sobre el emisor y el receptor del XML. Los datos incluyen nombres, RFC, entre otros. Revisa esta información cuidadosamente para asegurar la correcta emisión y recepción del comprobante fiscal.
                            </p>
                        </div>
                    </div>
                    <div id="letra" class='col-md-6 mt-3'><p><strong><i class="bi bi-calendar-event me-1 h6"></i>Fecha: </strong>${info_xml.fecha
                }</p></div>
                    <div id="letra" class='col-md-6 mt-3'><p><strong><i class="bi bi-person me-1 h6"></i>Nombre emisor: </strong>${info_emisor.nombre
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
            // console.log(informacionConceptos);
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
                        // console.log(concepto.ClaveProdServ);
                        // Si la promesa se resolvió y el status es 200, la clave fue encontrada
                        if (response.status == 200) {
                            return 'Si';
                        } else if (response.status == 300) {
                            // Si el status es diferente de 200, la clave no fue encontrada
                            return 'No encontrada';
                        } else if (response.status == 400) {
                            // Si el status es diferente de 200, la clave no fue encontrada
                            return 'No';
                        }
                    } catch (error) {
                        console.log("Error al obtener ClaveSAT");
                        return 'No';
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
                <div id="letra" class='col-md-6'><p><strong><i class="bi bi-sunglasses"> Corresponde Dientes: </i></strong>${resultados[i]}</p></div>
                `);
                }
            });
            setTimeout(function () {
                // -------------
                const helpIconSAT = document.getElementById("help-satIcon");
                const helpMessageSAT = document.getElementById("help-sat");
                manejarAyuda(helpIconSAT, helpMessageSAT);
                // -------------
                const helpcantidadesIcon = document.getElementById("help-cantidadesIcon");
                const helpcantidades = document.getElementById("help-cantidades");
                manejarAyuda(helpcantidadesIcon, helpcantidades);
                // ----------------
                const helpdatosXMLIcon = document.getElementById("help-datosXMLIcon");
                const helpdatosXML = document.getElementById("help-datosXML");
                manejarAyuda(helpdatosXMLIcon, helpdatosXML);
                // ----------------
                realizarConsultaSOAP_dental(re, rr, tt, id);
            }, 1000);
        // }
    } else {
        // $("#envio_xml_pdf_validados").prop("disabled", true);
        $("#loading-container").hide();
        preview.html(
            `<div id="letra" class='col-md-10'><p><strong>La factura ingresada no pertenece a el año actual de ${año_actual}</strong></p></div>`
        );
    }
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------
    // Agregar el contenedor al elemento con el id "info_xml"
    fileList.html(preview);
    // Función para formatear números a dos decimales
}
function realizarConsultaSOAP_dental(re, rr, tt, id) {
    $("#estado_xml_demntal").addClass("loading-animation");
    $("#codigoEstatus_xml_dental").addClass("loading-animation");
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
            $("#estado_xml_demntal").removeClass("loading-animation");
            $("#codigoEstatus_xml_dental").removeClass("loading-animation");
            $("#estado_xml_demntal").empty();
            $("#codigoEstatus_xml_dental").empty();
            // console.log(response.result);
            // Parsear la respuesta XML
            var xmlDoc = $.parseXML(response.result);
            var $xml = $(xmlDoc);
            // Obtener los valores deseados
            var codigoEstatus = $xml.find("a\\:CodigoEstatus").text();
            let estado = $xml.find("a\\:Estado").text();
            switch (estado) {
                case "Cancelado":
                    var iconn =
                        '<i class="bi bi-exclamation-circle ms-1 text-warning h5 gray-background"></i>';
                    $("#loading-container").hide();
                    break;
                case "Vigente":
                    var iconn =
                        '<i class="bi bi-check-circle ms-1 text-success h5 gray-background"></i>';
                    setTimeout(function () {
                        $("#loading-container").hide();
                        var status = '1';
                        // alerta("info", "Solo se permiten dos archivos.");  <button type="button"  class="btn btn-primary">Si, si enviar documentos</button>
                        var encabezado_msj_envio = `<i class="bi bi-check2-all"> ¡XML validado!</i>`;
                        $("#encabezado_doc_dental").html(encabezado_msj_envio);
                        $("#btn_activaSiguienteArea").prop("disabled", false); //boton en area dental

                    }, 1200);
                    break;
                case "No Encontrado":
                    var iconn =
                        '<i class="bi bi-exclamation-triangle ms-1 text-danger h5 gray-background"></i>';
                    $("#loading-container").hide();
                    setTimeout(function () {
                        $("#reloat_SOPA").prop("disabled", false);
                    }, 1000);
                    break;
            }
            $("#estado_xml_demntal").append(estado, iconn);
            $("#codigoEstatus_xml_dental").append(codigoEstatus);
        },
        error: function (error) {
            if (error.statusText == "timeout") {
                $("#estado_xml_demntal").append(
                    "Error de Conexión",
                    '<i class="bi bi-exclamation-triangle ms-1 text-danger h5 gray-background"></i>'
                );
                $("#codigoEstatus_xml_dental").append(
                    "Error de Conexión",
                    '<i class="bi bi-exclamation-triangle ms-1 text-danger h5 gray-background"></i>'
                );
                // setTimeout(function () {
                $("#loading-container").hide();
                // alerta("info", "Solo se permiten dos archivos.");  <button type="button"  class="btn btn-primary">Si, si enviar documentos</button>
                var encabezado_msj_envio = `<i class="bi bi-x-lg"></i> ¡Error de conexión XML no pudo ser validado ante el sat!`;
                $("#encabezado_doc_dental").html(encabezado_msj_envio);
                $("#btn_activaSiguienteArea").prop("disabled", false); //boton en area dental
            } else {
                $("#estado_xml_demntal").append(
                    "Error de Conexión",
                    '<i class="bi bi-exclamation-triangle ms-1 text-danger h5 gray-background"></i>'
                );
                $("#codigoEstatus_xml_dental").append(
                    "Error de Conexión",
                    '<i class="bi bi-exclamation-triangle ms-1 text-danger h5 gray-background"></i>'
                );
                // setTimeout(function () {
                $("#loading-container").hide();
                // alerta("info", "Solo se permiten dos archivos.");  <button type="button"  class="btn btn-primary">Si, si enviar documentos</button>
                var encabezado_msj_envio = `<i class="bi bi-x-lg"></i> ¡Error de conexión XML no pudo ser validado ante el sat!`;
                $("#encabezado_doc_dental").html(encabezado_msj_envio);
                $("#btn_activaSiguienteArea").prop("disabled", false); //boton en area dental

            }
        },
        complete: function () {
            $("#estado_xml_demntal").removeClass("loading-animation");
            $("#codigoEstatus_xml_dental").removeClass("loading-animation");
        },
    });
}
function enviar_DocsDental() {
    // array_uuid_dental.push('CFCF52F9-6B59-4C89-B1A0-45F008ADA97D/etorr');
    // $("#loading-container").show();
    // console.log(documentos_dental_Vale);
    // console.log(documentos_dental_Odontograma);

    var formData = new FormData();
    // Agregar CSRF token al formData
    formData.append("_token", $("input[name='_token']").val());
    formData.append("EmpNum", appData.numEmp);

    // Verificar si documentos_dental_Vale es un array y tiene al menos un elemento
    if (Array.isArray(documentos_dental_Vale) && documentos_dental_Vale.length > 0) {
        formData.append("vale", documentos_dental_Vale[0]);
    } else {
        formData.append("vale", null);
    }

    // Verificar si documentos_dental_Odontograma es un array y tiene al menos un elemento
    if (Array.isArray(documentos_dental_Odontograma) && documentos_dental_Odontograma.length > 0) {
        formData.append("odontograma", documentos_dental_Odontograma[0]);
    } else {
        formData.append("odontograma", null);
    }

    // Verificar si arrayFacturasDental es un array y tiene al menos un elemento
    if (Array.isArray(arrayFacturasDental) && arrayFacturasDental.length > 0) {
        // Recorrer arrayFacturasDental y agregar cada conjunto de archivos al formData  
        for (var i = 0; i < arrayFacturasDental.length; i++) {
            var conjuntoArchivos = arrayFacturasDental[i];
            for (var j = 0; j < conjuntoArchivos.length; j++) {
                formData.append(`factura_${i}_${j}`, conjuntoArchivos[j]);
            }
        }
    } else {
        formData.append(`factura`, null);
    }

    formData.append("datos", letrasDentalesDocumentosAcorreguirV2);
    formData.append("UUIDs", array_uuid_dental);
    // console.log(letrasDentalesDocumentosAcorreguirV2);
    // console.log(letrasDentalesDocumentosAcorreguir);
    $.ajax({
        url: insert_datosRoute,
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.status === 200) {
                alerta("success", "Archivos enviados correctamente");
                $("#loading-container").hide();
                actualizar();
            }
            if (response.status === 400) {
                alerta("info", response.msj);
            }
            if (response.status == 700) {
                setTimeout(function () {
                    cerrarSesion();
                }, 1000);
                reject("Sesión cerrada");
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
            console.log(status);
            console.log(error);
        }

    });
}
// ----------------------------- 
// funcion q verivica los documentos q debo de volver a subir   
function VerificacióndocDental() {
    if (letrasDentalesDocumentosAcorreguir != null) {
        // console.log(letrasDentalesDocumentosAcorreguir);
        $("#btn_doc_Asubir").show();

        let contieneA = letrasDentalesDocumentosAcorreguir.includes("A"); // Verificamos q dentro de el arrar se encuentra la letra A
        let contieneC1_o_cualquier_otra_C = letrasDentalesDocumentosAcorreguir.some(letra => letra.startsWith("C")); // Verificamos q dentro de el arrar se encuentra la letra C

        // Limpiar el contenido del div
        $('#seccion_doc_Asubir').empty();
        // Iterar sobre el array letrasDentalesDocumentosAcorreguirV2
        letrasDentalesDocumentosAcorreguirV2.forEach(function (valor) {
            // Verificar si el valor comienza con 'C'
            if (valor.startsWith('C')) {
                // Si comienza con 'C', extraer el número después de 'C'
                let numero = valor.substring(1);
                // Agregar el texto al div
                $('#seccion_doc_Asubir').append(`<p>Revisa tu Factura ${numero} y vuelve a subirla. Consulta tu <strong>correo electrónico</strong> para obtener más información.</p>`);
            } else {
                $('#seccion_doc_Asubir').append(`<p>Por favor, revisa tus documentos y vuelve a subirlos nuevamente. Consulta tu <strong>correo electrónico</strong> para obtener más información.</p>`);
            }
        });
        if (contieneA) {
            letrasDentalesDocumentosAcorreguir.shift(); // Eliminamos la pocicion 0 de el array
            letrasDentalesDocumentosAcorreguir = null; // limpiamos el array
            letrasDentalesDocumentosAcorreguirV2 = null; // limpiamos el array
            $("#notificacion_documentos_guardados").modal('show');
            $("#encabezado_doc").html('<i class="bi bi-check2-circle text-danger"> Vale no aceptado</i>');
            $("#msj_doc").html("Por favor, revisa tus documentos y vuelve a subirlos nuevamente. Consulta tu <strong>correo electrónico</strong> para obtener más información.");
            $("#titulo_form_dental").html('Vale');
            $("#text_form_dental").html('Vale');
            // $("#campo_oculto").val("B");
            $("#formatos_desc_dental").html('<strong>PDF</strong>, <strong>PNG</strong>, <strong>JPG</strong> o <strong>JPEG</strong>');
            $("#input_vale").prop("checked", false);
            $("#input_odontograma").prop("checked", false);
            $("#input_xmlpdf").prop("checked", false);

        }
        if (contieneC1_o_cualquier_otra_C) {
            $("#notificacion_documentos_guardados").modal('show');
            $("#encabezado_doc").html('<i class="bi bi-check2-circle text-danger"> Factura no aseptado</i>');
            $("#msj_doc").html("Por favor, vuelve a subir todos tus </strong>Facturas</strong>.");
            $("#titulo_form_dental").html('PDF y XML');
            $("#text_form_dental").html('PDF y XML');
            // $("#campo_oculto").val("B");
            $("#formatos_desc_dental").html('<strong>PDF</strong>, <strong>XML</strong>');
            $("#input_xmlpdf").prop("checked", false);
            $("#input_vale").prop("checked", true);
            $("#input_odontograma").prop("checked", true);
        }
    } else {
        // alerta("danger", "Array Dental Esta vacio y intentas hacer uso de el.. ");
    }
}
function ModalParasolicitarPrestacionDental() {
    $("#form_doc_dental").hide();
    $("#carga_doc_dental").hide();
    $("#solicitar_prestacionButton_dental").hide();
    $("#body_doc_dental").show();
    $("#area_btn_solicitar_prestacionButton_dental").empty();
    var butons = `
        <button type="button" class="btn btn-info mt-2 col-md-4"
            data-bs-toggle="modal" data-bs-target="#modal_solicitar_prestacion_dental"
            id="solicitar_prestacionButton_dental">
            <i class="bi bi-box-arrow-in-right"></i> Solicitar Prestación
        </button>
        `;
    $("#area_btn_solicitar_prestacionButton_dental").append(butons);
    $("#lentes").hide();
    $("#predial").hide();
    $("#dental").removeClass("col-md-4").addClass("col-md-10");
    setTimeout(function () {
        $("#prestaciones_dental").DataTable().destroy();
        getPrestacion_lentes(appData.numEmp);
    }, 1500);
}
function RegresarDental() {
    verificaPrestaciones();
    clearFileList();
    $("#lugarTabla").empty();
    $("#carga_doc_dental").show();
    $("#solicitar_prestacionButton_dental").show();
    $("#body_doc_dental").hide();
    $("#lentes").show();
    $("#predial").show();
    $("#dental").removeClass("col-md-10").addClass("col-md-4");
    $('title').text('Prestacion');
}
// ----------- 
function descarga2PDF() {
    creacion_vale();
    setTimeout(function () {
        crear_odontograma();
    }, 2000);
}
// -----------
function Area_vale() {
    $("#input_xmlpdf").prop("checked", true);
    $("#input_vale").prop("checked", false);
    $("#input_odontograma").prop("checked", true);
    $("#notificacion_documentos_guardados").modal('show');
    $("#encabezado_doc").html('<i class="bi bi-check2-circle text-danger">Vale no aceptado</i>');
    $("#msj_doc").html("Su vale no ha sido aceptado. Por favor buelva a suibirlo.");
    $("#titulo_form_dental").html('Odontograma');
    $("#text_form_dental").html('Odontograma');
    $("#formatos_desc_dental").html('<strong>PDF</strong>, <strong>WORD</strong>, <strong>PNG</strong>, <strong>JPG</strong> o <strong>JPEG</strong>');
}
