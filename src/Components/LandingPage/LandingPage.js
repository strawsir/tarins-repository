import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {getAnimals, currentUser, setCode, countAnimals} from '../../ducks/users'
import {connect} from 'react-redux';
import AnimalView from '../AnimalView/AnimalView';
import AnimalDisplay from '../AnimalDisplay/AnimalDisplay'
import Header from '../Header/Header'
import './animals.css';
import addIcon from '../AnimalDisplay/images/addanimal.gif';


class LandingPage extends Component{
    constructor(props){
        super(props)
        this.state={
            displayAnimals: false,
            ud: true,
            view: false,
            animals: [{}],
            animalCount:0,
            code: '',
            user: {},
            currentAnimal: {},
            toggleDisplay: false,
        }  
        this.falseView=this.falseView.bind(this);
        this.deleteAnimal=this.deleteAnimal.bind(this);
    }


componentDidMount(){
   this.getAllAnimals()
}

deleteAnimal(id){
    axios.delete(`./api/animal/${id}`).then(res=>{
        console.log(res)
        this.falseView();
        this.getAllAnimals();
    })
}

getAllAnimals(){
    
        this.props.getAnimals(this.props.user.code).then(res=>{
            this.setState({animals: this.props.animals})
            console.log('ani', this.props, 'state', this.state.animals)
        }).then(res=>{this.setState({displayAnimals:true, ud: true})}).catch(err=>console.log(err))
    
}

setAnimal(id){
    axios.get(`./api/animal/${id}`).then(res=>{
        this.setState({currentAnimal:res.data[0]})
        console.log('data', this.state.currentAnimal)
    }).catch(err=>console.log('no animal exists'))
    this.setState({toggleDisplay: true})
}

trueView(){
    this.setState({view: true})
}

falseView(){
    this.setState({view: false})
}





render(){
    let user = this.props.user
    let a = this.state.currentAnimal
    if(this.props.user){
        return(
            <div className='mainbkg'>
    <style>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');
</style>
                <Header user={user} animalCount={this.state.animalCount} animals={this.props.animals}/>
                
               <div  className={this.state.view === true? "singleDisplay bkg mobile": 'animalDisplay bkg'}>
                <div className="title">
                <div className="sheltertitle">
                    shelterhelper
                </div>
                <div className="addNew">
            <Link to='/new/animal'><img src={addIcon} className='addIcon' alt=""/></Link>
                </div>
                </div>
                
                <div>
                    {this.state.displayAnimals === false || this.props.animals === undefined ?
                   <div>No Animals To Display</div> 
                   :
                   <div className='mainDisplay'>
                       <div className={this.state.view === true ? 'animalDisplay': 'animalDisplay noDisplay'}>
                       <AnimalDisplay currentAnimal={this.state.currentAnimal} falseView={this.falseView} deleteAnimal={this.deleteAnimal}/>
                       </div>
                       <div className={this.state.view === true? "animalDisplay noDisplay": 'animalDisplay'}>
                       <div>
                           
                       </div>
                           {this.props.animals.map(animal=>{
                               return(
                                   <div key={animal.id + animal.animal_name} className='individual'>
                                   <img className='maleBorder' onClick={()=>{this.setAnimal(animal.id), this.trueView()}} className='animalImg' src={animal.image} alt="" />
                                       <AnimalView {...animal}/>
                                   </div>
                               )
                           })}
                       </div>
                       </div>  
                   }
                </div>
                </div>
               </div>
           )
       }else{return (
           <div>
               UNAUTHORIZED!
           </div>
       )}
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
