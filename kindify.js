/* eslint-disable */
/*
 * This script open generated/graphql.ts and adds an attribute 'kind' to every GraphQL node.
 *
 * The kind is needed by `CASL` which is used for permission checks.
 */
const fs = require('fs');

fs.readFile('./src/generated/graphql.ts', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const match = line.match(/export type T([A-Za-z]+)Node = {/);
    if (match) {
      lines[i] = `${line}\n  kind: '${match[1]}Node';`;
    }
  }
  fs.writeFileSync('./src/generated/graphql.ts', lines.join('\n'));
});
