<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    @yield('css')
    <link rel="stylesheet" href="{{ asset('css/librerias/bootstrap-icons/font/bootstrap-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('css/librerias/bootstrap-css/css/bootstrap.css') }}">
    @yield('Js')
    {{-- ---------------  --}}
    <script src="{{ asset('js/librerias/bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/librerias/bootstrap.bundle.min.js') }}"></script>
</head>
<body>
    @yield('content')
</body>
</html>