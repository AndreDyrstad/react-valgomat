import React from 'react'
import {render} from 'react-dom'
import testing from '../json/test';
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

const onRender = async values => {
   return axios.get('http://localhost:5000/')
        /*.then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });*/
};

const getForm = () => (
    <div>
        {Object.keys(testing.questions).map((zone, index) => {
            let a = getForm2(zone);
            return (
                <div>
                    <h2>{zone}</h2>
                    <div>{a}</div>
                </div>
                )
            }
        )}
    </div>
);

const getForm2 = (zone) => (

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

);

const Test = () =>{
    onRender().then(res => console.log(res.data));

return(

    <div>
        <Form
            onSubmit={onSubmit}
            initialValues={{}}
            render={({handleSubmit, form, submitting, pristine, values}) => (

                <form onSubmit={handleSubmit}>

                    {getForm()}

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

render(<Test/>, document.getElementById("root"));
export default Test
