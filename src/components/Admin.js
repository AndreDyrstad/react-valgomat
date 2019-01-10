import React, {Component} from 'react'
import {Form, Field} from 'react-final-form'
import axios from "axios/index";


class Admin extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }

    onSubmit = (values) => {
        axios.post('http://localhost:5000/newQuestion', values)
    };

    showNewQuestion = () => (
        <div>
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
                                <label>Id for å identifisere spørsmålet. Dette kan være spørsmålet oppsummert i form av "øvreAldersgrense" </label>
                                <Field
                                    name="value"
                                    component="input"
                                    type="text"
                                    placeholder="Id"
                                />
                            </div>
                            <div>
                                <label>Tilleggsinformasjon til spørsmålet. Denne informasjonen vil ligge ved siden av spørsmålet</label>
                                <Field name="info" component="textarea" placeholder="Tilleggsinformasjon"/>
                            </div>
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
    )

    render() {
        return (
            <div>
                <h1>Hello world</h1>
                {this.showNewQuestion()}
            </div>
        )
    }

}

export default Admin