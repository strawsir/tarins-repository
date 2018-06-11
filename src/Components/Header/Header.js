import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./Header.css";

export default class Header extends Component{
    constructor(props){
        super(props)

        this.state={
            toggleNav: false,
            animalCount: 0
        }
        this.toggleNav=this.toggleNav.bind(this);
        this.count = this.count.bind(this)
    }

    componentDidMount(){
        console.log(this.state.animalCount, this.props)
        this.count();
    }

    shouldComponentUpdate(){
        let a = this.props.animals;
        let count = 0;
        if(a !==undefined){ a.forEach(animal=>{count +=1})}
        return count != this.state.animalCount
    }

    componentDidUpdate(){
        this.count()
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
        }else if (this.props.animals === undefined){
            console.log('No Animals Found')
        }

        
    }

    toggleNav(){
        this.setState({toggleNav: !this.state.toggleNav})
        console.log(this.state.toggleNav)
    }

    render(){
        let u = this.props.user;
        return(
            <div className='master'>
            <style>
            @import url('https://fonts.googleapis.com/css?family=Comfortaa:400,700');
</style>
            <div className='main'>
            <div className="left">
            <div className="userInfo">
                {`Welcome ${u.firstname}!`}
            </div>
            <div className="shelterInfo">
                {`${u.name}`}
            </div>
            <div className="animalCount">
            {`${this.state.animalCount} animal(s) in shelter`}
            </div>
            </div>
            <div className="right">
            <img className="menu" onClick={()=>this.toggleNav()} src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-256.png" alt=""/>
            <div className="desktopmenu">
            <ul>
            <Link className='link' to='/'><li>HOME</li></Link>
            <Link className='link' to='/'><li>ANIMALS</li></Link>
            <Link className='link' to='/'><li>ADOPTERS</li></Link>
                <Link className='link'to='/'><li>SIGN OUT</li></Link>
            </ul>
            </div>
            </div>
               
            </div>
            {/* <div className={this.state.toggleNav===false ? 'dropdown hide' : 'dropdown hide'}>
            <ul>
                <li>HOME</li>
                <li>ANIMALS</li>
                <li>ADOPTERS</li>
                <li>SIGN OUT</li>
            </ul>
            </div> */}
            </div>
        )
    }
}