
    // Estructura completa de Venezuela: 23 Estados + Distrito Capital
const venezuelaData = {
  "Distrito Capital": {
    "Caracas": ["Sabana Grande", "Altamira", "Las Mercedes", "La Candelaria", "El Recreo"]
  },
  "Amazonas": {
    "Puerto Ayacucho": ["Centro", "Avenida Orinoco", "El Mสำนo"]
  },
  "Anzoátegui": {
    "Puerto La Cruz": ["Paseo Colón", "Sector Lechería", "El Morro"],
    "Barcelona": ["Centro Histórico", "Nueva Barcelona"]
  },
  "Apure": {
    "San Fernando de Apure": ["Centro", "Avenida Caracas"]
  },
  "Aragua": {
    "Maracay": ["El Castaño", "Base Aragua", "Centro", "Las Delicias"],
    "Choroní": ["Puerto Colombia", "El Pueblo"]
  },
  "Barinas": {
    "Barinas": ["Alto Barinas", "Centro"]
  },
  "Bolívar": {
    "Puerto Ordaz": ["Alta Vista", "Unare"],
    "Ciudad Bolívar": ["Paseo Orinoco", "Centro"]
  },
  "Carabobo": {
    "Valencia": ["Naguanagua", "El Trigal", "El Viñedo", "Prebo"],
    "Puerto Cabello": ["El Palito", "Zona Colonial"]
  },
  "Cojedes": {
    "Tinaquillo": ["Centro", "Avenida Miranda", "Buenos Aires"],
    "San Carlos": ["Centro", "Avenida Bolívar"]
  },
  "Delta Amacuro": {
    "Tucupita": ["Centro", "Sector San Rafael"]
  },
  "Falcón": {
    "Coro": ["Zona Colonial", "Las Panelas"],
    "Punto Fijo": ["Centro", "Comunidad Cardón"]
  },
  "Guárico": {
    "San Juan de los Morros": ["Centro", "Los Placeres"]
  },
  "Lara": {
    "Barquisimeto": ["Estepar", "Cabudare", "Centro", "Nueva Segovia"]
  },
  "Mérida": {
    "Mérida": ["Paseo Las Heroínas", "El Vigía", "Los Chorros", "Milla"]
  },
  "Miranda": {
    "Los Teques": ["Centro", "El Paso"],
    "Chacao": ["Altamira", "Castellana"],
    "Higuerote": ["Playa Chocolate", "Centro"]
  },
  "Monagas": {
    "Maturín": ["Tipuro", "Centro", "Las Avenidas"]
  },
  "Nueva Esparta": {
    "Porlamar": ["Bella Vista", "Costa Azul", "4 de Febrero"],
    "Pampatar": ["Bahía de Pampatar", "Playa El Ángel"]
  },
  "Portuguesa": {
    "Acarigua": ["Centro", "Araure"],
    "Guanare": ["Centro", "Mesa de Cavaca"]
  },
  "Sucre": {
    "Cumaná": ["Centro", "San Luis"],
    "Carúpano": ["Centro", "Playa Copacabana"]
  },
  "Táchira": {
    "San Cristóbal": ["Barrio Obrero", "Pueblo Nuevo", "La Concordia"]
  },
  "Trujillo": {
    "Valera": ["Centro", "La Puerta"]
  },
  "La Guaira": {
    "La Guaira": ["Catia La Mar", "Macuto", "Caraballeda"]
  },
  "Yaracuy": {
    "San Felipe": ["Centro", "Higuerón"]
  },
  "Zulia": {
    "Maracaibo": ["Bella Vista", "5 de Julio", "El Milagro", "Tierra Negra"]
  }
};

// Base de datos de ejemplo con hospedajes
const hotelsData = [
  { id: 1, name: "Hotel Carmesí Suites", type: "Hoteles", category: "Estándar", state: "Distrito Capital", city: "Caracas", zone: "Sabana Grande", price: 45, discount: 10 },
  { id: 2, name: "Resort Gran Sabana", type: "Resorts", category: "Lujo", state: "Bolívar", city: "Puerto Ordaz", zone: "Alta Vista", price: 90, discount: 15 },
  { id: 3, name: "Posada Turística El Sol", type: "Posadas", category: "Económica", state: "Cojedes", city: "Tinaquillo", zone: "Centro", price: 20, discount: 5 },
  { id: 4, name: "Hotel Plaza Viñedo", type: "Hoteles", category: "Estándar", state: "Carabobo", city: "Valencia", zone: "El Viñedo", price: 50, discount: 10 },
  { id: 5, name: "Motel Carmesí Express", type: "Moteles", category: "Básico", state: "Lara", city: "Barquisimeto", zone: "Centro", price: 25, discount: 5 }
];

// Estado de filtros
let selectedType = "Todos";
let selectedCategory = "Todas";

// Elementos del DOM
const stateSelect = document.getElementById("stateSelect");
const citySelect = document.getElementById("citySelect");
const zoneSelect = document.getElementById("zoneSelect");
const searchBtn = document.getElementById("searchBtn");
const resultsList = document.getElementById("resultsList");
const noResults = document.getElementById("noResults");
const adminBtn = document.getElementById("adminBtn");

// Cargar Estados al iniciar
function initLocationDropdowns() {
  Object.keys(venezuelaData).sort().forEach(state => {
    const opt = document.createElement("option");
    opt.value = state;
    opt.textContent = state;
    stateSelect.appendChild(opt);
  });
}

