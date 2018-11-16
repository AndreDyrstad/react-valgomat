import React, {Component} from 'react'
import {Form, Field} from 'react-final-form'
import axios from "axios/index";
import '../css/Header.css'
import '../css/New.css'
import {Button, Popover, OverlayTrigger, Glyphicon, Alert} from 'react-bootstrap'
import center from '../json/centers'

class FormMaker extends Component{

    constructor(props) {
        super(props);

        this.state = {
            questions: {
                "questions": {
                    "Om dere": [
                        {
                            "label": "Navn på institusjon/rehabiliteringsavdeling",
                            "value": "navn",
                            "type": "text"
                        }
                    ]
                }
            }
        }
    }


    onSubmit = async values => {

    };


    getForm = () => (
        <div>

            <div style={this.divStyle}>
                <h1>{center.introduction.header}</h1>
                <p> {center.introduction.description}</p>
            </div>


            {Object.keys(this.state.questions.questions).map((zone, index) => {
                    let a = this.getForm2(zone);
                    return (
                        <div key={zone}>
                            <h2>{zone}</h2>
                            <div>{a}</div>

                        </div>
                    )
                }
            )}
        </div>
    );

    getForm2 = (zone) => (

        //this.state.files.questions[zone].map((obj, idx) => {
        this.state.questions.questions[zone].map((obj, idx) => {
                if (obj.type === "text") {
                    return (

                        <div key={obj.label}>
                            <label>
                                {obj.label}
                                <Field
                                    name={obj.value}
                                    component="input"
                                    type={obj.type}
                                    value={obj.value}

                                />{' '}
                            </label>
                        </div>

                    )
                }


                if (obj.type === "radio") {
                    return (

                        <div key={obj.label}>
                            <h3>{obj.label}</h3>
                            <label>
                                <Field
                                    name={obj.value}
                                    component="input"
                                    type={obj.type}
                                    value="true"

                                />{' '}
                                Ja
                            </label>

                            <label>
                                <Field
                                    name={obj.value}
                                    component="input"
                                    type={obj.type}
                                    value="false"
                                />{' '}
                                Nei
                            </label>
                        </div>

                    )
                }


                return (
                    <div key={obj.label}>
                        <label>
                            <Field
                                name={zone}
                                component="input"
                                type={obj.type}
                                value={obj.value}
                            />{' '}
                            {obj.label}
                        </label>
                    </div>
                )
            }
        )
    );


    componentSelector = () => {
        return(
            <div>
                <Button onClick={() => this.addComponent("text")}>Tekstfelt</Button>
                <input id="test" type="text"/>
                <Button onClick={() => this.addComponent("radio")}>Radio Button</Button>
                <Button onClick={() => this.addComponent("checkbox")}>Checkbox</Button>
            </div>
        )
    };


    addComponent = (type) => {

        let newState = this.state.questions;

        console.log(typeof  newState);
        console.log(newState);

        newState.questions["Om dere"].push({"Nytt felt": [
                {
                    "label": "Navn på institusjon/rehabiliteringsavdeling",
                    "value": "navn",
                    "type": "text"
                }
                ]
                }
                );

        if(type === "text"){
            this.setState({questions : newState})
        }

    }

    render() {

        return (

            <div>

                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>

                <Form
                    onSubmit={this.onSubmit}
                    initialValues={{}}
                    render={({handleSubmit, form, submitting, pristine, values}) => (

                        <form onSubmit={handleSubmit}>

                            {this.getForm()}

                            {this.state.submitted && this.getDone()}


                            <div className="buttons">

                                    <Button type="submit" bsStyle="primary"
                                            disabled={submitting || pristine}>Send</Button>

                            </div>
                            {this.componentSelector()}
                        </form>
                    )}
                />

            </div>
        )
    };



}
export default FormMaker