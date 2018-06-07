drop table if exists shelter_users;
create table shelter_users(
shelter_code varchar(6) references shelters(shelter_code),
username varchar(20),
password varchar(50),
firstname varchar(50),
lastname varchar(50)
);
