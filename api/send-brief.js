// CommonJS — required for Vercel Node.js runtime
//
// ✉️ ENVÍO VÍA GOOGLE APPS SCRIPT (reemplaza a Resend).
// Resend en modo sandbox solo permitía enviar a manuel@tropica.me y exigía
// verificar el dominio para más destinatarios. En su lugar, este endpoint
// arma el HTML del correo y se lo pasa al MISMO webhook de Apps Script que
// ya loguea a Google Sheets (GOOGLE_SHEETS_WEBHOOK_URL), con
// type:"send_brief_email". El script manda el correo vía MailApp desde la
// cuenta de Google del equipo — sin dominio verificado, sin sandbox, llega
// a cualquier destinatario. Los destinatarios se configuran en MAIL_TO
// dentro de google-apps-script/melisa-logger.gs (hoy: manuel@ y tali@).

/** Security headers added to every response */
const SEC_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
};

/** H-3 · HTML-escape a value, truncated at 2000 chars. Prevents XSS in email HTML. */
const esc = (v) => {
    if (!v) return '—';
    return String(v).trim()
        .substring(0, 2000)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;') || '—';
};

/** Returns value or em-dash for empty fields (plain text context) */
const nd = (v) => (v && String(v).trim()) ? String(v).trim().substring(0, 2000) : '—';

/** One summary row */
const row = (label, value) => `
  <tr>
    <td style="padding:7px 12px 7px 0;color:#888;font-size:0.82rem;white-space:nowrap;vertical-align:top;width:160px;">${esc(label)}</td>
    <td style="padding:7px 0;color:#222;font-size:0.88rem;vertical-align:top;">${esc(value)}</td>
  </tr>`;

/** Section block */
const section = (title, content) => `
  <div style="margin-bottom:18px;">
    <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#1259C3;margin-bottom:6px;">${esc(title)}</div>
    <div style="color:#333;font-size:0.88rem;line-height:1.55;">${esc(content)}</div>
  </div>`;

