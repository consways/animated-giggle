const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load environment variables from .env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const ARTICLES_DIR = path.join(__dirname, 'articles');
const BACKUP_DIR = path.join(__dirname, 'articles_backup');

async function uploadAll() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.log('No articles directory found, nothing to backup.');
    return;
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.toLowerCase().endsWith('.json'));
  if (files.length === 0) {
    console.log('No JSON files to backup.');
    return;
  }
  for (const file of files) {
    const src = path.join(ARTICLES_DIR, file);
    const dest = path.join(BACKUP_DIR, file);
    fs.copyFileSync(src, dest);
    console.log(`Backed up ${file} to articles_backup.`);
    // Optionally delete original after backup
    try { fs.unlinkSync(src); } catch (e) { /* ignore */ }
    const txtFile = src.replace(/\.json$/i, '.txt');
    try { fs.unlinkSync(txtFile); } catch (e) { /* ignore */ }
  }
}

if (require.main === module) {
  uploadAll().catch(err => {
    console.error('Backup failed', err);
    process.exitCode = 1;
  });
}
