$(document).ready(function () {
    if (appData.token !== '') {
        // $("#loading-container").show();
        const token = appData.token;
        // document.cookie = `token_rh=${token}; path=/; secure; SameSite=Strict;`;
        // document.cookie = `session_token=${token}; path=/; `;
        // $("#modal_loguin").modal("show");
        // $("#modal_footer_loguin").hide();
        // $("#encabezado_modal_login").html("<span class='text-success'>¡Datos correctos!</span>");
        // $("#body_modal_loguin").html("Bienvenido a el inicio de seción con Google, sus datos has sido verificados exitosamente."); //
        $("#loading-container").show();
        setTimeout(function () {
            $("#loading-container").hide();
            window.location.href = `${indexRoute}/${token}`;
            // $("#loading-container").hide();
        }, 2500);
    }
    if (appData.dato !== "" && appData.dato == "Error") {
        // alerta("danger", "Ingresa con un correo Institicional"); 
        $("#modal_loguin").modal("show");
        $("#modal_footer_loguin").show();
        $("#encabezado_modal_login").html("<span class='text-danger'>¡Correo Incorrecto!</span>");
        $("#body_modal_loguin").html("Para poder ingresar, por favor ingrese su correo intitucional de la UTEQ.")
    }
    $('#modal-email').on('input', function () {
        var emailValue = $(this).val().trim();
        var atIndex = emailValue.indexOf('@');
        // Verificar si el "@" está presente y está al final del campo
        if (atIndex !== -1 && atIndex === emailValue.length - 1) {
            $(this).val(emailValue + 'uteq.edu.mx');
            // $(this).addClass('text-success'); 
        }
    });
    // console.log(appData.token);
    // Obtén los elementos de iconos y mensajes de ayuda ??
    const helpIcon = document.getElementById("help-icon");
    const helpMessage = document.getElementById("help-message");
    const helpIconPass = document.getElementById("help-iconPass");
    const helpMessagePass = document.getElementById("help-messagePass");
    // Llama a la función para configurar los iconos y mensajes
    manejarAyuda(helpIcon, helpMessage);
    manejarAyuda(helpIconPass, helpMessagePass);
    // -------------------------------------------------------------------------------
    VisibilityPassword("show-password", ["modal-password"]);
    //-------------------------------------------------------------------------------
    var formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    $(document).on("submit", "#form_login", function (e) {
        $("#botonn").prop("disabled", true);
        e.preventDefault();
        borra_mensajes();
        var correo = $("#modal-email").val().trim();
        var contra = $("#modal-password").val().trim();
        if ($("#modal-email").val() == "") {
            $("#botonn").prop("disabled", false);
            manejarValidacionCampo(
                "modal-email",
                "El campo no puede ir vacío",
                true
            );
            return false;
        } if (contra == "") {
            $("#botonn").prop("disabled", false);
            manejarValidacionCampo(
                "modal-password",
                "El campo no puede ir vacío",
                true
            );
            return false;
        } if (!formatoCorreo.test(correo)) {
            $("#botonn").prop("disabled", false);
            manejarValidacionCampo(
                "modal-email",
                "Formato Incorrecto de Email",
                true
            );
            return false;
        }  
        // Obtener el nuevo token CSRF
        // var csrfToken = $('meta[name="csrf-token"]').attr('content');
        
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: loginRoute,
            method: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            timeout: 8000,
            success: function (response) {
                if (response.success == true) {
                    const token = response.token;
                    alerta("success", response.name);
                    if (response.changePassword == false) {
                        setTimeout(function () {
                            window.location.href = `${indexRoute}/${token}`;
                        }, 2000);
                    }
                    if (response.changePassword == true) {
                        setTimeout(function () {
                            window.location.href = `${login_cambio_PaswordRoute}/${token}`;
                        }, 2000);
                    }
                } else {
                    manejarValidacionCampo(
                        "modal-email",
                        "Datos Incorrectos",
                        true
                    );
                    manejarValidacionCampo(
                        "modal-password",
                        "Datos Incorrectos",
                        true
                    );
                    $("#botonn").prop("disabled", false);
                    alerta("danger", response.msj);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (textStatus === "timeout") {
                }
            },
            complete: function () {
                $("#loading-container").hide();
            },
        });
    });
});
