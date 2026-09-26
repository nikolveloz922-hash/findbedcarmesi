// ==========================================
// 1. VARIABLES GLOBALES
// ==========================================
let tipoSeleccionado = "";
let nivelSeleccionado = "";
let hotelSeleccionado = null;
let timerInterval = null;
let tiempoRestante = 900;
let pasoTutorialIndex = 0;

const API_URL = "https://tu-worker.workers.dev/api"; // Reemplaza con tu URL de Cloudflare Worker si lo despliegas

const pasosTutorialCompleto = [
  {
    titulo: "¡Bienvenido a FindBed Carmesí! 🐼",
    texto: "Te ayudaré a reservar la mejor habitación en Venezuela al precio más económico del mercado.",
    imagen: "panda-saludando.png"
  },
  {
    titulo: "1. Tipo y Categoría",
    texto: "Primero selecciona el tipo (Hotel, Motel, Resort, Posada) y luego el nivel de habitación (Básica, Estándar, Premium, Suite).",
    imagen: "panda-normal.png"
  },
  {
    titulo: "2. Ubicación y Fechas",
    texto: "Elige el Estado, Ciudad y Zona donde te hospedarás junto a tus fechas de llegada y salida.",
    imagen: "panda-normal.png"
  },
  {
    titulo: "3. Pago y Verificación",
    texto: "Pagas un pequeño anticipo en Pago Móvil para asegurar el descuento y el resto lo cancelas al llegar al hospedaje.",
    imagen: "panda-revisando.png"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  cargarEstados();
});

// ==========================================
// 2. PORTADA DE INICIO Y TUTORIAL MODAL
// ==========================================
function iniciarExperiencia() {
  siguientePaso(1);
}

function abrirTutorialCompleto() {
  pasoTutorialIndex = 0;
  actualizarVistaTutorial();
  document.getElementById("modalTutorial").style.display = "flex";
}

function cerrarTutorial() {
  document.getElementById("modalTutorial").style.display = "none";
}

function cambiarPasoTutorial(direccion) {
  pasoTutorialIndex += direccion;
  if (pasoTutorialIndex < 0) pasoTutorialIndex = 0;
  if (pasoTutorialIndex >= pasosTutorialCompleto.length) {
    cerrarTutorial();
    return;
  }
  actualizarVistaTutorial();
}

function actualizarVistaTutorial() {
  const paso = pasosTutorialCompleto[pasoTutorialIndex];
  document.getElementById("tutTitulo").innerText = paso.titulo;
  document.getElementById("tutDescripcion").innerText = paso.texto;
  document.getElementById("imgPandaTut").src = paso.imagen;

  document.getElementById("btnTutAnterior").style.display = pasoTutorialIndex === 0 ? "none" : "inline-block";
  document.getElementById("btnTutSiguiente").innerText = (pasoTutorialIndex === pasosTutorialCompleto.length - 1) ? "¡Entendido! 👍" : "Siguiente ➡️";
}

// ==========================================
// 3. SELECCIÓN DOBLE: TIPO + CATEGORÍA/NIVEL
// ==========================================
function seleccionarTipo(tipo, elemento) {
  tipoSeleccionado = tipo;
  
  const contenedorTipo = document.getElementById("block-tipo");
  contenedorTipo.querySelectorAll(".cat-card").forEach(btn => btn.classList.remove("active"));
  elemento.classList.add("active");

  const blockCat = document.getElementById("block-categoria");
  blockCat.style.display = "block";
  blockCat.scrollIntoView({ behavior: 'smooth' });
}

function seleccionarNivel(nivel, elemento) {
  nivelSeleccionado = nivel;

  const contenedorNivel = document.getElementById("block-categoria");
  contenedorNivel.querySelectorAll(".cat-card").forEach(btn => btn.classList.remove("active"));
  elemento.classList.add("active");

  document.getElementById("btnIrUbicacion").style.display = "block";
}

