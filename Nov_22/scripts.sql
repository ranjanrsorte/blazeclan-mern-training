create table Roles(
    RoleId integer not null,
    RoleName varchar(100) not null,
    PRIMARY KEY(RoleName)
);

insert into roles (RoleId, RoleName) VALUES (1, 'Administrator');
insert into roles (RoleId, RoleName) VALUES (2, 'Manager');
insert into roles (RoleId, RoleName) VALUES (3, 'Clerk');

create table UsersInRole (
	Id Serial Primary Key,
    RelationId integer not null,
    UserName varchar(10) not null,
    RoleName varchar(100) not null,
    FOREIGN KEY (UserName) References Users(username),
    FOREIGN KEY (RoleName) References Roles(rolename)
);

insert into users(username, password) values ('user-001', 'pass-001');
insert into users(username, password) values ('user-002', 'pass-002');
insert into users(username, password) values ('user-003', 'pass-003');
insert into users(username, password) values ('user-004', 'pass-004');
insert into users(username, password) values ('user-005', 'pass-005');
insert into users(username, password) values ('user-006', 'pass-006');