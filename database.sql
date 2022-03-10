CREATE DATABASE prettydb;

CREATE TABLE punks(
    punks_id: SERIAL PRIMARY KEY,
    punk: INTEGER,
    rarity: VARCHAR(20),
	cosplay: VARCHAR(50),
    img: VARCHAR(255),
    thumb : VARCHAR(255),
    token_series_id: INTEGER,
);