import { Resend } from 'resend';

// Node.js runtime (edge doesn't support Buffer well for attachments)
export const config = {
    runtime: 'nodejs',
};

const NOTIFY_EMAIL = 'manu@tropica.me';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
    }

    try {
        const { pdfBase64, userName, userEmail, projectName, isTest } = req.body;

        const resend = new Resend(apiKey);

        // Build attachment if PDF provided
        const attachments = pdfBase64 ? [{
            filename: `Brief_MELISA${projectName ? '_' + projectName.replace(/\s+/g, '_') : ''}.pdf`,
            content: pdfBase64,   // Resend accepts base64 string directly
        }] : [];

        const subject = isTest
            ? '🧪 [TEST] MELISA — Prueba de notificación'
            : `📄 Nuevo brief generado${projectName ? ': ' + projectName : ''}`;

        const htmlBody = isTest
            ? `
                <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:32px;">
                    <div style="background:#FFE600;padding:16px 24px;border-radius:12px 12px 0 0;">
                        <h1 style="margin:0;font-size:1.3rem;color:#003087;">🧪 Email de prueba — MELISA</h1>
                    </div>
                    <div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px;border:1px solid #eee;">
                        <p style="color:#333;">Este es un email de <strong>prueba</strong> del sistema de notificaciones de MELISA.</p>
                        <p style="color:#888;font-size:0.85rem;">Si estás viendo esto, el sistema funciona correctamente ✅</p>
                    </div>
                </div>`
            : `
                <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:32px;">
                    <div style="background:#FFE600;padding:16px 24px;border-radius:12px 12px 0 0;">
                        <h1 style="margin:0;font-size:1.3rem;color:#003087;">📄 Nuevo brief generado — MELISA</h1>
                    </div>
                    <div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px;border:1px solid #eee;">
                        <table style="width:100%;border-collapse:collapse;">
                            <tr><td style="padding:6px 0;color:#888;font-size:0.85rem;width:140px;">Usuario</td>
                                <td style="padding:6px 0;color:#333;font-weight:500;">${userName || '—'}</td></tr>
                            <tr><td style="padding:6px 0;color:#888;font-size:0.85rem;">Email</td>
                                <td style="padding:6px 0;color:#333;">${userEmail || '—'}</td></tr>
                            <tr><td style="padding:6px 0;color:#888;font-size:0.85rem;">Proyecto</td>
                                <td style="padding:6px 0;color:#333;">${projectName || '—'}</td></tr>
                            <tr><td style="padding:6px 0;color:#888;font-size:0.85rem;">Fecha</td>
                                <td style="padding:6px 0;color:#333;">${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</td></tr>
                        </table>
                        <p style="margin-top:20px;color:#555;font-size:0.9rem;">El brief completo está adjunto como PDF.</p>
                    </div>
                </div>`;

        const { data, error } = await resend.emails.send({
            from: 'MELISA <melisa@tropica.me>',
            to: [NOTIFY_EMAIL],
            subject,
            html: htmlBody,
            attachments,
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(400).json({ error });
        }

        return res.status(200).json({ success: true, id: data?.id });

    } catch (err) {
        console.error('send-brief error:', err);
        return res.status(500).json({ error: err.message });
    }
}
