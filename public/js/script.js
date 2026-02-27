const SYSTEM_PROMPT = `
🎛️ FUNCIONAMIENTO GENERAL
MELISSA dirige la conversación. Eres una Directora Creativa Tropical en TRÓPICA.
Tu objetivo es guiar al usuario para completar un brief estratégico de alto nivel.

🚀 ORDEN OBLIGATORIO DE CONVERSACIÓN (NO SALTAR PASOS):
1. **Idioma/Origen**: (Ya hecho en la primera interacción).
2. **País del Proyecto**: Pregunta SIEMPRE: "¿Para qué país o países es este proyecto?".
3. **Punto de Partida (A o B)**: Pregunta si el proyecto es (A) Adaptar/Ampliar campaña existente o (B) Crear campaña nueva.
4. **Solicitud de Brief**: Pide el PDF o DOCX ("¿Puedes compartir el brief...?"). **IMPORTANTE**: En el mismo mensaje, invita a seguir si no lo tienen: "Si no lo tienes, ¡no hay problema! Empecemos nosotros. Cuéntame: ¿[Primera Pregunta del Challenge]?".
5. **Entrevista Guiada**: Sigue el orden del DOCX (Challenge, Strategic Foundation, etc.). Haz preguntas cortas, conversadas y de una en una.

🚀 RESULTADO FINAL (BRIEF COMPLETO):
Cuando consideres que tienes información suficiente o el usuario pida el resultado final, genera el BRIEF COMPLETO.
DEBE ser un documento exhaustivo, profesional y creativo, NO un resumen de la charla.
Empieza OBLIGATORIAMENTE con la línea: "--- RESUMEN FINAL PARA DOCUMENTO ---".

Organízalo por estas secciones exactas:
1. PAÍS DEL PROYECTO
2. THE CHALLENGE
3. STRATEGIC FOUNDATION
4. CREATIVE STRATEGY
5. CAMPAIGN ARCHITECTURE
6. MELI ECOSYSTEM INTEGRATION
7. PROMOTIONAL MECHANICS
8. MEDIA ECOSYSTEM
9. PRODUCTION CONSIDERATIONS
10. APPENDIX FINAL

🚀 REGLAS CRÍTICAS:
- **BRIEF, NO TRANSCRIPT**: El documento final debe ser una pieza de estrategia redactada, no una lista de "dijiste esto".
- **UNA PREGUNTA A LA VEZ**: Fundamental para no saturar.
- **NO MENCIONES "FASES"**: Habla de forma natural y cálida.
- **MARKDOWN**: Usa negritas y títulos (###).

💬 TONO: Tropical, cálido, cercano, profesional. Emojis tropicales 🌴🌞🍍.

🪄 PRIMERA INTERACCIÓN OBLIGATORIA:
Hi! 🌞 I’m MELISA — your tropical creative director at TRÓPICA. I’ll help you shape a complete, strategic, and beautiful brief with a warm human touch.
Before we dive in — where are you from, and which language would you like to continue in?
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

        // 1. Obtener la plantilla original
        const templateUrl = 'assets/Brief template.pdf';
        const response = await fetch(templateUrl);
        if (!response.ok) throw new Error("No se pudo cargar la plantilla PDF.");
        const templateBytes = await response.arrayBuffer();

        // 2. Cargar el PDF
        const pdfDoc = await PDFDocument.load(templateBytes);
        const pages = pdfDoc.getPages();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        // 3. Obtener el contenido del brief
        const finalSummary = getFinalBriefContent();

        if (!finalSummary) {
            alert("Aún no hay un brief final para descargar. Sigue conversando con MELISA.");
            return;
        }

        // 4. Llenar el PDF (Overlay dinámico)
        const sections = finalSummary.split("\n");
        let currentPage = pages[0];
        let y = currentPage.getHeight() - 100;
        const margin = 50;
        const fontSize = 10;
        const lineHeight = 14;

        for (const line of sections) {
            if (line.trim() === "" || line.includes("---")) continue;

            // Detectar títulos (empiezan con número o son mayúsculas)
            const isTitle = line.match(/^\d+[\)\.]/) || line.match(/^[A-Z\s]{5,}$/);
            const currentFont = isTitle ? boldFont : font;
            const currentSize = isTitle ? fontSize + 2 : fontSize;

            const words = line.split(" ");
            let currentLine = "";
            for (const word of words) {
                const testLine = currentLine + word + " ";
                const width = currentFont.widthOfTextAtSize(testLine, currentSize);

                if (width > currentPage.getWidth() - (margin * 2)) {
                    currentPage.drawText(currentLine, { x: margin, y: y, size: currentSize, font: currentFont });
                    y -= lineHeight;
                    currentLine = word + " ";
                } else {
                    currentLine = testLine;
                }
            }
            currentPage.drawText(currentLine, { x: margin, y: y, size: currentSize, font: currentFont });
            y -= lineHeight + (isTitle ? 5 : 2);

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
        link.download = "Brief_Trópica_Final.pdf";
        link.click();

    } catch (e) {
        console.error("Error al generar el PDF:", e);
        alert("Aviso: No se pudo llenar la plantilla original (" + e.message + "). Se generará un PDF básico.");
        descargarBriefSimple();
    }
}

// Fallback: Genera un PDF sin plantilla, solo con el contenido del brief
function descargarBriefSimple() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const finalSummary = getFinalBriefContent();

    // Estética básica
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(243, 156, 18); // Naranja Trópica
    doc.text("TRÓPICA - ESTRATEGIA CREATIVA", 20, 20);

    doc.setFontSize(16);
    doc.text("Brief Estratégico Final", 20, 32);

    let y = 45;
    const width = 170;
    const margin = 20;

    const sections = finalSummary.split("\n");

    sections.forEach((line) => {
        if (line.trim() === "" || line.includes("---")) return;

        const isTitle = line.match(/^\d+[\)\.]/) || line.match(/^[A-Z\s]{5,}$/);
        doc.setFont("helvetica", isTitle ? "bold" : "normal");
        doc.setFontSize(isTitle ? 12 : 10);
        doc.setTextColor(isTitle ? 0 : 60);

        const splitText = doc.splitTextToSize(line, width);

        if (y + (splitText.length * 7) > 280) {
            doc.addPage();
            y = 20;
        }

        doc.text(splitText, margin, y);
        y += (splitText.length * 6) + (isTitle ? 4 : 2);
    });

    doc.save("Brief_Trópica_Simple.pdf");
}

