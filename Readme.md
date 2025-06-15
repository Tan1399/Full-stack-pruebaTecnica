El proyecto busca crear un e-comerce que contenga un register, login un CRUD basico entre otras cosas

Las tecnologías usadas, son: java,next js, autenticacion de jwt, mysql , node js


primero se debe ejecutar el backend con visual studio, hacer un npm run start
después ejecutar el front-end con un npm run dev para de esta forma luego de ejecutar el backend pueda mostrar el front end, ya después se puede hacer una cuenta, e ingresar al sistema

este es el script para poder crear la tabla: USE ecommerce_db;


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE users ADD rol VARCHAR(20) DEFAULT 'user';

el role debe ser user siempre esto está predeterminado en el código, pero rol no, siempre que se registra autoamticamente queda como user incluso el rol, pero en la bd se puede hacer el registro de admin en rol, o usando Post para crear cuentas de administrador,
en resumen role siempre debe estar en user, pero role se puede agregar admin o user ahí es donde se hacen las verificaciones.


es recomendable agregar estos links y crear los productos desde la bd para que se puedan visualizar desde el inicio de lo contrario se tienen que agregar desde la bd o desde el panel para el administrador, dentro de  next.config.js hay varias rutas permitidas para la url de las imagenes estas son:  
       'nuribel.com',
      'images.unsplash.com',
      'cdn.pixabay.com',
      'i.imgur.com',
      'cr.tiendasadoc.com',
      'encrypted-tbn0.gstatic.com', 


ejecutar desde el cmd de node js el front end y el backend desde el cmd 

el .env deberia volver hacerse este va tener: 

PORT=3306
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=""
DB_NAME=ecommerce_db
JWT_SECRET=claveultrasecreta
