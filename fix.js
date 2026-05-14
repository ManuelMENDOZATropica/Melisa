const fs = require('fs');
const file = 'public/js/script.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/'do's y don'ts'/g, '"do\\'s y don\\'ts"');
fs.writeFileSync(file, content, 'utf8');
