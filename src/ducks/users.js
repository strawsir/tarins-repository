
import axios from 'axios'
const initialState = {
    shelterUsers:[],
            user:{},
            animals:[],
            code:'',
            animalCount:0
}

const GET_USERS = 'GET_USERS'
const CURRENT = 'CURRENT'
const ANIMALS = 'ANIMALS'
const SET_CODE = 'SET_CODE'
const COUNT = 'COUNT'

export function getUsers(){
    let userData=axios.get('./api/users').then(res=>{
        return res.data;
    }).catch(err=>{console.log(err)})
    return {
        type: GET_USERS,
        payload:userData
    }
}
export function countAnimals(){
        initialState
        return this.state.animalCount;
    
}

//defaults none none none
export function currentUser(username='1', password='1', shelterID='test01'){
    let currentUserData = axios.get(`./api/getUser/${username}/${password}/${shelterID}`).then(res =>{
        return res.data
    }).catch(err=>{console.log(err)})

    return{
        type: CURRENT,
        payload: currentUserData
    }
}

export function getAnimals(shelterID='test01'){
    let data = axios.get(`./api/animals/${shelterID}`).then(res=>{
        console.log('function', res.data)
        return res.data
    }).catch(err=>{console.log(err)})

    return{
        type: ANIMALS,
        payload: data
    }
}
export function setCode(code='test01'){
    return {
        type: SET_CODE,
        payload: code
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case ANIMALS + '_FULFILLED':
            return Object.assign({}, state, {animals: action.payload})
        case GET_USERS:
            return Object.assign({}, state, {shelterUsers: action.payload})
        case CURRENT + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload[0]})
        case SET_CODE:
            return Object.assign({}, state, {code: action.payload})
      
    
        default:
            return state;
    }
}