import React, {Component} from 'react'
import {Form, Field} from 'react-final-form'
import axios from "axios/index";
import {Button, Popover, OverlayTrigger} from 'react-bootstrap'


class Forms extends Component {

    constructor(props) {
        super(props);
        axios.get('http://localhost:5000/patients').then(res => this.setState({files: res.data}));
        this.state = {
            isHovering: false,
        }
    }

    onSubmit = async values => {
        axios.post('http://localhost:5000/classify', values)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
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

    getForm2 = (zone) => (

        this.state.files.questions[zone].map((obj, idx) => {
            if(obj.type === "text"){
                return(

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
                    </div>

                )
            }


            if(obj.type === "radio"){
                return(

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
                    </div>

                )
            }


            return(
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
            )}
        )
    );


    render() {

        return(

            <div>

                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>

                <Form
                    onSubmit={this.onSubmit}
                    initialValues={{}}
                    render={({handleSubmit, form, submitting, pristine, values}) => (

                        <form onSubmit={handleSubmit}>

                            {this.state.files === undefined ? false : this.getForm()}

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
        )};


}

export default Forms;