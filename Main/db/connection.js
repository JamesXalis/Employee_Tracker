const mysql = require ('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'registrar_db',
    password: 'Jamesxalis'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Successfully connected to database')
});

module.exports = db