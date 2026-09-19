
 // Base de datos de Venezuela (Estados, Ciudades y Zonas)
const datosUbicacion = {
  "Caracas (DC)": {
    "Chacao": ["Altamira", "Los Palos Grandes", "El Bosque", "La Castellana"],
    "Baruta": ["Las Mercedes", "El Cafetal", "Prados del Este"],
    "Sucre": ["Los Dos Caminos", "La Urbina"],
    "Libertador": ["Sabana Grande", "El Recreo", "La Candelaria"]
  },
  "Carabobo": {
    "Valencia": ["El Trigal", "Prebo", "Mañongo"],
    "Puerto Cabello": ["El Palito", "Patanemo"],
    "Naguanagua": ["Las Quintas", "La Granja"]
  },
  "Cojedes": {
    "San Carlos": ["Centro", "Los Silos"],
    "Tinaquillo": ["Centro", "Buenos Aires"]
  },
  "Lara": {
    "Barquisimeto": ["Este", "Oeste", "Cabudare"]
  },
  "Zulia": {
    "Maracaibo": ["Bella Vista", "5 de Julio", "El Milagro"]
  },
  "Nueva Esparta": {
    "Margarita": ["Porlamar", "Pampatar", "Playa El Agua"]
  }
};

// Datos Oficiales de Pago Móvil para el Usuario
const datosPagoMovilAdmin = {
  bancoCodigo: "0102",
  bancoNombre: "0102 - Banco de Venezuela",
  cedula: "30585882",
  telefono: "04220048951",
  telefonoFormato: "0422-0048951",
  tiempoLimiteMinutos: 15
};

// Base de datos de prueba
let baseDeDatos = [
  {
    id: 1,
    nombre: "Hotel Carmesí Royal",
    categoria: "Hoteles",
    nivelCategoria: "Alta Gama",
    estado: "Caracas (DC)",
    ciudad: "Chacao",
    zona: "Altamira",
    disponible: true,
    habitacionesDisponibles: 4,
    precioBaseUSD: 100,
    descuentoPorcentaje: 10,
    fotos: ["hotel1_piscina.jpg"],
    servicios: ["Piscina Iluminada 🔵", "Restaurante VIP", "WiFi High Speed"]
  },
  {
    id: 2,
    nombre: "Resort Caribe Carmesí",
    categoria: "Resorts",
    nivelCategoria: "Premium",
    estado: "Nueva Esparta",
    ciudad: "Margarita",
    zona: "Pampatar",
    disponible: true,
    habitacionesDisponibles: 2,
    precioBaseUSD: 150,
    descuentoPorcentaje: 15,
    fotos: ["hotel1_piscina.jpg"],
    servicios: ["Vista al Mar 🌊", "Todo Incluido", "Spa"]
  },
  {
    id: 3,
    nombre: "Posada Express Carmesí",
    categoria: "Hoteles",
    nivelCategoria: "Económica",
    estado: "Cojedes",
    ciudad: "Tinaquillo",
    zona: "Centro",
    disponible: true,
    habitacionesDisponibles: 8,
    precioBaseUSD: 25,
    descuentoPorcentaje: 0,
    fotos: ["hotel1_habitacion.jpg"],
    servicios: ["Aire Acondicionado", "WiFi", "Estacionamiento"]
  }
];

let categoriaSeleccionada = "Hoteles";
let nivelSeleccionado = "Todos";
let temporizadorInterval;

document.addEventListener("DOMContentLoaded", () => {
  cargarEstados();
});

function cargarEstados() {
  const selectEstado = document.getElementById('select-estado');
  if(!selectEstado) return;
  selectEstado.innerHTML = '<option value="Todos">Todos los Estados</option>';
  
  Object.keys(datosUbicacion).forEach(estado => {
    let opt = document.createElement('option');
    opt.value = estado;
    opt.textContent = estado;
    selectEstado.appendChild(opt);
  });
  cargarCiudades();
}

function cargarCiudades() {
  const estado = document.getElementById('select-estado').value;
  const selectCiudad = document.getElementById('select-ciudad');
  selectCiudad.innerHTML = '<option value="Todas">Todas las Ciudades</option>';

  if (estado !== "Todos" && datosUbicacion[estado]) {
    Object.keys(datosUbicacion[estado]).forEach(ciudad => {
      let opt = document.createElement('option');
      opt.value = ciudad;
      opt.textContent = ciudad;
      selectCiudad.appendChild(opt);
    });
  }
  cargarZonas();
}

