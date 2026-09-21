//
==========================================
// 1. VARIABLES GLOBALES Y DATOS DE UBICACIÓN
// ==========================================
let categoriaSeleccionada = "Hotel";

const locationsData = {
  "Cojedes": {
    "San Carlos": ["Centro Histórico", "Av. Bolívar", "Av. Universidad", "Zona Industrial", "San Rafael"],
    "Tinaquillo": ["Centro", "Av. Miranda", "Zona Industrial", "Entrada / Troncal 005", "San Josecito", "Buenos Aires"],
    "El Baúl": ["Centro", "Sector El Rivero", "Salida a Portuguesa"]
  },
  "Carabobo": {
    "Valencia": ["El Trigal", "Prebo", "Naguanagua", "Mañongo", "Viñedo", "Centro", "Zona Industrial", "Av. Cedeño"],
    "Puerto Cabello": ["Casco Histórico", "Zona Playera (Quizandal/Patanemo)", "Cuesta Blanca", "Urbanización Rancho Grande"],
    "Guacara": ["Centro", "Ciudad Alianza", "Carretera Nacional"]
  },
  "Aragua": {
    "Maracay": ["Las Delicias", "El Castaño", "Centro", "Base Aragua", "La Soledad", "La Victoria", "San Jacinto"],
    "Cagua": ["Centro", "Zona Industrial", "Corinsa"],
    "Turmero": ["Centro", "San Mateo", "Intercomunal Maracay-Turmero"]
  },
  "Distrito Capital": {
    "Caracas": ["Las Mercedes", "Altamira", "La Castellana", "El Recreo", "Centro / Capitolio", "Plaza Venezuela", "Sabana Grande"]
  },
  "Miranda": {
    "Los Teques": ["Centro", "San Antonio de los Altos", "Carretera Panamericana", "Carrizal"],
    "Guarenas / Guatire": ["Nueva Casarapa", "Zona Industrial Cloris", "Castillejo", "El Ingenio"],
    "Higuerote (Barlovento)": ["Centro", "Puerto Francés", "Chirimena", "Carenero"]
  },
  "La Guaira": {
    "La Guaira / Catia La Mar": ["Zona Aeropuerto (Maiquetía)", "Catia La Mar", "Caraballeda", "Tanaguarena", "Macuto", "Naiguatá"]
  },
  "Lara": {
    "Barquisimeto": ["Este (Nueva Segovia / El Uro)", "Centro", "Cabudare", "Zona Industrial", "Oeste (Av. Florencio Jiménez)"],
    "Carora": ["Centro Histórico", "Av. Francisco de Miranda", "Salida a Zulia"]
  },
  "Falcón": {
    "Coro": ["Casco Colonial", "Av. Independencia", "Salida a Paraguaná", "Los Taques"],
    "Punto Fijo": ["Centro", "Zona Libre", "Las Virtudes", "Judibana", "Villa Marina"],
    "Chichiriviche": ["Centro", "Playa Sur", "Zona de Embarcaderos (Cayos)"]
  },
  "Yaracuy": {
    "San Felipe": ["Centro", "Av. Yaracuy", "Zona Industrial", "Municipio Independencia"],
    "Yaritagua": ["Centro", "Salida a Barquisimeto", "Sector San Rafael"]
  },
  "Mérida": {
    "Mérida": ["Centro / Plaza Bolívar", "Av. Las Américas", "La Hechicera", "Chorros de Milla", "Los Curos"],
    "El Vigía": ["Centro", "Av. Bolívar", "Zona Aeropuerto"]
  },
  "Táchira": {
    "San Cristóbal": ["Barrio Obrero", "Pueblo Nuevo", "Centro", "Las Lomas", "Av. 19 de Abril"],
    "San Antonio del Táchira": ["Centro", "Zona Fronteriza / Puente Internacional", "Av. Venezuela"]
  },
  "Trujillo": {
    "Valera": ["Centro", "Las Acacias", "La Puerta", "Av. Bolívar"],
    "Trujillo": ["Casco Central", "Sector Monumento a la Paz"]
  },
  "Zulia": {
    "Maracaibo": ["Bella Vista", "5 de Julio", "El Milagro", "Santa Lucía", "Centro", "Zona Aeropuerto (La Chinita)"],
    "San Francisco": ["La Coromoto", "Av. 40", "Zona Industrial"],
    "Cabimas": ["Centro", "Av. Intercomunal", "Carretera H"]
  },
  "Portuguesa": {
    "Acarigua / Araure": ["Centro Acarigua", "Centro Araure", "Av. Páez", "Llano Mall", "Zona Industrial"],
    "Guanare": ["Centro", "Av. Unda", "Sector Basílica / Santuario"]
  },
  "Barinas": {
    "Barinas": ["Alto Barinas", "Centro", "Av. Cuatricentenaria", "Av. 23 de Enero"]
  },
  "Guárico": {
    "San Juan de los Morros": ["Centro", "Av. Los Puertorriqueños", "Zona Aguas Termales"],
    "Calabozo": ["Centro Histórico", "Carrera 12", "Zona Represa"]
  },
  "Apure": {
    "San Fernando de Apure": ["Centro", "Paseo Libertador", "Biruaca", "Av. Intercomunal"]
  },
  "Anzoátegui": {
    "Puerto La Cruz / Lechería": ["Lechería (Av. Principal / El Morro)", "Puerto La Cruz (Paseo Colón)", "Barcelona (Centro)", "Guanta"],
    "El Tigre": ["Centro", "Av. España", "Av. Francisco de Miranda"]
  },
  "Monagas": {
    "Maturín": ["Centro", "Tipuro", "Juanico", "Av. Alirio Ugarte Pelayo", "Zona Aeropuerto"]
  },
  "Sucre": {
    "Cumaná": ["Centro", "Av. Perimetral", "San Luis (Zona Playera)", "Los Chaimas"],
    "Carúpano": ["Centro", "Av. Rómulo Gallegos", "Sector Tío Pedro"]
  },
  "Nueva Esparta": {
    "Porlamar / Pampatar": ["Pampatar", "Bella Vista", "Av. 4 de Mayo", "Av. Santiago Mariño", "Costa Azul", "Playa el Agua"]
  },
  "Bolívar": {
    "Ciudad Guayana (Puerto Ordaz / San Félix)": ["Alta Vista (Puerto Ordaz)", "Unare", "Chilemex", "Centro San Félix"],
    "Ciudad Bolívar": ["Paseo Orinoco / Casco Histórico", "Av. Upata", "Av. Jesús Soto"]
  },
  "Amazonas": {
    "Puerto Ayacucho": ["Centro", "Av. Orinoco", "Av. 23 de Enero"]
  },
  "Delta Amacuro": {
    "Tucupita": ["Centro", "Av. Manamo", "Sector San Rafael"]
  }
};

