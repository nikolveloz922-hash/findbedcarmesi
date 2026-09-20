// Estructura de datos: Estado -> Ciudades -> Zonas
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

document.addEventListener("DOMContentLoaded", () => {
  const selectEstado = document.getElementById("select-estado");
  const selectCiudad = document.getElementById("select-ciudad");
  const selectZona = document.getElementById("select-zona");

  // 1. Cargar Estados al iniciar
  function loadEstados() {
    selectEstado.innerHTML = '<option value="">Selecciona un Estado</option>';
    selectCiudad.innerHTML = '<option value="">Selecciona una Ciudad</option>';
    selectZona.innerHTML = '<option value="">Selecciona una Zona</option>';
    
    selectCiudad.disabled = true;
    selectZona.disabled = true;

    Object.keys(locationsData).sort().forEach(estado => {
      const option = document.createElement("option");
      option.value = estado;
      option.textContent = estado;
      selectEstado.appendChild(option);
    });
  }

  // 2. Manejar cambio de Estado
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
    } else {
      selectCiudad.disabled = true;
    }
  });

  // 3. Manejar cambio de Ciudad
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
    } else {
      selectZona.disabled = true;
    }
  });

  // 4. PASAR AL SIGUIENTE PASO: Al seleccionar la zona, mostrar hoteles
  selectZona.addEventListener("change", (e) => {
    const estado = selectEstado.value;
    const ciudad = selectCiudad.value;
    const zona = e.target.value;

    if (zona) {
      // Oculta el contenedor del buscador/selectores
      const contenedorBuscador = document.getElementById("seccion-ubicacion");
      if (contenedorBuscador) {
        contenedorBuscador.style.display = "none";
      }

      // Muestra la sección de hoteles
      const contenedorHoteles = document.getElementById("seccion-hoteles");
      if (contenedorHoteles) {
        contenedorHoteles.style.display = "block";
      }

      // Si tienes tu propia función para cargar los hoteles en pantalla, la llamas aquí:
      if (typeof cargarHoteles === "function") {
        cargarHoteles(estado, ciudad, zona);
      }
    }
  });

  loadEstados();
});
  // ==========================================
// INTEGRACIÓN NOTIFICACIÓN PRIVADA A TELEGRAM
// ==========================================

// Reemplaza estas comillas con tu Token y Chat ID en tu equipo local
const TELEGRAM_BOT_TOKEN = "INGRESA_AQUI_TU_TOKEN"; 
const TELEGRAM_CHAT_ID = "INGRESA_AQUI_TU_CHAT_ID";   

/**
 * Envía el reporte detallado de la reserva a tu Telegram personal
 */
async function enviarNotificacionTelegram(reserva) {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "INGRESA_AQUI_TU_TOKEN") {
    console.warn("Telegram: Configura tu Token y Chat ID para recibir notificaciones.");
    return;
  }

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

💰 *DESGLOSE FINANCIERO Y DIVISA:*
• *Moneda de Cobro:* ${reserva.divisa} (${reserva.simboloDivisa})
• *Precio Recepción:* ${reserva.precioOficial}
• *Descuento App:* ${reserva.descuento}
• *Monto Abono (Pago Móvil):* ${reserva.abono}
• *Restante a Pagar en Recepción:* ${reserva.restanteHotel}

🔢 *DATOS DE VERIFICACIÓN:*
• *Código Único:* \`${reserva.codigo}\`
• *N° Referencia Pago Móvil:* \`${reserva.referencia}\`
• *Captura Adjunta:* ${reserva.tieneCaptura ? "✅ Adjuntada" : "❌ No adjunta"}
  `;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: mensaje,
        parse_mode: "Markdown"
      })
    });
    console.log("Reporte privado enviado a Telegram.");
  } catch (error) {
    console.error("Error al enviar notificación a Telegram:", error);
  }
  }
      
