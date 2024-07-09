@extends('layouts.headerAll') {{-- Encabezado de todas las paguinas --}}
@section('title', 'Inicio de seción') {{-- Uso de variables en cada documento en este caso en Titulo  --}}
@section('css')
    <link rel="stylesheet" href="{{ asset('css/style-login.css') }}">
@endsection
@section('Js')
    {{-- <script src="{{ asset('js/inicio_sesion.js') }}"></script> --}}
@endsection
@section('content') {{-- Dentro del body hemos llamado "content" la sección donde va a variar el contenido del body --}}

@endsection {{-- Fin del contenido del body  --}}
