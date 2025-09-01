const carritoBoton = document.getElementById('cart-btn')
const carritoFisico = document.getElementById('cart')
const cerrarCarrito = document.getElementById('cerrar-cart')
const contCards = document.getElementById('cont-cards')
const carritoInterno = document.getElementById('carrito-interno')
const total = document.getElementById('total')
const finalizarCompra = document.getElementById('finalizar-compra')
const vaciarCarrito = document.getElementById('vaciar-carrito')

let carrito = []
let productos = [];

window.addEventListener('storage', (e) => {
    if (e.key === 'carritoRJC') {
        console.log('Carrito actualizado desde otra pestaña');
        const nuevoCarrito = JSON.parse(e.newValue || '[]');
        carrito = nuevoCarrito;
        agregadoraACarrito();
        actualizarTotal();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    inicializarCarrito();
    
});


const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carritoRJC', JSON.stringify(carrito));

    window.dispatchEvent(new Event('localStorageUpdated'));
}

window.addEventListener('localStorageUpdated', () => {
    cargarCarritoDesdeLocalStorage();
});

const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem('carritoRJC');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        agregadoraACarrito();  
        actualizarTotal();     
    }
}

const actualizarYGuardarCarrito = () => {
    agregadoraACarrito();
    actualizarTotal();
    guardarCarritoEnLocalStorage();
}


carritoBoton.addEventListener('click', () => {
	carritoFisico.classList.toggle('show')
})

cerrarCarrito.addEventListener('click', () => {
	carritoFisico.classList.toggle('show')
})

const calculadoraTotal = () => {
	let total = carrito.reduce((acc, el) => {
		return acc + (el.precio * el.cantidad)
	}, 0)

	return total
}

const agregadoraACarrito = () => {
	carritoInterno.innerHTML = ''
	if (carrito.length === 0) {
		carritoInterno.innerHTML = '<p>El carrito está vacío</p>';
	} else {
		carrito.forEach((producto) => {
			carritoInterno.innerHTML += `
				<div>
					<h1>${producto.id}. ${producto.nombre} (${producto.cantidad})</h1>
					<p>$${producto.precio} c/u</p>
				</div>
			`;
		});
	}
}

const actualizarTotal = () => {
    let calculoTotal = calculadoraTotal()
    total.innerHTML = `<p class="total">Total: $${calculoTotal}</p>`
}

const agregadoraDeEventoDeBoton = () => {
	const botones = document.querySelectorAll('.boton-agregar')
	const arrayBoton = Array.from(botones)

	arrayBoton.forEach((boton) => {
		boton.addEventListener('click', (event) => {
			let id = event.target.closest('.product-card').id;

			let producto = productos.find((el) => el.id == id)

			const existe = carrito.find((item) => item.id == producto.id);
			if (existe) {
				existe.cantidad++;
			} else {
				carrito.push({ ...producto, cantidad: 1 });
			}
			actualizarYGuardarCarrito();
			agregadoraACarrito()
            actualizarTotal()
		})
	})
}


const renderizadoraDeCards = () => {
	contCards.innerHTML = '';
	productos.forEach((producto) => {
		contCards.innerHTML += `<section class="product-card" id=${producto.id}>
				<img
					src=${producto.imagen}
					alt=${producto.nombre}
				/>
				<h2>${producto.nombre}</h2>
				<p>${producto.descripcion}</p>
				<span class="price">$${producto.precio}</span>
				<button class='boton-agregar'>Agregar al carrito</button>
			</section>`
	})
	agregadoraDeEventoDeBoton()
}

finalizarCompra.addEventListener('click', () => {
    if (carrito.length > 0) {
        Swal.fire({
            title: "Compra finalizada",
            text: "Gracias por tu compra!",
            icon: "success",
            theme: "dark",
            confirmButtonText: "Ok"
        });
        carrito = []
        actualizarYGuardarCarrito();
		
        Swal.fire({
            title: "Carrito vacío",
            text: "No hay productos para finalizar la compra.",
            icon: "warning",
            theme: "dark",
            confirmButtonText: "Ok"
        });
    }
})

vaciarCarrito.addEventListener('click', () => {
    if (carrito.length > 0) {
        carrito = []
        actualizarYGuardarCarrito(); 

        Swal.fire({
            title: "Los productos han sido eliminados",
            icon: "error",
            theme: "dark",
            position: "top-end",
            width: "20%",
            showConfirmButton: false,
            timer: 800,
            timerProgressBar: true,
            toast: true,
        });
    } else {
        Swal.fire({
            title: "Carrito vacío",
            text: "No hay productos para eliminar.",
            icon: "info",
            theme: "dark",
            position: "top-end",
            width: "20%",
            showConfirmButton: false,
            timer: 800,
            timerProgressBar: true,
            toast: true,
        });
    }
})


document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeLocalStorage();
    
   	fetch('../datos/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }
            return response.json();
        })
        .then(data => {
            productos = data.productos;
            renderizadoraDeCards();
            agregadoraACarrito();
            actualizarTotal();
        })
        .catch(error => {
            console.error('Error al cargar producto:', error);
        });
});


document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('boton-agregar')) {
    Swal.fire({
		title: "Se agregó correctamente",
		icon: "success",
		theme: "dark",
		position: "top-end",
		width: "20%",
		showConfirmButton: false,
		timer: 800,
		timerProgressBar: true,
		toast: true,
	});
  }
});

const inicializarCarrito = () => {
    cargarCarritoDesdeLocalStorage();
    if (!carrito || !Array.isArray(carrito)) {
        carrito = [];
        guardarCarritoEnLocalStorage();
    }
}
