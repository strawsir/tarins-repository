import React, {Component} from 'react';

export default class MainAnimal extends Component{
    constructor(props){
        super(props)
        this.state={
            selected: false
        }
    }

propsLog(){
    console.log(this.props)
}

    render(){
        return(
            <div>
                Main Animal
                <button onClick={()=>{this.propsLog()}}>CLICK</button>
            </div>
        )
    }
}