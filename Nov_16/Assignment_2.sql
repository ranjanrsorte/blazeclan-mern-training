create database Ecom;

use Ecom;

Create Table Category (
    CategoryId Varchar(30) Primary Key,
    CategoryName Varchar(100) Not Null,
    Manufacturer Varchar(100) Not Null
);

Create Table Product (
    ProductRowId int auto_increment Primary Key,
    ProductId Varchar(100) Unique Not Null,
    ProductName Varchar(100) Not Null,
    Price int Not Null,
    QuantityAvailable int Not Null,
    CategoryId Varchar(30) Not Null,
    Constraint FK_CategoryId Foreign Key (CategoryId)
        references Category (CategoryId)
);

Create Table Customer (
	CustomerId int Primary Key,
	CustomerName varchar(200) Not null  
);

Create Table Ecom.Order (
	OrderId int Primary Key,
    ProductId int Not Null,
    OrderedDate datetime not null,
    QuantityOrdered int not null,
    TotalPrice int Not Null,
    CustomerId int Not null,
    Constraint FK_ProductId Foreign Key (ProductId)
		references Product(ProductRowId),
	Constraint FK_CustomerId Foreign Key (CustomerId)
		references Customer(CustomerId)
);

Insert into Category Values('CAT-001', 'Electronics', 'LG');
Insert into Category Values('CAT-002', 'Computers', 'DELL');
Insert into Category Values('CAT-003', 'Clothing', 'Raymond');
Insert into Category Values('CAT-004', 'Furniture', 'IKEA');
Insert into Category Values('CAT-005', 'Electricals', 'Philips');

Insert into Product(ProductId, ProductName, Price, QuantityAvailable, CategoryId) Values('PDT-101', 'Refrigerator', 15000, 12, 'CAT-001');
Insert into Product(ProductId, ProductName, Price, QuantityAvailable, CategoryId) Values('PDT-102', 'Keyboard', 500, 50, 'CAT-002');
Insert into Product(ProductId, ProductName, Price, QuantityAvailable, CategoryId) Values('PDT-103', 'Table', 2000, 15, 'CAT-004');
Insert into Product(ProductId, ProductName, Price, QuantityAvailable, CategoryId) Values('PDT-104', 'TV', 30000, 10, 'CAT-001');
Insert into Product(ProductId, ProductName, Price, QuantityAvailable, CategoryId) Values('PDT-105', 'Plugs', 200, 30, 'CAT-005');
Insert into Product(ProductId, ProductName, Price, QuantityAvailable, CategoryId) Values('PDT-106', 'Cables', 250, 40, 'CAT-005');
Insert into Product(ProductId, ProductName, Price, QuantityAvailable, CategoryId) Values('PDT-107', 'Shirt', 1000, 25, 'CAT-003');
Insert into Product(ProductId, ProductName, Price, QuantityAvailable, CategoryId) Values('PDT-108', 'Camera', 5000, 15, 'CAT-002');
Insert into Product(ProductId, ProductName, Price, QuantityAvailable, CategoryId) Values('PDT-109', 'Chair', 700, 35, 'CAT-004');
Insert into Product(ProductId, ProductName, Price, QuantityAvailable, CategoryId) Values('PDT-110', 'Suit', 2000, 5, 'CAT-003');

Insert into Customer values(1, 'Ranjan');
Insert into Customer values(2, 'Pawan');
Insert into Customer values(3, 'Aditya');
Insert into Customer values(4, 'Akash');

DELIMITER $$
create procedure sp_addOrderForCustomer(IN orderId int, IN pdtId varchar(100), IN quantity int, IN price int, IN customerId int)
BEGIN
	DECLARE _TotalPrice int;
    DECLARE _AvlQuantity int;
    DECLARE _FinalQuantity int;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION ROLLBACK;
    START TRANSACTION;
		set _TotalPrice = price * quantity;
        set _AvlQuantity = (select QuantityAvailable as qa from Product where ProductRowId = pdtId);
        Update Product set QuantityAvailable = (_AvlQuantity - quantity) where ProductRowId = pdtId;
		Insert into Ecom.Order (OrderId, ProductId, OrderedDate, QuantityOrdered, TotalPrice, CustomerId) values (orderId, pdtId, now(), quantity, _TotalPrice, customerId);
    COMMIT;     
END $$
DELIMITER ;

Call sp_addOrderForCustomer(5, 5, 10, 200, 3);