// ANUNCIO PUBLICITARIO
const ANUNCIO_BANNER = {
  titulo: "Pink Weather - Diseños Exclusivos",
  imagen: "Anuncio-PinkWhatever.jpg",
  enlace: "#"
};

// INVENTARIO INICIAL CON EL HOTEL DE LUJO EN VALENCIA
let inventarioHoteles = JSON.parse(localStorage.getItem('findbed_hoteles')) || [
  {
    id: 101,
    nombre: "Hotel de Lujo Carmesí Royal",
    categoria: "Hotel",
    estado: "Carabobo",
    ciudad: "Valencia",
    zona: "Viñedo",
    moneda: "EUR",
    precioRecepcion: 120,
    descuento: 15,
    abono: 25,
    foto: "hotel1_piscina.jpg",
    imagenesExtra: [
      "hotel1_piscina.jpg",
      "hotel1_habitacion.jpg",
      "hotel1_bano.jpg",
      "hotel1_restaurante.jpg"
    ],
    descripcion: "Alojamiento VIP de 5 estrellas. Incluye piscina climatizada, restaurante gourmet, suites ejecutivas con baño de lujo y servicio a la habitación 24/7."
  }
];

let hotelSeleccionado = null;

// Configuración de Telegram
const TELEGRAM_BOT_TOKEN = "INGRESA_AQUI_TU_TOKEN"; 
const TELEGRAM_CHAT_ID = "INGRESA_AQUI_TU_CHAT_ID";   

