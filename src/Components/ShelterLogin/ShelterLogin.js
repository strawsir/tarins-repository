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
        }
        // this.updateID = this.updateID.bind(this);
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
        console.log(this.props);
        
    }
   

    render(){
        return(
            <div>
                <div className="top">shelterhelper</div>
                <div className="loginbox">
                <div className="logo">
                <img src={logo} alt=""/>
                </div>
                <div className="input">
                <input type="text" placeholder='SHELTER ID' onChange={(e)=>{this.updateID(e.target.value)}}/>
                <input type="text" placeholder='USERNAME' onChange={(e)=>{this.updateUsername(e.target.value)}}/>
                <input type="text" placeholder='PASSWORD' onChange={(e)=>{this.updatePassword(e.target.value)}}/>
                </div>
                <div onMouseOver={()=>{this.getCurrentUser(), console.log(this.props)}} className="login">
                <Link to='/landing'>Login</Link>
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