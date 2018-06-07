insert into animals(animal_name, species, adopted, available, gender, entry_date, 
exit_date, fee, color, 
coat, microchip, weight_lbs, weight_oz, shelter_code, dob, image, bio, notes, adopter_id)
values
('Austin', 'CANINE', true, false, 'MALE', '2018-01-08', '2018-03-20', 300, 'Orange and White',
'short', '981020006359775', 23, 0, 'test02', '2017-09-22', 
'https://us04.sheltermanager.com//image?db=kt0752&mode=animal&id=10135&date=2018-03-15T20%3A48%3A56',
'He is so cute!', 'suffers from myoclonus', 1);

select * from animals;