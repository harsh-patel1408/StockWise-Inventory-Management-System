// Explicitly gated, local/demo-only importer. Never run on a production database.
const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');

async function main() {
  if (process.env.STOCKWISE_DEMO_SETUP !== '1') {
    throw new Error('Refusing to import demo data: set STOCKWISE_DEMO_SETUP=1 explicitly.');
  }
  const host = process.env.DB_HOST || '127.0.0.1';
  const database = process.env.DB_NAME || 'stockwise';
  if (!['localhost', '127.0.0.1', 'db'].includes(host) || database !== 'stockwise') {
    throw new Error('Demo importer permits only a local database host and DB_NAME=stockwise.');
  }
  const connection = await mysql.createConnection({
    host, port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });
  try {
    for (const name of ['schema.sql', 'seed.sql']) {
      const sql = fs.readFileSync(path.join(__dirname, '..', 'db', name), 'utf8');
      await connection.query(sql);
      console.log('Imported db/' + name);
    }
    console.log('Demo import completed. Existing demo IDs are upserted; no real data should be used.');
  } finally {
    await connection.end();
  }
}
main().catch(err => { console.error(err.message); process.exitCode = 1; });