function cargarZonas() {
  const estado = document.getElementById('select-estado').value;
  const ciudad = document.getElementById('select-ciudad').value;
  const selectZona = document.getElementById('select-zona');
  selectZona.innerHTML = '<option value="Todas">Todas las Zonas</option>';

  if (estado !== "Todos" && ciudad !== "Todas" && datosUbicacion[estado][ciudad]) {
    datosUbicacion[estado][ciudad].forEach(zona => {
      let opt = document.createElement('option');
      opt.value = zona;
      opt.textContent = zona;
      selectZona.appendChild(opt);
    });
  }
}

function seleccionarCategoria(elemento, tipo) {
  let botones = elemento.parentNode.querySelectorAll('.glass-card');
  botones.forEach(btn => btn.classList.remove('active-azul'));
  elemento.classList.add('active-azul');
  categoriaSeleccionada = tipo;
}

function seleccionarNivel(elemento, nivel) {
  let botones = elemento.parentNode.querySelectorAll('.glass-card');
  botones.forEach(btn => btn.classList.remove('active-azul'));
  elemento.classList.add('active-azul');
  nivelSeleccionado = nivel;
}

function calcularComisionApp(precioFinal) {
  if (precioFinal >= 120) return 20;
  if (precioFinal >= 80) return 12;
  if (precioFinal >= 50) return 8;
  return 4;
}

function buscarDisponibilidad() {
  const estado = document.getElementById('select-estado').value;
  const ciudad = document.getElementById('select-ciudad').value;
  const zona = document.getElementById('select-zona').value;

  const contenedorResultados = document.getElementById('lista-hoteles');
  if(!contenedorResultados) return;
  contenedorResultados.innerHTML = "";

  const resultados = baseDeDatos.filter(hotel => {
    const coincideCategoria = hotel.categoria === categoriaSeleccionada;
    const coincideNivel = (nivelSeleccionado === "Todos" || hotel.nivelCategoria === nivelSeleccionado);
    const coincideEstado = (estado === "Todos" || hotel.estado === estado);
    const coincideCiudad = (ciudad === "Todas" || hotel.ciudad === ciudad);
    const coincideZona = (zona === "Todas" || hotel.zona === zona);

    return coincideCategoria && coincideNivel && coincideEstado && coincideCiudad && coincideZona;
  });

  if (resultados.length === 0) {
    contenedorResultados.innerHTML = `
      <div style="text-align: center; padding: 20px; background: rgba(0,0,0,0.4); border-radius: 12px; margin-top: 15px; border: 1px solid rgba(255,255,255,0.2);">
        <p>⚠️ No hay opciones disponibles con los filtros seleccionados.</p>
      </div>`;
    return;
  }

  resultados.forEach(hotel => {
    const precioFinal = hotel.precioBaseUSD - (hotel.precioBaseUSD * (hotel.descuentoPorcentaje / 100));
    const comisionReserva = calcularComisionApp(precioFinal);
    const pagoDirectoHotel = precioFinal - comisionReserva;

    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-hotel';
    tarjeta.style = "background: rgba(255,255,255,0.12); backdrop-filter: blur(10px); border: 1px solid rgba(0, 150, 255, 0.4); border-radius: 15px; padding: 15px; margin-top: 15px;";

    tarjeta.innerHTML = `
      <img src="${hotel.fotos[0] || 'portada.jpg'}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 10px;">
      <div style="margin-top: 10px;">
        <span style="background: ${hotel.disponible ? '#007bb5' : '#c62828'}; color: white; font-size: 0.75rem; padding: 3px 8px; border-radius: 10px; font-weight: bold;">
          ${hotel.disponible ? `Disponible (${hotel.habitacionesDisponibles} habs)` : 'Agotado'}
        </span>
        <span style="background: #2e7d32; color: white; font-size: 0.75rem; padding: 3px 8px; border-radius: 10px; font-weight: bold; margin-left: 5px;">
          ${hotel.nivelCategoria}
        </span>
        
        <h3 style="margin: 8px 0 4px 0;">${hotel.nombre}</h3>
        <p style="font-size: 0.85rem; opacity: 0.85;">📍 ${hotel.ciudad}, ${hotel.estado} (${hotel.zona})</p>
        
        <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; margin: 10px 0;">
          <p style="margin:0; font-size: 0.85rem;">Precio Oficial: <strike>USD $${hotel.precioBaseUSD}</strike> (${hotel.descuentoPorcentaje}% desc.)</p>
          <p style="margin: 4px 0; font-size: 1.1rem; font-weight: bold; color: #4eff91;">Precio Oferta: USD $${precioFinal} / noche</p>
          <p style="margin:0; font-size: 0.8rem; color: #00d4ff;">💳 Anticipo Reserva App: USD $${comisionReserva}</p>
          <p style="margin:0; font-size: 0.8rem; color: #ffca28;">🏨 Pago Restante en Hotel: USD $${pagoDirectoHotel}</p>
        </div>

        <button onclick="iniciarReserva(${hotel.id}, ${precioFinal}, ${comisionReserva})" 
          ${!hotel.disponible ? 'disabled' : ''} 
          style="width: 100%; background: ${hotel.disponible ? 'linear-gradient(90deg, #0056b3, #00a2ff)' : '#555'}; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer;">
          ${hotel.disponible ? 'Reservar Ahora 🏨' : 'Sin Disponibilidad'}
        </button>
      </div>
    `;
    contenedorResultados.appendChild(tarjeta);
  });
}

