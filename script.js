// ==========================================
// 1. BASE DE DATOS DE LOS 23 ESTADOS Y D.C.
// ==========================================
const locationsData = {
  "Amazonas": { "Puerto Ayacucho": ["Centro", "Av. Orinoco"] },
  "Anzoátegui": { "Lechería": ["El Morro", "Av. Principal"], "Puerto La Cruz": ["Paseo Colón"] },
  "Apure": { "San Fernando": ["Centro", "Paseo Libertador"] },
  "Aragua": { "Maracay": ["Las Delicias", "Base Aragua", "El Castaño"] },
  "Barinas": { "Barinas": ["Alto Barinas", "Centro"] },
  "Bolívar": { "Puerto Ordaz": ["Alta Vista", "Chilemex"], "Ciudad Bolívar": ["Casco Histórico"] },
  "Carabobo": { "Valencia": ["Viñedo", "Prebo", "El Trigal", "Naguanagua", "Mañongo"], "Puerto Cabello": ["Quizandal", "Casco Histórico"] },
  "Cojedes": { "Tinaquillo": ["Centro", "Av. Miranda", "Buenos Aires"], "San Carlos": ["Centro Histórico", "Av. Bolívar"] },
  "Delta Amacuro": { "Tucupita": ["Centro"] },
  "Distrito Capital": { "Caracas": ["Altamira", "Las Mercedes", "Chacao", "La Castellana", "Sabana Grande"] },
  "Falcón": { "Punto Fijo": ["Zona Libre", "Judibana"], "Chichiriviche": ["Zona Embarcadero"] },
  "Guárico": { "San Juan de los Morros": ["Centro", "Aguas Termales"] },
  "Lara": { "Barquisimeto": ["Este / Nueva Segovia", "Centro", "Cabudare"] },
  "Mérida": { "Mérida": ["Centro", "Av. Las Américas", "Chorros de Milla"] },
  "Miranda": { "Los Teques": ["San Antonio"], "Higuerote": ["Carenero", "Puerto Francés"] },
  "Monagas": { "Maturín": ["Tipuro", "Juanico"] },
  "Nueva Esparta": { "Porlamar / Pampatar": ["Pampatar", "Costa Azul", "Playa el Agua"] },
  "Portuguesa": { "Acarigua": ["Centro", "Llano Mall"], "Guanare": ["Centro"] },
  "Sucre": { "Cumaná": ["San Luis", "Centro"] },
  "Táchira": { "San Cristóbal": ["Barrio Obrero", "Pueblo Nuevo"] },
  "Trujillo": { "Valera": ["La Puerta", "Centro"] },
  "La Guaira": { "Catia La Mar": ["Aeropuerto", "Caraballeda"] },
  "Yaracuy": { "San Felipe": ["Centro", "Independencia"] },
  "Zulia": { "Maracaibo": ["Bella Vista", "5 de Julio", "El Milagro"] }
};

const ADMIN_KEY = "Peterparker3";

let inventarioHoteles = JSON.parse(localStorage.getItem('findbed_hoteles')) || [
  {
    id: 101,
    nombre: "Hotel Carmesí Royal VIP",
    categoria: "Hotel",
    estado: "Carabobo",
    ciudad: "Valencia",
    zona: "Viñedo",
    moneda: "EUR",
    precioOficial: 120,
    descuento: 15,
    anticipo: 25,
    habs: 5,
    foto: "hotel1_piscina.jpg"
  },
  {
    id: 102,
    nombre: "Posada Express Carmesí",
    categoria: "Hotel",
    estado: "Cojedes",
    ciudad: "Tinaquillo",
    zona: "Centro",
    moneda: "USD",
    precioOficial: 25,
    descuento: 0,
    anticipo: 4,
    habs: 8,
    foto: "hotel1_habitacion.jpg"
  }
];

let hotelSeleccionado = inventarioHoteles[0];
let timerInterval = null;

