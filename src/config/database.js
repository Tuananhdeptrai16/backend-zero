import mysql from 'mysql2/promise';
import 'dotenv/config'
export const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3307,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

// try {
//   const [results, fields] = await connection.query(
//     'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45'
//   );

//   console.log(results); // results contains rows returned by server
//   console.log(fields); // fields contains extra meta data about results, if available
// } catch (err) {
//   console.log(err);
// }
export const PoolConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user:  process.env.DB_USER,
    port  : process.env.DB_PORT , 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000, 
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});