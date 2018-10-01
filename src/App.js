import React, { Component } from 'react';
import Patients from "./components/Test";
import Recommendation from "./components/Recommendation"
import Centers from './components/Centers'
import Test2 from './components/Test2'
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {

  render() {

    return (
      <div className="App">
          <Router>
             <Route exact path="/" component={Patients} />
          </Router>
          <Router>
              <Route path="/answer" component={Recommendation}/>
          </Router>
          <Router>
              <Route path="/center" component={Test2}/>
          </Router>
      </div>
    );
  }
}

export default App;
