#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const publicContentDir = path.join(__dirname, '../public/content');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getJsonFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Warning: Directory ${dir} does not exist`);
    return [];
  }

  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.json') && file !== 'index.json')
    .map(file => file.replace('.json', ''));
}

function generateIndex(collectionName) {
  const collectionPath = path.join(publicContentDir, collectionName);
  ensureDir(collectionPath);

  const files = getJsonFiles(collectionPath);
  const indexPath = path.join(collectionPath, 'index.json');

  fs.writeFileSync(indexPath, JSON.stringify(files, null, 2));
  console.log(`✓ Generated index for ${collectionName}: ${files.length} items`);
}

console.log('Preparing content indexes...');

ensureDir(publicContentDir);

['works', 'advertisements', 'announcements', 'pages'].forEach(collection => {
  generateIndex(collection);
});

console.log('✓ Content preparation complete');