// Función de Copia Rápida al Portapapeles
function copiarDato(texto, identificador) {
  navigator.clipboard.writeText(texto).then(() => {
    const elemento = document.getElementById(identificador);
    if(elemento) {
      const textoOriginal = elemento.innerText;
      elemento.innerText = "¡Copiado! 📋";
      setTimeout(() => {
        elemento.innerText = textoOriginal;
      }, 1500);
    }
  });
}

// Iniciar Modal de Pago
function iniciarReserva(idHotel, precioTotal, comision) {
  const hotel = baseDeDatos.find(h => h.id === idHotel);
  const modal = document.getElementById('modal-pago');
  if(!modal) return;

  document.getElementById('pago-hotel-nombre').textContent = hotel.nombre;
  document.getElementById('pago-monto-usd').textContent = comision;
  
  // Asignar valores copiables
  document.getElementById('pm-banco').textContent = datosPagoMovilAdmin.bancoNombre;
  document.getElementById('pm-cedula').textContent = datosPagoMovilAdmin.cedula;
  document.getElementById('pm-telefono').textContent = datosPagoMovilAdmin.telefonoFormato;

  modal.style.display = 'flex';
  iniciarTemporizador(datosPagoMovilAdmin.tiempoLimiteMinutos * 60);
}

function iniciarTemporizador(duracionSegundos) {
  clearInterval(temporizadorInterval);
  let tiempoRestante = duracionSegundos;
  const display = document.getElementById('cronometro-pago');

  temporizadorInterval = setInterval(() => {
    let minutos = parseInt(tiempoRestante / 60, 10);
    let segundos = parseInt(tiempoRestante % 60, 10);

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    if (display) display.textContent = `${minutos}:${segundos}`;

    if (--tiempoRestante < 0) {
      clearInterval(temporizadorInterval);
      alert("⏱️ El tiempo para subir el pago ha expirado.");
      cerrarModalPago();
    }
  }, 1000);
}

function cerrarModalPago() {
  clearInterval(temporizadorInterval);
  document.getElementById('modal-pago').style.display = 'none';
}

