/**
 * FindBed Carmesí - Backend Worker API
 * Archivo: worker.js (o backend/worker.js)
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Configuración de encabezados CORS para peticiones desde GitHub Pages
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json; charset=utf-8'
    };

    // Responder a las solicitudes de verificación previa (Preflight CORS)
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204, 
        headers: corsHeaders 
      });
    }

    // RUTA 1: Verificación de estado del servidor
    if (url.pathname === '/api/status' && request.method === 'GET') {
      return new Response(JSON.stringify({
        status: 'online',
        sistema: 'FindBed Carmesí API Active',
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: corsHeaders
      });
    }

    // RUTA 2: Obtener lista de hoteles con consulta SQL uniendo las tablas
    if (url.pathname === '/api/hoteles' && request.method === 'GET') {
      try {
        const query = `
          SELECT 
            h.id, 
            h.nombre, 
            h.categoria, 
            h.nivel, 
            h.habitaciones,
            h.precio_oficial AS precioOficial, 
            h.precio_oferta AS precioOferta,
            h.anticipo, 
            h.pago_restante AS pagoRestante, 
            h.imagen,
            e.nombre AS estado, 
            c.nombre AS ciudad, 
            z.nombre AS zona
          FROM hoteles h
          JOIN estados e ON h.estado_id = e.id
          JOIN ciudades c ON h.ciudad_id = c.id
          JOIN zonas z ON h.zona_id = z.id;
        `;

        const { results } = await env.DB.prepare(query).all();

        return new Response(JSON.stringify({
          success: true,
          total: results.length,
          data: results
        }), {
          status: 200,
          headers: corsHeaders
        });

      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Error al consultar la base de datos SQL: ' + error.message
        }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // RUTA 3: Guardar comprobante y procesar reserva en la tabla SQL 'reservas'
    if (url.pathname === '/api/reserva' && request.method === 'POST') {
      try {
        const datos = await request.json();

        if (!datos.hotelId || !datos.referencia) {
          return new Response(JSON.stringify({
            success: false,
            error: 'Faltan parámetros requeridos (hotelId o referencia)'
          }), {
            status: 400,
            headers: corsHeaders
          });
        }

        // Generar código aleatorio con prefijo FB (Ejemplo: FB-849204)
        const codigoGenerado = "FB-" + Math.floor(100000 + Math.random() * 900000);

        // Insertar en la base de datos D1
        const insertQuery = `
          INSERT INTO reservas (codigo_reserva, hotel_id, referencia_pago, monto_anticipo, estado_pago)
          VALUES (?, ?, ?, ?, 'pendiente');
        `;

        await env.DB.prepare(insertQuery)
          .bind(codigoGenerado, datos.hotelId, datos.referencia, datos.monto || 0)
          .run();

        return new Response(JSON.stringify({
          success: true,
          mensaje: 'Reserva registrada exitosamente en la base de datos SQL',
          codigoReserva: codigoGenerado,
          referencia: datos.referencia
        }), {
          status: 200,
          headers: corsHeaders
        });

      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Error al registrar la reserva: ' + error.message
        }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // Ruta por defecto para endpoints no existentes
    return new Response(JSON.stringify({
      error: 'Ruta API no encontrada'
    }), {
      status: 404,
      headers: corsHeaders
    });
  }
};
      
