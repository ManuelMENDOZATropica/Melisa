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
// prefix), forwarded to a Google Sheet for a permanent, browsable record of
// EVERY conversation (completed or abandoned — see forwardToGoogleSheets()
// and google-apps-script/melisa-logger.gs), and events considered critical
// also trigger a real-time email alert (via the same Apps Script webhook).
// ✉️ Las alertas también van vía Google Apps Script / MailApp (reemplaza a
// Resend — ver nota completa en api/send-brief.js). Los destinatarios se
// configuran en MAIL_TO dentro de google-apps-script/melisa-logger.gs.

/** Events serious enough to warrant an immediate email alert. */
const CRITICAL_EVENTS = new Set([
    'pdf_generation_failed',
    'api_chat_failed',
    'backup_email_failed',
]);

/**
 * 'conversation_turn' fires on every single exchange with MELISA (completed
 * briefs AND abandoned ones) so the team can audit any session afterwards —
 * this is NOT a critical event, just an audit trail, so it must never
 * trigger an email alert or it would spam the inbox on every message.
 */

/** Caps every string value inside meta so a single event can't blow up the log line. */
function truncateMeta(meta) {
    const out = {};
    for (const [k, v] of Object.entries(meta)) {
        out[k] = typeof v === 'string' ? v.substring(0, 2500) : v;
    }
    return out;
}

/**
 * Forwards every event to a Google Sheet (via a Google Apps Script web app
 * — see google-apps-script/melisa-logger.gs for the script + deploy steps)
 * so ALL conversations end up in a spreadsheet, not just the ones that
 * finish with a completed brief. No-ops until GOOGLE_SHEETS_WEBHOOK_URL is
 * configured in Vercel; never throws, never blocks the response.
 */
async function forwardToGoogleSheets(payload) {
    const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!url) return;
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });
        clearTimeout(timeout);
    } catch (err) {
        console.error('[MELISA:log-event] Google Sheets forward failed:', err.message);
    }
}

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
        const safeMeta = truncateMeta((meta && typeof meta === 'object') ? meta : {});

        const userAgent = req.headers['user-agent'] || '';
        const ts = new Date().toISOString();

        // Always logged — this alone fixes "revisé los logs y no veo nada",
        // since these events previously never reached the server at all.
        console.error(`[MELISA:client-event] ${event}`, {
            detail: safeDetail,
            meta: safeMeta,
            userAgent,
            ts,
        });

        // Guarda TODAS las conversaciones (completas y abandonadas) en Google
        // Sheets — no bloquea ni depende de que esto funcione para responder.
        await forwardToGoogleSheets({ event, detail: safeDetail, meta: safeMeta, userAgent, ts });

        if (CRITICAL_EVENTS.has(event) && process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
            try {
                await forwardToGoogleSheets({
                    type: 'send_alert_email',
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
