export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({ error: "API Key no configurada en Vercel" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Método no permitido" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const body = await req.json();
        // Usamos gemini-1.5-flash que es el más estable y rápido para este tipo de apps
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error de Google:", errorText);
            return new Response(JSON.stringify({ error: "Error en la API de Google", details: errorText }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Devolvemos el chorro de datos directamente al navegador
        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error("Error en Edge Function:", error);
        return new Response(JSON.stringify({ error: "Error interno en el servidor" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
