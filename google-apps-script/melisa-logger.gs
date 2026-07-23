/**
 * MELISA — Logger de conversaciones a Google Sheets
 * ═══════════════════════════════════════════════════
 * Este archivo NO se ejecuta en Vercel — es el código que va en Google
 * Apps Script. api/log-event.js le manda un POST cada vez que hay un
 * evento (cada turno de conversación, completo o abandonado, más errores).
 *
 * ── ¿Por qué DOS pestañas y no una por sesión? ─────────────────────
 * Una pestaña nueva por cada conversación no escala: en unas semanas
 * tendrías cientos de pestañas (incluyendo pruebas y sesiones abandonadas),
 * Sheets se pone lento, y no hay forma fácil de comparar/filtrar entre
 * sesiones (nada de "dame todas las de julio" o "cuáles se abandonaron").
 * En vez de eso:
 *
 *   • "Logs_<fecha>"    → historial completo, UNA FILA POR TURNO, en una
 *                         pestaña nueva cada día (hora de México). Para
 *                         auditar una conversación puntual, filtra por
 *                         SessionId dentro del día correspondiente.
 *   • "MELISA_Sesiones" → UNA FILA POR SESIÓN (se actualiza sola en cada
 *                         turno). Esta es la vista rápida: qué sesiones
 *                         hay, cuántos turnos tuvo cada una, en qué paso
 *                         se quedó, marca/campaña/email. El equivalente
 *                         práctico a "una pestaña por sesión" pero sin
 *                         que la spreadsheet se vuelva infumable.
 *
 * Si el "Último paso" de una sesión en MELISA_Sesiones está cerca de 30-32
 * (TOTAL_STEPS en script.js), probablemente se completó. Si quedó en un
 * número bajo, probablemente se abandonó — como pasó con Cetaphil.
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
 * Para bajar cualquier pestaña como Excel: Archivo → Descargar → Microsoft
 * Excel (.xlsx) — Sheets exporta cada pestaña como una hoja del .xlsx.
 */

// Los logs crudos van en UNA PESTAÑA POR DÍA (Logs_2026-07-23, hora de
// México) para que cada jornada sea fácil de revisar y exportar por separado.
// MELISA_Sesiones se mantiene como resumen GLOBAL (una fila por sesión,
// cruzando días — una conversación puede empezar un día y seguir al otro).
const LOG_SHEET_PREFIX = 'Logs_';
const SESSIONS_SHEET_NAME = 'MELISA_Sesiones';
const TIMEZONE = 'America/Mexico_City';

// Destinatarios de los correos (brief completado y alertas de error).
// A diferencia de Resend, MailApp manda desde TU cuenta de Google — sin
// verificación de dominio ni modo sandbox: llega a cualquier dirección.
const MAIL_TO = ['manuel@tropica.me', 'tali@tropica.me'];

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const meta = data.meta || {};

        // ── Modo correo: Vercel pide mandar un email ──────────────────
        // (api/send-brief.js manda type:"send_brief_email"; las alertas
        //  críticas de api/log-event.js llegan como type:"send_alert_email")
        if (data.type === 'send_brief_email') {
            sendBriefEmail_(data);
            return jsonResponse_({ ok: true, sent: true });
        }
        if (data.type === 'send_alert_email') {
            sendAlertEmail_(data);
            return jsonResponse_({ ok: true, sent: true });
        }

        // ── Modo log (default): registrar el evento en el spreadsheet ─
        appendLogRow_(data, meta);
        upsertSessionRow_(data, meta);

        return jsonResponse_({ ok: true });
    } catch (err) {
        return jsonResponse_({ ok: false, error: String(err) });
    }
}

function jsonResponse_(obj) {
    return ContentService
        .createTextOutput(JSON.stringify(obj))
        .setMimeType(ContentService.MimeType.JSON);
}

/** Correo del brief completado, con el PDF adjunto (viene en base64). */
function sendBriefEmail_(data) {
    const options = { htmlBody: data.html || '' };
    if (data.pdfBase64) {
        options.attachments = [
            Utilities.newBlob(
                Utilities.base64Decode(data.pdfBase64),
                'application/pdf',
                data.pdfFilename || 'Brief_MELISA.pdf'
            ),
        ];
    }
    MailApp.sendEmail(MAIL_TO.join(','), data.subject || '📄 Nuevo brief MELISA', '', options);
}

