CREATE TABLE IF NOT EXISTS users(
	"id" SERIAL PRIMARY KEY,
	"slug" CHAR(32) NOT NULL,
	"email" CHAR(100) NOT NULL,
	"firstName" CHAR(20) NOT NULL,
	"lastName" CHAR(20) NOT NULL,
	"password" TEXT NOT NULL,
	"isAdmin" BOOLEAN NOT NULL,
	"dateJoined" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS buses(
	"id" SERIAL PRIMARY KEY,
	"slug" CHAR(32) NOT NULL,
	"numberPlate" CHAR(16) NOT NULL,
	"manufacturer" CHAR(72) NOT NULL,
	"model" CHAR(72) NOT NULL,
	"year" CHAR(4) NOT NULL,
	"capacity" INT NOT NULL,
	"dateAdded" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS trips(
	"id" SERIAL8 PRIMARY KEY,
	"busSlug" CHAR(32) NOT NULL,
	"origin" CHAR(72) NOT NULL,
	"destination" CHAR(72) NOT NULL,
	"tripDate" DATE NOT NULL,
	"fare" FLOAT NOT NULL,
	"createdBy" CHAR(32) NOT NULL,
	"status" CHAR(16) NOT NULL,
	"dateCreated" TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS bookings(
	"id" SERIAL PRIMARY KEY,
	"slug" CHAR(32) NOT NULL,
	"userSlug" CHAR(32) NOT NULL,
	"tripSlug" CHAR(32) NOT NULL,
	"createdOn" TIMESTAMP NOT NULL
);