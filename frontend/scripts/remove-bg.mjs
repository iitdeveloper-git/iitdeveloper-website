import { removeBackground } from '@imgly/background-removal-node';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const input = resolve('public/clients/knowledgeKing.png');
const output = resolve('public/clients/knowledgeKing-nobg.png');

console.log('Removing background from knowledgeKing.png …');

const blob = await removeBackground(input);
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(output, buffer);

console.log('Done! Saved to', output);
