// ==========================================
// 1. BASE DE DATOS DE LOS 23 ESTADOS DE VENEZUELA Y D.C.
// ==========================================
const locationsData = {
  "Amazonas": { "Puerto Ayacucho": ["Centro", "Av. Orinoco", "Av. 23 de Enero"] },
  "Anzoátegui": {
    "Lechería": ["Av. Principal", "El Morro", "Cerro El Morro"],
    "Puerto La Cruz": ["Paseo Colón", "Centro", "Av. Municipal"],
    "Barcelona": ["Centro", "Nueva Barcelona"],
    "El Tigre": ["Centro", "Av. España"]
  },
  "Apure": { "San Fernando de Apure": ["Centro", "Paseo Libertador", "Biruaca"] },
  "Aragua": {
    "Maracay": ["Las Delicias", "El Castaño", "Base Aragua", "La Soledad", "Centro", "San Jacinto"],
    "Cagua": ["Centro", "Corinsa"],
    "Turmero": ["Centro", "Intercomunal"]
  },
  "Barinas": { "Barinas": ["Alto Barinas", "Centro", "Av. Cuatricentenaria"] },
  "Bolívar": {
    "Puerto Ordaz": ["Alta Vista", "Unare", "Chilemex"],
    "Ciudad Bolívar": ["Paseo Orinoco", "Casco Histórico"]
  },
  "Carabobo": {
    "Valencia": ["Viñedo", "Prebo", "El Trigal", "Naguanagua", "Mañongo", "Zona Industrial", "Centro"],
    "Puerto Cabello": ["Casco Histórico", "Quizandal", "Patanemo"],
    "Guacara": ["Centro", "Ciudad Alianza"]
  },
  "Cojedes": {
    "Tinaquillo": ["Centro", "Av. Miranda", "Zona Industrial", "Buenos Aires", "San Josecito"],
    "San Carlos": ["Centro Histórico", "Av. Bolívar", "San Rafael"]
  },
  "Delta Amacuro": { "Tucupita": ["Centro", "Av. Manamo"] },
  "Distrito Capital": {
    "Caracas": ["Altamira", "Las Mercedes", "La Castellana", "Chacao", "Sabana Grande", "El Recreo", "Plaza Venezuela", "Capitolio"]
  },
  "Falcón": {
    "Punto Fijo": ["Centro", "Zona Libre", "Judibana"],
    "Coro": ["Casco Colonial", "Av. Independencia"],
    "Chichiriviche": ["Centro", "Playa Sur", "Zona de Embarcaderos"]
  },
  "Guárico": { "San Juan de los Morros": ["Centro", "Aguas Termales"], "Calabozo": ["Centro Histórico"] },
  "Lara": {
    "Barquisimeto": ["Este / Nueva Segovia", "Centro", "Cabudare"],
    "Carora": ["Centro Histórico"]
  },
  "Mérida": { "Mérida": ["Centro", "Av. Las Américas", "La Hechicera", "Chorros de Milla"] },
  "Miranda": {
    "Los Teques": ["Centro", "San Antonio de los Altos", "Carrizal"],
    "Guarenas / Guatire": ["Nueva Casarapa", "Castillejo"],
    "Higuerote": ["Centro", "Puerto Francés", "Carenero"]
  },
  "Monagas": { "Maturín": ["Tipuro", "Juanico", "Centro"] },
  "Nueva Esparta": { "Porlamar / Pampatar": ["Pampatar", "Costa Azul", "Av. 4 de Mayo", "Playa el Agua"] },
  "Portuguesa": { "Acarigua / Araure": ["Centro Acarigua", "Centro Araure", "Llano Mall"], "Guanare": ["Centro"] },
  "Sucre": { "Cumaná": ["Centro", "San Luis"], "Carúpano": ["Centro"] },
  "Táchira": { "San Cristóbal": ["Barrio Obrero", "Pueblo Nuevo", "Centro"], "San Antonio del Táchira": ["Centro"] },
  "Trujillo": { "Valera": ["Centro", "Las Acacias", "La Puerta"], "Trujillo": ["Casco Central"] },
  "La Guaira": { "Catia La Mar / Maiquetía": ["Zona Aeropuerto", "Caraballeda", "Catia La Mar"] },
  "Yaracuy": { "San Felipe": ["Centro", "Av. Yaracuy", "Independencia"], "Yaritagua": ["Centro"] },
  "Zulia": { "Maracaibo": ["Bella Vista", "5 de Julio", "El Milagro", "Santa Lucía"], "Cabimas": ["Centro"] }
};

const ADMIN_KEY = "Peterparker3";

let inventarioHoteles = JSON.parse(localStorage.getItem('findbed_hoteles')) || [
  {
    id: 101,
    nombre: "Hotel Carmesí Royal",
    categoria: "Hotel",
    estado: "Distrito Capital",
    ciudad: "Caracas",
    zona: "Altamira",
    moneda: "USD",
    precioOficial: 120,
    descuento: 15,
    anticipo: 25,
    habs: 4,
    nivel: "Alta Gama",
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
    nivel: "Económica",
    foto: "hotel1_habitacion.jpg"
  }
];

let hotelSeleccionado = inventarioHoteles[0];
let timerInterval = null;

