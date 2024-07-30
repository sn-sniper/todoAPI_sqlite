const Database = require('better-sqlite3');
const dotenv = require('dotenv');

dotenv.config();

const dbPath = process.env.DATABASE_PATH || './src/database/data.db';
const db = new Database(dbPath, { verbose: console.log });

const initializeDatabase = () => {
    console.log('Initializing database...');
    try {
        db.prepare(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
      )
    `).run();
        console.log('Table "todos" is ready.');

        const verifyStmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='todos'");
        const tableExists = verifyStmt.get();
        if (tableExists) {
            console.log('Table "todos" exists.');
        } else {
            console.error('Table "todos" does not exist.');
        }
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

module.exports = {
    initializeDatabase,
    db
};
