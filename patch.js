const fs = require('fs');
let c = fs.readFileSync('public/js/script.js', 'utf8');

const regex = /function detectUserEmail\(text\) \{[\s\S]*?console\.log\(\`\[MELISA\] MeLi user detected: \$\{email\}\`\);\s*\}/;

const newFunc = `function detectUserEmail(text) {
    if (isMeliUser) return; // already detected, don't overwrite
    const emailMatch = text.match(/[a-zA-Z0-9._%+\\-]+@([a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,})/);
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
        console.log(\`[MELISA] MeLi user detected: \${email}\`);
    }
}`;

if (regex.test(c)) {
    c = c.replace(regex, newFunc);
    fs.writeFileSync('public/js/script.js', c, 'utf8');
    console.log('Replaced successfully via regex');
} else {
    console.log('Regex did not match!');
}
