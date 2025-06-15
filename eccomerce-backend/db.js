const mysql = require ('mysql2'); // uso de mysql2 para conexiones a MySQL
require('dotenv').config();


// Cargar las variables de entorno desde el archivo .env
const connection = mysql.createConnection(
{

host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,

}
);

// verificacion de que la conexión se realiza correctamente
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = connection; // Exportar la conexión para usarla en otros archivos

