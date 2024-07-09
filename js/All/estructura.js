$(document).ready(function () {
    cargarEmpleados()
        .then(function (response) {
            // console.log(response);
            let doc = response.empleados;
            // console.log(doc);

            $("#Table_empleados").DataTable({
                paging: true,
                scrollCollapse: true,
                autoFill: true,
                responsive: true,
                scrollX: true,
                scrollY: "70vh",
                data: doc,
                columns: [
                    {
                        data: null,
                        render: function (data, type, row) {
                            return `<button onclick="datos_empleado(${data.EMP_NUM})"  class="btn_Empleado"><i class="bi bi-plus-lg"></i></button>`;
                        },
                    },
                    { data: "EMP_NUM" },
                    { data: "EMP_NAME" },
                ],
                // FILTRO-BUSQUEDA DE CADA COLUMNA
                initComplete: function () {
                    var table = this.api();

                    table.columns().every(function (index) {
                        var column = this;
                        if (index !== 0) {
                            var input = $("<br><input id='Input_cmbioColor' placeholder='Buscar...'>").appendTo($(column.header()));

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
            console.log("Error obtener empleados:");
        });
});
function datos_empleado(id) {
    // $("#loading-container").show();
    const idformater = btoa(id);
    // var datosMenu = JSON.parse(atob(idformater));
    // setTimeout(function () {
        // $("#loading-container").hide();
        window.location.href = `${URL}/${idformater}`;
    // },1500);
}