/**
 * FindBed Carmesí - Backend API (Cloudflare Worker)
 * Archivo: backend/worker.js
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Encabezados de seguridad CORS para permitir comunicación con GitHub Pages
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json; charset=utf-8'
    };

    // Responder a las solicitudes de verificación previa de navegador (Preflight CORS)
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204, 
        headers: corsHeaders 
      });
    }

    // Ruta 1: Verificación de estado del servidor (/api/status)
    if (url.pathname === '/api/status' && request.method === 'GET') {
      return new Response(JSON.stringify({
        status: 'online',
        mensaje: 'Servidor Backend FindBed Carmesí operando correctamente',
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: corsHeaders
      });
    }

    // Ruta 2: Procesar comprobante de pago y generar código (/api/reserva)
    if (url.pathname === '/api/reserva' && request.method === 'POST') {
      try {
        const datos = await request.json();

        if (!datos.referencia) {
          return new Response(JSON.stringify({
            success: false,
            error: 'Número de referencia de Pago Móvil no proporcionado'
          }), {
            status: 400,
            headers: corsHeaders
          });
        }

        // Generar un código único de reserva aleatorio (Ej: FB-849204)
        const codigoGenerado = "FB-" + Math.floor(100000 + Math.random() * 900000);

        return new Response(JSON.stringify({
          success: true,
          mensaje: 'Comprobante recibido con éxito',
          codigoReserva: codigoGenerado,
          referencia: datos.referencia,
          fecha: new Date().toLocaleDateString('es-VE')
        }), {
          status: 200,
          headers: corsHeaders
        });

      } catch (err) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Error al procesar el formato JSON de la solicitud'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }
    }

    // Respuesta para cualquier otra ruta no definida
    return new Response(JSON.stringify({
      error: 'Ruta API no encontrada'
    }), {
      status: 404,
      headers: corsHeaders
    });
  }
};
                          
