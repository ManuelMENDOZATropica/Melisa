# MELISA - Generador Estratégico de Briefs

MELISA es una interfaz conversacional impulsada por inteligencia artificial diseñada para guiar a los usuarios (específicamente para la alianza Trópica × Mercado Libre) en la creación de briefs de proyecto completos, estratégicos y visualmente atractivos.

## 🚀 Características Principales

*   **Interfaz Conversacional**: Un chat interactivo que recopila paso a paso toda la información necesaria para construir un brief de marketing/proyecto estructurado.
*   **Generación de PDF**: Compila automáticamente las respuestas del usuario y genera un documento PDF maquetado profesionalmente utilizando `jspdf` y `pdf-lib`.
*   **Envío Automatizado de Correos**: Envía el brief finalizado (junto con su PDF adjunto) a los líderes del proyecto mediante la API de Resend.
*   **Procesamiento de Archivos**: Permite a los usuarios adjuntar documentos (PDF, DOCX) durante la conversación para extraer contexto adicional, utilizando `pdf.js` y `mammoth.js`.
*   **Soporte Markdown**: Renderiza las respuestas de la IA con formato enriquecido mediante `marked.js`.

## 🛠️ Stack Tecnológico

**Frontend:**
*   HTML5, CSS3 (Vanilla), JavaScript (Vanilla).
*   **Librerías del cliente**:
    *   `jspdf` & `pdf-lib`: Para la creación y manipulación de archivos PDF.
    *   `pdf.js`: Para la lectura y extracción de texto de PDFs adjuntos.
    *   `mammoth.js`: Para la conversión y extracción de texto de archivos `.docx`.
    *   `marked.js`: Para el parseo de Markdown a HTML en el chat.

**Backend / API:**
*   Node.js (Vercel Serverless Functions).
*   **Proveedor de Email**: [Resend](https://resend.com/) para el envío transaccional de los briefs (`resend` npm package).

## 📁 Estructura del Proyecto

```text
├── api/
│   └── send-brief.js      # Función Serverless de Vercel para el envío de emails con Resend
├── public/
│   ├── assets/            # Imágenes, logos e iconos (ej. Avatar de MELISA)
│   ├── css/
│   │   └── style.css      # Estilos principales de la aplicación
│   ├── js/
│   │   └── script.js      # Lógica del cliente (Chat, generación de PDF, llamadas a la API)
│   ├── index.html         # Punto de entrada principal de la aplicación web
│   └── privacy.html       # Políticas de privacidad
├── package.json           # Dependencias del proyecto (Resend)
└── README.md              # Documentación del proyecto
```

## ⚙️ Configuración y Despliegue

1. **Instalación de dependencias**:
   El proyecto utiliza dependencias de npm principalmente para el entorno backend/serverless.
   ```bash
   npm install
   ```

2. **Variables de Entorno**:
   Debes configurar las siguientes variables de entorno (por ejemplo, en un archivo `.env` o en la configuración de Vercel):
   *   `RESEND_API_KEY`: Tu clave de API de Resend para habilitar el envío de correos.

3. **Desarrollo Local**:
   Puedes servir la carpeta `public` utilizando cualquier servidor HTTP estático (como Live Server en VSCode, o `npx serve public`). Para probar la función API localmente, puedes utilizar el CLI de Vercel:
   ```bash
   npx vercel dev
   ```

4. **Despliegue**:
   El proyecto está optimizado para ser desplegado en [Vercel](https://vercel.com/), lo que automáticamente servirá los archivos estáticos en `public/` y configurará las funciones serverless en la carpeta `api/`.

## 🔒 Privacidad y Seguridad
El proyecto incluye un disclaimer de confidencialidad y una página dedicada a las políticas de privacidad (`privacy.html`), asegurando a los usuarios que su información sensible de proyecto se maneja de forma segura.