// ==========================================
// 2. NAVEGACIÓN ENTRE LOS 7 PASOS
// ==========================================
function irAlPaso(paso) {
  const pasos = [
    "seccion-busqueda", "paso-3-detalle", "paso-4-habitacion", 
    "paso-5-desglose", "paso-6-pago", "paso-7-recibo"
  ];
  
  pasos.forEach(p => {
    const el = document.getElementById(p);
    if(el) el.style.display = "none";
  });

  if (paso === 1 || paso === 2) {
    document.getElementById("seccion-busqueda").style.display = "block";
  } else if (paso === 3) {
    document.getElementById("paso-3-detalle").style.display = "block";
  } else if (paso === 4) {
    document.getElementById("paso-4-habitacion").style.display = "block";
  } else if (paso === 5) {
    actualizarDesglose();
    document.getElementById("paso-5-desglose").style.display = "block";
  } else if (paso === 6) {
    document.getElementById("paso-6-pago").style.display = "block";
    iniciarTemporizador(15 * 60);
  } else if (paso === 7) {
    document.getElementById("paso-7-recibo").style.display = "block";
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 3. DESPLEGABLES EN CASCADA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const selectEstado = document.getElementById("select-estado");
  const selectCiudad = document.getElementById("select-ciudad");
  const selectZona = document.getElementById("select-zona");

  if (selectEstado) {
    selectEstado.innerHTML = '<option value="">Todos los Estados</option>';
    Object.keys(locationsData).sort().forEach(est => {
      const opt = document.createElement("option");
      opt.value = est;
      opt.textContent = est;
      selectEstado.appendChild(opt);
    });

    selectEstado.addEventListener("change", (e) => {
      const estSel = e.target.value;
      selectCiudad.innerHTML = '<option value="">Todas las Ciudades</option>';
      selectZona.innerHTML = '<option value="">Todas las Zonas</option>';
      selectZona.disabled = true;

      if (estSel && locationsData[estSel]) {
        selectCiudad.disabled = false;
        Object.keys(locationsData[estSel]).sort().forEach(cd => {
          const opt = document.createElement("option");
          opt.value = cd;
          opt.textContent = cd;
          selectCiudad.appendChild(opt);
        });
      } else {
        selectCiudad.disabled = true;
      }
      filtrarHospedajes();
    });

    selectCiudad.addEventListener("change", (e) => {
      const estSel = selectEstado.value;
      const cdSel = e.target.value;
      selectZona.innerHTML = '<option value="">Todas las Zonas</option>';

      if (estSel && cdSel && locationsData[estSel][cdSel]) {
        selectZona.disabled = false;
        locationsData[estSel][cdSel].forEach(zn => {
          const opt = document.createElement("option");
          opt.value = zn;
          opt.textContent = zn;
          selectZona.appendChild(opt);
        });
      } else {
        selectZona.disabled = true;
      }
      filtrarHospedajes();
    });

    selectZona.addEventListener("change", filtrarHospedajes);
  }

  filtrarHospedajes();

  // Procesar Formulario de Pago
  document.getElementById("form-pago-movil").addEventListener("submit", (e) => {
    e.preventDefault();
    const sim = hotelSeleccionado.moneda === 'EUR' ? '€' : '$';
    const codigo = "CARMESI-" + Math.floor(100000 + Math.random() * 900000);
    const cliente = document.getElementById("pago-nombre").value;

    document.getElementById("reporte-codigo").textContent = codigo;
    document.getElementById("reporte-cliente").textContent = cliente;
    document.getElementById("reporte-hotel").textContent = hotelSeleccionado.nombre;
    document.getElementById("reporte-monto-restante").textContent = `${sim}${hotelSeleccionado.precioOficial - hotelSeleccionado.descuento - hotelSeleccionado.anticipo}`;

    if (timerInterval) clearInterval(timerInterval);
    irAlPaso(7);
  });
});