// ==========================================
// 4. NAVEGACIÓN Y UBICACIONES (24 ESTADOS)
// ==========================================
function siguientePaso(paso) {
  document.querySelectorAll(".step-card").forEach(card => card.classList.remove("active"));
  const stepTarget = document.getElementById(`step-${paso}`);
  if (stepTarget) {
    stepTarget.classList.add("active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

const ubicacionesVzla = {
  "Caracas (Distrito Capital)": {
    "Chacao": ["Altamira", "La Castellana", "Los Palos Grandes"],
    "Baruta": ["Las Mercedes", "Prados del Este"],
    "Libertador": ["Centro Histórico", "El Recreo", "Sabana Grande"]
  },
  "Amazonas": { "Puerto Ayacucho": ["Centro", "Avenida Orinoco"] },
  "Anzoátegui": { "Puerto La Cruz": ["Paseo Colón"], "Lechería": ["El Morro"], "Barcelona": ["Centro"] },
  "Apure": { "San Fernando de Apure": ["Centro"] },
  "Aragua": { "Maracay": ["Las Delicias", "Base Aragua"], "Choroní": ["Puerto Colombia"] },
  "Barinas": { "Barinas": ["Alto Barinas", "Centro"] },
  "Bolívar": { "Ciudad Guayana (Puerto Ordaz)": ["Alta Vista"], "Ciudad Bolívar": ["Paseo Orinoco"] },
  "Carabobo": { "Valencia": ["Prebo", "Mañongo"], "Puerto Cabello": ["Zona Playera"] },
  "Cojedes": { "Tinaquillo": ["Centro", "Zona Industrial"], "San Carlos": ["Centro"] },
  "Delta Amacuro": { "Tucupita": ["Centro"] },
  "Falcón": { "Punto Fijo": ["Centro"], "Coro": ["Zona Colonial"], "Tucacas": ["Zona Costera"] },
  "Guárico": { "San Juan de los Morros": ["Centro"] },
  "Lara": { "Barquisimeto": ["El Uro", "Cabudare"] },
  "Mérida": { "Mérida": ["Sector Milla"], "El Vigía": ["Centro"] },
  "Miranda": { "Los Teques": ["Centro"], "Higuerote": ["Zona Playera"] },
  "Monagas": { "Maturín": ["Tipuro"] },
  "Nueva Esparta": { "Porlamar": ["Bella Vista"], "Pampatar": ["Bahía de Pampatar"] },
  "Portuguesa": { "Acarigua / Araure": ["Centro"] },
  "Sucre": { "Cumaná": ["Centro Histórico"] },
  "Táchira": { "San Cristóbal": ["Barrio Obrero"] },
  "Trujillo": { "Valera": ["La Puerta"] },
  "La Guaira": { "Catia La Mar": ["Playa Grande"] },
  "Yaracuy": { "San Felipe": ["Centro"] },
  "Zulia": { "Maracaibo": ["Bella Vista", "5 de Julio"] }
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
// 5. BÚSQUEDA Y RESULTADOS
// ==========================================
const hotelesPrueba = [
  { id: 1, nombre: "Hotel Carmesí Royal", tipo: "Hotel", categoria: "Estándar", estado: "Caracas (Distrito Capital)", ciudad: "Chacao", zona: "Altamira", precioNormal: 80, precioFindBed: 70, anticipo: 10, saldoHotel: 60, imagen: "hotel1_habitacion.jpg" },
  { id: 2, nombre: "Posada Express Carmesí", tipo: "Posada", categoria: "Básica", estado: "Cojedes", ciudad: "Tinaquillo", zona: "Centro", precioNormal: 35, precioFindBed: 25, anticipo: 5, saldoHotel: 20, imagen: "hotel1_piscina.jpg" },
  { id: 3, nombre: "Margarita Beach Resort", tipo: "Resort", categoria: "Premium", estado: "Nueva Esparta", ciudad: "Pampatar", zona: "Bahía de Pampatar", precioNormal: 120, precioFindBed: 100, anticipo: 15, saldoHotel: 85, imagen: "hotel1_habitacion.jpg" },
  { id: 4, nombre: "Motel Sweet Carmesí", tipo: "Motel", categoria: "Básica", estado: "Caracas (Distrito Capital)", ciudad: "Baruta", zona: "Las Mercedes", precioNormal: 45, precioFindBed: 35, anticipo: 5, saldoHotel: 30, imagen: "hotel1_piscina.jpg" },
  { id: 5, nombre: "Suite Carmesí Deluxe", tipo: "Hotel", categoria: "Suite", estado: "Caracas (Distrito Capital)", ciudad: "Chacao", zona: "La Castellana", precioNormal: 150, precioFindBed: 130, anticipo: 20, saldoHotel: 110, imagen: "hotel1_habitacion.jpg" }
];

function ejecutarBusqueda() {
  const estado = document.getElementById("selectEstado").value;
  const ciudad = document.getElementById("selectCiudad").value;
  const zona = document.getElementById("selectZona").value;

  const filtrados = hotelesPrueba.filter(h => {
    const matchTipo = !tipoSeleccionado || h.tipo.toLowerCase() === tipoSeleccionado.toLowerCase();
    const matchNivel = !nivelSeleccionado || h.categoria.toLowerCase() === nivelSeleccionado.toLowerCase();
    const matchEst = !estado || h.estado === estado;
    const matchCiu = !ciudad || h.ciudad === ciudad;
    const matchZon = !zona || h.zona === zona;

    return matchTipo && matchNivel && matchEst && matchCiu && matchZon;
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
        <p style="font-size:0.8rem; color:#aaa;">📍 ${h.ciudad},${h.estado} (${h.tipo} -${h.categoria})</p>
        
        <div class="price-box">
          <p class="old-price">Precio Normal: USD $${h.precioNormal}</p>           <p class="new-price">Precio FindBed: USD $${h.precioFindBed}</p>
          <p class="sub-price">💳 Anticipo FindBed: USD $${h.anticipo}</p>           <p class="sub-price">🏨 Restante en Hotel: USD $${h.saldoHotel}</p>
        </div>

        <button class="btn-primary-blue" onclick="abrirModalPago(${h.id})">Reservar Ahora 🏨</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================
// 6. MODAL DE PAGO
// ==========================================
function abrirModalPago(id) {
  hotelSeleccionado = hotelesPrueba.find(h => h.id === id);
  document.getElementById("modalHotelName").innerText = hotelSeleccionado.nombre;
  document.getElementById("pNormal").innerText = `USD $${hotelSeleccionado.precioNormal}`;
  document.getElementById("pFindBed").innerText = `USD $${hotelSeleccionado.precioFindBed}`;
  document.getElementById("pAnticipo").innerText = `USD $${hotelSeleccionado.anticipo}`;
  document.getElementById("pSaldo").innerText = `USD $${hotelSeleccionado.saldoHotel}`;

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

function enviarComprobante() {
  const ref = document.getElementById("inputRef").value;
  const file = document.getElementById("inputFile").files[0];

  const formBox = document.getElementById("pagoFormBox");
  const statusBox = document.getElementById("pagoStatusBox");
  const txtPandaStatus = document.getElementById("txtPandaStatus");
  const codePandaStatus = document.getElementById("codePandaStatus");

  if (!ref || !file) {
    alert("Por favor ingresa el número de referencia y adjunta la captura del comprobante.");
    return;
  }

  formBox.style.display = "none";
  statusBox.style.display = "block";

  txtPandaStatus.innerText = "El Panda está verificando tu pago móvil... Por favor espera unos segundos.";
  codePandaStatus.style.display = "none";

  setTimeout(() => {
    const codigoReserva = "FB-" + Math.floor(100000 + Math.random() * 900000);
    txtPandaStatus.innerText = "¡Pago Verificado con Éxito! Tu reserva ha sido confirmada.";
    codePandaStatus.innerText = "Código de Reserva: " + codigoReserva;
    codePandaStatus.style.display = "block";
  }, 3000);
}
