//Page where user can specify which shelter they are wanting to login as.
//will set state to shelterID
// state = {shelters:[], shelterID: shelterId}
//the shelters will be set to state when componentdidmount 
//shelter ID will be set after it's been input. Will check to make sure the shelter exists in the shelters array if it does the user will go to the shelter, if it doesn't it will throw an alert.
//state should be passed to all of the other components.

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import logo from './pawprint.png'
import './ShelterLogin.css'
import {currentUser, setCode} from '../../ducks/users'
import {connect} from 'react-redux'


let theUser = {};
class ShelterLogin extends Component{
    constructor(){
        super()
        this.state={
            shelterID:'none',
            username: 'none',
            password: 'none',
            breeds: {},
            doggo: '',
            vowel: false
        }
        
    }
    componentDidMount(){
        let num = Math.floor(Math.random()*83)
        axios.get('https://dog.ceo/api/breeds/list/all').then(res=>{
            let breeds = res.data.message;
            let doggo = [];
            Object.entries(breeds).map(([key, value])=>{
                let wholeDoggo=``
                if(value[0]){
                    let names = value.length;
                    let number = Math.floor(Math.random()*names)
                    console.log('val', value[number], key)
                    wholeDoggo = `${value[number]} ${key}`
                }else{ wholeDoggo = `${key}`}
                console.log('whole', wholeDoggo)
                doggo.push(wholeDoggo)
            })
            console.log('get', doggo[num])
            this.setState({doggo: doggo[num]})
            let split = this.state.doggo.split('')
            if(split[0]==='a' || split[0]==='e'||split[0]==='i'||
            split[0]==='o'||split[0]==='u'){
                this.setState({vowel:true})
                console.log(split[0])
                console.log('vo', this.state.vowel)
            }else{ console.log('other' ,split[0])}
        })
    }
    
    componentDidUpdate(){
        this.getCurrentUser();
        
        
    }

  

    //UPDATE STATE
    updateID(e){
        this.setState({shelterID: e})
    }
    updateUsername(e){
        this.setState({username: e})
    }
    updatePassword(e){
        this.setState({password: e})
    }

    getCurrentUser(){
        let {username, password, shelterID}=this.state;
        this.props.currentUser(username, password, shelterID).then(res=>{this.setAnimals();
        }).catch(err=>{console.log('does not exist')});
    }

    setAnimals(){
        this.props.setCode(this.props.user.code);
        
        
    }
    
   

    render(){
        
        return(
            <div className="behind">
            <div className='loginMain'>
            <style>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');
</style>
                <div className="top">shelterhelper</div>
                <div className="loginbox">
                <div className="logo">
                <img className='imgLogo' src={logo} alt=""/>
                </div>
                <div className="input">
                
                <input type="text" placeholder='SHELTER ID' onChange={(e)=>{this.updateID(e.target.value)}}/>
                <input type="text" placeholder='USERNAME' onChange={(e)=>{this.updateUsername(e.target.value)}}/>
                <input type="password" placeholder='PASSWORD' onChange={(e)=>{{this.updatePassword(e.target.value)}}}/>
                </div>
                <div onMouseOver={()=>{
                    this.getCurrentUser(), 
                    console.log(this.props)}} className="login">
                <Link to={this.state.shelterID==='none'&&this.state.username==='none'&&this.state.password==='none' ? '/':
                '/landing'} >
                Login
                </Link>
                </div>
                </div>
            <div>
            {this.state.vowel===false ? `Psst! You should get a ${this.state.doggo}!`
             : `Psst! You should get an ${this.state.doggo}`}
            
              
                
            </div>
            </div>
            
                </div>
        )
    }

}

function mapToProps(state){
    return{
        user: state.user,
        code: state.code
    }
}

export default connect(mapToProps,{currentUser, setCode})(ShelterLogin);