export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Permite peticiones desde cualquier origen (CORS)
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Ruta 1: Obtener la lista de hoteles
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

    // Ruta 2: Guardar una nueva reserva de pago móvil
    if (url.pathname === '/api/reservar' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { hotel_id, referencia_pago, monto_anticipo } = body;

        const codigoReserva = 'FB-' + Math.floor(100000 + Math.random() * 900000);

        await env.DB.prepare(
          'INSERT INTO reservas (codigo_reserva, hotel_id, referencia_pago, monto_anticipo) VALUES (?, ?, ?, ?)'
        ).bind(codigoReserva, hotel_id, referencia_pago, monto_anticipo).run();

        return new Response(JSON.stringify({
          exito: true,
          mensaje: 'Reserva registrada',
          codigoReserva: codigoReserva
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    return new Response('Ruta no encontrada', { status: 404, headers: corsHeaders });
  }
};
