import React, {Component} from 'react'
import {Form, Field} from 'react-final-form'
import axios from "axios/index";
import { Button } from 'react-bootstrap'
import Response from "./smallComponents/Response";
import {getHvlApi} from "../global";


class NewQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            done: false
        }

}

    onSubmit = (values) => {
        axios.post(getHvlApi() + '/question/new', values)
            .catch(err => console.log(err))
            .then(res => this.setState({done:true}))
    };

    render(){
        return(
            <div className="admin_outer_container">
                <h2>Fyll ut feltene under for å legge til et nytt spørsmål</h2>
                <Form
                    onSubmit={this.onSubmit}
                    render={({handleSubmit, form, submitting, pristine, values}) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Spørsmålet som skal vises til pasienten</label>
                                <Field
                                    name="label"
                                    component="input"
                                    type="text"
                                    placeholder="Spørsmål"
                                />
                            </div>
                            <div>
                                <label>Id for å identifisere spørsmålet. Dette kan være spørsmålet oppsummert i form av
                                    "øvreAldersgrense" </label>
                                <Field
                                    name="value"
                                    component="input"
                                    type="text"
                                    placeholder="Id"
                                />
                            </div>
                            <div>
                                <label>Tilleggsinformasjon til spørsmålet. Denne informasjonen vil ligge ved siden av
                                    spørsmålet</label>
                                <Field name="info" component="textarea" placeholder="Tilleggsinformasjon"/>
                            </div>
                            <div className="buttons">
                                <Button type="submit" disabled={submitting || pristine} bsStyle="primary">
                                    Submit
                                </Button>
                                <Button
                                    type="button"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                    bsStyle="danger"
                                >
                                    Reset
                                </Button>
                                {this.state.done ? <Response type="success" header="Godkjent" message="Spørsmålet er nå lagt til"/> : null}
                            </div>
                        </form>
                    )}
                />
            </div>
        )
    }
}

export default NewQuestion