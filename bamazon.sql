ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Carrie78';
create database bamazon_DB;

use bamazon_db;

create table products (
	item_id integer auto_increment, 
	product_name varchar(50),
	department_name varchar(50),
	price decimal(10,2), 
	stock_quantity integer (10),
    primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
	value('widget', 'beyond',10.00,10),('doo-hickey', 'sports',20.00,25),('thingamabob','dungeon',50.00, 35),('zippa-do','yonder',15.00,21),
    ('Scottish Claymore', 'smithy', 150.00, 10),('Uranium','Reactor',3000.00,25),('potatoes', 'electronics',5.00, 100),('coffee','groceries',6.00,50),
    ('cat','pets',0.50, 3),('dog','pets',1.00,4);
    
    select * from  products;