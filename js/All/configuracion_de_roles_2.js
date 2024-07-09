//----------------------------------------------------------------
// Nombre del Archivo: configuracion_roles2.js
// Autor: Cervantes Yañez Hector
// Fecha de Creación: 16-10-2023
// Descripción: CRUD(Mostrar, Editar) de roloes, ESPECIALES o por el EMP_NUM.
//----------------------------------------------------------------
$(document).ready(function () {
    $("#btn_menus").hide();
    $("#canselar_menus").hide();
    $("#btn_menus_estaticos").hide();
    //---------------------------TODOS 9--------------------------------------
    $(document).on("click", "#Menu_todos", async function (e) {
        appData.num_estatico = 9;
        // Obtener menús y submenús
        const menusResponse = await get_menu();
        const submenusResponse = await get_submenu();
        const assignedMenusAndSubmenusResponse =
            await get_Menu_empleado_crud_todos();

        const menus = menusResponse.menus;
        const submenus = submenusResponse.submenus;
        const assignedMenusAndSubmenus = assignedMenusAndSubmenusResponse.datos;

        // Limpia el formulario antes de agregar los elementos dinámicos
        $("#menuForm").empty();
        $("#mon_menu_estatico").empty();
        const mon_menu_estatico =
            '<div style="font-size:13px; color:red;" class=" text-center"><strong>Todos</strong></div>';
        $("#mon_menu_estatico").append(mon_menu_estatico);
        // Itera sobre los menús
        menus.forEach((menu) => {
            // Crea un array para almacenar submenús relacionados con este menú
            const submenusForMenu = submenus.filter((submenu) => {
                return assignedMenusAndSubmenus.some(
                    (item) =>
                        item.MENU_ID === menu.ID_MENU &&
                        item.SUBMENU_ID === submenu.ID_SUBMENU
                );
            });
            const menuCard = `
            <div class="col-md-3">
                <div class="card">
                <form id="menuForm_${menu.ID_MENU}"  style="font-size:12px">
                    <div class="card-header">
                        ${menu.NAME_MENU} <i class="me-2 bi ${
                menu.ICON_MENU
            }"></i>
                    </div>
                    <div class="card-body">
                    <input type="hidden" name="id_munuu" value="${
                        menu.ID_MENU
                    }">
                        <!-- Submenús relacionados con este menú -->
                        ${submenusForMenu
                            .map(
                                (submenu) => `
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" name="submenus[]" value="${
                                    submenu.ID_SUBMENU
                                }" ${
                                    assignedMenusAndSubmenus.some(
                                        (item) =>
                                            item.SUBMENU_ID ===
                                            submenu.ID_SUBMENU
                                    )
                                        ? "checked"
                                        : ""
                                }>
                                <label class="form-check-label"><i class="bi ${
                                    submenu.ICON_SUB
                                }"></i> ${submenu.NAME_SUBMENU}</label>
                            </div>
                        `
                            )
                            .join("")}
                        <!-- Submenús restantes -->
                        ${submenus
                            .filter(
                                (submenu) => !submenusForMenu.includes(submenu)
                            )
                            .map(
                                (submenu) => `
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" name="submenus[]" value="${submenu.ID_SUBMENU}">
                                <label class="form-check-label"><i class="bi ${submenu.ICON_SUB}"></i> ${submenu.NAME_SUBMENU}</label>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                    </form>
                </div>
            </div>`;
            $("#menuForm").append(menuCard);
        });
        $("#btn_menus_estaticos").show();
        $("#canselar_menus").show();
        $("#btn_menus").hide();
    });
    //---------------------------MANDOS 60-------------------------------------
    $(document).on("click", "#Menu_mandos", async function (e) {
        appData.num_estatico = 60;
        // Obtener menús y submenús
        const menusResponse = await get_menu();
        const submenusResponse = await get_submenu();
        const assignedMenusAndSubmenusResponse =
            await get_Menu_empleado_crud_todos();

        const menus = menusResponse.menus;
        const submenus = submenusResponse.submenus;
        const assignedMenusAndSubmenus = assignedMenusAndSubmenusResponse.datos;

        // Limpia el formulario antes de agregar los elementos dinámicos
        $("#menuForm").empty();
        $("#mon_menu_estatico").empty();
        const mon_menu_estatico =
            '<div style="font-size:13px; color:red;" class=" text-center"><strong>Mandos</strong></div>';
        $("#mon_menu_estatico").append(mon_menu_estatico);
        // Itera sobre los menús
        menus.forEach((menu) => {
            // Crea un array para almacenar submenús relacionados con este menú
            const submenusForMenu = submenus.filter((submenu) => {
                return assignedMenusAndSubmenus.some(
                    (item) =>
                        item.MENU_ID === menu.ID_MENU &&
                        item.SUBMENU_ID === submenu.ID_SUBMENU
                );
            });

            // Crea una tarjeta de Bootstrap para el menú
            const menuCard = `
            <div class="col-md-3">
                <div class="card">
                <form id="menuForm_${menu.ID_MENU}"  style="font-size:13px">
                    <div class="card-header">
                        ${menu.NAME_MENU} <i class="me-2 bi ${
                menu.ICON_MENU
            }"></i>
                    </div>
                    <div class="card-body">
                    <input type="hidden" name="id_munuu" value="${
                        menu.ID_MENU
                    }">
                        <!-- Submenús relacionados con este menú -->
                        ${submenusForMenu
                            .map(
                                (submenu) => `
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" name="submenus[]" value="${
                                    submenu.ID_SUBMENU
                                }" ${
                                    assignedMenusAndSubmenus.some(
                                        (item) =>
                                            item.SUBMENU_ID ===
                                            submenu.ID_SUBMENU
                                    )
                                        ? "checked"
                                        : ""
                                }>
                                <label class="form-check-label"><i class="bi ${
                                    submenu.ICON_SUB
                                }"></i> ${submenu.NAME_SUBMENU}</label>
                            </div>
                        `
                            )
                            .join("")}
                        <!-- Submenús restantes -->
                        ${submenus
                            .filter(
                                (submenu) => !submenusForMenu.includes(submenu)
                            )
                            .map(
                                (submenu) => `
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" name="submenus[]" value="${submenu.ID_SUBMENU}">
                                <label class="form-check-label"><i class="bi ${submenu.ICON_SUB}"></i> ${submenu.NAME_SUBMENU}</label>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                    </form>
                </div>
            </div>`;
            // Agrega la tarjeta de menú al formulario
            $("#menuForm").append(menuCard);
        });
        $("#btn_menus_estaticos").show();
        $("#canselar_menus").show();
        $("#btn_menus").hide();
    });
    //-----------------------------BASE 59-------------------------------------
    $(document).on("click", "#Menu_base", async function (e) {
        appData.num_estatico = 59;
        // Obtener menús y submenús
        const menusResponse = await get_menu();
        const submenusResponse = await get_submenu();
        const assignedMenusAndSubmenusResponse =
            await get_Menu_empleado_crud_todos();

        const menus = menusResponse.menus;
        const submenus = submenusResponse.submenus;
        const assignedMenusAndSubmenus = assignedMenusAndSubmenusResponse.datos;

        // Limpia el formulario antes de agregar los elementos dinámicos
        $("#menuForm").empty();
        $("#mon_menu_estatico").empty();
        const mon_menu_estatico =
            '<div style="font-size:13px; color:red;" class=" text-center"><strong>Base</strong></div>';
        $("#mon_menu_estatico").append(mon_menu_estatico);

        // Itera sobre los menús
        menus.forEach((menu) => {
            // Crea un array para almacenar submenús relacionados con este menú
            const submenusForMenu = submenus.filter((submenu) => {
                return assignedMenusAndSubmenus.some(
                    (item) =>
                        item.MENU_ID === menu.ID_MENU &&
                        item.SUBMENU_ID === submenu.ID_SUBMENU
                );
            });

            // Crea una tarjeta de Bootstrap para el menú
            const menuCard = `
            <div class="col-md-3">
                <div class="card">
                <form id="menuForm_${menu.ID_MENU}"  style="font-size:13px">
                    <div class="card-header">
                        ${menu.NAME_MENU} <i class="me-2 bi ${
                menu.ICON_MENU
            }"></i>
                    </div>
                    <div class="card-body">
                    <input type="hidden" name="id_munuu" value="${
                        menu.ID_MENU
                    }">
                        <!-- Submenús relacionados con este menú -->
                        ${submenusForMenu
                            .map(
                                (submenu) => `
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" name="submenus[]" value="${
                                    submenu.ID_SUBMENU
                                }" ${
                                    assignedMenusAndSubmenus.some(
                                        (item) =>
                                            item.SUBMENU_ID ===
                                            submenu.ID_SUBMENU
                                    )
                                        ? "checked"
                                        : ""
                                }>
                                <label class="form-check-label"><i class="bi ${
                                    submenu.ICON_SUB
                                }"></i> ${submenu.NAME_SUBMENU}</label>
                            </div>
                        `
                            )
                            .join("")}
                        <!-- Submenús restantes -->
                        ${submenus
                            .filter(
                                (submenu) => !submenusForMenu.includes(submenu)
                            )
                            .map(
                                (submenu) => `
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" name="submenus[]" value="${submenu.ID_SUBMENU}">
                                <label class="form-check-label"><i class="bi ${submenu.ICON_SUB}"></i> ${submenu.NAME_SUBMENU}</label>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                    </form>
                </div>
            </div>`;
            // Agrega la tarjeta de menú al formulario
            $("#menuForm").append(menuCard);
        });
        $("#btn_menus_estaticos").show();
        $("#canselar_menus").show();
        $("#btn_menus").hide();
    });
    //------------------------CONFIANZA 36-------------------------------------
    $(document).on("click", "#Menu_confianza", async function (e) {
        appData.num_estatico = 36;
        // Obtener menús y submenús
        const menusResponse = await get_menu();
        const submenusResponse = await get_submenu();
        const assignedMenusAndSubmenusResponse =
            await get_Menu_empleado_crud_todos();

        const menus = menusResponse.menus;
        const submenus = submenusResponse.submenus;
        const assignedMenusAndSubmenus = assignedMenusAndSubmenusResponse.datos;

        // Limpia el formulario antes de agregar los elementos dinámicos
        $("#menuForm").empty();
        $("#mon_menu_estatico").empty();
        const mon_menu_estatico =
            '<div style="font-size:13px; color:red;" class=" text-center"><strong>Confianza</strong></div>';
        $("#mon_menu_estatico").append(mon_menu_estatico);

        // Itera sobre los menús
        menus.forEach((menu) => {
            // Crea un array para almacenar submenús relacionados con este menú
            const submenusForMenu = submenus.filter((submenu) => {
                return assignedMenusAndSubmenus.some(
                    (item) =>
                        item.MENU_ID === menu.ID_MENU &&
                        item.SUBMENU_ID === submenu.ID_SUBMENU
                );
            });
            // Crea una tarjeta de Bootstrap para el menú
            const menuCard = `
            <div class="col-md-3">
                <div class="card">
                <form id="menuForm_${menu.ID_MENU}"  style="font-size:13px">
                    <div class="card-header">
                        ${menu.NAME_MENU} <i class="me-2 bi ${
                menu.ICON_MENU
            }"></i>
                    </div>
                    <div class="card-body">
                    <input type="hidden" name="id_munuu" value="${
                        menu.ID_MENU
                    }">
                        <!-- Submenús relacionados con este menú -->
                        ${submenusForMenu
                            .map(
                                (submenu) => `
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" name="submenus[]" value="${
                                    submenu.ID_SUBMENU
                                }" ${
                                    assignedMenusAndSubmenus.some(
                                        (item) =>
                                            item.SUBMENU_ID ===
                                            submenu.ID_SUBMENU
                                    )
                                        ? "checked"
                                        : ""
                                }>
                                <label class="form-check-label"><i class="bi ${
                                    submenu.ICON_SUB
                                }"></i> ${submenu.NAME_SUBMENU}</label>
                            </div>
                        `
                            )
                            .join("")}
                        <!-- Submenús restantes -->
                        ${submenus
                            .filter(
                                (submenu) => !submenusForMenu.includes(submenu)
                            )
                            .map(
                                (submenu) => `
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" name="submenus[]" value="${submenu.ID_SUBMENU}">
                                <label class="form-check-label"><i class="bi ${submenu.ICON_SUB}"></i> ${submenu.NAME_SUBMENU}</label>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                    </form>
                </div>
            </div>`;
            // Agrega la tarjeta de menú al formulario
            $("#menuForm").append(menuCard);
        });
        $("#btn_menus_estaticos").show();
        $("#canselar_menus").show();
        $("#btn_menus").hide();
    });
    //-----------------BTN GUARDA CAMBIORS DE MENU ESTATICOS ------------------
    $(document).on("click", "#btn_menus_estaticos", function () {
        // Crear un array para almacenar los datos a enviar
        const formData = [];
        // Iterar sobre los formularios
        $("form").each(function () {
            const form = $(this);
            const menuID = form.find('input[name="id_munuu"]').val();

            // Iterar sobre los submenús dentro del formulario
            form.find('input[name="submenus[]"]').each(function () {
                if (this.checked) {
                    const submenuID = $(this).val();
                    formData.push({
                        EMP_NUM: appData.num_estatico,
                        MENU_ID: menuID,
                        SUBMENU_ID: submenuID,
                    });
                }
            });
        });
        // Realizar la solicitud Ajax para insertar los datos
        $.ajax({
            url: insertMenusEditadoRoute,
            method: "POST",
            data: { data: JSON.stringify(formData) }, // Envia los datos como JSON
            success: function (response) {
                if (response.status == 700) {
                    setTimeout(function () {
                        cerrarSesion();
                    }, 1000);
                }
                if (response.status == 200) {
                    alerta("success", response.msj);
                    setInterval(actualizar, 1000);
                }
                if (response.status == 400) {
                    alerta("info", response.msj);
                }
            },
            error: function () {
                //error_ajax();
            },
        });
    });
    //-------------------------------------------------------------------------
    //---------------------ENVIO DE CORREOS MASIVOS----------------------------
    //-------------------------------------------------------------------------

});

function get_Menu_empleado_crud_todos() {
    return new Promise(function (resolve, reject) {
        function makeRequest() {
            $.ajax({
                url: getmenuempleadoRoute,
                dataType: "json",
                data: { numEmp: appData.num_estatico },
                method: "POST",
                success: function (response) {
                    if (response.status == 700) {
                        setTimeout(function () {
                            cerrarSesion();
                        }, 1000);
                        reject("Sesión cerrada");
                    }
                    if (response.status == 200) {
                        console.log(response);
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
