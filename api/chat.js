export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return new Response(JSON.stringify({ error: "API Key missing" }), { status: 500 });
    if (req.method !== 'POST') return new Response("Method not allowed", { status: 405 });

    try {
        const body = await req.json();
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        // Retorno directo del stream (lo más rápido y estable para Edge)
        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream; charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
