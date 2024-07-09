
$(document).ready(function () {
    // $("#btn_delete_avatar").hide()
    var numEmp = appData.numEmp;
    //console.log(numEmp);
    // Obtén los elementos de iconos y mensajes de ayuda ??
    const helpIcon = document.getElementById("help-icon");
    const helpMessage = document.getElementById("help-message");
    // Llama a la función para configurar los iconos y mensajes
    manejarAyuda(helpIcon, helpMessage);
    //-----------NUM_EM-----id-------Alto-Ancho-------CSS---------------------------------------------
    // obtenerAvatar(numEmp, '#avatar2', '100%', '100%', 'profile-image');
    //-------------------------------------------------------------------------------
    $(document).on("submit", "#form_avatar", function (e) {
        e.preventDefault();
        borra_mensajes();

        if ($("#modal_avatar").val() == "") {
            error_formulario("modal_avatar", "El campo no puede ir vacío");
            return false;
        }
        var formData = new FormData($(this)[0]);
        formData.append('numEmp', numEmp);
        $.ajax({
            url: insertAvatarRoute,
            method: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                if (response.status == 200) {
                    alerta("success", response.msj);
                    setInterval(actualizar, 2000);
                } else
                    if (response.status == 700) {
                        cerrarSesion();
                    }
            },
            error: function () {
                error_ajax();
            }
        });
    });

    $(document).on("click", "#elimina_avatar", function () {
        $.ajax({
            url: delateAvatarRoute,
            dataType: "json",
            type: "post",
        })
            .done(function (response) {
                if (response.status == 700) {
                    cerrarSesion();
                }
                if (response.status == 404) {
                    alerta("danger", response.msj);

                }
                if (response.status == 200) {
                    alerta("success", response.msj);
                    setInterval(actualizar, 2000);
                }
            })
            .fail(function () {
                // error_ajax();
            });
    });
});

