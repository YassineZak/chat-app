import mysql from "mysql";
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : 'chat-app'
});
 
connection.connect()

export default connection