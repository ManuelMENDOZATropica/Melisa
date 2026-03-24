const SYSTEM_PROMPT = `
Eres MELISA, aliada estratégica de Trópica, en colaboración con MERCADO ADS.
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
    → Si adjunta documento: analízalo completo, extrae toda la información útil y salta los pasos ya cubiertos. ⚠️ El PASO 2 (marca/cliente) es SIEMPRE OBLIGATORIO — confírmalo con el usuario aunque aparezca en el documento.
    → Si no tiene documento: continúa al siguiente paso.

  • Diferencia entre caminos:
    (A) El nombre de la campaña YA EXISTE — extráelo del documento o confírmalo con el usuario. Omite el PASO 1 si ya está cubierto.
    (B) La campaña es NUEVA y aún NO tiene nombre — OMITE el PASO 1 completamente. NO preguntes el nombre. Continúa directamente desde el PASO 2. El nombre surgirá durante el proceso creativo.

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


PASO 1 → Pregunta: "¿Cuál es el nombre de este proyecto o campaña?" [Solo si es campaña existente, opción A. Si es campaña nueva, salta este paso.]
PASO 2 → Pregunta: "¿Cuál es la marca o cliente del proyecto?" ⚠️ OBLIGATORIO — siempre pregunta esto, nunca lo omitas.
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
PASO 14 → Pregunta: "¿Qué ventajas del ecosistema de Mercado Libre quieres aprovechar en esta campaña? Por ejemplo: alta penetración de mercado, Meli Play, alianzas como Disney+, u otras."
PASO 15 → Pregunta: "¿Qué mecánicas promocionales planeas incluir? Por ejemplo: descuentos, ofertas por tiempo limitado, cupones, envío gratis, cashback, etc."
PASO 16 → Pregunta: "Para los medios dentro del ecosistema MELI, ¿qué formatos quieres usar?
  • Core: Home Slider, Banners RTB, publicidad en video.
  • Amplificación: Notificaciones Push, redes sociales de MeLi, acciones OOH."

── BLOQUE 5 · PRODUCCIÓN Y PRESUPUESTO ──
PASO 17 → Pregunta: "En cuanto a tiempos, ¿cuál es la fecha de lanzamiento ideal?"
PASO 18 → Pregunta: "¿Cuál es el presupuesto que se estima para esta campaña?"
PASO 18bis → Pregunta: "¿Están abiertos a usar Inteligencia Artificial para generar contenidos (imágenes, videos, textos creativos) en esta campaña?"

── BLOQUE 6 · ARCHIVOS Y APPENDIX ──
PASO 19 → Pregunta: "Para completar el brief, ¿cuentas con archivos de referencia? Si es así, comparte un enlace a Google Drive, OneDrive, Dropbox o cualquier plataforma que prefieras — asegúrate de que el acceso esté habilitado para compartir con externos. Los tipos de archivos más útiles son:
  • Obligatorios: Deck de campaña, Key Visuals, Manual de marca, Logos, Fotos de producto.
  • Deseables: Videos de campaña, lista de influencers, fotos de personas usando el producto.
  Si prefieres, también puedes adjuntar archivos directamente con el clip 📎."
PASO 20 → Pregunta: "¿Hay algún dato adicional de audiencia, estudios de mercado o información que consideres clave y que no hayamos cubierto?" Si el usuario dice que no, PROCEDE A GENERAR EL BRIEF COMPLETO.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 DOCUMENTO FINAL — BRIEF PREMIUM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando hayas completado todos los pasos, genera el brief completo.
Empieza OBLIGATORIAMENTE con la línea exacta: "--- RESUMEN FINAL PARA DOCUMENTO ---"
Redáctalo como una aliada estratégica experta finalizando un plan de campaña junto al equipo. NADA de "el usuario dijo...".

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
  Ventajas de plataforma utilizadas (Meli Play, alianzas, etc.).
  Mecánicas promocionales.

### 9. MEDIA ECOSYSTEM
  Formatos Core (Home Slider, Banners RTB, video) + Estrategia de Amplificación (Push, redes sociales, OOH).

### 10. PRODUCTION CONSIDERATIONS
  Fecha de lanzamiento ideal.
  Presupuesto estimado para la campaña.

### 11. USO DE INTELIGENCIA ARTIFICIAL
  ¿Se autoriza el uso de IA para generación de contenidos? (imágenes, videos, textos creativos)

### 12. APPENDIX
  Enlace a archivos de referencia (Drive / OneDrive / Dropbox) con acceso habilitado para externos.
  Información adicional de audiencia o estudios de mercado.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ REGLAS CRÍTICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- UNA SOLA PREGUNTA POR TURNO. Nunca hagas dos preguntas juntas.
- Si el usuario adjunta un documento, analízalo, extrae lo que puedas y SALTA los pasos que ya estén cubiertos. Confirma qué encontraste y luego sigue desde el primer paso que falte.
- Si el usuario no sabe algo, sugiere opciones razonables y sigue adelante.
- Nunca rompas el flujo con meta-comentarios sobre el proceso.
- ESTILO MELISA: Cálido, inspirador, experto. Emojis con moderación: 🌴✨🌊.
- FORMATO DE OPCIONES: Siempre que ofrezcas opciones de selección (A/B/C/D, Sí/No, idiomas, etc.) usa EXACTAMENTE este formato en líneas separadas:
  **(A)** Texto de la opción
  **(B)** Texto de la opción
  Así el sistema puede renderizarlas como botones interactivos.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✂️ BREVEDAD Y RITMO — OBLIGATORIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- RESPUESTAS CORTAS. Cada mensaje conversacional debe tener MÁXIMO 3 líneas + la pregunta. Sin párrafos largos, sin introducciones, sin relleno.
- NO repitas lo que el usuario acaba de decir. No hagas eco ni resumen de su respuesta anterior.
- Ve directo al punto: acusa recibo en una frase corta (si aplica) y lanza la siguiente pregunta.
- NO uses frases de transición vacías como "¡Genial!", "¡Perfecto!", "¡Qué interesante!", "¡Claro que sí!" como único contenido. Si quieres reconocer la respuesta, hazlo con una observación sustanciosa en máximo una línea.
- Las listas de opciones están permitidas, pero deben ser compactas (máximo 4 ítems, una línea cada uno).
- El DOCUMENTO FINAL (brief completo) es la ÚNICA excepción a la regla de brevedad: ahí sí se debe extender todo lo necesario.
`;

