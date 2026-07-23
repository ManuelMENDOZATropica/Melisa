export const config = {
    runtime: 'edge',
};

/** Security headers added to every response */
const SEC_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export default async function handler(req) {
    // ── C-2 · Origin validation ───────────────────────────────────────
    // Allow: no Origin header (same-site / server-to-server),
    //        request origin matches the host (Vercel deployment),
    //        or local development (localhost / 127.0.0.1).
    const origin = req.headers.get('origin') || '';
    const host   = req.headers.get('host')   || '';
    const isAllowedOrigin =
        !origin ||
        origin.includes(host) ||
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

    if (!isAllowedOrigin) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
            status: 403,
            headers: { ...SEC_HEADERS, 'Content-Type': 'application/json' },
        });
    }

    // ── Method guard ──────────────────────────────────────────────────
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...SEC_HEADERS, 'Content-Type': 'application/json' },
        });
    }

    // ── API key check ─────────────────────────────────────────────────
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return new Response(
            JSON.stringify({ error: 'Gemini API Key is not set in Vercel environment variables.' }),
            { status: 500, headers: { ...SEC_HEADERS, 'Content-Type': 'application/json' } }
        );
    }

    try {
        // ── C-2 · Payload size limit (250 KB) ────────────────────────
        // Antes 50 KB — quedó chico y causó 413 a media conversación real
        // (23/jul): el system prompt creció (BRIEF_STATE + reglas), cada
        // mensaje del historial arrastra su línea de estado, y un documento
        // adjunto (~15 KB) se reenvía en cada turno dentro de la ventana de
        // 20 mensajes. 250 KB da margen holgado y sigue siendo un tope
        // razonable contra abuso.
        const MAX_PAYLOAD = 250_000;
        const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
        if (contentLength > MAX_PAYLOAD) {
            return new Response(JSON.stringify({ error: 'Payload too large' }), {
                status: 413,
                headers: { ...SEC_HEADERS, 'Content-Type': 'application/json' },
            });
        }

        const body = await req.json();

        // Double-check after parsing (in case Content-Length was missing)
        if (JSON.stringify(body).length > MAX_PAYLOAD) {
            return new Response(JSON.stringify({ error: 'Payload too large' }), {
                status: 413,
                headers: { ...SEC_HEADERS, 'Content-Type': 'application/json' },
            });
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return new Response(errorText, {
                status: response.status,
                headers: { ...SEC_HEADERS, 'Content-Type': 'application/json' },
            });
        }

        return new Response(response.body, {
            headers: {
                ...SEC_HEADERS,
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...SEC_HEADERS, 'Content-Type': 'application/json' },
        });
    }
}
