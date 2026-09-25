// Base de datos completa de Ubicaciones de Venezuela (23 Estados, DCO y DPF)
const ubicacionesVzla = {
  "Caracas (Distrito Capital)": {
    "Chacao": ["Altamira", "La Castellana", "Los Palos Grandes", "El Bosque"],
    "Baruta": ["Las Mercedes", "Prados del Este", "El Cafetal"],
    "Libertador": ["Centro Histórico", "El Recreo", "La Candelaria", "Sabana Grande"]
  },
  "Amazonas": {
    "Puerto Ayacucho": ["Centro", "Avenida Orinoco"]
  },
  "Anzoátegui": {
    "Puerto La Cruz": ["Paseo Colón", "Centro"],
    "Lechería": ["El Morro", "Av. Principal Lechería"],
    "Barcelona": ["Centro", "Nueva Barcelona"]
  },
  "Apure": {
    "San Fernando de Apure": ["Centro", "Av. Carabobo"]
  },
  "Aragua": {
    "Maracay": ["Las Delicias", "Base Aragua", "El Limón"],
    "Choroní": ["Puerto Colombia", "El Pueblo"]
  },
  "Barinas": {
    "Barinas": ["Alto Barinas", "Centro"]
  },
  "Bolívar": {
    "Ciudad Guayana": ["Puerto Ordaz", "San Félix"],
    "Ciudad Bolívar": ["Casco Histórico", "Paseo Orinoco"]
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
    "Tucupita": ["Centro", "Av. Rivera"]
  },
  "Falcón": {
    "Punto Fijo": ["Comunidad Cardón", "Centro"],
    "Coro": ["Casco Colonial", "Av. Independencia"]
  },
  "Guárico": {
    "San Juan de los Morros": ["Centro", "Av. Bolívar"],
    "Valle de la Pascua": ["Centro"]
  },
  "Lara": {
    "Barquisimeto": ["El Uro", "Cabudare", "Centro"],
    "Carora": ["Centro Histórico"]
  },
  "Mérida": {
    "Mérida": ["Milla", "Los Cursos", "Las Heroínas"],
    "El Vigía": ["Centro"]
  },
  "Miranda": {
    "Los Teques": ["Centro", "El Paso"],
    "Guatire": ["Castillejo", "Centro"],
    "Guarenas": ["Nueva Casarapa", "Centro"]
  },
  "Monagas": {
    "Maturín": ["Tipuro", "Centro", "Juanico"]
  },
  "Nueva Esparta": {
    "Porlamar": ["Bella Vista", "Costa Azul"],
    "Pampatar": ["Bahía de Pampatar", "Pampatar Centro"]
  },
  "Portuguesa": {
    "Acarigua": ["Centro", "Araure"],
    "Guanare": ["Centro"]
  },
  "Sucre": {
    "Cumaná": ["Centro", "San Luis"],
    "Carúpano": ["Centro"]
  },
  "Táchira": {
    "San Cristóbal": ["Pueblo Nuevo", "La Concordia", "Centro"],
    "San Antonio del Táchira": ["Centro"]
  },
  "Trujillo": {
    "Trujillo": ["Centro"],
    "Valera": ["La Puerta", "Centro"]
  },
  "La Guaira": {
    "La Guaira": ["Macuto", "Naiguatá", "Catia La Mar"]
  },
  "Yaracuy": {
    "San Felipe": ["Centro", "Higuerón"]
  },
  "Zulia": {
    "Maracaibo": ["Bella Vista", "5 de Julio", "El Milagro"],
    "Cabimas": ["Centro"]
  },
  "Dependencias Federales": {
    "Los Roques": ["Gran Roque"]
  }
};

// Base de datos de hoteles
const hotelesData = [
  {
    id: 1,
    nombre: "Hotel Carmesí Royal",
    categoria: "Hotel",
    nivel: "Alta Gama",
    estado: "Caracas (Distrito Capital)",
    ciudad: "Chacao",
    zona: "Altamira",
    habitaciones: 4,
    precioOficial: 50,
    precioOferta: 40,
    anticipo: 12,
    pagoRestante: 28,
    imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    nombre: "Posada Express Carmesí",
    categoria: "Hotel",
    nivel: "Económica",
    estado: "Cojedes",
    ciudad: "Tinaquillo",
    zona: "Centro",
    habitaciones: 8,
    precioOficial: 25,
    precioOferta: 25,
    anticipo: 4,
    pagoRestante: 21,
    imagen: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
  }
];

let hotelSeleccionado = null;
let tiempoRestante = 898;
let timerInterval = null;
let filtroTipo = "Hoteles";
let filtroNivel = "Todos";

