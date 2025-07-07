
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(producto, cantidad = 1) {
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();


  const offcanvasElement = document.getElementById("offcanvasCarrito");
  if (offcanvasElement) {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
    offcanvas.show();
  }
}


function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  if (carrito.length === 0) {
    const offcanvasElement = document.getElementById("offcanvasCarrito");
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
      offcanvas.hide();
    }
  } else {
    actualizarCarrito();
  }
}


function mostrarCarritoVacio() {
  const contenedor = document.getElementById("contenido-carrito");
  const footer = document.getElementById("offcanvas-footer");

  contenedor.innerHTML = `
    <div id="mensaje-carrito-vacio" class="text-center text-muted">
      <p class="mb-3">Tu carrito está vacío</p>
      <a href="categorias.html" class="btn btn-primary" id="btn-seguir-comprando">Seguir comprando</a>
      
    </div>
  `;

  if (footer) footer.classList.add("d-none");

  const btnSeguir = document.getElementById("btn-seguir-comprando");
  if (btnSeguir) {
    btnSeguir.addEventListener("click", () => {
      const offcanvasElement = document.getElementById("offcanvasCarrito");
      if (offcanvasElement) {
        const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
        offcanvas.hide();
      }
    });
  }
}


function actualizarCarrito() {
  const contenedor = document.getElementById("contenido-carrito");
  const footer = document.getElementById("offcanvas-footer");

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    mostrarCarritoVacio();
    return;
  }

  if (footer) footer.classList.remove("d-none");

  let total = 0;

  carrito.forEach(producto => {
    const item = document.createElement("div");
    item.className = "d-flex justify-content-between align-items-center mb-3";

    item.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="me-3 rounded" width="50" height="50">
        <div>
          <h6 class="mb-1">${producto.nombre}</h6>
          <small>Cantidad: ${producto.cantidad}</small>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <strong class="me-3">$${(producto.precio * producto.cantidad).toLocaleString()}</strong>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${producto.id})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    contenedor.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  document.getElementById("carrito-total").textContent = `$${total.toLocaleString()}`;
}


function finalizarCompra() {
  carrito = [];
  localStorage.removeItem("carrito");

  const contenedor = document.getElementById("contenido-carrito");
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-bag-check-fill text-success" style="font-size: 4rem;"></i>
        <p class="mt-3 fs-5">¡Gracias por tu compra!</p>
      </div>
    `;
  }

  const footer = document.getElementById("offcanvas-footer");
  if (footer) footer.classList.add("d-none");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}


function limpiarOverlay() {
  document.querySelectorAll('.offcanvas-backdrop').forEach(el => el.remove());
  document.body.classList.remove('offcanvas-backdrop');
  document.body.style.overflow = '';
  document.body.style.paddingRight = ''; 
}


const offcanvasElement = document.getElementById("offcanvasCarrito");
if (offcanvasElement) {
  offcanvasElement.addEventListener("show.bs.offcanvas", actualizarCarrito);
}


document.addEventListener("hidden.bs.offcanvas", function () {
  limpiarOverlay();
});


document.addEventListener("DOMContentLoaded", actualizarCarrito);
