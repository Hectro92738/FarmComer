$(document).ready(function () {
    $("#loading-container").hide();
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });
    // console.log(appData.UrlAll);
});
function error_formulario(campo, mensaje) {
    $("#group-" + campo).append(
        $("<div>", {
            class: "invalid-feedback",
            text: mensaje,
        })
    );
    $("#" + campo)
        .addClass("is-invalid")
        .focus();
}
function manejarValidacionCampo(campo, mensaje, esError) {
    if (esError) {
        // Manejar caso de error
        $("#group-" + campo)
            .removeClass("has-success")
            .addClass("has-error");
        $("#" + campo)
            .removeClass("is-valid")
            .addClass("is-invalid");
        $("#" + campo + "-feedback").remove();
        $("#group-" + campo).append(
            $("<div>", {
                id: campo + "-feedback",
                class: "invalid-feedback",
                text: mensaje,
            })
        );
        $("#" + campo).focus();
    } else {
        // Manejar caso de éxito
        $("#group-" + campo)
            .removeClass("has-error")
            .addClass("has-success");
        $("#" + campo)
            .removeClass("is-invalid")
            .addClass("is-valid");
        $("#" + campo + "-feedback").remove();
        $("#group-" + campo).append(
            $("<div>", {
                id: campo + "-feedback",
                class: "valid-feedback",
                text: mensaje,
            })
        );
        $("#" + campo).focus();
    }
}
function borra_mensajes() {
    $(".is-invalid").removeClass("is-invalid");
    $(".is-valid").removeClass("is-valid");
    $(".invalid-feedback").remove();
    $(".valid-feedback").remove();
}
function error_ajax() {
    //alerta("danger", "☠️");
    setInterval(actualizar, 1000);
}
function alerta(tipo, mensaje) {
    // Oculta y elimina todas las alertas existentes
    $(".alert-dismissible").fadeOut(function () {
        $(this).remove();
    });

    var icono, claseAlerta;

    switch (tipo) {
        case "success":
            icono = "bi bi-check2-circle";
            claseAlerta = "custom-success";
            break;
        case "info":
            icono = "bi bi-exclamation-lg";
            claseAlerta = "custom-info";
            break;
        case "danger":
            icono = "bi bi-exclamation-circle";
            claseAlerta = "custom-danger";
            break;
    }

    // Agrega la nueva alerta
    $("#mensaje").append(
        '<div class="alert ' +
        claseAlerta +
        ' alert-dismissible fade show" role="alert"><i class="' +
        icono +
        ' h4"></i> ' +
        mensaje +
        "</div>"
    );
    setTimeout(function () {
        // Oculta y elimina la nueva alerta después de un tiempo
        $(".alert-dismissible").fadeOut(function () {
            $(this).remove();
        });
    }, 3000);
}
function actualizar() {
    $("#loading-container").show();
    setTimeout(function () {
        location.reload(true);
    }, 1000);
}
function fecha_fancy(sFecha) {
    const ames = [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic",
    ];

    // recibe fecha en formato yyyy-mm-dd
    aFecha = sFecha.split("-");

    return aFecha[2] + "-" + ames[aFecha[1] - 1] + "-" + aFecha[0];
}
function manejarAyuda(icono, mensaje) {
    icono.addEventListener("click", function () {
        if (mensaje.style.display === "block") {
            mensaje.style.display = "none";
        } else {
            mensaje.style.display = "block";
        }
        setTimeout(function () {
            mensaje.style.display = "none";
        }, 15000);
    });

    document.addEventListener("click", function (event) {
        if (event.target !== mensaje && event.target !== icono) {
            mensaje.style.display = "none";
        }
    });
}
function HoraActual() {
    var today = new Date();
    var hh = String(today.getHours()).padStart(2, "0");
    var min = String(today.getMinutes()).padStart(2, "0");
    var ss = String(today.getSeconds()).padStart(2, "0");
    var HoraActual = hh + ":" + min + ":" + ss;
    return HoraActual;
}
function fechaActual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    var fechaActual = dd + "-" + mm + "-" + yyyy;
    return fechaActual;
}
function VisibilityPassword(checkboxId, passwordIds) {
    var $showPasswordCheckbox = $("#" + checkboxId);

    $showPasswordCheckbox.change(function () {
        var isChecked = $(this).is(":checked");
        passwordIds.forEach(function (passwordId) {
            var $passwordInput = $("#" + passwordId);
            $passwordInput.attr("type", isChecked ? "text" : "password");
        });
    });
}
function obtenerNombreEmpleado(correo) {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            // console.log(correo);
            $.ajax({
                url: getNameRoute,
                dataType: "json",
                method: "POST",
                data: {
                    correo: correo,
                },
                success: function (response) {
                    let datos_x = JSON.parse(atob(response.datos));


                    if (datos_x.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                    }
                    if (datos_x.status == 200) {
                        // console.log(datos_x);
                        resolve(datos_x);
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
function obtenerAvatar(numEmp, id, width, height, css) {
    function makeRequest() {
        $.ajax({
            url: getAvatarRoute,
            dataType: "json",
            method: "POST",
            data: {
                numEmp: numEmp,
            },
            success: function (response) {
                let datos_x = JSON.parse(atob(response.datos));
                if (datos_x.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                }
                if (datos_x.status == 200) {
                    $("#btn_delete_avatar").show();
                    var img = datos_x.img;
                    var imgElement = document.querySelector(id);
                    var imgR = imgRoute + "/" + img; // Ruta dinámica
                    imgElement.innerHTML =
                        "<img width=" +
                        width +
                        " height=" +
                        height +
                        ' class="me-1 ' +
                        css +
                        '" src="' +
                        imgR +
                        '" alt="">';
                }
                if (datos_x.status == 300) {
                    $("#btn_delete_avatar").hide();
                    var img = datos_x.img;
                    var imgElement = document.querySelector(id);
                    imgElement.innerHTML =
                        "<img width=" +
                        width +
                        " height=" +
                        height +
                        ' class="me-1 ' +
                        css +
                        '" src="' +
                        imgRoute +
                        '/perfil.png " alt="">';
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
function Menu(numEmp) {
    function makeRequest() {
        $.ajax({
            url: getMenuSubmenuRoute,
            dataType: "json",
            method: "POST",
            data: {
                numEmp: numEmp,
            },
            success: function (response) {
                var datosMenu = JSON.parse(atob(response.datosMenu));
                if (datosMenu.status == 200) {
                    // setTimeout(makeRequest, 15000);
                    // Limpia el contenedor antes de agregar nuevos elementos
                    $("#menu-container").empty();
                    // Objeto para almacenar menús y sus submenús
                    var menuSubmenuMap = {};
                    // Recorre los datos y agrupa menús y submenús
                    $.each(datosMenu.datos, function (index, item) {
                        if (item.menu) {
                            var menuId = item.menu.ID_MENU;
                            if (!menuSubmenuMap[menuId]) {
                                // Crea un objeto de menú si aún no existe
                                menuSubmenuMap[menuId] = {
                                    menu: item.menu,
                                    submenus: [],
                                };
                            }
                            // Agrega el submenú al menú correspondiente
                            menuSubmenuMap[menuId].submenus.push(item.submenu);
                        }
                    });
                    // console.log(datosMenu);
                    // Crea los menús y submenús en función de los datos agrupados
                    $.each(menuSubmenuMap, function (menuId, menuSubmenus) {
                        var menuHtml = '<li class="nav-item">';
                        menuHtml += '<a href="#" class="nav-link">';
                        menuHtml +=
                            '<i class="bi ' +
                            menuSubmenus.menu.ICON_MENU +
                            ' h5 me-2"></i>';
                        menuHtml += "<p>";
                        menuHtml += menuSubmenus.menu.NAME_MENU;
                        menuHtml += '<i class="right fas fa-angle-left"></i>';
                        menuHtml += "</p>";
                        menuHtml += "</a>";

                        if (menuSubmenus.submenus.length > 0) {
                            menuHtml +=
                                '<ul class="nav nav-treeview" style="font-size: 14px">';
                            $.each(
                                menuSubmenus.submenus,
                                function (index, submenu) {
                                    // Convierte el texto a minúsculas y reemplaza espacios con guiones bajos
                                    var formattedName =
                                        submenu.NAME_SUBMENU.toLowerCase().replace(
                                            / /g,
                                            "_"
                                        );
                                    // Elimina acentos y diacríticos
                                    formattedName = formattedName
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, "");
                                    var submenuURL =
                                        // "http://172.31.192.78/laravel_v1/" +
                                        appData.UrlAll +"/"+
                                        formattedName +
                                        "/" +
                                        appData.token;

                                    menuHtml += '<li class="nav-item ms-3">';
                                    menuHtml +=
                                        '<a href="' +
                                        submenuURL +
                                        '" class="nav-link">';
                                    menuHtml +=
                                        '<i class="bi ' +
                                        submenu.ICON_SUB +
                                        ' me-2"></i>';
                                    menuHtml +=
                                        "<p>" + submenu.NAME_SUBMENU + "</p>";
                                    menuHtml += "</a>";
                                    menuHtml += "</li>";
                                }
                            );
                            menuHtml += "</ul>";
                        }

                        menuHtml += "</li>";
                        $("#menu-container").append(menuHtml);
                    });
                }
                if (datosMenu.status == 600) {
                    console.log(datosMenu);
                }
                if (datosMenu.status == 404) {
                    alerta("danger", datosMenu.msj);
                }
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = `${Route}`;
                }
                setTimeout(makeRequest, 1500);
            },
        });
    }
    // Iniciamos la primera solicitud
    makeRequest();
}
function informacion_personal(numEmp) {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: informacionPersonalRoute,
                dataType: "json",
                method: "POST",
                data: {
                    numEmp: numEmp,
                },
                success: function (response) {
                    let datos_x = JSON.parse(atob(response.datos));


                    if (datos_x.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                        reject("Sesión cerrada");
                    }
                    if (datos_x.status == 200) {
                        //console.log(datos_x);
                        resolve(datos_x);
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        window.location.href = `${Route}`;
                    }
                    setTimeout(makeRequest, 1500);
                },
            });
        }
        // Iniciamos la primera solicitud
        makeRequest();
    });
}
function get_mandos() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: getMandosRoute,
                dataType: "json",
                method: "POST",
                success: function (response) {
                    let datos_x = JSON.parse(atob(response.datos));
                    if (datos_x.status == 200) {
                        //console.log(datos_x);
                        resolve(datos_x);
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        window.location.href = `${Route}`;
                    }
                    setTimeout(makeRequest, 1500);
                },
            });
        }
        makeRequest();
    });
}
function obtenerTotalEmpleado() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: getTotalEmpleadosRoute,
                dataType: "json",
                method: "POST",
                success: function (response) {
                    if (response.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                    }
                    if (response.status == 200) {
                        resolve(response);
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        window.location.href = `${Route}`;
                    }
                    setTimeout(makeRequest, 1500);
                },
            });
        }
        makeRequest();
    });
}
function get_imagenes() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: getImgRoute,
                dataType: "json",
                method: "POST",
                success: function (response) {
                    if (response.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                    }
                    if (response.status == 200) {
                        resolve(response);
                    }
                },
                error: function () {
                    // Intentamos nuevamente después de un breve retardo
                    setTimeout(makeRequest, 1000); // Retardo de 1 segundo (ajusta según tus necesidades)
                },
            });
        }
        // Iniciamos la primera solicitud
        makeRequest();
    });
}
function conocer_tipo_usuarios(numEmp) {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: conocertipousuariosRoute,
                dataType: "json",
                method: "POST",
                data: {
                    numEmp: numEmp,
                },
                success: function (response) {
                    if (response.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                        reject("Sesión cerrada");
                    }
                    if (response.status == 200) {
                        resolve(response);
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        window.location.href = `${Route}`;
                    }
                    setTimeout(makeRequest, 1500);
                },
            });
        }
        makeRequest();
    });
}
//choseen--- Me trae todos los empleados de la estructura
function cargarEmpleados() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: getAllEmpleadosRoute,
                dataType: "json",
                method: "POST",
                success: function (response) {
                    let datos_x = JSON.parse(atob(response.datos));

                    if (datos_x.status == 200) {
                        resolve(datos_x);
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
//Me trae todos los "DEPT","DIRE","ORGANIZACION" usando distinc
function get_distinct() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: getdistinctRoute,
                dataType: "json",
                method: "POST",
                success: function (response) {
                    if (response.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                        reject("Sesión cerrada");
                    }
                    if (response.status == 200) {
                        //console.log(response);
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
//trae todo los q encuentra en la tabla de aprobaciones "no aplica", o para cambio de DEPT, DIRE, ORGANIZACION
function get_aprobaciones() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: getAprobacionesRoute,
                dataType: "json",
                method: "POST",
                success: function (response) {
                    let datos_x = JSON.parse(atob(response.datos));

                    if (datos_x.status == 200) {
                        //console.log(datos_x);
                        resolve(datos_x);
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
//saber a que ORGANIZACION, DIRE, DEPT, pertenece el empleado
function conocer_org_dire_dept(numEmp) {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: conocermandoRoute,
                dataType: "json",
                method: "POST",
                data: {
                    numEmp: numEmp,
                },
                success: function (response) {
                    let datos_x = JSON.parse(atob(response.datos));

                    if (datos_x.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                        reject("Sesión cerrada");
                    }
                    if (datos_x.status == 200) {
                        resolve(datos_x);
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
/*  OBTENER PERMISOS ECONOMICOS EMPLEADO con un "count"  */
function Total_PE_Empleado(numEmp) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: getTotalPEEmpRoute,
            dataType: "json",
            method: "POST",
            data: {
                numEmp: numEmp,
            },
            success: function (response) {
                if (response.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                }
                if (response.status == 200) {
                    resolve(response);
                }
            },
            error: function () {
                error_ajax();
                reject("Error en la solicitud AJAX");
            },
        });
    });
}
function conocer_mando() {
    var num_emp_x = appData.numEmp;
    switch (num_emp_x) {
        case "124737":
        case "125637":
        case "85293":
            setTimeout(function () {
                var nombreCompleto = "ELIZONDO MARTINEZ, JOSE LUIS";
                $("#nom_mando")
                    .append(nombreCompleto)
                    .removeClass("loading-animation");
            }, 2000);
            break;
        case "57251":
        case "124950":
        case "72270":
            setTimeout(function () {
                var nombreCompleto = "GOMEZ RIVERA, MARIA DE LOURDES";
                $("#nom_mando")
                    .append(nombreCompleto)
                    .removeClass("loading-animation");
            }, 2000);
            break;

        default:
            setTimeout(function () {
                //----------------------------------------------------------------
                var emp_aprobaciones = []; // Se guardan todos los empleados de "Aprobaciones"
                var empNumArray = []; //Se guardan los empleados q 'NO' tienen "No aplica"
                var mandos_no_empleados = []; //Se guardan los empleados q 'SI' tienen "No aplica"
                var organizacion; //Se guarda la organizacion del empleado q ha "Iniciado seción"
                var departamento; //Se guarda la organizacion del empleado q ha "Iniciado seción"
                var direccion; //Se guarda la organizacion del empleado q ha "Iniciado seción"
                var TODOS_empleados = []; //Guarda todos los empleados
                var Mandos = []; //Se guardan todos los Mandos existentes "primeraas palabras del Job_name"
                var EMP_NUM_EMP = appData.numEmp;
                //----------------------------------------------------------------
                conocer_org_dire_dept(appData.numEmp)
                    .then(function (response) {
                        organizacion = response.ORGANIZACION;
                        // console.log(organizacion);
                        departamento = response.DEPT;
                        // console.log(departamento);
                        direccion = response.DIRE;
                        //console.log(direccion);
                        //----------------------------------------------------------------
                        cargarEmpleados() //Todos los Empleados
                            .then(function (response) {
                                TODOS_empleados = response.empleados;
                                //console.log(TODOS_empleados);
                                //----------------------------------------------------------------
                                get_aprobaciones()
                                    .then(function (response) {
                                        emp_aprobaciones =
                                            response.aprobaciones;

                                        emp_aprobaciones.forEach(function (
                                            aprobacion
                                        ) {
                                            var empNum = aprobacion.EMP_NUM;
                                            // Validar si al menos uno de los campos no es "No aplica"
                                            if (
                                                aprobacion.DIRE !=
                                                "No aplica" ||
                                                aprobacion.DEPT !=
                                                "No aplica" ||
                                                aprobacion.ORGANIZACION !=
                                                "No aplica"
                                            ) {
                                                if (
                                                    !empNumArray.includes(
                                                        empNum
                                                    )
                                                ) {
                                                    empNumArray.push(empNum);
                                                }
                                            } else {
                                                if (
                                                    !mandos_no_empleados.includes(
                                                        empNum
                                                    )
                                                ) {
                                                    mandos_no_empleados.push(
                                                        empNum
                                                    );
                                                }
                                            }
                                        });
                                        //----------------------------------------------------------------
                                        get_mandos()
                                            .then(function (response) {
                                                Mandos = response.mandos; 
                                                //console.log(TODOS_empleados);
                                                // Filtrar empleados que tienen JobNamePrefix en Mandos
                                                var empleadosFiltrados =
                                                    TODOS_empleados.filter(
                                                        function (empleado) {
                                                            return Mandos.some(
                                                                function (
                                                                    mando
                                                                ) {
                                                                    return (
                                                                        empleado.JobNamePrefix ===
                                                                        mando.NUM_MANDO
                                                                    );
                                                                }
                                                            );
                                                        }
                                                    );
                                                //--------
                                                //Validamos si en la tabla de "xxhr_aprobaciones" existe un "mando" y
                                                //le hacemos el cambio de DIRE, DEPT y ORGANIZACION
                                                // Itera sobre empleadosFiltrados
                                                empleadosFiltrados.forEach(
                                                    function (
                                                        empleadoFiltrado
                                                    ) {
                                                        // Encuentra el empleado correspondiente en emp_aprobaciones
                                                        var aprobacionCorrespondiente =
                                                            emp_aprobaciones.find(
                                                                function (
                                                                    aprobacion
                                                                ) {
                                                                    return (
                                                                        aprobacion.EMP_NUM.toString() ==
                                                                        empleadoFiltrado.EMP_NUM.toString()
                                                                    );
                                                                }
                                                            );

                                                        // Si se encuentra, actualiza la información de aprabaciones el array de "empleadoFiltrado"
                                                        if (
                                                            aprobacionCorrespondiente
                                                        ) {
                                                            empleadoFiltrado.DIRE =
                                                                aprobacionCorrespondiente.DIRE;
                                                            empleadoFiltrado.DEPT =
                                                                aprobacionCorrespondiente.DEPT;
                                                            empleadoFiltrado.ORGANIZACION =
                                                                aprobacionCorrespondiente.ORGANIZACION;
                                                        }
                                                    }
                                                );
                                                // Ahora, empleadosFiltrados contiene la información actualizada
                                                // console.log(empleadosFiltrados);
                                                //--------
                                                //Validamos si dentro de los "mandos" se encuentra el mismo, si es así quiere decir q el es un Mando
                                                var empleadoEncontrado =
                                                    empleadosFiltrados.find(
                                                        function (empleado) {
                                                            // console.log("Comparando:", empleado.EMP_NUM, EMP_NUM_EMP);
                                                            return (
                                                                empleado.EMP_NUM.toString() ===
                                                                EMP_NUM_EMP.toString()
                                                            );
                                                        }
                                                    );
                                                // Iterar sobre cada empleado en empleadosFiltrados
                                                //Ingresamos el RANGO a cada empleado de "empleadosFiltrados"
                                                empleadosFiltrados.forEach(
                                                    (empleado) => {
                                                        // Buscar el RANGO correspondiente en Mandos
                                                        var RANGO = Mandos.find(
                                                            (mando) =>
                                                                mando.NUM_MANDO ===
                                                                empleado.JobNamePrefix
                                                        );
                                                        // Si se encuentra, agregar la propiedad RANGO a empleado
                                                        if (RANGO) {
                                                            empleado.RANGO =
                                                                RANGO.RANGO;
                                                        }
                                                    }
                                                );
                                                //______________________________________________________________________________
                                                //______________________________________________________________________________
                                                //______________________________________________________________________________
                                                if (empleadoEncontrado) {
                                                    // Buscar el RANGO correspondiente en Mandos
                                                    var RANGO_EMPLEADO =
                                                        Mandos.find(
                                                            (mando) =>
                                                                mando.NUM_MANDO ===
                                                                empleadoEncontrado.JobNamePrefix
                                                        );
                                                    if (RANGO_EMPLEADO) {
                                                        // Acceder al valor de RANGO
                                                        var rangoDelEmpleado =
                                                            RANGO_EMPLEADO.RANGO;
                                                        // Ahora empleadosFiltrados contiene la propiedad RANGO para cada empleado correspondiente
                                                        
                                                        // Validar que el rango esté entre 1 y 10
                                                        if (
                                                            rangoDelEmpleado >=
                                                            1 &&
                                                            rangoDelEmpleado <=
                                                            10
                                                        ) {
                                                            if (
                                                                direccion ===
                                                                "PD00" ||
                                                                direccion ===
                                                                "PC90"
                                                            ) {
                                                                var nombre_mando =
                                                                    empleadosFiltrados.filter(
                                                                        (
                                                                            empleado
                                                                        ) => {
                                                                            return (
                                                                                (empleado.DIRE ==
                                                                                    "PD00" ||
                                                                                    empleado.DIRE ==
                                                                                    "PC90") &&
                                                                                empleado.RANGO <
                                                                                rangoDelEmpleado
                                                                            );
                                                                        }
                                                                    );

                                                                if (
                                                                    nombre_mando.length >
                                                                    0
                                                                ) {
                                                                    // Ordenar el array por RANGO de menor a mayor
                                                                    nombre_mando.sort(
                                                                        (
                                                                            a,
                                                                            b
                                                                        ) =>
                                                                            a.RANGO -
                                                                            b.RANGO
                                                                    );
                                                                    // Obtener el empleado con el rango más bajo
                                                                    nombre_mando =
                                                                        nombre_mando[0];
                                                                    // console.log(
                                                                    //     nombre_mando
                                                                    // );
                                                                    $(
                                                                        "#nom_mando"
                                                                    )
                                                                        .text(
                                                                            nombre_mando.EMP_NAME
                                                                        )
                                                                        .removeClass(
                                                                            "loading-animation"
                                                                        );
                                                                } else {
                                                                    // Si nombre_mando está vacío, buscar al empleado con el rango más pequeño en empleadosFiltrados
                                                                    var nombre_mando =
                                                                        empleadosFiltrados.reduce(
                                                                            (
                                                                                min,
                                                                                empleado
                                                                            ) =>
                                                                                empleado.RANGO <
                                                                                    min.RANGO
                                                                                    ? empleado
                                                                                    : min,
                                                                            empleadosFiltrados[0]
                                                                        );
                                                                    if (
                                                                        nombre_mando
                                                                    ) {
                                                                        // console.log(
                                                                        //     nombre_mando
                                                                        // );
                                                                        $(
                                                                            "#nom_mando"
                                                                        )
                                                                            .text(
                                                                                nombre_mando.EMP_NAME
                                                                            )
                                                                            .removeClass(
                                                                                "loading-animation"
                                                                            );
                                                                    } else {
                                                                        console.log(
                                                                            "No hay empleados en empleadosFiltrados."
                                                                        );
                                                                    }
                                                                }
                                                            } else {
                                                                var nombre_mando =
                                                                    empleadosFiltrados.filter(
                                                                        (
                                                                            empleado
                                                                        ) => {
                                                                            return (
                                                                                empleado.DIRE ==
                                                                                direccion &&
                                                                                empleado.RANGO <
                                                                                rangoDelEmpleado
                                                                            );
                                                                        }
                                                                    );
                                                                if (
                                                                    nombre_mando.length >
                                                                    0
                                                                ) {
                                                                    // Ordenar el array por RANGO de menor a mayor
                                                                    nombre_mando.sort(
                                                                        (
                                                                            a,
                                                                            b
                                                                        ) =>
                                                                            a.RANGO -
                                                                            b.RANGO
                                                                    );
                                                                    // Obtener el empleado con el rango más bajo
                                                                    nombre_mando =
                                                                        nombre_mando[0];
                                                                    // console.log(
                                                                    //     nombre_mando
                                                                    // );
                                                                    $(
                                                                        "#nom_mando"
                                                                    )
                                                                        .text(
                                                                            nombre_mando.EMP_NAME
                                                                        )
                                                                        .removeClass(
                                                                            "loading-animation"
                                                                        );
                                                                } else {
                                                                    // Si nombre_mando está vacío, buscar al empleado con el rango más pequeño en empleadosFiltrados
                                                                    nombre_mando =
                                                                        empleadosFiltrados.reduce(
                                                                            (
                                                                                min,
                                                                                empleado
                                                                            ) =>
                                                                                empleado.RANGO <
                                                                                    min.RANGO
                                                                                    ? empleado
                                                                                    : min,
                                                                            empleadosFiltrados[0]
                                                                        );

                                                                    if (
                                                                        nombre_mando
                                                                    ) {
                                                                        $(
                                                                            "#nom_mando"
                                                                        )
                                                                            .text(
                                                                                nombre_mando.EMP_NAME
                                                                            )
                                                                            .removeClass(
                                                                                "loading-animation"
                                                                            );
                                                                    } else {
                                                                        console.log(
                                                                            "No hay empleados en empleadosFiltrados."
                                                                        );
                                                                    }
                                                                }
                                                            }
                                                        } else if (
                                                            rangoDelEmpleado >=
                                                            10 &&
                                                            rangoDelEmpleado <=
                                                            15
                                                        ) {
                                                            var nombre_mando =
                                                                empleadosFiltrados.filter(
                                                                    (
                                                                        empleado
                                                                    ) => {
                                                                        return (
                                                                            empleado.DEPT ==
                                                                            departamento &&
                                                                            empleado.RANGO <
                                                                            rangoDelEmpleado
                                                                        );
                                                                    }
                                                                );
                                                            if (
                                                                nombre_mando.length >
                                                                0
                                                            ) {
                                                                // Ordenar el array por RANGO de menor a mayor
                                                                nombre_mando.sort(
                                                                    (a, b) =>
                                                                        a.RANGO -
                                                                        b.RANGO
                                                                );
                                                                // Obtener el empleado con el rango más bajo
                                                                nombre_mando =
                                                                    nombre_mando[0];
                                                                // console.log(
                                                                //     nombre_mando
                                                                // );
                                                                $("#nom_mando")
                                                                    .text(
                                                                        nombre_mando.EMP_NAME
                                                                    )
                                                                    .removeClass(
                                                                        "loading-animation"
                                                                    );
                                                            } else {
                                                                var nombre_mando =
                                                                    empleadosFiltrados.filter(
                                                                        (
                                                                            empleado
                                                                        ) => {
                                                                            return (
                                                                                empleado.DIRE ==
                                                                                direccion &&
                                                                                empleado.RANGO <
                                                                                rangoDelEmpleado
                                                                            );
                                                                        }
                                                                    );
                                                                if (
                                                                    nombre_mando.length >
                                                                    0
                                                                ) {
                                                                    // Ordenar el array por RANGO de menor a mayor
                                                                    nombre_mando.sort(
                                                                        (
                                                                            a,
                                                                            b
                                                                        ) =>
                                                                            a.RANGO -
                                                                            b.RANGO
                                                                    );
                                                                    // Obtener el empleado con el rango más bajo
                                                                    nombre_mando =
                                                                        nombre_mando[0];
                                                                    // console.log(
                                                                    //     nombre_mando
                                                                    // );
                                                                    $(
                                                                        "#nom_mando"
                                                                    )
                                                                        .text(
                                                                            nombre_mando.EMP_NAME
                                                                        )
                                                                        .removeClass(
                                                                            "loading-animation"
                                                                        );
                                                                }
                                                            }
                                                        } else if (
                                                            rangoDelEmpleado >=
                                                            16 &&
                                                            rangoDelEmpleado <=
                                                            20
                                                        ) {
                                                            var nombre_mando =
                                                                empleadosFiltrados.filter(
                                                                    (
                                                                        empleado
                                                                    ) => {
                                                                        return (
                                                                            empleado.ORGANIZACION ==
                                                                            organizacion &&
                                                                            empleado.RANGO <
                                                                            rangoDelEmpleado
                                                                        );
                                                                    }
                                                                );
                                                            if (
                                                                nombre_mando.length >
                                                                0
                                                            ) {
                                                                // Ordenar el array por RANGO de menor a mayor
                                                                nombre_mando.sort(
                                                                    (a, b) =>
                                                                        a.RANGO -
                                                                        b.RANGO
                                                                );
                                                                // Obtener el empleado con el rango más bajo
                                                                nombre_mando =
                                                                    nombre_mando[0];
                                                                // console.log(
                                                                //     nombre_mando
                                                                // );
                                                                $("#nom_mando")
                                                                    .text(
                                                                        nombre_mando.EMP_NAME
                                                                    )
                                                                    .removeClass(
                                                                        "loading-animation"
                                                                    );
                                                            } else {
                                                                var nombre_mando =
                                                                    empleadosFiltrados.filter(
                                                                        (
                                                                            empleado
                                                                        ) => {
                                                                            return (
                                                                                empleado.DEPT ==
                                                                                departamento &&
                                                                                empleado.RANGO <
                                                                                rangoDelEmpleado
                                                                            );
                                                                        }
                                                                    );
                                                                if (
                                                                    nombre_mando.length >
                                                                    0
                                                                ) {
                                                                    // Ordenar el array por RANGO de menor a mayor
                                                                    nombre_mando.sort(
                                                                        (
                                                                            a,
                                                                            b
                                                                        ) =>
                                                                            a.RANGO -
                                                                            b.RANGO
                                                                    );
                                                                    // Obtener el empleado con el rango más bajo
                                                                    nombre_mando =
                                                                        nombre_mando[0];
                                                                    // console.log(
                                                                    //     nombre_mando
                                                                    // );
                                                                    $(
                                                                        "#nom_mando"
                                                                    )
                                                                        .text(
                                                                            nombre_mando.EMP_NAME
                                                                        )
                                                                        .removeClass(
                                                                            "loading-animation"
                                                                        );
                                                                }
                                                            }
                                                        } else {
                                                            console.log(
                                                                "El rango del empleado no está entre 1 y 10."
                                                            );
                                                        }
                                                    } else {
                                                        console.log(
                                                            "No se encontró un RANGO correspondiente para el empleado"
                                                        );
                                                    }
                                                    //______________________________________________________________________________
                                                } else {
                                                    //Quire decir q va mos a buscar a el "mando" del empleado
                                                    var empleadosConOrganizacion =
                                                        empleadosFiltrados.filter(
                                                            function (
                                                                empleado
                                                            ) {
                                                                return (
                                                                    empleado.ORGANIZACION ===
                                                                    organizacion
                                                                );
                                                            }
                                                        );
                                                    //--------
                                                    if (
                                                        empleadosConOrganizacion.length >
                                                        0
                                                    ) {
                                                        // Limpiar cualquier contenido existente en el elemento con id "nom_mando"
                                                        $("#nom_mando").empty();

                                                        // Iterar sobre los empleados y agregar sus nombres al elemento
                                                        $.each(
                                                            empleadosConOrganizacion,
                                                            function (
                                                                index,
                                                                empleado
                                                            ) {
                                                                var nombreCompleto =
                                                                    empleado.EMP_NAME;
                                                                $("#nom_mando")
                                                                    .append(
                                                                        nombreCompleto
                                                                    )
                                                                    .removeClass(
                                                                        "loading-animation"
                                                                    );

                                                                // Agregar un salto de línea si hay más de un empleado
                                                                if (
                                                                    empleadosConOrganizacion.length >
                                                                    1 &&
                                                                    index <
                                                                    empleadosConOrganizacion.length -
                                                                    1
                                                                ) {
                                                                    $(
                                                                        "#nom_mando"
                                                                    ).append(
                                                                        "<br>"
                                                                    );
                                                                }
                                                            }
                                                        );
                                                        //--------
                                                    } else {
                                                        console.log(
                                                            "No se encontró ningún empleado con la organización especificada."
                                                        );
                                                        // Limpiar el contenido del elemento si no se encuentra ningún empleado
                                                        document.getElementById(
                                                            "nom_mando"
                                                        ).innerHTML = "";
                                                    }
                                                }
                                                //______________________________________________________________________________
                                                //______________________________________________________________________________
                                                //______________________________________________________________________________
                                            })
                                            .catch(function () {
                                                console.log(
                                                    "Error al obtener Mandos"
                                                );
                                            });
                                        //----------------------------------------------------------------
                                    })
                                    .catch(function () {
                                        console.log(
                                            "Error al obtener aprobaciones"
                                        );
                                    });
                                //----------------------------------------------------------------
                            })
                            .catch(function () {
                                console.log("Error al obtener Empleados");
                            });
                        //----------------------------------------------------------------
                    })
                    .catch(function () {
                        console.log("Error al obtener org_dire_dept");
                    });
                //----------------------------------------------------------------
            }, 2000);
            break;
    }
}
// trae todo de la tabla de xxhr_status
function getstatus() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: getStatusRoute,
                dataType: "json",
                method: "POST",
                success: function (response) {
                    let dato_x = JSON.parse(atob(response.datos));

                    if (dato_x.status == 200) {
                        resolve(dato_x);
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
//Verifica la secion de q no haya sido destruida
// function verifica_sesion() {
//     return new Promise(function (resolve, reject) {
//         function makeRequest() {
//             $.ajax({
//                 url: verificaSesionRoute,
//                 dataType: "json",
//                 method: "POST",
//                 success: function (response) {
//                     if (response.status == 700) {
//                         setTimeout(cerrarSesion, 1000);
//                         reject("Sesión Invalida");
//                     }
//                     if (response.status == 200) {
//                         // setTimeout(makeRequest, 5000);
//                         // resolve(response);
//                         //console.log(response);
//                     }
//                 },
//                 error: function () {
//                     // setTimeout(makeRequest, 3000);
//                 },
//             });
//         }
//         makeRequest();
//     });
// }
//Me trae todos los permisos economicos de un empleado
function getpermisos(numEmp) {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: getpermisosRoute,
                dataType: "json",
                method: "POST",
                data: {
                    numEmp: numEmp,
                },
                success: function (response) {
                    if (response.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
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
// funcion q calcula la antiguedad del empleado despues de su base deben de pasar 6 meses
function antiguedad(numEmp, callback) {
    function makeRequest() {
        $.ajax({
            url: antiguedadRoute,
            dataType: "json",
            method: "POST",
            data: {
                numEmp: numEmp,
            },
            success: function (response) {
                let dato_x = JSON.parse(atob(response.datos));

                if (dato_x.status == 200) {
                    // console.log(dato_x);
                    if (dato_x.info != "No") {
                        var datos = dato_x.info;
                        // Obtén la fecha actual
                        var fechaActual = new Date();
                        // console.log(fechaActual);

                        // Obtén la fecha de ingreso (asumiendo que la fecha está en el formato correcto)
                        var fechaIngreso = new Date(
                            datos.EMP_ACT_CON + "T00:00:00"
                        );
                        // console.log(datos.EMP_ACT_CON);
                        // Añadir la hora para evitar problemas con la zona horaria
                        // Calcula la diferencia en meses
                        var diferenciaMeses =
                            (fechaActual.getFullYear() -
                                fechaIngreso.getFullYear()) *
                            12 +
                            (fechaActual.getMonth() - fechaIngreso.getMonth());

                        // Verifica si la diferencia es mayor o igual a 6 meses
                        // o si es exactamente 6 meses y el día actual es igual o mayor al día de ingreso
                        if (
                            diferenciaMeses > 6 ||
                            (diferenciaMeses === 6 &&
                                fechaActual.getDate() >= fechaIngreso.getDate())
                        ) {
                            // Llama a la función de devolución de llamada con el resultado
                            callback(true); // 6 meses o más
                        } else {
                            // Calcula la fecha en la que se cumplirán los 6 meses
                            var fechaCumplimiento = new Date(fechaIngreso);
                            fechaCumplimiento.setMonth(
                                fechaCumplimiento.getMonth() + 6
                            );

                            // Formatea la fecha para mostrar en el mensaje
                            var options = {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            };
                            var fechaCumplimientoFormateada =
                                fechaCumplimiento.toLocaleDateString(
                                    "es-MX",
                                    options
                                );

                            // Calcula la diferencia de días entre la fecha actual y la fecha de cumplimiento
                            var diferenciaDias = Math.ceil(
                                (fechaCumplimiento - fechaActual) /
                                (1000 * 60 * 60 * 24)
                            );

                            // Construye el mensaje con la información de cuánto tiempo falta
                            var mensaje =
                                "Este módulo estará disponible el " +
                                fechaCumplimientoFormateada +
                                ". Faltan " +
                                diferenciaDias +
                                " día(s).";

                            // Llama a la función de devolución de llamada con el mensaje
                            callback(false, mensaje); // Menos de 6 meses o día actual menor
                        }
                    }
                }
                if (dato_x.status == 400) {
                    alert("info", dato_x.msj);
                }
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = `${Route}`;
                }
                setTimeout(makeRequest, 1500);
            },
        });
    }
    makeRequest();
}
function Topado() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: TopadoRoute,
                dataType: "json",
                method: "POST",
                success: function (response) {
                    var datos = JSON.parse(atob(response.datos));

                    if (datos.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                        reject("Sesión cerrada");
                    }
                    if (datos.status == 200) {
                        resolve(datos);
                        // console.log(datos);
                    }
                    if (datos.status == 400) {
                        resolve(datos);
                        // console.log(datos);
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
// ------------------- 
function ver_pdf(id) {
    function makeRequest() {
        $.ajax({
            url: ver_pdfRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Especificar propiedades de la nueva pestaña flotante
                    var windowProperties = {
                        height: 700,
                        width: 1000,
                        toolbar: 'no',
                    };

                    // Utilizar window.open para abrir el PDF en una nueva pestaña flotante con propiedades
                    var newWindow = window.open(response.pdfUrl, '_blank', Object.entries(windowProperties).map(e => e.join('=')).join(','));

                    // Puedes enfocar la nueva pestaña flotante si es necesario
                    newWindow.focus();

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
function ver_xml(id) {
    function makeRequest() {
        $.ajax({
            url: ver_xmlRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Especificar propiedades de la nueva ventana
                    var windowProperties = {
                        width: 800,
                        height: 600,
                        toolbar: 'no',
                    };
                    // console.log(windowProperties);
                    // Utilizar window.open para abrir el PDF en una nueva pestaña con propiedades
                    var newWindow = window.open(response.xmlUrl, '_blank', Object.entries(windowProperties).map(e => e.join('=')).join(','));

                    // Puedes enfocar la nueva ventana si es necesario
                    newWindow.focus();

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
function descargar_pdf(id) {
    function makeRequest() {
        $.ajax({
            url: ver_pdfRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Crear un elemento 'a' para el enlace de descarga
                    var downloadLink = document.createElement('a');
                    downloadLink.href = response.pdfUrl;
                    downloadLink.download = response.nombrePDF;  // Puedes establecer el nombre del archivo deseado

                    // Hacer clic en el enlace para iniciar la descarga
                    downloadLink.click();

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
function descargar_xml(id) {
    function makeRequest() {
        $.ajax({
            url: ver_xmlRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Crear un elemento 'a' para el enlace de descarga
                    var downloadLink = document.createElement('a');
                    downloadLink.href = response.xmlUrl;
                    downloadLink.download = response.nombreXML;  // Puedes establecer el nombre del archivo deseado

                    // Hacer clic en el enlace para iniciar la descarga
                    downloadLink.click();

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
function ver_comprobante(id) {
    console.log(id);
    function makeRequest() {
        $.ajax({
            url: ver_comprobanteRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Especificar propiedades de la nueva pestaña flotante
                    var windowProperties = {
                        height: 700,
                        width: 1000,
                        toolbar: 'no',
                    };

                    // Utilizar window.open para abrir el PDF en una nueva pestaña flotante con propiedades
                    var newWindow = window.open(response.pdfUrl, '_blank', Object.entries(windowProperties).map(e => e.join('=')).join(','));

                    // Puedes enfocar la nueva pestaña flotante si es necesario
                    newWindow.focus();

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
function descargar_comprobante(id) {
    function makeRequest() {
        $.ajax({
            url: ver_comprobanteRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Crear un elemento 'a' para el enlace de descarga
                    var downloadLink = document.createElement('a');
                    downloadLink.href = response.pdfUrl;
                    downloadLink.download = response.nombrePDF;  // Puedes establecer el nombre del archivo deseado

                    // Hacer clic en el enlace para iniciar la descarga
                    downloadLink.click();

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
// -------
function ver_Vale(id) {
    function makeRequest() {
        $.ajax({
            url: ver_ValeRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Especificar propiedades de la nueva pestaña flotante
                    var windowProperties = {
                        height: 700,
                        width: 1000,
                        toolbar: 'no',
                    };
                    // Utilizar window.open para abrir el PDF en una nueva pestaña flotante con propiedades
                    var newWindow = window.open(response.Url, '_blank', Object.entries(windowProperties).map(e => e.join('=')).join(','));

                    // Puedes enfocar la nueva pestaña flotante si es necesario
                    newWindow.focus();
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
function descargar_Vale(id) {
    function makeRequest() {
        $.ajax({
            url: ver_ValeRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Crear un elemento 'a' para el enlace de descarga
                    var downloadLink = document.createElement('a');
                    downloadLink.href = response.Url;
                    downloadLink.download = response.nombreDoc;

                    // Hacer clic en el enlace para iniciar la descarga
                    downloadLink.click();

                } else {
                    alerta("info", "Documento no encontrado")
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
function ver_Odontograma(id) {
    function makeRequest() {
        $.ajax({
            url: ver_OdontogramaRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Especificar propiedades de la nueva pestaña flotante
                    var windowProperties = {
                        height: 700,
                        width: 1000,
                        toolbar: 'no',
                    };
                    // Utilizar window.open para abrir el PDF en una nueva pestaña flotante con propiedades
                    var newWindow = window.open(response.Url, '_blank', Object.entries(windowProperties).map(e => e.join('=')).join(','));

                    // Puedes enfocar la nueva pestaña flotante si es necesario
                    newWindow.focus();
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
function descarga_Odontograma(id) {
    function makeRequest() {
        $.ajax({
            url: ver_OdontogramaRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Crear un elemento 'a' para el enlace de descarga
                    var downloadLink = document.createElement('a');
                    downloadLink.href = response.Url;
                    downloadLink.download = response.nombreDoc;

                    // Hacer clic en el enlace para iniciar la descarga
                    downloadLink.click();

                } else {
                    alerta("info", "Documento no encontrado")
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
function ver_factura(id, tipo) {
    console.log(tipo);
    function makeRequest() {
        let num = $("#inputGroupSelect").val();
        $.ajax({
            url: ver_facturaRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
                num: num,
                tipo: tipo,
            },
            success: function (response) {
                if (response.status == 200) {
                    // Especificar propiedades de la nueva pestaña flotante
                    var windowProperties = {
                        height: 700,
                        width: 1000,
                        toolbar: 'no',
                    };
                    // Utilizar window.open para abrir el PDF en una nueva pestaña flotante con propiedades
                    var newWindow = window.open(response.Url, '_blank', Object.entries(windowProperties).map(e => e.join('=')).join(','));

                    // Puedes enfocar la nueva pestaña flotante si es necesario
                    newWindow.focus();
                } else {
                    alerta("info", "Documento no encontrado")
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
function descargar_factura(id, tipo) {
    console.log(tipo);
    function makeRequest() {
        let num = $("#inputGroupSelect").val();
        $.ajax({
            url: ver_facturaRoute,
            dataType: "json",
            method: "POST",
            data: {
                id_pre: id,
                num: num,
                tipo: tipo,
            },
            success: function (response) {

                if (response.status == 200) {
                    // Crear un elemento 'a' para el enlace de descarga
                    var downloadLink = document.createElement('a');
                    downloadLink.href = response.Url;
                    downloadLink.download = response.nombreDoc;

                    // Hacer clic en el enlace para iniciar la descarga
                    downloadLink.click();

                } else {
                    alerta("info", "Documento no encontrado")
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
// PROMESA Q ME TRAE DATOS DE UNA PRESTACION 
function DatosPrestacion(id) {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: DatosPrestacionRoute,
                dataType: "json",
                method: "POST",
                data: {
                    id: id,
                },
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    setTimeout(makeRequest, 1000);
                },
            });
        }
        makeRequest();
    });
}
// -------------------
function Verificar_Prestacion() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: Verificar_PrestacionRoute,
                dataType: "json",
                method: "POST",
                data: {
                    empNum: appData.numEmp,
                    tipo: appData.Prestacion_actual,
                },
                success: function (response) {
                    let dato_x = JSON.parse(atob(response.datos));

                    if (dato_x.status == 200) {
                        resolve(dato_x);
                        // console.log(dato_x);
                    }
                    if (dato_x.status == 500) {
                        resolve(dato_x);
                        // console.log(dato_x);
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        window.location.href = `${Route}`;
                    }
                    setTimeout(makeRequest, 1500);
                },
            });
        }
        makeRequest();
    });
}
function creacion_vale() {
    // Default export is letter paper, portrait, using inches for units
    const doc = new jsPDF();
    var logoImage = new Image();
    logoImage.src = appData.logo_uteq;

    // Esperar a que la imagen se cargue antes de agregarla al PDF
    logoImage.onload = function () {
        // Establecer el color de la línea en negro
        doc.setDrawColor(0, 0, 0);
        // Configurar estilo para el encabezado de la tabla
        const tableHeaderStyles = {
            fillColor: [135, 206, 250], // Azul cielo
            fontStyle: 'bold',
            fontSize: 9,
            textColor: [0, 0, 0], // Color del texto negro
            lineWidth: 0.1, // Grosor del borde
            lineColor: [0, 0, 0], // Color del borde (negro)
            align: 'center', // Centrar el texto horizontalmente
        };
        // Ajustar los tamaños de los márgenes
        const marginLeft = 13; // Márgenes laterales
        const marginTop = 20; // Márgen superior
        const marginBottom = 30; // Márgen inferior

        // Obtener el tamaño de la página
        const pageSize = doc.internal.pageSize;

        // Agregar bordes alrededor del documento con márgenes diferentes
        doc.rect(marginLeft, marginTop, pageSize.width - 2 * marginLeft, pageSize.height - marginTop - marginBottom);
        // ----------------------------------------------
        // ------------------ FECHA ACTUAL --------------
        // ----------------------------------------------
        // Get the current date in Mexico City time zone
        const currentDate = new Date().toLocaleDateString('es-MX', {
            timeZone: 'America/Mexico_City',
        });
        // Extract day, month, and year components
        const [day, month, year] = currentDate.split('/');
        // Add leading zeros if the day or month is a single digit
        const formattedDay = day.padStart(2, '0');
        const formattedMonth = month.padStart(2, '0');
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const textLines = [
            "              GR-F-64-O",
            "                 Rev. 01",
            "Fecha: 25-mar-2024"
        ];
        const textX = pageSize.width - marginLeft - 25; // Posicionar a la derecha
        let textY = 10; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        textLines.forEach(line => {
            doc.text(line, textX, textY);
            textY += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const textLines_titulo = [
            "UNIVERSIDAD TECNOLÓGUICA DE QUERETARO",
            "  SUBDIRECCIÓN DE RECURSOS HUMANOS ",
            "                       VALE DE SERVICIO",
            "           AYUDA PARA PRÓTESIS DENTAL"
        ];
        const textX_titulo = marginLeft + 50; // Posicionar a la derecha
        let textY_titulo = marginTop + 5; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("bold"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        textLines_titulo.forEach(line => {
            doc.text(line, textX_titulo, textY_titulo);
            textY_titulo += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar tamaño y posición de la imagen
        const imageX = marginLeft + 1; // Ajusta la posición horizontal de la imagen
        const imageY = marginTop + 1; // Ajusta la posición vertical de la imagen
        const imageWidth = 48; // Ancho de la imagen
        const imageHeight = 23; // Altura de la imagen
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar la imagen al PDF
        doc.addImage(logoImage, 'PNG', imageX, imageY, imageWidth, imageHeight);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición, tamaño y dividir el texto en dos líneas
        const vigenciaTextLine1 = "Al finalizar su tratamiento, enviar al correo nsoto@uteq.edu.mx este vale, el odontograma y la factura original.";
        const vigenciaTextLine2 = "";
        const vigenciaX = marginLeft + 0; // Posicionar a la izquierda
        const vigenciaY = pageSize.height - marginBottom + 8; // Posicionar fuera del margen inferior
        const fontSize = 9; // Tamaño de letra para el texto inferior
        const lineHeight = -5; // Separación entre líneas
        // Ajustar el tamaño y estilo de la fuente para el texto inferior
        doc.setFontSize(fontSize);
        doc.setFontStyle("bold"); // Estilo de fuente normal
        // Agregar las dos líneas de texto inferior con separación entre líneas
        doc.text(vigenciaTextLine1, vigenciaX, vigenciaY);
        doc.text(vigenciaTextLine2, vigenciaX, vigenciaY + fontSize + lineHeight);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_1 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_1 = marginTop + 25; // Posición vertical de la línea
        const lineWidth_1 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_1 = 0; // Grosor de la línea
        const lineColor = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_1, lineY_1, lineWidth_1, lineHeight_1, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_2 = marginLeft + 120; // Posición horizontal de la línea
        const lineY_2 = marginTop + 0; // Posición vertical de la línea
        const lineHeight_2 = 25; // Altura de la línea (ajustable verticalmente)
        const lineWidth_2 = 0; // Grosor de la línea
        const lineColor_2 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_2[0], lineColor_2[1], lineColor_2[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_2, lineY_2, lineWidth_2, lineHeight_2, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_3 = marginLeft + 120; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_3 = marginTop + 6; // Posición vertical de la línea
        const lineWidth_3 = 64; // Ancho de la línea (ajustable horizontalmente)
        const lineHeight_3 = 0; // Grosor de la línea
        const lineColor_3 = [0, 0, 0]; // Color de la línea en RGB

        // Establecer el color de la línea
        doc.setDrawColor(lineColor_3[0], lineColor_3[1], lineColor_3[2]);

        // Dibujar la línea horizontal
        doc.rect(lineX_3, lineY_3, lineWidth_3, lineHeight_3, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const folioText = "FOLIO";
        const folioX = marginLeft + 145; // Posición horizontal del texto
        const folioY = marginTop + 5; // Posición vertical del texto
        const fontSizeFolio = 10; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSizeFolio);

        // Agregar el texto "FOLIO" al PDF
        doc.text(folioText, folioX, folioY);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_4 = marginLeft + 120; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_4 = marginTop + 12; // Posición vertical de la línea
        const lineWidth_4 = 64; // Ancho de la línea (ajustable horizontalmente)
        const lineHeight_4 = 0; // Grosor de la línea
        const lineColor_4 = [0, 0, 0]; // Color de la línea en RGB

        // Establecer el color de la línea
        doc.setDrawColor(lineColor_4[0], lineColor_4[1], lineColor_4[2]);

        // Dibujar la línea horizontal
        doc.rect(lineX_4, lineY_4, lineWidth_4, lineHeight_4, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_5 = marginLeft + 140; // Posición horizontal de la línea
        const lineY_5 = marginTop + 16; // Posición vertical de la línea
        const lineHeight_5 = 9; // Altura de la línea (ajustable verticalmente)
        const lineWidth_5 = 0; // Grosor de la línea
        const lineColor_5 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_5[0], lineColor_5[1], lineColor_5[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_5, lineY_5, lineWidth_5, lineHeight_5, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_6 = marginLeft + 160; // Posición horizontal de la línea
        const lineY_6 = marginTop + 16; // Posición vertical de la línea
        const lineHeight_6 = 9; // Altura de la línea (ajustable verticalmente)
        const lineWidth_6 = 0; // Grosor de la línea
        const lineColor_6 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_6[0], lineColor_6[1], lineColor_6[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_6, lineY_6, lineWidth_6, lineHeight_6, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // const additionalText = "DÍA\n08";
        const additionalTextX_dia = marginLeft + 128; // Posicionar a la derecha
        const additionalTextY_dia = marginTop + 16; // Posicionar debajo del texto existente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal

        // Ajustar posición en Y para separar "DÍA" de "08"
        const diaTextY_dia = additionalTextY_dia + 2; // Ajusta la posición en Y para "DÍA"
        const numeroTextY_dia = diaTextY_dia + 4; // Ajusta la posición en Y para "08"

        // Agregar las líneas de texto adicionales al PDF
        doc.text("DÍA", additionalTextX_dia, diaTextY_dia);
        doc.text(formattedDay, additionalTextX_dia, numeroTextY_dia);  // Use the formatted day
        // ----------------------------------------------
        // ----------------------------------------------
        const additionalTextX_mes = marginLeft + 147; // Posicionar a la derecha
        const additionalTextY_mes = marginTop + 16; // Posicionar debajo del texto existente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal

        // Ajustar posición en Y para separar "DÍA" de "08"
        const diaTextY_mes = additionalTextY_mes + 2; // Ajusta la posición en Y para "DÍA"
        const numeroTextY_mes = diaTextY_mes + 4; // Ajusta la posición en Y para "08"

        // Agregar las líneas de texto adicionales al PDF
        doc.text("MES", additionalTextX_mes, diaTextY_mes);
        doc.text(formattedMonth, additionalTextX_mes, numeroTextY_mes);  // Use the formatted month
        // ----------------------------------------------
        // ----------------------------------------------
        const additionalTextX_año = marginLeft + 170; // Posicionar a la derecha
        const additionalTextY_año = marginTop + 16; // Posicionar debajo del texto existente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal

        // Ajustar posición en Y para separar "DÍA" de "08"
        const diaTextY_año = additionalTextY_año + 2; // Ajusta la posición en Y para "DÍA"
        const numeroTextY_año = diaTextY_año + 4; // Ajusta la posición en Y para "08"

        // Agregar las líneas de texto adicionales al PDF
        doc.text("AÑO", additionalTextX_año, diaTextY_año);
        doc.text(year, additionalTextX_año, numeroTextY_año);  // Set the current year
        // ----------------------------------------------
        // ----------------------------------------------




        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const folioNUM = "1";
        const folioNUMX = marginLeft + 150; // Posición horizontal del texto
        const folioNUMY = marginTop + 10; // Posición vertical del texto
        const fontSizeFolioNUM = 10; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSizeFolioNUM);

        // Agregar el texto "FOLIO" al PDF
        doc.text(folioNUM, folioNUMX, folioNUMY);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_7 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_7 = marginTop + 30; // Posición vertical de la línea
        const lineWidth_7 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_7 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_7, lineY_7, lineWidth_7, lineHeight_7, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_8 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_8 = marginTop + 45; // Posición vertical de la línea
        const lineWidth_8 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_8 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_8, lineY_8, lineWidth_8, lineHeight_8, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_9 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_9 = marginTop + 60; // Posición vertical de la línea
        const lineWidth_9 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_9 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_9, lineY_9, lineWidth_9, lineHeight_9, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_10 = marginLeft + 92; // Posición horizontal de la línea
        const lineY_10 = marginTop + 30; // Posición vertical de la línea
        const lineHeight_10 = 15; // Altura de la línea (ajustable verticalmente)
        const lineWidth_10 = 0; // Grosor de la línea
        const lineColor_10 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_10[0], lineColor_10[1], lineColor_10[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_10, lineY_10, lineWidth_10, lineHeight_10, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------



        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const TextNumEmp = "No. DE EMPLEADO:";
        const X_TextNumEmp = marginLeft + 2; // Posición horizontal del texto
        const Y_TextNumEmp = marginTop + 33; // Posición vertical del texto
        const fontSize_TextNumEmp = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_TextNumEmp);

        // Agregar el texto "FOLIO" al PDF
        doc.text(TextNumEmp, X_TextNumEmp, Y_TextNumEmp);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        // const NumEmp = appData.numEmp;
        const X_NumEmp = marginLeft + 50; // Posición horizontal del texto
        const Y_NumEmp = marginTop + 42; // Posición vertical del texto
        const fontSize_NumEmp = 10; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_NumEmp);

        // Agregar el texto "FOLIO" al PDF
        doc.text(appData.numEmp.toString(), X_NumEmp, Y_NumEmp);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const TextPrestacion = "NOMBRE DEL SOLICITANTE:";
        const X_TextPrestacion = marginLeft + 94; // Posición horizontal del texto
        const Y_TextPrestacion = marginTop + 33; // Posición vertical del texto
        const fontSize_TextPrestacion = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_TextPrestacion);

        // Agregar el texto "FOLIO" al PDF
        doc.text(TextPrestacion, X_TextPrestacion, Y_TextPrestacion);
        // ----------------------------------------------
        // ----------------------------------------------
        const Prestacion = nombreEmpleadoInicioSecion;
        const X_Prestacion = marginLeft + 98; // Posición horizontal del texto
        const Y_Prestacion = marginTop + 42; // Posición vertical del texto
        const fontSize_Prestacion = TamañoLetra; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_Prestacion);

        // Agregar el texto "FOLIO" al PDF
        doc.text(Prestacion, X_Prestacion, Y_Prestacion);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const valeExpedidoPor = "VALE EXPEDIDO POR";
        const X_valeExpedidoPor = marginLeft + 80; // Posición horizontal del texto
        const Y_valeExpedidoPor = marginTop + 48; // Posición vertical del texto
        const fontSize_valeExpedidoPor = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_valeExpedidoPor);

        // Agregar el texto "FOLIO" al PDF
        doc.text(valeExpedidoPor, X_valeExpedidoPor, Y_valeExpedidoPor);
        // ----------------------------------------------
        // ----------------------------------------------
        const Secretaria = "Coordinador Administrativo de Recursos Humanos";
        const X_Secretaria = marginLeft + 65; // Posición horizontal del texto
        const Y_Secretaria = marginTop + 55; // Posición vertical del texto
        const fontSize_Secretaria = 8; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_Secretaria);

        // Agregar el texto "FOLIO" al PDF
        doc.text(Secretaria, X_Secretaria, Y_Secretaria);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_11 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_11 = marginTop + 66; // Posición vertical de la línea
        const lineWidth_11 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_11 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_11, lineY_11, lineWidth_11, lineHeight_11, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_12 = marginLeft + 92; // Posición horizontal de la línea
        const lineY_12 = marginTop + 60; // Posición vertical de la línea
        const lineHeight_12 = 25; // Altura de la línea (ajustable verticalmente)
        const lineWidth_12 = 0; // Grosor de la línea
        const lineColor_12 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_12[0], lineColor_12[1], lineColor_12[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_12, lineY_12, lineWidth_12, lineHeight_12, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        const TextPreviaCita = "PREVIA CITA A LOS TELS";
        const X_TextPreviaCita = marginLeft + 117; // Posición horizontal del texto
        const Y_TextPreviaCita = marginTop + 64; // Posición vertical del texto
        const fontSize_TextPreviaCita = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_TextPreviaCita);

        // Agregar el texto "FOLIO" al PDF
        doc.text(TextPreviaCita, X_TextPreviaCita, Y_TextPreviaCita);
        // ----------------------------------------------
        // ----------------------------------------------
        const Text_Valoracion = "ACUDIR PARA VLORACIÓN";
        const X_Text_Valoracion = marginLeft + 30; // Posición horizontal del texto
        const Y_Text_Valoracion = marginTop + 64; // Posición vertical del texto
        const fontSize_Text_Valoracion = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_Text_Valoracion);

        // Agregar el texto "FOLIO" al PDF
        doc.text(Text_Valoracion, X_Text_Valoracion, Y_Text_Valoracion);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_Valoracion = [
            "Consultorio del especialista autorizado ubicado en: Pedro de",
            "                                 de Gente No,31",
            "                                  Col. Cimatario",
        ];
        const X_Valoracion = marginLeft + 4; // Posicionar a la derecha
        let Y_Valoracion = marginTop + 73; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(9); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_Valoracion.forEach(line => {
            doc.text(line, X_Valoracion, Y_Valoracion);
            Y_Valoracion += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_FirmaValoracion = [
            "(442) 212 02 99",
            "(442) 212 64 84",
        ];
        const X_FirmaValoracion = marginLeft + 122; // Posicionar a la derecha
        let Y_FirmaValoracion = marginTop + 74; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(9); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_FirmaValoracion.forEach(line => {
            doc.text(line, X_FirmaValoracion, Y_FirmaValoracion);
            Y_FirmaValoracion += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Crear una tabla con un solo cuadrado en el encabezado
        const tableFirmaEspecialista = [
            ['                                                  FIRMA DEL ESPECIALISTA DR. CARLOS MARTÍNEZ CÁRDENAS']
        ];

        // Ajustar la posición horizontal de la tabla
        const tableFirmaEspecialistaMarginLeft = marginLeft;
        const tableFirmaEspecialistaMarginRight = marginLeft; // Ten en cuenta el margen izquierdo y derecho
        // Agregar la tabla al PDF
        doc.autoTable({
            head: [tableFirmaEspecialista],
            startY: marginTop + 85, // Ajustar la posición vertical de la tabla
            theme: 'grid',
            headStyles: tableHeaderStyles,
            tableWidth: 'auto', // Ajustar el ancho de la tabla automáticamente
            margin: { left: tableFirmaEspecialistaMarginLeft, right: tableFirmaEspecialistaMarginRight }, // Ajustar la posición horizontal de la tabla
            bodyStyles: { fontSize: 8.5 },
            columnStyles: { 0: { cellWidth: 'auto' } },
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_13 = marginLeft + 46; // Posición horizontal de la línea
        const lineY_13 = marginTop + 92; // Posición vertical de la línea
        const lineHeight_13 = 26; // Altura de la línea (ajustable verticalmente)
        const lineWidth_13 = 0; // Grosor de la línea
        const lineColor_13 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_13[0], lineColor_13[1], lineColor_13[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_13, lineY_13, lineWidth_13, lineHeight_13, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_15 = marginLeft + 138; // Posición horizontal de la línea
        const lineY_15 = marginTop + 92; // Posición vertical de la línea
        const lineHeight_15 = 26; // Altura de la línea (ajustable verticalmente)
        const lineWidth_15 = 0; // Grosor de la línea
        const lineColor_15 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_15[0], lineColor_15[1], lineColor_15[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_15, lineY_15, lineWidth_15, lineHeight_15, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const FECHA = "FECHA";
        const X_FECHA = marginLeft + 19; // Posición horizontal del texto
        const Y_FECHA = marginTop + 114; // Posición vertical del texto
        const fontSize_FECHA = 8; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_FECHA);

        // Agregar el texto "FOLIO" al PDF
        doc.text(FECHA, X_FECHA, Y_FECHA);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_PreviaCita = [
            "FIRMA DE VALORACIÓN",
            "               INICIAL",
        ];
        const X_PreviaCita = marginLeft + 53; // Posicionar a la derecha
        let Y_PreviaCita = marginTop + 112; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_PreviaCita.forEach(line => {
            doc.text(line, X_PreviaCita, Y_PreviaCita);
            Y_PreviaCita += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const FECHA2 = "FECHA";
        const X_FECHA2 = marginLeft + 110; // Posición horizontal del texto
        const Y_FECHA2 = marginTop + 114; // Posición vertical del texto
        const fontSize_FECHA2 = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_FECHA2);

        // Agregar el texto "FOLIO" al PDF
        doc.text(FECHA2, X_FECHA2, Y_FECHA2);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_FirmaValoracion2 = [
            "FIRMA DE VERIFICACIÓN",
            "               FINAL",
        ];
        const X_FirmaValoracion2 = marginLeft + 143; // Posicionar a la derecha
        let Y_FirmaValoracion2 = marginTop + 112; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_FirmaValoracion2.forEach(line => {
            doc.text(line, X_FirmaValoracion2, Y_FirmaValoracion2);
            Y_FirmaValoracion2 += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Crear una tabla con un solo cuadrado en el encabezado
        const tabletableDecPiezas = [
            ['']
        ];

        // Ajustar la posición horizontal de la tabla
        const tabletableDecPiezasMarginLeft = marginLeft;
        const tabletableDecPiezasMarginRight = marginLeft; // Ten en cuenta el margen izquierdo y derecho
        // Agregar la tabla al PDF
        doc.autoTable({
            head: [tabletableDecPiezas],
            startY: marginTop + 118, // Ajustar la posición vertical de la tabla
            theme: 'grid',
            headStyles: tableHeaderStyles,
            // tableWidth: 'auto', // Ajustar el ancho de la tabla automáticamente
            margin: { left: tabletableDecPiezasMarginLeft, right: tabletableDecPiezasMarginRight }, // Ajustar la posición horizontal de la tabla
            bodyStyles: { fontSize: 5 },
            columnStyles: { 0: { cellWidth: 'auto' } },
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const piezas = "DESCRIPCIÓN DE PIEZAS (lo llena el especialista autorizado)";
        const X_piezas = marginLeft + 2; // Posición horizontal del texto
        const Y_piezas = marginTop + 123; // Posición vertical del texto
        const fontSize_piezas = 8.5; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_piezas);

        // Agregar el texto "FOLIO" al PDF
        doc.text(piezas, X_piezas, Y_piezas);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const Apagar = "IMPORTE A PAGAR (se llena en Recursos Humanos)";
        const X_Apagar = marginLeft + 100; // Posición horizontal del texto
        const Y_Apagar = marginTop + 123; // Posición vertical del texto
        const fontSize_Apagar = 8.5; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_Apagar);

        // Agregar el texto "FOLIO" al PDF
        doc.text(Apagar, X_Apagar, Y_Apagar);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_14 = marginLeft + 92; // Posición horizontal de la línea
        const lineY_14 = marginTop + 92; // Posición vertical de la línea
        const lineHeight_14 = 95; // Altura de la línea (ajustable verticalmente)
        const lineWidth_14 = 0; // Grosor de la línea
        const lineColor_14 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_14[0], lineColor_14[1], lineColor_14[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_14, lineY_14, lineWidth_14, lineHeight_14, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------||||||||||||||||||
        // ----------------------------------------------||||||||||||||||||
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_16 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_16 = marginTop + 131; // Posición vertical de la línea
        const lineWidth_16 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_16 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_16, lineY_16, lineWidth_16, lineHeight_16, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_17 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_17 = marginTop + 136; // Posición vertical de la línea
        const lineWidth_17 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_17 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_17, lineY_17, lineWidth_17, lineHeight_17, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_18 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_18 = marginTop + 141; // Posición vertical de la línea
        const lineWidth_18 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_18 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_18, lineY_18, lineWidth_18, lineHeight_18, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_19 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_19 = marginTop + 146; // Posición vertical de la línea
        const lineWidth_19 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_19 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_19, lineY_19, lineWidth_19, lineHeight_19, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_20 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_20 = marginTop + 151; // Posición vertical de la línea
        const lineWidth_20 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_20 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_20, lineY_20, lineWidth_20, lineHeight_20, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_21 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_21 = marginTop + 156; // Posición vertical de la línea
        const lineWidth_21 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_21 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_21, lineY_21, lineWidth_21, lineHeight_21, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_22 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_22 = marginTop + 161; // Posición vertical de la línea
        const lineWidth_22 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_22 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_22, lineY_22, lineWidth_22, lineHeight_22, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_23 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_23 = marginTop + 166; // Posición vertical de la línea
        const lineWidth_23 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_23 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_23, lineY_23, lineWidth_23, lineHeight_23, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_24 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_24 = marginTop + 171; // Posición vertical de la línea
        const lineWidth_24 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_24 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_24, lineY_24, lineWidth_24, lineHeight_24, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_25 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_25 = marginTop + 176; // Posición vertical de la línea
        const lineWidth_25 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_25 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_25, lineY_25, lineWidth_25, lineHeight_25, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_26 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_26 = marginTop + 181; // Posición vertical de la línea
        const lineWidth_26 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_26 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_26, lineY_26, lineWidth_26, lineHeight_26, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------|||||||||||||||||||||||
        // ----------------------------------------------|||||||||||||||||||||||
        // ----------------------------------------------
        // Crear una tabla con un solo cuadrado en el encabezado
        const revision = [
            ['                                                                                    REVISIÓN DEL TRÁMITE']
        ];
        // Ajustar la posición horizontal de la tabla
        const revisionMarginLeft = marginLeft;
        const revisionMarginRight = marginLeft; // Ten en cuenta el margen izquierdo y derecho
        // Agregar la tabla al PDF
        doc.autoTable({
            head: [revision],
            startY: marginTop + 186, // Ajustar la posición vertical de la tabla
            theme: 'grid',
            headStyles: tableHeaderStyles,
            // tableWidth: 'auto', // Ajustar el ancho de la tabla automáticamente
            margin: { left: revisionMarginLeft, right: revisionMarginRight }, // Ajustar la posición horizontal de la tabla
            bodyStyles: { fontSize: 9 },
            columnStyles: { 0: { cellWidth: 'auto' } },
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_27 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_27 = marginTop + 198; // Posición vertical de la línea
        const lineWidth_27 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_27 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_27, lineY_27, lineWidth_27, lineHeight_27, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_28 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_28 = marginTop + 222; // Posición vertical de la línea
        const lineWidth_28 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_28 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_28, lineY_28, lineWidth_28, lineHeight_28, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_29 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_29 = marginTop + 242; // Posición vertical de la línea
        const lineWidth_29 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_29 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_29, lineY_29, lineWidth_29, lineHeight_29, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_30 = marginLeft + 46; // Posición horizontal de la línea
        const lineY_30 = marginTop + 198; // Posición vertical de la línea
        const lineHeight_30 = 44; // Altura de la línea (ajustable verticalmente)
        const lineWidth_30 = 0; // Grosor de la línea
        const lineColor_30 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_30[0], lineColor_30[1], lineColor_30[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_30, lineY_30, lineWidth_30, lineHeight_30, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_31 = marginLeft + 92; // Posición horizontal de la línea
        const lineY_31 = marginTop + 198; // Posición vertical de la línea
        const lineHeight_31 = 44; // Altura de la línea (ajustable verticalmente)
        const lineWidth_31 = 0; // Grosor de la línea
        const lineColor_31 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_31[0], lineColor_31[1], lineColor_31[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_31, lineY_31, lineWidth_31, lineHeight_31, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_32 = marginLeft + 138; // Posición horizontal de la línea
        const lineY_32 = marginTop + 198; // Posición vertical de la línea
        const lineHeight_32 = 49; // Altura de la línea (ajustable verticalmente)
        const lineWidth_32 = 0; // Grosor de la línea
        const lineColor_32 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_32[0], lineColor_32[1], lineColor_32[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_32, lineY_32, lineWidth_32, lineHeight_32, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño del rectángulo
        const rectX = marginLeft + 15; // Posición horizontal del rectángulo
        const rectY = marginTop + 203; // Posición vertical del rectángulo
        const rectWidth = 12; // Ancho del rectángulo
        const rectHeight = 15; // Alto del rectángulo
        const rectBorderWidth = 1.2; // Grosor del borde del rectángulo (ajustable)
        const rectColor = [0, 0, 0]; // Color del rectángulo en RGB (en este caso, sin color)
        // Establecer el grosor del borde del rectángulo
        doc.setLineWidth(rectBorderWidth);
        // Establecer el color del borde del rectángulo (en este caso, el mismo que el fondo para simular que no hay color)
        doc.setDrawColor(rectColor[0], rectColor[1], rectColor[2]);
        // Dibujar el rectángulo
        doc.rect(rectX, rectY, rectWidth, rectHeight);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño del rectángulo
        const rect1X = marginLeft + 107; // Posición horizontal del rect1ángulo
        const rect1Y = marginTop + 203; // Posición vertical del rect1ángulo
        const rect1Width = 12; // Ancho del rect1ángulo
        const rect1Height = 15; // Alto del rect1ángulo
        const rect1BorderWidth = 1.2; // Grosor del borde del rect1ángulo (ajustable)
        const rect1Color = [0, 0, 0]; // Color del rect1ángulo en RGB (en este caso, sin color)
        // Establecer el grosor del borde del rect1ángulo
        doc.setLineWidth(rect1BorderWidth);
        // Establecer el color del borde del rect1ángulo (en este caso, el mismo que el fondo para simular que no hay color)
        doc.setDrawColor(rect1Color[0], rect1Color[1], rect1Color[2]);
        // Dibujar el rect1ángulo
        doc.rect(rect1X, rect1Y, rect1Width, rect1Height);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño del rectángulo
        const rect2X = marginLeft + 61; // Posición horizontal del rect2ángulo
        const rect2Y = marginTop + 203; // Posición vertical del rect2ángulo
        const rect2Width = 12; // Ancho del rect2ángulo
        const rect2Height = 15; // Alto del rect2ángulo
        const rect2BorderWidth = 1.2; // Grosor del borde del rect2ángulo (ajustable)
        const rect2Color = [0, 0, 0]; // Color del rect2ángulo en RGB (en este caso, sin color)
        // Establecer el grosor del borde del rect2ángulo
        doc.setLineWidth(rect2BorderWidth);
        // Establecer el color del borde del rect2ángulo (en este caso, el mismo que el fondo para simular que no hay color)
        doc.setDrawColor(rect2Color[0], rect2Color[1], rect2Color[2]);
        // Dibujar el rect2ángulo
        doc.rect(rect2X, rect2Y, rect2Width, rect2Height);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const coordinador = "Coordinador Administrativo de RH";
        const X_coordinador = marginLeft + 48; // Posición horizontal del texto
        const Y_coordinador = marginTop + 245.5; // Posición vertical del texto
        const fontSize_coordinador = 8; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_coordinador);

        // Agregar el texto "FOLIO" al PDF
        doc.text(coordinador, X_coordinador, Y_coordinador);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_factura = [
            "                 Se recibe fectura",
            "en formatos PDF y XML ",
        ];
        const X_factura = marginLeft + 5; // Posicionar a la derecha
        let Y_factura = marginTop + 230; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_factura.forEach(line => {
            doc.text(line, X_factura, Y_factura);
            Y_factura += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const fac = "Factura: ";
        const X_fac = marginLeft + 5; // Posición horizontal del texto
        const Y_fac = marginTop + 230; // Posición vertical del texto
        const fontSize_fac = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_fac);

        // Agregar el texto "FOLIO" al PDF
        doc.text(fac, X_fac, Y_fac);
        // ----------------------------------------------
        // ----------------------------------------------



        // Agregar texto fuera del margen superior a la derecha
        const Lines_odontograma = [
            "                            Se recibe ",
            "Odontograma lleno y firmado",
            "por el mèdico que atiende",
        ];
        const X_odontograma = marginLeft + 50; // Posicionar a la derecha
        let Y_odontograma = marginTop + 229; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_odontograma.forEach(line => {
            doc.text(line, X_odontograma, Y_odontograma);
            Y_odontograma += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const odonto = "Odontograma: ";
        const X_odonto = marginLeft + 50; // Posición horizontal del texto
        const Y_odonto = marginTop + 229; // Posición vertical del texto
        const fontSize_odonto = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_odonto);

        // Agregar el texto "FOLIO" al PDF
        doc.text(odonto, X_odonto, Y_odonto);
        // ----------------------------------------------
        // ----------------------------------------------


        // Agregar texto fuera del margen superior a la derecha
        const Lines_oficio = [
            "             Elaboración del oficio",
            "para Nónmina",
        ];
        const X_oficio = marginLeft + 97; // Posicionar a la derecha
        let Y_oficio = marginTop + 230; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_oficio.forEach(line => {
            doc.text(line, X_oficio, Y_oficio);
            Y_oficio += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const ofic = "Oficio: ";
        const X_ofic = marginLeft + 97; // Posición horizontal del texto
        const Y_ofic = marginTop + 230; // Posición vertical del texto
        const fontSize_ofic = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_ofic);

        // Agregar el texto "FOLIO" al PDF
        doc.text(ofic, X_ofic, Y_ofic);
        // ---------------------------------------------- 
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_firmaOficio = [
            "Firma de aprobación del",
            "               trámite",
        ];
        const X_firmaOficio = marginLeft + 145; // Posicionar a la derecha
        let Y_firmaOficio = marginTop + 230; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_firmaOficio.forEach(line => {
            doc.text(line, X_firmaOficio, Y_firmaOficio);
            Y_firmaOficio += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const subdirector = "Subdirector de Recursos Humanos";
        const X_subdirector = marginLeft + 140; // Posición horizontal del texto
        const Y_subdirector = marginTop + 245; // Posición vertical del texto
        const fontSize_subdirector = 7.5; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_subdirector);

        // Agregar el texto "FOLIO" al PDF
        doc.text(subdirector, X_subdirector, Y_subdirector);
        // ---------------------------------------------- 
        // ----------------------------------------------
        // Guardar el PDF
        doc.save("vale_Dental_Prueba.pdf");
        // Aquí se ejecuta la devolución de llamada con el contenido del PDF
        // callback(doc.output('blob'));
    };
}
function crear_odontograma() {
    // Default export is letter paper, portrait, using inches for units
    const doc = new jsPDF();
    var logoImage = new Image();
    logoImage.src = appData.logo_uteq;
    var segundaImagen = new Image();
    // Asignar la fuente de la segunda imagen que deseas agregar
    segundaImagen.src = appData.logo_odontograma;
    // Esperar a que la imagen se cargue antes de agregarla al PDF
    logoImage.onload = function () {
        segundaImagen.onload = function () {
            // Establecer el color de la línea en blanco
            doc.setDrawColor(255, 255, 255);


            // Ajustar los tamaños de los márgenes
            const marginLeft = 20; // Márgenes laterales
            const marginTop = 6; // Márgen superior
            const marginBottom = 20; // Márgen inferior

            // Obtener el tamaño de la página
            const pageSize = doc.internal.pageSize;

            // Agregar bordes alrededor del documento con márgenes diferentes
            doc.rect(marginLeft, marginTop, pageSize.width - 2 * marginLeft, pageSize.height - marginTop - marginBottom);
            // ----------------------------------------------
            // ------------------ FECHA ACTUAL --------------
            // ----------------------------------------------
            // Get the current date in Mexico City time zone
            const currentDate = new Date().toLocaleDateString('es-MX', {
                timeZone: 'America/Mexico_City',
            });
            // Extract day, month, and year components
            const [day, month, year] = currentDate.split('/');
            // Add leading zeros if the day or month is a single digit
            const formattedDay = day.padStart(2, '0');
            const formattedMonth = month.padStart(2, '0');
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLines = [
                "GR-F-64-O",
                "Rev. 00",
                "Fecha: 01-mar-2024"
            ];
            const textX = pageSize.width - marginLeft - 25; // Posicionar a la derecha
            let textY = 10; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(8); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLines.forEach(line => {
                doc.text(line, textX, textY);
                textY += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLines_titulo = [
                "Odontograma",
            ];
            const textX_titulo = marginLeft + 65; // Posicionar a la derecha
            let textY_titulo = marginTop + 18; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(18); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLines_titulo.forEach(line => {
                doc.text(line, textX_titulo, textY_titulo);
                textY_titulo += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar tamaño y posición de la imagen
            const imageX = marginLeft + 1; // Ajusta la posición horizontal de la imagen
            const imageY = marginTop + 1; // Ajusta la posición vertical de la imagen
            const imageWidth = 28; // Ancho de la imagen
            const imageHeight = 13; // Altura de la imagen
            doc.setFontSize(8); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar la imagen al PDF
            doc.addImage(logoImage, 'PNG', imageX, imageY, imageWidth, imageHeight);

            // Ajustar posición y tamaño de la segunda imagen
            const segundaImagenX = marginLeft + 5; // Posición horizontal de la segunda imagen
            const segundaImagenY = marginTop + 65; // Posición vertical de la segunda imagen
            const segundaImagenWidth = 160; // Ancho de la segunda imagen
            const segundaImagenHeight = 70; // Altura de la segunda imagen

            // Agregar la segunda imagen al PDF
            doc.addImage(segundaImagen, 'PNG', segundaImagenX, segundaImagenY, segundaImagenWidth, segundaImagenHeight);

            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const fechaTerminoText = "Fecha de término del trabajo:";
            const fechaTerminoX = marginLeft + 73; // Posición horizontal del texto
            const fechaTerminoY = marginTop + 27; // Posición vertical del texto
            const fontSizeFolio = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeFolio);

            // Agregar el texto "FOLIO" al PDF
            doc.text(fechaTerminoText, fechaTerminoX, fechaTerminoY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_1 = marginLeft + 120; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_1 = marginTop + 27; // Posición vertical de la línea
            const lineWidth_1 = 50; // Ancho de la línea (ajustable horizontalmente)
            const lineHeight_1 = 0; // Grosor de la línea
            const lineColor_1 = [0, 0, 0]; // Color de la línea en RGB

            // Establecer el color de la línea
            doc.setDrawColor(lineColor_1[0], lineColor_1[1], lineColor_1[2]);

            // Dibujar la línea horizontal
            doc.rect(lineX_1, lineY_1, lineWidth_1, lineHeight_1, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable nombreEmpleadoInicioSecion
            const NomPacienteText = "Nombre del Paciente:";
            const NomPacienteX = marginLeft; // Posición horizontal del texto
            const NomPacienteY = marginTop + 37; // Posición vertical del texto
            const fontSizeNomPaciente = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeNomPaciente);

            // Agregar el texto "FOLIO" al PDF
            doc.text(NomPacienteText, NomPacienteX, NomPacienteY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_2 = marginLeft + 35; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_2 = marginTop + 37; // Posición vertical de la línea
            const lineWidth_2 = 135; // Ancho de la línea (ajustable horizontalmente)
            const lineHeight_2 = 0; // Grosor de la línea
            const lineColor_2 = [0, 0, 0]; // Color de la línea en RGB

            // Establecer el color de la línea
            doc.setDrawColor(lineColor_2[0], lineColor_2[1], lineColor_2[2]);

            // Dibujar la línea horizontal
            doc.rect(lineX_2, lineY_2, lineWidth_2, lineHeight_2, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable nombreEmpleadoInicioSecion
            const Nom_2Text = nombreEmpleadoInicioSecion;
            const Nom_2X = marginLeft + 40; // Posición horizontal del texto
            const Nom_2Y = marginTop + 36; // Posición vertical del texto
            const fontSizeNom_2 = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeNom_2);

            // Agregar el texto "FOLIO" al PDF
            doc.text(Nom_2Text, Nom_2X, Nom_2Y);
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const NomDentistaText = "Nombre del dentista:";
            const NomDentistaX = marginLeft; // Posición horizontal del texto
            const NomDentistaY = marginTop + 47; // Posición vertical del texto
            const fontSizeNomDentista = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeNomDentista);

            // Agregar el texto "FOLIO" al PDF
            doc.text(NomDentistaText, NomDentistaX, NomDentistaY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_3 = marginLeft + 33; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_3 = marginTop + 47; // Posición vertical de la línea
            const lineWidth_3 = 137; // Ancho de la línea (ajustable horizontalmente)
            const lineHeight_3 = 0; // Grosor de la línea
            const lineColor_3 = [0, 0, 0]; // Color de la línea en RGB

            // Establecer el color de la línea
            doc.setDrawColor(lineColor_3[0], lineColor_3[1], lineColor_3[2]);

            // Dibujar la línea horizontal
            doc.rect(lineX_3, lineY_3, lineWidth_3, lineHeight_3, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const CedulaText = "Cedula profecional:";
            const CedulaX = marginLeft; // Posición horizontal del texto
            const CedulaY = marginTop + 57; // Posición vertical del texto
            const fontSizeCedula = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeCedula);

            // Agregar el texto "FOLIO" al PDF
            doc.text(CedulaText, CedulaX, CedulaY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_4 = marginLeft + 31; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_4 = marginTop + 57; // Posición vertical de la línea
            const lineWidth_4 = 60; // Ancho de la línea (ajustable horizontalmente)
            const lineHeight_4 = 0; // Grosor de la línea
            const lineColor_4 = [0, 0, 0]; // Color de la línea en RGB

            // Establecer el color de la línea
            doc.setDrawColor(lineColor_4[0], lineColor_4[1], lineColor_4[2]);

            // Dibujar la línea horizontal
            doc.rect(lineX_4, lineY_4, lineWidth_4, lineHeight_4, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const FirmaText = "Firma";
            const FirmaX = marginLeft + 92; // Posición horizontal del texto
            const FirmaY = marginTop + 57; // Posición vertical del texto
            const fontSizeFirma = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeFirma);

            // Agregar el texto "FOLIO" al PDF
            doc.text(FirmaText, FirmaX, FirmaY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_5 = marginLeft + 103; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_5 = marginTop + 57; // Posición vertical de la línea
            const lineWidth_5 = 67; // Ancho de la línea (ajustable horizontalmente)
            const lineHeight_5 = 0; // Grosor de la línea
            const lineColor_5 = [0, 0, 0]; // Color de la línea en RGB

            // Establecer el color de la línea
            doc.setDrawColor(lineColor_5[0], lineColor_5[1], lineColor_5[2]);

            // Dibujar la línea horizontal
            doc.rect(lineX_5, lineY_5, lineWidth_5, lineHeight_5, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_11 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_11 = marginTop + 143; // Posición vertical de la línea
            const lineWidth_11 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_11 = 0; // Grosor de la línea
            const lineColor = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_11, lineY_11, lineWidth_11, lineHeight_11, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea vertical
            const lineX_6 = marginLeft; // Posición horizontal de la línea
            const lineY_6 = marginTop + 143; // Posición vertical de la línea
            const lineHeight_6 = 127; // Altura de la línea (ajustable verticalmente)
            const lineWidth_6 = 0; // Grosor de la línea
            const lineColor_6 = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor_6[0], lineColor_6[1], lineColor_6[2]);
            // Dibujar la línea vertical
            doc.rect(lineX_6, lineY_6, lineWidth_6, lineHeight_6, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea vertical
            const lineX_7 = marginLeft + 42.5; // Posición horizontal de la línea
            const lineY_7 = marginTop + 143; // Posición vertical de la línea
            const lineHeight_7 = 127; // Altura de la línea (ajustable verticalmente)
            const lineWidth_7 = 0; // Grosor de la línea
            const lineColor_7 = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor_7[0], lineColor_7[1], lineColor_7[2]);
            // Dibujar la línea vertical
            doc.rect(lineX_7, lineY_7, lineWidth_7, lineHeight_7, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_20 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_20 = marginTop + 270; // Posición vertical de la línea
            const lineWidth_20 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_20 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_20, lineY_20, lineWidth_20, lineHeight_20, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea vertical
            const lineX_8 = marginLeft + 85; // Posición horizontal de la línea
            const lineY_8 = marginTop + 143; // Posición vertical de la línea
            const lineHeight_8 = 127; // Altura de la línea (ajustable verticalmente)
            const lineWidth_8 = 0; // Grosor de la línea
            const lineColor_8 = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor_8[0], lineColor_8[1], lineColor_8[2]);
            // Dibujar la línea vertical
            doc.rect(lineX_8, lineY_8, lineWidth_8, lineHeight_8, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea vertical
            const lineX_9 = marginLeft + 127.5; // Posición horizontal de la línea
            const lineY_9 = marginTop + 143; // Posición vertical de la línea
            const lineHeight_9 = 127; // Altura de la línea (ajustable verticalmente)
            const lineWidth_9 = 0; // Grosor de la línea
            const lineColor_9 = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor_9[0], lineColor_9[1], lineColor_9[2]);
            // Dibujar la línea vertical
            doc.rect(lineX_9, lineY_9, lineWidth_9, lineHeight_9, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea vertical
            const lineX_10 = marginLeft + 170; // Posición horizontal de la línea
            const lineY_10 = marginTop + 143; // Posición vertical de la línea
            const lineHeight_10 = 127; // Altura de la línea (ajustable verticalmente)
            const lineWidth_10 = 0; // Grosor de la línea
            const lineColor_10 = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor_10[0], lineColor_10[1], lineColor_10[2]);
            // Dibujar la línea vertical
            doc.rect(lineX_10, lineY_10, lineWidth_10, lineHeight_10, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_12 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_12 = marginTop + 155; // Posición vertical de la línea
            const lineWidth_12 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_12 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_12, lineY_12, lineWidth_12, lineHeight_12, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const ProtesisText = "Prótesis";
            const ProtesisX = marginLeft + 12; // Posición horizontal del texto
            const ProtesisY = marginTop + 151; // Posición vertical del texto
            const fontSizeProtesis = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("bold");
            doc.setFontSize(fontSizeProtesis);

            // Agregar el texto "FOLIO" al PDF
            doc.text(ProtesisText, ProtesisX, ProtesisY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLinesNumUnidades = [
                "Número de",
                "  unidades",
            ];
            const textXNumUnidades = marginLeft + 53; // Posicionar a la derecha
            let textYNumUnidades = marginTop + 148; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("bold"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLinesNumUnidades.forEach(line => {
                doc.text(line, textXNumUnidades, textYNumUnidades);
                textYNumUnidades += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLinesNumorgano = [
                "    Número de",
                "órgano dentario",
            ];
            const textXNumorgano = marginLeft + 90; // Posicionar a la derecha
            let textYNumorgano = marginTop + 148; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("bold"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLinesNumorgano.forEach(line => {
                doc.text(line, textXNumorgano, textYNumorgano);
                textYNumorgano += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const importeText = "Importe";
            const importeX = marginLeft + 140; // Posición horizontal del texto
            const importeY = marginTop + 151; // Posición vertical del texto
            const fontSizeimporte = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("bold");
            doc.setFontSize(fontSizeimporte);

            // Agregar el texto "FOLIO" al PDF
            doc.text(importeText, importeX, importeY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_13 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_13 = marginTop + 170; // Posición vertical de la línea
            const lineWidth_13 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_13 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_13, lineY_13, lineWidth_13, lineHeight_13, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLinesUnidadfijas = [
                " Unidad de ",
                "prótesis fija",
            ];
            const textXUnidadfijas = marginLeft + 8; // Posicionar a la derecha
            let textYUnidadfijas = marginTop + 161; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLinesUnidadfijas.forEach(line => {
                doc.text(line, textXUnidadfijas, textYUnidadfijas);
                textYUnidadfijas += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_14 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_14 = marginTop + 180; // Posición vertical de la línea
            const lineWidth_14 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_14 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_14, lineY_14, lineWidth_14, lineHeight_14, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const coronasText = "Coronas";
            const coronasX = marginLeft + 12; // Posición horizontal del texto
            const coronasY = marginTop + 177; // Posición vertical del texto
            const fontSizecoronas = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizecoronas);

            // Agregar el texto "FOLIO" al PDF
            doc.text(coronasText, coronasX, coronasY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_15 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_15 = marginTop + 190; // Posición vertical de la línea
            const lineWidth_15 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_15 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_15, lineY_15, lineWidth_15, lineHeight_15, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const incrustacionText = "Incrustación";
            const incrustacionX = marginLeft + 10; // Posición horizontal del texto
            const incrustacionY = marginTop + 187; // Posición vertical del texto
            const fontSizeincrustacion = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeincrustacion);

            // Agregar el texto "FOLIO" al PDF
            doc.text(incrustacionText, incrustacionX, incrustacionY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_16 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_16 = marginTop + 210; // Posición vertical de la línea
            const lineWidth_16 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_16 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_16, lineY_16, lineWidth_16, lineHeight_16, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLines_unidadRemovible = [
                "Unidad de",
                "  prótesis",
                " removible",
            ];
            const textX_unidadRemovible = marginLeft + 10; // Posicionar a la derecha
            let textY_unidadRemovible = marginTop + 198; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLines_unidadRemovible.forEach(line => {
                doc.text(line, textX_unidadRemovible, textY_unidadRemovible);
                textY_unidadRemovible += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_17 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_17 = marginTop + 220; // Posición vertical de la línea
            const lineWidth_17 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_17 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_17, lineY_17, lineWidth_17, lineHeight_17, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const endoposteText = "Endoposte";
            const endoposteX = marginLeft + 10; // Posición horizontal del texto
            const endoposteY = marginTop + 216; // Posición vertical del texto
            const fontSizeendoposte = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeendoposte);

            // Agregar el texto "FOLIO" al PDF
            doc.text(endoposteText, endoposteX, endoposteY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_18 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_18 = marginTop + 240; // Posición vertical de la línea
            const lineWidth_18 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_18 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_18, lineY_18, lineWidth_18, lineHeight_18, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_19 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_19 = marginTop + 260; // Posición vertical de la línea
            const lineWidth_19 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_19 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_19, lineY_19, lineWidth_19, lineHeight_19, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLines_protesuperior = [
                "Prótesis total",
                "    superior",
            ];
            const textX_protesuperior = marginLeft + 9; // Posicionar a la derecha
            let textY_protesuperior = marginTop + 229; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLines_protesuperior.forEach(line => {
                doc.text(line, textX_protesuperior, textY_protesuperior);
                textY_protesuperior += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLines_proteinferior = [
                "Prótesis total",
                "     inferior",
            ];
            const textX_proteinferior = marginLeft + 9; // Posicionar a la derecha
            let textY_proteinferior = marginTop + 249; // Posicionar fuera del margen inferior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLines_proteinferior.forEach(line => {
                doc.text(line, textX_proteinferior, textY_proteinferior);
                textY_proteinferior += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const importeTotalText = "Importe total";
            const importeTotalX = marginLeft + 9; // Posición horizontal del texto
            const importeTotalY = marginTop + 267; // Posición vertical del texto
            const fontSizeimporteTotal = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeimporteTotal);

            // Agregar el texto "FOLIO" al PDF
            doc.text(importeTotalText, importeTotalX, importeTotalY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Guardar el PDF
            doc.save("vale_odontograma.pdf");
            // Aquí se ejecuta la devolución de llamada con el contenido del PDF
            // callback(doc.output('blob'));
        };
    };
}
function crear_odontogramaEMAIL(callback) {
    // Default export is letter paper, portrait, using inches for units
    const doc = new jsPDF();
    var logoImage = new Image();
    logoImage.src = appData.logo_uteq;
    var segundaImagen = new Image();
    // Asignar la fuente de la segunda imagen que deseas agregar
    segundaImagen.src = appData.logo_odontograma;
    // Esperar a que la imagen se cargue antes de agregarla al PDF
    logoImage.onload = function () {
        segundaImagen.onload = function () {
            // Establecer el color de la línea en blanco
            doc.setDrawColor(255, 255, 255);
            // Ajustar los tamaños de los márgenes
            const marginLeft = 20; // Márgenes laterales
            const marginTop = 6; // Márgen superior
            const marginBottom = 20; // Márgen inferior

            // Obtener el tamaño de la página
            const pageSize = doc.internal.pageSize;

            // Agregar bordes alrededor del documento con márgenes diferentes
            doc.rect(marginLeft, marginTop, pageSize.width - 2 * marginLeft, pageSize.height - marginTop - marginBottom);
            // ----------------------------------------------
            // ------------------ FECHA ACTUAL --------------
            // ----------------------------------------------
            // Get the current date in Mexico City time zone
            const currentDate = new Date().toLocaleDateString('es-MX', {
                timeZone: 'America/Mexico_City',
            });
            // Extract day, month, and year components
            const [day, month, year] = currentDate.split('/');
            // Add leading zeros if the day or month is a single digit
            const formattedDay = day.padStart(2, '0');
            const formattedMonth = month.padStart(2, '0');
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLines = [
                "GR-F-64-O",
                "Rev. 00",
                "Fecha: 01-mar-2024"
            ];
            const textX = pageSize.width - marginLeft - 25; // Posicionar a la derecha
            let textY = 10; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(8); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLines.forEach(line => {
                doc.text(line, textX, textY);
                textY += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLines_titulo = [
                "Odontograma",
            ];
            const textX_titulo = marginLeft + 65; // Posicionar a la derecha
            let textY_titulo = marginTop + 18; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(18); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLines_titulo.forEach(line => {
                doc.text(line, textX_titulo, textY_titulo);
                textY_titulo += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar tamaño y posición de la imagen
            const imageX = marginLeft + 1; // Ajusta la posición horizontal de la imagen
            const imageY = marginTop + 1; // Ajusta la posición vertical de la imagen
            const imageWidth = 28; // Ancho de la imagen
            const imageHeight = 13; // Altura de la imagen
            doc.setFontSize(8); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar la imagen al PDF
            doc.addImage(logoImage, 'PNG', imageX, imageY, imageWidth, imageHeight);

            // Ajustar posición y tamaño de la segunda imagen
            const segundaImagenX = marginLeft + 5; // Posición horizontal de la segunda imagen
            const segundaImagenY = marginTop + 65; // Posición vertical de la segunda imagen
            const segundaImagenWidth = 160; // Ancho de la segunda imagen
            const segundaImagenHeight = 70; // Altura de la segunda imagen

            // Agregar la segunda imagen al PDF
            doc.addImage(segundaImagen, 'PNG', segundaImagenX, segundaImagenY, segundaImagenWidth, segundaImagenHeight);

            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const fechaTerminoText = "Fecha de término del trabajo:";
            const fechaTerminoX = marginLeft + 73; // Posición horizontal del texto
            const fechaTerminoY = marginTop + 27; // Posición vertical del texto
            const fontSizeFolio = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeFolio);

            // Agregar el texto "FOLIO" al PDF
            doc.text(fechaTerminoText, fechaTerminoX, fechaTerminoY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_1 = marginLeft + 120; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_1 = marginTop + 27; // Posición vertical de la línea
            const lineWidth_1 = 50; // Ancho de la línea (ajustable horizontalmente)
            const lineHeight_1 = 0; // Grosor de la línea
            const lineColor_1 = [0, 0, 0]; // Color de la línea en RGB

            // Establecer el color de la línea
            doc.setDrawColor(lineColor_1[0], lineColor_1[1], lineColor_1[2]);

            // Dibujar la línea horizontal
            doc.rect(lineX_1, lineY_1, lineWidth_1, lineHeight_1, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const NomPacienteText = "Nombre del Paciente:";
            const NomPacienteX = marginLeft; // Posición horizontal del texto
            const NomPacienteY = marginTop + 37; // Posición vertical del texto
            const fontSizeNomPaciente = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeNomPaciente);

            // Agregar el texto "FOLIO" al PDF
            doc.text(NomPacienteText, NomPacienteX, NomPacienteY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_2 = marginLeft + 35; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_2 = marginTop + 37; // Posición vertical de la línea
            const lineWidth_2 = 135; // Ancho de la línea (ajustable horizontalmente)
            const lineHeight_2 = 0; // Grosor de la línea
            const lineColor_2 = [0, 0, 0]; // Color de la línea en RGB

            // Establecer el color de la línea
            doc.setDrawColor(lineColor_2[0], lineColor_2[1], lineColor_2[2]);

            // Dibujar la línea horizontal
            doc.rect(lineX_2, lineY_2, lineWidth_2, lineHeight_2, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable nombreEmpleadoInicioSecion
            const Nom_2Text = nombreEmpleadoInicioSecion;
            const Nom_2X = marginLeft + 40; // Posición horizontal del texto
            const Nom_2Y = marginTop + 36; // Posición vertical del texto
            const fontSizeNom_2 = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeNom_2);

            // Agregar el texto "FOLIO" al PDF
            doc.text(Nom_2Text, Nom_2X, Nom_2Y);
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const NomDentistaText = "Nombre del dentista:";
            const NomDentistaX = marginLeft; // Posición horizontal del texto
            const NomDentistaY = marginTop + 47; // Posición vertical del texto
            const fontSizeNomDentista = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeNomDentista);

            // Agregar el texto "FOLIO" al PDF
            doc.text(NomDentistaText, NomDentistaX, NomDentistaY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_3 = marginLeft + 33; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_3 = marginTop + 47; // Posición vertical de la línea
            const lineWidth_3 = 137; // Ancho de la línea (ajustable horizontalmente)
            const lineHeight_3 = 0; // Grosor de la línea
            const lineColor_3 = [0, 0, 0]; // Color de la línea en RGB

            // Establecer el color de la línea
            doc.setDrawColor(lineColor_3[0], lineColor_3[1], lineColor_3[2]);

            // Dibujar la línea horizontal
            doc.rect(lineX_3, lineY_3, lineWidth_3, lineHeight_3, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const CedulaText = "Cedula profecional:";
            const CedulaX = marginLeft; // Posición horizontal del texto
            const CedulaY = marginTop + 57; // Posición vertical del texto
            const fontSizeCedula = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeCedula);

            // Agregar el texto "FOLIO" al PDF
            doc.text(CedulaText, CedulaX, CedulaY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_4 = marginLeft + 31; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_4 = marginTop + 57; // Posición vertical de la línea
            const lineWidth_4 = 60; // Ancho de la línea (ajustable horizontalmente)
            const lineHeight_4 = 0; // Grosor de la línea
            const lineColor_4 = [0, 0, 0]; // Color de la línea en RGB

            // Establecer el color de la línea
            doc.setDrawColor(lineColor_4[0], lineColor_4[1], lineColor_4[2]);

            // Dibujar la línea horizontal
            doc.rect(lineX_4, lineY_4, lineWidth_4, lineHeight_4, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const FirmaText = "Firma";
            const FirmaX = marginLeft + 92; // Posición horizontal del texto
            const FirmaY = marginTop + 57; // Posición vertical del texto
            const fontSizeFirma = 10; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeFirma);

            // Agregar el texto "FOLIO" al PDF
            doc.text(FirmaText, FirmaX, FirmaY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_5 = marginLeft + 103; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_5 = marginTop + 57; // Posición vertical de la línea
            const lineWidth_5 = 67; // Ancho de la línea (ajustable horizontalmente)
            const lineHeight_5 = 0; // Grosor de la línea
            const lineColor_5 = [0, 0, 0]; // Color de la línea en RGB

            // Establecer el color de la línea
            doc.setDrawColor(lineColor_5[0], lineColor_5[1], lineColor_5[2]);

            // Dibujar la línea horizontal
            doc.rect(lineX_5, lineY_5, lineWidth_5, lineHeight_5, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_11 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_11 = marginTop + 143; // Posición vertical de la línea
            const lineWidth_11 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_11 = 0; // Grosor de la línea
            const lineColor = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_11, lineY_11, lineWidth_11, lineHeight_11, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea vertical
            const lineX_6 = marginLeft; // Posición horizontal de la línea
            const lineY_6 = marginTop + 143; // Posición vertical de la línea
            const lineHeight_6 = 127; // Altura de la línea (ajustable verticalmente)
            const lineWidth_6 = 0; // Grosor de la línea
            const lineColor_6 = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor_6[0], lineColor_6[1], lineColor_6[2]);
            // Dibujar la línea vertical
            doc.rect(lineX_6, lineY_6, lineWidth_6, lineHeight_6, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea vertical
            const lineX_7 = marginLeft + 42.5; // Posición horizontal de la línea
            const lineY_7 = marginTop + 143; // Posición vertical de la línea
            const lineHeight_7 = 127; // Altura de la línea (ajustable verticalmente)
            const lineWidth_7 = 0; // Grosor de la línea
            const lineColor_7 = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor_7[0], lineColor_7[1], lineColor_7[2]);
            // Dibujar la línea vertical
            doc.rect(lineX_7, lineY_7, lineWidth_7, lineHeight_7, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_20 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_20 = marginTop + 270; // Posición vertical de la línea
            const lineWidth_20 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_20 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_20, lineY_20, lineWidth_20, lineHeight_20, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea vertical
            const lineX_8 = marginLeft + 85; // Posición horizontal de la línea
            const lineY_8 = marginTop + 143; // Posición vertical de la línea
            const lineHeight_8 = 127; // Altura de la línea (ajustable verticalmente)
            const lineWidth_8 = 0; // Grosor de la línea
            const lineColor_8 = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor_8[0], lineColor_8[1], lineColor_8[2]);
            // Dibujar la línea vertical
            doc.rect(lineX_8, lineY_8, lineWidth_8, lineHeight_8, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea vertical
            const lineX_9 = marginLeft + 127.5; // Posición horizontal de la línea
            const lineY_9 = marginTop + 143; // Posición vertical de la línea
            const lineHeight_9 = 127; // Altura de la línea (ajustable verticalmente)
            const lineWidth_9 = 0; // Grosor de la línea
            const lineColor_9 = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor_9[0], lineColor_9[1], lineColor_9[2]);
            // Dibujar la línea vertical
            doc.rect(lineX_9, lineY_9, lineWidth_9, lineHeight_9, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea vertical
            const lineX_10 = marginLeft + 170; // Posición horizontal de la línea
            const lineY_10 = marginTop + 143; // Posición vertical de la línea
            const lineHeight_10 = 127; // Altura de la línea (ajustable verticalmente)
            const lineWidth_10 = 0; // Grosor de la línea
            const lineColor_10 = [0, 0, 0]; // Color de la línea en RGB
            // Establecer el color de la línea
            doc.setDrawColor(lineColor_10[0], lineColor_10[1], lineColor_10[2]);
            // Dibujar la línea vertical
            doc.rect(lineX_10, lineY_10, lineWidth_10, lineHeight_10, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_12 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_12 = marginTop + 155; // Posición vertical de la línea
            const lineWidth_12 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_12 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_12, lineY_12, lineWidth_12, lineHeight_12, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const ProtesisText = "Prótesis";
            const ProtesisX = marginLeft + 12; // Posición horizontal del texto
            const ProtesisY = marginTop + 151; // Posición vertical del texto
            const fontSizeProtesis = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("bold");
            doc.setFontSize(fontSizeProtesis);

            // Agregar el texto "FOLIO" al PDF
            doc.text(ProtesisText, ProtesisX, ProtesisY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLinesNumUnidades = [
                "Número de",
                "  unidades",
            ];
            const textXNumUnidades = marginLeft + 53; // Posicionar a la derecha
            let textYNumUnidades = marginTop + 148; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("bold"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLinesNumUnidades.forEach(line => {
                doc.text(line, textXNumUnidades, textYNumUnidades);
                textYNumUnidades += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLinesNumorgano = [
                "    Número de",
                "órgano dentario",
            ];
            const textXNumorgano = marginLeft + 90; // Posicionar a la derecha
            let textYNumorgano = marginTop + 148; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("bold"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLinesNumorgano.forEach(line => {
                doc.text(line, textXNumorgano, textYNumorgano);
                textYNumorgano += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const importeText = "Importe";
            const importeX = marginLeft + 140; // Posición horizontal del texto
            const importeY = marginTop + 151; // Posición vertical del texto
            const fontSizeimporte = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("bold");
            doc.setFontSize(fontSizeimporte);

            // Agregar el texto "FOLIO" al PDF
            doc.text(importeText, importeX, importeY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_13 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_13 = marginTop + 170; // Posición vertical de la línea
            const lineWidth_13 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_13 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_13, lineY_13, lineWidth_13, lineHeight_13, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLinesUnidadfijas = [
                " Unidad de ",
                "prótesis fija",
            ];
            const textXUnidadfijas = marginLeft + 8; // Posicionar a la derecha
            let textYUnidadfijas = marginTop + 161; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLinesUnidadfijas.forEach(line => {
                doc.text(line, textXUnidadfijas, textYUnidadfijas);
                textYUnidadfijas += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_14 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_14 = marginTop + 180; // Posición vertical de la línea
            const lineWidth_14 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_14 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_14, lineY_14, lineWidth_14, lineHeight_14, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const coronasText = "Coronas";
            const coronasX = marginLeft + 12; // Posición horizontal del texto
            const coronasY = marginTop + 177; // Posición vertical del texto
            const fontSizecoronas = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizecoronas);

            // Agregar el texto "FOLIO" al PDF
            doc.text(coronasText, coronasX, coronasY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_15 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_15 = marginTop + 190; // Posición vertical de la línea
            const lineWidth_15 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_15 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_15, lineY_15, lineWidth_15, lineHeight_15, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const incrustacionText = "Incrustación";
            const incrustacionX = marginLeft + 10; // Posición horizontal del texto
            const incrustacionY = marginTop + 187; // Posición vertical del texto
            const fontSizeincrustacion = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeincrustacion);

            // Agregar el texto "FOLIO" al PDF
            doc.text(incrustacionText, incrustacionX, incrustacionY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_16 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_16 = marginTop + 210; // Posición vertical de la línea
            const lineWidth_16 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_16 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_16, lineY_16, lineWidth_16, lineHeight_16, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLines_unidadRemovible = [
                "Unidad de",
                "  prótesis",
                " removible",
            ];
            const textX_unidadRemovible = marginLeft + 10; // Posicionar a la derecha
            let textY_unidadRemovible = marginTop + 198; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLines_unidadRemovible.forEach(line => {
                doc.text(line, textX_unidadRemovible, textY_unidadRemovible);
                textY_unidadRemovible += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_17 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_17 = marginTop + 220; // Posición vertical de la línea
            const lineWidth_17 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_17 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_17, lineY_17, lineWidth_17, lineHeight_17, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const endoposteText = "Endoposte";
            const endoposteX = marginLeft + 10; // Posición horizontal del texto
            const endoposteY = marginTop + 216; // Posición vertical del texto
            const fontSizeendoposte = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeendoposte);

            // Agregar el texto "FOLIO" al PDF
            doc.text(endoposteText, endoposteX, endoposteY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_18 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_18 = marginTop + 240; // Posición vertical de la línea
            const lineWidth_18 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_18 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_18, lineY_18, lineWidth_18, lineHeight_18, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Ajustar posición y tamaño de la línea horizontal
            const lineX_19 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
            const lineY_19 = marginTop + 260; // Posición vertical de la línea
            const lineWidth_19 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
            const lineHeight_19 = 0; // Grosor de la línea
            // Establecer el color de la línea
            doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
            // Dibujar la línea horizontal
            doc.rect(lineX_19, lineY_19, lineWidth_19, lineHeight_19, 'S'); // 'S' indica que solo es un trazo
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLines_protesuperior = [
                "Prótesis total",
                "    superior",
            ];
            const textX_protesuperior = marginLeft + 9; // Posicionar a la derecha
            let textY_protesuperior = marginTop + 229; // Posicionar fuera del margen superior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLines_protesuperior.forEach(line => {
                doc.text(line, textX_protesuperior, textY_protesuperior);
                textY_protesuperior += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto fuera del margen superior a la derecha
            const textLines_proteinferior = [
                "Prótesis total",
                "     inferior",
            ];
            const textX_proteinferior = marginLeft + 9; // Posicionar a la derecha
            let textY_proteinferior = marginTop + 249; // Posicionar fuera del margen inferior

            // Ajustar el tamaño y estilo de la fuente
            doc.setFontSize(12); // Tamaño de letra más pequeño
            doc.setFontStyle("normal"); // Estilo de fuente normal
            // Agregar cada línea uno debajo del otro
            textLines_proteinferior.forEach(line => {
                doc.text(line, textX_proteinferior, textY_proteinferior);
                textY_proteinferior += 4; // Ajustar la separación entre líneas según sea necesario
            });
            // ----------------------------------------------
            // ----------------------------------------------
            // Agregar texto "FOLIO" dentro del margen con posición ajustable
            const importeTotalText = "Importe total";
            const importeTotalX = marginLeft + 9; // Posición horizontal del texto
            const importeTotalY = marginTop + 267; // Posición vertical del texto
            const fontSizeimporteTotal = 12; // Tamaño de letra para el texto "FOLIO"

            // Establecer estilo de fuente negrita para el texto "FOLIO"
            doc.setFontStyle("normal");
            doc.setFontSize(fontSizeimporteTotal);

            // Agregar el texto "FOLIO" al PDF
            doc.text(importeTotalText, importeTotalX, importeTotalY);
            // ----------------------------------------------
            // ----------------------------------------------
            // Guardar el PDF
            // doc.save("vale_odontograma.pdf");
            // Aquí se ejecuta la devolución de llamada con el contenido del PDF
            callback(doc.output('blob'));
        };
    };
}
function creacion_valeEMAIL(callback) {
    console.log(appData.numEmp);
    // Default export is letter paper, portrait, using inches for units
    const doc = new jsPDF();
    var logoImage = new Image();
    logoImage.src = appData.logo_uteq;

    // Esperar a que la imagen se cargue antes de agregarla al PDF
    logoImage.onload = function () {
        // Establecer el color de la línea en negro
        doc.setDrawColor(0, 0, 0);
        // Configurar estilo para el encabezado de la tabla
        const tableHeaderStyles = {
            fillColor: [135, 206, 250], // Azul cielo
            fontStyle: 'bold',
            fontSize: 9,
            textColor: [0, 0, 0], // Color del texto negro
            lineWidth: 0.1, // Grosor del borde
            lineColor: [0, 0, 0], // Color del borde (negro)
            align: 'center', // Centrar el texto horizontalmente
        };
        // Ajustar los tamaños de los márgenes
        const marginLeft = 13; // Márgenes laterales
        const marginTop = 20; // Márgen superior
        const marginBottom = 30; // Márgen inferior

        // Obtener el tamaño de la página
        const pageSize = doc.internal.pageSize;

        // Agregar bordes alrededor del documento con márgenes diferentes
        doc.rect(marginLeft, marginTop, pageSize.width - 2 * marginLeft, pageSize.height - marginTop - marginBottom);
        // ----------------------------------------------
        // ------------------ FECHA ACTUAL --------------
        // ----------------------------------------------
        // Get the current date in Mexico City time zone
        const currentDate = new Date().toLocaleDateString('es-MX', {
            timeZone: 'America/Mexico_City',
        });
        // Extract day, month, and year components
        const [day, month, year] = currentDate.split('/');
        // Add leading zeros if the day or month is a single digit
        const formattedDay = day.padStart(2, '0');
        const formattedMonth = month.padStart(2, '0');
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const textLines = [
            "              GR-F-64-O",
            "                 Rev. 01",
            "Fecha: 25-mar-2024"
        ];
        const textX = pageSize.width - marginLeft - 25; // Posicionar a la derecha
        let textY = 10; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        textLines.forEach(line => {
            doc.text(line, textX, textY);
            textY += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const textLines_titulo = [
            "UNIVERSIDAD TECNOLÓGUICA DE QUERETARO",
            "  SUBDIRECCIÓN DE RECURSOS HUMANOS ",
            "                       VALE DE SERVICIO",
            "           AYUDA PARA PRÓTESIS DENTAL"
        ];
        const textX_titulo = marginLeft + 50; // Posicionar a la derecha
        let textY_titulo = marginTop + 5; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("bold"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        textLines_titulo.forEach(line => {
            doc.text(line, textX_titulo, textY_titulo);
            textY_titulo += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar tamaño y posición de la imagen
        const imageX = marginLeft + 1; // Ajusta la posición horizontal de la imagen
        const imageY = marginTop + 1; // Ajusta la posición vertical de la imagen
        const imageWidth = 48; // Ancho de la imagen
        const imageHeight = 23; // Altura de la imagen
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar la imagen al PDF
        doc.addImage(logoImage, 'PNG', imageX, imageY, imageWidth, imageHeight);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición, tamaño y dividir el texto en dos líneas
        const vigenciaTextLine1 = "Al finalizar su tratamiento, enviar al correo nsoto@uteq.edu.mx este vale, el odontograma y la factura original.";
        const vigenciaTextLine2 = "";
        const vigenciaX = marginLeft + 0; // Posicionar a la izquierda
        const vigenciaY = pageSize.height - marginBottom + 8; // Posicionar fuera del margen inferior
        const fontSize = 9; // Tamaño de letra para el texto inferior
        const lineHeight = -5; // Separación entre líneas
        // Ajustar el tamaño y estilo de la fuente para el texto inferior
        doc.setFontSize(fontSize);
        doc.setFontStyle("bold"); // Estilo de fuente normal
        // Agregar las dos líneas de texto inferior con separación entre líneas
        doc.text(vigenciaTextLine1, vigenciaX, vigenciaY);
        doc.text(vigenciaTextLine2, vigenciaX, vigenciaY + fontSize + lineHeight);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_1 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_1 = marginTop + 25; // Posición vertical de la línea
        const lineWidth_1 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_1 = 0; // Grosor de la línea
        const lineColor = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_1, lineY_1, lineWidth_1, lineHeight_1, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_2 = marginLeft + 120; // Posición horizontal de la línea
        const lineY_2 = marginTop + 0; // Posición vertical de la línea
        const lineHeight_2 = 25; // Altura de la línea (ajustable verticalmente)
        const lineWidth_2 = 0; // Grosor de la línea
        const lineColor_2 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_2[0], lineColor_2[1], lineColor_2[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_2, lineY_2, lineWidth_2, lineHeight_2, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_3 = marginLeft + 120; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_3 = marginTop + 6; // Posición vertical de la línea
        const lineWidth_3 = 64; // Ancho de la línea (ajustable horizontalmente)
        const lineHeight_3 = 0; // Grosor de la línea
        const lineColor_3 = [0, 0, 0]; // Color de la línea en RGB

        // Establecer el color de la línea
        doc.setDrawColor(lineColor_3[0], lineColor_3[1], lineColor_3[2]);

        // Dibujar la línea horizontal
        doc.rect(lineX_3, lineY_3, lineWidth_3, lineHeight_3, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const folioText = "FOLIO";
        const folioX = marginLeft + 145; // Posición horizontal del texto
        const folioY = marginTop + 5; // Posición vertical del texto
        const fontSizeFolio = 10; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSizeFolio);

        // Agregar el texto "FOLIO" al PDF
        doc.text(folioText, folioX, folioY);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_4 = marginLeft + 120; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_4 = marginTop + 12; // Posición vertical de la línea
        const lineWidth_4 = 64; // Ancho de la línea (ajustable horizontalmente)
        const lineHeight_4 = 0; // Grosor de la línea
        const lineColor_4 = [0, 0, 0]; // Color de la línea en RGB

        // Establecer el color de la línea
        doc.setDrawColor(lineColor_4[0], lineColor_4[1], lineColor_4[2]);

        // Dibujar la línea horizontal
        doc.rect(lineX_4, lineY_4, lineWidth_4, lineHeight_4, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_5 = marginLeft + 140; // Posición horizontal de la línea
        const lineY_5 = marginTop + 16; // Posición vertical de la línea
        const lineHeight_5 = 9; // Altura de la línea (ajustable verticalmente)
        const lineWidth_5 = 0; // Grosor de la línea
        const lineColor_5 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_5[0], lineColor_5[1], lineColor_5[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_5, lineY_5, lineWidth_5, lineHeight_5, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_6 = marginLeft + 160; // Posición horizontal de la línea
        const lineY_6 = marginTop + 16; // Posición vertical de la línea
        const lineHeight_6 = 9; // Altura de la línea (ajustable verticalmente)
        const lineWidth_6 = 0; // Grosor de la línea
        const lineColor_6 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_6[0], lineColor_6[1], lineColor_6[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_6, lineY_6, lineWidth_6, lineHeight_6, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // const additionalText = "DÍA\n08";
        const additionalTextX_dia = marginLeft + 128; // Posicionar a la derecha
        const additionalTextY_dia = marginTop + 16; // Posicionar debajo del texto existente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal

        // Ajustar posición en Y para separar "DÍA" de "08"
        const diaTextY_dia = additionalTextY_dia + 2; // Ajusta la posición en Y para "DÍA"
        const numeroTextY_dia = diaTextY_dia + 4; // Ajusta la posición en Y para "08"

        // Agregar las líneas de texto adicionales al PDF
        doc.text("DÍA", additionalTextX_dia, diaTextY_dia);
        doc.text(formattedDay, additionalTextX_dia, numeroTextY_dia);  // Use the formatted day
        // ----------------------------------------------
        // ----------------------------------------------
        const additionalTextX_mes = marginLeft + 147; // Posicionar a la derecha
        const additionalTextY_mes = marginTop + 16; // Posicionar debajo del texto existente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal

        // Ajustar posición en Y para separar "DÍA" de "08"
        const diaTextY_mes = additionalTextY_mes + 2; // Ajusta la posición en Y para "DÍA"
        const numeroTextY_mes = diaTextY_mes + 4; // Ajusta la posición en Y para "08"

        // Agregar las líneas de texto adicionales al PDF
        doc.text("MES", additionalTextX_mes, diaTextY_mes);
        doc.text(formattedMonth, additionalTextX_mes, numeroTextY_mes);  // Use the formatted month
        // ----------------------------------------------
        // ----------------------------------------------
        const additionalTextX_año = marginLeft + 170; // Posicionar a la derecha
        const additionalTextY_año = marginTop + 16; // Posicionar debajo del texto existente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal

        // Ajustar posición en Y para separar "DÍA" de "08"
        const diaTextY_año = additionalTextY_año + 2; // Ajusta la posición en Y para "DÍA"
        const numeroTextY_año = diaTextY_año + 4; // Ajusta la posición en Y para "08"

        // Agregar las líneas de texto adicionales al PDF
        doc.text("AÑO", additionalTextX_año, diaTextY_año);
        doc.text(year, additionalTextX_año, numeroTextY_año);  // Set the current year
        // ----------------------------------------------
        // ----------------------------------------------




        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const folioNUM = "1";
        const folioNUMX = marginLeft + 150; // Posición horizontal del texto
        const folioNUMY = marginTop + 10; // Posición vertical del texto
        const fontSizeFolioNUM = 10; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSizeFolioNUM);

        // Agregar el texto "FOLIO" al PDF
        doc.text(folioNUM, folioNUMX, folioNUMY);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_7 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_7 = marginTop + 30; // Posición vertical de la línea
        const lineWidth_7 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_7 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_7, lineY_7, lineWidth_7, lineHeight_7, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_8 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_8 = marginTop + 45; // Posición vertical de la línea
        const lineWidth_8 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_8 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_8, lineY_8, lineWidth_8, lineHeight_8, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_9 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_9 = marginTop + 60; // Posición vertical de la línea
        const lineWidth_9 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_9 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_9, lineY_9, lineWidth_9, lineHeight_9, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_10 = marginLeft + 92; // Posición horizontal de la línea
        const lineY_10 = marginTop + 30; // Posición vertical de la línea
        const lineHeight_10 = 15; // Altura de la línea (ajustable verticalmente)
        const lineWidth_10 = 0; // Grosor de la línea
        const lineColor_10 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_10[0], lineColor_10[1], lineColor_10[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_10, lineY_10, lineWidth_10, lineHeight_10, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------



        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const TextNumEmp = "No. DE EMPLEADO:";
        const X_TextNumEmp = marginLeft + 2; // Posición horizontal del texto
        const Y_TextNumEmp = marginTop + 33; // Posición vertical del texto
        const fontSize_TextNumEmp = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_TextNumEmp);

        // Agregar el texto "FOLIO" al PDF
        doc.text(TextNumEmp, X_TextNumEmp, Y_TextNumEmp);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        // const NumEmp = appData.numEmp;
        const X_NumEmp = marginLeft + 50; // Posición horizontal del texto
        const Y_NumEmp = marginTop + 42; // Posición vertical del texto
        const fontSize_NumEmp = 10; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_NumEmp);

        // Agregar el texto "FOLIO" al PDF
        doc.text(appData.numEmp.toString(), X_NumEmp, Y_NumEmp);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const TextPrestacion = "NOMBRE DEL SOLICITANTE:";
        const X_TextPrestacion = marginLeft + 94; // Posición horizontal del texto
        const Y_TextPrestacion = marginTop + 33; // Posición vertical del texto
        const fontSize_TextPrestacion = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_TextPrestacion);

        // Agregar el texto "FOLIO" al PDF
        doc.text(TextPrestacion, X_TextPrestacion, Y_TextPrestacion);
        // ----------------------------------------------
        // ----------------------------------------------
        const Prestacion = nombreEmpleadoInicioSecion;
        const X_Prestacion = marginLeft + 98; // Posición horizontal del texto
        const Y_Prestacion = marginTop + 42; // Posición vertical del texto
        const fontSize_Prestacion = TamañoLetra; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_Prestacion);

        // Agregar el texto "FOLIO" al PDF
        doc.text(Prestacion, X_Prestacion, Y_Prestacion);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const valeExpedidoPor = "VALE EXPEDIDO POR";
        const X_valeExpedidoPor = marginLeft + 80; // Posición horizontal del texto
        const Y_valeExpedidoPor = marginTop + 48; // Posición vertical del texto
        const fontSize_valeExpedidoPor = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_valeExpedidoPor);

        // Agregar el texto "FOLIO" al PDF
        doc.text(valeExpedidoPor, X_valeExpedidoPor, Y_valeExpedidoPor);
        // ----------------------------------------------
        // ----------------------------------------------
        const Secretaria = "Coordinador Administrativo de Recursos Humanos";
        const X_Secretaria = marginLeft + 65; // Posición horizontal del texto
        const Y_Secretaria = marginTop + 55; // Posición vertical del texto
        const fontSize_Secretaria = 8; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_Secretaria);

        // Agregar el texto "FOLIO" al PDF
        doc.text(Secretaria, X_Secretaria, Y_Secretaria);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_11 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_11 = marginTop + 66; // Posición vertical de la línea
        const lineWidth_11 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_11 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_11, lineY_11, lineWidth_11, lineHeight_11, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_12 = marginLeft + 92; // Posición horizontal de la línea
        const lineY_12 = marginTop + 60; // Posición vertical de la línea
        const lineHeight_12 = 25; // Altura de la línea (ajustable verticalmente)
        const lineWidth_12 = 0; // Grosor de la línea
        const lineColor_12 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_12[0], lineColor_12[1], lineColor_12[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_12, lineY_12, lineWidth_12, lineHeight_12, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        const TextPreviaCita = "PREVIA CITA A LOS TELS";
        const X_TextPreviaCita = marginLeft + 117; // Posición horizontal del texto
        const Y_TextPreviaCita = marginTop + 64; // Posición vertical del texto
        const fontSize_TextPreviaCita = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_TextPreviaCita);

        // Agregar el texto "FOLIO" al PDF
        doc.text(TextPreviaCita, X_TextPreviaCita, Y_TextPreviaCita);
        // ----------------------------------------------
        // ----------------------------------------------
        const Text_Valoracion = "ACUDIR PARA VLORACIÓN";
        const X_Text_Valoracion = marginLeft + 30; // Posición horizontal del texto
        const Y_Text_Valoracion = marginTop + 64; // Posición vertical del texto
        const fontSize_Text_Valoracion = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_Text_Valoracion);

        // Agregar el texto "FOLIO" al PDF
        doc.text(Text_Valoracion, X_Text_Valoracion, Y_Text_Valoracion);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_Valoracion = [
            "Consultorio del especialista autorizado ubicado en: Pedro de",
            "                                 de Gente No,31",
            "                                  Col. Cimatario",
        ];
        const X_Valoracion = marginLeft + 4; // Posicionar a la derecha
        let Y_Valoracion = marginTop + 73; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(9); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_Valoracion.forEach(line => {
            doc.text(line, X_Valoracion, Y_Valoracion);
            Y_Valoracion += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_FirmaValoracion = [
            "(442) 212 02 99",
            "(442) 212 64 84",
        ];
        const X_FirmaValoracion = marginLeft + 122; // Posicionar a la derecha
        let Y_FirmaValoracion = marginTop + 74; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(9); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_FirmaValoracion.forEach(line => {
            doc.text(line, X_FirmaValoracion, Y_FirmaValoracion);
            Y_FirmaValoracion += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Crear una tabla con un solo cuadrado en el encabezado
        const tableFirmaEspecialista = [
            ['                                                  FIRMA DEL ESPECIALISTA DR. CARLOS MARTÍNEZ CÁRDENAS']
        ];

        // Ajustar la posición horizontal de la tabla
        const tableFirmaEspecialistaMarginLeft = marginLeft;
        const tableFirmaEspecialistaMarginRight = marginLeft; // Ten en cuenta el margen izquierdo y derecho
        // Agregar la tabla al PDF
        doc.autoTable({
            head: [tableFirmaEspecialista],
            startY: marginTop + 85, // Ajustar la posición vertical de la tabla
            theme: 'grid',
            headStyles: tableHeaderStyles,
            tableWidth: 'auto', // Ajustar el ancho de la tabla automáticamente
            margin: { left: tableFirmaEspecialistaMarginLeft, right: tableFirmaEspecialistaMarginRight }, // Ajustar la posición horizontal de la tabla
            bodyStyles: { fontSize: 8.5 },
            columnStyles: { 0: { cellWidth: 'auto' } },
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_13 = marginLeft + 46; // Posición horizontal de la línea
        const lineY_13 = marginTop + 92; // Posición vertical de la línea
        const lineHeight_13 = 26; // Altura de la línea (ajustable verticalmente)
        const lineWidth_13 = 0; // Grosor de la línea
        const lineColor_13 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_13[0], lineColor_13[1], lineColor_13[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_13, lineY_13, lineWidth_13, lineHeight_13, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_15 = marginLeft + 138; // Posición horizontal de la línea
        const lineY_15 = marginTop + 92; // Posición vertical de la línea
        const lineHeight_15 = 26; // Altura de la línea (ajustable verticalmente)
        const lineWidth_15 = 0; // Grosor de la línea
        const lineColor_15 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_15[0], lineColor_15[1], lineColor_15[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_15, lineY_15, lineWidth_15, lineHeight_15, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const FECHA = "FECHA";
        const X_FECHA = marginLeft + 19; // Posición horizontal del texto
        const Y_FECHA = marginTop + 114; // Posición vertical del texto
        const fontSize_FECHA = 8; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_FECHA);

        // Agregar el texto "FOLIO" al PDF
        doc.text(FECHA, X_FECHA, Y_FECHA);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_PreviaCita = [
            "FIRMA DE VALORACIÓN",
            "               INICIAL",
        ];
        const X_PreviaCita = marginLeft + 53; // Posicionar a la derecha
        let Y_PreviaCita = marginTop + 112; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_PreviaCita.forEach(line => {
            doc.text(line, X_PreviaCita, Y_PreviaCita);
            Y_PreviaCita += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const FECHA2 = "FECHA";
        const X_FECHA2 = marginLeft + 110; // Posición horizontal del texto
        const Y_FECHA2 = marginTop + 114; // Posición vertical del texto
        const fontSize_FECHA2 = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_FECHA2);

        // Agregar el texto "FOLIO" al PDF
        doc.text(FECHA2, X_FECHA2, Y_FECHA2);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_FirmaValoracion2 = [
            "FIRMA DE VERIFICACIÓN",
            "               FINAL",
        ];
        const X_FirmaValoracion2 = marginLeft + 143; // Posicionar a la derecha
        let Y_FirmaValoracion2 = marginTop + 112; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_FirmaValoracion2.forEach(line => {
            doc.text(line, X_FirmaValoracion2, Y_FirmaValoracion2);
            Y_FirmaValoracion2 += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Crear una tabla con un solo cuadrado en el encabezado
        const tabletableDecPiezas = [
            ['']
        ];

        // Ajustar la posición horizontal de la tabla
        const tabletableDecPiezasMarginLeft = marginLeft;
        const tabletableDecPiezasMarginRight = marginLeft; // Ten en cuenta el margen izquierdo y derecho
        // Agregar la tabla al PDF
        doc.autoTable({
            head: [tabletableDecPiezas],
            startY: marginTop + 118, // Ajustar la posición vertical de la tabla
            theme: 'grid',
            headStyles: tableHeaderStyles,
            // tableWidth: 'auto', // Ajustar el ancho de la tabla automáticamente
            margin: { left: tabletableDecPiezasMarginLeft, right: tabletableDecPiezasMarginRight }, // Ajustar la posición horizontal de la tabla
            bodyStyles: { fontSize: 5 },
            columnStyles: { 0: { cellWidth: 'auto' } },
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const piezas = "DESCRIPCIÓN DE PIEZAS (lo llena el especialista autorizado)";
        const X_piezas = marginLeft + 2; // Posición horizontal del texto
        const Y_piezas = marginTop + 123; // Posición vertical del texto
        const fontSize_piezas = 8.5; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_piezas);

        // Agregar el texto "FOLIO" al PDF
        doc.text(piezas, X_piezas, Y_piezas);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const Apagar = "IMPORTE A PAGAR (se llena en Recursos Humanos)";
        const X_Apagar = marginLeft + 100; // Posición horizontal del texto
        const Y_Apagar = marginTop + 123; // Posición vertical del texto
        const fontSize_Apagar = 8.5; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_Apagar);

        // Agregar el texto "FOLIO" al PDF
        doc.text(Apagar, X_Apagar, Y_Apagar);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_14 = marginLeft + 92; // Posición horizontal de la línea
        const lineY_14 = marginTop + 92; // Posición vertical de la línea
        const lineHeight_14 = 95; // Altura de la línea (ajustable verticalmente)
        const lineWidth_14 = 0; // Grosor de la línea
        const lineColor_14 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_14[0], lineColor_14[1], lineColor_14[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_14, lineY_14, lineWidth_14, lineHeight_14, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------||||||||||||||||||
        // ----------------------------------------------||||||||||||||||||
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_16 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_16 = marginTop + 131; // Posición vertical de la línea
        const lineWidth_16 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_16 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_16, lineY_16, lineWidth_16, lineHeight_16, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_17 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_17 = marginTop + 136; // Posición vertical de la línea
        const lineWidth_17 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_17 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_17, lineY_17, lineWidth_17, lineHeight_17, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_18 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_18 = marginTop + 141; // Posición vertical de la línea
        const lineWidth_18 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_18 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_18, lineY_18, lineWidth_18, lineHeight_18, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_19 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_19 = marginTop + 146; // Posición vertical de la línea
        const lineWidth_19 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_19 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_19, lineY_19, lineWidth_19, lineHeight_19, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_20 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_20 = marginTop + 151; // Posición vertical de la línea
        const lineWidth_20 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_20 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_20, lineY_20, lineWidth_20, lineHeight_20, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_21 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_21 = marginTop + 156; // Posición vertical de la línea
        const lineWidth_21 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_21 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_21, lineY_21, lineWidth_21, lineHeight_21, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_22 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_22 = marginTop + 161; // Posición vertical de la línea
        const lineWidth_22 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_22 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_22, lineY_22, lineWidth_22, lineHeight_22, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_23 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_23 = marginTop + 166; // Posición vertical de la línea
        const lineWidth_23 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_23 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_23, lineY_23, lineWidth_23, lineHeight_23, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_24 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_24 = marginTop + 171; // Posición vertical de la línea
        const lineWidth_24 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_24 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_24, lineY_24, lineWidth_24, lineHeight_24, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_25 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_25 = marginTop + 176; // Posición vertical de la línea
        const lineWidth_25 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_25 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_25, lineY_25, lineWidth_25, lineHeight_25, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_26 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_26 = marginTop + 181; // Posición vertical de la línea
        const lineWidth_26 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_26 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_26, lineY_26, lineWidth_26, lineHeight_26, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------|||||||||||||||||||||||
        // ----------------------------------------------|||||||||||||||||||||||
        // ----------------------------------------------
        // Crear una tabla con un solo cuadrado en el encabezado
        const revision = [
            ['                                                                                    REVISIÓN DEL TRÁMITE']
        ];
        // Ajustar la posición horizontal de la tabla
        const revisionMarginLeft = marginLeft;
        const revisionMarginRight = marginLeft; // Ten en cuenta el margen izquierdo y derecho
        // Agregar la tabla al PDF
        doc.autoTable({
            head: [revision],
            startY: marginTop + 186, // Ajustar la posición vertical de la tabla
            theme: 'grid',
            headStyles: tableHeaderStyles,
            // tableWidth: 'auto', // Ajustar el ancho de la tabla automáticamente
            margin: { left: revisionMarginLeft, right: revisionMarginRight }, // Ajustar la posición horizontal de la tabla
            bodyStyles: { fontSize: 9 },
            columnStyles: { 0: { cellWidth: 'auto' } },
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_27 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_27 = marginTop + 198; // Posición vertical de la línea
        const lineWidth_27 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_27 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_27, lineY_27, lineWidth_27, lineHeight_27, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_28 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_28 = marginTop + 222; // Posición vertical de la línea
        const lineWidth_28 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_28 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_28, lineY_28, lineWidth_28, lineHeight_28, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea horizontal
        const lineX_29 = marginLeft; // Posición horizontal de la línea (comienza desde el borde izquierdo)
        const lineY_29 = marginTop + 242; // Posición vertical de la línea
        const lineWidth_29 = pageSize.width - 2 * marginLeft; // Ancho de la línea (abarca todo el ancho de la página)
        const lineHeight_29 = 0; // Grosor de la línea
        // Establecer el color de la línea
        doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
        // Dibujar la línea horizontal
        doc.rect(lineX_29, lineY_29, lineWidth_29, lineHeight_29, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_30 = marginLeft + 46; // Posición horizontal de la línea
        const lineY_30 = marginTop + 198; // Posición vertical de la línea
        const lineHeight_30 = 44; // Altura de la línea (ajustable verticalmente)
        const lineWidth_30 = 0; // Grosor de la línea
        const lineColor_30 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_30[0], lineColor_30[1], lineColor_30[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_30, lineY_30, lineWidth_30, lineHeight_30, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_31 = marginLeft + 92; // Posición horizontal de la línea
        const lineY_31 = marginTop + 198; // Posición vertical de la línea
        const lineHeight_31 = 44; // Altura de la línea (ajustable verticalmente)
        const lineWidth_31 = 0; // Grosor de la línea
        const lineColor_31 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_31[0], lineColor_31[1], lineColor_31[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_31, lineY_31, lineWidth_31, lineHeight_31, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño de la línea vertical
        const lineX_32 = marginLeft + 138; // Posición horizontal de la línea
        const lineY_32 = marginTop + 198; // Posición vertical de la línea
        const lineHeight_32 = 49; // Altura de la línea (ajustable verticalmente)
        const lineWidth_32 = 0; // Grosor de la línea
        const lineColor_32 = [0, 0, 0]; // Color de la línea en RGB
        // Establecer el color de la línea
        doc.setDrawColor(lineColor_32[0], lineColor_32[1], lineColor_32[2]);
        // Dibujar la línea vertical
        doc.rect(lineX_32, lineY_32, lineWidth_32, lineHeight_32, 'S'); // 'S' indica que solo es un trazo
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño del rectángulo
        const rectX = marginLeft + 15; // Posición horizontal del rectángulo
        const rectY = marginTop + 203; // Posición vertical del rectángulo
        const rectWidth = 12; // Ancho del rectángulo
        const rectHeight = 15; // Alto del rectángulo
        const rectBorderWidth = 1.2; // Grosor del borde del rectángulo (ajustable)
        const rectColor = [0, 0, 0]; // Color del rectángulo en RGB (en este caso, sin color)
        // Establecer el grosor del borde del rectángulo
        doc.setLineWidth(rectBorderWidth);
        // Establecer el color del borde del rectángulo (en este caso, el mismo que el fondo para simular que no hay color)
        doc.setDrawColor(rectColor[0], rectColor[1], rectColor[2]);
        // Dibujar el rectángulo
        doc.rect(rectX, rectY, rectWidth, rectHeight);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño del rectángulo
        const rect1X = marginLeft + 107; // Posición horizontal del rect1ángulo
        const rect1Y = marginTop + 203; // Posición vertical del rect1ángulo
        const rect1Width = 12; // Ancho del rect1ángulo
        const rect1Height = 15; // Alto del rect1ángulo
        const rect1BorderWidth = 1.2; // Grosor del borde del rect1ángulo (ajustable)
        const rect1Color = [0, 0, 0]; // Color del rect1ángulo en RGB (en este caso, sin color)
        // Establecer el grosor del borde del rect1ángulo
        doc.setLineWidth(rect1BorderWidth);
        // Establecer el color del borde del rect1ángulo (en este caso, el mismo que el fondo para simular que no hay color)
        doc.setDrawColor(rect1Color[0], rect1Color[1], rect1Color[2]);
        // Dibujar el rect1ángulo
        doc.rect(rect1X, rect1Y, rect1Width, rect1Height);
        // ----------------------------------------------
        // ----------------------------------------------
        // Ajustar posición y tamaño del rectángulo
        const rect2X = marginLeft + 61; // Posición horizontal del rect2ángulo
        const rect2Y = marginTop + 203; // Posición vertical del rect2ángulo
        const rect2Width = 12; // Ancho del rect2ángulo
        const rect2Height = 15; // Alto del rect2ángulo
        const rect2BorderWidth = 1.2; // Grosor del borde del rect2ángulo (ajustable)
        const rect2Color = [0, 0, 0]; // Color del rect2ángulo en RGB (en este caso, sin color)
        // Establecer el grosor del borde del rect2ángulo
        doc.setLineWidth(rect2BorderWidth);
        // Establecer el color del borde del rect2ángulo (en este caso, el mismo que el fondo para simular que no hay color)
        doc.setDrawColor(rect2Color[0], rect2Color[1], rect2Color[2]);
        // Dibujar el rect2ángulo
        doc.rect(rect2X, rect2Y, rect2Width, rect2Height);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const coordinador = "Coordinador Administrativo de RH";
        const X_coordinador = marginLeft + 48; // Posición horizontal del texto
        const Y_coordinador = marginTop + 245.5; // Posición vertical del texto
        const fontSize_coordinador = 8; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_coordinador);

        // Agregar el texto "FOLIO" al PDF
        doc.text(coordinador, X_coordinador, Y_coordinador);
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_factura = [
            "                 Se recibe fectura",
            "en formatos PDF y XML ",
        ];
        const X_factura = marginLeft + 5; // Posicionar a la derecha
        let Y_factura = marginTop + 230; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_factura.forEach(line => {
            doc.text(line, X_factura, Y_factura);
            Y_factura += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const fac = "Factura: ";
        const X_fac = marginLeft + 5; // Posición horizontal del texto
        const Y_fac = marginTop + 230; // Posición vertical del texto
        const fontSize_fac = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_fac);

        // Agregar el texto "FOLIO" al PDF
        doc.text(fac, X_fac, Y_fac);
        // ----------------------------------------------
        // ----------------------------------------------



        // Agregar texto fuera del margen superior a la derecha
        const Lines_odontograma = [
            "                            Se recibe ",
            "Odontograma lleno y firmado",
            "por el mèdico que atiende",
        ];
        const X_odontograma = marginLeft + 50; // Posicionar a la derecha
        let Y_odontograma = marginTop + 229; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_odontograma.forEach(line => {
            doc.text(line, X_odontograma, Y_odontograma);
            Y_odontograma += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const odonto = "Odontograma: ";
        const X_odonto = marginLeft + 50; // Posición horizontal del texto
        const Y_odonto = marginTop + 229; // Posición vertical del texto
        const fontSize_odonto = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_odonto);

        // Agregar el texto "FOLIO" al PDF
        doc.text(odonto, X_odonto, Y_odonto);
        // ----------------------------------------------
        // ----------------------------------------------


        // Agregar texto fuera del margen superior a la derecha
        const Lines_oficio = [
            "             Elaboración del oficio",
            "para Nónmina",
        ];
        const X_oficio = marginLeft + 97; // Posicionar a la derecha
        let Y_oficio = marginTop + 230; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_oficio.forEach(line => {
            doc.text(line, X_oficio, Y_oficio);
            Y_oficio += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const ofic = "Oficio: ";
        const X_ofic = marginLeft + 97; // Posición horizontal del texto
        const Y_ofic = marginTop + 230; // Posición vertical del texto
        const fontSize_ofic = 9; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("bold");
        doc.setFontSize(fontSize_ofic);

        // Agregar el texto "FOLIO" al PDF
        doc.text(ofic, X_ofic, Y_ofic);
        // ---------------------------------------------- 
        // ----------------------------------------------
        // Agregar texto fuera del margen superior a la derecha
        const Lines_firmaOficio = [
            "Firma de aprobación del",
            "               trámite",
        ];
        const X_firmaOficio = marginLeft + 145; // Posicionar a la derecha
        let Y_firmaOficio = marginTop + 230; // Posicionar fuera del margen superior

        // Ajustar el tamaño y estilo de la fuente
        doc.setFontSize(8); // Tamaño de letra más pequeño
        doc.setFontStyle("normal"); // Estilo de fuente normal
        // Agregar cada línea uno debajo del otro
        Lines_firmaOficio.forEach(line => {
            doc.text(line, X_firmaOficio, Y_firmaOficio);
            Y_firmaOficio += 4; // Ajustar la separación entre líneas según sea necesario
        });
        // ----------------------------------------------
        // ----------------------------------------------
        // Agregar texto "FOLIO" dentro del margen con posición ajustable
        const subdirector = "Subdirector de Recursos Humanos";
        const X_subdirector = marginLeft + 140; // Posición horizontal del texto
        const Y_subdirector = marginTop + 245; // Posición vertical del texto
        const fontSize_subdirector = 7.5; // Tamaño de letra para el texto "FOLIO"

        // Establecer estilo de fuente negrita para el texto "FOLIO"
        doc.setFontStyle("normal");
        doc.setFontSize(fontSize_subdirector);

        // Agregar el texto "FOLIO" al PDF
        doc.text(subdirector, X_subdirector, Y_subdirector);
        // ---------------------------------------------- 
        // ----------------------------------------------
        // Guardar el PDF
        // doc.save("vale_Dental_Prueba.pdf");
        // Aquí se ejecuta la devolución de llamada con el contenido del PDF
        callback(doc.output('blob'));
    };
}
// rm -rf /var/www/html/laravel_v1/storage/app/Prestaciones/Lentes/2024/1