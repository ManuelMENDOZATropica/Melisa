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

    // URL apuntando directamente a Gemini 2.5 Flash
    // En este modo estático sin backend, la API Key se usa directamente desde el cliente.
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${key}`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await res.json();

        const botDiv = document.createElement('div');
        botDiv.className = 'msg bot';

        if (data.candidates && data.candidates[0].content) {
            botDiv.innerText = data.candidates[0].content.parts[0].text;
        } else {
            botDiv.style.color = "#fb7185";
            botDiv.innerText = "Error API: " + (data.error ? data.error.message : "Respuesta inesperada");
        }

        chat.appendChild(botDiv);
        chat.scrollTop = chat.scrollHeight;

    } catch (e) {
        const errDiv = document.createElement('div');
        errDiv.className = 'msg bot';
        errDiv.style.color = "#fb7185";
        errDiv.innerText = "Error de red: " + e.message;
        chat.appendChild(errDiv);
    }
}
