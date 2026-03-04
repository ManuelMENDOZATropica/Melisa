const SYSTEM_PROMPT = `
Eres MELISA, Directora Creativa Tropical de TRÓPICA, en colaboración con MERCADO ADS.
Tu misión es construir un brief estratégico completo, profesional y listo para presentar.
Guías la conversación con calidez, inteligencia y alma tropical. 🌴✨🌊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 FLUJO OBLIGATORIO — UNA PREGUNTA A LA VEZ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sigue este orden EXACTO. No saltes pasos. Puedes condensar si el usuario ya dio la info en un documento adjunto, pero siempre confirma antes de seguir.

── BLOQUE 0 · IDIOMA Y ORIGEN (ya hecho en el saludo inicial) ──

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
- ESTILO TRÓPICA: Cálido, inspirador, experto. Emojis con moderación: 🌴✨🌊.
`;

let conversationHistory = [];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

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
        <p>✅ ¡Tu brief está listo! Puedes descargarlo ahora:</p>
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

async function descargarBrief() {
    try {
        const { PDFDocument, rgb, StandardFonts } = PDFLib;

        const templateUrl = 'assets/Brief template.pdf';
        const response = await fetch(templateUrl);
        if (!response.ok) throw new Error("No se pudo cargar la plantilla PDF.");
        const templateBytes = await response.arrayBuffer();

        const pdfDoc = await PDFDocument.load(templateBytes);
        const pages = pdfDoc.getPages();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const finalSummary = getFinalBriefContent();

        if (!finalSummary) {
            alert("Aún no hay un brief final para descargar.");
            return;
        }

        const sections = finalSummary.split("\n");
        let currentPage = pages[0];
        let y = currentPage.getHeight() - 100;
        const margin = 50;
        const fontSize = 9;
        const lineHeight = 12;

        for (let line of sections) {
            line = line.replace(/^\s*[\*\-\•]\s*/, "• "); // Normalizar viñetas
            const isMarkdownTitle = line.startsWith("###");
            const cleanLine = line.replace(/###\s*/, "").replace(/\*\*/g, "").trim();

            if (cleanLine === "" || line.startsWith("---")) {
                y -= 5;
                continue;
            }

            const isTitle = isMarkdownTitle || cleanLine.match(/^\d+[\)\.]/) || cleanLine.match(/^[A-Z\s]{5,}$/);
            const isBullet = line.startsWith("•");

            const currentFont = isTitle ? boldFont : font;
            const currentSize = isTitle ? fontSize + 2 : fontSize;
            const xPos = isBullet ? margin + 10 : margin;

            const words = cleanLine.split(" ");
            let currentLineText = "";
            for (const word of words) {
                const testLine = currentLineText + word + " ";
                const width = currentFont.widthOfTextAtSize(testLine, currentSize);

                if (width > currentPage.getWidth() - (margin * 2) - (isBullet ? 10 : 0)) {
                    currentPage.drawText(currentLineText, { x: xPos, y: y, size: currentSize, font: currentFont });
                    y -= lineHeight;
                    currentLineText = word + " ";
                } else {
                    currentLineText = testLine;
                }
            }
            currentPage.drawText(currentLineText, { x: xPos, y: y, size: currentSize, font: currentFont });
            y -= lineHeight + (isTitle ? 4 : 2);

            if (y < 60) {
                const pageIndex = pages.indexOf(currentPage);
                if (pageIndex < pages.length - 1) {
                    currentPage = pages[pageIndex + 1];
                    y = currentPage.getHeight() - 60;
                } else {
                    currentPage = pdfDoc.addPage();
                    y = currentPage.getHeight() - 60;
                }
            }
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "Brief_Trópica_Premium.pdf";
        link.click();

    } catch (e) {
        console.error("Error PDF:", e);
        descargarBriefSimple();
    }
}

function descargarBriefSimple() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const finalSummary = getFinalBriefContent();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(243, 156, 18);
    doc.text("TRÓPICA - ESTRATEGIA CREATIVA", 20, 20);

    doc.setFontSize(14);
    doc.text("Documento Estratégico de Campaña", 20, 30);

    let y = 45;
    const width = 170;
    const margin = 20;

    const sections = finalSummary.split("\n");

    sections.forEach((line) => {
        let processedLine = line.replace(/^\s*[\*\-\•]\s*/, "• ");
        if (processedLine.trim() === "" || processedLine.startsWith("---")) return;

        const isTitle = processedLine.startsWith("###") || processedLine.match(/^\d+[\)\.]/) || processedLine.match(/^[A-Z\s]{5,}$/);
        const cleanText = processedLine.replace(/###\s*/, "").replace(/\*\*/g, "").trim();
        const isBullet = processedLine.startsWith("•");

        doc.setFont("helvetica", isTitle ? "bold" : "normal");
        doc.setFontSize(isTitle ? 11 : 10);
        doc.setTextColor(isTitle ? 0 : 50);

        const xPos = isBullet ? margin + 5 : margin;
        const splitText = doc.splitTextToSize(cleanText, width - (isBullet ? 5 : 0));

        if (y + (splitText.length * 6) > 280) {
            doc.addPage();
            y = 20;
        }

        doc.text(splitText, xPos, y);
        y += (splitText.length * 5) + (isTitle ? 3 : 1);
    });

    doc.save("Brief_Trópica_Simple.pdf");
}


