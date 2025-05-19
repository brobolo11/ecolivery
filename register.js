$(document).ready(function () {
  const modal = new bootstrap.Modal(document.getElementById('mensajeModal'));

  function showModal(titulo, mensaje, redirect = false) {
    $('#modalTitulo').text(titulo);
    $('#modalBody').text(mensaje);
    modal.show();

    if (redirect) {
      $('#mensajeModal').on('hidden.bs.modal', function () {
        window.location.href = 'home.html';
      });
    } else {
      $('#mensajeModal').on('hidden.bs.modal', function () {
        window.location.href = 'register.html';
      });
    }
  }

  $('form').on('submit', function (e) {
    e.preventDefault();

    const nombre = $('input[name="nombre"]').val().trim();
    const apellidos = $('input[name="apellidos"]').val().trim();
    const correo = $('input[name="correo"]').val().trim();
    const contrasena = $('input[name="contrasena"]').val().trim();
    const confirmarContrasena = $('input[name="confirmarContrasena"]').val().trim();

    if (contrasena !== confirmarContrasena) {
      showModal('Error', 'Las contraseñas no coinciden.');
      return;
    }

    $.ajax({
      url: 'register.php',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ nombre, apellidos, correo, contrasena }),
      success: function (response) {
        showModal('Registro exitoso', '¡Te has registrado correctamente!', true);
      },
      error: function (xhr) {
        if (xhr.status === 409) {
          showModal('Correo existente', 'El correo ya está registrado.');
        } else {
          showModal('Error', 'Error al registrar. Intenta más tarde.');
        }
      }
    });
  });
});
