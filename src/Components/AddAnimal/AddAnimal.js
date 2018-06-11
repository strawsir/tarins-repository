//Nav bar at top
//component accessable through the nav bar
//New animal will be added to the shelter(PUT)
//Needs to make sure that the animal is added to the current logged in shelter
//shelter id passed through props?
//once animal is added it should show up in the shelter view
//animal image should be able to be uploaded
//image string on state(be able to browse for image?)

import axios from 'axios';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import Header from '../Header/Header';
import './AddAnimal.css'
import {connect} from 'react-redux'

class AddAnimal extends Component{
    constructor(props){
        super(props)

        this.state={
            name: '',
            color: '',
            coat: '',
            fee: '',
            gender: 'FEMALE',
            image: '',
            microchip: '',
            species: 'CANINE',
            lbs: '',
            oz: '',
            notes: '',
            sheltercode: 'none',
            success: false,
            fail: false
        }
    }

    updateCode(){
        this.setState({sheltercode: this.props.code})
    }

    addNewAnimal(){
        let a = this.state
        axios.post('./api/newanimal',{
            animal_name: a.name,
            species: a.species,
            gender: a.gender,
            fee: a.fee,
            color: a.color,
            coat: a.coat,
            microchip: a.microchip,
            weight_lbs: a.lbs,
            weight_oz: a.oz,
            shelter_code: a.sheltercode,
            image: a.image,
            notes: a.notes
        }).then(res=>{
            console.log(res.data.name)
            if(res.data.name === 'error'){
                this.setState({fail:true})
            }else{ 
                this.setState({success:true})
                console.log('Does not equal')}
        }).catch(err=>(console.log(err)))
    }

    render(){

        return(
            <div onMouseOver={this.state.sheltercode === 'none' ? this.updateCode() : console.log('updated')}>
             <style>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');
</style>
                <div className={this.state.success ? 'successful' : 'noDis successful'}>
                    {`SUCCESS!`}
                    <br/>
                    {`${this.state.name} has been added to the shelter!`}
                    <br/>
                    <Link to='/landing'>GO BACK?</Link>
                </div>
                <div className={this.state.success === false? 'infoInput' : 'noDisplay'}>
               <div className="infoAdd">
               
                Name: <input className='inputBox' type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
                Gender:
                <select className='inputBox' name="gender" onChange={(e)=>this.setState({gender:e.target.value})}>
                <option value="FEMALE">FEMALE</option>
                <option value="MALE">MALE</option>
                </select>
                Coat: <input className='inputBox' type="text" onChange={(e)=>this.setState({coat:e.target.value})}/>
                Color: <input className='inputBox' type="text" onChange={(e)=>this.setState({color:e.target.value})}/>
                Adoption Fee: <input className='inputBox' type="text" onChange={(e)=>this.setState({fee:e.target.value})}/>
                Image: 
                <input className='inputBox' type="text" 
                onChange={(e)=>
                this.setState({image:e.target.value})
                
                }/>
               
                Microchip Number: <input className='inputBox' type="text" onChange={(e)=>this.setState({microchip:e.target.value})}/>
                Species:
                <select className='inputBox' name="species" onChange={(e)=>
                    this.setState({species:e.target.value})
                    
                    }>
                <option value="CANINE">CANINE</option>
                <option value="FELINE">FELINE</option>
                </select>
                Weight lbs:<input className='inputBox' type="text" onChange={(e)=>this.setState({lbs:e.target.value})}/>
                Weight oz: <input className='inputBox' type="text" onChange={(e)=>this.setState({oz:e.target.value})}/>
                Notes: <input  className='inputBox' type="text" onChange={(e)=>this.setState({notes:e.target.value})}/>
               <div className="addButtonDiv">
                <button className='addButton'onClick={()=>{this.addNewAnimal()}}>SUBMIT</button>
               </div>
               </div>
               
                <div className={this.state.fail ? 'fail' : 'fail noDis'}>
                    OOPS! PLEASE FILL OUT ALL PROVIDED FIELDS!
                </div>
                </div>
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