const SYSTEM_PROMPT = `
Eres MELISA, Directora Creativa Tropical, en colaboración con MERCADO ADS.
Tu misión es construir un brief estratégico completo, profesional y listo para presentar.
Guías la conversación con calidez, inteligencia y alma tropical. 🌴✨🌊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 FLUJO OBLIGATORIO — UNA PREGUNTA A LA VEZ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sigue este orden EXACTO. No saltes pasos. Puedes condensar si el usuario ya dio la info en un documento adjunto, pero siempre confirma antes de seguir.

── BLOQUE 0 · IDIOMA Y ORIGEN (ya hecho en el saludo inicial) ──

── BLOQUE 0.1 · PUNTO DE PARTIDA ──
PASO 0.1 → Justo después de que el usuario confirme su idioma/país, pregunta:
"Perfecto. Para contextualizar correctamente el brief, ¿cuál es el punto de partida para este proyecto?
  (A) Adaptar o ampliar una campaña existente
  (B) Crear una campaña totalmente nueva"

  • En AMBOS casos (A y B): pregunta si tienen algún documento de referencia (brief, deck, inspiración) en PDF o DOCX que puedas analizar:
    "Antes de continuar, ¿tienes algún documento de referencia — brief anterior, deck de campaña, o material de inspiración — que pueda analizar? Adjúntalo con el clip 📎 si lo tienes. Si no, ¡no hay problema y seguimos!"
    → Si adjunta documento: analízalo completo, extrae toda la información útil y salta los pasos ya cubiertos.
    → Si no tiene documento: continúa al siguiente paso.

  • Diferencia entre caminos:
    (A) El nombre de la campaña YA EXISTE — extráelo del documento o confírmalo con el usuario. Omite el PASO 1 si ya está cubierto.
    (B) La campaña aún NO tiene nombre — omite el PASO 1 completamente y continúa desde el PASO 2. El nombre surgirá durante el proceso creativo.

── BLOQUE 0.3 · DATOS DE SESIÓN ──
PASO 0.3 → Justo después de que el usuario confirme su idioma/país, pregunta con calidez:
"¡Qué gusto tenerte aquí! ¿Cómo te llamas y cuál es tu correo electrónico? Así puedo hacerte la experiencia más personal."
  • Usa el NOMBRE del usuario en cada mensaje desde este momento en adelante. Dirígete a él/ella por su nombre de forma natural y cálida.
  • El correo queda registrado como dato interno. No lo repitas en el chat salvo para confirmarlo.
  • Una vez que el usuario comparta su nombre y correo, responde con un mensaje de bienvenida personalizado ANTES de continuar con el siguiente paso. Usa este tono y estructura:
    "[Nombre], ¡qué emocionante tenerte aquí! 🌴 Voy a acompañarte en cada paso del proceso para construir tu brief juntos.
    Un brief bien llenado es la base de todo proyecto exitoso: cuanta más claridad y detalle aportemos aquí, mejores serán las ideas creativas, más eficientes los tiempos y más impactantes los resultados. ¡Así que vamos con todo! ✨
    Y tranquil@: todos tus datos e información ingresados aquí son completamente privados y confidenciales. 🔒"
    → Después de este mensaje, continúa inmediatamente con el PASO 0.1.

── BLOQUE 0.5 · DOCUMENTO EXISTENTE ──
PASO 0.5 → Inmediatamente después de que el usuario confirme su idioma/origen, pregunta:
"Perfecto! Antes de empezar: ¿ya tienes un brief, deck de campaña o cualquier documento de referencia en PDF o DOCX que pueda analizar? Si es así, adjúntalo con el clip 📎 y le saco todo el jugo. Si no tienes nada todavía, ¡no hay problema! Empezamos desde cero."
  • Si el usuario adjunta un archivo: analízalo completo, indica claramente qué pasos del BLOQUE 1 al 6 ya están cubiertos, y continúa SOLO desde el primer paso que falte.
  • Si el usuario no tiene documento: empieza directamente con el PASO 1.


PASO 1 → Pregunta: "¿Cuál es el nombre de este proyecto o campaña?"
PASO 2 → Pregunta: "¿Cuál es la marca o cliente del proyecto?"
PASO 3 → Pregunta: "¿Quién lidera el proyecto del lado de Mercado Libre / MELI? Y del lado de la marca, ¿quién es el contacto principal?"
PASO 4 → Pregunta: "¿Para qué país o países es esta campaña? (México, Argentina, Brasil, Colombia u otros mercados de LATAM)"
PASO 5 → Pregunta: "¿Cuál es el objetivo principal de esta campaña? Elige uno o combínalos: (A) Lanzamiento de producto, (B) Campaña estacional, (C) Brand Awareness / Conocimiento de marca, (D) Performance y ventas."

── BLOQUE 2 · EL DESAFÍO ──
PASO 6 → Pregunta: "Cuéntame el contexto de negocio: ¿qué situación motiva esta campaña? ¿Cómo está el mercado, la competencia, y dónde está parada la marca hoy?"
PASO 7 → Pregunta: "Ahora el reto en una sola oración, como si fuera un tweet: ¿cuál es el desafío central que esta campaña debe resolver?"
PASO 8 → Pregunta: "¿Qué métricas de éxito son prioridad para ti? Puedes elegir varias:
  • Commerce: elevación de ventas, tasa de conversión, valor promedio de pedido, costo de adquisición (CPA).
  • Brand: recordación de marca, intención de compra, sentimiento social.
  • Engagement: tasa de interacción, Share of Voice (SOV), contenido generado por usuarios (UGC)."

── BLOQUE 3 · FUNDAMENTOS ESTRATÉGICOS Y CREATIVOS ──
PASO 9  → Pregunta: "Hablemos del público objetivo: ¿quién es tu consumidor ideal? Cuéntame sobre su demografía (edad, género, nivel socioeconómico), psicografía (valores, aspiraciones, estilo de vida) y su comportamiento de compra en Mercado Libre."
PASO 10 → Pregunta: "¿Cuál es el insight del consumidor? Es decir, ¿qué verdad humana profunda conecta emocionalmente a tu audiencia con esta campaña?"
PASO 11 → Pregunta: "¿Cuál es la verdad de marca? ¿Qué tiene esta marca de auténtico que podemos apalancar creativamente?"
PASO 12 → Pregunta: "¿Hay algún contexto cultural relevante para esta campaña? Por ejemplo: fechas especiales, tendencias locales, celebraciones o matices regionales de LATAM que debamos considerar."
PASO 13 → Pregunta: "¿Cuál es el mensaje clave que el consumidor debe recordar después de ver esta campaña? Y ¿qué territorio emocional o sentimiento queremos provocar (ej: orgullo, alegría, pertenencia, urgencia, inspiración)?"

── BLOQUE 4 · INTEGRACIÓN CON EL ECOSISTEMA MELI ──
PASO 14 → Pregunta: "¿Qué ventajas del ecosistema de Mercado Libre quieres aprovechar en esta campaña? Por ejemplo: red logística, alta penetración de mercado, Meli Play, alianzas como Disney+, u otras."
PASO 15 → Pregunta: "¿Qué mecánicas promocionales planeas incluir? Por ejemplo: descuentos, ofertas por tiempo limitado, cupones, envío gratis, cashback, etc."
PASO 16 → Pregunta: "Para los medios dentro del ecosistema MELI, ¿qué formatos quieres usar?
  • Core: Home Slider, Banners RTB, Productos Patrocinados, publicidad en video.
  • Amplificación: Email marketing, notificaciones Push, redes sociales de MeLi, acciones OOH/BTL."

── BLOQUE 5 · PRODUCCIÓN Y PRESUPUESTO ──
PASO 17 → Pregunta: "En cuanto a tiempos, ¿cuál es la fecha de lanzamiento ideal? Recuerda que necesitamos al menos 10 días hábiles para una propuesta creativa completa."
PASO 18 → Pregunta: "¿Tienes un presupuesto estimado? Si puedes, desglosarlo en: inversión en medios, producción de activos creativos, talentos o influencers, y eventos o activaciones."

── BLOQUE 6 · ARCHIVOS Y APPENDIX ──
PASO 19 → Pregunta: "Para completar el brief, ¿cuentas con los siguientes archivos? Indícame cuáles tienes disponibles:
  • Obligatorios: Deck de campaña, Key Visuals, Manual de marca, Logos, Fotos de producto.
  • Deseables: Videos de campaña, lista de influencers, fotos de personas usando el producto.
  Si tienes alguno, puedes adjuntarlo ahora con el clip 📎."
PASO 20 → Pregunta: "¿Hay algún dato adicional de audiencia, estudios de mercado o información que consideres clave y que no hayamos cubierto?" Si el usuario dice que no, PROCEDE A GENERAR EL BRIEF COMPLETO.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 DOCUMENTO FINAL — BRIEF PREMIUM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando hayas completado todos los pasos, genera el brief completo.
Empieza OBLIGATORIAMENTE con la línea exacta: "--- RESUMEN FINAL PARA DOCUMENTO ---"
Redáctalo como una Directora Creativa senior finalizando un plan estratégico. NADA de "el usuario dijo...".

Estructura obligatoria del documento:

### 0. INFORMACIÓN GENERAL DEL PROYECTO
  Nombre, marca/cliente, líderes (MELI y marca), fecha de preparación, mercados.

### 1. OBJETIVO DE CAMPAÑA
  Tipo de objetivo (Lanzamiento / Estacional / Brand Awareness / Performance).

### 2. THE CHALLENGE
  Contexto de negocio, dinámica de mercado, competencia, posicionamiento actual.
  **Brief en un Tweet:** [La oración-resumen del desafío]

### 3. MÉTRICAS DE ÉXITO (KPIs)
  • Commerce: [métricas seleccionadas]
  • Brand: [métricas seleccionadas]
  • Engagement: [métricas seleccionadas]

### 4. STRATEGIC FOUNDATION
  Audiencia objetivo (demografía, psicografía, comportamiento en MELI, insights culturales LATAM).
  Insight del consumidor | Verdad de Marca | Contexto Cultural.

### 5. MENSAJE CLAVE Y TERRITORIO EMOCIONAL
  [Mensaje + sentimiento de campaña]

### 6. CREATIVE STRATEGY
  El corazón de la idea creativa.

### 7. CAMPAIGN ARCHITECTURE
  Fases y despliegue.

### 8. MELI ECOSYSTEM INTEGRATION
  Ventajas de plataforma utilizadas (logística, Meli Play, alianzas, etc.).
  Mecánicas promocionales.

### 9. MEDIA ECOSYSTEM
  Formatos Core + Estrategia de Amplificación.

### 10. PRODUCTION CONSIDERATIONS
  Tiempos (mínimo 10 días hábiles para propuesta creativa).
  Presupuesto estimado desglosado: medios / producción / talentos / eventos.

### 11. APPENDIX
  Archivos disponibles (obligatorios y deseables).
  Información adicional de audiencia o estudios de mercado.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ REGLAS CRÍTICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- UNA SOLA PREGUNTA POR TURNO. Nunca hagas dos preguntas juntas.
- Si el usuario adjunta un documento, analízalo, extrae lo que puedas y SALTA los pasos que ya estén cubiertos. Confirma qué encontraste y luego sigue desde el primer paso que falte.
- Si el usuario no sabe algo, sugiere opciones razonables y sigue adelante.
- Nunca rompas el flujo con meta-comentarios sobre el proceso.
- ESTILO MELISA: Cálido, inspirador, experto. Emojis con moderación: 🌴✨🌊.
`;

