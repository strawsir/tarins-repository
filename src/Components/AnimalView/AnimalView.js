//Nav bar at top
//Should display the animal's image, bio, and personal data
//Would like to have a component within that contains all of the animal's editable data as well as delete the animal
//user should be able to set the animal as adopted or not
// *BONUS* use moment.js to display how long the animal has been in the shelter
// *Bonus* if the animal is a cat use different background same with male/female
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './AnimalView.css'


class AnimalView extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let a=this.props;
        return(
            <div className='animalview'>
                <br/>
                <div className="animalName">
                {a.animal_name}
                </div>
                <br/>
                {`${a.microchip}`}
            </div>
        )
    }
}

export default AnimalView;
