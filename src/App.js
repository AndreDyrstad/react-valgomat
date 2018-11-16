import React, { Component } from 'react';
import Centers from './components/Forms'
import Patients from './components/Forms2'
import oldCenters from './oldFiles/components/Centers'
import oldPatients from './oldFiles/components/Patients'
import Header from './components/Header'
import FormMaker from './components/FormMaker'
import './css/Header.css';

import {BrowserRouter as Router, Route} from "react-router-dom";



class App extends Component {

  render() {

    return (
      <div className="App">

          <Header/>

          <Router>
             <Route exact path="/" component={oldPatients} />
          </Router>
          <Router>
              <Route path="/beta/patient" component={Patients}/>
          </Router>
          <Router>
              <Route path="/beta/center" component={Centers}/>
          </Router>
          <Router>
              <Route path="/center" component={oldCenters}/>
          </Router>
          <Router>
              <Route path="/patient" component={oldPatients}/>
          </Router>
          <Router>
              <Route path="/admin" component={FormMaker}/>
          </Router>
      </div>
    );
  }
}

export default App;
