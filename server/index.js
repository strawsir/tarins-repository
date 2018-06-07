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
    , massive = require('massive');

const {
    SERVER_PORT, 
    CONNECTION_STRING
} = process.env;

const app = express();

app.use( express.static( `${__dirname}/../build` ) );


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
    })
})

app.get('/api/getUser/:username/:password/:code', (req, res)=>{
    let {username, password, code}=req.params;
    req.app.get('db').current_user(username, password, code).then(user=>{
        res.status(200).send(user)
    })
})

app.get('/api/animals/:code', (req, res)=>{
    let {code} = req.params;
    req.app.get('db').animal_selectByShelter(code).then(animals =>{
        res.status(200).send(animals)
    })
})

app.get('/api/animal/:id', (req, res)=>{
    let {id} = req.params;
    req.app.get('db').animal_Individual(id).then(animals =>{
        res.status(200).send(animals)
    })
})


app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})