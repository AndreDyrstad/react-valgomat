import React, {Component} from 'react'
import {Form, Field} from 'react-final-form'
import axios from "axios/index";
import {Button, Popover, OverlayTrigger, Glyphicon, Alert} from 'react-bootstrap'
import Recommendation from "./Recommendation";


class Forms extends Component {

    constructor(props) {
        super(props);
        //axios.get('http://localhost:5000/patients').then(res => this.setState({files: res.data}));
        axios.get('http://modelling.hvl.no:8020/patients').then(res => this.setState({files: res.data}));
        this.state = {
            isHovering: false,
            hasResponse: false,
        }
    }

    onSubmit = async values => {
        //axios.post('http://localhost:5000/classify', values).then(res => this.setState({hasResponse: true, response: res.data}))
        axios.post('http://modelling.hvl.no:8020//classify', values).then(res => this.setState({hasResponse: true, response: res.data}))
    };

    getForm = () => (
        <div>
            <div>
                <h1>{this.state.files.introduction.header}</h1>
                <p> {this.state.files.introduction.description}</p>
            </div>


            {Object.keys(this.state.files.questions).map((zone, index) => {
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

    infoBox = (header, text) => (
        <div>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="right"
                overlay={<Popover id="popover-trigger-hover-focus" title={header}>{text}</Popover>}
            >
                <Glyphicon glyph="glyphicon glyphicon-info-sign"/>
            </OverlayTrigger>
        </div>

    );

    getError = () => {
        return (
            <div className="stick">
                <Alert bsStyle="danger">
                    <strong>Obs!</strong>
                    <p>Det ser ut som at serverene våre har gått ned. Vennligst prøv igjen senere.</p>
                    <link href="http://valgomat.herokuapp.com/patient">Klikk her for å bytte til http (kan kanskje fikse problemet)</link>

                </Alert>
            </div>
        )
    };

    getForm2 = (zone) => (

        this.state.files.questions[zone].map((obj, idx) => {
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
                                    required
                                />{' '}
                            </label>
                            {obj.extra === undefined ? false : this.infoBox(obj.label, obj.extra)}
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
                            </label>
                            {obj.extra === undefined ? false : this.infoBox(obj.label, obj.extra)}
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
                        {obj.extra === undefined ? false : this.infoBox(obj.label, obj.extra)}
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

                                {this.state.files === undefined ? this.getError() : this.getForm()}

                                <div className="buttons">
                                    <Button type="submit" bsStyle="primary" disabled={submitting || pristine}>
                                        Send
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                        bsStyle="danger"
                                    >
                                        Tilbakestill
                                    </Button>
                                </div>
                                <pre>{JSON.stringify(values, 0, 2)}</pre>
                            </form>
                        )}
                    />

                </div>
            )
        } else {
            return(
                <div>
                    <p>{this.state.response.center}</p>
                    <Recommendation data={this.state.response}/>
                </div>
            )
        }
    }

}

export default Forms;