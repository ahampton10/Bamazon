DROP DATABASE IF EXISTS bamazon_db; 
CREATE DATABASE bamazon_db; 
USE bamazon_db; 

CREATE TABLE products (
item_id INT (7) AUTO_INCREMENT NOT NULL, 
product_name VARCHAR (30) NOT NULL, 
department_name VARCHAR (30) NOT NULL, 
price INT (6) NOT NULL, 
stock_quantity INT (55) NOT NULL, 
PRIMARY KEY (item_id)
); 

ALTER USER 'root'@'localhost' IDENTIFIED BY 'uaaAMH10'; 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'uaaAMH10';

SELECT * FROM products; 

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, 'Sous Vide', 'Kitchenware', 120, 71), (2, 'Television', 'Electronics', 225, 23), (3, 'Charcoal Grill', 'Outdoor', 95, 22), (4, 'Sofa', 'Furniture', 550, 12), (5, 'Brie', 'Grocery', 7, 10), (6, 'Jacket', 'Clothing', 225, 6), (7, 'Guitar', 'Instruments', 300, 12), (8, 'Tennis Racket', 'Sporting Goods', 15, 12), (9, 'Air Fryer', 'Kitchenware', 99, 15), (10, 'Face Wash', 'Cosmetics', 35, 10); 
