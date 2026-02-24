const SYSTEM_PROMPT = `
🎛️ FUNCIONAMIENTO GENERAL
MELISSA dirige la conversación, identifica lagunas y fortalezas en la información.
La estructura a seguir SIEMPRE es la del DOCX proporcionado como conocimiento.
No inventar datos. No crear secciones extras. No usar JSON.

🧩 FASE 2 — DEFINIR TIPO Y CONTEXTO DEL BRIEF
Si el usuario adjunta un documento (marcado como [DOCUMENTO ADJUNTO]), MELISSA DEBE:
1. Extraer información relevante de todas las secciones del brief.
2. Identificar secciones fuertes y bien definidas.
3. Señalar secciones incompletas o débiles.
4. Hacer preguntas solo para profundizar o clarificar lo que falta.

💬 TONO DE MELISSA: Tropical, cálida, cercana, profesional. Humor ligero.

🪄 PRIMERA INTERACCIÓN OBLIGATORIA:
Hi! 🌞 I’m MELISA — your tropical creative director at TRÓPICA. I’ll help you shape a complete, strategic, and beautiful brief with a warm human touch.
Before we dive in — where are you from, and which language would you like to continue in?
`;

let conversationHistory = [];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

async function handleFileUpload(input) {
    const file = input.files[0];
    if (!file) return;

    const chat = document.getElementById('chat-window');
    const statusDiv = document.createElement('div');
    statusDiv.className = 'msg bot';
    statusDiv.innerText = `🌴 Leyendo ${file.name}...`;
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
            statusDiv.innerText = `✅ Documento "${file.name}" analizado. MELISA está revisando la información...`;
            // Enviar el texto extraído como un mensaje oculto/especial
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
    const promptEspecial = `[DOCUMENTO ADJUNTO: ${nombre}]\n${texto}\n\nPor favor, analiza este documento según tus reglas de MELISA. Identifica qué información ya tenemos para el brief y qué preguntas me debes hacer para completar lo que falte.`;

    // No mostramos el texto gigante al usuario, solo lo metemos al historial
    conversationHistory.push({ role: "user", parts: [{ text: promptEspecial }] });

    // Llamar a enviar pero sin texto de input (usando el historial que ya actualizamos)
    await llamarAPI("");
}

async function enviar() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    // Mostrar mensaje usuario
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
    const key = CONFIG.GEMINI_API_KEY;
    const chat = document.getElementById('chat-window');

    const botDiv = document.createElement('div');
    botDiv.className = 'msg bot';
    botDiv.innerText = "...";
    chat.appendChild(botDiv);
    chat.scrollTop = chat.scrollHeight;

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:streamGenerateContent?key=${key}&alt=sse`;

    const payload = {
        contents: [
            { role: "user", parts: [{ text: "SYSTEM INSTRUCTION (OBEY THIS): " + SYSTEM_PROMPT }] },
            ...conversationHistory
        ]
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let botFullText = "";
        botDiv.innerText = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
                if (line.startsWith("data: ")) {
                    try {
                        const jsonStr = line.substring(6);
                        const data = JSON.parse(jsonStr);
                        if (data.candidates && data.candidates[0].content) {
                            const newText = data.candidates[0].content.parts[0].text;
                            botFullText += newText;
                            botDiv.innerText = botFullText;
                            chat.scrollTop = chat.scrollHeight;
                        }
                    } catch (e) { }
                }
            }
        }

        conversationHistory.push({ role: "model", parts: [{ text: botFullText }] });

        if (botFullText.toLowerCase().includes("resumen final") || botFullText.toLowerCase().includes("appendix final")) {
            document.getElementById('downloadBtn').style.display = 'inline-block';
        }

    } catch (e) {
        botDiv.style.color = "#fb7185";
        botDiv.innerText = "Error de red: " + e.message;
    }
}

async function descargarBrief() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(243, 156, 18);
    doc.text("TRÓPICA - ESTRATEGIA CREATIVA", 20, 20);

    let y = 45;
    const width = 170;

    // Solo descargar los mensajes que NO son el prompt de sistema o documentos adjuntos gigantes
    conversationHistory.forEach((msg) => {
        if (msg.parts[0].text.startsWith("[DOCUMENTO ADJUNTO")) return;

        const role = msg.role === "user" ? "Tú: " : "Melissa: ";
        const text = msg.parts[0].text;
        const splitText = doc.splitTextToSize(role + text, width);

        if (y + (splitText.length * 7) > 280) {
            doc.addPage();
            y = 20;
        }
        doc.setFont("helvetica", msg.role === "user" ? "bold" : "normal");
        doc.setTextColor(msg.role === "user" ? 40 : 80);
        doc.text(splitText, 20, y);
        y += (splitText.length * 7) + 5;
    });

    doc.save("Brief_MELISA.pdf");
}
