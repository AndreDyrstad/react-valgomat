import React, {Component} from 'react'
import {Form, Field} from 'react-final-form'
import axios from "axios/index";

class Forms extends Component {

    constructor(props) {
        super(props);
        axios.get('http://localhost:5000/centers').then(res => this.setState({files: res.data}));
        this.state = {

        }
    }

    onSubmit = async values => {
        axios.post('http://localhost:5000/information', values)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    getForm = () => (
        <div>
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
                <Form
                    onSubmit={this.onSubmit}
                    initialValues={{}}
                    render={({handleSubmit, form, submitting, pristine, values}) => (

                        <form onSubmit={handleSubmit}>

                            {this.state.files === undefined ? false : this.getForm()}

                            <div className="buttons">
                                <button type="submit" disabled={submitting || pristine}>
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                >
                                    Reset
                                </button>
                            </div>
                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </form>
                    )}
                />
            </div>
        )};


}

export default Forms;