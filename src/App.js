import React, { Component } from 'react';
import ShelterLogin from './Components/ShelterLogin/ShelterLogin';
import LandingPage from './Components/LandingPage/LandingPage';
import AnimalDisplay from './Components/AnimalDisplay/AnimalDisplay';
import AddAnimal from './Components/AddAnimal/AddAnimal';
import Oops from './Components/ShelterLogin/oops'
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <HashRouter>
         <Switch>
           <Route path='/' component={ShelterLogin} exact/>
           <Route path='/landing' component={LandingPage}/>
           <Route path='/oops' component={Oops}/>
           <Route path='/animal/:animal' component={AnimalDisplay}/>
           <Route path='/new/animal' component={AddAnimal}/>
         </Switch>
       </HashRouter>
      </div>
    );
  }
}

export default App;
