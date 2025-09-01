document.getElementById("boton-registrate").addEventListener("click", async () => {
    const formValues  = await Swal.fire({
        title: "Registrarse",
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Usuario">
            <input id="swal-input2" class="swal2-input" placeholder="Contraseña" type="password">
            <input id="swal-input3" class="swal2-input" placeholder="Repetir Contraseña" type="password">
            <input id="swal-input4" class="swal2-input" placeholder="Email" type="email">
            <input id="swal-input5" class="swal2-input" placeholder="Teléfono" type="tel">
            <input id="swal-input6" class="swal2-input" placeholder="Dirección" type="text">
            <input id="swal-input7" class="swal2-input" placeholder="Fecha de Nacimiento" type="date">
            <input id="swal-input8" class="swal2-input" placeholder="DNI" type="text">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const usuario = document.getElementById('swal-input1').value;
            const contrasena = document.getElementById('swal-input2').value;
            const repetirContraseña = document.getElementById('swal-input3').value;
            const email = document.getElementById('swal-input4').value;
            const telefono = document.getElementById('swal-input5').value;
            const direccion = document.getElementById('swal-input6').value;
            const fechaNacimiento = document.getElementById('swal-input7').value;
            const dni = document.getElementById('swal-input8').value;

            if (contrasena !== repetirContraseña) {
                Swal.showValidationMessage("Las contraseñas no coinciden");
                return false;
            }
            return {
                usuario,
                contrasena,
                email,
                telefono,
                direccion,
                fechaNacimiento,
                dni
            };
        }
    });

    if (formValues) {
        Swal.fire('Registro exitoso', `Bienvenido/a ${formValues.usuario}`, 'success');
    } else {
        Swal.fire('Error', 'Por favor, complete todos los campos', 'error');
    }
});