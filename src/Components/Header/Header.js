import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./Header.css";

export default class Header extends Component{
    constructor(props){
        super(props)

        this.state={
            toggle: false,
            animalCount: 0
        }
        this.toggleNav=this.toggleNav.bind(this);
        this.count = this.count.bind(this)
    }

    componentDidMount(){
        this.count();
    }

    


    count(){
        let animals = this.props.animals;
        let count = 0;
        if(this.props.animals !== undefined){
            this.props.animals.forEach(animal => {
                count += 1;
            });
            this.setState({animalCount: count})
            console.log(this.state.animalCount)
        }
    }

    toggleNav(){
        this.setState({toggle: !this.state.toggle})
    }

    render(){
        let u = this.props.user;
        return(
            <div onMouseMove={()=>{
                if(this.state.animalCount === 0){
                    this.count()
                }
            }} className='master'>
            
            <div className='main'>
            <div className="left">
            <div className="userInfo">
                {`Welcome ${u.firstname}`}
            </div>
            <div className="shelterInfo">
                {`Shelter Name: ${u.name}`}
            </div>
            <div onClick={()=>this.count()} className="animalCount">
            {`${this.state.animalCount} animal(s) in shelter`}
            </div>
            </div>
            <div className="right">
            <img className="menu" onClick={()=>this.toggleNav()} src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-256.png" alt=""/>
            <div className="desktopmenu">
            <ul>
                <li>HOME</li>
                <li>ANIMALS</li>
                <li>ADOPTERS</li>
                <li>SIGN OUT</li>
            </ul>
            </div>
            </div>
                {/* <button onClick={()=>{console.log(this.props);
                }}>CLICK</button> */}
            </div>
            <div className={this.state.toggle ? 'dropdown' : 'dropdown hide'}>
            <ul>
                <li>HOME</li>
                <li>ANIMALS</li>
                <li>ADOPTERS</li>
                <li>SIGN OUT</li>
            </ul>
            </div>
            </div>
        )
    }
}