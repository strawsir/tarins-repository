
insert into animals (animal_name, species, gender, 
fee, color, coat, 
microchip, weight_lbs, weight_oz, 
shelter_code, image, notes, adopted)
values
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
select * from animals;