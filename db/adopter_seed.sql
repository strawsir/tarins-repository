drop table if exists adopters;
create table adopters(
adopter_id serial primary key,
first_name varchar(20),
last_name varchar(65),
address varchar(65),
city varchar(65),
state varchar(2),
zip varchar(5),
phone varchar(12),
do_not_adopt boolean,
homechecked boolean
)