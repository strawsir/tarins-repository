drop table if exists shelters;
create table shelters(
ID serial,
NAME varchar(65),
shelter_code varchar(6) primary key,
shelter_phone varchar(12),
shelter_address varchar(70),
shelter_city varchar(70),
shelter_zip varchar(5)
);