let conversationHistory = [];

// ── MeLi user detection ─────────────────────────────────────────
let isMeliUser = false;
let userEmail   = '';

/** MeLi email domains (all regional variants + Mercado Pago) */
const MELI_DOMAINS = [
    'mercadolibre.com',
    'mercadolibre.com.ar', 'mercadolibre.com.mx', 'mercadolibre.com.br',
    'mercadolibre.com.co', 'mercadolibre.com.pe', 'mercadolibre.com.uy',
    'mercadolibre.com.ve', 'mercadolibre.cl',     'mercadolibre.co',
    'mercadolibre.com.ec', 'mercadolibre.com.bo', 'mercadolibre.com.py',
    'mercadopago.com',     'meli.com'
];

/**
 * Scans a text for an email address and checks if it belongs to MeLi.
 * Sets isMeliUser and userEmail globals when found.
 */
function detectUserEmail(text) {
    if (isMeliUser) return; // already detected, don't overwrite
    const emailMatch = text.match(/[a-zA-Z0-9._%+\-]+@([a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/);
    if (!emailMatch) return;
    const email  = emailMatch[0];
    const domain = emailMatch[1].toLowerCase();
    userEmail = email;
    isMeliUser = MELI_DOMAINS.some(d => domain === d || domain.endsWith('.' + d));
    if (isMeliUser) {
        console.log(`[MELISA] MeLi user detected: ${email}`);
    }
}

/**
 * Returns the system prompt, appending MeLi context when relevant.
 */
function buildSystemPrompt() {
    if (!isMeliUser) return SYSTEM_PROMPT;
    return SYSTEM_PROMPT + `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 CONTEXTO INTERNO — USUARIO MELI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
El usuario es empleado de Mercado Libre (email: ${userEmail}).
- Trato más directo y de igual a igual, como colega senior.
- Puedes usar terminología interna de MeLi sin explicarla (MeLi Ads, MOPS, Meli Play, etc.).
- Asume que conoce la plataforma, los formatos y el ecosistema.
- No le expliques qué es Mercado Libre ni sus funcionalidades básicas.
- Valida y complementa sus ideas desde adentro del proceso creativo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 PASO EXCLUSIVO MELI — MEDIA PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Justo después del PASO 18 (presupuesto de campaña), agrega este paso adicional SOLO para usuarios MeLi:
PASO 18-MELI → Pregunta: "¿Cuál es el monto del media plan para esta campaña? (en USD)"
  • Registra el monto como dato clave del brief.
  • Inclúyelo en la sección "10. PRODUCTION CONSIDERATIONS" del documento final, bajo el label "Media Plan (USD):".`;
}


pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// ── Brief Progress Tracker ──────────────────────────────────────
// Progress = max(userAnswers, stepReachedViaDoc) / TOTAL_STEPS
//  · userAnswers  = real messages sent by the user (no doc-upload prompts)
//  · stepReachedViaDoc = when a PDF covers questions, the bot jumps ahead;
//    we detect which step it jumped TO by scanning the bot reply that
//    immediately follows each [DOCUMENTO ADJUNTO:] prompt.
//    Steps BEFORE that jump = covered by the document.
const TOTAL_STEPS = 24; // 23 original + 1 (PASO 18bis: uso de IA)

// Keyword map: step number → phrases the bot uses when asking THAT question.
// Used ONLY to detect doc-skip jumps (not for regular message counting).
const STEP_KEYWORDS = [
    { step: 1, kw: ['cómo te llamas', 'tu nombre', 'correo electrónico', 'cuál es tu nombre'] },
    { step: 2, kw: ['punto de partida', 'adaptar', 'campaña totalmente nueva', 'opción a', 'opción b'] },
    { step: 3, kw: ['documento de referencia', 'brief anterior', 'adjúntalo', 'clip 📎'] },
    { step: 4, kw: ['nombre de este proyecto', 'nombre del proyecto', 'nombre de la campaña'] },
    { step: 5, kw: ['marca o cliente', 'cuál es la marca', 'nombre del cliente'] },
    { step: 6, kw: ['lidera el proyecto', 'contacto principal', 'quién lidera'] },
    { step: 7, kw: ['para qué país', 'qué países', 'mercados de latam', 'argentina, brasil'] },
    { step: 8, kw: ['objetivo principal', 'elige uno', 'lanzamiento de producto', 'brand awareness'] },
    { step: 9, kw: ['contexto de negocio', 'situación motiva', 'dinámica de mercado'] },
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
    // Extra steps not in STEP_KEYWORDS
    if (/monto del media plan/i.test(text)) return 98; // MeLi: media plan USD
    if (/inteligencia artificial|uso de ia|autoriza.*ia/i.test(text)) return 99; // AI usage
    return 0;
}

// ── Brief Data Store ─────────────────────────────────────────────
// Each field is filled as the user answers the corresponding step.
// Used to build the PDF independently of MELISA's final summary.
const briefData = {
    // Identity
    userName:            '',
    userEmail:           '',
    // Step 1 — Nombre/correo
    userNameField:       '',
    // Step 2 — Punto de partida
    campaignType:        '',
    // Step 3 — Documento (no data captured, handled via upload)
    // Step 4 — Nombre campaña
    campaignName:        '',
    // Step 5 — Marca/cliente
    brand:               '',
    // Step 6 — Líderes
    projectLeader:       '',
    // Step 7 — Mercados
    markets:             '',
    // Step 8 — Objetivo
    objective:           '',
    // Step 9 — Contexto de negocio
    businessContext:     '',
    // Step 10 — Reto / Brief tweet
    challengeTweet:      '',
    // Step 11 — KPIs
    kpis:                '',
    // Step 12 — Audiencia
    targetAudience:      '',
    // Step 13 — Consumer insight
    consumerInsight:     '',
    // Step 14 — Verdad de marca
    brandTruth:          '',
    // Step 15 — Contexto cultural
    culturalContext:     '',
    // Step 16 — Mensaje clave
    keyMessage:          '',
    // Step 17 — Ecosistema MeLi
    meliEcosystem:       '',
    // Step 18 — Mecánicas promocionales
    promotionalMechanics:'',
    // Step 19 — Formatos de medios
    mediaFormats:        '',
    // Step 20 — Fecha de lanzamiento
    launchDate:          '',
    // Step 21 — Presupuesto
    budget:              '',
    // Step 22 — Archivos de referencia
    referenceFiles:      '',
    // Step 23 — Data adicional
    additionalData:      '',
    // Step 98 — Media plan USD (MeLi only)
    mediaPlanUSD:        '',
    // Step 99 — Uso de IA
    aiUsage:             '',
};

/** Maps step number → briefData key */
const STEP_TO_FIELD = {
    1:  'userNameField',
    2:  'campaignType',
    4:  'campaignName',
    5:  'brand',
    6:  'projectLeader',
    7:  'markets',
    8:  'objective',
    9:  'businessContext',
    10: 'challengeTweet',
    11: 'kpis',
    12: 'targetAudience',
    13: 'consumerInsight',
    14: 'brandTruth',
    15: 'culturalContext',
    16: 'keyMessage',
    17: 'meliEcosystem',
    18: 'promotionalMechanics',
    19: 'mediaFormats',
    20: 'launchDate',
    21: 'budget',
    22: 'referenceFiles',
    23: 'additionalData',
    98: 'mediaPlanUSD',
    99: 'aiUsage',
};

/** Tracks which step the bot last asked, so next user reply can be stored. */
let lastAskedStep = 0;

/**
 * Stores the current user answer under the correct briefData field,
 * based on which step the bot last asked about.
 */
function storeBriefAnswer(text) {
    const field = STEP_TO_FIELD[lastAskedStep];
    if (field && text && !text.startsWith('[DOCUMENTO ADJUNTO:')) {
        briefData[field] = text.trim();
    }
    // Always try to extract name/email regardless of step
    if (!briefData.userName && lastAskedStep === 1) {
        // Name is usually first word(s) before email
        const nameMatch = text.match(/^([^@\n,]+?)(?:\s*[,\n]|\s+[a-zA-Z0-9._%+\-]+@)/);
        if (nameMatch) briefData.userName = nameMatch[1].trim();
        else if (!text.includes('@')) briefData.userName = text.trim();
    }
    if (userEmail) briefData.userEmail = userEmail; // sync with MeLi detection
}

/**
 * Builds a structured brief text from briefData.
 * Empty fields show as "Por definir".
 * Called for PDF and email generation at any point in the conversation.
 */
function buildBriefFromData() {
    const nd = (v) => v && v.trim() ? v.trim() : 'Por definir';
    const date = new Date().toLocaleDateString('es-MX', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const mediaPlanLine = (isMeliUser && briefData.mediaPlanUSD)
        ? `\nMedia Plan (USD): ${nd(briefData.mediaPlanUSD)}` : '';

    return `
### 0. INFORMACIÓN GENERAL DEL PROYECTO
Nombre del proyecto / campaña: ${nd(briefData.campaignName)}
Marca / Cliente: ${nd(briefData.brand)}
Tipo de proyecto: ${nd(briefData.campaignType)}
Líderes: ${nd(briefData.projectLeader)}
Usuario: ${nd(briefData.userNameField || briefData.userName)}
Correo: ${nd(briefData.userEmail)}
Fecha de preparación: ${date}

### 1. OBJETIVO DE CAMPAÑA
${nd(briefData.objective)}

### 2. THE CHALLENGE
${nd(briefData.businessContext)}

**Brief en un Tweet:** ${nd(briefData.challengeTweet)}

### 3. MÉTRICAS DE ÉXITO (KPIs)
${nd(briefData.kpis)}

### 4. STRATEGIC FOUNDATION
Audiencia objetivo: ${nd(briefData.targetAudience)}

Insight del consumidor: ${nd(briefData.consumerInsight)}

Verdad de Marca: ${nd(briefData.brandTruth)}

Contexto Cultural: ${nd(briefData.culturalContext)}

### 5. MENSAJE CLAVE Y TERRITORIO EMOCIONAL
${nd(briefData.keyMessage)}

### 6. MELI ECOSYSTEM INTEGRATION
Ventajas del ecosistema: ${nd(briefData.meliEcosystem)}

Mecánicas promocionales: ${nd(briefData.promotionalMechanics)}

### 7. MEDIA ECOSYSTEM
${nd(briefData.mediaFormats)}

### 8. MERCADOS
${nd(briefData.markets)}

### 9. PRODUCTION CONSIDERATIONS
Fecha de lanzamiento: ${nd(briefData.launchDate)}
Presupuesto estimado: ${nd(briefData.budget)}${mediaPlanLine}

### 10. USO DE INTELIGENCIA ARTIFICIAL
${nd(briefData.aiUsage)}

### 11. APPENDIX
${nd(briefData.referenceFiles)}

Información adicional: ${nd(briefData.additionalData)}
`.trim();
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
    const pctEl = document.getElementById('brief-progress-pct');
    if (!fillEl || !pctEl) return;

    fillEl.style.width = pct + '%';
    pctEl.textContent = pct + '%';

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
    const statusRow = document.createElement('div');
    statusRow.className = 'bot-row';
    statusRow.innerHTML = `<img src="assets/MelissaIconChat.png" alt="MELISA" class="bot-avatar">`;
    const statusDiv = document.createElement('div');
    statusDiv.className = 'msg bot';
    statusDiv.innerHTML = `<span>🌴 Leyendo <b>${file.name}</b>...</span> ${createLoadingDots()}`;
    statusRow.appendChild(statusDiv);
    chat.appendChild(statusRow);
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
    detectUserEmail(text);       // check if user shared a MeLi email
    storeBriefAnswer(text);      // store answer under the current step
    await llamarAPI(text);
}

async function llamarAPI(originalText, _retry = true) {
    const chat = document.getElementById('chat-window');

    // Create avatar + bubble row
    const botRow = document.createElement('div');
    botRow.className = 'bot-row';
    const avatar = document.createElement('img');
    avatar.src = 'assets/MelissaIconChat.png';
    avatar.alt = 'MELISA';
    avatar.className = 'bot-avatar';
    const botDiv = document.createElement('div');
    botDiv.className = 'msg bot';
    botDiv.innerHTML = createLoadingDots();
    botRow.appendChild(avatar);
    botRow.appendChild(botDiv);
    chat.appendChild(botRow);
    chat.scrollTop = chat.scrollHeight;

    const url = `/api/chat`;

    // Limitar historial a los últimos 20 mensajes para evitar payloads grandes
    // que provocan ERR_HTTP2_SERVER_REFUSED_STREAM en Vercel Edge
    const historyToSend = conversationHistory.slice(-20);

    const payload = {
        system_instruction: {
            parts: [{ text: buildSystemPrompt() }]
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

        // Detect which step the bot just asked → next user reply will be stored under it
        const detectedStep = detectStepInText(botFullText);
        if (detectedStep > 0) lastAskedStep = detectedStep;

        // Update the progress bar after every bot response
        updateBriefProgress();

        // Render quick reply buttons if the message contains selectable options
        renderQuickReplies(botDiv, botFullText);

        // Detectar brief completo e inyectar botón de descarga como burbuja en el chat
        const searchTerms = ["resumen final para documento", "--- resumen final", "brief completo"];
        if (searchTerms.some(term => botFullText.toLowerCase().includes(term))) {
            showDownloadBubble();
        }

    } catch (e) {
        // Reintentar una vez en errores de red (ej. ERR_HTTP2_SERVER_REFUSED_STREAM)
        if (_retry) {
            botRow.remove();
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

/**
 * Detects selectable options in a bot message and renders pill buttons.
 * Handles: (A)/(B)/... lettered options, Sí/No, and language choices.
 */
function renderQuickReplies(botDiv, text) {
    // --- 1. Try to extract lettered options: **(A)** or (A) at line start ---
    const letterPattern = /^\s*\*?\*?\(([A-Da-d])\)\*?\*?\s+(.+)/gm;
    const letterMatches = [...text.matchAll(letterPattern)];

    if (letterMatches.length >= 2) {
        const options = letterMatches.map(m => ({
            label: `(${m[1].toUpperCase()}) ${m[2].trim().replace(/\*\*/g, '')}`,
            value: `(${m[1].toUpperCase()}) ${m[2].trim().replace(/\*\*/g, '')}`
        }));
        appendQuickReplies(options);
        return;
    }

    // --- 2. Sí / No ---
    const lower = text.toLowerCase();
    const isYesNo = /(\bsí\b|\bsi\b).*(\bno\b)|(\bno\b).*(\bsí\b|\bsi\b)/i.test(text)
        && !text.includes('(A)') && !text.includes('**(A)');
    // Trigger only when the question explicitly presents Sí/No as options
    const hasYesNoKeywords = /(\bsí o no\b|¿sí o no\?|yes or no|sí \/ no|\/\s*no)/i.test(text);
    if (hasYesNoKeywords) {
        appendQuickReplies([
            { label: '✅ Sí', value: 'Sí' },
            { label: '❌ No', value: 'No' }
        ]);
        return;
    }

    // --- 3. Language choice (first message only) ---
    if (/which language|qué idioma|en qué idioma|idioma.*prefer/i.test(text)) {
        appendQuickReplies([
            { label: '🇪🇸 Español', value: 'Español' },
            { label: '🇺🇸 English', value: 'English' },
            { label: '🇧🇷 Português', value: 'Português' }
        ]);
        return;
    }

    function appendQuickReplies(options) {
        const wrap = document.createElement('div');
        wrap.className = 'quick-replies';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'qr-btn';
            btn.textContent = opt.label;
            btn.onclick = () => {
                // Mark all quick reply groups in this batch as used
                wrap.classList.add('used');
                // Fill input and send
                const input = document.getElementById('userInput');
                input.value = opt.value;
                enviar();
            };
            wrap.appendChild(btn);
        });

        const chat = document.getElementById('chat-window');
        chat.appendChild(wrap);
        chat.scrollTop = chat.scrollHeight;
    }
}

function showDownloadBubble() {
    const chat = document.getElementById('chat-window');

    // ── Avatar row (same pattern as bot messages) ──
    const row = document.createElement('div');
    row.className = 'bot-row';

    const avatar = document.createElement('img');
    avatar.src = 'assets/MelissaIconChat.png';
    avatar.alt = 'MELISA';
    avatar.className = 'bot-avatar';

    const card = document.createElement('div');
    card.className = 'msg bot closing-card';
    card.innerHTML = `
        <p class="closing-title">✅ ¡Tu brief está listo!</p>
        <p class="closing-sub">Un brief completo es el punto de partida de todo proyecto exitoso. Cuanta más claridad aquí, mejores resultados. 🌴</p>

        <div class="next-steps">
            <p class="next-steps-label">¿Qué sigue?</p>
            <ol class="next-steps-list">
                <li>
                    <span class="ns-icon">📄</span>
                    <span><strong>Descarga el brief</strong> y compártelo con tu equipo interno para alinear visiones.</span>
                </li>
                <li>
                    <span class="ns-icon">📬</span>
                    <span><strong>Envía el brief a Trópica</strong> — lo revisaremos y te contactaremos para agendar el kick-off creativo.</span>
                </li>
                <li>
                    <span class="ns-icon">🎨</span>
                    <span><strong>Kick-off creativo</strong> — en esa sesión definimos territorios, referencias y primeras ideas.</span>
                </li>
                <li>
                    <span class="ns-icon">🚀</span>
                    <span><strong>Producción y entrega</strong> — Trópica lidera la ejecución creativa de principio a fin.</span>
                </li>
            </ol>
        </div>

        <button class="btn-download-brief" onclick="descargarBrief()">
            📄 Descargar Brief PDF
        </button>
    `;

    row.appendChild(avatar);
    row.appendChild(card);
    chat.appendChild(row);
    chat.scrollTop = chat.scrollHeight;
}

/**
 * Returns the brief content for PDF/email generation.
 * Priority: 1) briefData (live collected answers)
 *           2) RESUMEN FINAL marker in history (MELISA's final summary)
 *           3) Last model message (last resort)
 */
function getFinalBriefContent() {
    // ① Build from live data if we have meaningful content
    const liveFields = Object.values(briefData).filter(v => v && v.trim());
    if (liveFields.length >= 3) {
        return buildBriefFromData();
    }

    // ② Fall back to MELISA's final summary marker
    for (let i = conversationHistory.length - 1; i >= 0; i--) {
        const text = conversationHistory[i].parts[0].text;
        if (text.includes("--- RESUMEN FINAL PARA DOCUMENTO ---")) {
            const parts = text.split("--- RESUMEN FINAL PARA DOCUMENTO ---");
            return parts[parts.length - 1].trim();
        }
    }

    // ③ Last resort: last model message
    for (let i = conversationHistory.length - 1; i >= 0; i--) {
        if (conversationHistory[i].role === "model") {
            return conversationHistory[i].parts[0].text;
        }
    }
    return '';
}

// ── Helper: load asset as base64 via fetch (no CORS canvas issues) ──
async function loadAsBase64(url) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`No se pudo cargar: ${url}`);
    const blob = await resp.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// ── Helper: convierte SVG a PNG base64 para jsPDF ──
async function loadSvgAsPng(url, targetW = 800, targetH = 200) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`No se pudo cargar SVG: ${url}`);
    const svgText = await resp.text();
    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const blobUrl = URL.createObjectURL(blob);
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const w = img.naturalWidth  || targetW;
            const h = img.naturalHeight || targetH;
            const canvas = document.createElement('canvas');
            canvas.width  = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(blobUrl);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = (e) => { URL.revokeObjectURL(blobUrl); reject(e); };
        img.src = blobUrl;
    });
}

