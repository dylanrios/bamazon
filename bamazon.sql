DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY(id)
    );
    
    
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity)
VALUES ("hairbrush","beauty",10,5000),("Roomba","household items",200,10000),("broom","household items",20,10000),("iphone","electronics",600,10000),("macbook pro","electronics",1200,800),("candle","household items",8,5000),("toothpaste","beauty",5,10000),("dog bed","pets",40,10000),("dog food","pets",30,10000),("cat food","pets",30,10000);


SELECT * FROM bamazon_db.products;



