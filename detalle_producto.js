
const params = new URLSearchParams(window.location.search);
const nombreProducto = params.get("producto");


const normalizar = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();


const producto = window.productos.find(p => normalizar(p.nombre) === normalizar(nombreProducto));


const contenedor = document.getElementById("detalle-container");

if (producto) {

  if (!producto.id) {
    producto.id = window.productos.indexOf(producto);
  }

  contenedor.innerHTML = `
    <!-- Imagen -->
    <div class="col-md-6">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded shadow">
    </div>

    <!-- Detalles -->
    <div class="col-md-6">
      <p class="text-muted">Categoría: ${producto.categoria}</p>
      <h2 class="mb-3">${producto.nombre}</h2>
      <p class="lead">${producto.descripcion}</p>
      <p class="fw-bold fs-2 mb-4">$${producto.precio.toLocaleString()}</p>

      <div class="mb-3">
        <label for="cantidad" class="form-label">Cantidad:</label>
        <select class="form-select w-auto" id="cantidad">
          ${[1, 2, 3, 4, 5].map(v => `<option value="${v}">${v}</option>`).join("")}
        </select>
      </div>
      <button class="btn btn-primary btn-lg" id="btn-agregar">Agregar al carrito</button>
    </div>
  `;

 
  document.getElementById("btn-agregar").addEventListener("click", () => {
    const cantidad = parseInt(document.getElementById("cantidad").value);
    agregarAlCarrito(producto, cantidad);

  
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasCarrito'));
    offcanvas.show();
  });
} else {
  contenedor.innerHTML = `
    <div class="col">
      <p class="text-danger">Producto no encontrado.</p>
    </div>
  `;
}
