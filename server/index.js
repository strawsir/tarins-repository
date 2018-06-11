//GET ALL SHELTERS
//GET ANIMALS where shelter id matches front end shelter id
//GET ADOPTERS "

//PUT New animal data
//PUT new adopter data
//PUT New shelter data

//POST animal data
//POST adopter data

//DELETE animal data
//DELETE adopter data

require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , expressSession = require('express-session')
    , bodyParser = require('body-parser')
    , massive = require('massive');

const {
    SERVER_PORT, 
    CONNECTION_STRING
} = process.env;



const app = express();

app.use( express.static( `${__dirname}/../build` ) );
app.use(bodyParser.json())

// app.use((req, res, next)=>{
//     if(req.cookie){
//         if(sessions[req.cookie]){
//             req.sessions = sessions[req.cookie]
//         }else{
//             sessions[req.cookie]={}
//             req.sessions = sessions[req.cookie]
//         }
//     }
// })

// app.use(expressSession({
//     secret:'xlcvkq34iutnzofgbwl38gyuai@#$75wj8ui4hbt897yguh9&YUYHJIYTRDFTYTRTYUIuyghoiehrgia',
//     resave:false,
//     saveUninitialized:true,
//     cookie:{
//         secure:false,
//         maxAge:1000*60*20
//     }
// }))

massive(CONNECTION_STRING).then((db)=>{
    console.log(`CONNECTED!`)
    app.set('db', db)
});

app.get('/api/setAll', (req, res)=>{
    res.send(req.session)
})

app.get('/api/users', (req, res)=>{
    req.app.get('db').user_get().then(users =>{
        res.status(200).send(users);
    }).catch(err=>status(500).send())
})

app.get('/api/getUser/:username/:password/:code', (req, res)=>{
    let {username, password, code}=req.params;
    req.app.get('db').current_user(username, password, code).then(user=>{
        res.status(200).send(user)
    }).catch(err=>status(500).send(err))
})


app.post('/api/newanimal', (req, res)=>{
    let{animal_name, species, gender, fee, color, coat, microchip, weight_lbs, weight_oz, shelter_code, image, notes} = req.body;

    req.app.get('db').animal_insert([animal_name, species, gender, fee, color, coat, microchip, weight_lbs, weight_oz, shelter_code, image, notes, false]).then(animals=>res.status(200).send(animals)).catch((err)=>res.status(500).send(err))
})

app.put('/api/animals/:id', (req, res)=>{
    let{species, gender, color, coat, microchip, fee, weight_lbs, weight_oz} = req.body;
    let{id}= req.params;

    req.app.get('db').animal_edit([species, gender, color, coat, microchip, fee, weight_lbs, weight_oz, id]).then(animals=>res.status(200).send(animals)).catch(err=>res.status(500).send(err))
})

app.get('/api/animals/:code', (req, res)=>{
    let {code} = req.params;
    req.app.get('db').animal_selectByShelter(code).then(animals =>{
        res.status(200).send(animals)
    }).catch(err=>status(500).send(err))
})

app.get('/api/animal/:id', (req, res)=>{
    let {id} = req.params;
    req.app.get('db').animal_Individual(id).then(animals =>{
        res.status(200).send(animals)
    }).catch(err=>status(500).send(err))
})

app.delete('/api/animal/:id', (req, res)=>{
    let {id}=req.params;
    req.app.get('db').animal_delete(id).then(animals=>{
        res.status(200).send(animals)
    }).catch(err=>status(500).send(err))
})


app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})