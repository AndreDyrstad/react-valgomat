import React, {Component} from 'react'
import axios from 'axios'
import {Form, Field} from 'react-final-form'

class ManageQuestions extends Component {


    constructor(props) {
        super(props);

        axios.get('http://localhost:5000/allQuestions').then(res => this.setState({files: res.data, isLoading: false}));

        this.state = {
            isLoading: true,
            selectedQuestions: []
        }
    }

    addToList = (obj) => {
        let newState = this.state.selectedQuestions;
        for(let i in obj.questions) newState.push(obj.questions[i]);
        this.setState({selectedQuestions: newState});
        console.log(this.state.selectedQuestions)
    };

    removeFromList = (obj) => {
        console.log(obj.questions);
        let newState = this.state.selectedQuestions;
        for(let i in newState){
            for(let j in obj.questions) {
                console.log(newState[i] + "  " + obj.questions[j]);
                if (newState[i] === obj.questions[j]){
                    newState.splice(i,1)
                }

            }
        }

        console.log(newState);
        this.setState({selectedQuestions: newState})

    };

    showAllQuestions = () => (
        this.state.files.questions).map((obj, index) => {

        return (
            <option key={obj.label}>{obj.label}</option>
        )

    });

    showSelectedQuestions = () => (
        this.state.selectedQuestions).map((obj, index) => {

        return (
            <option key={obj}>{obj}</option>
        )

    });


    render() {
        return (
            <div>
                <h1>Alle spørsmål</h1>
                <div>
                <Form
                    onSubmit={this.addToList}
                    render={({handleSubmit, form, submitting, pristine, values}) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="questions" component="select" type="select" multiple>
                                {this.state.isLoading ? null : this.showAllQuestions()}
                            </Field>
                            <div className="buttons">
                                <button type="submit" disabled={submitting || pristine}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                />
                </div>
                <h1>Valgte spørsmål</h1>
                <div>
                    <Form
                        onSubmit={this.removeFromList}
                        render={({handleSubmit, form, submitting, pristine, values}) => (
                            <form onSubmit={handleSubmit}>
                                <Field name="questions" component="select" type="select" multiple>
                                    {this.state.isLoading ? null : this.showSelectedQuestions()}
                                </Field>
                                <div className="buttons">
                                    <button type="submit" disabled={submitting || pristine}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                </div>



            </div>

        )
    }

}

export default ManageQuestions