let conversationHistory = [];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// ── Brief Progress Tracker ──────────────────────────────────────
// Progress = max(userAnswers, stepReachedViaDoc) / TOTAL_STEPS
//  · userAnswers  = real messages sent by the user (no doc-upload prompts)
//  · stepReachedViaDoc = when a PDF covers questions, the bot jumps ahead;
//    we detect which step it jumped TO by scanning the bot reply that
//    immediately follows each [DOCUMENTO ADJUNTO:] prompt.
//    Steps BEFORE that jump = covered by the document.
const TOTAL_STEPS = 23;

// Keyword map: step number → phrases the bot uses when asking THAT question.
// Used ONLY to detect doc-skip jumps (not for regular message counting).
const STEP_KEYWORDS = [
    { step: 1,  kw: ['cómo te llamas', 'tu nombre', 'correo electrónico', 'cuál es tu nombre'] },
    { step: 2,  kw: ['punto de partida', 'adaptar', 'campaña totalmente nueva', 'opción a', 'opción b'] },
    { step: 3,  kw: ['documento de referencia', 'brief anterior', 'adjúntalo', 'clip 📎'] },
    { step: 4,  kw: ['nombre de este proyecto', 'nombre del proyecto', 'nombre de la campaña'] },
    { step: 5,  kw: ['marca o cliente', 'cuál es la marca', 'nombre del cliente'] },
    { step: 6,  kw: ['lidera el proyecto', 'contacto principal', 'quién lidera'] },
    { step: 7,  kw: ['para qué país', 'qué países', 'mercados de latam', 'argentina, brasil'] },
    { step: 8,  kw: ['objetivo principal', 'elige uno', 'lanzamiento de producto', 'brand awareness'] },
    { step: 9,  kw: ['contexto de negocio', 'situación motiva', 'dinámica de mercado'] },
    { step: 10, kw: ['reto en una sola oración', 'desafío central', 'como si fuera un tweet'] },
    { step: 11, kw: ['métricas de éxito', 'kpis', 'tasa de conversión', 'share of voice'] },
    { step: 12, kw: ['público objetivo', 'consumidor ideal', 'demografía', 'psicografía'] },
    { step: 13, kw: ['insight del consumidor', 'verdad humana profunda'] },
    { step: 14, kw: ['verdad de marca', 'qué tiene esta marca', 'apalancar creativamente'] },
    { step: 15, kw: ['contexto cultural', 'fechas especiales', 'tendencias locales', 'matices regionales'] },
    { step: 16, kw: ['mensaje clave', 'territorio emocional', 'sentimiento queremos provocar'] },
    { step: 17, kw: ['ventajas del ecosistema', 'meli play', 'red logística', 'alianzas como disney'] },
    { step: 18, kw: ['mecánicas promocionales', 'descuentos', 'cupones', 'cashback'] },
    { step: 19, kw: ['formatos', 'home slider', 'banners rtb', 'email marketing', 'notificaciones push'] },
    { step: 20, kw: ['fecha de lanzamiento', '10 días hábiles', 'tiempos'] },
    { step: 21, kw: ['presupuesto', 'inversión en medios', 'producción de activos', 'desglosarlo'] },
    { step: 22, kw: ['archivos', 'key visuals', 'manual de marca', 'logos', 'obligatorios'] },
    { step: 23, kw: ['dato adicional', 'estudios de mercado', 'información adicional'] },
];

