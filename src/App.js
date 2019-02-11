import React, { Component } from 'react';
import Centers from './components/Forms'
import Header from './components/Header'
import PatientSliders from './components/PatientSliders'
import Feedback from './components/Feedback'
import NewQuestion from './components/AddQuestion'
import AddConnection from './components/AddConnection'
import ManageQuestions from './components/ManageQuestions'
import ReviewFeedback from './components/ReviewFeedback'
import FrontPage from './components/FrontPage'
import CenterInformation from './components/CenterInformation'
import './css/Header.css';
import './css/Check.css';
import './css/Admin.css';


import {BrowserRouter as Router, Route} from "react-router-dom";


class App extends Component {

    render() {

        return (
            <div className="App">
                <Header/>
                <div className="outer_container">
                    <Router>
                        <Route exact path="/" component={FrontPage} />
                    </Router>
                    <Router>
                        <Route path="/patient" component={PatientSliders}/>
                    </Router>
                    <Router>
                        <Route path="/center" component={Centers}/>
                    </Router>
                    <Router>
                        <Route path="/feedback" component={Feedback}/>
                    </Router>
                    <Router>
                        <Route path="/admin/add" component={NewQuestion}/>
                    </Router>
                    <Router>
                        <Route path="/admin/manage" component={ManageQuestions}/>
                    </Router>
                    <Router>
                        <Route path="/admin/connection" component={AddConnection}/>
                    </Router>
                    <Router>
                        <Route path="/admin/feedback" component={ReviewFeedback}/>
                    </Router>
                    <Router>
                        <Route path="/admin/center" component={CenterInformation}/>
                    </Router>
                </div>
            </div>

        );
    }
}

export default App;
