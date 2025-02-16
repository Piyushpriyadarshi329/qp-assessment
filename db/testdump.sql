


CREATE TABLE GroceryAdmin(
       id INT PRIMARY KEY AUTO_INCREMENT, 
       name VARCHAR(60), 
       email VARCHAR(50),
       mobile VARCHAR(50),
       password VARCHAR(50),
       UNIQUE KEY unique_email (email)
);



CREATE TABLE Customer(
       id INT PRIMARY KEY AUTO_INCREMENT, 
       name VARCHAR(60), 
       email VARCHAR(50),
       mobile VARCHAR(50),
       password VARCHAR(50),
       UNIQUE KEY unique_email (email)

);



CREATE TABLE Product(
       id INT PRIMARY KEY AUTO_INCREMENT, 
       productName VARCHAR(60), 
       price INT,
       Stock int
);


CREATE TABLE CustomerOrder(
       id INT PRIMARY KEY AUTO_INCREMENT, 
       userId INT, 
       orderStatus VARCHAR(20)
);

CREATE TABLE CustomerSubOrder(
       id INT PRIMARY KEY AUTO_INCREMENT, 
       orderId INT, 
       productId INT,
       QTY int
);


ALTER TABLE GroceryAdmin ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE Customer ADD CONSTRAINT unique_email UNIQUE (email);



-- ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'piyush@123'; 
-- flush privileges;