/** Returns the first step number found via keyword scan in a given text. */
function detectStepInText(text) {
    const lower = text.toLowerCase();
    for (const { step, kw } of STEP_KEYWORDS) {
        if (kw.some(k => lower.includes(k))) return step;
    }
    return 0;
}

function updateBriefProgress() {
    // ① Real user answers (typed messages, not internal doc-upload prompts)
    const userAnswers = conversationHistory.filter(
        m => m.role === 'user' && !m.parts[0].text.startsWith('[DOCUMENTO ADJUNTO:')
    ).length;

    // ② Steps covered by uploaded PDFs: for each doc-upload prompt find the
    //    very next bot reply and detect which step the bot jumped TO.
    //    Everything BEFORE that step was covered by the document.
    let docCoveredSteps = 0;
    for (let i = 0; i < conversationHistory.length; i++) {
        const msg = conversationHistory[i];
        if (msg.role === 'user' && msg.parts[0].text.startsWith('[DOCUMENTO ADJUNTO:')) {
            // Find the next model reply after this doc upload
            const nextBot = conversationHistory.slice(i + 1).find(m => m.role === 'model');
            if (nextBot) {
                const jumpedToStep = detectStepInText(nextBot.parts[0].text);
                if (jumpedToStep > 1) {
                    // Steps 1 … (jumpedToStep-1) were covered by the document
                    docCoveredSteps = Math.max(docCoveredSteps, jumpedToStep - 1);
                }
            }
        }
    }

    // ③ Check if the brief is fully complete
    const allBotText = conversationHistory
        .filter(m => m.role === 'model')
        .map(m => m.parts[0].text)
        .join(' ')
        .toLowerCase();
    const isComplete = allBotText.includes('resumen final para documento') ||
                       allBotText.includes('brief completo');

    // Take the higher of typed answers vs. doc-covered steps
    const answered = isComplete ? TOTAL_STEPS
                                : Math.min(Math.max(userAnswers, docCoveredSteps + userAnswers), TOTAL_STEPS);
    const pct = isComplete ? 100 : Math.round((answered / TOTAL_STEPS) * 100);

    const fillEl = document.getElementById('brief-progress-fill');
    const pctEl  = document.getElementById('brief-progress-pct');
    if (!fillEl || !pctEl) return;

    fillEl.style.width = pct + '%';
    pctEl.textContent  = pct + '%';

    if (isComplete || pct === 100) {
        fillEl.classList.add('complete');
        pctEl.style.color = 'var(--ml-blue)';
    } else {
        fillEl.classList.remove('complete');
        pctEl.style.color = '';
    }
}