// ==========================================
// 4. RENDERIZAR TARJETAS Y DETALLES
// ==========================================
function filtrarHospedajes() {
  const estVal = document.getElementById("select-estado").value;
  const cdVal = document.getElementById("select-ciudad").value;
  const znVal = document.getElementById("select-zona").value;
  const contenedor = document.getElementById("lista-hoteles-cards");

  const filtrados = inventarioHoteles.filter(h => {
    const coincideEstado = !estVal || h.estado.toLowerCase() === estVal.toLowerCase();
    const coincideCiudad = !cdVal || h.ciudad.toLowerCase() === cdVal.toLowerCase();
    const coincideZona = !znVal || h.zona.toLowerCase() === znVal.toLowerCase();
    return coincideEstado && coincideCiudad && coincideZona;
  });

  if (filtrados.length === 0) {
    contenedor.innerHTML = `<p style="color: #aaa; text-align: center;">⚠️ No hay hospedajes en esta zona.</p>`;
    return;
  }

  contenedor.innerHTML = filtrados.map(h => {
    const sim = h.moneda === 'EUR' ? '€' : '$';
    return `
      <div style="background: #250012; padding: 12px; border-radius: 8px; margin-bottom: 12px; border: 1px solid #800020;">
        <img src="${h.foto}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 6px;" onerror="this.src='https://via.placeholder.com/300x150?text=Hotel'">
        <h4 style="color: white; margin: 8px 0 2px 0;">${h.nombre}</h4>
        <p style="color: #aaa; font-size: 12px; margin: 0 0 8px 0;">📍 ${h.ciudad}, ${h.estado} (${h.zona})</p>
        <p style="color: #00ff88; font-weight: bold; margin: 0 0 8px 0;">Oferta: ${sim}${h.precioOficial - h.descuento} / noche</p>
        <button type="button" onclick="verDetalle(${h.id})" style="width: 100%; padding: 8px; background: #800020; border: none; color: white; border-radius: 4px; font-weight: bold; cursor: pointer;">Ver Detalles 🔍</button>
      </div>
    `;
  }).join('');
}

function verDetalle(id) {
  hotelSeleccionado = inventarioHoteles.find(h => h.id === id);
  document.getElementById("det-nombre").textContent = hotelSeleccionado.nombre;
  document.getElementById("det-direccion").textContent = `${hotelSeleccionado.ciudad}, ${hotelSeleccionado.estado} (${hotelSeleccionado.zona})`;
  document.getElementById("det-imagen").src = hotelSeleccionado.foto;
  irAlPaso(3);
}

function actualizarDesglose() {
  const sim = hotelSeleccionado.moneda === 'EUR' ? '€' : '$';
  document.getElementById("monto-recepcion").textContent = `${sim}${hotelSeleccionado.precioOficial}`;
  document.getElementById("monto-descuento").textContent = `-${sim}${hotelSeleccionado.descuento}`;
  document.getElementById("monto-total").textContent = `${sim}${hotelSeleccionado.precioOficial - hotelSeleccionado.descuento}`;
  document.getElementById("monto-abono").textContent = `${sim}${hotelSeleccionado.anticipo}`;
  
  document.getElementById("pago-hotel-nombre").textContent = hotelSeleccionado.nombre;
  document.getElementById("pago-monto-anticipo").textContent = `${sim}${hotelSeleccionado.anticipo} (al cambio BCV)`;
}

// ==========================================
// 5. TEMPORIZADOR Y CANDADO ADMIN 🔒
// ==========================================
function iniciarTemporizador(duracion) {
  let timer = duracion;
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    let min = parseInt(timer / 60, 10);
    let seg = parseInt(timer % 60, 10);
    min = min < 10 ? "0" + min : min;
    seg = seg < 10 ? "0" + seg : seg;

    document.getElementById("temporizador").textContent = min + ":" + seg;

    if (--timer < 0) {
      clearInterval(timerInterval);
      alert("⏱️ El tiempo expiro.");
      irAlPaso(1);
    }
  }, 1000);
}

function abrirAdminPrompt() {
  const pass = prompt("🔑 Clave de Administrador:");
  if (pass === ADMIN_KEY) {
    document.getElementById("seccion-admin").style.display = "block";
    window.scrollTo({ top: document.getElementById("seccion-admin").offsetTop, behavior: 'smooth' });
  } else if (pass !== null) {
    alert("❌ Clave incorrecta.");
  }
}

function cerrarAdmin() {
  document.getElementById("seccion-admin").style.display = "none";
             }
                
