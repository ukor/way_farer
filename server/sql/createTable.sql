CREATE TABLE IF NOT EXISTS users(
	"id" SERIAL PRIMARY KEY,
	"slug" CHAR(32) NOT NULL,
	"email" CHAR(100) NOT NULL,
	"first_name" CHAR(20) NOT NULL,
	"last_name" CHAR(20) NOT NULL,
	"password" TEXT NOT NULL,
	"is_admin" BOOLEAN NOT NULL,
	"date_joined" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS buses(
	"id" SERIAL PRIMARY KEY,
	"slug" CHAR(32) NOT NULL,
	"number_plate" CHAR(16) NOT NULL,
	"manufacturer" CHAR(72) NOT NULL,
	"model" CHAR(72) NOT NULL,
	"year" CHAR(4) NOT NULL,
	"capacity" INT NOT NULL,
	"date_added" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS trips(
	"id" SERIAL8 PRIMARY KEY,
	"slug" CHAR(32) NOT NULL,
	"bus_slug" CHAR(32) NOT NULL,
	"origin" CHAR(72) NOT NULL,
	"destination" CHAR(72) NOT NULL,
	"trip_date" DATE NOT NULL,
	"fare" FLOAT NOT NULL,
	"created_by" CHAR(32) NOT NULL,
	"status" CHAR(16) NOT NULL,
	"date_created" TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS bookings(
	"id" SERIAL PRIMARY KEY,
	"slug" CHAR(32) NOT NULL,
	"user_slug" CHAR(32) NOT NULL,
	"trip_slug" CHAR(32) NOT NULL,
	"created_on" TIMESTAMP NOT NULL
);
