// Base de datos de Hoteles, Moteles y Resorts
const baseDeDatos = [
  {
    id: 1,
    nombre: "Hotel Prueba Azul",
    categoria: "Hoteles",
    estado: "Caracas (DC)",
    ciudad: "Chacao",
    zona: "Altamira",
    precio: "$50 / noche",
    destacado: true
  },
  {
    id: 2,
    nombre: "Resort Vista Carmesí",
    categoria: "Resorts",
    estado: "Carabobo",
    ciudad: "Valencia",
    zona: "El Trigal",
    precio: "$120 / noche",
    destacado: false
  }
];

// Función para cambiar selección de categoría
function seleccionarFiltro(elemento, tipo) {
  let botones = elemento.parentNode.querySelectorAll('.glass-card');
  botones.forEach(btn => btn.classList.remove('active'));
  elemento.classList.add('active');
}

// Función para simular búsqueda
function buscarDisponibilidad() {
  const estado = document.getElementById('select-estado').value;
  const ciudad = document.getElementById('select-ciudad').value;
  const zona = document.getElementById('select-zona').value;

  alert(`Buscando hospedaje en: ${estado} - ${ciudad} (${zona})`);
}

// Cargar ciudades dinámicamente
function cargarCiudades() {
  const selectEstado = document.getElementById('select-estado').value;
  const selectCiudad = document.getElementById('select-ciudad');
  selectCiudad.innerHTML = '';

  let opciones = [];
  if (selectEstado === "Caracas (DC)") {
    opciones = ["Chacao", "Baruta", "Sucre"];
  } else if (selectEstado === "Cojedes") {
    opciones = ["Tinaquillo", "San Carlos"];
  } else if (selectEstado === "Carabobo") {
    opciones = ["Valencia", "Naguanagua"];
  }

  opciones.forEach(ciudad => {
    let opt = document.createElement('option');
    opt.value = ciudad;
    opt.textContent = ciudad;
    selectCiudad.appendChild(opt);
  });

  cargarZonas();
}

// Cargar zonas dinámicamente
function cargarZonas() {
  const selectCiudad = document.getElementById('select-ciudad').value;
  const selectZona = document.getElementById('select-zona');
  selectZona.innerHTML = '';

  let opciones = [];
  if (selectCiudad === "Chacao") opciones = ["Altamira", "Los Palos Grandes"];
  else if (selectCiudad === "Tinaquillo") opciones = ["Centro", "La Candelaria"];
  else opciones = ["Zona Central"];

  opciones.forEach(zona => {
    let opt = document.createElement('option');
    opt.value = zona;
    opt.textContent = zona;
    selectZona.appendChild(opt);
  });
}
