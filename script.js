// ==========================================
// 1. VARIABLES GLOBALES Y TUTORIAL DEL PANDA
// ==========================================
let categoriaSeleccionada = "Hotel";
let hotelSeleccionado = null;
let timerInterval = null;
let tiempoRestante = 900;
let pasoTutorialActual = 0;

const pasosTutorial = [
  {
    texto: "¡Hola! Soy tu asistente Carmesí 🐼. Te enseñaré a reservar en 3 sencillos pasos.",
    boton: "Siguiente ➡️"
  },
  {
    texto: "Primero, elige qué tipo de hospedaje buscas: Hotel, Resort, Motel, Estándar o Suite.",
    boton: "Entendido ➡️"
  },
  {
    texto: "Luego, selecciona el Estado, Ciudad y Zona de tu preferencia para ver la disponibilidad.",
    boton: "¡Listo para empezar! 🚀"
  }
];

// Carga inicial al abrir la app
document.addEventListener("DOMContentLoaded", () => {
  cargarEstados();

  // Escuchar clics en todos los botones de la cuadrícula de categorías
  const botonesCategoria = document.querySelectorAll(".category-grid .cat-card");
  botonesCategoria.forEach(btn => {
    btn.addEventListener("click", function () {
      const nombreCategoria = this.dataset.category || this.querySelector("b")?.innerText || this.innerText.trim();
      seleccionarCategoria(nombreCategoria, this);
    });
  });
});

// Funciones para controlar el Panda Tutorial
function avanzarTutorial() {
  pasoTutorialActual++;
  const txtBubble = document.getElementById("pandaBubbleText");
  const btnTut = document.getElementById("btnPandaTutorial");

  if (pasoTutorialActual < pasosTutorial.length) {
    if (txtBubble) txtBubble.innerText = pasosTutorial[pasoTutorialActual].texto;
    if (btnTut) btnTut.innerText = pasosTutorial[pasoTutorialActual].boton;
  } else {
    minimizarPanda();
  }
}

function minimizarPanda() {
  const pandaHero = document.getElementById("pandaHeroContainer");
  const pandaFloat = document.getElementById("pandaFloatingBtn");
  
  if (pandaHero) pandaHero.style.display = "none";
  if (pandaFloat) pandaFloat.style.display = "flex";
}

function reabrirPanda() {
  pasoTutorialActual = 0;
  const pandaHero = document.getElementById("pandaHeroContainer");
  const pandaFloat = document.getElementById("pandaFloatingBtn");
  const txtBubble = document.getElementById("pandaBubbleText");
  const btnTut = document.getElementById("btnPandaTutorial");

  if (txtBubble) txtBubble.innerText = pasosTutorial[0].texto;
  if (btnTut) btnTut.innerText = pasosTutorial[0].boton;

  if (pandaHero) pandaHero.style.display = "flex";
  if (pandaFloat) pandaFloat.style.display = "none";
}

