$(document).ready(function () {
  const modal = new bootstrap.Modal(document.getElementById('mensajeModal'));

  function showModal(titulo, mensaje) {
    $('#modalTitulo').text(titulo);
    $('#modalBody').text(mensaje);
    modal.show();
  }

  $('form').on('submit', function (e) {
    e.preventDefault();

    const correo = $('input[name="correo"]').val().trim();
    const contrasena = $('input[name="contrasena"]').val().trim();

    $.ajax({
      url: 'login.php',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ correo, contrasena }),
      success: function (response) {
        if (response.success) {
          sessionStorage.setItem('usuario', JSON.stringify({ nombre: response.nombre }));
          window.location.href = 'home.html';
        } else {
          showModal('Error de autenticación', response.error);
        }
      },
      error: function () {
        showModal('Error', 'Error al intentar iniciar sesión. Intenta más tarde.');
      }
    });
  });
});