function createLoadingDots() {
    return `<div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
}

async function handleFileUpload(input) {
    const file = input.files[0];
    if (!file) return;

    const chat = document.getElementById('chat-window');
    const statusDiv = document.createElement('div');
    statusDiv.className = 'msg bot';
    statusDiv.innerHTML = `<span>🌴 Leyendo <b>${file.name}</b>...</span> ${createLoadingDots()}`;
    chat.appendChild(statusDiv);
    chat.scrollTop = chat.scrollHeight;

    try {
        let extractedText = "";
        if (file.type === "application/pdf") {
            extractedText = await extractTextFromPDF(file);
        } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            extractedText = await extractTextFromDocx(file);
        }

        if (extractedText) {
            statusDiv.innerHTML = `✅ Documento <b>"${file.name}"</b> analizado. MELISA le está sacando el jugo... ${createLoadingDots()}`;
            await enviarDocTexto(extractedText, file.name);
        }
    } catch (e) {
        statusDiv.style.color = "#fb7185";
        statusDiv.innerText = "❌ Error al leer el archivo: " + e.message;
    }
}

async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ") + "\n";
    }
    return text;
}

async function extractTextFromDocx(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    return result.value;
}

async function enviarDocTexto(texto, nombre) {
    const promptEspecial = `[DOCUMENTO ADJUNTO: ${nombre}]\n${texto}\n\nAnaliza este documento en silencio. NO muestres al usuario el contenido que encontraste, ni hagas un resumen ni feedback de lo que contiene. Identifica internamente qué pasos del flujo del brief (del BLOQUE 1 al 6) ya están cubiertos con la información del documento. Luego, haz SOLO la primera pregunta del primer paso que aún NO esté cubierto. Una sola pregunta.`;
    conversationHistory.push({ role: "user", parts: [{ text: promptEspecial }] });
    await llamarAPI("");
}

async function enviar() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    const chat = document.getElementById('chat-window');
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user';
    userDiv.innerText = text;
    chat.appendChild(userDiv);
    input.value = '';

    conversationHistory.push({ role: "user", parts: [{ text: text }] });
    await llamarAPI(text);
}

async function llamarAPI(originalText, _retry = true) {
    const chat = document.getElementById('chat-window');

    const botDiv = document.createElement('div');
    botDiv.className = 'msg bot';
    botDiv.innerHTML = createLoadingDots();
    chat.appendChild(botDiv);
    chat.scrollTop = chat.scrollHeight;

    const url = `/api/chat`;

    // Limitar historial a los últimos 20 mensajes para evitar payloads grandes
    // que provocan ERR_HTTP2_SERVER_REFUSED_STREAM en Vercel Edge
    const historyToSend = conversationHistory.slice(-20);

    const payload = {
        system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: historyToSend
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            let errorMsg = `Server Status: ${res.status} ${res.statusText}`;
            try {
                const text = await res.text();
                errorMsg += ` - Body: ${text.substring(0, 100)}`;
            } catch (e) { }
            throw new Error(errorMsg);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let botFullText = "";
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop();

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith("data: ")) {
                    try {
                        const jsonStr = trimmedLine.substring(6);
                        const data = JSON.parse(jsonStr);
                        if (data.candidates && data.candidates[0].content) {
                            const newText = data.candidates[0].content.parts[0].text;
                            botFullText += newText;
                            botDiv.innerHTML = marked.parse(botFullText);
                            chat.scrollTop = chat.scrollHeight;
                        }
                    } catch (e) { }
                }
            }
        }

        conversationHistory.push({ role: "model", parts: [{ text: botFullText }] });

        // Update the progress bar after every bot response
        updateBriefProgress();

        // Detectar brief completo e inyectar botón de descarga como burbuja en el chat
        const searchTerms = ["resumen final para documento", "--- resumen final", "brief completo"];
        if (searchTerms.some(term => botFullText.toLowerCase().includes(term))) {
            showDownloadBubble();
        }

    } catch (e) {
        // Reintentar una vez en errores de red (ej. ERR_HTTP2_SERVER_REFUSED_STREAM)
        if (_retry) {
            botDiv.remove();
            await new Promise(r => setTimeout(r, 2000));
            await llamarAPI(originalText, false);
            return;
        }
        console.error("DEBUG ERROR COMPLETO:", e);
        botDiv.style.color = "#fb7185";
        let errorTexto = String(e);
        if (e && e.message) errorTexto = e.message;
        botDiv.innerText = "⚠️ Hubo un error de conexión. Por favor intenta de nuevo.";
    }
}

function showDownloadBubble() {
    const chat = document.getElementById('chat-window');
    const dlDiv = document.createElement('div');
    dlDiv.className = 'msg bot';
    dlDiv.innerHTML = `
        <p>✅ ¡Tu brief está listo!</p>
        <p>Recuerda que un brief completo es el punto de partida de todo proyecto exitoso. Cuanta más claridad tengas aquí, mejores serán las ideas, los tiempos y los resultados. 🌴✨</p>
        <p>Puedes descargarlo ahora:</p>
        <button class="btn-download-brief" onclick="descargarBrief()">
            📄 Descargar Brief PDF
        </button>
    `;
    chat.appendChild(dlDiv);
    chat.scrollTop = chat.scrollHeight;
}

/**
 * Busca en el historial el bloque del resumen final.
 * Si no lo encuentra, devuelve el último mensaje del modelo.
 */
function getFinalBriefContent() {
    let finalSummary = "";
    // Buscar el bloque marcado explícitamente
    for (let i = conversationHistory.length - 1; i >= 0; i--) {
        const text = conversationHistory[i].parts[0].text;
        if (text.includes("--- RESUMEN FINAL PARA DOCUMENTO ---")) {
            // Extraer solo lo que va después del marcador
            const parts = text.split("--- RESUMEN FINAL PARA DOCUMENTO ---");
            finalSummary = parts[parts.length - 1].trim();
            break;
        }
    }

    // Si no hay marcador, buscar el último mensaje de Melissa
    if (!finalSummary) {
        for (let i = conversationHistory.length - 1; i >= 0; i--) {
            if (conversationHistory[i].role === "model") {
                finalSummary = conversationHistory[i].parts[0].text;
                break;
            }
        }
    }
    return finalSummary;
}

// ── Helper: load an image URL as a base64 data-URL ──────────────
function loadImageAsBase64(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width  = img.naturalWidth;
            canvas.height = img.naturalHeight;
            canvas.getContext('2d').drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.92));
        };
        img.onerror = reject;
        img.src = url;
    });
}

async function descargarBrief() {
    try {
        const { jsPDF } = window.jspdf;
        const finalSummary = getFinalBriefContent();
        if (!finalSummary) { alert('Aún no hay un brief final para descargar.'); return; }

        // ── Load brand assets ───────────────────────────────────────
        const [fondoB64, bannerB64] = await Promise.all([
            loadImageAsBase64('assets/fondo.jpg'),
            loadImageAsBase64('assets/banner.png'),
        ]);

        // ── PDF setup ───────────────────────────────────────────────
        const doc  = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
        const PW   = doc.internal.pageSize.getWidth();   // 210 mm
        const PH   = doc.internal.pageSize.getHeight();  // 297 mm

        // Brand colours (RGB 0-255)
        const YELLOW = [255, 230, 0];
        const BLUE   = [18, 89, 195];
        const DARK   = [0, 48, 135];
        const WHITE  = [255, 255, 255];
        const GREY   = [80, 80, 80];

        // Layout constants (mm)
        const BANNER_H   = 28;   // header strip height
        const FOOTER_H   = 12;   // footer strip height
        const MARGIN_L   = 18;
        const MARGIN_R   = 18;
        const TEXT_W     = PW - MARGIN_L - MARGIN_R;
        const CONTENT_TOP= BANNER_H + 10;   // y where content starts
        const CONTENT_BOT= PH - FOOTER_H - 6;

        // ── Draw one page background + header + footer ───────────────
        function drawPageChrome(pageNum, totalPages) {
            // Full-page background
            doc.addImage(fondoB64, 'JPEG', 0, 0, PW, PH);

            // White semi-transparent content area (simulated with white rect + alpha trick)
            doc.setFillColor(255, 255, 255);
            doc.setGState(new doc.GState({ opacity: 0.88 }));
            doc.rect(0, BANNER_H, PW, PH - BANNER_H - FOOTER_H, 'F');
            doc.setGState(new doc.GState({ opacity: 1 }));

            // Banner image (header strip)
            doc.addImage(bannerB64, 'PNG', 0, 0, PW, BANNER_H);

            // Footer bar
            doc.setFillColor(...DARK);
            doc.rect(0, PH - FOOTER_H, PW, FOOTER_H, 'F');

            // Footer text
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.setTextColor(...WHITE);
            doc.text('MELISA × Mercado Ads — Documento Estratégico de Campaña', MARGIN_L, PH - 4.5);
            doc.text(`Página ${pageNum}`, PW - MARGIN_R, PH - 4.5, { align: 'right' });
        }

        // ── Parse markdown-ish brief into structured lines ───────────
        function parselines(rawText) {
            return rawText.split('\n').map(raw => {
                const stripped = raw
                    .replace(/^#{1,3}\s*/, '')
                    .replace(/\*\*/g, '')
                    .trim();
                if (!stripped || raw.trim().startsWith('---')) return null;

                let type = 'body';
                if (/^#{1,3}\s/.test(raw) || /^\d+[\.\)]\s+[A-Z]/.test(stripped) || /^[A-ZÁÉÍÓÚÑ\s]{6,}$/.test(stripped)) {
                    type = 'section';
                } else if (/^[\*\-\•]\s/.test(raw.trim())) {
                    type = 'bullet';
                } else if (/^\*{0,2}([\w\s]+):\*{0,2}/.test(stripped) && stripped.length < 80) {
                    type = 'label';
                }
                return { type, text: stripped.replace(/^[\•\-\*]\s*/, '') };
            }).filter(Boolean);
        }

        // ── Render lines across pages ────────────────────────────────
        const lines = parselines(finalSummary);
        let page = 1;
        drawPageChrome(page, '?');
        let y = CONTENT_TOP;

        for (const line of lines) {
            const { type, text } = line;

            // Section header — bold, dark blue, with yellow accent bar
            if (type === 'section') {
                const blockH = 10;
                if (y + blockH + 4 > CONTENT_BOT) {
                    doc.addPage(); page++;
                    drawPageChrome(page, '?');
                    y = CONTENT_TOP;
                }
                // Accent left bar
                doc.setFillColor(...YELLOW);
                doc.rect(MARGIN_L, y - 1, 2.5, 7, 'F');
                // Title text
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10.5);
                doc.setTextColor(...DARK);
                const titleLines = doc.splitTextToSize(text, TEXT_W - 6);
                doc.text(titleLines, MARGIN_L + 5, y + 5);
                y += titleLines.length * 5.5 + 5;
                continue;
            }

            // Bullet
            if (type === 'bullet') {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(...GREY);
                const wrapped = doc.splitTextToSize(text, TEXT_W - 8);
                const blockH  = wrapped.length * 4.8 + 2;
                if (y + blockH > CONTENT_BOT) {
                    doc.addPage(); page++;
                    drawPageChrome(page, '?');
                    y = CONTENT_TOP;
                }
                // Bullet dot
                doc.setFillColor(...BLUE);
                doc.circle(MARGIN_L + 2, y + 2.8, 0.9, 'F');
                doc.text(wrapped, MARGIN_L + 6, y + 4);
                y += blockH;
                continue;
            }

            // Label (key: value style)
            if (type === 'label') {
                const colonIdx = text.indexOf(':');
                const key = colonIdx !== -1 ? text.slice(0, colonIdx + 1) : text;
                const val = colonIdx !== -1 ? text.slice(colonIdx + 1).trim() : '';
                const wrapped = doc.splitTextToSize(val || key, TEXT_W - 4);
                const blockH  = wrapped.length * 4.8 + 1.5;
                if (y + blockH > CONTENT_BOT) {
                    doc.addPage(); page++;
                    drawPageChrome(page, '?');
                    y = CONTENT_TOP;
                }
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(9);
                doc.setTextColor(...BLUE);
                doc.text(key, MARGIN_L, y + 4);
                if (val) {
                    const keyW = doc.getTextWidth(key) + 2;
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(...GREY);
                    const vLines = doc.splitTextToSize(val, TEXT_W - keyW);
                    doc.text(vLines, MARGIN_L + keyW, y + 4);
                }
                y += blockH;
                continue;
            }

            // Body text
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...GREY);
            const wrapped = doc.splitTextToSize(text, TEXT_W);
            const blockH  = wrapped.length * 4.8 + 1;
            if (y + blockH > CONTENT_BOT) {
                doc.addPage(); page++;
                drawPageChrome(page, '?');
                y = CONTENT_TOP;
            }
            doc.text(wrapped, MARGIN_L, y + 4);
            y += blockH;
        }

        // ── Retroactively update total page count is not needed with jsPDF
        //    (page numbers are already correct from the page counter)

        doc.save('Brief_MELISA_Premium.pdf');

    } catch (e) {
        console.error('Error generando PDF:', e);
        descargarBriefSimple();
    }
}

function descargarBriefSimple() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const finalSummary = getFinalBriefContent();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(0, 48, 135);
    doc.text('MELISA — Estrategia Creativa', 20, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text('Documento Estratégico de Campaña', 20, 30);

    let y = 45;
    const margin = 20;
    const width  = 170;

    finalSummary.split('\n').forEach(line => {
        let processed = line.replace(/^\s*[\*\-\•]\s*/, '• ');
        if (processed.trim() === '' || processed.startsWith('---')) return;

        const isTitle = processed.startsWith('###') || /^\d+[\)\.]/.test(processed) || /^[A-Z\s]{5,}$/.test(processed.trim());
        const cleanText = processed.replace(/###\s*/, '').replace(/\*\*/g, '').trim();
        const isBullet  = processed.startsWith('•');

        doc.setFont('helvetica', isTitle ? 'bold' : 'normal');
        doc.setFontSize(isTitle ? 11 : 9.5);
        doc.setTextColor(isTitle ? 0 : 60);

        const xPos = isBullet ? margin + 4 : margin;
        const split = doc.splitTextToSize(cleanText, width - (isBullet ? 4 : 0));
        if (y + split.length * 5.5 > 280) { doc.addPage(); y = 20; }
        doc.text(split, xPos, y);
        y += split.length * 5 + (isTitle ? 3 : 1.5);
    });

    doc.save('Brief_MELISA_Simple.pdf');
}



