import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'KCgy4057',
  database: 'CGU',
  port: 3310,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// export promise-based pool
export default pool.promise();
