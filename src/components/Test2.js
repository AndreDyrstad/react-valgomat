import React from 'react'
import {render} from 'react-dom'
import regioner from '../json/regioner';
import about from '../json/about';
import typeOpphold from '../json/typeOpphold'
import faggrupper from '../json/faggrupper'
import problemstillinger from '../json/problemstilliger'
import {Form, Field} from 'react-final-form'
import axios from "axios/index";

const onSubmit = async values => {

    axios.post('http://localhost:5000/information', values)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

const Test = () => (
    <div>
        <Form
            onSubmit={onSubmit}
            initialValues={{}}
            render={({handleSubmit, form, submitting, pristine, values}) => (

                <form onSubmit={handleSubmit}>


                    <div>
                        <h2>Informasjon om dere</h2>
                        {about.questions.map(item =>

                            <div>
                                <label>{item.label}</label>
                                <Field
                                    name={item.value}
                                    component="input"
                                    type="text"
                                    placeholder={item.label}
                                />
                            </div>
                        )}


                        <label>Regioner</label>
                        {regioner.questions.map(item =>
                            <label>
                                <Field
                                    name="regioner"
                                    component="input"
                                    type="checkbox"
                                    value={item.value}
                                />{' '}
                                {item.label}
                            </label>
                        )}
                    </div>
                    <h2>Generelt om tilbud og innhold</h2>
                    <div>
                        {typeOpphold.questions.map(item =>

                            <div>
                                <label>{item.label}</label>
                                <label>
                                    <Field
                                        name={item.value}
                                        component="input"
                                        type="radio"
                                        value="true"
                                    />{' '}
                                    Ja
                                </label>

                                <label>
                                    <Field
                                        name={item.value}
                                        component="input"
                                        type="radio"
                                        value="false"
                                    />{' '}
                                    Nei
                                </label>
                            </div>
                        )}
                    </div>
                    <h1>Tilbud til personer med MS</h1>
                    <div>
                        {typeOpphold.questions.map(item =>

                            <div>
                                <label>{item.label}</label>
                                <label>
                                    <Field
                                        name={item.value}
                                        component="input"
                                        type="radio"
                                        value="true"
                                    />{' '}
                                    Ja
                                </label>

                                <label>
                                    <Field
                                        name={item.value}
                                        component="input"
                                        type="radio"
                                        value="false"
                                    />{' '}
                                    Nei
                                </label>
                            </div>
                        )}
                    </div>



                    <label>Faggrupper/profesjoner som er tilknyttet MS-rehabiliteringen</label>
                    {faggrupper.questions.map(item =>
                        <label>
                            <Field
                                name="regioner"
                                component="input"
                                type="checkbox"
                                value={item.value}
                            />{' '}
                            {item.label}
                        </label>
                    )}



                    <h2>Tilbud omfatter rehabilitering for</h2>
                    {problemstillinger.questions.map(item =>
                        <label>
                            <Field
                                name="regioner"
                                component="input"
                                type="checkbox"
                                value={item.value}
                            />{' '}
                            {item.label}
                        </label>
                    )}


                    <h2>Notes</h2>
                    <Field name="notes" component="textarea" placeholder="Notes" />

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
);

render(<Test/>, document.getElementById("root"));
export default Test