document.addEventListener("DOMContentLoaded", () => {
  cargarEstados();
  renderHoteles(hotelesData);
  setupEvents();
});

function cargarEstados() {
  const selectEstado = document.getElementById("selectEstado");
  if (!selectEstado) return;
  selectEstado.innerHTML = '<option value="">Todos los Estados</option>';
  Object.keys(ubicacionesVzla).sort().forEach(estado => {
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
    Object.keys(ubicacionesVzla[estado]).sort().forEach(ciudad => {
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
    ubicacionesVzla[estado][ciudad].sort().forEach(zona => {
      selectZona.innerHTML += `<option value="${zona}">${zona}</option>`;
    });
  }
}

function setupEvents() {
  document.querySelectorAll(".chip-group button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      parent.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      
      if (parent.dataset.group === "hospedaje") filtroTipo = e.target.innerText;
      if (parent.dataset.group === "nivel") filtroNivel = e.target.innerText;
    });
  });

  const btnBuscar = document.getElementById("btnBuscar");
  if (btnBuscar) {
    btnBuscar.addEventListener("click", () => {
      const estado = document.getElementById("selectEstado").value;
      const ciudad = document.getElementById("selectCiudad").value;
      const zona = document.getElementById("selectZona").value;

      const filtrados = hotelesData.filter(h => {
        const matchTipo = (filtroTipo === "Hoteles" && h.categoria === "Hotel") ||
                          (filtroTipo === "Resorts" && h.categoria === "Resort") ||
                          (filtroTipo === "Moteles" && h.categoria === "Motel");
        const matchNivel = filtroNivel === "Todos" || h.nivel === filtroNivel;
        const matchEstado = !estado || h.estado === estado;
        const matchCiudad = !ciudad || h.ciudad === ciudad;
        const matchZona = !zona || h.zona === zona;

        return matchTipo && matchNivel && matchEstado && matchCiudad && matchZona;
      });

      renderHoteles(filtrados);
    });
  }
}

function renderHoteles(lista) {
  const container = document.getElementById("contenedorHoteles");
  const noResults = document.getElementById("noResults");
  if (!container) return;
  
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
      <img src="${h.imagen}" alt="${h.nombre}">
      <div class="card-body">
        <div class="badges">
          <span class="badge badge-blue">Disponible (${h.habitaciones} habs)</span>
          <span class="badge badge-green">${h.nivel}</span>
        </div>
        <h3>${h.nombre}</h3>
        <p style="font-size: 0.85rem; color: #ddd; margin-top: 4px;">📍 ${h.ciudad}, ${h.estado} (${h.zona})</p>
        
        <div class="price-box">
          <p class="old-price">Precio Oficial: USD $${h.precioOficial} (0% desc.)</p>
          <p class="new-price">Precio Oferta: USD $${h.precioOferta} / noche</p>
          <p class="sub-price">💳 Anticipo Reserva App: USD $${h.anticipo}</p>
          <p class="sub-price">🏨 Pago Restante en Hotel: USD $${h.pagoRestante}</p>
        </div>

        <button class="btn-reservar" onclick="abrirModalPago(${h.id})">Reservar Ahora 🏨</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function abrirModalPago(id) {
  hotelSeleccionado = hotelesData.find(h => h.id === id);
  document.getElementById("modalHotelName").innerText = hotelSeleccionado.nombre;
  document.getElementById("modalMonto").innerText = `Anticipo: USD $${hotelSeleccionado.anticipo} (al cambio BCV)`;
  document.getElementById("modalPago").style.display = "flex";
  iniciarContador();
}

function cerrarModal() {
  document.getElementById("modalPago").style.display = "none";
  clearInterval(timerInterval);
}

function iniciarContador() {
  clearInterval(timerInterval);
  tiempoRestante = 898;
  const timerDisplay = document.getElementById("timerDisplay");

  timerInterval = setInterval(() => {
    const mins = Math.floor(tiempoRestante / 60);
    const secs = tiempoRestante % 60;
    timerDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    if (tiempoRestante <= 0) {
      clearInterval(timerInterval);
      alert("El tiempo para realizar la reserva ha expirado.");
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

  if (!ref || !file) {
    alert("Por favor ingresa la referencia y selecciona el comprobante.");
    return;
  }

  const codigo = "FB-" + Math.floor(100000 + Math.random() * 900000);
  alert(`¡Comprobante recibido con éxito!\nTu código de reserva temporal es: ${codigo}`);
  cerrarModal();
   }
                   
