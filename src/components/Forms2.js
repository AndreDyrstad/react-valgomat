import React, {Component} from 'react'
import {Form, Field} from 'react-final-form'
import axios from "axios/index";
import {Button, Popover, OverlayTrigger, Glyphicon, Alert} from 'react-bootstrap'
import Recommendation from "./Recommendation";
import patients from '../json/patients';

class Forms extends Component {

    constructor(props) {
        super(props);
        //axios.get('http://localhost:5000/patients').then(res => this.setState({files: res.data}));
        //axios.get('http://modelling.hvl.no:8020/patients').then(res => this.setState({files: res.data}));
        this.state = {
            isHovering: false,
            hasResponse: false,
            display: [],
            displayValue: 0,
        };

        for (let k in patients.questions) this.state.display.push("none");
        this.state.display[0] = "block"
    }


    changeDisplay = (value) => {

        let item = this.state.display;
        let index = this.state.displayValue;

        //Forward
        if (value > 0 && index < item.length - 1) {
            item[index] = "none";
            index++;
            item[index] = "block";
            this.setState({display: item, displayValue: index})
        }
        //Backward
        else if (value < 0 && index > 0) {
            item[index] = "none";
            index--;
            item[index] = "block";
            this.setState({display: item, displayValue: index})
        }
    };


    onSubmit = async values => {
        //axios.post('http://localhost:5000/classify', values).then(res => this.setState({hasResponse: true, response: res.data}))
        axios.post('http://modelling.hvl.no:8020/classify', values).then(res => this.setState({hasResponse: true,response: res.data}))
    };

    getForm = () => (
        <div>
            <div>
                <h1>{patients.introduction.header}</h1>
                <p> {patients.introduction.description}</p>
            </div>


            {Object.keys(patients.questions).map((zone, index) => {
                    let a = this.getForm2(zone);
                    return (
                        <div className={"quest"} style={{display: this.state.display[index]}} key={zone}>
                            <h2>{zone}</h2>
                            <div>{a}</div>

                        </div>
                    )
                }
            )}
        </div>
    );

    infoBox = (header, text) => (
        <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="right"
            overlay={<Popover id="popover-trigger-hover-focus" title={header}>{text}</Popover>}
        >
            <Glyphicon glyph="glyphicon glyphicon-info-sign"/>
        </OverlayTrigger>

    );

    getError = () => {
        return (
            <div className="stick">
                <Alert bsStyle="danger">
                    <strong>Obs!</strong>
                    <p>Det ser ut som at serverene våre har gått ned. Vennligst prøv igjen senere.</p>
                    <a href="http://valgomat.herokuapp.com/patient">Klikk her for å bytte til http (kan kanskje fikse
                        problemet)</a>

                </Alert>
            </div>
        )
    };

    getForm2 = (zone) => (

        patients.questions[zone].map((obj, idx) => {
                if (obj.type === "text") {
                    return (

                        <div className={"question"} key={obj.label}>
                            <label>
                                {obj.label}
                                <Field
                                    name={obj.value}
                                    component="input"
                                    type={obj.type}
                                    value={obj.value}
                                    required
                                />{' '}
                                {obj.extra === undefined ? false : this.infoBox(obj.label, obj.extra)}
                            </label>
                        </div>

                    )
                }


                if (obj.type === "radio") {
                    return (

                        <div className={"question"} key={obj.label}>
                            <h3>{obj.label}</h3>
                            <label>
                                <Field
                                    name={obj.value}
                                    component="input"
                                    type={obj.type}
                                    value="true"
                                    required
                                />{' '}
                                Ja
                            </label>

                            <label>
                                <Field
                                    name={obj.value}
                                    component="input"
                                    type={obj.type}
                                    value="false"
                                    required
                                />{' '}
                                Nei
                                {obj.extra === undefined ? false : this.infoBox(obj.label, obj.extra)}
                            </label>
                        </div>

                    )
                }


                return (
                    <div className={"question"} key={obj.label}>
                        <label>
                            <Field
                                name={zone}
                                component="input"
                                type={obj.type}
                                value={obj.value}
                            />{' '}
                            {obj.label}
                            {obj.extra === undefined ? false : this.infoBox(obj.label, obj.extra)}
                        </label>
                    </div>
                )
            }
        )
    );


    render() {

        if (!this.state.hasResponse) {
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
                                <div className={"test"}>

                                    <div className={"screen"}>
                                        {this.state.files !== undefined ? this.getError() : this.getForm()}
                                    </div>
                                    <div className="buttons">

                                        <Button onClick={() => this.changeDisplay(-1)}>Tilbake</Button>
                                        <Button onClick={() => this.changeDisplay(1)}>Frem</Button>
                                        {this.state.displayValue === this.state.display.length - 1 ?
                                            <Button type="submit" bsStyle="primary"
                                                    disabled={submitting || pristine}>Send</Button> : false}

                                    </div>
                                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                                </div>
                            </form>
                        )}
                    />

                </div>
            )
        } else {
            return (
                <div>
                    <p>{this.state.response.center}</p>
                    <Recommendation data={this.state.response}/>
                </div>
            )
        }
    }

}

export default Forms;