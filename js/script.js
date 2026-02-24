const SYSTEM_PROMPT = `
🎛️ FUNCIONAMIENTO GENERAL
MELISSA dirige la conversación, identifica lagunas y fortalezas en la información.
La estructura a seguir SIEMPRE es la del DOCX proporcionado como conocimiento.
No inventar datos. No crear secciones extras. No usar JSON.

🌎 FASE 1 — CONTEXTO DEL USUARIO
1️⃣ Pregunta inicial obligatoria: “Where are you from, and which language would you like to continue in: Spanish, Portuguese, or English?”
2️⃣ Usa ese idioma durante toda la conversación.
3️⃣ Después, pregunta SIEMPRE: “Perfecto. Para contextualizar correctamente el brief, ¿para qué país o países es este proyecto?”

🧩 FASE 2 — DEFINIR TIPO Y CONTEXTO DEL BRIEF
Pregunta obligatoria: “¿Cuál es el punto de partida para este brief?” Opciones: A) Adaptar o ampliar una campaña existente B) Crear una campaña totalmente nueva
MELISSA DEBE PEDIR: “¿Puedes compartir el brief en PDF o DOCX?”

📋 FASE 3 — ENTREVISTA GUIADA SEGÚN EL DOCX
Guia todas las secciones: País del proyecto, The Challenge, Strategic Foundation, Creative Strategy, Campaign Architecture, MeLi Ecosystem, Promotional Mechanics, Media Ecosystem, Production, Appendix Final.

💬 TONO DE MELISSA: Tropical, cálida, cercana, profesional. Humor ligero.

🪄 PRIMERA INTERACCIÓN OBLIGATORIA:
Hi! 🌞 I’m MELISA — your tropical creative director at TRÓPICA. I’ll help you shape a complete, strategic, and beautiful brief with a warm human touch.
Before we dive in — where are you from, and which language would you like to continue in?
`;

let conversationHistory = [];

async function enviar() {
    const key = CONFIG.GEMINI_API_KEY;
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    const chat = document.getElementById('chat-window');

    if (!key || !text) return;

    // Mostrar mensaje usuario
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user';
    userDiv.innerText = text;
    chat.appendChild(userDiv);
    input.value = '';

    // Guardar en historial
    conversationHistory.push({ role: "user", parts: [{ text: text }] });

    // Preparar mensaje del bot (contenedor para streaming)
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
        botDiv.innerText = ""; // Limpiar el "..."

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
                            botDiv.innerText = botFullText; // Actualizar UI
                            chat.scrollTop = chat.scrollHeight;
                        }
                    } catch (e) {
                        // Ignorar errores parciales de JSON
                    }
                }
            }
        }

        conversationHistory.push({ role: "model", parts: [{ text: botFullText }] });

        // Mostrar botón de descarga si parece que terminó o dio un resumen
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
    doc.setTextColor(243, 156, 18); // Color Trópica
    doc.text("TRÓPICA - ESTRATEGIA CREATIVA", 20, 20);

    doc.setFontSize(16);
    doc.setTextColor(45, 52, 54);
    doc.text("Brief Stratégico Generado por MELISA", 20, 30);

    doc.setDrawColor(243, 156, 18);
    doc.line(20, 35, 190, 35);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    let y = 45;
    const margin = 20;
    const width = 170;

    // Filtrar solo los mensajes relevantes del historial (omitiendo el prompt de sistema)
    conversationHistory.forEach((msg, index) => {
        const role = msg.role === "user" ? "Usuario: " : "Melissa: ";
        const text = msg.parts[0].text;

        const splitText = doc.splitTextToSize(role + text, width);

        if (y + (splitText.length * 6) > 280) {
            doc.addPage();
            y = 20;
        }

        doc.setFont("helvetica", msg.role === "user" ? "bold" : "normal");
        doc.text(splitText, margin, y);
        y += (splitText.length * 7) + 5;
    });

    doc.save("Brief_Tropica_MELISA.pdf");
}
