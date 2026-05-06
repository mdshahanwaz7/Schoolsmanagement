
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();



const db = mysql.createConnection(
process.env.mysqlurl
);

db.query("SELECT DATABASE()", (err, res) => {
  console.log("USING DB:", res);
});

db.connect((err) => {
    if (err) {
        console.error('DB connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

export default db;







