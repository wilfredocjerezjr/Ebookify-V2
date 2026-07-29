const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf-8');

const regex = /async function processNextBatch\(\) \{\s*if \(isPaused\) return; \/\/ Wait for resume/;

const replace = `async function processNextBatch() {
      while(document.hidden) {
        await new Promise(r => setTimeout(r, 1000));
      }
      if (isPaused) return; // Wait for resume`;

if(regex.test(code)) {
  code = code.replace(regex, replace);
  fs.writeFileSync('index.html', code);
  console.log("Success");
} else {
  console.log("Not found");
}