// ==========================================
// 2. ENVÍO A TELEGRAM
// ==========================================
async function enviarNotificacionTelegram(reserva) {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "INGRESA_AQUI_TU_TOKEN") {
    console.warn("Telegram: Configura tu Token y Chat ID.");
    return;
  }

  const sim = reserva.moneda === 'EUR' ? '€' : '$';

  const mensaje = `
📥 *¡NUEVA RESERVA CONFIRMADA!*

👤 *DATOS DEL CLIENTE:*
• *Nombre:* ${reserva.titular}
• *Cédula:* ${reserva.cedula}

🏨 *DETALLES DEL HOSPEDAJE:*
• *Hotel:* ${reserva.hotel}
• *Categoría:* ${reserva.tipoCategoria}
• *Habitación:* ${reserva.habitacion}
• *Estado:* ${reserva.estado}
• *Ciudad:* ${reserva.ciudad}
• *Zona / Sector:* ${reserva.zona}

💰 *DESGLOSE FINANCIERO:*
• *Moneda de Cobro:* ${reserva.moneda}
• *Precio Recepción:* ${sim}${reserva.precioRecepcion}
• *Descuento App:* -${sim}${reserva.descuento}
• *Monto Abono (Pago Móvil):* ${sim}${reserva.abono}

🔢 *DATOS DE VERIFICACIÓN:*
• *Código Único:* \`${reserva.codigo}\`
• *N° Referencia Pago Móvil:* \`${reserva.referencia}\`
  `;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: mensaje,
        parse_mode: "Markdown"
      })
    });
  } catch (error) {
    console.error("Error enviando a Telegram:", error);
  }
}

// ==========================================
// 3. CONTROLADOR DE PASOS Y EVENTOS
// ==========================================
function irAlPaso(paso) {
  const pasos = [
    "paso-1-filtros",
    "paso-2-catalogo",
    "paso-3-detalle",
    "paso-4-habitacion",
    "paso-5-desglose",
    "paso-6-pago",
    "paso-7-recibo",
    "paso-admin-login",
    "paso-admin-panel"
  ];

  pasos.forEach((id, index) => {
    const elem = document.getElementById(id);
    if (elem) {
      if (typeof paso === 'number') {
        elem.style.display = (index + 1 === paso) ? "block" : "none";
      } else if (paso === 'admin-login') {
        elem.style.display = (id === 'paso-admin-login') ? "block" : "none";
      } else if (paso === 'admin-panel') {
        elem.style.display = (id === 'paso-admin-panel') ? "block" : "none";
      }
    }
  });
}

function verDetalleHotel(id) {
  hotelSeleccionado = inventarioHoteles.find(h => h.id === id);
  if (!hotelSeleccionado) return;

  const sim = hotelSeleccionado.moneda === 'EUR' ? '€' : '$';

  if (document.getElementById("detalle-nombre")) document.getElementById("detalle-nombre").textContent = hotelSeleccionado.nombre;
  if (document.getElementById("detalle-ubicacion")) document.getElementById("detalle-ubicacion").textContent = `📍 ${hotelSeleccionado.ciudad}, ${hotelSeleccionado.estado} - ${hotelSeleccionado.zona}`;
  if (document.getElementById("detalle-descripcion")) document.getElementById("detalle-descripcion").textContent = hotelSeleccionado.descripcion;
  if (document.getElementById("detalle-precio")) document.getElementById("detalle-precio").textContent = `Precio Recepción: ${sim}${hotelSeleccionado.precioRecepcion}`;

  // Cargar imagen principal y galería
  const imgElem = document.getElementById("detalle-foto");
  if (imgElem) {
    imgElem.src = hotelSeleccionado.foto || "hotel1_piscina.jpg";
    imgElem.style.display = "block";
  }

  // Cargar montos en el desglose
  if (document.getElementById("monto-recepcion")) document.getElementById("monto-recepcion").textContent = `${sim}${hotelSeleccionado.precioRecepcion}`;
  if (document.getElementById("monto-descuento")) document.getElementById("monto-descuento").textContent = `-${sim}${hotelSeleccionado.descuento}`;
  if (document.getElementById("monto-total")) document.getElementById("monto-total").textContent = `${sim}${hotelSeleccionado.precioRecepcion - hotelSeleccionado.descuento}`;
  if (document.getElementById("monto-abono")) document.getElementById("monto-abono").textContent = `${sim}${hotelSeleccionado.abono}`;

  irAlPaso(3);
}

