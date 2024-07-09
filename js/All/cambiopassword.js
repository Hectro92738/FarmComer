$(document).ready(function () {
    // $("#loading-container").show();
    // setTimeout(function () {
        // $("#loading-container").hide();
        // var input_email = $("#modal-email");
        // input_email.val(appData.email);
        // Deshabilita el input
        // $(input_email).prop("disabled", true);
        //----------------------------------------------------------------
        VisibilityPassword("show-password", ["modal-password"]);
        //----------------------------------------------------------------
        $(document).on("submit", "#form_cambio_pass", function (e) {
            $("#botonn").prop("disabled", true);
            e.preventDefault();
            borra_mensajes();
            if ($("#modal-password").val() == "") {
                $("#botonn").prop("disabled", false);
                manejarValidacionCampo(
                    "modal-password",
                    "El campo no puede ir vacío",
                    true
                );
                return false;
            }
            var formData = new FormData($(this)[0]);
            var email = appData.email;
            formData.append("modal-email", email);
            function makeRequest() {
                $.ajax({
                    url: verifica_passRoute,
                    dataType: "json",
                    method: "POST",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        if (response.success == true) {
                            manejarValidacionCampo(
                                "modal-password",
                                "¡Correcto!",
                                false
                            );
                            setTimeout(function () {
                                $("#verifica_pass").hide();
                                $("#cont_pass").empty();
                                $("#cont_pass").show();
                                $("#text_mensaje").empty();
                                $("#text_mensaje").show();
                                var cont_html =
                                    '<div class="input-group mt-3" id="group-modal-newPassword">' +
                                    '<span class="input-group-text"><i class="bi bi-lock"></i></span>' +
                                    '<input type="password" id="modal-newPassword" name="modal-newPassword" class="form-control" placeholder="Ingresa nueva contraseña">' +
                                    "</div>" +
                                    "<p class='text-muted'>Ingresa nueva contraseña</p>" +
                                    '<div class="input-group mt-3" id="group-modal-confirmPassword">' +
                                    '<span class="input-group-text"><i class="bi bi-lock"></i></span>' +
                                    '<input type="password" id="modal-confirmPassword" name="modal-confirmPassword" class="form-control" placeholder="Confirma contraseña">' +
                                    "</div>" +
                                    "<p class='text-muted'>Confirma contraseña</p>" +
                                    '<label for="show-passwords" class="custom-checkbox-label col-md-4 ver_pass">' +
                                    '<input type="checkbox" id="show-passwords" class="custom-checkbox"> Mostrar Contraseñas </label>' +
                                    '<div class="form-group py-4">' +
                                    '<div class="d-inline-block mt-2">' +
                                    '<button type="submit" id="boton_cambio" class="btn btn-info me-3 ">Cambiar contraseña</button>' +
                                    "</div>" +
                                    '<div class="d-inline-block mt-2">' +
                                    '<button type="button" id="cancelar" class="btn btn-secondary me-3 ">Cancelar</button>' +
                                    "</div>" +
                                    "</div>";
                                $("#cont_pass").append(cont_html);
                                $("#text_mensaje").append(
                                    "<p class='text-center text-muted'>Por favor, crea una contraseña segura. Contraseña mínimo de 8 caracteres usa al menos una mayúscula, minúscula y un número</p>"
                                );
                            }, 2000);
                        } else {
                            manejarValidacionCampo(
                                "modal-password",
                                "Contraseña Incorrecta",
                                true
                            );
                            $("#botonn").prop("disabled", false);
                        }
                    },
                    error: function (xhr) {
                        $("#botonn").prop("disabled", false);
                        setTimeout(makeRequest, 100);
                        if (xhr.status === 401) {
                            window.location.href = `${Route}`;
                        }
                    },
                });
            }
            makeRequest();
        });
        //----------------------------------------------------------------
        $(document).on("click", "#cancelar", function (e) {
            borra_mensajes();
            $("#botonn").prop("disabled", false);
            $("#verifica_pass").show();
            $("#cont_pass").hide();
            $("#text_mensaje").hide();
            // $("#modal-password").empty();
        });
        //----------------------------------------------------------------
        $(document).on("click", "#show-passwords", function (e) {
            VisibilityPassword("show-passwords", [
                "modal-newPassword",
                "modal-confirmPassword",
            ]);
        });
        //----------------------------------------------------------------
        var formatoContrasena = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
        $(document).on("click", "#boton_cambio", function (e) {
            $("#boton_cambio").prop("disabled", true);
            $("#cancelar").prop("disabled", true);
            e.preventDefault();
            borra_mensajes();
            var contranew = $("#modal-newPassword").val().trim();
            var contraconf = $("#modal-confirmPassword").val().trim();
            if (contranew == "") {
                $("#boton_cambio").prop("disabled", false);
                $("#cancelar").prop("disabled", false);
                manejarValidacionCampo(
                    "modal-newPassword",
                    "El campo no puede ir vacío",
                    true
                );
                return false;
            }
            if (contraconf == "") {
                $("#boton_cambio").prop("disabled", false);
                $("#cancelar").prop("disabled", false);
                manejarValidacionCampo(
                    "modal-confirmPassword",
                    "El campo no puede ir vacío",
                    true
                );
                return false;
            }
            if (
                contranew !== contraconf
            ) {
                $("#boton_cambio").prop("disabled", false);
                $("#cancelar").prop("disabled", false);
                manejarValidacionCampo(
                    "modal-confirmPassword",
                    "Las contraseñas no coinciden",
                    true
                );
                manejarValidacionCampo(
                    "modal-newPassword",
                    "Las contraseñas no coinciden",
                    true
                );
                return false;
            }
            if (!formatoContrasena.test(contranew)) {
                $("#boton_cambio").prop("disabled", false);
                $("#cancelar").prop("disabled", false);
                manejarValidacionCampo(
                    "modal-newPassword",
                    "Formato incorrecto Contraseña mínimo de 8 caracteres usa al menos una mayúscula, minúscula y un número",
                    true
                );
                return false;
            }
            // if (confirm("¿Seguro que quieres eliminar este registro?")) {
            $.ajax({
                url: eupdatePasswordSecionRoute,
                dataType: "json",
                method: "POST",
                data: {
                    correo: appData.email,
                    password: contranew,
                    _token: $('input[name="_token"]').val(),
                },
                success: function (response) {
                    if (response.status == 200) {
                        manejarValidacionCampo(
                            "modal-newPassword",
                            "¡Contraseña creada correctamente!",
                            false
                        );
                        manejarValidacionCampo(
                            "modal-confirmPassword",
                            "¡Contraseña creada correctamente!",
                            false
                        );
                        setInterval(actualizar, 1000);
                    } else if (response.status == 400) {
                        $("#boton_cambio").prop("disabled", false);
                        $("#cancelar").prop("disabled", false);
                        manejarValidacionCampo(
                            "modal-newPassword",
                            response.msj,
                            true
                        );
                        manejarValidacionCampo(
                            "modal-confirmPassword",
                            response.msj,
                            true
                        );
                    }
                },
                error: function () {
                    setInterval(actualizar, 1000);
                },
            });
            // }
        });
        //----------------------------------------------------------------
    // }, 2000);
});
