import React, { Component } from 'react';
//import './App.css';
import axios from 'axios';
import Check from "./components/Check";
import Recommendation from "./components/Recommendation"
import Centers from './components/Centers'
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {

    onClick = () => {
        axios({
            method: 'post',
            url: 'https://dog.ceo/api/breeds/image/random',
        }).then(res => console.log(res))
            .catch(err => console.error(err));
    };


  render() {

    return (
      <div className="App">
          <Router>
             <Route exact path="/" component={Check} />
          </Router>
          <Router>
              <Route path="/answer" component={Recommendation}/>
          </Router>
          <Router>
              <Route path="/center" component={Centers}/>
          </Router>
      </div>
    );
  }
}

export default App;
