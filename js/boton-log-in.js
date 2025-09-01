document.getElementById("boton-log-in").addEventListener("click", async () => {
  const formValues  = await Swal.fire({
    title: "Iniciar Sesión",
    html: `
      <input id="swal-input1" class="swal2-input" placeholder="Usuario">
      <input id="swal-input2" class="swal2-input" placeholder="Contraseña" type="password">
    `,
    focusConfirm: false,
    preConfirm: () => {
      const usuario = document.getElementById("swal-input1").value;
      const contraseña = document.getElementById("swal-input2").value;

      if (usuario !== "admin" || contraseña !== "1234") {
        Swal.showValidationMessage("Usuario o contraseña incorrectos");
        return;
      }
      else {
        Swal.fire(`Bienvenido ${usuario}`);
      }
    }
  });
});
