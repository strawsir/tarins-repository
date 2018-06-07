import React, {Component} from 'react';
import axios from 'axios';

export default class AnimalDisplay extends Component{
    constructor(){
        super()
        this.state={
            currentAnimal: {}
        }
    }

    componentDidMount(){
        axios.get('./animals?id=').then(
            res=>{
                console.log('res', res.data)
            }
        )
    }
    render(){
        return(
            <div>
                Animal Display
            </div>
        )
    }
}