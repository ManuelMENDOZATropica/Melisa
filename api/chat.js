export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({ error: "API Key missing in Vercel Environment Variables" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (req.method !== 'POST') {
        return new Response("Method not allowed", { status: 405 });
    }

    try {
        const body = await req.json();
        // Usamos v1beta y gemini-1.5-flash
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.text();
            return new Response(JSON.stringify({ error: "Gemini API Error", details: errorData }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Importante: No consumimos el cuerpo aquí, lo pasamos directo
        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream; charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                'X-Content-Type-Options': 'nosniff',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Server Error", message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