// ==========================================
// 2. CONEXIÓN DE EVENTOS AL CARGAR LA PÁGINA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  
  // A. Llenar los desplegables de Ubicación manteniendo tus estilos[span_3](start_span)[span_3](end_span)[span_4](start_span)[span_4](end_span)
  const selectEstado = document.getElementById("select-estado");
  const selectCiudad = document.getElementById("select-ciudad");
  const selectZona = document.getElementById("select-zona");

  if (selectEstado) {
    selectEstado.innerHTML = '<option value="">Todos los Estados</option>';
    Object.keys(locationsData).sort().forEach(estado => {
      const option = document.createElement("option");
      option.value = estado;
      option.textContent = estado;
      selectEstado.appendChild(option);
    });

    selectEstado.addEventListener("change", (e) => {
      const estSel = e.target.value;
      if (selectCiudad) selectCiudad.innerHTML = '<option value="">Todas las Ciudades</option>';
      if (selectZona) {
        selectZona.innerHTML = '<option value="">Todas las Zonas</option>';
        selectZona.disabled = true;
      }

      if (estSel && locationsData[estSel] && selectCiudad) {
        selectCiudad.disabled = false;
        Object.keys(locationsData[estSel]).sort().forEach(ciudad => {
          const option = document.createElement("option");
          option.value = ciudad;
          option.textContent = ciudad;
          selectCiudad.appendChild(option);
        });
      } else if (selectCiudad) {
        selectCiudad.disabled = true;
      }
      filtrarHospedajes();
    });

    if (selectCiudad) {
      selectCiudad.addEventListener("change", (e) => {
        const estSel = selectEstado.value;
        const cdSel = e.target.value;
        if (selectZona) selectZona.innerHTML = '<option value="">Todas las Zonas</option>';

        if (estSel && cdSel && locationsData[estSel][cdSel] && selectZona) {
          selectZona.disabled = false;
          locationsData[estSel][cdSel].forEach(zona => {
            const option = document.createElement("option");
            option.value = zona;
            option.textContent = zona;
            selectZona.appendChild(option);
          });
        } else if (selectZona) {
          selectZona.disabled = true;
        }
        filtrarHospedajes();
      });
    }

    if (selectZona) selectZona.addEventListener("change", filtrarHospedajes);
  }

  // B. Hacer que el icono del candado responda[span_5](start_span)[span_5](end_span)
  const candadoEl = document.querySelector(".btn-candado") || document.querySelector("[onclick*='abrirAdmin']") || document.querySelector("header button");
  if (candadoEl) {
    candadoEl.onclick = (e) => {
      e.preventDefault();
      abrirAdminPrompt();
    };
  }

  // C. Vincular todos los botones "Reservar Ahora 🏨[span_6](start_span)[span_7](start_span)"[span_6](end_span)[span_7](end_span)
  asignarEventosReserva();
});

// ==========================================
// 3. FUNCIONES DE NAVEGACIÓN Y ACCIONES
// ==========================================

function abrirAdminPrompt() {
  const pass = prompt("🔑 Ingrese la clave de administrador:");
  if (pass === ADMIN_KEY) {
    const secAdmin = document.getElementById("seccion-admin");
    if (secAdmin) {
      secAdmin.style.display = "block";
      window.scrollTo({ top: secAdmin.offsetTop, behavior: 'smooth' });
    } else {
      alert("✅ Clave de administrador correcta.");
    }
  } else if (pass !== null) {
    alert("❌ Clave de administrador incorrecta.");
  }
}

function irAlPaso(numeroPaso) {
  const pasos = [
    "seccion-busqueda", "paso-1-filtros", "paso-2-catalogo", 
    "paso-3-detalle", "paso-4-habitacion", "paso-5-desglose", 
    "paso-6-pago", "paso-7-recibo", "seccion-pago"
  ];

  pasos.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  if (numeroPaso === 1 || numeroPaso === 2) {
    if (document.getElementById("seccion-busqueda")) document.getElementById("seccion-busqueda").style.display = "block";
  } else if (numeroPaso === 3) {
    if (document.getElementById("paso-3-detalle")) document.getElementById("paso-3-detalle").style.display = "block";
  } else if (numeroPaso === 4) {
    if (document.getElementById("paso-4-habitacion")) document.getElementById("paso-4-habitacion").style.display = "block";
  } else if (numeroPaso === 5) {
    if (document.getElementById("paso-5-desglose")) document.getElementById("paso-5-desglose").style.display = "block";
  } else if (numeroPaso === 6) {
    if (document.getElementById("paso-6-pago")) document.getElementById("paso-6-pago").style.display = "block";
    iniciarTemporizador(15 * 60);
  } else if (numeroPaso === 7) {
    if (document.getElementById("paso-7-recibo")) document.getElementById("paso-7-recibo").style.display = "block";
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function asignarEventosReserva() {
  // Captura cualquier botón "Reservar Ahora" en tus tarjetas originales[span_8](start_span)[span_8](end_span)[span_9](start_span)[span_9](end_span)
  const botonesReserva = document.querySelectorAll("button");
  botonesReserva.forEach(btn => {
    if (btn.textContent.includes("Reservar Ahora") || btn.textContent.includes("Buscar Disponibilidad")) {
      btn.onclick = (e) => {
        e.preventDefault();
        irAlPaso(3);
      };
    }
  });
}

function filtrarHospedajes() {
  // Permite filtrar si hay selector de estados[span_10](start_span)[span_10](end_span)[span_11](start_span)[span_11](end_span)
  asignarEventosReserva();
}

function iniciarTemporizador(duracion) {
  let timer = duracion;
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    let min = parseInt(timer / 60, 10);
    let seg = parseInt(timer % 60, 10);
    min = min < 10 ? "0" + min : min;
    seg = seg < 10 ? "0" + seg : seg;

    const el = document.getElementById("temporizador");
    if (el) el.textContent = min + ":" + seg;

    if (--timer < 0) {
      clearInterval(timerInterval);
      alert("⏱️ El tiempo expiro.");
      irAlPaso(1);
    }
  }, 1000);
}