document.addEventListener("DOMContentLoaded", () => {
  const selectEstado = document.getElementById("select-estado");
  const selectCiudad = document.getElementById("select-ciudad");
  const selectZona = document.getElementById("select-zona");

  // Mostrar Banner publicitario de Pink Weather si existe contenedor
  const contenedorBanner = document.getElementById("banner-publicitario");
  if (contenedorBanner) {
    contenedorBanner.innerHTML = `
      <div style="margin: 10px 0; text-align: center;">
        <p style="font-size: 12px; color: #888; margin-bottom: 3px;">Anuncio Publicitario</p>
        <img src="${ANUNCIO_BANNER.imagen}" alt="${ANUNCIO_BANNER.titulo}" style="width: 100%; max-height: 120px; object-fit: cover; border-radius: 8px;">
      </div>
    `;
  }

  // A. Llenar desplegables de ubicación
  if (selectEstado) {
    selectEstado.innerHTML = '<option value="">Selecciona un Estado</option>';
    selectCiudad.innerHTML = '<option value="">Selecciona una Ciudad</option>';
    selectZona.innerHTML = '<option value="">Selecciona una Zona</option>';

    Object.keys(locationsData).sort().forEach(estado => {
      const option = document.createElement("option");
      option.value = estado;
      option.textContent = estado;
      selectEstado.appendChild(option);
    });

    selectEstado.addEventListener("change", (e) => {
      const selectedEstado = e.target.value;
      selectCiudad.innerHTML = '<option value="">Selecciona una Ciudad</option>';
      selectZona.innerHTML = '<option value="">Selecciona una Zona</option>';
      selectZona.disabled = true;

      if (selectedEstado && locationsData[selectedEstado]) {
        selectCiudad.disabled = false;
        Object.keys(locationsData[selectedEstado]).sort().forEach(ciudad => {
          const option = document.createElement("option");
          option.value = ciudad;
          option.textContent = ciudad;
          selectCiudad.appendChild(option);
        });
      }
    });

    selectCiudad.addEventListener("change", (e) => {
      const selectedEstado = selectEstado.value;
      const selectedCiudad = e.target.value;
      selectZona.innerHTML = '<option value="">Selecciona una Zona</option>';

      if (selectedEstado && selectedCiudad && locationsData[selectedEstado][selectedCiudad]) {
        selectZona.disabled = false;
        locationsData[selectedEstado][selectedCiudad].forEach(zona => {
          const option = document.createElement("option");
          option.value = zona;
          option.textContent = zona;
          selectZona.appendChild(option);
        });
      }
    });

    selectZona.addEventListener("change", (e) => {
      const zonaSel = e.target.value;
      if (zonaSel) {
        const lista = document.getElementById("lista-hoteles-cards");
        
        // Filtrar hoteles por la selección realizada
        const encontrados = inventarioHoteles.filter(h => 
          h.estado.toLowerCase() === selectEstado.value.toLowerCase() &&
          h.ciudad.toLowerCase() === selectCiudad.value.toLowerCase() &&
          h.zona.toLowerCase() === zonaSel.toLowerCase() &&
          h.categoria === categoriaSeleccionada
        );

        if (lista) {
          if (encontrados.length === 0) {
            lista.innerHTML = `
              <div class="card-hotel">
                <p>⚠️ No hay ${categoriaSeleccionada}s registrados en esta zona aún.</p>
              </div>`;
          } else {
            lista.innerHTML = encontrados.map(h => {
              const sim = h.moneda === 'EUR' ? '€' : '$';
              return `
                <div class="card-hotel" style="margin-bottom: 15px; border: 1px solid #ddd; padding: 10px; border-radius: 8px;">
                  <img src="${h.foto}" style="width: 100%; height: 160px; object-fit: cover; border-radius: 6px;">
                  <h3 style="margin-top: 8px;">${h.nombre}</h3>
                  <p>📍 ${h.ciudad} - ${h.zona}</p>
                  <p>💰 Precio: <strong>${sim}${h.precioRecepcion}</strong></p>
                  <button class="btn-principal" onclick="verDetalleHotel(${h.id})">Ver Detalles 🔍</button>
                </div>`;
            }).join('');
          }
        }
        irAlPaso(2);
      }
    });
  }

  // B. Botones de categoría
  const botonesCategoria = document.querySelectorAll(".btn-categoria");
  botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
      botonesCategoria.forEach(b => b.classList.remove("activo"));
      e.currentTarget.classList.add("activo");
      categoriaSeleccionada = e.currentTarget.getAttribute("data-tipo") || "Hotel";
    });
  });

  // C. Formulario de Pago
  const formPago = document.getElementById("form-pago-movil");
  if (formPago) {
    formPago.addEventListener("submit", async (e) => {
      e.preventDefault();

      const selectHabitacion = document.getElementById("select-habitacion");
      const habitacionTexto = selectHabitacion ? selectHabitacion.value : "Matrimonial (2 Personas)";

      const h = hotelSeleccionado || inventarioHoteles[0];
      const sim = h.moneda === 'EUR' ? '€' : '$';

      const datosReserva = {
        titular: document.getElementById("pago-nombre")?.value || "Cliente",
        cedula: document.getElementById("pago-cedula")?.value || "N/A",
        hotel: h.nombre,
        tipoCategoria: categoriaSeleccionada,
        habitacion: habitacionTexto,
        estado: selectEstado ? selectEstado.value : h.estado,
        ciudad: selectCiudad ? selectCiudad.value : h.ciudad,
        zona: selectZona ? selectZona.value : h.zona,
        moneda: h.moneda,
        precioRecepcion: h.precioRecepcion,
        descuento: h.descuento,
        abono: h.abono,
        codigo: "CARMESI-" + Math.floor(100000 + Math.random() * 900000),
        referencia: document.getElementById("pago-referencia")?.value || "N/A"
      };

      await enviarNotificacionTelegram(datosReserva);

      if(document.getElementById("reporte-codigo")) document.getElementById("reporte-codigo").textContent = datosReserva.codigo;
      if(document.getElementById("reporte-cliente")) document.getElementById("reporte-cliente").textContent = datosReserva.titular;
      if(document.getElementById("reporte-hotel")) document.getElementById("reporte-hotel").textContent = datosReserva.hotel;
      if(document.getElementById("reporte-monto-restante")) document.getElementById("reporte-monto-restante").textContent = `${sim}${datosReserva.precioRecepcion - datosReserva.descuento - datosReserva.abono}`;

      irAlPaso(7);
    });
  }
});

