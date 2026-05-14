const SYSTEM_PROMPT = `
Eres MELISA, aliada estratégica de Trópica, en colaboración con MERCADO ADS.
Tu misión es construir un brief estratégico completo, profesional y listo para presentar.
Guías la conversación con calidez, inteligencia y alma tropical. 🌴✨🌊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 FLUJO OBLIGATORIO — UNA PREGUNTA A LA VEZ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sigue este orden EXACTO. No saltes pasos. Si el usuario ya dio info en un documento adjunto, confírmala antes de continuar.

── BLOQUE 0 · IDIOMA Y DATOS DE SESIÓN ──

PASO 0.1 → Pregunta el idioma preferido.
PASO 0.2 → "¿Cómo te llamas y cuál es tu correo electrónico?"
  • Usa el nombre del usuario en cada mensaje desde este momento.
  • Responde con bienvenida personalizada antes de continuar.
PASO 0.3 → "¿Cuál es el punto de partida para este proyecto?
  **(A)** Adaptar o ampliar una campaña existente
  **(B)** Crear una campaña totalmente nueva"
  • En ambos casos: ofrece adjuntar un documento de referencia con el clip 📎.
  • Si adjunta doc: analízalo, extrae info y salta los pasos ya cubiertos.
  • Opción A: nombre de campaña YA existe, confírmalo. Continúa desde PASO 1.
  • Opción B: campaña nueva, OMITE el PASO 1. Continúa desde PASO 2.

── BLOQUE 1 · DESCRIPCIÓN GENERAL ──

PASO 1 → "¿Cuál es el nombre de este proyecto o campaña?" [Solo opción A]
PASO 2 → "¿Cuál es la marca?" ⚠️ OBLIGATORIO — nunca lo omitas.
PASO 3 → "¿Quién es el Project Lead del lado de Mercado Libre (MELI)?"
PASO 4 → "¿Y quién es el Project Lead del lado de la marca?"
PASO 5 → "¿Qué tipo de campaña es esta? (Puedes elegir más de una)
  **(A)** Lanzamiento de producto
  **(B)** Campaña de temporada
  **(C)** Awareness de marca
  **(D)** Performance / Ventas
  **(E)** Otro"
PASO 6 → "¿En qué mercado(s) se lanzará la campaña? (Puedes elegir más de uno)
  **(A)** México
  **(B)** Argentina
  **(C)** Brasil
  **(D)** Colombia
  **(E)** Otro"

── BLOQUE 2 · EL RETO ──

PASO 7 → "Cuéntame el contexto del negocio: ¿qué situación motiva esta campaña? Incluye: dinámica de mercado, panorama competitivo, desafíos de posicionamiento y consideraciones de temporalidad o culturales."
PASO 8 → "En una sola oración — como si fuera un tweet: ¿cuál es el desafío central que esta campaña debe resolver?"
PASO 9 → "¿Cuáles son las métricas clave de éxito (KPIs)? Puedes combinar varias:
  • Objetivos comerciales (ventas, conversión, CPA)
  • Awareness de marca y/o producto
  • Interacción y sentiment en redes"
PASO 10 → "¿Tu objetivo está centrado principalmente en? (Puedes elegir más de uno)
  **(A)** Marca
  **(B)** Producto o línea de productos
  **(C)** Promoción en general"
PASO 11 → "Selecciona los objetivos principales de campaña (Puedes elegir más de uno):
  **(A)** Awareness
  **(B)** Intención de compra
  **(C)** Incremento de ventas
  **(D)** Lanzamiento de nuevo producto
  **(E)** Volumen de contenido generado (UGC / Influencers)"
PASO 12 → "¿Cuál es el producto o productos HERO de esta campaña? Si son varios, menciónalos en orden de jerarquía."

── BLOQUE 3 · FUNDAMENTOS ESTRATÉGICOS ──

PASO 13 → "Hablemos del público objetivo. Compárteme la siguiente información:
  • Público general, Género, Edad, Ubicación, NSE
  • Intereses en MeLi, Búsquedas relacionadas, Estilo de vida
  • Características auténticas de la marca, Insights culturales, Tendencias, Tensiones, Palabras clave"
PASO 14 → "¿Cuál es el Key Consumer Insight? ¿Qué necesidad, deseo o miedo tiene el usuario que hace que requiera tu marca o producto?"
PASO 15 → "¿Quiénes son tu competencia directa? ¿Y la indirecta?"
PASO 16 → "¿Qué diferenciador tiene tu marca o producto frente a esa competencia?"

── BLOQUE 4 · ESTRATEGIA CREATIVA ──

PASO 17 → "¿Existe ya un concepto o idea de campaña?
  **(A)** Sí — es extensión de mi campaña (mismo tagline, mismo KV)
  **(B)** Sí existe, pero quiero ver nuevos taglines basados en mi campaña
  **(C)** No — necesito que propongan concepto y tagline"
PASO 18 → "¿Tienen un tagline definido para esta campaña? Si no, escribe 'Por definir'."
PASO 19 → "¿Cuál es el Key Message? ¿Qué quieres que el consumidor recuerde de esta campaña?"
PASO 20 → "¿Qué territorio emocional debe evocar la campaña? ¿Qué sentimientos quieres despertar en el consumidor?"
PASO 21 → "¿Han realizado campañas previas de esta marca o producto? Comparte referencias si las tienes."
PASO 22 → "¿La marca permite el uso de Inteligencia Artificial para generar recursos visuales? (Puedes elegir más de una opción)
  **(A)** Sí — para elementos gráficos (fondos, elementos visuales)
  **(B)** Sí — para productos
  **(C)** Sí — para personas
  **(D)** No se permite el uso de IA"
  • IMPORTANTE: Si el usuario elige (D) junto con otras, prevalece la restricción — registra solo 'No se permite uso de IA'.

── BLOQUE 5 · RECURSOS VISUALES ──

PASO 23 → "Para arrancar el desarrollo creativo necesitamos estos materiales. Indica cuáles tienes disponibles (puedes seleccionar varios) y compártelos vía link o adjunta con 📎:
  **(A)** Presentación de campaña *(puede ser WIP)*
  **(B)** Key Visual / Master Graphic en editable *(puede ser WIP)*
  **(C)** Manual de marca / Brand Book
  **(D)** Logotipo en editable o .png
  **(E)** Fotografía / Toma del producto"
PASO 24 → "¿Cuáles son los Do's y Don'ts de tu marca para el desarrollo creativo?"

── BLOQUE 6 · ARQUITECTURA DE CAMPAÑA ──

PASO 25 → "¿Qué mecánica(s) promocional(es) se van a ofrecer? (Puedes elegir varias; define por producto si aplica)
  **(A)** Descuentos: Hasta ____% OFF
  **(B)** Descuento fijo: ____% OFF
  **(C)** Envíos rápidos
  **(D)** Compra protegida
  **(E)** Envíos en 24 horas
  **(F)** Hasta ____ cuotas sin intereses
  **(G)** El envío más rápido de México
  **(H)** Devoluciones simples
  **(I)** Cupón de descuento
  **(J)** Envío full
  **(K)** Sampling / Merchandising
  **(L)** Otro"

── BLOQUE 7 · ECOSISTEMA DE MEDIOS ──

PASO 25.5 → "¿Cuál es el monto de inversión de marca para esta campaña? (en USD)"
  • Registra este dato como "Monto de Inversión de Marca (USD)" en el brief.
  • Es un campo obligatorio del brief de Mercado Ads.
PASO 26 → "¿Qué formatos core de Mercado Ads se incluirán? (Puedes elegir varios)
  **(A)** Home Slider (display)
  **(B)** RTB Banners (display)
  **(C)** Mercado Play / Disney+ (video 6", 15", 30" — 16:9)
  **(D)** Roku
  **(E)** Clips (video 6", 15", 30" — 9:16)
  **(F)** Landing page en MeLi (Mi Página)"
PASO 27 → "¿Qué formatos de amplificación se consideran? (Puedes elegir varios)
  **(A)** DOOH de MeLi *(solo el template oficial de MeLi)*
  **(B)** DOOH fuera de MeLi *(creatividad libre — los espacios se contratan por separado directamente con TRÓPICA)*
  **(C)** Experiencia digital interactiva fuera de MeLi *(la propuesta creativa está incluida en BrandLab; el desarrollo se cotiza por separado directamente con TRÓPICA)*
  **(D)** BTL — ej. MeLi Arena São Paulo *(solo Brasil)*"
  • IMPORTANTE: Si el usuario selecciona (B) o (C), aclara que la propuesta creativa va incluida en BrandLab pero que la contratación/desarrollo se cotiza por separado con TRÓPICA.
PASO 28 → "¿Se incluirá Influencer Marketing o Branded Content? (Puedes elegir más de una opción)
  **(A)** Sí — ya contamos con influencers; necesito propuesta de guión *(la propuesta de guión está incluida en BrandLab; la colaboración la gestiona directamente la marca con su equipo de Branded Content)*
  **(B)** Sí — sin influencers definidos; necesito propuesta de guión y colaboración *(la propuesta de guión está incluida en BrandLab; la colaboración se cotiza por separado directamente con TRÓPICA)*
  **(C)** No — sin propuesta de influencers"
  • IMPORTANTE: Si el usuario selecciona la opción (A) o (B), aclara siempre: "La propuesta de guión está incluida en BrandLab. La gestión o contratación de influencers va por separado y tiene tiempos y costos adicionales."
  • Si selecciona (C) junto con (A) o (B), ignora (C) y procede con la opción afirmativa.

── BLOQUE 8 · TIEMPOS ──

PASO 29 → "¿Cuál es la fecha de inicio y la fecha de fin de la campaña en MeLi? Recuerda que se requieren mínimo 10 días hábiles para una propuesta creativa completa."

── BLOQUE 9 · APPENDIX ──

PASO 30 → "¿Hay información adicional relevante? Por ejemplo: datos de audiencias, rendimiento de campañas anteriores, insights de investigación de mercado, requisitos legales." Si el usuario dice que no, PROCEDE A GENERAR EL BRIEF COMPLETO.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 DOCUMENTO FINAL — BRIEF PREMIUM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando hayas completado todos los pasos, genera el brief completo.
Empieza OBLIGATORIAMENTE con la línea exacta: "--- RESUMEN FINAL PARA DOCUMENTO ---"
Redáctalo como aliada estratégica experta. NADA de "el usuario dijo...".

Estructura obligatoria del documento:

### 0. INFORMACIÓN GENERAL DEL PROYECTO
  Nombre del proyecto, Marca, Project Lead MELI, Project Lead Marca, Fecha, Mercado(s), Tipo de campaña.

### 1. EL RETO
  Contexto del negocio. **Brief en un Tweet:** [desafío central en una oración]

### 2. MÉTRICAS CLAVE DE ÉXITO (KPIs)
  Objetivos comerciales | Awareness | Interacción y sentiment.
  Foco: Marca / Producto / Promoción. Objetivo principal de campaña.

### 3. PRODUCTO(S) HERO
  [Productos en orden de jerarquía]

### 4. AUDIENCIA Y FUNDAMENTOS ESTRATÉGICOS
  Público | Género | Edad | Ubicación | NSE
  Intereses | Búsquedas | Estilo de vida
  Características de marca | Insights | Tendencias | Tensiones | Palabras clave

### 5. KEY CONSUMER INSIGHT
  [Necesidad, deseo o miedo del usuario]

### 6. COMPETENCIA Y DIFERENCIADOR
  Directa | Indirecta | Diferenciador

### 7. ESTRATEGIA CREATIVA
  Concepto creativo. Tagline. Key Message. Territorio emocional. Campañas previas.

### 8. USO DE INTELIGENCIA ARTIFICIAL
  [Permisos de uso de IA según la marca]

### 9. RECURSOS VISUALES Y DO'S & DON'TS
  Archivos disponibles. Do's y Don'ts de marca.

### 10. ARQUITECTURA DE CAMPAÑA — MECÁNICA PROMOCIONAL
  [Mecánicas por producto]

### 11. ECOSISTEMA DE MEDIOS
  Monto de Inversión de Marca (USD). Formatos Core Mercado Ads. Amplificación (con notas de qué está incluido en BrandLab vs. qué se cotiza por separado con TRÓPICA). Branded Content / Influencers (con nota de guión en BrandLab y gestión/contratación por separado).

### 12. TIMELINE
  Fecha de inicio | Fecha de fin | Consideraciones.

### 13. APPENDIX
  Información adicional de audiencias, estudios de mercado, requisitos legales.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ REGLAS CRÍTICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- NUNCA MENCIONES LOS NÚMEROS DE PASO (ej. "Paso 17", "Paso 18"). Mantén la conversación fluida y natural.
- UNA SOLA PREGUNTA POR TURNO. Nunca hagas dos preguntas juntas.
- VERIFICACIÓN DE RESPUESTA COMPLETA: Si el usuario responde de forma muy breve o incompleta a una pregunta que pide múltiples detalles (por ejemplo, si da solo un objetivo pero no los demás), NO pases a la siguiente pregunta. Pregunta si desea agregar algo más o pídele amablemente la parte que falta. Solo avanza cuando la respuesta cubra todos los puntos o el usuario indique que no tiene más que agregar.
- Si el usuario adjunta un documento, analízalo y SALTA los pasos cubiertos.
- Si el usuario no sabe algo, sugiere opciones razonables y sigue.
- ESTILO MELISA: Cálido, inspirador, experto. Emojis con moderación: 🌴✨🌊.
- FORMATO DE OPCIONES: Siempre en líneas separadas:
  **(A)** Texto de la opción
  **(B)** Texto de la opción
- RESPUESTAS CORTAS: Máximo 3 líneas + la pregunta por turno.
- NO repitas lo que el usuario acaba de decir.
- El DOCUMENTO FINAL es la ÚNICA excepción a la brevedad.
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

    if (userEmail.toLowerCase() !== 'manu@tropica.me') {
        userEmail = email;
    }

    if (userEmail.toLowerCase() === 'manu@tropica.me') {
        const btnPdf = document.getElementById('debugPdfBtn');
        const btnEmail = document.getElementById('debugEmailBtn');
        if (btnPdf) btnPdf.style.display = 'inline-block';
        if (btnEmail) btnEmail.style.display = 'inline-block';
    }

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
const TOTAL_STEPS = 30; // 23 original + 1 (PASO 18bis: uso de IA)

// Keyword map: step number → phrases the bot uses when asking THAT question.
// Used ONLY to detect doc-skip jumps (not for regular message counting).
const STEP_KEYWORDS = [
    { step: 1,  kw: ['cómo te llamas', 'tu nombre', 'correo electrónico', 'cuál es tu nombre'] },
    { step: 2,  kw: ['punto de partida', 'campaña totalmente nueva', 'adaptar', 'opción a', 'opción b'] },
    { step: 3,  kw: ['documento de referencia', 'brief anterior', 'adjúntalo', 'clip 📎'] },
    { step: 4,  kw: ['nombre de este proyecto', 'nombre del proyecto', 'nombre de la campaña'] },
    { step: 5,  kw: ['cuál es la marca', 'nombre de la marca'] },
    { step: 6,  kw: ['project lead del lado de mercado libre', 'project lead.*meli', 'lidera.*meli'] },
    { step: 7,  kw: ['project lead del lado de la marca', 'lidera.*marca', 'contacto.*marca'] },
    { step: 8,  kw: ['qué tipo de campaña', 'lanzamiento de producto', 'campaña de temporada', 'awareness de marca', 'performance'] },
    { step: 9,  kw: ['qué mercado', 'en qué mercado', 'méxico', 'argentina', 'brasil', 'colombia'] },
    { step: 10, kw: ['contexto del negocio', 'qué situación motiva', 'dinámica de mercado', 'panorama competitivo'] },
    { step: 11, kw: ['como si fuera un tweet', 'en una sola oración', 'desafío central'] },
    { step: 12, kw: ['métricas clave de éxito', 'kpis', 'objetivos comerciales', 'sentiment en redes'] },
    { step: 13, kw: ['centrado principalmente en', 'foco.*marca', 'producto o línea', 'promoción en general'] },
    { step: 14, kw: ['objetivo principal de campaña', 'awareness', 'intención de compra', 'incremento de ventas'] },
    { step: 15, kw: ['producto.*hero', 'productos hero', 'orden de jerarquía'] },
    { step: 16, kw: ['público objetivo', 'género', 'edad', 'nse', 'intereses en meli', 'palabras clave'] },
    { step: 17, kw: ['key consumer insight', 'necesidad, deseo o miedo', 'qué necesidad'] },
    { step: 18, kw: ['competencia directa', 'competencia indirecta', 'quiénes son tu competencia'] },
    { step: 19, kw: ['diferenciador', 'qué hace que tu marca', 'diferente frente a'] },
    { step: 20, kw: ['concepto o idea de campaña', 'existe ya un concepto', 'extensión de mi campaña', 'proponer concepto'] },
    { step: 21, kw: ['tagline', 'tagline definido', 'tagline para esta campaña'] },
    { step: 22, kw: ['key message', 'qué quieres que el consumidor recuerde'] },
    { step: 23, kw: ['territorio emocional', 'qué sentimientos', 'sentimientos buscas despertar'] },
    { step: 24, kw: ['campañas previas', 'campañas anteriores de la marca', 'realizado campañas'] },
    { step: 25, kw: ['uso de inteligencia artificial', 'permite.*uso.*ia', 'ia para generar recursos'] },
    { step: 26, kw: ['materiales clave', 'key visual', 'manual de marca', 'brand book', 'logo', 'fotografía del producto'] },
    { step: 27, kw: ["do's y don'ts", 'dos and donts', 'qué no puede', 'restricciones de marca'] },
    { step: 28, kw: ['mecánica promocional', 'qué mecánica', 'descuento', 'cuotas sin intereses', 'envío full'] },
    { step: 28.5, kw: ['monto de inversión de marca', 'inversión de marca', 'monto de inversión'] },
    { step: 29, kw: ['formatos core', 'home slider', 'rtb banners', 'mercado play', 'clips.*9:16'] },
    { step: 30, kw: ['amplificación', 'dooh', 'experiencia digital interactiva', 'btl'] },
    { step: 30.5, kw: ['influencer marketing', 'branded content', 'influencers', 'generadores de contenido', 'propuesta de guión'] },
    { step: 31, kw: ['fecha de inicio', 'fecha de fin', 'timeline', '10 días hábiles'] },
    { step: 32, kw: ['información adicional', 'dato adicional', 'estudios de mercado', 'requisitos legales'] },
];

/** Returns the first step number found via keyword scan in a given text. */
function detectStepInText(text) {
    const lower = text.toLowerCase();
    // Iteramos al revés para agarrar la ÚLTIMA pregunta que hace MELISA (que es el paso de más alto nivel)
    for (let i = STEP_KEYWORDS.length - 1; i >= 0; i--) {
        const { step, kw } = STEP_KEYWORDS[i];
        if (kw.some(k => lower.includes(k))) return step;
    }
    // Extra steps not in STEP_KEYWORDS
    if (/monto del media plan/i.test(text)) return 98; // MeLi: media plan USD
    if (/inteligencia artificial|uso de ia|autoriza.*ia/i.test(text)) return 99; // AI usage
    if (/monto de inversión de marca|inversión de marca/i.test(text)) return 28.5; // Brand investment
    return 0;
}

// ── Brief Data Store ─────────────────────────────────────────────
// Each field is filled as the user answers the corresponding step.
// Used to build the PDF independently of MELISA's final summary.

// Diccionario de ejemplos ficticios para guiar al usuario (Proyecto: Tenis Genéricos)
const STEP_EXAMPLES = {
    4: "Lanzamiento Colección UrbanStep Verano",
    5: "UrbanStep (Marca ficticia de tenis)",
    6: "María López (m.lopez@mercadolibre.com)",
    7: "Carlos Pérez (Director de Marketing)",
    8: "(A) Lanzamiento de producto",
    9: "(A) México",
    10: "La categoría de tenis urbanos está creciendo, pero hay mucha competencia. Buscamos posicionar nuestro nuevo modelo enfocado en comodidad diaria y precios accesibles.",
    11: "Lograr que los jóvenes urbanos elijan nuestra nueva línea de tenis cómodos frente a las marcas tradicionales más caras.",
    12: "Ventas: 15% de incremento durante el primer mes.\nInteracción: +20% de engagement rate en la campaña.",
    13: "(B) Producto o línea de productos",
    14: "(C) Incremento de ventas",
    15: "1. Tenis UrbanStep Blanco\n2. Tenis UrbanStep Negro",
    16: "Hombres y mujeres de 18 a 35 años, que buscan comodidad para la universidad o el trabajo sin sacrificar estilo y cuidando su bolsillo.",
    17: "'Quiero unos tenis que se vean bien con todo y sean cómodos para caminar todo el día, pero no quiero pagar una fortuna solo por la marca.'",
    18: "Directa: Tenis genéricos de tiendas departamentales.\nIndirecta: Zapatos casuales.",
    19: "Nuestras plantillas de memory foam ofrecen el doble de soporte para largas caminatas a un precio 30% menor que la competencia.",
    20: "(C) No — necesito que propongan concepto y tagline",
    21: "Por definir",
    22: "Camina más ligero, cuida tu día y tu bolsillo.",
    23: "Libertad, ligereza, frescura, movimiento constante sin cansancio.",
    24: "Hace un año lanzamos 'ClassicStep', enfocada solo en precio. Esta vez queremos subir el nivel visual destacando la tecnología de la suela.",
    25: "(A) Sí — para elementos gráficos (fondos, elementos visuales)",
    26: "Te comparto el enlace a la carpeta con fotos de producto en fondo blanco y nuestro logotipo PNG transparente.",
    27: "Do's: Usar estilo urbano, modelos diversos.\nDon'ts: No mostrar los tenis en escenarios deportivos o gimnasios (son de lifestyle).",
    28:   "Envío full gratis y 10% de descuento en la compra del segundo par.",
    28.5: "$50,000 USD",
    29:   "Home Slider y Mercado Play (video de 15 segundos).",
    30:   "DOOH de MeLi en centros comerciales y Experiencia digital interactiva.",
    30.5: "(B) Sí — sin influencers definidos, necesitamos propuesta de guión y colaboración.",
    31:   "Inicio: 1 de Junio.\nFin: 30 de Junio.",
    32: "Tenemos un estudio que muestra que el 60% de nuestro público valora la comodidad por encima de la marca siempre que el diseño sea minimalista."
};

const briefData = {
    // Identity
    userName:             '',
    userEmail:            '',
    // Bloque 0 — Sesión
    userNameField:        '',   // nombre del usuario
    campaignStartType:    '',   // A (existente) o B (nueva)
    // Bloque 1 — Descripción general
    campaignName:         '',
    brand:                '',
    projectLeadMeli:      '',
    projectLeadBrand:     '',
    campaignType:         '',   // tipo de campaña
    markets:              '',
    // Bloque 2 — El reto
    businessContext:      '',
    challengeTweet:       '',
    kpis:                 '',
    objectiveFocus:       '',   // marca / producto / promoción
    objectiveMain:        '',   // awareness / intención de compra / etc.
    heroProducts:         '',
    // Bloque 3 — Fundamentos estratégicos
    targetAudience:       '',
    consumerInsight:      '',
    competition:          '',
    differentiator:       '',
    // Bloque 4 — Estrategia creativa
    creativeConceptStatus:'',
    tagline:              '',
    keyMessage:           '',
    emotionalTerritory:   '',
    previousCampaigns:    '',
    aiUsage:              '',
    // Bloque 5 — Recursos visuales
    referenceFiles:       '',
    dosAndDonts:          '',
    // Bloque 6 — Arquitectura
    promotionalMechanics: '',
    // Bloque 7 — Ecosistema de medios
    brandInvestmentUSD:   '',
    coreFormats:          '',
    amplification:        '',
    brandedContent:       '',
    // Bloque 8 — Tiempos
    timeline:             '',
    // Bloque 9 — Appendix
    additionalData:       '',
    // MeLi exclusivo
    mediaPlanUSD:         '',
};

/** Maps step number → briefData key */
const STEP_TO_FIELD = {
    1:  'userNameField',
    2:  'campaignStartType',
    4:  'campaignName',
    5:  'brand',
    6:  'projectLeadMeli',
    7:  'projectLeadBrand',
    8:  'campaignType',
    9:  'markets',
    10: 'businessContext',
    11: 'challengeTweet',
    12: 'kpis',
    13: 'objectiveFocus',
    14: 'objectiveMain',
    15: 'heroProducts',
    16: 'targetAudience',
    17: 'consumerInsight',
    18: 'competition',
    19: 'differentiator',
    20: 'creativeConceptStatus',
    21: 'tagline',
    22: 'keyMessage',
    23: 'emotionalTerritory',
    24: 'previousCampaigns',
    25: 'aiUsage',
    26: 'referenceFiles',
    27: 'dosAndDonts',
    28:   'promotionalMechanics',
    28.5: 'brandInvestmentUSD',
    29:   'coreFormats',
    30:   'amplification',
    30.5: 'brandedContent',
    31:   'timeline',
    32:   'additionalData',
    98:   'mediaPlanUSD',
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
Marca: ${nd(briefData.brand)}
Tipo de campaña: ${nd(briefData.campaignType)}
Project Lead MELI: ${nd(briefData.projectLeadMeli)}
Project Lead Marca: ${nd(briefData.projectLeadBrand)}
Mercado(s): ${nd(briefData.markets)}
Brief realizado por: ${nd(briefData.userNameField || briefData.userName)}
Correo: ${nd(briefData.userEmail)}
Fecha: ${date}

### 1. EL RETO
${nd(briefData.businessContext)}

**Brief en un Tweet:** ${nd(briefData.challengeTweet)}

### 2. MÉTRICAS CLAVE DE ÉXITO (KPIs)
${nd(briefData.kpis)}
Foco: ${nd(briefData.objectiveFocus)}
Objetivo principal: ${nd(briefData.objectiveMain)}

### 3. PRODUCTO(S) HERO
${nd(briefData.heroProducts)}

### 4. AUDIENCIA Y FUNDAMENTOS ESTRATÉGICOS
${nd(briefData.targetAudience)}

### 5. KEY CONSUMER INSIGHT
${nd(briefData.consumerInsight)}

### 6. COMPETENCIA Y DIFERENCIADOR
Competencia: ${nd(briefData.competition)}
Diferenciador: ${nd(briefData.differentiator)}

### 7. ESTRATEGIA CREATIVA
Concepto: ${nd(briefData.creativeConceptStatus)}
Tagline: ${nd(briefData.tagline)}
Key Message: ${nd(briefData.keyMessage)}
Territorio emocional: ${nd(briefData.emotionalTerritory)}
Campañas previas: ${nd(briefData.previousCampaigns)}

### 8. USO DE INTELIGENCIA ARTIFICIAL
${nd(briefData.aiUsage)}

### 9. RECURSOS VISUALES Y DO'S & DON'TS
Archivos: ${nd(briefData.referenceFiles)}
Do's y Don'ts: ${nd(briefData.dosAndDonts)}

### 10. ARQUITECTURA DE CAMPAÑA — MECÁNICA PROMOCIONAL
${nd(briefData.promotionalMechanics)}

### 11. ECOSISTEMA DE MEDIOS
Monto de Inversión de Marca (USD): ${nd(briefData.brandInvestmentUSD)}
Formatos Core: ${nd(briefData.coreFormats)}
Amplificación: ${nd(briefData.amplification)}
Influencer Marketing / Branded Content: ${nd(briefData.brandedContent)}${
    (briefData.brandedContent && briefData.brandedContent.toLowerCase().includes('sí')) 
    ? '\n*Nota: La propuesta de guión está incluida en BrandLab. La gestión o contratación de influencers tiene tiempos y costos adicionales que se gestionan directamente con TRÓPICA.*' 
    : ''
}

### 12. TIMELINE
${nd(briefData.timeline)}${mediaPlanLine}

### 13. APPENDIX
${nd(briefData.additionalData)}
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

function sendInitialLanguage(lang) {
    const qrDiv = document.getElementById('initial-quick-replies');
    if (qrDiv) {
        qrDiv.classList.add('used');
    }
    const input = document.getElementById('userInput');
    input.value = lang;
    enviar();
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
    input.style.height = '42px';

    conversationHistory.push({ role: "user", parts: [{ text: text }] });
    detectUserEmail(text);       // check if user shared a MeLi email
    storeBriefAnswer(text);      // store answer under the current step

    // Mensaje de privacidad local en el primer turno
    if (conversationHistory.length === 1) {
        const botRow = document.createElement('div');
        botRow.className = 'bot-row';
        const avatar = document.createElement('img');
        avatar.src = 'assets/MelissaIconChat.png';
        avatar.alt = 'MELISA';
        avatar.className = 'bot-avatar';
        const botDiv = document.createElement('div');
        botDiv.className = 'msg bot';
        botDiv.innerHTML = marked.parse("🔒 **Tus datos están seguros.** Toda la información que compartas es confidencial y no se utilizará para entrenar modelos de Inteligencia Artificial externos.");
        botRow.appendChild(avatar);
        botRow.appendChild(botDiv);
        chat.appendChild(botRow);
        chat.scrollTop = chat.scrollHeight;
    }

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
        if (detectedStep > 0) {
            lastAskedStep = detectedStep;
            
            // Inyectar Tooltip de ejemplo si existe para este paso
            if (STEP_EXAMPLES[detectedStep]) {
                const tooltipHtml = ` <i class="tooltip-icon" data-tooltip="Ejemplo ficticio:\n${STEP_EXAMPLES[detectedStep]}">i</i>`;
                if (botDiv.innerHTML.includes('</p>')) {
                    botDiv.innerHTML = botDiv.innerHTML.replace(/(<\/p>)(?![\s\S]*<\/p>)/, tooltipHtml + '$1');
                } else {
                    botDiv.innerHTML += tooltipHtml;
                }
            }
        }

        // Update the progress bar after every bot response
        updateBriefProgress();

        // Render quick reply buttons if the message contains selectable options
        renderQuickReplies(botDiv, botFullText, detectedStep);

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
function renderQuickReplies(botDiv, text, detectedStep) {
    // --- 1. Try to extract lettered options: **(A)** or (A) at line start ---
    const letterPattern = /^\s*\*?\*?\(([A-Ea-e])\)\*?\*?\s+(.+)/gm;
    const letterMatches = [...text.matchAll(letterPattern)];

    if (letterMatches.length >= 2) {
        const options = letterMatches.map(m => ({
            label: `(${m[1].toUpperCase()}) ${m[2].trim().replace(/\*\*/g, '')}`,
            value: `(${m[1].toUpperCase()}) ${m[2].trim().replace(/\*\*/g, '')}`
        }));
        // Pasos con selección múltiple (checkboxes en el brief)
        // Números = step interno de STEP_KEYWORDS (≠ PASO del prompt)
        // 8=TipoCampaña, 9=Mercados, 13=ObjetivoFoco, 14=ObjetivoPrincipal,
        // 25=UsoIA, 26=KeyFiles, 28=MecánicaPromo, 29=FormatosCore, 30=Amplificación, 30.5=Influencer
        const MULTI_SELECT_STEPS = new Set([8, 9, 13, 14, 25, 26, 28, 29, 30, 30.5]);
        appendQuickReplies(options, MULTI_SELECT_STEPS.has(detectedStep));
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

    function appendQuickReplies(options, isMultiSelect = false) {
        const wrap = document.createElement('div');
        wrap.className = 'quick-replies';

        if (isMultiSelect) {
            wrap.classList.add('multi-select');
            let selectedValues = [];
            
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'qr-btn qr-multi';
                btn.textContent = opt.label;
                btn.onclick = () => {
                    btn.classList.toggle('selected');
                    if (btn.classList.contains('selected')) {
                        selectedValues.push(opt.value);
                    } else {
                        selectedValues = selectedValues.filter(v => v !== opt.value);
                    }
                };
                wrap.appendChild(btn);
            });
            
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'qr-btn qr-confirm';
            confirmBtn.textContent = 'Confirmar ✓';
            confirmBtn.style.background = 'var(--ml-dark)';
            confirmBtn.style.color = '#fff';
            confirmBtn.onclick = () => {
                if (selectedValues.length === 0) return; // No enviar si está vacío
                wrap.classList.add('used');
                const input = document.getElementById('userInput');
                input.value = selectedValues.join(', ');
                enviar();
            };
            wrap.appendChild(confirmBtn);
        } else {
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'qr-btn';
                btn.textContent = opt.label;
                btn.onclick = () => {
                    wrap.classList.add('used');
                    const input = document.getElementById('userInput');
                    input.value = opt.value;
                    enviar();
                };
                wrap.appendChild(btn);
            });
        }

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
 * Debug: generates a PDF from current briefData and sends a full test email.
 */
async function debugEnviarCorreo() {
    const btn = document.getElementById('debugEmailBtn');
    if (btn) { btn.textContent = '⏳...'; btn.disabled = true; }
    try {
        // Try to generate a real PDF from current data
        let pdfBase64 = null;
        try {
            const finalSummary = getFinalBriefContent();
            if (finalSummary) {
                const { jsPDF } = window.jspdf;
                const fondoB64 = await loadAsBase64('assets/fondo.jpg');
                const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
                const PW = doc.internal.pageSize.getWidth();
                const PH = doc.internal.pageSize.getHeight();
                const YELLOW = [255, 230, 0], DARK = [0, 48, 135], WHITE = [255, 255, 255];
                const BANNER_H = 22, FOOTER_H = 10, ML = 18, MR = 18;
                const TW = PW - ML - MR;
                const Y_START = BANNER_H + 8, Y_END = PH - FOOTER_H - 4;
                let page = 1;
                const drawChrome = (pg) => {
                    doc.addImage(fondoB64, 'JPEG', 0, 0, PW, PH);
                    doc.setFillColor(255, 255, 255); doc.rect(0, BANNER_H, PW, PH - BANNER_H - FOOTER_H, 'F');
                    doc.setFillColor(...YELLOW); doc.rect(0, 0, PW, BANNER_H, 'F');
                    doc.setFillColor(240, 200, 0); doc.rect(0, BANNER_H, PW, 0.8, 'F');
                    doc.setFillColor(...DARK); doc.rect(0, PH - FOOTER_H, PW, FOOTER_H, 'F');
                    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...WHITE);
                    doc.text('[TEST] MELISA — Documento de Prueba', ML, PH - 3.8);
                    doc.text(`Página ${pg}`, PW - MR, PH - 3.8, { align: 'right' });
                };
                drawChrome(page);
                let y = Y_START;
                const lines = finalSummary.split('\n');
                for (const raw of lines) {
                    const t = raw.trim().replace(/\*\*/g, '');
                    if (!t || t.startsWith('---')) { y += 1.5; continue; }
                    const isSection = /^#{1,3}\s/.test(raw) || /^\d+\.\s+[A-ZÁÉÍÓÚ]/.test(t);
                    const content = t.replace(/^#+\s*/, '');
                    doc.setFont('helvetica', isSection ? 'bold' : 'normal');
                    doc.setFontSize(isSection ? 10 : 9);
                    doc.setTextColor(...(isSection ? DARK : [65, 65, 65]));
                    const wrp = doc.splitTextToSize(content, TW);
                    const bH = wrp.length * (isSection ? 5.5 : 4.6) + (isSection ? 3 : 1);
                    if (y + bH > Y_END) { doc.addPage(); page++; drawChrome(page); y = Y_START; }
                    doc.text(wrp, ML, y + (isSection ? 5.5 : 4.6));
                    y += bH;
                }
                pdfBase64 = doc.output('datauristring').split(',')[1];
            }
        } catch (pdfErr) {
            console.warn('Test PDF generation skipped:', pdfErr);
        }

        await sendBriefByEmail(pdfBase64, true);
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