async function descargarBrief() {
    try {
        const { jsPDF } = window.jspdf;
        const finalSummary = getFinalBriefContent();
        if (!finalSummary) { alert('Aún no hay un brief final para descargar.'); return; }

        // ── Cargar assets de marca ───────────────────────────────────
        const [fondoB64] = await Promise.all([
            loadAsBase64('assets/fondo.jpg'),
        ]);

        // ── Configuración del PDF ────────────────────────────────────
        const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
        const PW = doc.internal.pageSize.getWidth();   // 210 mm
        const PH = doc.internal.pageSize.getHeight();  // 297 mm

        // Colores de marca
        const YELLOW = [255, 230, 0];
        const BLUE = [18, 89, 195];
        const DARK = [0, 48, 135];
        const WHITE = [255, 255, 255];
        const GREY = [65, 65, 65];

        // ── Chrome: cintillo amarillo + logo ML + fondo + footer ──────
        const FOOTER_H = 10;
        const ML = 18;
        const MR = 18;
        const BANNER_H = 22;
        const TW = PW - ML - MR;
        const Y_START = BANNER_H + 8;
        const Y_END = PH - FOOTER_H - 4;
        function drawChrome(pgNum) {
            // 1. Fondo completo
            doc.addImage(fondoB64, 'JPEG', 0, 0, PW, PH);
            // 2. Panel blanco para el contenido
            doc.setFillColor(255, 255, 255);
            doc.rect(0, BANNER_H, PW, PH - BANNER_H - FOOTER_H, 'F');
            // 4. Cintillo amarillo puro (sin logo)
            doc.setFillColor(...YELLOW);
            doc.rect(0, 0, PW, BANNER_H, 'F');
            // 5. Línea separadora sutil
            doc.setFillColor(240, 200, 0);
            doc.rect(0, BANNER_H, PW, 0.8, 'F');
            // 6. Footer azul oscuro
            doc.setFillColor(...DARK);
            doc.rect(0, PH - FOOTER_H, PW, FOOTER_H, 'F');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(6.5);
            doc.setTextColor(...WHITE);
            doc.text('MELISA — Documento Estratégico de Campaña', ML, PH - 3.8);
            doc.text(`Página ${pgNum}`, PW - MR, PH - 3.8, { align: 'right' });
        }

        // ── Parser de contenido del brief ────────────────────────────
        // NO descarta nada útil. Clasifica cada línea por tipo.
        function parseContent(rawText) {
            const result = [];
            for (const raw of rawText.split('\n')) {
                const t = raw.trim();

                // Saltar solo separadores y marcadores internos
                if (!t) { result.push({ type: 'spacer' }); continue; }
                if (t.startsWith('---')) continue;

                let type = 'body';
                let content = t.replace(/\*\*/g, '');   // quitar negritas markdown

                // Sección: ### Título  ó  **TÍTULO EN CAPS**  ó  "N. TÍTULO"
                if (/^#{1,3}\s/.test(raw)) {
                    type = 'section';
                    content = t.replace(/^#+\s*/, '').replace(/\*\*/g, '');
                } else if (/^\*\*[^*]+\*\*$/.test(t)) {
                    type = 'section';
                    content = t.replace(/\*\*/g, '');
                } else if (/^\d+[\.\)]\s+[A-ZÁÉÍÓÚÑ]/.test(t)) {
                    type = 'section';
                    content = t.replace(/\*\*/g, '');
                }
                // Bullet: empieza con - * • ·
                else if (/^[-*•·]\s/.test(t)) {
                    type = 'bullet';
                    content = t.replace(/^[-*•·]\s+/, '').replace(/\*\*/g, '');
                }
                // Label: "Clave: valor" donde la clave es corta
                else if (/^[^:]{1,40}:\s+\S/.test(t)) {
                    type = 'label';
                    content = t.replace(/\*\*/g, '');
                }

                result.push({ type, content });
            }
            return result;
        }

        // ── Renderizado ──────────────────────────────────────────────
        const items = parseContent(finalSummary);
        let page = 1;
        drawChrome(page);
        let y = Y_START;

        const LINE_H_BODY = 4.6;
        const LINE_H_SECTION = 5.5;

        for (const item of items) {
            // Espacio en blanco
            if (item.type === 'spacer') {
                y += 1.5;
                if (y > Y_END) { doc.addPage(); page++; drawChrome(page); y = Y_START; }
                continue;
            }

            const { type, content } = item;

            // ── Sección ──────────────────────────────────────────────
            if (type === 'section') {
                y += 3; // espacio extra antes de cada sección
                const wrp = doc.splitTextToSize(content, TW - 7);
                const barH = wrp.length * LINE_H_SECTION + 2;
                const blockH = barH + 5;

                if (y + blockH > Y_END) {
                    doc.addPage(); page++; drawChrome(page); y = Y_START;
                }

                // Barra amarilla lateral
                doc.setFillColor(...YELLOW);
                doc.rect(ML, y, 3, barH, 'F');

                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10.5);
                doc.setTextColor(...DARK);
                doc.text(wrp, ML + 6, y + LINE_H_SECTION);

                y += blockH;
                continue;
            }

            // ── Bullet ───────────────────────────────────────────────
            if (type === 'bullet') {
                const wrp = doc.splitTextToSize(content, TW - 8);
                const blockH = wrp.length * LINE_H_BODY + 2;

                if (y + blockH > Y_END) {
                    doc.addPage(); page++; drawChrome(page); y = Y_START;
                }

                doc.setFillColor(...BLUE);
                doc.circle(ML + 2.5, y + LINE_H_BODY - 0.5, 0.9, 'F');

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(...GREY);
                doc.text(wrp, ML + 7, y + LINE_H_BODY);

                y += blockH;
                continue;
            }

            // ── Label (Clave: valor) ──────────────────────────────────
            if (type === 'label') {
                const colon = content.indexOf(':');
                const key = content.slice(0, colon + 1);
                const val = content.slice(colon + 1).trim();
                const valWrp = doc.splitTextToSize(val || ' ', TW - 4);
                const blockH = valWrp.length * LINE_H_BODY + 2;

                if (y + blockH > Y_END) {
                    doc.addPage(); page++; drawChrome(page); y = Y_START;
                }

                // Label key en azul bold
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(9);
                doc.setTextColor(...BLUE);
                doc.text(key, ML, y + LINE_H_BODY);
                const kw = doc.getTextWidth(key) + 1.5;

                // Valor en gris regular
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...GREY);
                doc.text(valWrp, ML + kw, y + LINE_H_BODY);

                y += blockH;
                continue;
            }

            // ── Body (texto regular) ─────────────────────────────────
            const wrp = doc.splitTextToSize(content, TW);
            const blockH = wrp.length * LINE_H_BODY + 1;

            if (y + blockH > Y_END) {
                doc.addPage(); page++; drawChrome(page); y = Y_START;
            }

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...GREY);
            doc.text(wrp, ML, y + LINE_H_BODY);
            y += blockH;
        }

        // Save locally
        doc.save('Brief_MELISA.pdf');

        // Send backup copy by email (fire-and-forget)
        try {
            const pdfBase64 = doc.output('datauristring').split(',')[1];
            sendBriefByEmail(pdfBase64);
        } catch (mailErr) {
            console.warn('Email send failed silently:', mailErr);
        }

    } catch (e) {
        console.error('Error generando PDF:', e);
        descargarBriefSimple();
    }
}

