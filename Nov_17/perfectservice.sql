create role ranjanadmin with login password 'mysql';

alter role ranjanadmin CREATEDB;

create database perfectservice;

create table VehicleType(
	ID smallint not null,
	Name varchar(100) not null,
	PRIMARY KEY (ID)
);

insert into VehicleType(ID, Name) VALUES (1, 'Trucks');
insert into VehicleType(ID, Name) VALUES (2, 'Bus');
insert into VehicleType(ID, Name) VALUES (3, 'Four Wheeler');
insert into VehicleType(ID, Name) VALUES (4, 'Three Wheeler');
insert into VehicleType(ID, Name) VALUES (5, 'Two Wheeler');

create table CustomerType(
	ID smallint not null,
	Name varchar(100) not null,
	PRIMARY KEY (ID)
);

insert into CustomerType(ID, Name) VALUES (1, 'Vehicle Company Owner');
insert into CustomerType(ID, Name) VALUES (2, 'Individual');

create table BookingType(
	ID smallint not null,
	Name varchar(100) not null,
	PRIMARY KEY (ID)
);

insert into BookingType(ID, Name) VALUES (1, 'From website');
insert into BookingType(ID, Name) VALUES (2, 'By phone call');
insert into BookingType(ID, Name) VALUES (3, 'On-Premises');

create table EmployeeType(
	ID smallint not null,
	Name varchar(100) not null,
	PRIMARY KEY (ID)
);

insert into EmployeeType(ID, Name) VALUES (1, 'Administrator');
insert into EmployeeType(ID, Name) VALUES (2, 'Servicing Manager');
insert into EmployeeType(ID, Name) VALUES (3, 'Servicing Leads');
insert into EmployeeType(ID, Name) VALUES (4, 'Servicing Representative');
insert into EmployeeType(ID, Name) VALUES (5, 'Servicing Worker');
insert into EmployeeType(ID, Name) VALUES (6, 'Accountant');
insert into EmployeeType(ID, Name) VALUES (7, 'Customer');

create table CustomerVehicleType(
	ID smallint not null,
	Name varchar(100) not null,
	PRIMARY KEY (ID)
);

insert into CustomerVehicleType(ID, Name) VALUES (1, 'Trucks Customer');
insert into CustomerVehicleType(ID, Name) VALUES (2, 'Bus Customer');
insert into CustomerVehicleType(ID, Name) VALUES (3, 'Four Wheeler Customer');
insert into CustomerVehicleType(ID, Name) VALUES (4, 'Three Wheeler Customer');
insert into CustomerVehicleType(ID, Name) VALUES (5, 'Two Wheeler Customer');

create table LeadType(
	ID smallint not null,
	Name varchar(100) not null,
	PRIMARY KEY (ID)
);

insert into LeadType(ID, Name) VALUES (1, 'Trucks Lead');
insert into LeadType(ID, Name) VALUES (2, 'Bus Lead');
insert into LeadType(ID, Name) VALUES (3, 'Four Wheeler Lead');
insert into LeadType(ID, Name) VALUES (4, 'Three Wheeler Lead');
insert into LeadType(ID, Name) VALUES (5, 'Two Wheeler Lead');

create table WorkerType(
	ID smallint not null,
	Name varchar(100) not null,
	PRIMARY KEY (ID)
);

insert into WorkerType(ID, Name) VALUES (1, 'Washing Workers');
insert into WorkerType(ID, Name) VALUES (2, 'Cleaning Workers');
insert into WorkerType(ID, Name) VALUES (3, 'Servicing Workers');

create table ServiceStatus(
	ID smallint not null,
	Name varchar(100) not null,
	PRIMARY KEY (ID)
);

insert into ServiceStatus(ID, Name) VALUES (1, 'Pending');
insert into ServiceStatus(ID, Name) VALUES (2, 'In-Servicing');
insert into ServiceStatus(ID, Name) VALUES (3, 'Completed but waiting for bills');
insert into ServiceStatus(ID, Name) VALUES (4, 'Completed with bills but waiting for Delivery');
insert into ServiceStatus(ID, Name) VALUES (5, 'Delivered');

create table Customer(
	ID smallint not null,
	Name varchar(100) not null,
	Password varchar(100) not null,
	Address varchar(200) not null,
	City varchar(100) not null,
	State varchar(100) not null,
	PrimaryContactNumber varchar(100) not null,
	ContactNumber varchar(100) not null,
	Landline varchar(100) not null,
	Email varchar(100) not null,
	CustomerType smallint not null,
	Type smallint not null,
	PRIMARY KEY (ID),
	FOREIGN KEY (CustomerType)  References CustomerType(ID),
	FOREIGN KEY (Type)  References EmployeeType(ID)
);

