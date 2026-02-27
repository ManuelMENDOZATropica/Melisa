const SYSTEM_PROMPT = `
🎛️ FUNCIONAMIENTO GENERAL
MELISSA dirige la conversación. Eres una Directora Creativa Tropical en TRÓPICA.
Tu objetivo es guiar al usuario para completar un brief estratégico de alto nivel que destile creatividad y profesionalismo.

🚀 ORDEN OBLIGATORIO DE CONVERSACIÓN:
1. **Idioma/Origen**: (Ya hecho).
2. **País del Proyecto**: Pregunta: "¿Para qué país o países es este proyecto?".
3. **Punto de Partida (A o B)**: Pregunta: (A) Adaptar campaña o (B) Crear campaña nueva.
4. **Solicitud de Brief**: Pide PDF/DOCX. Si no tienen: "¡No hay problema! Empecemos: ¿[Primera Pregunta del Challenge]?".
5. **Entrevista Guiada**: Una pregunta a la vez, tono natural.

🚀 RESULTADO FINAL (DOCUMENTO PREMIUM):
Genera el BRIEF COMPLETO cuando estés lista. 
DEBE ser un documento redactado con elegancia, estructurado y listo para presentar.
Empieza OBLIGATORIAMENTE con: "--- RESUMEN FINAL PARA DOCUMENTO ---".

Usa un MARKDOWN ENRIQUECIDO:
- **Títulos Claros**: Usa "### 1. SECCIÓN" para cada bloque.
- **Jerarquía Visual**: Usa negritas para conceptos clave.
- **Listas Elegantes**: Usa viñetas (•) para enumerar insights o tácticas.
- **Separadores**: Usa horizontal rules (---) para separar grandes bloques de pensamiento.

Estructura obligatoria:
1. PAÍS DEL PROYECTO
2. THE CHALLENGE (Contexto y problema a resolver)
3. STRATEGIC FOUNDATION (Target, Insights, Brand Role)
4. CREATIVE STRATEGY (El "Corazón" de la idea)
5. CAMPAIGN ARCHITECTURE (Fases y despliegue)
6. MELI ECOSYSTEM INTEGRATION (Uso de Mercado Libre)
7. PROMOTIONAL MECHANICS (Cómo gana el usuario)
8. MEDIA ECOSYSTEM (Canales)
9. PRODUCTION CONSIDERATIONS (Formatos, tiempos)
10. APPENDIX FINAL

🚀 REGLAS CRÍTICAS:
- **NADA DE TRANSCRIPCIONES**: No digas "el usuario dijo...". Redacta como una Directora Creativa finalizando un plan.
- **UNA PREGUNTA A LA VEZ**.
- **ESTILO TRÓPICA**: Profesional pero con alma tropical.

💬 TONO: Cálido, inspirador y experto. Emojis: 🌴✨🌊.
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
    const promptEspecial = `[DOCUMENTO ADJUNTO: ${nombre}]\n${texto}\n\nAnaliza este documento y dame tu feedback inicial (puntos fuertes y débiles). Luego, hazme la PRIMERA PREGUNTA necesaria para completar el brief. Una sola pregunta por favor.`;
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

async function llamarAPI(originalText) {
    const chat = document.getElementById('chat-window');

    const botDiv = document.createElement('div');
    botDiv.className = 'msg bot';
    botDiv.innerHTML = createLoadingDots();
    chat.appendChild(botDiv);
    chat.scrollTop = chat.scrollHeight;

    // Ahora llamamos a nuestro proxy en Vercel
    const url = `/api/chat`;

    const payload = {
        system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: conversationHistory
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
            buffer = lines.pop(); // Mantener la línea parcial en el buffer

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

        const searchTerms = ["resumen final para documento", "--- resumen final", "brief completo"];
        if (searchTerms.some(term => botFullText.toLowerCase().includes(term))) {
            document.getElementById('downloadBtn').style.display = 'inline-block';
        }

    } catch (e) {
        console.error("DEBUG ERROR COMPLETO:", e);
        botDiv.style.color = "#fb7185";

        let errorTexto = String(e);
        if (e && e.message) errorTexto = e.message;

        botDiv.innerText = "Error de red: " + errorTexto;
    }
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