// Procesar el Pago Móvil y Subida de Capture
function confirmarReservaPago() {
  const comprobanteNum = document.getElementById('input-comprobante').value;
  const archivoInput = document.getElementById('input-capture-file');
  const hotelNombre = document.getElementById('pago-hotel-nombre').textContent;
  const montoUSD = document.getElementById('pago-monto-usd').textContent;

  if (!comprobanteNum && (!archivoInput.files || archivoInput.files.length === 0)) {
    alert("⚠️ Por favor ingresa el número de referencia o adjunta la foto/captura de pantalla del Pago Móvil.");
    return;
  }

  // Generar código único de 4 dígitos
  const codigoConfirmacion = Math.floor(1000 + Math.random() * 9000);

  clearInterval(temporizadorInterval);
  cerrarModalPago();

  const areaConfirmacion = document.getElementById('confirmacion-reserva');
  areaConfirmacion.style.display = 'block';
  
  // Proceso de verificación y código asignado
  areaConfirmacion.innerHTML = `
    <div style="background: rgba(0, 200, 83, 0.2); border: 2px solid #00c853; border-radius: 15px; padding: 20px; text-align: center; margin-top: 20px;">
      <h2 style="color: #4eff91; margin-top:0;">¡Comprobante Recibido Exitosamente! 🎉</h2>
      <p style="font-size: 0.95rem;">Tu pago está siendo verificado en nuestro sistema.</p>
      
      <p style="margin-top: 15px; font-weight: bold; color: #00d4ff;">Tu Código de Reserva es:</p>
      <div style="font-size: 2.8rem; font-weight: bold; letter-spacing: 6px; color: #00d4ff; background: #000; padding: 12px 20px; border-radius: 12px; display: inline-block; margin: 10px 0; border: 1px dashed #00d4ff;">
        ${codigoConfirmacion}
      </div>
      
      <p style="color: #ffeb3b; font-size: 0.9rem; margin-top: 10px;">📸 <strong>OBLIGATORIO:</strong> Haz una captura de pantalla a esta ventana y guárdala. Debes mostrarla en la recepción de <strong>${hotelNombre}</strong> al momento de ingresar.</p>
      <small style="display:block; opacity: 0.8; margin-top: 8px;">Referencia recibida: ${comprobanteNum || 'Captura Adjuntada'}</small>
    </div>
  `;

  // Datos para Telegram
  const mensajeTelegram = `🚨 *PAGO RECIBIDO FINDED CARMESÍ*%0A%0A🔑 *Código:* ${codigoConfirmacion}%0A🏨 *Hotel:* ${hotelNombre}%0A💵 *Monto Anticipo:* USD $${montoUSD}%0A🧾 *Referencia:* ${comprobanteNum || 'Capture Adjunto'}`;
  console.log("Enviado a Telegram:", mensajeTelegram);
}

// Panel de Administración (Candado 🔒)
function abrirConsolaAdmin() {
  const clave = prompt("🔐 Ingrese la clave de administrador:");
  if (clave === "1234") {
    document.getElementById('modal-admin').style.display = 'flex';
    renderizarHotelesAdmin();
  } else if (clave !== null) {
    alert("❌ Clave incorrecta.");
  }
}

function cerrarModalAdmin() {
  document.getElementById('modal-admin').style.display = 'none';
}

function renderizarHotelesAdmin() {
  const listaAdmin = document.getElementById('lista-admin-hoteles');
  listaAdmin.innerHTML = "";

  baseDeDatos.forEach(hotel => {
    const item = document.createElement('div');
    item.style = "background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;";
    item.innerHTML = `
      <div>
        <strong>${hotel.nombre}</strong> (${hotel.ciudad})
      </div>
      <button onclick="eliminarHotel(${hotel.id})" style="background: #e53935; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Eliminar 🗑️</button>
    `;
    listaAdmin.appendChild(item);
  });
}

function agregarNuevoHotelAdmin() {
  const nombre = document.getElementById('admin-nombre').value;
  const categoria = document.getElementById('admin-categoria').value;
  const nivel = document.getElementById('admin-nivel').value;
  const estado = document.getElementById('admin-estado').value;
  const ciudad = document.getElementById('admin-ciudad').value;
  const zona = document.getElementById('admin-zona').value;
  const precio = parseFloat(document.getElementById('admin-precio').value);
  const descuento = parseFloat(document.getElementById('admin-descuento').value) || 0;

  if (!nombre || !precio) {
    alert("⚠️ Completa los campos principales.");
    return;
  }

  const nuevo = {
    id: Date.now(),
    nombre: nombre,
    categoria: categoria,
    nivelCategoria: nivel,
    estado: estado,
    ciudad: ciudad,
    zona: zona,
    disponible: true,
    habitacionesDisponibles: 5,
    precioBaseUSD: precio,
    descuentoPorcentaje: descuento,
    fotos: ["portada.jpg"],
    servicios: ["Servicio Estándar"]
  };

  baseDeDatos.push(nuevo);
  alert("✅ Hotel publicado.");
  renderizarHotelesAdmin();
}

function eliminarHotel(id) {
  if (confirm("¿Deseas eliminar este hospedaje?")) {
    baseDeDatos = baseDeDatos.filter(h => h.id !== id);
    renderizarHotelesAdmin();
  }
}
