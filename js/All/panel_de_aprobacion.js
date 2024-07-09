$(document).ready(function () {
    setTimeout(function () {
        var empNumArray = []; //"EMP_NUM" Q EN LA TABLA NO TIENEN "NO APLICA"
        var emp_aprobaciones = []; // TODOS LOS EMPLEADOS Q ESTAN EN LA TABLA DE "APROBACIONES"
        var mandos_no_empleados = []; //"EMP_NUM" Q EN LA TABLA TIENEN "NO APLICA"
        var EMP_NUM_MANDO = appData.numEmp;
        var mando = true; //Validamos si el "MANDO" tiene o no tiene empleados a su cargo
        //----------------------------------------------------------------
        // ESTA SECCION IDENTIFICAMOS Q EMPLEADOS Y Q MANDOS SE ENCUENTRAN JHARDCODEADOS EN LA TAPLA DE APROBACION 
        get_aprobaciones()
            .then(function (response) {
                //console.log(response);
                emp_aprobaciones = response.aprobaciones;
                emp_aprobaciones.forEach(function (aprobacion) {
                    var empNum = aprobacion.EMP_NUM;

                    // Validar si al menos uno de los campos no es "No aplica"
                    if (
                        aprobacion.DIRE != "No aplica" ||
                        aprobacion.DEPT != "No aplica" ||
                        aprobacion.ORGANIZACION != "No aplica"
                    ) {
                        if (!empNumArray.includes(empNum)) {
                            empNumArray.push(empNum);
                        }
                    } else {
                        if (!mandos_no_empleados.includes(empNum)) {
                            mandos_no_empleados.push(empNum);
                        }
                    }
                });
                // ----
                mando = mandos_no_empleados.includes(EMP_NUM_MANDO); //VALIDAMOS SI EN "MANDO" TIENE JENTE A SU CARGO TRUE Ó FALSE
                //console.log(emp_aproabciones);
            })
            .catch(function () {
                console.log("Error al obtener aprobaciones");
            });
        //----------------------------------------------------------------
        conocer_tipo_usuarios(appData.numEmp) // Primero verificamos en al tabla de "xxhr_aprobacion" despues en la tabla de la estructura
            .then(function (response) {
                $("#animacion_cargando").removeClass("loading-animation");
                //console.log(response);
                var ubi = response.ubicacion; // Departaento y Direccion de cada mando
                var job = response.jobName;
                var departamento = ubi.DEPT; // Departamento de cada mando
                var direccion = ubi.DIRE; // Departamento de cada mando
                var organizacion = ubi.ORGANIZACION; // ORGANIZACION de cada mando
                switch (response.jobName) {
                    case "A05":
                        //----------------------------------------------------------------
                        //----------------------Uso una Promesa --------------------------
                        cargarEmpleados()
                            .then(function (response) {
                                //console.log(response);
                                var empleados = response.empleados;

                                empleadosFilter = empleados.filter(function (
                                    empleado
                                ) {
                                    return empleado.EMP_NUM != appData.numEmp;
                                });
                                $("#empleadosTable").DataTable({
                                    paging: true,
                                    scrollCollapse: true,
                                    autoFill: true,
                                    responsive: true,
                                    scrollX: true,
                                    scrollY: "70vh",
                                    data: empleadosFilter,
                                    columns: [
                                        {
                                            data: null,
                                            render: function (data, type, row) {
                                                if (
                                                    row.ORGANIZACION ==
                                                    organizacion ||
                                                    row.JobNamePrefix ===
                                                    "B05" ||
                                                    row.JobNamePrefix ===
                                                    "C15" ||
                                                    row.JobNamePrefix ===
                                                    "E10" ||
                                                    (row.JobNamePrefix ===
                                                        "C10" &&
                                                        (row.DIRE === "PC60" ||
                                                            row.DIRE ===
                                                            "PC50")) ||
                                                    (row.JobNamePrefix ===
                                                        "E05" &&
                                                        row.DEPT === "PC51")
                                                ) {
                                                    return '<button class="btn_Empleado" id="btn_emp_a_cargo"><i class="bi bi-plus-lg"></i></button>';
                                                } else {
                                                    return "";
                                                }
                                            },
                                        },
                                        { data: "EMP_NUM" },
                                        { data: "EMP_NAME" },
                                        { data: "EMP_RFC" },
                                        { data: "EMP_IMSS" },
                                        { data: "EMP_BIRTHDATE" },
                                        { data: "ORGANIZACION" },
                                        { data: "DIRE" },
                                        { data: "TIPO_CONTRATO" },
                                        { data: "ESTATUS" },
                                    ],
                                    // FILTRO-BUSQUEDA DE CADA COLUMNA
                                    initComplete: function () {
                                        var table = this.api();

                                        table.columns().every(function (index) {
                                            var column = this;
                                            if (index !== 0) {
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
                                    dom: "lBfrtip", // Agrega los botones de exportación
                                    buttons: [
                                        "copy",
                                        "csv",
                                        "excel",
                                        "pdf",
                                        "print", // Tipos de exportación
                                    ],
                                    order: [
                                        [0, "desc"], // Ordena por la primera columna (el botón) de forma descendente
                                    ],
                                    language: {
                                        "decimal": "",
                                        "emptyTable": "No hay información",
                                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                                        "infoPostFix": "",
                                        "thousands": ",",
                                        "lengthMenu": "Mostrar _MENU_ Entradas",
                                        "loadingRecords": "Cargando...",
                                        "processing": "Procesando...",
                                        "search": "Buscar:",
                                        "zeroRecords": "Sin resultados encontrados",
                                        "paginate": {
                                            "first": "Primero",
                                            "last": "Ultimo",
                                            "next": "Siguiente",
                                            "previous": "Anterior"
                                        }
                                    },
                                });
                            })
                            .catch(function () {
                                // Manejar errores de la promesa
                                console.log("Error al obtener los empleados --- A05");
                            });

                        //----------------------------------------------------------------
                        break;
                    case "B05":
                        //----------------------------------------------------------------
                        cargarEmpleados()
                            .then(function (response) {
                                var empleados = response.empleados;
                                //console.log(empleados);
                                if (mando == false) {
                                    var empNumAprobaciones = emp_aprobaciones
                                        .filter(function (aprobacion) {
                                            return (
                                                aprobacion.DIRE === direccion
                                            );
                                        })
                                        .map(function (aprobacion) {
                                            return aprobacion.EMP_NUM;
                                        });
                                    //------ Verificamos a que DIRECCION pertenes cada mando--------
                                    if (ubi.DIRE === "PC90") {
                                        var empleadosFiltrados =
                                            empleados.filter(function (
                                                empleado
                                            ) {
                                                var empNum =
                                                    empleado.EMP_NUM.toString();
                                                return (
                                                    (empleado.DIRE === "PC90" ||
                                                        empleado.DIRE ===
                                                        "PD00" ||
                                                        empNumAprobaciones.includes(
                                                            empNum
                                                        )) &&
                                                    empleado.EMP_NUM !=
                                                    appData.numEmp
                                                );
                                            });
                                        empleadosFiltrados =
                                            empleadosFiltrados.filter(function (
                                                empleado
                                            ) {
                                                var empNum =
                                                    empleado.EMP_NUM.toString();
                                                return (
                                                    !empNumArray.includes(
                                                        empNum
                                                    ) ||
                                                    empNumAprobaciones.includes(
                                                        empNum
                                                    )
                                                );
                                            });
                                    }
                                    if (ubi.DIRE === "PC70") {
                                        var empleadosFiltrados =
                                            empleados.filter(function (
                                                empleado
                                            ) {
                                                var empNum =
                                                    empleado.EMP_NUM.toString();
                                                return (
                                                    (empleado.DIRE == "PC70" ||
                                                        empNumAprobaciones.includes(
                                                            empNum
                                                        )) &&
                                                    empleado.EMP_NUM !=
                                                    appData.numEmp
                                                );
                                            });
                                        empleadosFiltrados =
                                            empleadosFiltrados.filter(function (
                                                empleado
                                            ) {
                                                var empNum =
                                                    empleado.EMP_NUM.toString();
                                                return (
                                                    !empNumArray.includes(
                                                        empNum
                                                    ) ||
                                                    empNumAprobaciones.includes(
                                                        empNum
                                                    )
                                                );
                                            });
                                    }
                                    if (ubi.DIRE === "PC80") {
                                        var empleadosFiltrados =
                                            empleados.filter(function (
                                                empleado
                                            ) {
                                                var empNum =
                                                    empleado.EMP_NUM.toString();
                                                return (
                                                    (empleado.DIRE === "PC80" ||
                                                        empNumAprobaciones.includes(
                                                            empNum
                                                        )) &&
                                                    empleado.EMP_NUM !=
                                                    appData.numEmp
                                                );
                                            });

                                        empleadosFiltrados =
                                            empleadosFiltrados.filter(function (
                                                empleado
                                            ) {
                                                var empNum =
                                                    empleado.EMP_NUM.toString();
                                                return (
                                                    !empNumArray.includes(
                                                        empNum
                                                    ) ||
                                                    empNumAprobaciones.includes(
                                                        empNum
                                                    )
                                                );
                                            });
                                    }
                                } else if (mando == true) {
                                    var empleadosFiltrados = [];
                                }
                                //--------------------------------------------------------------
                                var dataTable = $("#empleadosTable").DataTable({
                                    paging: true,
                                    scrollCollapse: true,
                                    autoFill: true,
                                    responsive: true,
                                    scrollX: true,
                                    scrollY: "70vh",
                                    data: empleadosFiltrados,
                                    columns: [
                                        {
                                            data: null,
                                            render: function (data, type, row) {
                                                var empAprobacion =
                                                    emp_aprobaciones.some(
                                                        function (aprobacion) {
                                                            return (
                                                                aprobacion.EMP_NUM ==
                                                                row.EMP_NUM &&
                                                                aprobacion.ORGANIZACION ==
                                                                organizacion
                                                            );
                                                        }
                                                    );
                                                // ---
                                                var jobNamePrefix =
                                                    row.JobNamePrefix;

                                                if (
                                                    jobNamePrefix === "C05" ||
                                                    jobNamePrefix === "C10" ||
                                                    jobNamePrefix === "D05" ||
                                                    row.ORGANIZACION ==
                                                    organizacion ||
                                                    empAprobacion
                                                ) {
                                                    return '<button class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>';
                                                } else {
                                                    return "";
                                                }
                                            },
                                        },
                                        { data: "EMP_NUM" },
                                        { data: "EMP_NAME" },
                                        { data: "EMP_RFC" },
                                        { data: "EMP_IMSS" },
                                        { data: "EMP_BIRTHDATE" },
                                        { data: "ORGANIZACION" },
                                        { data: "DIRE" },
                                        { data: "TIPO_CONTRATO" },
                                        { data: "ESTATUS" },
                                    ],
                                    // FILTRO-BUSQUEDA DE CADA COLUMNA
                                    initComplete: function () {
                                        var table = this.api();

                                        table.columns().every(function (index) {
                                            var column = this;
                                            if (index !== 0) {
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
                                    dom: "lBfrtip", // Agrega los botones de exportación
                                    buttons: [
                                        "copy",
                                        "csv",
                                        "excel",
                                        "pdf",
                                        "print", // Tipos de exportación
                                    ],
                                    order: [
                                        [0, "desc"], // Ordena por la primera columna (el botón) de forma descendente
                                    ],
                                    language: {
                                        "decimal": "",
                                        "emptyTable": "No hay información",
                                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                                        "infoPostFix": "",
                                        "thousands": ",",
                                        "lengthMenu": "Mostrar _MENU_ Entradas",
                                        "loadingRecords": "Cargando...",
                                        "processing": "Procesando...",
                                        "search": "Buscar:",
                                        "zeroRecords": "Sin resultados encontrados",
                                        "paginate": {
                                            "first": "Primero",
                                            "last": "Ultimo",
                                            "next": "Siguiente",
                                            "previous": "Anterior"
                                        }
                                    },
                                });
                            })
                            .catch(function () {
                                // Manejar errores de la promesa
                                console.log("Error al obtener los empleados.");
                            });
                        //----------------------------------------------------------------
                        break;
                    case "C05":
                        //alerta("success", "C05");
                        //----------------------------------------------------------------
                        cargarEmpleados()
                            .then(function (response) {
                                var empleados = response.empleados;
                                if (mando == false) {
                                    var empNumAprobaciones = emp_aprobaciones
                                        .filter(function (aprobacion) {
                                            return (
                                                aprobacion.DEPT === departamento
                                            );
                                        })
                                        .map(function (aprobacion) {
                                            return aprobacion.EMP_NUM;
                                        });

                                    var empleadosFiltrados = empleados.filter(
                                        function (empleado) {
                                            var empNum =
                                                empleado.EMP_NUM.toString();
                                            return (
                                                (empleado.DEPT ===
                                                    departamento ||
                                                    empNumAprobaciones.includes(
                                                        empNum
                                                    )) &&
                                                empNum !== appData.numEmp
                                            );
                                        }
                                    );
                                    empleadosFiltrados =
                                        empleadosFiltrados.filter(function (
                                            empleado
                                        ) {
                                            var empNum =
                                                empleado.EMP_NUM.toString();
                                            return (
                                                !empNumArray.includes(empNum) ||
                                                empNumAprobaciones.includes(
                                                    empNum
                                                )
                                            );
                                        });
                                } else if (mando == true) {
                                    var empleadosFiltrados = [];
                                }
                                //----------------------------------------------------------------
                                // Verificar si hay al menos un empleado con jobNamePrefix "E05" o "E10"
                                var tieneE05oE10 = empleadosFiltrados.some(
                                    function (empleado) {
                                        return (
                                            empleado.JobNamePrefix === "E05" ||
                                            empleado.JobNamePrefix === "E10"
                                        );
                                    }
                                );
                                //------ Verificamos a que DIRECCION pertenes cada mando--------
                                //--------------------------------------------------------------
                                var dataTable = $("#empleadosTable").DataTable({
                                    paging: true,
                                    scrollCollapse: true,
                                    autoFill: true,
                                    responsive: true,
                                    scrollX: true,
                                    scrollY: "70vh",
                                    data: empleadosFiltrados,
                                    columns: [
                                        {
                                            data: null,
                                            render: function (data, type, row) {
                                                var empAprobacion =
                                                    emp_aprobaciones.some(
                                                        function (aprobacion) {
                                                            return (
                                                                aprobacion.EMP_NUM ==
                                                                row.EMP_NUM &&
                                                                aprobacion.ORGANIZACION ==
                                                                organizacion
                                                            );
                                                        }
                                                    );
                                                // ---
                                                if (
                                                    row.ORGANIZACION ===
                                                    organizacion ||
                                                    empAprobacion
                                                ) {
                                                    return '<button class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>';
                                                } else if (
                                                    tieneE05oE10 &&
                                                    (row.JobNamePrefix ===
                                                        "E05" ||
                                                        row.JobNamePrefix ===
                                                        "E10")
                                                ) {
                                                    return '<button class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>';
                                                } else {
                                                    return "";
                                                }
                                            },
                                        },
                                        { data: "EMP_NUM" },
                                        { data: "EMP_NAME" },
                                        { data: "EMP_RFC" },
                                        { data: "EMP_IMSS" },
                                        { data: "EMP_BIRTHDATE" },
                                        { data: "ORGANIZACION" },
                                        { data: "DIRE" },
                                        { data: "TIPO_CONTRATO" },
                                        { data: "ESTATUS" },
                                    ],
                                    // FILTRO-BUSQUEDA DE CADA COLUMNA
                                    initComplete: function () {
                                        var table = this.api();

                                        table.columns().every(function (index) {
                                            var column = this;
                                            if (index !== 0) {
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
                                    dom: "lBfrtip", // Agrega los botones de exportación
                                    buttons: [
                                        "copy",
                                        "csv",
                                        "excel",
                                        "pdf",
                                        "print", // Tipos de exportación
                                    ],
                                    order: [
                                        [0, "desc"], // Ordena por la primera columna (el botón) de forma descendente
                                    ],
                                    language: {
                                        "decimal": "",
                                        "emptyTable": "No hay información",
                                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                                        "infoPostFix": "",
                                        "thousands": ",",
                                        "lengthMenu": "Mostrar _MENU_ Entradas",
                                        "loadingRecords": "Cargando...",
                                        "processing": "Procesando...",
                                        "search": "Buscar:",
                                        "zeroRecords": "Sin resultados encontrados",
                                        "paginate": {
                                            "first": "Primero",
                                            "last": "Ultimo",
                                            "next": "Siguiente",
                                            "previous": "Anterior"
                                        }
                                    },
                                });
                            })
                            .catch(function () {
                                // Manejar errores de la promesa
                                console.log("Error al obtener los empleados.");
                            });
                        //----------------------------------------------------------------
                        break;
                    case "C10":
                        //----------------------------------------------------------------
                        cargarEmpleados()
                            .then(function (response) {
                                var empleados = response.empleados;
                                if (mando == false) {
                                    //----------------------------------------------------------------
                                    var empNumAprobaciones = emp_aprobaciones
                                        .filter(function (aprobacion) {
                                            return (
                                                aprobacion.DEPT === departamento
                                            );
                                        })
                                        .map(function (aprobacion) {
                                            return aprobacion.EMP_NUM;
                                        });
                                    var empleadosFiltrados = empleados.filter(
                                        function (empleado) {
                                            var empNum =
                                                empleado.EMP_NUM.toString();
                                            return (
                                                (empleado.DEPT ===
                                                    departamento ||
                                                    empNumAprobaciones.includes(
                                                        empNum
                                                    )) && // Cumple con el departamento o está en SI_num_emp
                                                empNum !== appData.numEmp // No está en NO_num_emp
                                            );
                                        }
                                    );
                                    empleadosFiltrados =
                                        empleadosFiltrados.filter(function (
                                            empleado
                                        ) {
                                            var empNum =
                                                empleado.EMP_NUM.toString();
                                            return (
                                                !empNumArray.includes(empNum) ||
                                                empNumAprobaciones.includes(
                                                    empNum
                                                )
                                            );
                                        });
                                    //----------------------------------------------------------------
                                } else if (mando == true) {
                                    var empleadosFiltrados = [];
                                }
                                // Verificar si hay al menos un empleado con jobNamePrefix "E05"
                                var tieneE05oE10 = empleadosFiltrados.some(
                                    function (empleado) {
                                        return (
                                            empleado.JobNamePrefix === "E05" ||
                                            empleado.JobNamePrefix === "E10"
                                        );
                                    }
                                );
                                //------ Verificamos a que DIRECCION pertenes cada mando--------
                                //--------------------------------------------------------------
                                var dataTable = $("#empleadosTable").DataTable({
                                    paging: true,
                                    scrollCollapse: true,
                                    autoFill: true,
                                    responsive: true,
                                    scrollX: true,
                                    scrollY: "70vh",
                                    data: empleadosFiltrados,
                                    columns: [
                                        {
                                            data: null,
                                            render: function (data, type, row) {
                                                var empAprobacion =
                                                    emp_aprobaciones.some(
                                                        function (aprobacion) {
                                                            return (
                                                                aprobacion.EMP_NUM ==
                                                                row.EMP_NUM &&
                                                                aprobacion.ORGANIZACION ==
                                                                organizacion
                                                            );
                                                        }
                                                    );
                                                // ---
                                                if (
                                                    row.ORGANIZACION ===
                                                    organizacion ||
                                                    empAprobacion
                                                ) {
                                                    return '<button class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>';
                                                } else if (
                                                    tieneE05oE10 &&
                                                    (row.JobNamePrefix ===
                                                        "E05" ||
                                                        row.JobNamePrefix ===
                                                        "E10")
                                                ) {
                                                    return '<button class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>';
                                                } else {
                                                    return "";
                                                }
                                            },
                                        },
                                        { data: "EMP_NUM" },
                                        { data: "EMP_NAME" },
                                        { data: "EMP_RFC" },
                                        { data: "EMP_IMSS" },
                                        { data: "EMP_BIRTHDATE" },
                                        { data: "ORGANIZACION" },
                                        { data: "DIRE" },
                                        { data: "TIPO_CONTRATO" },
                                        { data: "ESTATUS" },
                                    ],
                                    // FILTRO-BUSQUEDA DE CADA COLUMNA
                                    initComplete: function () {
                                        this.api()
                                            .columns()
                                            .every(function () {
                                                var column = this;
                                                var input = $(
                                                    "<br><input id='Input_cmbioColor' placeholder='Buscar...'>"
                                                ).appendTo($(column.header()));

                                                input.on("keyup", function () {
                                                    column
                                                        .search(
                                                            $(this).val(),
                                                            false,
                                                            false,
                                                            true
                                                        )
                                                        .draw();
                                                });
                                                // Elimina el filtro de búsqueda en el encabezado de columna
                                                $(column.header()).off("click.DT");
                                            });
                                    },
                                    dom: "lBfrtip", // Agrega los botones de exportación
                                    buttons: [
                                        "copy",
                                        "csv",
                                        "excel",
                                        "pdf",
                                        "print", // Tipos de exportación
                                    ],
                                    order: [
                                        [0, "desc"], // Ordena por la primera columna (el botón) de forma descendente
                                    ],
                                    language: {
                                        "decimal": "",
                                        "emptyTable": "No hay información",
                                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                                        "infoPostFix": "",
                                        "thousands": ",",
                                        "lengthMenu": "Mostrar _MENU_ Entradas",
                                        "loadingRecords": "Cargando...",
                                        "processing": "Procesando...",
                                        "search": "Buscar:",
                                        "zeroRecords": "Sin resultados encontrados",
                                        "paginate": {
                                            "first": "Primero",
                                            "last": "Ultimo",
                                            "next": "Siguiente",
                                            "previous": "Anterior"
                                        }
                                    },
                                });
                            })
                            .catch(function () {
                                // Manejar errores de la promesa
                                console.log("Error al obtener los empleados.");
                            });
                        //----------------------------------------------------------------
                        break;
                    case "D05":
                        //----------------------------------------------------------------
                        cargarEmpleados()
                            .then(function (response) {
                                var empleados = response.empleados;
                                //validamos si el "EMP_NUM" del mando no se encuentra dentro de la tabla de aprobaciones
                                //si el "EMP_NUM" esta en la tabla entonses eso quiere decir q ese mando no tene empleados a su cargo
                                if (mando == false) {
                                    //----------------------------------------------------------------
                                    var empNumAprobaciones = emp_aprobaciones
                                        .filter(function (aprobacion) {
                                            return (
                                                aprobacion.DEPT == departamento
                                            );
                                        })
                                        .map(function (aprobacion) {
                                            return aprobacion.EMP_NUM;
                                        });
                                    var empleadosFiltrados = empleados.filter(
                                        function (empleado) {
                                            var empNum =
                                                empleado.EMP_NUM.toString();
                                            return (
                                                (empleado.DEPT ==
                                                    departamento ||
                                                    empNumAprobaciones.includes(
                                                        empNum
                                                    )) &&
                                                empleado.EMP_NUM !=
                                                appData.numEmp
                                            );
                                        }
                                    );
                                    empleadosFiltrados =
                                        empleadosFiltrados.filter(function (
                                            empleado
                                        ) {
                                            var empNum =
                                                empleado.EMP_NUM.toString();
                                            return (
                                                !empNumArray.includes(empNum) ||
                                                empNumAprobaciones.includes(
                                                    empNum
                                                )
                                            );
                                        });
                                    //----------------------------------------------------------------
                                } else if (mando == true) {
                                    var empleadosFiltrados = [];
                                }
                                // Verificar si hay al menos un empleado con jobNamePrefix "E05" o "E10"
                                var tieneE05oE10 = empleadosFiltrados.some(
                                    function (empleado) {
                                        return (
                                            empleado.JobNamePrefix === "E05" ||
                                            empleado.JobNamePrefix === "E10"
                                        );
                                    }
                                );
                                //------ Verificamos a que DIRECCION pertenes cada mando--------
                                //console.log(emp_aprobaciones);
                                //--------------------------------------------------------------
                                $("#empleadosTable").DataTable({
                                    paging: true,
                                    scrollCollapse: true,
                                    autoFill: true,
                                    responsive: true,
                                    scrollX: true,
                                    scrollY: "70vh",
                                    data: empleadosFiltrados,
                                    columns: [
                                        {
                                            data: null,
                                            render: function (data, type, row) {
                                                var empAprobacion =
                                                    emp_aprobaciones.some(
                                                        function (aprobacion) {
                                                            return (
                                                                aprobacion.EMP_NUM ==
                                                                row.EMP_NUM &&
                                                                aprobacion.ORGANIZACION ==
                                                                organizacion
                                                            );
                                                        }
                                                    );
                                                // ---
                                                if (
                                                    row.ORGANIZACION ===
                                                    organizacion ||
                                                    empAprobacion
                                                ) {
                                                    return '<button class="btn_Empleado" id="btn_emp_a_cargo"><i class="bi bi-plus-lg"></i></button>';
                                                } else if (
                                                    tieneE05oE10 &&
                                                    (row.JobNamePrefix ===
                                                        "E05" ||
                                                        row.JobNamePrefix ===
                                                        "E10")
                                                ) {
                                                    return '<button class="btn_Empleado" id="btn_emp_a_cargo"><i class="bi bi-plus-lg"></i></button>';
                                                } else {
                                                    return "";
                                                }
                                            },
                                        },
                                        { data: "EMP_NUM" },
                                        { data: "EMP_NAME" },
                                        { data: "EMP_RFC" },
                                        { data: "EMP_IMSS" },
                                        { data: "EMP_BIRTHDATE" },
                                        { data: "ORGANIZACION" },
                                        { data: "DIRE" },
                                        { data: "TIPO_CONTRATO" },
                                        { data: "ESTATUS" },
                                    ],
                                    // FILTRO-BUSQUEDA DE CADA COLUMNA
                                    initComplete: function () {
                                        var table = this.api();

                                        table.columns().every(function (index) {
                                            var column = this;
                                            if (index !== 0) {
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
                                    dom: "lBfrtip", // Agrega los botones de exportación
                                    buttons: [
                                        "copy",
                                        "csv",
                                        "excel",
                                        "pdf",
                                        "print", // Tipos de exportación
                                    ],
                                    order: [
                                        [0, "desc"], // Ordena por la primera columna (el botón) de forma descendente
                                    ],
                                    language: {
                                        "decimal": "",
                                        "emptyTable": "No hay información",
                                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                                        "infoPostFix": "",
                                        "thousands": ",",
                                        "lengthMenu": "Mostrar _MENU_ Entradas",
                                        "loadingRecords": "Cargando...",
                                        "processing": "Procesando...",
                                        "search": "Buscar:",
                                        "zeroRecords": "Sin resultados encontrados",
                                        "paginate": {
                                            "first": "Primero",
                                            "last": "Ultimo",
                                            "next": "Siguiente",
                                            "previous": "Anterior"
                                        }
                                    },
                                });
                            })
                            .catch(function () {
                                // Manejar errores de la promesa
                                console.log("Error al obtener los empleados --- D05");
                            });
                        //----------------------------------------------------------------
                        break;
                    case "E05":
                        //---------------------------------------------------------------- appData.numEmp == "125473"
                        cargarEmpleados()
                            .then(function (response) {
                                var empleados = response.empleados;
                                //validamos si el "EMP_NUM" del mando no se encuentra dentro de la tabla de aprobaciones
                                //si el "EMP_NUM" esta en la tabla entonses eso quiere decir q ese mando no tene empleados a su cargo
                                if (mando == false) {
                                    if (appData.numEmp == "84977") {
                                        var empleadosFiltrados =
                                            empleados.filter(function (
                                                empleado
                                            ) {
                                                return (
                                                    (empleado.EMP_NUM ==
                                                        "124737" ||
                                                        empleado.EMP_NUM ==
                                                        "85293" ||
                                                        empleado.EMP_NUM ==
                                                        "125637") &&
                                                    empleado.EMP_NUM !=
                                                    appData.numEmp
                                                );
                                            });
                                    } else if (appData.numEmp == "125473") {
                                        var empleadosFiltrados =
                                            empleados.filter(function (
                                                empleado
                                            ) {
                                                return (
                                                    (empleado.EMP_NUM ==
                                                        "57251" ||
                                                        empleado.EMP_NUM ==
                                                        "124950" ||
                                                        empleado.EMP_NUM ==
                                                        "72270") &&
                                                    empleado.EMP_NUM !=
                                                    appData.numEmp
                                                );
                                            });
                                    } else {
                                        var empNumAprobaciones =
                                            emp_aprobaciones
                                                .filter(function (aprobacion) {
                                                    return (
                                                        aprobacion.ORGANIZACION ==
                                                        organizacion
                                                    );
                                                })
                                                .map(function (aprobacion) {
                                                    return aprobacion.EMP_NUM;
                                                });

                                        var empleadosFiltrados =
                                            empleados.filter(function (
                                                empleado
                                            ) {
                                                var empNum =
                                                    empleado.EMP_NUM.toString();
                                                return (
                                                    (empleado.ORGANIZACION ===
                                                        organizacion ||
                                                        empNumAprobaciones.includes(
                                                            empNum
                                                        )) &&
                                                    empNum !== appData.numEmp
                                                );
                                            });
                                        empleadosFiltrados =
                                            empleadosFiltrados.filter(function (
                                                empleado
                                            ) {
                                                var empNum =
                                                    empleado.EMP_NUM.toString();
                                                return (
                                                    !empNumArray.includes(
                                                        empNum
                                                    ) ||
                                                    empNumAprobaciones.includes(
                                                        empNum
                                                    )
                                                );
                                            });
                                    }
                                } else if (mando == true) {
                                    var empleadosFiltrados = [];
                                }
                                //------ Verificamos a que DIRECCION pertenes cada mando--------
                                var dataTable = $("#empleadosTable").DataTable({
                                    paging: true,
                                    scrollCollapse: true,
                                    autoFill: true,
                                    responsive: true,
                                    scrollX: true,
                                    scrollY: "70vh",
                                    data: empleadosFiltrados,
                                    columns: [
                                        {
                                            data: null,
                                            render: function (data, type, row) {
                                                var empAprobacion =
                                                    emp_aprobaciones.some(
                                                        function (aprobacion) {
                                                            return (
                                                                aprobacion.EMP_NUM ==
                                                                row.EMP_NUM &&
                                                                aprobacion.ORGANIZACION ==
                                                                organizacion
                                                            );
                                                        }
                                                    );
                                                // ----
                                                if (
                                                    row.ORGANIZACION ==
                                                    organizacion ||
                                                    empAprobacion
                                                ) {
                                                    return '<button class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>';
                                                } else {
                                                    return "";
                                                }
                                            },
                                        },
                                        { data: "EMP_NUM" },
                                        { data: "EMP_NAME" },
                                        { data: "EMP_RFC" },
                                        { data: "EMP_IMSS" },
                                        { data: "EMP_BIRTHDATE" },
                                        { data: "ORGANIZACION" },
                                        { data: "DIRE" },
                                        { data: "TIPO_CONTRATO" },
                                        { data: "ESTATUS" },
                                    ],
                                    // FILTRO-BUSQUEDA DE CADA COLUMNA
                                    initComplete: function () {
                                        var table = this.api();

                                        table.columns().every(function (index) {
                                            var column = this;
                                            if (index !== 0) {
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
                                    dom: "lBfrtip", // Agrega los botones de exportación
                                    buttons: [
                                        "copy",
                                        "csv",
                                        "excel",
                                        "pdf",
                                        "print", // Tipos de exportación
                                    ],
                                    order: [
                                        [0, "desc"], // Ordena por la primera columna (el botón) de forma descendente
                                    ],
                                    language: {
                                        "decimal": "",
                                        "emptyTable": "No hay información",
                                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                                        "infoPostFix": "",
                                        "thousands": ",",
                                        "lengthMenu": "Mostrar _MENU_ Entradas",
                                        "loadingRecords": "Cargando...",
                                        "processing": "Procesando...",
                                        "search": "Buscar:",
                                        "zeroRecords": "Sin resultados encontrados",
                                        "paginate": {
                                            "first": "Primero",
                                            "last": "Ultimo",
                                            "next": "Siguiente",
                                            "previous": "Anterior"
                                        }
                                    },
                                });
                                // Agrega un manejador de eventos al botón en la tabla
                                $("#empleadosTable tbody").on(
                                    "click",
                                    "button",
                                    function () {
                                        var data = dataTable
                                            .row($(this).parents("tr"))
                                            .data();

                                        // Muestra la modal
                                        $("#modal_empleado").modal("show");

                                        var modalBody = $(
                                            "#modal_empleado .modal-body"
                                        );
                                        modalBody.html("");
                                        modalBody.append(
                                            "<p><strong>Empleado Número:</strong> " +
                                            data.EMP_NUM +
                                            "</p>"
                                        );
                                        modalBody.append(
                                            "<p><strong>Nombre del Empleado:</strong> " +
                                            data.EMP_NAME +
                                            "</p>"
                                        );
                                        modalBody.append(
                                            "<p><strong>RFC:</strong> " +
                                            data.EMP_RFC +
                                            "</p>"
                                        );
                                    }
                                );
                            })
                            .catch(function () {
                                // Manejar errores de la promesa
                                console.log("Error al obtener los empleados.");
                            });
                        //----------------------------------------------------------------
                        break;
                    case "C15":
                        //----------------------------------------------------------------
                        cargarEmpleados()
                            .then(function (response) {
                                var empleados = response.empleados;
                                //validamos si el "EMP_NUM" del mando no se encuentra dentro de la tabla de aprobaciones
                                //si el "EMP_NUM" esta en la tabla entonses eso quiere decir q ese mando no tene empleados a su cargo
                                if (mando == false) {
                                    var empNumAprobaciones = emp_aprobaciones
                                        .filter(function (aprobacion) {
                                            return (
                                                aprobacion.ORGANIZACION ==
                                                organizacion
                                            );
                                        })
                                        .map(function (aprobacion) {
                                            return aprobacion.EMP_NUM;
                                        });
                                    var empleadosFiltrados = empleados.filter(
                                        function (empleado) {
                                            var empNum =
                                                empleado.EMP_NUM.toString();
                                            return (
                                                (empleado.ORGANIZACION ==
                                                    organizacion ||
                                                    empNumAprobaciones.includes(
                                                        empNum
                                                    )) &&
                                                empNum != appData.numEmp
                                            );
                                        }
                                    );
                                    empleadosFiltrados =
                                        empleadosFiltrados.filter(function (
                                            empleado
                                        ) {
                                            var empNum =
                                                empleado.EMP_NUM.toString();
                                            return (
                                                !empNumArray.includes(empNum) ||
                                                empNumAprobaciones.includes(
                                                    empNum
                                                )
                                            );
                                        });
                                } else if (mando == true) {
                                    var empleadosFiltrados = [];
                                }
                                //-------------------------------------------------------------
                                // Verificar si hay al menos un empleado con jobNamePrefix "E05" o "E10"
                                var tieneE05 = empleadosFiltrados.some(
                                    function (empleado) {
                                        return empleado.JobNamePrefix === "E05";
                                    }
                                );
                                //------ Verificamos a que DIRECCION pertenes cada mando--------
                                //--------------------------------------------------------------
                                var dataTable = $("#empleadosTable").DataTable({
                                    paging: true,
                                    scrollCollapse: true,
                                    autoFill: true,
                                    responsive: true,
                                    scrollX: true,
                                    scrollY: "70vh",
                                    data: empleadosFiltrados,
                                    columns: [
                                        {
                                            data: null,
                                            render: function (data, type, row) {
                                                var empAprobacion =
                                                    emp_aprobaciones.some(
                                                        function (aprobacion) {
                                                            return (
                                                                aprobacion.EMP_NUM ==
                                                                row.EMP_NUM &&
                                                                aprobacion.ORGANIZACION ==
                                                                organizacion
                                                            );
                                                        }
                                                    );
                                                if (
                                                    row.ORGANIZACION ===
                                                    organizacion ||
                                                    empAprobacion
                                                ) {
                                                    return '<button class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>';
                                                } else if (
                                                    tieneE05 &&
                                                    row.JobNamePrefix === "E05"
                                                ) {
                                                    return '<button class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>';
                                                } else {
                                                    return "";
                                                }
                                            },
                                        },
                                        { data: "EMP_NUM" },
                                        { data: "EMP_NAME" },
                                        { data: "EMP_RFC" },
                                        { data: "EMP_IMSS" },
                                        { data: "EMP_BIRTHDATE" },
                                        { data: "ORGANIZACION" },
                                        { data: "DIRE" },
                                        { data: "TIPO_CONTRATO" },
                                        { data: "ESTATUS" },
                                    ],
                                    // FILTRO-BUSQUEDA DE CADA COLUMNA
                                    initComplete: function () {
                                        var table = this.api();

                                        table.columns().every(function (index) {
                                            var column = this;
                                            if (index !== 0) {
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
                                    dom: "lBfrtip", // Agrega los botones de exportación
                                    buttons: [
                                        "copy",
                                        "csv",
                                        "excel",
                                        "pdf",
                                        "print", // Tipos de exportación
                                    ],
                                    order: [
                                        [0, "desc"], // Ordena por la primera columna (el botón) de forma descendente
                                    ],
                                    language: {
                                        "decimal": "",
                                        "emptyTable": "No hay información",
                                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                                        "infoPostFix": "",
                                        "thousands": ",",
                                        "lengthMenu": "Mostrar _MENU_ Entradas",
                                        "loadingRecords": "Cargando...",
                                        "processing": "Procesando...",
                                        "search": "Buscar:",
                                        "zeroRecords": "Sin resultados encontrados",
                                        "paginate": {
                                            "first": "Primero",
                                            "last": "Ultimo",
                                            "next": "Siguiente",
                                            "previous": "Anterior"
                                        }
                                    },
                                });
                            })
                            .catch(function () {
                                // Manejar errores de la promesa
                                console.log("Error al obtener los empleados.");
                            });
                        //----------------------------------------------------------------
                        break;
                    case "E10":
                        //----------------------------------------------------------------
                        cargarEmpleados()
                            .then(function (response) {
                                var empleados = response.empleados;
                                //validamos si el "EMP_NUM" del mando no se encuentra dentro de la tabla de aprobaciones
                                //si el "EMP_NUM" esta en la tabla entonses eso quiere decir q ese mando no tene empleados a su cargo
                                if (mando == false) {
                                    var empNumAprobaciones = emp_aprobaciones
                                        .filter(function (aprobacion) {
                                            return (
                                                aprobacion.ORGANIZACION ==
                                                organizacion
                                            );
                                        })
                                        .map(function (aprobacion) {
                                            return aprobacion.EMP_NUM;
                                        });
                                    var empleadosFiltrados = empleados.filter(
                                        function (empleado) {
                                            var empNum =
                                                empleado.EMP_NUM.toString();
                                            return (
                                                (empleado.ORGANIZACION ==
                                                    organizacion ||
                                                    empNumAprobaciones.includes(
                                                        empNum
                                                    )) &&
                                                empNum != appData.numEmp
                                            );
                                        }
                                    );
                                    empleadosFiltrados =
                                        empleadosFiltrados.filter(function (
                                            empleado
                                        ) {
                                            var empNum =
                                                empleado.EMP_NUM.toString();
                                            return (
                                                !empNumArray.includes(empNum) ||
                                                empNumAprobaciones.includes(
                                                    empNum
                                                )
                                            );
                                        });
                                } else if (mando == true) {
                                    var empleadosFiltrados = [];
                                }
                                //-------------------------------------------------------------
                                // Verificar si hay al menos un empleado con jobNamePrefix "E05" o "E10"
                                var tieneE05 = empleadosFiltrados.some(
                                    function (empleado) {
                                        return empleado.JobNamePrefix === "E05";
                                    }
                                );
                                //------ Verificamos a que DIRECCION pertenes cada mando--------
                                //--------------------------------------------------------------
                                var dataTable = $("#empleadosTable").DataTable({
                                    paging: true,
                                    scrollCollapse: true,
                                    autoFill: true,
                                    responsive: true,
                                    scrollX: true,
                                    scrollY: "70vh",
                                    data: empleadosFiltrados,
                                    columns: [
                                        {
                                            data: null,
                                            render: function (data, type, row) {
                                                var empAprobacion =
                                                    emp_aprobaciones.some(
                                                        function (aprobacion) {
                                                            return (
                                                                aprobacion.EMP_NUM ==
                                                                row.EMP_NUM &&
                                                                aprobacion.ORGANIZACION ==
                                                                organizacion
                                                            );
                                                        }
                                                    );
                                                //---------
                                                if (
                                                    row.ORGANIZACION ===
                                                    organizacion ||
                                                    empAprobacion
                                                ) {
                                                    return '<button class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>';
                                                } else if (
                                                    tieneE05 &&
                                                    row.JobNamePrefix === "E05"
                                                ) {
                                                    return '<button class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>';
                                                } else {
                                                    return "";
                                                }
                                            },
                                        },
                                        { data: "EMP_NUM" },
                                        { data: "EMP_NAME" },
                                        { data: "EMP_RFC" },
                                        { data: "EMP_IMSS" },
                                        { data: "EMP_BIRTHDATE" },
                                        { data: "ORGANIZACION" },
                                        { data: "DIRE" },
                                        { data: "TIPO_CONTRATO" },
                                        { data: "ESTATUS" },
                                    ],
                                    // FILTRO-BUSQUEDA DE CADA COLUMNA
                                    initComplete: function () {
                                        var table = this.api();

                                        table.columns().every(function (index) {
                                            var column = this;
                                            if (index !== 0) {
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
                                    dom: "lBfrtip", // Agrega los botones de exportación
                                    buttons: [
                                        "copy",
                                        "csv",
                                        "excel",
                                        "pdf",
                                        "print", // Tipos de exportación
                                    ],
                                    order: [
                                        [0, "desc"], // Ordena por la primera columna (el botón) de forma descendente
                                    ],
                                    language: {
                                        "decimal": "",
                                        "emptyTable": "No hay información",
                                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                                        "infoPostFix": "",
                                        "thousands": ",",
                                        "lengthMenu": "Mostrar _MENU_ Entradas",
                                        "loadingRecords": "Cargando...",
                                        "processing": "Procesando...",
                                        "search": "Buscar:",
                                        "zeroRecords": "Sin resultados encontrados",
                                        "paginate": {
                                            "first": "Primero",
                                            "last": "Ultimo",
                                            "next": "Siguiente",
                                            "previous": "Anterior"
                                        }
                                    },
                                });
                            })
                            .catch(function () {
                                // Manejar errores de la promesa
                                console.log("Error al obtener los empleados.");
                            });
                        //----------------------------------------------------------------
                        break;
                    default:
                        alerta("info", "Tu usuario no tiene acceso a este panel");
                }
            })
            .catch(function () {
                // Manejar errores de la promesa
                console.log("Error al conoser tipo de usuario");
            });
    }, 900);
});

