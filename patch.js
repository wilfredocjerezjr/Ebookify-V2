const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf-8');
const search = `} catch (err) {
          if (err.name === 'AbortError') { 
             console.warn(\`\${keyInfo.provider} stalled (18s timeout). Flagging as busy and rotating.\`);
             setKeyCooldown(keyInfo.key);
          } else { 
             console.error("API Error with key:", keyInfo.provider, err);
          }`;
const replace = `} catch (err) {
          if (document.hidden) {
             console.warn("Fetch aborted due to backgrounding, waiting for visibility to retry.");
             while(document.hidden) {
               await new Promise(r => setTimeout(r, 1000));
             }
             continue;
          }
          if (err.name === 'AbortError') { 
             console.warn(\`\${keyInfo.provider} stalled (18s timeout). Flagging as busy and rotating.\`);
             setKeyCooldown(keyInfo.key);
          } else { 
             console.error("API Error with key:", keyInfo.provider, err);
          }`;
if(code.includes(search)) {
  code = code.replace(search, replace);
  fs.writeFileSync('index.html', code);
  console.log("Success");
} else {
  console.log("Not found");
}
