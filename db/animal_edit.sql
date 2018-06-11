update animals
set species = $1,
gender = $2,
color = $3,
coat = $4,
microchip = $5,
fee = $6,
weight_lbs= $7,
weight_oz = $8

where id = $9;

select * from animals where id = $9;

