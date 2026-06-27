const fs = require('fs');

const files = [
  './src/lib/db/leads-service.ts',
  './src/lib/db/pricing-rules-service.ts',
  './src/lib/db/services-service.ts'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Look for occurrences where we do `result = await query`
    // and then later `result.rows`. It's safer to just replace `.rows`
    // in these specific files because transactions use `client.query` (which still has .rows!)
    
    // So, we only want to replace `.rows` when the variable was created by `await query(`.
    // Actually, `query(` is used for global queries. `client.query(` is used for transactions.
    // Let's use a regex that matches `result.rows` and replaces it with `result` BUT ONLY if it's not `client.query`.
    // Wait, the typescript errors are ONLY on `.rows` because `client.query` correctly has `.rows`.
    // So any `.rows` that TS is complaining about is the one we need to fix.

    // Is there a simpler way? Just replace `result.rows` with `result`?
    // Let's check if transactions use `result.rows`. Yes, they do.
    // E.g., `const result = await client.query(...); return result.rows[0];`
    // So we can't blindly replace `result.rows` -> `result`.

    // We must replace it ONLY for global `query` calls.
    // Let's find: `const result = await query(` and change it to just use array directly.
    // Actually, let's just do it manually with regex.
    
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('result.rows')) {
        // Look back up to 15 lines to see if it was `await query` or `await client.query`
        let isGlobalQuery = false;
        for (let j = i; j >= Math.max(0, i - 15); j--) {
          if (lines[j].includes('await client.query')) {
            isGlobalQuery = false;
            break;
          }
          if (lines[j].includes('await query(') || lines[j].includes('await query<')) {
            isGlobalQuery = true;
            break;
          }
        }
        if (isGlobalQuery) {
          lines[i] = lines[i].replace(/result\.rows/g, 'result');
        }
      }
    }

    content = lines.join('\n');
    
    if (content !== original) {
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    }
  }
});
