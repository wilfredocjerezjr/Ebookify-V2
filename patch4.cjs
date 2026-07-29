const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf-8');

const regexWait = /while\s*\(document\.hidden\)\s*\{\s*await new Promise\(r => setTimeout\(r, 1000\)\);\s*\}/g;

const waitFn = `
    function waitForVisibility() {
      if (!document.hidden) return Promise.resolve();
      return new Promise(resolve => {
        const handler = () => {
          if (!document.hidden) {
            document.removeEventListener('visibilitychange', handler);
            resolve();
          }
        };
        document.addEventListener('visibilitychange', handler);
      });
    }
`;

if(code.includes('lucide.createIcons();')) {
  // inject waitForVisibility early on
  code = code.replace('lucide.createIcons();', 'lucide.createIcons();' + waitFn);
  
  // replace polling with waitForVisibility()
  code = code.replace(regexWait, 'await waitForVisibility();');
  
  fs.writeFileSync('index.html', code);
  console.log("Success");
} else {
  console.log("Not found");
}
