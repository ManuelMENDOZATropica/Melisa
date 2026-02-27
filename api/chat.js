export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({ error: "Gemini API Key is not set in Vercel environment variables." }), { status: 500 });
    }

    try {
        const body = await req.json();
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