/**
 * Sends the generated PDF brief to the Trópica backup email.
 * Runs silently — errors don't block the user flow.
 */
async function sendBriefByEmail(pdfBase64, isTest = false) {
    // Sync email into briefData before sending
    if (userEmail) briefData.userEmail = userEmail;

    const payload = {
        pdfBase64: pdfBase64 || null,
        briefData,          // full structured data for email summary
        isMeliUser,         // to show/hide media plan line
        isTest,
    };

    const res = await fetch('/api/send-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const err = await res.text();
        console.warn('send-brief API error:', err);
    } else {
        console.log('[MELISA] Brief email sent ✅');
    }
}

/**
 * Debug: sends a test email without needing a full brief.
 */
async function debugEnviarCorreo() {
    const btn = document.getElementById('debugEmailBtn');
    if (btn) { btn.textContent = '⏳...'; btn.disabled = true; }
    try {
        await sendBriefByEmail(null, true);
        if (btn) { btn.textContent = '✅ Enviado'; }
    } catch (e) {
        console.error(e);
        if (btn) { btn.textContent = '❌ Error'; }
    } finally {
        setTimeout(() => { if (btn) { btn.textContent = '📧 Email'; btn.disabled = false; } }, 3000);
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
    const width = 170;

    finalSummary.split('\n').forEach(line => {
        let processed = line.replace(/^\s*[\*\-\•]\s*/, '• ');
        if (processed.trim() === '' || processed.startsWith('---')) return;

        const isTitle = processed.startsWith('###') || /^\d+[\)\.]/.test(processed) || /^[A-Z\s]{5,}$/.test(processed.trim());
        const cleanText = processed.replace(/###\s*/, '').replace(/\*\*/g, '').trim();
        const isBullet = processed.startsWith('•');

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




// ══════════════════════════════════════════════════════════════════
// 🐞  DEBUG PDF — genera el brief completo en cualquier momento
//     con las secciones llenas o vacías según el avance.
// ══════════════════════════════════════════════════════════════════
async function debugGenerarPDF() {
    const btn = document.getElementById('debugPdfBtn');
    if (btn) { btn.textContent = '⏳...'; btn.disabled = true; }

    try {
        const { jsPDF } = window.jspdf;

        // ── 1. Cargar assets con reporte de error visible ─────────────
        let fondoB64 = null;
        try {
            fondoB64 = await loadAsBase64('assets/fondo.jpg');
        } catch (assetErr) {
            alert('❌ Error cargando fondo.jpg:\n' + assetErr.message);
            return;
        }

        // ── 2. Configuración del PDF ──────────────────────────────────
        const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
        const PW = doc.internal.pageSize.getWidth();
        const PH = doc.internal.pageSize.getHeight();

        const YELLOW = [255, 230, 0];
        const BLUE = [18, 89, 195];
        const DARK = [0, 48, 135];
        const WHITE = [255, 255, 255];
        const GREY = [65, 65, 65];
        const LIGHT = [180, 180, 180];

        const BANNER_H = 30;
        const FOOTER_H = 10;
        const ML = 18, MR = 18;
        const TW = PW - ML - MR;
        const Y_START = BANNER_H + 8;
        const Y_END = PH - FOOTER_H - 4;
        const LH = 4.6;   // line height body
        const SH = 5.5;   // line height section

        let page = 1;
        let y = Y_START;

        // ── 3. Chrome: cintillo amarillo + logo ML + footer ─────────
        function chrome(n) {
            doc.addImage(fondoB64, 'JPEG', 0, 0, PW, PH);
            doc.setFillColor(255, 255, 255);
            doc.rect(0, BANNER_H, PW, PH - BANNER_H - FOOTER_H, 'F');
            // Cintillo amarillo puro
            doc.setFillColor(...YELLOW);
            doc.rect(0, 0, PW, BANNER_H, 'F');
            // Línea separadora
            doc.setFillColor(240, 200, 0);
            doc.rect(0, BANNER_H, PW, 0.8, 'F');
            // Footer
            doc.setFillColor(...DARK);
            doc.rect(0, PH - FOOTER_H, PW, FOOTER_H, 'F');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(6.5);
            doc.setTextColor(...WHITE);
            doc.text('MELISA — Documento Estratégico de Campaña', ML, PH - 3.8);
            doc.text(`Página ${n}`, PW - MR, PH - 3.8, { align: 'right' });
        }
        chrome(page);

        function newPage() {
            doc.addPage(); page++; chrome(page); y = Y_START;
        }
        function ensure(h) { if (y + h > Y_END) newPage(); }

        // ── 4. Helpers de renderizado ────────────────────────────────
        function addSection(title) {
            ensure(16);
            y += 4;
            const lines = doc.splitTextToSize(title, TW - 7);
            const barH = lines.length * SH + 2;
            doc.setFillColor(...YELLOW);
            doc.rect(ML, y, 3, barH, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10.5);
            doc.setTextColor(...DARK);
            doc.text(lines, ML + 6, y + SH);
            y += barH + 6;
        }

        function addBody(text) {
            if (!text || !text.trim()) return;
            const clean = text.replace(/\*\*/g, '').trim();
            const lines = doc.splitTextToSize(clean, TW);
            ensure(lines.length * LH + 2);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...GREY);
            doc.text(lines, ML, y + LH);
            y += lines.length * LH + 1.5;
        }

        function addBullet(text) {
            if (!text || !text.trim()) return;
            const clean = text.replace(/^[-*•]\s*/, '').replace(/\*\*/g, '').trim();
            const lines = doc.splitTextToSize(clean, TW - 8);
            ensure(lines.length * LH + 2);
            doc.setFillColor(...BLUE);
            doc.circle(ML + 2.5, y + LH - 0.5, 0.9, 'F');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...GREY);
            doc.text(lines, ML + 7, y + LH);
            y += lines.length * LH + 1.5;
        }

        function addEmpty() {
            ensure(10);
            doc.setDrawColor(...LIGHT);
            doc.setLineDashPattern([1.5, 1.5], 0);
            doc.line(ML, y + 4, PW - MR, y + 4);
            doc.setLineDashPattern([], 0);
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(8);
            doc.setTextColor(...LIGHT);
            doc.text('(pendiente)', ML, y + 8.5);
            y += 13;
        }

        // ── 5. Extraer contenido de la conversación ─────────────────
        // Concatena todos los mensajes del modelo para búsqueda
        const allBot = conversationHistory
            .filter(m => m.role === 'model')
            .map(m => m.parts[0].text)
            .join('\n\n');

        // Intenta obtener el resumen final estructurado
        const finalContent = getFinalBriefContent();
        const hasFinal = finalContent &&
            (finalContent.includes('INFORMACIÓN GENERAL') ||
                finalContent.includes('OBJETIVO') ||
                finalContent.toLowerCase().includes('resumen final'));

        // ── 6. Renderizar ────────────────────────────────────────────
        if (hasFinal) {
            // ── Modo A: Brief completo — parsear y rendir cada línea ──
            addSection('📋 BRIEF ESTRATÉGICO COMPLETO');
            for (const raw of finalContent.split('\n')) {
                const t = raw.trim();
                if (!t || t.startsWith('---')) continue;
                if (/^#{1,3}\s|^\*\*[^*]+\*\*$|^\d+[\.\)]\s+[A-ZÁÉÍ]/.test(raw)) {
                    addSection(t.replace(/^#+\s*|\*\*/g, ''));
                } else if (/^[-*•·]\s/.test(t)) {
                    addBullet(t);
                } else {
                    addBody(t);
                }
            }
        } else {
            // ── Modo B: Brief parcial — template con lo recolectado ──
            const SECTIONS = [
                {
                    title: '0. INFORMACIÓN GENERAL DEL PROYECTO',
                    hints: ['nombre', 'marca', 'cliente', 'líder', 'lider', 'mercado', 'país']
                },
                {
                    title: '1. OBJETIVO DE CAMPAÑA',
                    hints: ['objetivo', 'lanzamiento', 'brand awareness', 'performance', 'estacional']
                },
                {
                    title: '2. THE CHALLENGE',
                    hints: ['desafío', 'desafio', 'reto', 'contexto de negocio', 'mercado', 'tweet']
                },
                {
                    title: '3. MÉTRICAS DE ÉXITO (KPIs)',
                    hints: ['métrica', 'kpi', 'conversión', 'share of voice', 'recordación']
                },
                {
                    title: '4. STRATEGIC FOUNDATION',
                    hints: ['público objetivo', 'consumidor', 'insight', 'verdad de marca', 'cultural']
                },
                {
                    title: '5. MENSAJE CLAVE Y TERRITORIO EMOCIONAL',
                    hints: ['mensaje clave', 'territorio emocional', 'sentimiento', 'orgullo', 'alegría']
                },
                {
                    title: '6. CREATIVE STRATEGY',
                    hints: ['estrategia creativa', 'idea', 'concepto creativo']
                },
                {
                    title: '7. CAMPAIGN ARCHITECTURE',
                    hints: ['arquitectura', 'fases', 'despliegue']
                },
                {
                    title: '8. MELI ECOSYSTEM INTEGRATION',
                    hints: ['ecosistema', 'meli play', 'alianzas', 'mecánica', 'descuento', 'cashback']
                },
                {
                    title: '9. MEDIA ECOSYSTEM',
                    hints: ['formatos', 'home slider', 'banners rtb', 'notificaciones push', 'ooh']
                },
                {
                    title: '10. PRODUCTION CONSIDERATIONS',
                    hints: ['fecha de lanzamiento', 'presupuesto']
                },
                {
                    title: '11. USO DE INTELIGENCIA ARTIFICIAL',
                    hints: ['inteligencia artificial', 'ia para', 'generar contenido', 'uso de ia']
                },
                {
                    title: '12. APPENDIX — ARCHIVOS Y DATOS',
                    hints: ['drive', 'onedrive', 'dropbox', 'archivos', 'key visual', 'dato adicional']
                },
            ];

            const botLines = allBot.split('\n').map(l => l.trim()).filter(Boolean);

            for (const { title, hints } of SECTIONS) {
                addSection(title);

                // Buscar líneas relevantes en la conversación
                const relevant = botLines.filter(line =>
                    hints.some(h => line.toLowerCase().includes(h))
                );

                if (relevant.length > 0) {
                    // Tomar máximo 8 líneas para no llenar la sección
                    for (const line of relevant.slice(0, 8)) {
                        if (/^[-*•]\s/.test(line)) addBullet(line);
                        else addBody(line);
                    }
                } else {
                    addEmpty();
                }
            }
        }

        doc.save('Brief_DEBUG_MELISA.pdf');

    } catch (e) {
        alert('❌ Error al generar el PDF de debug:\n\n' + e.message + '\n\n' + (e.stack || ''));
    } finally {
        if (btn) { btn.textContent = '🐞 PDF'; btn.disabled = false; }
    }
}