-- START : CUSTOMER SAMPLE DATA
/*
insert into customer(ID, Name, Address, City, State, PrimaryContactNumber, ContactNumber, Landline, Email, VehicleType, BookingType)
VALUES (1, 'James Smith', 'Flat 7 118 Blackhorse Grove', 'London', 'W6', '6345123367', '5411093324', '1123435', 'james@mail.com', 3, 1);

insert into customer(ID, Name, Address, City, State, PrimaryContactNumber, ContactNumber, Landline, Email, VehicleType, BookingType)
VALUES (2, 'Alice Smith', 'Apartment 1c 213 Derrick Street', 'Boston', 'MA', '6345145567', '3571093324', '6773435', 'alice@mail.com', 4, 1);

insert into customer(ID, Name, Address, City, State, PrimaryContactNumber, ContactNumber, Landline, Email, VehicleType, BookingType)
VALUES (3, 'T. Globelle', 'Paragon Productions', 'Los Angeles', 'CA', '6345193324', '5411063451', '1126773', 'globelle@mail.com', 1, 2);

insert into customer(ID, Name, Address, City, State, PrimaryContactNumber, ContactNumber, Landline, Email, VehicleType, BookingType)
VALUES (4, 'Maria Garcia', '3912 Ferry Street', 'Huntsville', 'Alabama', '2567058030', '7038978656', '1123289', 'maria@mail.com', 4, 3);

insert into customer(ID, Name, Address, City, State, PrimaryContactNumber, ContactNumber, Landline, Email, VehicleType, BookingType)
VALUES (5, 'Walter Johnson', '188 River Road', 'Detroit', 'Michigan', '3571093324', '7194325685', '1171943', 'walter@mail.com', 5, 1);

insert into customer(ID, Name, Address, City, State, PrimaryContactNumber, ContactNumber, Landline, Email, VehicleType, BookingType)
VALUES (6, 'Davis Brown', '4996 Woodbridge Lane', 'Atlanta', 'Georgia', '4082495423', '3135561978', '6197835', 'davis@mail.com', 2, 2);
*/
-- END : CUSTOMER SAMPLE DATA

create table Employee(
	ID smallint not null,
	LoginName varchar(200) not null,
	Password varchar(100) not null,
	Name varchar(100) not null,
	ContactNumber varchar(100) not null,
	Type smallint not null,
	Primary Key (ID),
	Foreign Key (Type) References EmployeeType(ID)
);

-- START : SAMPLE EMPLOYEE DATA

insert into Employee(ID, Name, ContactNumber, Type) VALUES (1, 'Sam Athwal', '8123939746', 3);
insert into Employee(ID, Name, ContactNumber, Type) VALUES (2, 'Thomas Barbara', '8053519166', 2);
insert into Employee(ID, Name, ContactNumber, Type) VALUES (3, 'Hector Barbossa', '9078308883', 4);
insert into Employee(ID, Name, ContactNumber, Type) VALUES (4, 'Norman Bates', '7852718917', 5);
insert into Employee(ID, Name, ContactNumber, Type) VALUES (5, 'Scott Becker', '6017138183', 5);
insert into Employee(ID, Name, ContactNumber, Type) VALUES (6, 'Frank Booth', '8475903490', 6);

-- END : SAMPLE EMPLOYEE DATA

create table Servicing(
	ID smallint not null,
	VehicleNumber varchar(100) not null,
	VehicleType smallint not null,
	CustomerId smallint not null,
	NumberOfService smallint not null,
	RegistrationDate date not null,
	RegistrationType smallint not null,
	ActualServiceStartDate date null,
	ExpectedServiceEndDate date null,
	ActualServiceEndDate date null,
	ServiceManagerId smallint null,
	ServiceLeadId smallint null,
	WorkerId smallint null,
	ServiceStatus smallint null,
	IsPickup smallint not null,
	BookedBy smallint not null,
	Primary Key (ID),
	Foreign Key (VehicleType) References VehicleType(ID),
	Foreign Key (CustomerId) References Customer(ID),
	Foreign Key (RegistrationType) References BookingType(ID),
	Foreign Key (ServiceManagerId) References Employee(ID),
	Foreign Key (ServiceLeadId) References Employee(ID),
	Foreign Key (WorkerId) References Employee(ID),
	Foreign Key (ServiceStatus) References ServiceStatus(ID),
	Foreign Key (BookedBy) References EmployeeType(ID)
);

create table ServicePrice(
	ID smallint not null,
	VehicleType smallint not null,
	WashingPrice decimal not null,
	CleaningPrice decimal not null,
	ServicingPrice decimal not null,
	PickupPrice decimal not null,
	Primary Key (ID),
	Foreign Key (VehicleType) References VehicleType(ID)
);

-- START : SERVICEPRICE SAMPLE DATA

insert into ServicePrice(ID, VehicleType, WashingPrice, CleaningPrice, ServicingPrice, PickupPrice) 
values (1, 1, 500, 200, 5000, 1000);
insert into ServicePrice(ID, VehicleType, WashingPrice, CleaningPrice, ServicingPrice, PickupPrice) 
values (2, 2, 700, 400, 5500, 1100);
insert into ServicePrice(ID, VehicleType, WashingPrice, CleaningPrice, ServicingPrice, PickupPrice) 
values (3, 3, 400, 450, 4000, 700);
insert into ServicePrice(ID, VehicleType, WashingPrice, CleaningPrice, ServicingPrice, PickupPrice) 
values (4, 4, 300, 100, 900, 250);
insert into ServicePrice(ID, VehicleType, WashingPrice, CleaningPrice, ServicingPrice, PickupPrice) 
values (5, 5, 100, 150, 800, 200);

