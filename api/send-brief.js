// CommonJS — required for Vercel Node.js runtime
const { Resend } = require('resend');

// ⚠️ Resend está en modo sandbox: solo permite enviar a la dirección de la
// cuenta (manuel@tropica.me). Los envíos a hola@tropica.me rebotaban con 403
// (confirmado en logs del 23/jul). Cuando se verifique el dominio tropica.me
// en resend.com/domains Y se cambie el `from` a ese dominio, volver a
// ['hola@tropica.me'] o a la lista que se quiera.
const NOTIFY_EMAILS = ['manuel@tropica.me'];

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

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
    }

    try {
        const { pdfBase64, briefData, isMeliUser, isTest } = req.body;

        // H-3 · Validate PDF size (max ~3.7 MB decoded ≈ 5 MB base64)
        if (pdfBase64 && pdfBase64.length > 5_000_000) {
            return res.status(413).json({ error: 'PDF attachment too large' });
        }

        const resend = new Resend(apiKey);

        // Attachment
        const slug = (briefData && briefData.campaignName)
            ? briefData.campaignName.replace(/\s+/g, '_').substring(0, 40)
            : '';
        const attachments = pdfBase64 ? [{
            filename: 'Brief_MELISA' + (isTest ? '_TEST' : '') + (slug ? '_' + slug : '') + '.pdf',
            content: pdfBase64,
        }] : [];

        // Subject
        const subject = isTest
            ? ('\uD83E\uDDEA [TEST] Brief MELISA' + (briefData && briefData.campaignName ? ': ' + briefData.campaignName : ''))
            : ('\uD83D\uDCC4 Nuevo brief' +
               (briefData && briefData.campaignName ? ': ' + briefData.campaignName : '') +
               (briefData && briefData.brand        ? ' \u00B7 ' + briefData.brand : ''));

        const { data, error } = await resend.emails.send({
            from: 'MELISA <onboarding@resend.dev>',
            to:   NOTIFY_EMAILS,
            subject,
            html: buildEmailHtml(briefData, isMeliUser, isTest),
            attachments,
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(400).json({ error });
        }

        return res.status(200).json({ success: true, id: data && data.id });

    } catch (err) {
        console.error('send-brief error:', err);
        return res.status(500).json({ error: err.message });
    }
};