function buildEmailHtml(briefData, isMeliUser, isTest) {
    briefData  = briefData  || {};
    isMeliUser = isMeliUser || false;
    isTest     = isTest     || false;

    const date = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
    const testBadge = isTest
        ? '<span style="background:#fb7185;color:#fff;font-size:0.7rem;font-weight:700;padding:2px 8px;border-radius:20px;margin-left:10px;vertical-align:middle;">TEST</span>'
        : '';

    return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Inter,-apple-system,sans-serif;">
<div style="max-width:620px;margin:32px auto;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

  <!-- Header -->
  <div style="background:#FFE600;padding:20px 28px;">
    <h1 style="margin:0;font-size:1.25rem;color:#003087;font-weight:700;">📄 Nuevo Brief — MELISA ${testBadge}</h1>
    <p style="margin:4px 0 0;font-size:0.82rem;color:#003087;opacity:0.7;">${date}</p>
  </div>

  <!-- Contact info -->
  <div style="background:#fff;padding:20px 28px 8px;">
    <table style="width:100%;border-collapse:collapse;">
      ${row('Nombre',          briefData.userNameField || briefData.userName)}
      ${row('Email',           briefData.userEmail)}
      ${row('Proyecto',        briefData.campaignName)}
      ${row('Marca / Cliente', briefData.brand)}
      ${row('Líderes',         `${nd(briefData.projectLeadMeli)} (MeLi) / ${nd(briefData.projectLeadBrand)} (Marca)`)}
      ${row('Mercados',        briefData.markets)}
      ${isMeliUser ? row('Usuario MeLi', '✅ Sí') : ''}
    </table>
  </div>

  <div style="height:1px;background:#eee;margin:0 28px;"></div>

  <!-- Brief sections -->
  <div style="background:#fff;padding:20px 28px 4px;">
    ${section('Tipo y Objetivos de campaña', `Tipo: ${nd(briefData.campaignType)} | Foco: ${nd(briefData.objectiveFocus)} | Principal: ${nd(briefData.objectiveMain)}`)}
    ${section('The Challenge',            briefData.businessContext)}
    ${briefData.challengeTweet ? section('Brief en un Tweet', '<em>"' + briefData.challengeTweet + '"</em>') : ''}
    ${section('KPIs',                     briefData.kpis)}
    ${section('Audiencia objetivo',       briefData.targetAudience)}
    ${section('Consumer Insight',         briefData.consumerInsight)}
    ${section('Competencia y Diferenciador', `Competencia: ${nd(briefData.competition)} | Diferenciador: ${nd(briefData.differentiator)}`)}
    ${section('Mensaje clave',            briefData.keyMessage)}
    ${section('Mecánicas promocionales',  briefData.promotionalMechanics)}
    ${section('Tiempos / Cronograma',     briefData.timeline)}
    ${section('Inversión de Marca',       briefData.brandInvestmentUSD)}
    ${isMeliUser && briefData.mediaPlanUSD ? section('Media Plan (USD)', briefData.mediaPlanUSD) : ''}
    ${section('Uso de IA',               briefData.aiUsage)}
  </div>

  <!-- Footer -->
  <div style="background:#003087;padding:14px 28px;">
    <p style="margin:0;font-size:0.78rem;color:rgba(255,255,255,0.7);">
      ${isTest ? 'Email de prueba · ' : ''}Brief completo adjunto como PDF · MELISA by TRÓPICA
    </p>
  </div>

</div>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
    // Apply security headers to all responses
    Object.entries(SEC_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
        return res.status(500).json({ error: 'GOOGLE_SHEETS_WEBHOOK_URL not configured' });
    }

    try {
        const { pdfBase64, briefData, isMeliUser, isTest } = req.body;

        // H-3 · Validate PDF size (max ~3.7 MB decoded ≈ 5 MB base64)
        if (pdfBase64 && pdfBase64.length > 5_000_000) {
            return res.status(413).json({ error: 'PDF attachment too large' });
        }

        // FIX 422 ("The `\n` is not allowed in the `subject` field"):
        // el campaignName puede llegar contaminado con saltos de l\u00EDnea (pas\u00F3 en
        // producci\u00F3n el 23/jul). Todo lo que va a subject/filename se aplana a
        // una sola l\u00EDnea y se recorta.
        const oneLine = (v) => String(v || '').replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().substring(0, 80);
        const campaignName = oneLine(briefData && briefData.campaignName);
        const brandName    = oneLine(briefData && briefData.brand);

        // Attachment \u2014 nombre descriptivo: Brief_<Marca>_<Campa\u00F1a>[_TEST].pdf
        const fileSlug = (v) => oneLine(v)
            .normalize('NFD').replace(/[\u0300-\u036F]/g, '')  // sin acentos
            .replace(/[^a-zA-Z0-9 _-]/g, '')
            .trim().replace(/\s+/g, '_').substring(0, 40);
        const nameParts = ['Brief', fileSlug(brandName), fileSlug(campaignName)].filter(Boolean);
        const pdfFilename = nameParts.join('_') + (isTest ? '_TEST' : '') + '.pdf';

        // Subject
        const subject = isTest
            ? ('\uD83E\uDDEA [TEST] Brief MELISA' + (campaignName ? ': ' + campaignName : ''))
            : ('\uD83D\uDCC4 Nuevo brief' +
               (campaignName ? ': ' + campaignName : '') +
               (brandName    ? ' \u00B7 ' + brandName : ''));

        // Envía vía el webhook de Apps Script (MailApp) — ver nota al inicio.
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30_000);
        const gasRes = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'send_brief_email',
                subject,
                html: buildEmailHtml(briefData, isMeliUser, isTest),
                pdfBase64: pdfBase64 || null,
                pdfFilename,
            }),
            signal: controller.signal,
        });
        clearTimeout(timeout);

        let gasBody = {};
        try { gasBody = await gasRes.json(); } catch (e) { /* respuesta no-JSON */ }

        if (!gasRes.ok || gasBody.ok === false) {
            console.error('Apps Script mail error:', gasRes.status, gasBody);
            return res.status(502).json({ error: gasBody.error || ('Apps Script HTTP ' + gasRes.status) });
        }

        return res.status(200).json({ success: true, via: 'apps-script' });

    } catch (err) {
        console.error('send-brief error:', err);
        return res.status(500).json({ error: err.message });
    }
};
