window.productos = [

  {
    id: 1,
    nombre: "Lámpara Colgante Virus",
    categoria: "Iluminación",
    precio: 4200,
    imagen: "/img/Lampara_Colgante_Virus.jpg",
    descripcion: "Lámpara colgante con diseño orgánico que combina arte y funcionalidad. Ideal para espacios modernos y cálidos."
  },
  {
    id: 2,
    nombre: "Lámpara Colgante Vori",
    categoria: "Iluminación",
    precio: 4400,
    imagen: "/img/Lampara_Colgante_Vori.jpg",
    descripcion: "Diseño colgante minimalista con acabado mate. Perfecta para iluminar tu comedor o pasillo."
  },
  {
    id: 3,
    nombre: "Lámpara de Mesa Zig",
    categoria: "Iluminación",
    precio: 4100,
    imagen: "/img/Lampara_Mesa_Zig.jpg",
    descripcion: "Lámpara de mesa con diseño zigzagueante, moderna y compacta. Ideal para escritorios o mesas auxiliares."
  },
  {
    id: 4,
    nombre: "Lámpara de Mesa Exo",
    categoria: "Iluminación",
    precio: 4300,
    imagen: "/img/Lampara_Mesa_Exo.jpg",
    descripcion: "Lámpara con estructura exoesquelética, mezcla de diseño futurista y practicidad."
  },

 
  {
    id: 5,
    nombre: "Maceta Adoquín",
    categoria: "Macetas",
    precio: 4200,
    imagen: "/img/Maceta_Adoquin.jpg",
    descripcion: "Maceta con textura de adoquines, ideal para decorar interiores rústicos o patios con estilo natural."
  },
  {
    id: 6,
    nombre: "Maceta Bloom",
    categoria: "Macetas",
    precio: 4400,
    imagen: "/img/Maceta_Bloom.jpg",
    descripcion: "Diseño floral suave y redondeado, perfecta para plantas pequeñas y suculentas."
  },
  {
    id: 7,
    nombre: "Maceta Torio",
    categoria: "Macetas",
    precio: 4100,
    imagen: "/img/Maceta_Torio.jpg",
    descripcion: "Maceta con patrón radial inspirado en elementos atómicos. Estilo único para decoraciones modernas."
  },
  {
    id: 8,
    nombre: "Maceta Tri-Wave",
    categoria: "Macetas",
    precio: 4300,
    imagen: "/img/Maceta_Tri-Wave.jpg",
    descripcion: "Maceta con ondas triangulares en relieve. Moderna, elegante y resistente."
  },

  
  {
    id: 9,
    nombre: "Jarrón Cadena",
    categoria: "Jarrones",
    precio: 4200,
    imagen: "/img/Jarron_Cadena.jpg",
    descripcion: "Jarrón decorativo con patrón de eslabones entrelazados. Ideal para ambientes industriales."
  },
  {
    id: 10,
    nombre: "Jarrón Escamas de Dragon",
    categoria: "Jarrones",
    precio: 4400,
    imagen: "/img/Jarron_Escamas-Dragon.jpg",
    descripcion: "Diseño escamado inspirado en dragones orientales. Una pieza que resalta en cualquier espacio."
  },
  {
    id: 11,
    nombre: "Jarrón Exo",
    categoria: "Jarrones",
    precio: 4100,
    imagen: "/img/Jarron_Exo.jpg",
    descripcion: "Jarrón moderno con cortes angulados. Perfecto para decoración minimalista."
  },
  {
    id: 12,
    nombre: "Jarrón Yao",
    categoria: "Jarrones",
    precio: 4300,
    imagen: "/img/Jarron_Yao.jpg",
    descripcion: "Estilo clásico con curvas suaves. Inspirado en la cerámica tradicional china Yao."
  }
];


function renderizarProductosPorCategoria(categoria, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  const productosFiltrados = productos.filter(p => p.categoria === categoria);

  productosFiltrados.forEach(prod => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 shadow">
        <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
        <div class="card-body d-flex flex-column">
          <p class="text-muted small mb-1">${prod.categoria}</p>
          <h5 class="card-title mb-2">${prod.nombre}</h5>
          <div class="mt-auto">
            <p class="fw-bold fs-2 mb-3">$${prod.precio.toLocaleString()}</p>
            <a href="detalle_producto.html?producto=${encodeURIComponent(prod.nombre)}" class="btn btn-primary mt-auto">Ver producto</a>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}


renderizarProductosPorCategoria("Iluminación", "iluminacion-container");
renderizarProductosPorCategoria("Macetas", "macetas-container");
renderizarProductosPorCategoria("Jarrones", "jarrones-container");

function renderizarProductosDestacados() {
  const destacados = productos.slice(0, 6); 
  const carruselItems = document.getElementById("carrusel-items");

  for (let i = 0; i < destacados.length; i += 3) {
    const grupo = destacados.slice(i, i + 3);
    const item = document.createElement("div");
    item.className = `carousel-item ${i === 0 ? "active" : ""}`;

    item.innerHTML = `
      <div class="row g-3">
        ${grupo.map(prod => `
          <div class="col-md-4">
            <div class="card h-100 shadow">
              <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
              <div class="card-body d-flex flex-column">
                <p class="text-muted small mb-1">${prod.categoria}</p>
                <h5 class="card-title mb-2">${prod.nombre}</h5>
                <div class="mt-auto">
                  <p class="fw-bold fs-5 mb-3">$${prod.precio.toLocaleString()}</p>
                  <a href="detalle_producto.html?producto=${encodeURIComponent(prod.nombre)}" class="btn btn-primary mt-auto">Ver producto</a>
                </div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    carruselItems.appendChild(item);
  }
}

renderizarProductosDestacados();
