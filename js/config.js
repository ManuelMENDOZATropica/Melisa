const CONFIG = {
    GEMINI_API_KEY: ""
};

// Función para cargar la API Key desde el archivo .env
// Nota: Requiere que el proyecto se ejecute en un servidor local (e.g., Live Server)
async function loadConfig() {
    try {
        const response = await fetch('.env');
        const text = await response.text();
        const lines = text.split('\n');

        for (const line of lines) {
            const [key, value] = line.split('=');
            if (key && key.trim() === 'GEMINI_API_KEY') {
                CONFIG.GEMINI_API_KEY = value.trim();
                console.log('✅ API Key cargada desde .env');
                break;
            }
        }
    } catch (error) {
        console.error('❌ Error al cargar el archivo .env:', error);
    }
}

// Iniciar la carga
loadConfig();