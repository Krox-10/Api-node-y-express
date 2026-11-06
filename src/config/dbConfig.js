const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const isProduction = process.env.DB_HOST && process.env.DB_HOST !== 'localhost';

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'wordpress',
    port: Number(process.env.DB_PORT || 3306),
    ssl: isProduction
        ? {
            ca: fs.readFileSync(path.join(__dirname, '../../ca.pem')),
            rejectUnauthorized: true
        }
        : undefined
});

module.exports = db;