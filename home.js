$(document).ready(function () {
    $('#logoutBtn').on('click', function () {
        window.location.href = 'index.html';
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));

  if (!usuario) {
    window.location.href = 'login.html';
    return;
  }

  const titulo = document.querySelector('.titulo');
  if (titulo) {
    titulo.textContent = `Bienvenido, ${usuario.nombre}`;
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('usuario');
      window.location.href = 'index.html';
    });
  }
});

$(document).ready(function () {
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));

  if (!usuario) {
    window.location.href = 'login.html';
    return;
  }
  $('#usuarioNombre').text(usuario.nombre);

  $('#cerrarSesion').on('click', function () {
    sessionStorage.removeItem('usuario');
    window.location.href = 'login.html';
  });
});
