$(document).ready(function () {
    $("#loading-container").show();
    $.ajax({
        url: getAutenticadoRoute,
        type: "POST",
        dataType: "json",
        timeout: 40000,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Obtener el token CSRF del meta tag
        },
        success: function (response) {
            var varx = JSON.parse(atob(response.datos));
            // console.log(varx);
            appData.email = varx.email;
            // appData.token = varx.token;
            appData.numEmp = varx.numEmp;
            // console.log(appData.numEmp);
        },
        error: function (error) {
            // Manejar errores
        },
        complete: function () {
            // Código a ejecutar después de que se complete la solicitud AJAX
        },
    });
    setTimeout(function () {
        // var email = appData.email;
        // console.log(email);
        VisibilityPassword('show-passwords', ['modal-newPassword', 'modal-confirmPassword']);
        //---------------------------------------------------------------------------
        // console.log(appData.email);
        $.ajax({//obtener el nombre del empleado
            url: getNameRoute,
            dataType: 'json',
            method: 'POST',
            data: {
                correo: appData.email,
            },
            success: function (response) {
                $("#loading-container").hide();
                var varx = JSON.parse(atob(response.datos));
                if (varx.status == 700) {
                    cerrarSesion();
                }
                var nombreUsuario = varx.nombre;
                var bienvenidaElement = document.querySelector('#nombre');
                bienvenidaElement.innerHTML = 'Bienvenid(@), ' + nombreUsuario;
            },
            error: function () {
                if (xhr.status === 401) {
                    window.location.href = `${Route}`;
                }
            },
        });
        //------------------------------------------------------------------------------
        //var formatoContrasena = /^(?=.*[A-Z])(?=.*[a-z])(?!.*[^a-zA-Z0-9]).{8,}$/;
        var formatoContrasena = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
        $(document).on("submit", "#form_cambio_Password", function (e) {//Crear contraseña por primera véz
            e.preventDefault();
            borra_mensajes();
            var contranew = $("#modal-newPassword").val().trim();
            var contraconf = $("#modal-confirmPassword").val().trim();
            if (contranew == "") {
                error_formulario("modal-newPassword", "El campo no puede ir vacío");
                return false;
            }
            if (contraconf == "") {
                error_formulario("modal-confirmPassword", "El campo no puede ir vacío");
                return false;
            }
            if (!formatoContrasena.test(contranew)) {
                error_formulario("modal-newPassword", "Formato incorrecto Contraseña mínimo de 8 caracteres usa al menos una mayúscula, minúscula y un número");
                return false;
            }
            if (contranew !== contraconf) {
                error_formulario("modal-confirmPassword", "Las contraseñas no coinciden");
                error_formulario("modal-newPassword", "Las contraseñas no coinciden");
                return false;
            }
            $.ajax({
                url: eupdatePasswordSecionRoute, // Asegúrate de definir esta ruta en tus rutas web.php
                dataType: 'json',
                method: 'POST',
                data: {
                    correo: appData.email,
                    password: contranew,
                    _token: $('input[name="_token"]').val()
                },
                success: function (response) {
                    if (response.status == 700) {
                        cerrarSesion();
                    } else
                        if (response.status == 200) {
                            $("#loading-container").show();
                            var msj = response.msj;
                            $("#mensajee").html(msj);
                            setTimeout(function () {
                                window.location.href = `${indexRoute}/${appData.token}`;
                            }, 8000);
                        } else {
                            alerta("danger", response.msj);
                        }
                },
                error: function () {
                    // error_ajax();
                },
            });

        });

    }, 1200);
});