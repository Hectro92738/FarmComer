<!-- Navbar -->
<nav class="main-header navbar navbar-expand ">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="#" class="nav-link"> <i class="bi bi-house">
                </i>Principal</a>
        </li>
    </ul>
    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
        <span id="social-buttons">
            {{-- <li class="nav-item">
                <button class="ms-4 mt-2 button_discord">
                    <a href="https://discord.com/servers" target="_blank">
                        <i class="bi bi-discord"></i>
                        <span class="ms-2">Discord</span>
                    </a>
                </button>
            </li> --}}
           
            {{-- <li class="nav-item">
                <button class=" ms-4 mt-2 button_insta">
                    <a href="https://www.instagram.com/" target="_blank">
                        <i class="bi bi-instagram"></i>
                        <span class="ms-2">Instagram</span>
                    </a>
                </button>
            </li> --}}
        </span>
        <li class="ms-5 nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                <i class="fas fa-expand-arrows-alt"></i>
            </a>
        </li>
        <li class="nav-item dropdown">
            <div class="infor">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span id="immAvatarAll"></span>
                    <span id="nombre_global_usuario"></span>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item infor dropdown-item" id="view_avatar" href="#">
                        <i class="bi bi-person-bounding-box me-1"></i>Perfil
                    </a>
                    <hr>
                    <a class="dropdown-item infor dropdown-item" href="#">
                        <i class="bi bi-box-arrow-in-right me-1"></i>Salir
                    </a>
                </div>
            </div>
        </li>
    </ul>
</nav>
<!-- /.navbar -->
