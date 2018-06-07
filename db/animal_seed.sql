drop table if EXISTS animals;
create table animals(
id serial primary key,
animal_name varchar(75),
species kind,
adopted boolean,
available boolean,
gender sex,
entry_date date,
exit_date date,
fee integer,
color varchar(75),
coat varchar(30),
microchip varchar(40),
weight_lbs integer,
weight_oz integer,
shelter_code varchar(6) references shelters(shelter_code),
adopter_id int references adopters(adopter_id),
dob date,
image text,
bio varchar(1000),
notes text
);
