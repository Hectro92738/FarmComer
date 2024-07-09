$(document).ready(function () {
    // Obtén los elementos de iconos y mensajes
    const helpIcon = document.getElementById("help-icon");
    const helpMessage = document.getElementById("help-message");
    manejarAyuda(helpIcon, helpMessage);

    $('#modal-email').on('input', function () {
        var emailValue = $(this).val().trim();
        var atIndex = emailValue.indexOf('@');
        // Verificar si el "@" está presente y está al final del campo
        if (atIndex !== -1 && atIndex === emailValue.length - 1) {
            $(this).val(emailValue + 'uteq.edu.mx');
            // $(this).addClass('text-success'); 
        }
    });
    var formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    $(document).on("submit", "#form_token", function (e) {
        e.preventDefault();
        borra_mensajes();
        if ($("#modal-email").val() == "") {
            error_formulario("modal-email", "El campo no puede ir vacío");
            return false;
        }
        if (!formatoCorreo.test($("#modal-email").val())) {
            error_formulario("modal-email", "Formato Incorrecto de Email");
            return false;
        }
        $("#loading-container").show();
        $.ajax({
            url: verificaEmailExisteRoute,
            method: "POST",
            dataType: "json",
            data: {
                _token: $('input[name="_token"]').val(),
                email: $("#modal-email").val(),
                fecha: fechaActual(),
                hora: HoraActual(),
            },
            timeout: 10000,
            success: function (response) {
                $("#loading-container").hide();
                $("#encabezado_email").empty();
                $("#msj_email").empty();
                if (response.status == 200) {
                    var encabezado = `Mensaje enviado`;
                    var msj_email = `Se acaba de enviar un correo a tu dirección institucional con las
                    instrucciones para recuperar tu contraseña. Por favor, verifica tu bandeja de entrada y
                    sigue los pasos indicados para restablecer tu acceso. Si no encuentras el mensaje,
                    revisa también la carpeta de correo no deseado. ¡Gracias!`;
                    $("#encabezado_email").append(encabezado);
                    $("#msj_email").append(msj_email);
                    $("#notificacion_correo_enviado").modal("show");
                    $("#btn_borrarr").removeClass("btn-danger").addClass("btn-primary");
                } else if (response.status == 400) {
                    var encabezado = `Correo no encontrado`;
                    var msj_email = `Lamentablemente, no hemos encontrado ningún registro 
                    asociado al correo electrónico que ingresaste. Por favor, verifica que 
                    la dirección de correo sea la correcta. Si continúas experimentando problemas
                    o si crees que ha habido un error, no dudes en ponerte en contacto con 
                    nuestro equipo de soporte para recibir asistencia personalizada.`;
                    $("#encabezado_email").append(encabezado);
                    $("#msj_email").append(msj_email);
                    $("#notificacion_correo_enviado").modal("show");
                    $("#btn_borrarr").removeClass("btn-primary").addClass("btn-danger");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (textStatus === "timeout") {
                    $("#loading-container").hide();
                    $("#encabezado_email").empty();
                    $("#msj_email").empty();
                    var encabezado = `Mensaje enviado`;
                    var msj_email = `Se acaba de enviar un correo a tu dirección institucional con las
                    instrucciones para recuperar tu contraseña. Por favor, verifica tu bandeja de entrada y
                    sigue los pasos indicados para restablecer tu acceso. Si no encuentras el mensaje,
                    revisa también la carpeta de correo no deseado. ¡Gracias!`;
                    $("#encabezado_email").append(encabezado);
                    $("#msj_email").append(msj_email);
                    $("#notificacion_correo_enviado").modal("show");
                    $("#btn_borrarr").removeClass("btn-danger").addClass("btn-primary");
                }
            },
            complete: function () {
                $("#loading-container").hide();
            },
        });
    });
});
// function envioURL() {
//     $.ajax({
//         //http://172.31.192.78/Recuperacion_password/envioGmail.php
//         //http://localhost/envio/envioGmail.php
//         url: "http://localhost/Recuperacion_password/envioGmail.php",
//         method: "POST",
//         dataType: "json",
//         data: {
//             email: $("#modal-email").val(),
//             fecha: fechaActual(),
//             hora: HoraActual(),
//         },
//         success: function () {
//             window.location.href = `${indexRoute}`;
//         },
//         error: function () {
//             //error_ajax();
//         },
//     });
// }
