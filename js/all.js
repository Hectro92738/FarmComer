let nombreEmpleadoInicioSecion = "";
var nombreMandoEncargadoPC73 = "";  //PARA COLOCAR EN EL VALE DENTAL
var nombreEmpladoCargoDePrestaciones = "";  //PARA COLOCAR EN EL VALE DENTAL
let TamañoLetra;
// let correo = "";
$(document).ready(function () {
    $('#results').hide();
    $.ajax({
        url: getAutenticadoRoute,
        type: "POST",
        dataType: "json",
        timeout: 40000,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Obtener el token CSRF del meta tag
        },
        success: function (response) {
            let datos_x = JSON.parse(atob(response.datos));
            appData.email = datos_x.email;
            appData.token = datos_x.token;
            appData.numEmp = datos_x.numEmp;
            correo = datos_x.email;
            // console.log(datos_x.token);
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = `${Route}`;
            }
        },
        complete: function () {
            // Código a ejecutar después de que se complete la solicitud AJAX
        },
    });
    // setTimeout(function () {
    //     Menu(appData.numEmp);
    // }, 1500);

    // setTimeout(function () {
    //     obtenerAvatar(appData.numEmp, "#avatar", "30", "30", "rounded-circle");
    // }, 1500);
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });
    //----------------------------------------------------------------
    setTimeout(function () {
        obtenerNombreEmpleado(appData.email)
            .then(function (response) {
                // console.log(response);
                var nombreUsuario = response.nombre;
                var nombreEM = response.nombre_empleado;
                var nombreMando = response.nombre_jefe;
                // var bienvenidaElement = document.querySelector("#nombre");
                // bienvenidaElement.innerHTML = nombreUsuario;
                // ----------- 

                nombreEmpleadoInicioSecion = nombreUsuario;  
                // console.log(nombreEmpleadoInicioSecion);
                // Obtén la longitud de la cadena
                const longitudCadena = nombreEmpleadoInicioSecion.length;

                // Inicializa la variable TamañoLetra

                if (longitudCadena < 38) {
                    TamañoLetra = 10;
                } else if (longitudCadena >= 38 && longitudCadena < 48) {
                    TamañoLetra = 8;
                } else if (longitudCadena >= 48 && longitudCadena < 58) {
                    TamañoLetra = 7;
                } else if (longitudCadena >= 58 && longitudCadena < 68) {
                    TamañoLetra = 6;
                } else if (longitudCadena >= 68 && longitudCadena < 78) {
                    TamañoLetra = 5;
                } else {
                    TamañoLetra = 3;
                }
                nombreMandoEncargadoPC73 = nombreMando;
                nombreEmpladoCargoDePrestaciones = nombreEM;
            })
            .catch(function (error) {
                console.log("Erro al obtener nombre del empleado");
            });
    }, 1500);
    // ---------------------------------------------------------------
    $(document).on("submit", "#form_buscador", function (e) {
        e.preventDefault();
    });
    buscador(appData.token);
});
function buscador(token) {
    let dato = JSON.parse(atob(token));
    dato.push("Foto de perfil");
    dato.push("contraseña");
    dato.push("Inicio");
    $('#search-input').on('input', function () {
        let query = $(this).val().toLowerCase();
        if (query == '') {
            $('#results').hide();
            return;
        }
        let filteredResults = dato.filter(item => item.toLowerCase().includes(query));

        $('#results').empty();
        $('#results').hide();
        filteredResults.forEach(result => {
            $('#results').show();
            let formattedName = result;
            if (result !== "contraseña") {
                formattedName =
                    result.toLowerCase().replace(
                        / /g,
                        "_"
                    );

                // Elimina acentos de todas las letras excepto la ñ
                formattedName = formattedName
                    .normalize("NFD")
                    .replace(/[\u0300-\u0303\u0305-\u036f]/g, "");
            }
            $('#results').append(`<a href="${appData.UrlAll}/${formattedName}/${token}" class="text-dark nav-link mb-3 mt-2 ms-2">${result}</a>`);
        });

        if (filteredResults.length > 0) {
            $('#results').show();
            // $('#results').style();
        } else {
            $('#results').hide();
        }
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.nav-item').length) {
            $('#results').hide();
        }
    });

    $('#results').on('click', 'li', function () {
        $('#search-input').val($(this).text());
        $('#results').hide();
    });
}