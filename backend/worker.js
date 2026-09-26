export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Configuración de CORS para permitir conexión con GitHub Pages
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. OBTENER LISTA DE HOTELES DE LA BASE DE DATOS D1
    if (url.pathname === '/api/hoteles' && request.method === 'GET') {
      try {
        const { results } = await env.DB.prepare('SELECT * FROM hoteles WHERE disponible = 1').all();
        return new Response(JSON.stringify(results), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 2. AGREGAR HOTEL DESDE EL PANEL DE ADMIN
    if (url.pathname === '/api/admin/agregar-hotel' && request.method === 'POST') {
      try {
        const h = await request.json();
        await env.DB.prepare(
          `INSERT INTO hoteles (nombre, categoria, estado, ciudad, zona, precio_normal, precio_findbed, anticipo, saldo_hotel) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(h.nombre, h.categoria, h.estado, h.ciudad, h.zona, h.precioNormal, h.precioFindBed, h.anticipo, h.saldoHotel).run();

        return new Response(JSON.stringify({ exito: true }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 3. ELIMINAR HOTEL DESDE EL PANEL DE ADMIN
    if (url.pathname === '/api/admin/eliminar-hotel' && request.method === 'POST') {
      try {
        const { id } = await request.json();
        await env.DB.prepare('DELETE FROM hoteles WHERE id = ?').bind(id).run();
        return new Response(JSON.stringify({ exito: true }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 4. REGISTRAR RESERVA Y ENVIAR ALERTA A TELEGRAM
    if (url.pathname === '/api/reservar' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { hotel_nombre, referencia_pago, monto_anticipo } = body;
        const codigoReserva = 'FB-' + Math.floor(100000 + Math.random() * 900000);

        // Guardar reserva en la Base de Datos D1
        await env.DB.prepare(
          'INSERT INTO reservas (codigo_reserva, hotel_id, referencia_pago, monto_anticipo) VALUES (?, ?, ?, ?)'
        ).bind(codigoReserva, 1, referencia_pago, monto_anticipo).run();

        // REEMPLAZA AQUÍ TUS CREDENCIALES DE TELEGRAM
        const TELEGRAM_BOT_TOKEN = "COLOCA_AQUI_EL_TOKEN_DE_TU_BOT"; 
        const TELEGRAM_CHAT_ID = "COLOCA_AQUI_TU_CHAT_ID"; 

        const mensajeTelegram = `🚨 *¡NUEVA RESERVA RECIBIDA!* 🚨\n\n` +
                                `🏨 *Hospedaje:* ${hotel_nombre}\n` +
                                `💳 *Referencia Pago Móvil:* ${referencia_pago}\n` +
                                `💵 *Anticipo:* USD $${monto_anticipo}\n` +
                                `🔑 *Código Generado:* \`${codigoReserva}\``;

        // Envío de la notificación a Telegram
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: mensajeTelegram,
            parse_mode: 'Markdown'
          })
        });

        return new Response(JSON.stringify({ exito: true, codigoReserva }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    return new Response('Ruta no encontrada', { status: 404, headers: corsHeaders });
  }
};