-- END : SERVICEPRICE SAMPLE DATA

create table PartsPrice(
	ID smallint not null,
	Part varchar(200) not null,
	VehicleType smallint not null,
	Price decimal not null,
	Primary Key (ID),
	Foreign Key (VehicleType) References VehicleType(ID)
);

-- START : PARTSPRICE SAMPLE DATA

insert into PartsPrice(ID, Part, VehicleType, Price) values(1, 'Clutch', 1, 7000);
insert into PartsPrice(ID, Part, VehicleType, Price) values(2, 'Break', 3, 400);
insert into PartsPrice(ID, Part, VehicleType, Price) values(3, 'Oil', 4, 250);
insert into PartsPrice(ID, Part, VehicleType, Price) values(4, 'Stearing', 1, 1000);
insert into PartsPrice(ID, Part, VehicleType, Price) values(5, 'Handle', 5, 800);
insert into PartsPrice(ID, Part, VehicleType, Price) values(6, 'Petrol Tank', 3, 2000);
insert into PartsPrice(ID, Part, VehicleType, Price) values(7, 'Tyre', 2, 9000);
insert into PartsPrice(ID, Part, VehicleType, Price) values(8, 'Axle', 4, 1500);
insert into PartsPrice(ID, Part, VehicleType, Price) values(9, 'Seat', 5, 500);
insert into PartsPrice(ID, Part, VehicleType, Price) values(10, 'Cover', 4, 1200);
insert into PartsPrice(ID, Part, VehicleType, Price) values(11, 'Plugs', 2, 3000);
insert into PartsPrice(ID, Part, VehicleType, Price) values(12, 'Lamps', 2, 2500);
insert into PartsPrice(ID, Part, VehicleType, Price) values(13, 'Mirror', 5, 700);
insert into PartsPrice(ID, Part, VehicleType, Price) values(14, 'Meter', 3, 3500);
insert into PartsPrice(ID, Part, VehicleType, Price) values(15, 'Battery', 1, 6000);

-- END : PARTSPRICE SAMPLE DATA

create table VehicleAMC(
	ID smallint not null,
	VehicleType smallint not null,
	CustomerId smallint not null,
	ContractEndDate date not null,
	Primary Key (ID),
	Foreign Key (VehicleType) References VehicleType(ID),
	Foreign Key (CustomerId) References Customer(ID)
);

create table Bill(
	ID Serial not null,
	CustomerId smallint not null,
	VehicleTypeId smallint not null,
	TotalBill decimal not null,
	ServicingId smallint not null,
	BillDate varchar(100) not null,
	PartPrice smallint default 0,
	ServicePrice smallint default 0,
	WashingPrice smallint default 0,
	CleaningPrice smallint default 0,
	PickUpPrice smallint default 0,
	Primary Key (ID),
	Foreign Key (CustomerId) References Customer(ID),
	Foreign Key (ServicingId) References Servicing(ID),
	Foreign Key (VehicleTypeId) References VehicleType(ID)
);

create table BillDetails(
	ID Serial not null,
	BillId smallint not null,
	PartPrice smallint not null,
	ServicePrice smallint not null,
	Primary Key (ID),
	Foreign Key (BillId) References Bill(ID)
);

create table ServiceType (
	ID smallint not null,
	Name varchar(100) not null,
	Primary Key (ID)
);

Insert into ServiceType(ID, Name) values(1, 'Washing');
Insert into ServiceType(ID, Name) values(2, 'Cleaning');
Insert into ServiceType(ID, Name) values(3, 'Servicing');

create table AssignedWorkers (
	ID Serial not null,
	ServicingId smallint not null,
	ServiceLeadId smallint not null,
	WorkerId smallint not null,
	ServiceType smallint not null,
	Primary Key (ID),
	Foreign Key (ServicingId) References Servicing(ID),
	Foreign Key (ServiceLeadId) References Employee(ID),
	Foreign Key (WorkerId) References Employee(ID),
	Foreign Key (ServiceType) References ServiceType(ID)
);

Create Procedure sp_InsertServicing
(
	p_VehicleNumber integer, 
	p_VehicleType varchar(50),
	p_ServicingId varchar(50),
	p_NumberOfService integer,
	p_RegistrationType,
	p_ServiceManagerId,
	p_ServiceLeadId,
	p_WorkerId,
	p_ServiceStatus,
	p_IsPickup
)
Language plpgsql
As $$
Begin
	If p_DeptNo <=0 OR p_Capacity <= 0 Then
		Raise 'Please make sure that the DeptNo and Capacity are positive Values';
	End If;
	Insert into Department(DeptNo, DeptName, Location, Capacity)
	Values
	(p_DeptNo, p_DeptName, p_Location, p_Capacity);
End;
$$