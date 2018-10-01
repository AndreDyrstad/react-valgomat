import React from 'react'
import {render} from 'react-dom'
//import Styles from './Styles'
import viktig from '../json/viktig';
import opphold from '../json/opphold';
import testing from '../json/test';
import problemstilliger from '../json/problemstilliger';
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
                        <h2>Regioner</h2>
                        {viktig.questions.map(item =>
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

                    <div>
                        <h2>Opphold</h2>
                        {opphold.questions.map(item =>
                            <label>
                                <Field
                                    name="opphold"
                                    component="input"
                                    type="checkbox"
                                    value={item.value}
                                />{' '}
                                {item.label}
                            </label>
                        )}
                    </div>

                    <div>
                        <h2>Problemstilllinger</h2>
                        {problemstilliger.questions.map(item =>
                            <label>
                                <Field
                                    name="problemstilliger"
                                    component="input"
                                    type="checkbox"
                                    value={item.value}
                                />{' '}
                                {item.label}
                            </label>
                        )}
                    </div>

                    <div>
                        {Object.keys(testing.questions).map((zone, index) =>
                            testing.questions[zone].map((obj, idx) =>
                                <div>
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
                        )
                        }
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
);

render(<Test/>, document.getElementById("root"));
export default Test
