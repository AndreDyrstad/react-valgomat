import React, { Component } from 'react';
import axios from "axios/index";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class Feedback extends Component{



    constructor(props) {
        super(props);

        axios.get('http://localhost:5000/feedback').then(res => this.setState({files: res.data}));

        let a = {};

        this.state = {
            isHovering: false,
            hasResponse: false,
            display: [],
            displayValue: 0,
            sliders: a,
        };

    }

    submit = () => {
        console.log("shkjdflkdsf");
        console.log(this.menu.value)
        //axios.post('http://localhost:5000/scores', this.state.sliders).then(res => this.setState({hasResponse: true, response: res.data}))
    };

    handleOnChange = (obj, value) => {
        let a = this.state.sliders;
        a[obj] = value;
        this.setState({
            sliders: a
        })
    };

    handleChange = (value) => {
        console.log(value);
        this.setState({
            selectValue: value
        })
    };

    showQuestions = () => (
        Object.keys(this.state.files.questions).map((zone, index) => {
            return (
                <div key={this.state.files.questions[index].id}>
                    <p>{this.state.files.questions[index].label}</p>

                    <Slider
                        className="slider"
                        value={this.state.sliders[this.state.files.questions[index].value]}
                        orientation="horizontal"
                        max={10}
                        onChange={(e) => this.handleOnChange(this.state.files.questions[index].value, e)}
                    />

                </div>

            )
        })
    );

    showCenters = () => (
        Object.keys(this.state.files.centers).map((zone, index) => {
            return(
                <option key={index}>{this.state.files.centers[index].name}</option>
            )
        })

    );

        render(){

            return(
                <div>
                    <select ref = {(input)=> this.menu = input}>
                        {this.state.files === undefined ? null : this.showCenters()}}
                    </select>
                    {this.state.files === undefined ? <h1>Wut</h1> : this.showQuestions()}
                    <button onClick={this.submit}>Button</button>
                </div>
            )
    }
}

export default Feedback;