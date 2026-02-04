#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content');
const publicContentDir = path.join(__dirname, '../public/content');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

function copyDirectory(source, destination) {
  ensureDir(destination);

  if (!fs.existsSync(source)) {
    console.log(`Warning: Source directory ${source} does not exist`);
    return;
  }

  const files = fs.readdirSync(source);

  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

function generateIndex(collectionName) {
  const collectionPath = path.join(contentDir, collectionName);
  const files = getJsonFiles(collectionPath);

  const indexPath = path.join(publicContentDir, collectionName, 'index.json');
  ensureDir(path.dirname(indexPath));

  fs.writeFileSync(indexPath, JSON.stringify(files, null, 2));
  console.log(`Generated index for ${collectionName}: ${files.length} items`);
}

console.log('Preparing content for build...');

ensureDir(publicContentDir);

copyDirectory(contentDir, publicContentDir);
console.log('✓ Copied content to public/content');

['works', 'advertisements', 'announcements'].forEach(collection => {
  generateIndex(collection);
});

console.log('✓ Content preparation complete');