// Cambio de Estado -> Cargar Ciudades
stateSelect.addEventListener("change", () => {
  citySelect.innerHTML = '<option value="">Todas las Ciudades</option>';
  zoneSelect.innerHTML = '<option value="">Todas las Zonas</option>';
  citySelect.disabled = true;
  zoneSelect.disabled = true;

  const state = stateSelect.value;
  if (state && venezuelaData[state]) {
    citySelect.disabled = false;
    Object.keys(venezuelaData[state]).forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      citySelect.appendChild(opt);
    });
  }
});

// Cambio de Ciudad -> Cargar Zonas
citySelect.addEventListener("change", () => {
  zoneSelect.innerHTML = '<option value="">Todas las Zonas</option>';
  zoneSelect.disabled = true;

  const state = stateSelect.value;
  const city = citySelect.value;

  if (state && city && venezuelaData[state][city]) {
    zoneSelect.disabled = false;
    venezuelaData[state][city].forEach(zone => {
      const opt = document.createElement("option");
      opt.value = zone;
      opt.textContent = zone;
      zoneSelect.appendChild(opt);
    });
  }
});

// Selección de Botones (Grupo Tipo y Categoría con Resaltado Azul)
function setupGroupButtons(groupId, callback) {
  const container = document.getElementById(groupId);
  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      callback(btn.getAttribute("data-value"));
    });
  });
}

setupGroupButtons("typeGroup", val => selectedType = val);
setupGroupButtons("categoryGroup", val => selectedCategory = val);

// Clave Administrador
adminBtn.addEventListener("click", () => {
  const password = prompt("Ingresa la clave de Administrador:");
  if (password === "1234" || password === "admin") {
    alert("¡Bienvenido al Panel de Administración!");
  } else if (password !== null) {
    alert("Clave incorrecta. Acceso denegado.");
  }
});

// Búsqueda y Renderizado
searchBtn.addEventListener("click", () => {
  const stateVal = stateSelect.value;
  const cityVal = citySelect.value;
  const zoneVal = zoneSelect.value;

  const filtered = hotelsData.filter(item => {
    const matchType = (selectedType === "Todos" || item.type === selectedType);
    const matchCat = (selectedCategory === "Todas" || item.category === selectedCategory);
    const matchState = (!stateVal || item.state === stateVal);
    const matchCity = (!cityVal || item.city === cityVal);
    const matchZone = (!zoneVal || item.zone === zoneVal);
    return matchType && matchCat && matchState && matchCity && matchZone;
  });

  renderHotels(filtered);
});

function renderHotels(list) {
  resultsList.innerHTML = "";
  if (list.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
    list.forEach(hotel => {
      const finalPrice = hotel.price - (hotel.price * (hotel.discount / 100));
      const card = document.createElement("div");
      card.className = "hotel-card";
      card.innerHTML = `
        <h3>${hotel.name}</h3>
        <span class="badge">${hotel.type} • ${hotel.category}</span>
        <p>📍 ${hotel.zone}, ${hotel.city}, Edo. ${hotel.state}</p>
        <p>💵 Precio: <strong>$${finalPrice.toFixed(2)}</strong> <small>(Desc. ${hotel.discount}%)</small></p>
        <button class="book-btn" onclick="openBookingModal(${hotel.id})">Reservar Ahora</button>
      `;
      resultsList.appendChild(card);
    });
  }
}

// Modal y Proceso de Pago
const modal = document.getElementById("bookingModal");
const closeModal = document.getElementById("closeModal");
let currentHotel = null;

function openBookingModal(hotelId) {
  currentHotel = hotelsData.find(h => h.id === hotelId);
  if (!currentHotel) return;

  const finalPrice = currentHotel.price - (currentHotel.price * (currentHotel.discount / 100));

  document.getElementById("modalHotelTitle").textContent = currentHotel.name;
  document.getElementById("modalHotelDetails").textContent = `Ubicación: ${currentHotel.city}, Edo. ${currentHotel.state}`;
  document.getElementById("modalOriginalPrice").textContent = `$${currentHotel.price.toFixed(2)}`;
  document.getElementById("modalDiscount").textContent = `${currentHotel.discount}%`;
  document.getElementById("modalFinalPrice").textContent = `$${finalPrice.toFixed(2)}`;

  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => modal.classList.add("hidden"));

document.getElementById("copyPagoBtn").addEventListener("click", () => {
  const datos = "Banco: Banesco (0134)\nCI: J-501234567\nTel: 0412-1234567";
  navigator.clipboard.writeText(datos);
  alert("¡Datos de Pago Móvil copiados al portapapeles!");
});

document.getElementById("confirmBookingBtn").addEventListener("click", () => {
  const name = document.getElementById("guestName").value;
  const ref = document.getElementById("refNumber").value;

  if (!name || !ref) {
    alert("Por favor completa tu nombre y el número de referencia del pago.");
    return;
  }

  alert(`¡Reserva Confirmada Exitosamente!\n\nCliente: ${name}\nReferencia: ${ref}\nHotel: ${currentHotel.name}\n\nNos pondremos en contacto contigo.`);
  modal.classList.add("hidden");
});

// Inicializar la app
initLocationDropdowns();
              
