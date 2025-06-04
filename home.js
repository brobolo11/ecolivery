document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const cerrarSesionBtn = document.getElementById("cerrarSesion");
  const usuarioNombre = document.getElementById("usuarioNombre");

  // Mostrar/ocultar botones del header según el estado del usuario
  if (usuario) {
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (usuarioNombre) usuarioNombre.textContent = usuario.nombre;

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("usuario");
        window.location.href = "index.html";
      });
    }

    if (cerrarSesionBtn) {
      cerrarSesionBtn.addEventListener("click", () => {
        sessionStorage.removeItem("usuario");
        window.location.href = "login.html";
      });
    }

  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
    if (loginBtn) loginBtn.style.display = "inline-block";
    window.location.href = "login.html"; // redirige si no hay sesión
  }
});
