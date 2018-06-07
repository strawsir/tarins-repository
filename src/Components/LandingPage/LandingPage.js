import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {getAnimals, currentUser, setCode, countAnimals} from '../../ducks/users'
import {connect} from 'react-redux';
import AnimalView from '../AnimalView/AnimalView';
import Header from '../Header/Header'
import MainAnimal from '../AnimalView/MainAnimal'
import './animals.css';


class LandingPage extends Component{
    constructor(props){
        super(props)
        this.state={
            displayAnimals: false,
            animals: [{}],
            animalCount:0,
            code: '',
            user: {},
            currentAnimal: {},
            toggleDisplay: false,
            dummyData:[ {
                "id": 10,
                "animal_name": "Austin",
                "species": "CANINE",
                "adopted": true,
                "available": false,
                "gender": "MALE",
                "entry_date": "2018-01-08T07:00:00.000Z",
                "exit_date": "2018-03-20T06:00:00.000Z",
                "fee": 300,
                "color": "Orange and White",
                "coat": "short",
                "microchip": "981020006359775",
                "weight_lbs": 23,
                "weight_oz": 0,
                "shelter_code": "test02",
                "adopter": 1,
                "dob": "2017-09-22T06:00:00.000Z",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
                "bio": "He is so cute!",
                "notes": "suffers from myoclonus"
            },
            {
                "id": 27,
                "animal_name": "Barkley",
                "species": "FELINE",
                "adopted": false,
                "available": true,
                "gender": "MALE",
                "entry_date": "2018-01-08T07:00:00.000Z",
                "exit_date": "2018-03-20T06:00:00.000Z",
                "fee": 300,
                "color": "Orange and White",
                "coat": "short",
                "microchip": "981020006359775",
                "weight_lbs": 23,
                "weight_oz": 0,
                "shelter_code": "test02",
                "adopter": null,
                "dob": "2017-09-22T06:00:00.000Z",
                "image": "https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg",
                "bio": "He is so cute!",
                "notes": "suffers from myoclonus"
            },
            {
                "id": 1,
                "animal_name": "Austin",
                "species": "CANINE",
                "adopted": true,
                "available": false,
                "gender": "MALE",
                "entry_date": "2018-01-08T07:00:00.000Z",
                "exit_date": "2018-03-20T06:00:00.000Z",
                "fee": 300,
                "color": "Orange and White",
                "coat": "short",
                "microchip": "981020006359775",
                "weight_lbs": 23,
                "weight_oz": 0,
                "shelter_code": "test02",
                "adopter": 1,
                "dob": "2017-09-22T06:00:00.000Z",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
                "bio": "He is so cute!",
                "notes": "suffers from myoclonus"
            },
            {
                "id": 2,
                "animal_name": "Barkley",
                "species": "FELINE",
                "adopted": false,
                "available": true,
                "gender": "MALE",
                "entry_date": "2018-01-08T07:00:00.000Z",
                "exit_date": "2018-03-20T06:00:00.000Z",
                "fee": 300,
                "color": "Orange and White",
                "coat": "short",
                "microchip": "981020006359775",
                "weight_lbs": 23,
                "weight_oz": 0,
                "shelter_code": "test02",
                "adopter": null,
                "dob": "2017-09-22T06:00:00.000Z",
                "image": "https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg",
                "bio": "He is so cute!",
                "notes": "suffers from myoclonus"
            }]
        }  
    }

//    componentDidMount(){
//     //    axios.get(`./api/animals/${this.props.code}`).then(res=>{
//     //        console.log(res.data);
//     //        this.setState({animals: res.data})
//     //        console.log(this.props.code)
//     //    })
componentDidMount(){
    this.props.getAnimals(this.props.user.code).then(res=>{
        this.setState({animals: this.props.animals})
        console.log('ani', this.props, 'state', this.state.animals)
    }).then(res=>{this.setState({displayAnimals:true})})
}

setAnimal(id){
    axios.get(`./api/animal/${id}`).then(res=>{
        this.setState({currentAnimal:res.data[0]})
        console.log('data', this.state.currentAnimal)
    }).catch(err=>console.log('no animal exists'))
    this.setState({toggleDisplay: true})
}
   

    render(){
       let user = this.props.user
       let a = this.state.currentAnimal
       
        return(
            <div>
             <Header user={user} animalCount={this.state.animalCount} animals={this.props.animals}/>
             
             <div className="animalDisplay">
             <div>
                 {this.state.displayAnimals === false || this.props.animals === undefined ?
                <div>No Animals To Display</div> 
                    :
                    <div className='mainDisplay'>
                        <div className={this.state.toggleDisplay ? 'display' : 'display noDisplay'}>
                   {a.adopted === true ? <div className='adopted'>THIS ANIMAL HAS BEEN ADOPTED</div> : <div className='available'> AVAILABLE FOR ADOPTION</div>}
                   <div className='profile'>
                    <img src={this.state.currentAnimal.image} alt=""/>
                   
                        <h1>{a.animal_name}</h1>
                    <div>
                        <h3>{a.bio}</h3>
                        <ul>
                            <li>{`Species: ${a.species}`}</li>
                            <li>{`Gender: ${a.gender}`}</li>
                            <li>{`Color: ${a.color}`}</li>
                            <li>{`Coat Type: ${a.coat}`}</li>
                            <li>{`Microchip Number: ${a.microchip}`}</li>
                            <li>{`Adoption Fee: ${a.fee}`}</li>
                            <li>{`Weight: ${a.weight_lbs} lbs ${a.weight_oz} oz`}</li>
                        </ul>
                        <div>{a.notes}</div>
                    </div>
                   </div>
                        </div>
                    <div className="animalDisplay">
                        {this.props.animals.map(animal=>{
                            return(
                                <div key={animal.id + animal.animal_name} className='individual'>
                                <img onClick={()=>this.setAnimal(animal.id)} className='animalImg' src={animal.image} alt="" />
                                    <AnimalView {...animal}/>
                                    <button onClick={()=>console.log(this.props, this.state.animals)}>PROPS</button>
                                </div>
                            )
                        })}
                    </div>
                    </div>  
                }
             </div>
             </div>
             <Link to='/new/animal'>Add New Animal</Link>
            </div>
        )
    }
      
    
}

function mapToProps(state){
    return{
        user: state.user,
        animals: state.animals,
        code: state.code
    }
}

export default connect(mapToProps, {getAnimals, currentUser, setCode, countAnimals})(LandingPage)
