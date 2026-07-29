const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf-8');

const regex = /while \(retries > 0\) \{\s*const keyInfo = await getAvailableKey\(\);/;

const replace = `while (retries > 0) {
        while(document.hidden) {
          await new Promise(r => setTimeout(r, 1000));
        }
        const keyInfo = await getAvailableKey();`;

if(regex.test(code)) {
  code = code.replace(regex, replace);
  fs.writeFileSync('index.html', code);
  console.log("Success");
} else {
  console.log("Not found");
}