// ==========================================
// 2. NAVEGACIÓN Y SELECCIÓN DE CATEGORÍAS
// ==========================================
function siguientePaso(paso) {
  document.querySelectorAll(".step-card").forEach(card => card.classList.remove("active"));
  const stepTarget = document.getElementById(`step-${paso}`);
  if (stepTarget) {
    stepTarget.classList.add("active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function seleccionarCategoria(cat, elemento) {
  categoriaSeleccionada = cat;

  // Enciende el botón seleccionado y apaga los demás
  document.querySelectorAll(".category-grid .cat-card").forEach(btn => btn.classList.remove("active"));
  if (elemento) {
    elemento.classList.add("active");
  }
}

// ==========================================
// 3. BASE DE DATOS DE VENEZUELA (24 TERRITORIOS)
// ==========================================
const ubicacionesVzla = {
  "Caracas (Distrito Capital)": {
    "Chacao": ["Altamira", "La Castellana", "Los Palos Grandes"],
    "Baruta": ["Las Mercedes", "Prados del Este"],
    "Libertador": ["Centro Histórico", "El Recreo", "Sabana Grande"]
  },
  "Amazonas": {
    "Puerto Ayacucho": ["Centro", "Avenida Orinoco"]
  },
  "Anzoátegui": {
    "Puerto La Cruz": ["Paseo Colón", "Sector Venecia"],
    "Lechería": ["El Morro", "Avenida Principal"],
    "Barcelona": ["Centro", "Las Garzas"]
  },
  "Apure": {
    "San Fernando de Apure": ["Centro", "Paseo Libertador"]
  },
  "Aragua": {
    "Maracay": ["Las Delicias", "Base Aragua", "El Castaño"],
    "Choroní": ["Puerto Colombia"]
  },
  "Barinas": {
    "Barinas": ["Alto Barinas", "Centro"]
  },
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
  "Delta Amacuro": {
    "Tucupita": ["Centro", "Manamo"]
  },
  "Falcón": {
    "Punto Fijo": ["Comunidad Cardón", "Centro"],
    "Coro": ["Zona Colonial", "Centro"],
    "Tucacas": ["Zona Costera", "Chichiriviche"]
  },
  "Guárico": {
    "San Juan de los Morros": ["Centro", "Avenida Bolívar"],
    "Valle de la Pascua": ["Centro"]
  },
  "Lara": {
    "Barquisimeto": ["El Uro", "Piedras Blancas", "Centro", "Cabudare"]
  },
  "Mérida": {
    "Mérida": ["Paseo La Sierra", "La Hechicera", "Sector Milla"],
    "El Vigía": ["Centro"]
  },
  "Miranda": {
    "Los Teques": ["Centro"],
    "Guatire / Guarenas": ["Castillejo", "Nueva Casarapa"],
    "Higuerote": ["Zona Playera"]
  },
  "Monagas": {
    "Maturín": ["Tipuro", "Juanico", "Centro"]
  },
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
  "Táchira": {
    "San Cristóbal": ["Pueblo Nuevo", "Barrio Obrero", "Centro"]
  },
  "Trujillo": {
    "Valera": ["Centro", "La Puerta"],
    "Trujillo": ["Centro Histórico"]
  },
  "La Guaira": {
    "Catia La Mar": ["Zona Playera", "Playa Grande"],
    "Macuto": ["El Castillete", "Caraballeda"]
  },
  "Yaracuy": {
    "San Felipe": ["Centro", "Avenida Yaracuy"]
  },
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

// ==========================================
// 4. BÚSQUEDA Y RESULTADOS
// ==========================================
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
    nombre: "Motel Sweet Carmesí",
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

function ejecutarBusqueda() {
  const estado = document.getElementById("selectEstado").value;
  const ciudad = document.getElementById("selectCiudad").value;
  const zona = document.getElementById("selectZona").value;

  const catLimpia = categoriaSeleccionada.toLowerCase().trim();

  const filtrados = hotelesPrueba.filter(h => {
    const catHotel = h.categoria.toLowerCase().trim();
    
    // Comparación flexible de categorías
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
    if (noResults) noResults.style.display = "block";
    return;
  }
  if (noResults) noResults.style.display = "none";

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

// ==========================================
// 5. MODAL DE PAGO Y VERIFICACIÓN CON PANDAS
// ==========================================
function abrirModalPago(id) {
  hotelSeleccionado = hotelesPrueba.find(h => h.id === id);
  document.getElementById("modalHotelName").innerText = hotelSeleccionado.nombre;
  document.getElementById("pNormal").innerText = `USD $${hotelSeleccionado.precioNormal}`;
  document.getElementById("pFindBed").innerText = `USD $${hotelSeleccionado.precioFindBed}`;
  document.getElementById("pAnticipo").innerText = `USD $${hotelSeleccionado.anticipo}`;
  document.getElementById("pSaldo").innerText = `USD $${hotelSeleccionado.saldoHotel}`;

  // Mostrar el formulario y ocultar el área de verificación
  document.getElementById("pagoFormBox").style.display = "block";
  document.getElementById("pagoStatusBox").style.display = "none";

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
    if (display) display.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    if (tiempoRestante <= 0) {
      clearInterval(timerInterval);
      cerrarModal();
    }
    tiempoRestante--;
  }, 1000);
}

function copiarTexto(texto) {
  navigator.clipboard.writeText(texto);
  alert("Copiado al portapapeles: " + texto);
}

// Proceso dinámico de verificación del pago
function enviarComprobante() {
  const ref = document.getElementById("inputRef").value;
  const file = document.getElementById("inputFile").files[0];

  const formBox = document.getElementById("pagoFormBox");
  const statusBox = document.getElementById("pagoStatusBox");
  const imgPandaStatus = document.getElementById("imgPandaStatus");
  const txtPandaStatus = document.getElementById("txtPandaStatus");
  const codePandaStatus = document.getElementById("codePandaStatus");

  if (!ref || !file) {
    alert("Por favor ingresa el número de referencia y adjunta la captura del comprobante.");
    return;
  }

  // Ocultar formulario y mostrar pantalla con el Panda
  formBox.style.display = "none";
  statusBox.style.display = "block";

  // Estado 1: Panda Verificando
  imgPandaStatus.src = "panda-revisando.png";
  txtPandaStatus.innerText = "El Panda está verificando tu pago móvil... Por favor espera unos segundos.";
  codePandaStatus.style.display = "none";

  // Estado 2: Respuesta con Código tras 3 segundos
  setTimeout(() => {
    const codigoReserva = "FB-" + Math.floor(100000 + Math.random() * 900000);
    imgPandaStatus.src = "panda-exito.png";
    txtPandaStatus.innerText = "¡Pago Verificado con Éxito! Tu reserva ha sido confirmada.";
    codePandaStatus.innerText = "Código de Reserva: " + codigoReserva;
    codePandaStatus.style.display = "block";
  }, 3000);
}
