<!DOCTYPE html>
<html lang="en">

<head>  <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#RRGGBB">
    <!-- Opcionalmente, para navegadores de Microsoft -->
    <meta name="msapplication-TileColor" content="#RRGGBB">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ asset('dist/img/LOGO_AZUL_UTEQ.png') }}">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('chosen/chosen.css') }}">
    @yield('css')
    <link rel="stylesheet" href="{{ asset('css/librerias/bootstrap-icons/font/bootstrap-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('css/librerias/bootstrap-css/css/bootstrap.css') }}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css') }}">
    <!-- iCheck -->
    <link rel="stylesheet" href="{{ asset('plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
    <!-- JQVMap -->
    <link rel="stylesheet" href="{{ asset('plugins/jqvmap/jqvmap.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="{{ asset('plugins/overlayScrollbars/css/OverlayScrollbars.min.css') }}">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="{{ asset('plugins/daterangepicker/daterangepicker.css') }}">
    <!-- summernote -->
    <link rel="stylesheet" href="{{ asset('plugins/summernote/summernote-bs4.min.css') }}">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    {{-- <script src="{{ asset('js/librerias/jquery-3.6.3.min.js') }}"></script> --}}
    <!-- jQuery -->
    <script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('chosen/chosen.jquery.js') }}" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="{{ asset('DataTables/css/jquery.dataTables.min.css') }}">
    <script type="text/javascript" charset="utf8" src="{{ asset('DataTables/js/jquery.dataTables.min.js') }}"></script>

    <!-- Incluye DateRangePicker desde CDN CALENDARIO DE PRESTACIONES-->
    <link rel="stylesheet" type="text/css"
        href="https://cdn.jsdelivr.net/npm/daterangepicker@3.1.0/daterangepicker.css" />
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker@3.1.0/moment.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker@3.1.0/daterangepicker.min.js"></script>
    {{-- ---------------------------------------------------------------------------------------- --}}
    <!-- DataTables Export CSS y JS -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

    <link rel="stylesheet" type="text/css"
        href="https://cdn.datatables.net/buttons/2.0.1/css/buttons.dataTables.min.css">
    <script type="text/javascript" charset="utf8"
        src="https://cdn.datatables.net/buttons/2.0.1/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js">
    </script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/2.0.1/js/buttons.html5.min.js">
    </script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/2.0.1/js/buttons.print.min.js">
    </script>
    {{-- ---------------------------------------------------------------------------------------- --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.6.0/math.min.js"></script>
    {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js"></script>
    <!-- Biblioteca jsPDF-autotable -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.13/jspdf.plugin.autotable.min.js"></script> --}}
    <script src="{{ asset('js/jspdf.min.js') }}"></script>
    <script src="{{ asset('js/jspdf.plugin.autotable.min.js') }}"></script>
    {{-- ---------------  --}}
    <script src="{{ asset('js/librerias/bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/librerias/bootstrap.bundle.min.js') }}"></script>
    {{-- <script src="{{ asset('js/mensajes.js') }}"></script>
    <script src="{{ asset('js/all.js') }}"></script> --}}
    @yield('Js')

</head>

<body class="hold-transition sidebar-mini layout-fixed">

    {{-- <div id="loading-container" class="loading-container">
        <div class="loading-spinner"></div>
    </div> --}}

    <div id="mensaje" class="d-flex flex-column position-fixed"
        style="font-size: 12px; top: 8px; left: 16%; transform: translateX(-50%); z-index: 3000;"></div>

    <script>
    </script>
    <div id="body_2" class="wrapper">
        <!-- Preloader -->
        <div class="preloader flex-column justify-content-center align-items-center">
            <!-- navbar.php -->
            <a class="navbar-brand" id="Titulo" href="#">Mathalytics</a>
        </div>
        @include('layouts.navbar')
        <!-- color de la barra de tareas en css con "aside" -->
        <aside class="main-sidebar sidebar-white elevation-4">
            <a href="#" class="brand-link ">
                <div class="row">
                    <div class="col-md">
                        {{-- <img width="80%" height="auto" src="{{ asset('img/ico.png') }}" alt=""> --}}
                    </div>
                    <div class="col-md mt-3">
                        <h6 id="Titulo">Mathalytics</h6>
                    </div>
                </div>
            </a>
            <!-- Sidebar -->
            <div class="sidebar">
                <!-- Sidebar Menu -->
                <nav id="nav" class="mt-2" style="font-size: 15px;">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="bi bi-bar-chart-fill me-2"></i>
                                Estadisticas
                            </a>
                        </li>
                        <!-- <li class="nav-header">Dashboard</li> -->
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="bi bi-percent"></i>
                                Modulos
                                <i class="right fas fa-angle-left"></i>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item ms-3">
                                    <a href="#" class="nav-link">
                                        <i class="bi bi-caret-right me-1"></i>
                                        <p>Cálculo mental y operaciones básicas</p>
                                    </a>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item ms-3">
                                    <a href="#" class="nav-link">
                                        <i class="bi bi-caret-right me-1"></i>
                                        <p>Geometría y visualización espacial</p>
                                    </a>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item ms-3">
                                    <a href="#" class="nav-link">
                                        <i class="bi bi-caret-right me-1"></i>
                                        <p>Álgebra y resolución de ecuaciones</p>
                                    </a>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item ms-3">
                                    <a href="#" class="nav-link">
                                        <i class="bi bi-caret-right me-1"></i>
                                        <p>Estadística y probabilidad</p>
                                    </a>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item ms-3">
                                    <a href="#" class="nav-link">
                                        <i class="bi bi-caret-right me-1"></i>
                                        <p>Trigonometría y geometría analítica</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav><br><br><br><br>
                {{-- <img class="ms-5" width="50%" class="mt-5" height="auto" id="img_nav"
                    src="img/logo_warzone.png" alt=""> --}}
            </div>
        </aside>
    </div>
    <div id="body_3" class="content-wrapper ">
        @yield('content')
        <div id="mensaje" class="d-flex flex-column-reverse position-fixed bottom-0 end-0 p-3"></div>
    </div>

    <footer id="body_2" class="main-footer" style="margin-top: 4rem;">

    </footer>

    <aside class="control-sidebar control-sidebar-"></aside>
    <!-- jQuery UI 1.11.4 -->
    <script src="{{ asset('plugins/jquery-ui/jquery-ui.min.js') }}"></script>
    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script>
        $.widget.bridge('uibutton', $.ui.button)
    </script>
    <!-- Bootstrap 4 -->
    <script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <!-- ChartJS -->
    <script src="{{ asset('plugins/chart.js/Chart.min.js') }}"></script>
    <!-- Sparkline -->
    <script src="{{ asset('plugins/sparklines/sparkline.js') }}"></script>
    <!-- JQVMap -->
    <script src="{{ asset('plugins/jqvmap/jquery.vmap.min.js') }}"></script>
    <script src="{{ asset('plugins/jqvmap/maps/jquery.vmap.usa.js') }}"></script>
    <!-- jQuery Knob Chart -->
    <script src="{{ asset('plugins/jquery-knob/jquery.knob.min.js') }}"></script>
    <!-- daterangepicker -->
    <script src="{{ asset('plugins/moment/moment.min.js') }}"></script>
    <script src="{{ asset('plugins/daterangepicker/daterangepicker.js') }}"></script>
    <!-- Tempusdominus Bootstrap 4 -->
    <script src="{{ asset('plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js') }}"></script>
    <!-- Summernote -->
    <script src="{{ asset('plugins/summernote/summernote-bs4.min.js') }}"></script>
    <!-- overlayScrollbars -->
    <script src="{{ asset('plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js') }}"></script>
    <!-- AdminLTE App -->
    <script src="{{ asset('dist/js/adminlte.js') }}"></script>
    <script>
    </script>
</body>

</html>
