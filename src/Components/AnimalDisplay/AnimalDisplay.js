import React, {Component} from 'react';
import axios from 'axios';
import './animaldisplay.css';
import editIcon from './images/editIcon.png'
import exitIcon from './images/exit.png'
import deleteIcon from './images/deleteicon.png';
import submitButton from './images/submit.gif'

export default class AnimalDisplay extends Component{
    constructor(props){
        super(props)
        this.state={
            currentAnimal: {name: '~N/A'},
            view: false,
            edit: false,
            color: '',
            coat: '',
            fee: '',
            gender: '',
            image: '',
            microchip: '',
            species: '',
            lbs: '',
            oz: ''
        }
    }

   componentDidMount(){
     console.log('console', this.props)
   }

   componentWillReceiveProps(nextProps){
       this.setCurrent(nextProps.currentAnimal);
    console.log('props 2', this.state.currentAnimal)
   }

   setCurrent(nextProps){
    this.setState({currentAnimal: nextProps})
   }

  

   
   



    toggleEdit(){
        let a=this.state.currentAnimal;
        if(this.state.edit===false){
            this.setState({
                edit: !this.state.edit,
                color: a.color,
                coat: a.coat,
                fee: a.fee,
                gender: a.gender,
                image: a.image,
                microchip: a.microchip,
                species: a.species,
                lbs: a.weight_lbs,
                oz: a.weight_oz
            })
        }
    }

    editAnimal(id){
        let s = this.state
        axios.put(`./api/animals/${id}`, {
            species: s.species,
            gender: s.gender,
            color: s.color,
            coat: s.coat,
            microchip: s.microchip,
            fee: s.fee,
            weight_lbs: s.lbs,
            weight_oz: s.oz
        }).then(res=>{
            console.log(res.data)
            this.setState({edit:false, currentAnimal:res.data[0]})
            console.log('current',this.state.currentAnimal)
        })
    }

    render(){
        let a = this.state.currentAnimal;
        let s = this.state
        return(
            <div className={a.gender==='MALE'? 'displaySingleAnimal male mobile' : 'displaySingleAnimal female mobile'}>
                
                        <div className="top">
                 <div className="displayheader">
                    <div className="imgdiv">
                        <img className='mainImage' src={a.image} alt=""/>
                        <div className='name'>{a.animal_name}</div>
                        <div className='notes'>{a.notes}</div>
                    </div>
                        </div>
            </div>
            <div className="box">
            <div className="icons">
            <img className='editIcon iconDisplay' src={editIcon} alt="" onClick={()=>this.toggleEdit()}/>
            <img className='editIcon iconDisplay' src={deleteIcon} alt="" onClick={()=>this.props.deleteAnimal(a.id)}/>
            </div>
            </div>
                   <div className="listcontainer">
                   <div className='infoList'>
                       <div className={this.state.edit ?'light list noDisplay': a.gender==='MALE' ? ' light list' : ' lightf list'}>{`Species: ${a.species}`} </div>
                       <div className={this.state.edit ?'light list noDisplay': a.gender==='MALE' ? ' dark list' : ' darkf list'}>{`Gender: ${a.gender}`}</div>
                       <div className={this.state.edit ?'light list noDisplay': a.gender==='MALE' ? ' light list' : ' lightf list'}>{`Color: ${a.color}`}</div>
                       <div className={this.state.edit ?'light list noDisplay': a.gender==='MALE' ? ' dark list' : ' darkf list'}>{`Coat Type: ${a.coat}`}</div>
                       <div className={this.state.edit ?'light list noDisplay': a.gender==='MALE' ? ' light list' : ' lightf list'}>{`Microchip Number: ${a.microchip}`}</div>
                       <div className={this.state.edit ?'light list noDisplay': a.gender==='MALE' ? ' dark list' : ' darkf list'}>{`Adoption Fee: ${a.fee}`}</div>
                       <div className={this.state.edit ?'light list noDisplay': a.gender==='MALE' ? ' light list' : ' lightf list'}>{`Weight: ${a.weight_lbs} lbs ${a.weight_oz} oz`}</div>

                        {/* Editable Fields                       */}
                            <div className={this.state.edit?'dark list': 'dark list noDisplay'}>
                            {`Species:`}<input type="text" placeholder={s.species} onChange={(e)=>this.setState({species:e.target.value})}/>
                            </div>
                            <div className={this.state.edit?'light list': 'dark list noDisplay'}>
                            {`Gender:`}<input type="text" placeholder={a.gender} onChange={(e)=>this.setState({gender:e.target.value})}/>
                            </div>
                            <div className={this.state.edit?'dark list': 'dark list noDisplay'}>
                            {`Color:`}<input type="text" placeholder={a.color} onChange={(e)=>this.setState({color:e.target.value})}/>
                            </div>
                            <div className={this.state.edit?'light list': 'dark list noDisplay'}>
                            {`Coat Type:`}<input type="text" placeholder={a.coat} onChange={(e)=>this.setState({coat:e.target.value})}/>
                            </div>
                            <div className={this.state.edit?'dark list': 'dark list noDisplay'}>
                            {`Microchip Number:`}<input type="text" placeholder={a.microchip} onChange={(e)=>this.setState({microchip:e.target.value})}/>
                            </div>
                            <div className={this.state.edit?'light list': 'dark list noDisplay'}>
                            {`Adoption Fee:`}<input type="number" placeholder={a.fee} onChange={(e)=>this.setState({fee:e.target.value})}/>
                            </div>
                            <div className={this.state.edit?'dark list': 'dark list noDisplay'}>
                            {`Weight:`}<input className='weight' type="number" placeholder={a.weight_lbs} onChange={(e)=>this.setState({lbs:e.target.value})}/>lbs <input className='weight' type="number" placeholder={a.weight_oz} onChange={(e)=>this.setState({oz:e.target.value})}/>oz
                            </div>
                   </div>
                   </div>
                  
                  
                  <div className="fullIconsbox">
                  <img className='fullIcons' src={exitIcon} alt="" onClick={()=>this.props.falseView()}/>
                  </div>
                  <div className={this.state.edit?'enter': 'enter noDisplay'}>
                  <img className='submitButton'src={submitButton} alt="" onClick={()=>{
                      this.editAnimal(a.id)
                    }}/>
                  </div>
                  <div className="editDeleteBox">
                  <img className='editDelete' src={editIcon} alt="" onClick={()=>this.toggleEdit()}/>
            <img className='editDelete' src={deleteIcon} alt="" onClick={()=>this.props.deleteAnimal(a.id)}/>
                  </div>
                    <img className='exitIcon iconDisplay' src={exitIcon} alt="" onClick={()=>this.props.falseView()}/>
                    
            </div>
        )
    }
}