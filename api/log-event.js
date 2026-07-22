// CommonJS — required for Vercel Node.js runtime
//
// Lightweight telemetry endpoint for client-side failures that would
// otherwise leave zero trace. The chat flow (api/chat.js) and the brief
// email flow (api/send-brief.js) only show up in Vercel logs when the
// request actually reaches the backend — but several real failure modes
// (PDF generation throwing, the download bubble never appearing because
// Gemini didn't say the exact closing phrase, a network error on /api/chat)
// happen entirely in the browser and never touch the server today.
//
// This endpoint just needs to make those failures visible: every event
// is logged (searchable in Vercel's function logs by the "[MELISA:client-event]"
// prefix), and events considered critical also trigger a real-time email
// alert via Resend so the team finds out without having to go digging.
const { Resend } = require('resend');

const NOTIFY_EMAILS = ['hola@tropica.me'];

/** Events serious enough to warrant an immediate email alert. */
const CRITICAL_EVENTS = new Set([
    'pdf_generation_failed',
    'api_chat_failed',
    'backup_email_failed',
]);

/** Security headers added to every response */
const SEC_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
};

module.exports = async function handler(req, res) {
    Object.entries(SEC_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { event, detail, meta } = req.body || {};

        if (!event || typeof event !== 'string' || event.length > 100) {
            return res.status(400).json({ error: 'Invalid event' });
        }

        const safeDetail = detail ? String(detail).substring(0, 2000) : '';
        const safeMeta = (meta && typeof meta === 'object') ? meta : {};

        // Always logged — this alone fixes "revisé los logs y no veo nada",
        // since these events previously never reached the server at all.
        console.error(`[MELISA:client-event] ${event}`, {
            detail: safeDetail,
            meta: safeMeta,
            userAgent: req.headers['user-agent'] || '',
            ts: new Date().toISOString(),
        });

        if (CRITICAL_EVENTS.has(event) && process.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: 'MELISA Alertas <onboarding@resend.dev>',
                    to: NOTIFY_EMAILS,
                    subject: `⚠️ MELISA — ${event}`,
                    html: `
                        <p><strong>Evento:</strong> ${event}</p>
                        <p><strong>Detalle:</strong> ${safeDetail || '—'}</p>
                        <p><strong>Meta:</strong> ${JSON.stringify(safeMeta)}</p>
                        <p><strong>User-Agent:</strong> ${req.headers['user-agent'] || '—'}</p>
                        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</p>
                    `,
                });
            } catch (mailErr) {
                // Don't fail the request just because the alert email failed —
                // the console.error above already preserved the event.
                console.error('[MELISA:log-event] alert email failed:', mailErr);
            }
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('[MELISA:log-event] handler error:', err);
        return res.status(500).json({ error: err.message });
    }
};