// REGISTRO DEL SERVICE WORKER
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// ==========================================
// 4. MÓDULO ADMINISTRADOR (CLAVE Y GESTIÓN)
// ==========================================
const ADMIN_KEY = "Peterparker3";

function guardarInventario() {
  localStorage.setItem('findbed_hoteles', JSON.stringify(inventarioHoteles));
}

function autenticarAdmin() {
  const inputPass = document.getElementById("input-admin-pass").value;
  if (inputPass === ADMIN_KEY) {
    document.getElementById("paso-admin-login").style.display = "none";
    document.getElementById("paso-admin-panel").style.display = "block";
    renderizarListaAdmin();
  } else {
    alert("❌ Contraseña incorrecta.");
  }
}

function renderizarListaAdmin() {
  const contenedor = document.getElementById("admin-lista-hoteles");
  if (!contenedor) return;

  if (inventarioHoteles.length === 0) {
    contenedor.innerHTML = "<p>No hay hospedajes agregados aún.</p>";
    return;
  }

  contenedor.innerHTML = inventarioHoteles.map((h, index) => {
    const sim = h.moneda === 'EUR' ? '€' : '$';
    return `
      <div class="card-hotel" style="margin-bottom: 10px; border-left: 4px solid #e63946; padding: 10px; text-align: left;">
        <h4>${h.nombre} (${h.categoria})</h4>
        <p>📍 ${h.ciudad}, ${h.estado} - ${h.zona}</p>
        <p>💰 Precio: ${sim}${h.precioRecepcion} | Abono: ${sim}${h.abono}</p>
        <button onclick="borrarHotel(${index})" style="background: #e63946; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">🗑️ Borrar</button>
      </div>`;
  }).join('');
}

function borrarHotel(index) {
  if (confirm("¿Deseas borrar este alojamiento?")) {
    inventarioHoteles.splice(index, 1);
    guardarInventario();
    renderizarListaAdmin();
  }
}

// Registrar nuevos hoteles desde el admin
document.addEventListener("DOMContentLoaded", () => {
  const formAdmin = document.getElementById("form-admin-hotel");
  if (formAdmin) {
    formAdmin.addEventListener("submit", (e) => {
      e.preventDefault();

      const nuevoHotel = {
        id: Date.now(),
        nombre: document.getElementById("admin-nombre").value,
        categoria: document.getElementById("admin-categoria").value,
        estado: document.getElementById("admin-estado").value,
        ciudad: document.getElementById("admin-ciudad").value,
        zona: document.getElementById("admin-zona").value,
        moneda: document.getElementById("admin-moneda").value,
        precioRecepcion: parseFloat(document.getElementById("admin-precio-rec").value),
        descuento: parseFloat(document.getElementById("admin-descuento").value),
        abono: parseFloat(document.getElementById("admin-abono").value),
        foto: document.getElementById("admin-foto").value || "hotel1_piscina.jpg",
        descripcion: document.getElementById("admin-descripcion").value
      };

      inventarioHoteles.push(nuevoHotel);
      guardarInventario();
      renderizarListaAdmin();
      formAdmin.reset();
      alert("✅ ¡Hospedaje publicado con éxito!");
    });
  }
});

      
