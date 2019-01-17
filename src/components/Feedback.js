import React, { Component } from 'react';
import axios from "axios/index";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import {Alert} from 'react-bootstrap'

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


    getDone = () => {

        if (this.state.response.message !== "ok") {
            return (
                <div className="stick">
                    <Alert bsStyle="danger">
                        <strong>Obs!</strong>
                        <p>Det ser ut som at serverene våre har gått ned. Vennligst prøv igjen senere.</p>
                    </Alert>
                </div>
            )
        }
        else {
            console.log("yup");
            return (
                <div className="stick">
                    <Alert bsStyle="success">
                        <strong>Godkjent!</strong>
                        <p>Tusen takk for ditt svar.</p>
                    </Alert>
                </div>
            )
        }
    };


    submitForm = () => {
        let sliders = this.state.sliders;
        sliders['center'] = this.menu.value;
        sliders['patient'] = this.patientId.value;

        this.setState({submitted : true});

        axios.post('http://localhost:5000/sendFeedback', sliders).then(res => this.setState({hasResponse: true, response: res.data}))
        //axios.post('http://modelling.hvl.no:8020/sendFeedback', sliders).then(res => this.setState({hasResponse: true, response: res.data}))



    };

    submitPatientId = () => {
        if(this.patientId.value.length === 10) {
            axios.post('http://localhost:5000/feedbackQuestions', {'patient_id': this.patientId.value})
                .then(res => this.setState({files: res.data}))
                .then(this.setDefaultValues())
            //axios.post('http://modelling.hvl.no:8020/feedbackQuestions', {'patient_id': this.patientId.value}).then(res => this.setState({files: res.data}));

        }else{
            this.setState({files: undefined})
        }

    };

    setDefaultValues = () => {
        let defaultSliderValues = {};

        for(let i in this.state.files.questions){
            defaultSliderValues[this.state.files.questions[i].value] = 5;
            this.setState({sliders: defaultSliderValues})
        }
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
            <input maxLength="10" onChange={this.submitPatientId} type="text" ref = {(input)=> this.patientId = input} placeholder="Id"/>
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
                    <strong>Skriv inn din bruker-id for å få tilgang til undersøkelsen</strong>
                    {this.showIdSelection()}
                    <select ref = {(input)=> this.menu = input}>
                        {this.state.files === undefined ? null : this.showCenters()}}
                    </select>
                    {this.state.files !== undefined ? this.showQuestions() : null}
                    {this.state.files !== undefined ? <button onClick={this.submitForm}>Button</button> : null}
                    {this.state.response !== undefined ? this.getDone() : null}
                </div>
            )
    }
}

export default Feedback;