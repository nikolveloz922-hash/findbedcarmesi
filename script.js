// Variable global para registrar la categoría activa
let categoriaSeleccionada = "Hotel";

// Navegación entre pantallas (Pasos)
function siguientePaso(paso) {
  document.querySelectorAll(".step-card").forEach(card => card.classList.remove("active"));
  const stepTarget = document.getElementById(`step-${paso}`);
  if (stepTarget) {
    stepTarget.classList.add("active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// LÓGICA DE BOTONES: Enciende el botón presionado y apaga los demás
function seleccionarCategoria(cat, elemento) {
  categoriaSeleccionada = cat;

  // Busca todos los botones dentro del contenedor de categorías y quita la clase activa
  const todosLosBotones = document.querySelectorAll(".category-grid .cat-card");
  todosLosBotones.forEach(btn => btn.classList.remove("active"));

  // Marca como activo el botón que presionaste
  if (elemento) {
    elemento.classList.add("active");
  }
}

// Asignación de eventos 'click' a todos los botones de categoría
document.addEventListener("DOMContentLoaded", () => {
  cargarEstados();

  // Escucha clics en cualquier botón dentro de .category-grid
  const botonesCategoria = document.querySelectorAll(".category-grid .cat-card");
  botonesCategoria.forEach(btn => {
    btn.addEventListener("click", function () {
      // Extrae el texto del botón o su atributo data-category
      const nombreCategoria = this.dataset.category || this.querySelector("b")?.innerText || this.innerText.trim();
      seleccionarCategoria(nombreCategoria, this);
    });
  });
});

// Base de datos completa de Venezuela (23 Estados + Distrito Capital)
const ubicacionesVzla = {
  "Caracas (Distrito Capital)": {
    "Chacao": ["Altamira", "La Castellana", "Los Palos Grandes"],
    "Baruta": ["Las Mercedes", "Prados del Este"],
    "Libertador": ["Centro Histórico", "El Recreo", "Sabana Grande"]
  },
  "Amazonas": { "Puerto Ayacucho": ["Centro", "Avenida Orinoco"] },
  "Anzoátegui": {
    "Puerto La Cruz": ["Paseo Colón", "Sector Venecia"],
    "Lechería": ["El Morro", "Avenida Principal"],
    "Barcelona": ["Centro", "Las Garzas"]
  },
  "Apure": { "San Fernando de Apure": ["Centro", "Paseo Libertador"] },
  "Aragua": {
    "Maracay": ["Las Delicias", "Base Aragua", "El Castaño"],
    "Choroní": ["Puerto Colombia"]
  },
  "Barinas": { "Barinas": ["Alto Barinas", "Centro"] },
  "Bolívar": {
    "Ciudad Guayana (Puerto Ordaz)": ["Alta Vista", "Unare"],
    "Ciudad Bolívar": ["Paseo Orinoco", "Centro Histórico"]
  },
  "Carabobo": {
    "Valencia": ["El Trigal", "Prebo", "Mañongo", "Naguanagua"],
    "Puerto Cabello": ["Zona Playera", "Casco Histórico"]
  },
  "Cojedes": {
    "Tinaquillo": ["Centro", "Avenida Bolívar", "Zona Industrial"],
    "San Carlos": ["Centro", "Los Samanes"]
  },
  "Delta Amacuro": { "Tucupita": ["Centro", "Manamo"] },
  "Falcón": {
    "Punto Fijo": ["Comunidad Cardón", "Centro"],
    "Coro": ["Zona Colonial", "Centro"],
    "Tucacas": ["Zona Costera", "Chichiriviche"]
  },
  "Guárico": {
    "San Juan de los Morros": ["Centro", "Avenida Bolívar"],
    "Valle de la Pascua": ["Centro"]
  },
  "Lara": { "Barquisimeto": ["El Uro", "Piedras Blancas", "Centro", "Cabudare"] },
  "Mérida": {
    "Mérida": ["Paseo La Sierra", "La Hechicera", "Sector Milla"],
    "El Vigía": ["Centro"]
  },
  "Miranda": {
    "Los Teques": ["Centro"],
    "Guatire / Guarenas": ["Castillejo", "Nueva Casarapa"],
    "Higuerote": ["Zona Playera"]
  },
  "Monagas": { "Maturín": ["Tipuro", "Juanico", "Centro"] },
  "Nueva Esparta": {
    "Porlamar": ["Bella Vista", "Avenida 4 de Mayo"],
    "Pampatar": ["Bahía de Pampatar", "Zona Gastronómica"],
    "Playa El Agua": ["Sector Hotelero"]
  },
  "Portuguesa": {
    "Acarigua / Araure": ["Centro", "Avenida Las Lágrimas"],
    "Guanare": ["Centro"]
  },
  "Sucre": {
    "Cumaná": ["Centro Histórico", "Avenida Perimetral"],
    "Carúpano": ["Centro"]
  },
  "Táchira": { "San Cristóbal": ["Pueblo Nuevo", "Barrio Obrero", "Centro"] },
  "Trujillo": {
    "Valera": ["Centro", "La Puerta"],
    "Trujillo": ["Centro Histórico"]
  },
  "La Guaira": {
    "Catia La Mar": ["Zona Playera", "Playa Grande"],
    "Macuto": ["El Castillete", "Caraballeda"]
  },
  "Yaracuy": { "San Felipe": ["Centro", "Avenida Yaracuy"] },
  "Zulia": {
    "Maracaibo": ["Bella Vista", "5 de Julio", "El Milagro"],
    "San Francisco": ["La Coromoto"]
  }
};

function cargarEstados() {
  const selectEstado = document.getElementById("selectEstado");
  if (!selectEstado) return;
  selectEstado.innerHTML = '<option value="">Todos los Estados</option>';
  Object.keys(ubicacionesVzla).forEach(estado => {
    selectEstado.innerHTML += `<option value="${estado}">${estado}</option>`;
  });
}

function cargarCiudades() {
  const estado = document.getElementById("selectEstado").value;
  const selectCiudad = document.getElementById("selectCiudad");
  const selectZona = document.getElementById("selectZona");

  selectCiudad.innerHTML = '<option value="">Todas las Ciudades</option>';
  selectZona.innerHTML = '<option value="">Todas las Zonas</option>';

  if (estado && ubicacionesVzla[estado]) {
    Object.keys(ubicacionesVzla[estado]).forEach(ciudad => {
      selectCiudad.innerHTML += `<option value="${ciudad}">${ciudad}</option>`;
    });
  }
}

function cargarZonas() {
  const estado = document.getElementById("selectEstado").value;
  const ciudad = document.getElementById("selectCiudad").value;
  const selectZona = document.getElementById("selectZona");

  selectZona.innerHTML = '<option value="">Todas las Zonas</option>';

  if (estado && ciudad && ubicacionesVzla[estado][ciudad]) {
    ubicacionesVzla[estado][ciudad].forEach(zona => {
      selectZona.innerHTML += `<option value="${zona}">${zona}</option>`;
    });
  }
}

// Lista de alojamientos con distintas categorías para probar
const hotelesPrueba = [
  {
    id: 1,
    nombre: "Hotel Carmesí Royal",
    categoria: "Hoteles",
    estado: "Caracas (Distrito Capital)",
    ciudad: "Chacao",
    zona: "Altamira",
    precioNormal: 80,
    precioFindBed: 70,
    anticipo: 10,
    saldoHotel: 60,
    imagen: "hotel1_habitacion.jpg"
  },
  {
    id: 2,
    nombre: "Posada Express Carmesí",
    categoria: "Estándar",
    estado: "Cojedes",
    ciudad: "Tinaquillo",
    zona: "Centro",
    precioNormal: 35,
    precioFindBed: 25,
    anticipo: 5,
    saldoHotel: 20,
    imagen: "hotel1_piscina.jpg"
  },
  {
    id: 3,
    nombre: "Margarita Beach Resort",
    categoria: "Resorts",
    estado: "Nueva Esparta",
    ciudad: "Pampatar",
    zona: "Bahía de Pampatar",
    precioNormal: 120,
    precioFindBed: 100,
    anticipo: 15,
    saldoHotel: 85,
    imagen: "hotel1_habitacion.jpg"
  },
  {
    id: 4,
    nombre: "Motel Carmesí Sweet",
    categoria: "Moteles",
    estado: "Caracas (Distrito Capital)",
    ciudad: "Baruta",
    zona: "Las Mercedes",
    precioNormal: 45,
    precioFindBed: 35,
    anticipo: 5,
    saldoHotel: 30,
    imagen: "hotel1_piscina.jpg"
  },
  {
    id: 5,
    nombre: "Suite Carmesí Deluxe",
    categoria: "Suite",
    estado: "Caracas (Distrito Capital)",
    ciudad: "Chacao",
    zona: "La Castellana",
    precioNormal: 150,
    precioFindBed: 130,
    anticipo: 20,
    saldoHotel: 110,
    imagen: "hotel1_habitacion.jpg"
  }
];

// Ejecuta la búsqueda comparando sin importar mayúsculas, minúsculas o plurales
function ejecutarBusqueda() {
  const estado = document.getElementById("selectEstado").value;
  const ciudad = document.getElementById("selectCiudad").value;
  const zona = document.getElementById("selectZona").value;

  const catLimpia = categoriaSeleccionada.toLowerCase().trim();

  const filtrados = hotelesPrueba.filter(h => {
    const catHotel = h.categoria.toLowerCase().trim();
    
    // Coincidencia de categoría flexible (ej: Hotel / Hoteles / Suite)
    const matchCat = catHotel.includes(catLimpia) || catLimpia.includes(catHotel);
    const matchEst = !estado || h.estado === estado;
    const matchCiu = !ciudad || h.ciudad === ciudad;
    const matchZon = !zona || h.zona === zona;

    return matchCat && matchEst && matchCiu && matchZon;
  });

  renderHoteles(filtrados);
  siguientePaso(4);
}

function renderHoteles(lista) {
  const container = document.getElementById("contenedorHoteles");
  const noResults = document.getElementById("noResults");
  container.innerHTML = "";

  if (lista.length === 0) {
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  lista.forEach(h => {
    const card = document.createElement("div");
    card.className = "hotel-card";
    card.innerHTML = `
      <img src="${h.imagen}" alt="${h.nombre}" onerror="this.src='hotel1_habitacion.jpg'">
      <div class="card-body">
        <h3>${h.nombre}</h3>
        <p style="font-size:0.8rem; color:#aaa;">📍 ${h.ciudad}, ${h.estado} (${h.categoria})</p>
        
        <div class="price-box">
          <p class="old-price">Precio Normal: USD $${h.precioNormal}</p>
          <p class="new-price">Precio FindBed: USD $${h.precioFindBed}</p>
          <p class="sub-price">💳 Anticipo FindBed: USD $${h.anticipo}</p>
          <p class="sub-price">🏨 Restante en Hotel: USD $${h.saldoHotel}</p>
        </div>

        <button class="btn-primary-blue" onclick="abrirModalPago(${h.id})">Reservar Ahora 🏨</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Modal y Temporizador de 15 Minutos
let hotelSeleccionado = null;
let timerInterval = null;
let tiempoRestante = 900;

function abrirModalPago(id) {
  hotelSeleccionado = hotelesPrueba.find(h => h.id === id);
  document.getElementById("modalHotelName").innerText = hotelSeleccionado.nombre;
  document.getElementById("pNormal").innerText = `USD $${hotelSeleccionado.precioNormal}`;
  document.getElementById("pFindBed").innerText = `USD $${hotelSeleccionado.precioFindBed}`;
  document.getElementById("pAnticipo").innerText = `USD $${hotelSeleccionado.anticipo}`;
  document.getElementById("pSaldo").innerText = `USD $${hotelSeleccionado.saldoHotel}`;

  document.getElementById("modalPago").style.display = "flex";
  iniciarContador();
}

function cerrarModal() {
  document.getElementById("modalPago").style.display = "none";
  clearInterval(timerInterval);
}

function iniciarContador() {
  clearInterval(timerInterval);
  tiempoRestante = 900;
  const display = document.getElementById("timerDisplay");

  timerInterval = setInterval(() => {
    const m = Math.floor(tiempoRestante / 60);
    const s = tiempoRestante % 60;
    display.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    if (tiempoRestante <= 0) {
      clearInterval(timerInterval);
      alert("El tiempo de reserva ha expirado.");
      cerrarModal();
    }
    tiempoRestante--;
  }, 1000);
}

function copiarTexto(texto) {
  navigator.clipboard.writeText(texto);
  alert("Copiado: " + texto);
}

function enviarComprobante() {
  const ref = document.getElementById("inputRef").value;
  const file = document.getElementById("inputFile").files[0];

  if (!ref || !file) {
    alert("Ingresa la referencia bancaria y adjunta la captura del comprobante.");
    return;
  }

  alert("Comprobante recibido exitosamente. Tu reserva se encuentra en revisión. Código asignado: FB-" + Math.floor(100000 + Math.random() * 900000));
  cerrarModal();
}
