import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function sqliteConnection() {
  const database = await open({
    filename: resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database
  });

  return database;
}

export default sqliteConnection; 
