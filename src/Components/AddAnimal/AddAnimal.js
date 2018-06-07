//Nav bar at top
//component accessable through the nav bar
//New animal will be added to the shelter(PUT)
//Needs to make sure that the animal is added to the current logged in shelter
//shelter id passed through props?
//once animal is added it should show up in the shelter view
//animal image should be able to be uploaded
//image string on state(be able to browse for image?)

import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux'

class AddAnimal extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                Add New Animal
                <button onClick={()=>console.log(this.props)}>PROPS</button>
                
            </div>
        )
    }
}

function mapToProps(state){
    return{
        code: state.code,
        animals: state.animals,
        adopters: state.adopters
    }
}

export default connect(mapToProps)(AddAnimal)