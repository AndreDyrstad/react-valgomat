import React, { Component } from 'react';
import axios from "axios/index";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class Feedback extends Component{

    constructor(props) {
        super(props);

        let a = {};

        this.state = {
            isHovering: false,
            hasResponse: false,
            display: [],
            displayValue: 0,
            sliders: a,
        };

    }

    submitForm = () => {
        let sliders = this.state.sliders;
        sliders['center'] = this.menu.value;
        sliders['patient'] = this.patientId.value;


        console.log(this.menu.value);
        axios.post('http://localhost:5000/sendFeedback', sliders).then(res => this.setState({hasResponse: true, response: res.data}))
    };

    submitPatientId = () => {
        console.log(this.patientId.value);
        axios.post('http://localhost:5000/feedbackQuestions', {'patient_id': this.patientId.value}).then(res => this.setState({files: res.data}));

    };

    handleOnChange = (obj, value) => {
        let a = this.state.sliders;
        a[obj] = value;
        this.setState({
            sliders: a
        })
    };

    showIdSelection = () => (
        <div>
            <input type="text" ref = {(input)=> this.patientId = input} placeholder="Id"/>
            <button onClick={this.submitPatientId}>Button</button>
        </div>
    );

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
                    {this.showIdSelection()}
                    <select ref = {(input)=> this.menu = input}>
                        {this.state.files === undefined ? null : this.showCenters()}}
                    </select>
                    {this.state.files === undefined ? <p>Skriv inn din bruker-id for å få tilgang til undersøkelsen</p> : this.showQuestions()}
                    <button onClick={this.submitForm}>Button</button>
                </div>
            )
    }
}

export default Feedback;