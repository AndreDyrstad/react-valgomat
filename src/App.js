import React, { Component } from 'react';
import Centers from './components/Forms'
import Patients from './components/Forms2'
import Header from './components/Header'
import PatientSliders from './components/PatientSliders'
import Feedback from './components/Feedback'
import './css/Header.css';
import './css/Check.css';


import {BrowserRouter as Router, Route} from "react-router-dom";
import Admin from "./components/Admin";


class App extends Component {

    render() {

        return (
            <div className="App">

                <Header/>

                <Router>
                    <Route exact path="/" component={Patients} />
                </Router>
                <Router>
                    <Route path="/patient" component={Patients}/>
                </Router>
                <Router>
                    <Route path="/center" component={Centers}/>
                </Router>
                <Router>
                    <Route path="/admin" component={Admin}/>
                </Router>
                <Router>
                    <Route path="/feedback" component={Feedback}/>
                </Router>
                <Router>
                    <Route path="/sliders" component={PatientSliders}/>
                </Router>
            </div>

        );
    }
}

export default App;
