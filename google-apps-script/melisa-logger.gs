/**
 * MELISA — Logger de conversaciones a Google Sheets
 * ═══════════════════════════════════════════════════
 * Este archivo NO se ejecuta en Vercel — es el código que va en Google
 * Apps Script. api/log-event.js le manda un POST cada vez que hay un
 * evento (cada turno de conversación, completo o abandonado, más errores).
 *
 * ── Cómo desplegarlo ─────────────────────────────────────────────
 * 1. Crea (o abre) una hoja de cálculo de Google Sheets.
 * 2. Extensiones → Apps Script.
 * 3. Borra el contenido de Code.gs y pega TODO este archivo.
 * 4. Guarda el proyecto (dale un nombre, ej. "MELISA Logger").
 * 5. Implementar → Nueva implementación → ⚙️ → tipo "Aplicación web".
 *      - Descripción: lo que quieras.
 *      - Ejecutar como: Yo (tu cuenta de Google).
 *      - Quién tiene acceso: Cualquier usuario.
 *    (Esto es necesario para que Vercel pueda llamarla sin login de Google;
 *    el script igual corre con tus permisos, no con los de quien la llame.)
 * 6. Autoriza los permisos que pida Google (es tu propio script).
 * 7. Copia la URL de la implementación — termina en `/exec`.
 * 8. En Vercel: Project → Settings → Environment Variables, agrega:
 *      GOOGLE_SHEETS_WEBHOOK_URL = <esa URL>
 * 9. Vuelve a desplegar el proyecto en Vercel (o espera al próximo deploy)
 *    para que la función lea la nueva variable de entorno.
 *
 * A partir de ahí, cada conversación (completa o abandonada) y cada error
 * queda como una fila nueva en la hoja "MELISA_Logs" de tu spreadsheet.
 * Para bajarlo como Excel: Archivo → Descargar → Microsoft Excel (.xlsx).
 */

const SHEET_NAME = 'MELISA_Logs';

function doPost(e) {
    try {
        const sheet = getOrCreateSheet_();
        const data = JSON.parse(e.postData.contents);
        const meta = data.meta || {};

        sheet.appendRow([
            new Date(),
            data.event || '',
            meta.sessionId || '',
            meta.step != null ? meta.step : '',
            meta.brand || '',
            meta.campaignName || '',
            meta.userEmail || '',
            meta.userMessage || '',
            meta.botMessage || '',
            data.detail || '',
            data.userAgent || '',
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ ok: true }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
        return ContentService
            .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/** Crea la hoja "MELISA_Logs" con encabezados si todavía no existe. */
function getOrCreateSheet_() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);
        sheet.appendRow([
            'Fecha', 'Evento', 'SessionId', 'Paso', 'Marca', 'Campaña',
            'Email', 'Mensaje Usuario', 'Respuesta MELISA', 'Detalle', 'User-Agent',
        ]);
        sheet.setFrozenRows(1);
    }
    return sheet;
}