/**
 * 🧪 EJECUTA ESTA FUNCIÓN UNA VEZ desde el editor para autorizar el permiso
 * de correo: selecciona "testEmail" en el menú desplegable de funciones
 * (arriba, junto a "Depurar") y haz clic en ▶️ Ejecutar. Google mostrará
 * "Revisar permisos" → tu cuenta → "Configuración avanzada" → "Ir a
 * [nombre del proyecto] (no seguro)" → Permitir. Es tu propio script; el
 * aviso de "no seguro" es estándar para scripts personales sin verificar.
 * Si todo sale bien, te llega un correo de prueba a MAIL_TO.
 */
function testEmail() {
    MailApp.sendEmail(
        MAIL_TO.join(','),
        '🧪 MELISA — prueba de correo vía Apps Script',
        '',
        { htmlBody: '<p>Si estás leyendo esto, el permiso de correo quedó autorizado y MELISA ya puede enviar briefs y alertas. 🌴✨</p>' }
    );
    Logger.log('Correo de prueba enviado a: ' + MAIL_TO.join(', '));
}

/** Alerta de error crítico del cliente (pdf_generation_failed, etc.). */
function sendAlertEmail_(data) {
    MailApp.sendEmail(
        MAIL_TO.join(','),
        data.subject || '⚠️ MELISA — alerta',
        '',
        { htmlBody: data.html || '' }
    );
}

/** Agrega una fila cruda por cada evento — el historial completo, turno a turno. */
function appendLogRow_(data, meta) {
    const sheet = getOrCreateLogSheet_();
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
}

/** Pestaña del día actual (p.ej. "Logs_2026-07-23"), creada si no existe.
 *  La más reciente se mueve al frente para encontrarla rápido. */
function getOrCreateLogSheet_() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const name = LOG_SHEET_PREFIX + Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd');
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
        sheet = ss.insertSheet(name, 0); // índice 0 → primera pestaña
        sheet.appendRow([
            'Fecha', 'Evento', 'SessionId', 'Paso', 'Marca', 'Campaña',
            'Email', 'Mensaje Usuario', 'Respuesta MELISA', 'Detalle', 'User-Agent',
        ]);
        sheet.setFrozenRows(1);
    }
    return sheet;
}

/**
 * Crea o actualiza (upsert) la fila-resumen de esta sesión: una fila por
 * SessionId, que se va completando/actualizando en cada turno. Es la vista
 * "una fila = una conversación completa" sin necesidad de pestañas nuevas.
 */
function upsertSessionRow_(data, meta) {
    const sessionId = meta.sessionId;
    if (!sessionId) return; // eventos sin sessionId (no debería pasar) no se resumen

    const sheet = getOrCreateSessionsSheet_();
    const now = new Date();
    const lastRow = sheet.getLastRow();

    // Busca si ya existe una fila para este sessionId (columna A).
    let rowIndex = -1;
    if (lastRow > 1) {
        const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
        for (let i = 0; i < ids.length; i++) {
            if (ids[i][0] === sessionId) { rowIndex = i + 2; break; } // +2: fila 1 = encabezado
        }
    }

    if (rowIndex === -1) {
        // Nueva sesión
        sheet.appendRow([
            sessionId,
            now,                              // Inicio
            now,                              // Última actividad
            1,                                 // Turnos
            meta.brand || '',
            meta.campaignName || '',
            meta.userEmail || '',
            meta.step != null ? meta.step : '',
            data.event || '',
        ]);
    } else {
        // Sesión existente — actualiza solo lo que cambió, sin pisar con vacío
        const range = sheet.getRange(rowIndex, 1, 1, 9);
        const current = range.getValues()[0];
        const turnos = (Number(current[3]) || 0) + 1;
        sheet.getRange(rowIndex, 3).setValue(now);      // Última actividad
        sheet.getRange(rowIndex, 4).setValue(turnos);   // Turnos
        if (meta.brand)                    sheet.getRange(rowIndex, 5).setValue(meta.brand);
        if (meta.campaignName)             sheet.getRange(rowIndex, 6).setValue(meta.campaignName);
        if (meta.userEmail)                sheet.getRange(rowIndex, 7).setValue(meta.userEmail);
        if (meta.step != null)             sheet.getRange(rowIndex, 8).setValue(meta.step);
        sheet.getRange(rowIndex, 9).setValue(data.event || '');
    }
}

function getOrCreateSessionsSheet_() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SESSIONS_SHEET_NAME);
    if (!sheet) {
        sheet = ss.insertSheet(SESSIONS_SHEET_NAME);
        sheet.appendRow([
            'SessionId', 'Inicio', 'Última actividad', 'Turnos', 'Marca',
            'Campaña', 'Email', 'Último paso', 'Último evento',
        ]);
        sheet.setFrozenRows(1);
    }
    return sheet;
}
