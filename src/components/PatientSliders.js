import React, {Component} from 'react'
import {Form} from 'react-final-form'
import axios from "axios/index";
import {Button, Popover, OverlayTrigger, Glyphicon, Alert} from 'react-bootstrap'
import Recommendation from "./Recommendation";
import '../css/Header.css'
import '../css/New.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import { Field } from 'react-final-form'

class PatientSliders extends Component {
    constructor(props) {
        super(props);
        //'http://modelling.hvl.no:8020/patients'
        //'http://localhost:5000/patients'
        axios.get('http://localhost:5000/patients').then(res => this.setState({files: res.data},
            function stateComplete(){

                Object.keys(this.state.files.questions).forEach((zone, index) => {
                    this.state.files.questions[zone].forEach((obj, idx) => {
                        a[obj.id] = 5;
                    })
                });

                for (let k in this.state.files.questions) this.state.display.push("none");
                this.state.display[0] = "block";

                this.forceUpdate();
                this.setState({isLoading: false})

            }.bind(this)));
        let a = {};

        this.state = {
            isHovering: false,
            hasResponse: false,
            display: [],
            displayValue: 0,
            sliders: a,
            isLoading: true
        };

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

        this.state.sliders[Object.keys(values)[0]] = values[Object.keys(values)[0]];
        console.log(this.state.sliders);

        //axios.post('http://modelling.hvl.no:8020/scores', this.state.sliders).then(res => this.setState({hasResponse: true, response: res.data}))
        axios.post('http://localhost:5000/scores', this.state.sliders).then(res => this.setState({
            hasResponse: true,
            response: res.data
        }))
    };

    getForm = () => (
        <div>
            <div className="introduction">
                <h1>{this.state.files.introduction.header}</h1>
                <p> {this.state.files.introduction.description}</p>
                {this.state.files.introduction.link === undefined ? false :
                    <a href={this.state.files.introduction.link}>Klikk her for å se ventetider</a>}

            </div>


            {Object.keys(this.state.files.questions).map((zone, index) => {
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

    handleOnChange = (obj, value) => {
        let a = this.state.sliders;
        a[obj] = value;
        this.setState({
            sliders: a
        })
    };

    getForm2 = (zone) => (
        this.state.files.questions[zone].map((obj, idx) => {

                if (obj.displayAs === "slider") {
                    return (
                        <div className={"question"} key={obj.label}>
                            <label>
                                {obj.label}
                                {obj.info === null ? false : this.infoBox(obj.label, obj.info)}

                                <Slider
                                    className="slider"
                                    value={this.state.sliders[obj.id]}
                                    orientation="horizontal"
                                    max={10}
                                    onChange={(e) => this.handleOnChange(obj.id, e)}
                                />
                                <div className='sliderValue'>{this.state.sliders[obj.id]}</div>

                            </label>
                        </div>
                    )
                }
                else
                {
                    return (
                        <div key={obj.label}>
                            <label>
                                {obj.label}
                                <Field
                                    name={"id"+obj.id}
                                    component="input"
                                    type={obj.displayAs}
                                    value={obj.id}

                                />{' '}
                                {obj.extra === undefined ? false : this.infoBox(obj.label, obj.extra)}
                            </label>
                        </div>
                    )
                }
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
                                        {this.state.isLoading ? <div className="loader"/> : this.getForm()}
                                    </div>
                                </div>
                                <div className="buttons">
                                    <div>

                                        {this.state.displayValue === this.state.display.length - 1 ?
                                            <Button type="submit" bsStyle="primary" id="send"
                                                    disabled={submitting}>Send</Button> : false
                                        }
                                    </div>

                                    {this.state.displayValue === 0 ? <Button bsStyle="primary" disabled onClick={() => {
                                            this.changeDisplay(-1);
                                            window.scrollTo(0, 0)
                                        }} id="back"> <Glyphicon glyph="chevron-left"/> Tilbake</Button> :

                                        <Button bsStyle="primary" onClick={() => {
                                            this.changeDisplay(-1);
                                            window.scrollTo(0, 0)
                                        }} id="back"> <Glyphicon glyph="chevron-left"/> Tilbake</Button>}


                                    {this.state.displayValue !== this.state.display.length - 1 ?

                                        <Button bsStyle="primary" onClick={() => {
                                            this.changeDisplay(1);
                                            window.scrollTo(0, 0)
                                        }}
                                                id="forward"> Neste <Glyphicon glyph="chevron-right"/> </Button> :

                                        <Button bsStyle="primary" disabled onClick={() => {
                                            this.changeDisplay(1);
                                            window.scrollTo(0, 0)
                                        }}
                                                id="forward"> Neste <Glyphicon glyph="chevron-right"/> </Button>

                                    }


                                </div>
                                <pre>{JSON.stringify(values, 0, 2)}</pre>
                            </form>
                        )}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <p>{this.state.response.center}</p>
                    <p>Under finner du din id. Denne er tilfeldig generert og kan brukes for å gi tilbakemeling om din behandling</p>
                    <p>{this.state.response.patient_id}</p>
                    <Recommendation data={this.state.response}/>
                </div>
            )
        }
    }

}

export default PatientSliders