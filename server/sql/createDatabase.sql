-- Database: testPG

-- DROP DATABASE testPG;

-- If the database exists, this will just throw an error.

CREATE DATABASE postgres
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.UTF-8'
       LC_CTYPE = 'en_US.UTF-8'
       CONNECTION LIMIT = -1
       TEMPLATE template0;