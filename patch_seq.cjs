const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Set numStreams to 1
html = html.replace(
    /const numStreams = Math\.min\(totalKeys > 1 \? 2 : 1, totalBatches\);/,
    "const numStreams = 1;"
);

// Move currentBatch++ to after successful completion
const procNextBatchOriginal = /      const myBatch = currentBatch;\n      currentBatch\+\+;\n      const startPage/g;
html = html.replace(procNextBatchOriginal, "      const myBatch = currentBatch;\n      const startPage");

// Find where batchesCompleted++ is and add currentBatch++ right before or after it
const batchesCompletedOriginal = /batchesCompleted\+\+;\s*try \{/g;
html = html.replace(batchesCompletedOriginal, "batchesCompleted++;\n        currentBatch++;\n                try {");

fs.writeFileSync('index.html', html);
console.log("Sequential processing patched.");
