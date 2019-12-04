-- CREATE DATABASE database_crowdsensing;

-- use database_crowdsensing;
use heroku_f0851cd0e4a3bee;

CREATE TABLE User (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    speciality VARCHAR(100) NOT NULL,
    genre TINYINT NOT NULL,
    age INT(2) NOT NULL,
    PRIMARY KEY (id)
);

-- ALTER TABLE users
--   MODIFY username VARCHAR(16) NOT NULL UNIQUE;

DESCRIBE User;

CREATE TABLE Geolocation (
    id INT(11) NOT NULL AUTO_INCREMENT,
    latitude VARCHAR(60) NOT NULL,
    longitude VARCHAR(60) NOT NULL,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES User(id),
    PRIMARY KEY (id)
);
