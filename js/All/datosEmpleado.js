function copyToClipboard() {
    // Seleccionar el contenido que deseas copiar
    var content = document.querySelector('.card-body').innerText;

    // Crear un elemento de textarea oculto para copiar el texto
    var textarea = document.createElement('textarea');
    textarea.value = content;
    document.body.appendChild(textarea);

    // Seleccionar y copiar el texto del textarea
    textarea.select();
    document.execCommand('copy');

    // Remover el textarea
    document.body.removeChild(textarea);

    // Mostrar un mensaje o realizar cualquier otra acción después de copiar
    alerta("success", "Información copiada");
}

function goBack() {
    window.history.back();
}