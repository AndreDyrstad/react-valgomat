import React, {Component} from 'react'
import axios from 'axios'
import {Form, Field} from 'react-final-form'

class ManageQuestions extends Component {


    constructor(props) {
        super(props);

        axios.get('http://localhost:5000/allQuestions').then(res => this.setState({files: res.data, isLoading: false})).then(res => console.log(this.state.files));

        this.state = {
            isLoading: true,
            selectedQuestions: {},
            categories: []
        }
    }

    addToList = (obj) => {
        let newState = this.state.selectedQuestions;

        let current = this.state.files.questions;


        for(let i in current) {
            for(let j in obj.questions)
            if (current[i].label === obj.questions[j])
                newState[this.selectedCategory.value].push(current[i])
        }

        this.setState({selectedQuestions: newState});

        console.log(this.state.selectedQuestions)
    };

    removeFromList = (obj) => {
        console.log(obj.questions);
        let newState = this.state.selectedQuestions;
        for(let i in newState){
            for(let j in obj.questions) {
                if (newState[i] === obj.questions[j]){
                    newState.splice(i,1)
                }

            }
        }

        this.setState({selectedQuestions: newState})

    };

    addCategory = (obj) => {
        let newCategory = this.state.categories;
        let newSelectedQuestions = this.state.selectedQuestions;

        newCategory.push(obj.category);

        newSelectedQuestions[obj.category] = [];

        this.setState({categories: newCategory, selectedQuestions: newSelectedQuestions});

    };

    submit = () => {

        axios.post('http://localhost:5000/updateQuestions', this.state.selectedQuestions)
    };

    showAllQuestions = () => (
        this.state.files.questions).map((obj, index) => {

        return (
            <option id={obj.id} key={obj.label}>{obj.label}</option>
        )

    });

    showSelectedQuestions = () => (
        this.state.selectedQuestions[this.selectedCategory.value]).map((obj, index) => {
        return (
            <option key={obj.id}>{obj.label}</option>
        )

    });

    showCategories = () => (
        this.state.categories).map((obj, index) => {

            return (
                <option key={obj}>{obj}</option>
            )

        }
    );


    render() {
        return (
            <div>
                <h1>Legg til kategori</h1>
                <div>
                    <Form
                        onSubmit={this.addCategory}
                        render={({handleSubmit, form, submitting, pristine, values}) => (
                            <form onSubmit={handleSubmit}>
                                        <label>
                                            Legg til en ny kategori
                                            <Field
                                                name="category"
                                                component="input"
                                                type="text"
                                                value="category"
                                            />{' '}
                                        </label>
                                <div className="buttons">
                                    <button type="submit" disabled={submitting || pristine}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                </div>
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
                <div>
                    <select onChange={() => this.forceUpdate()} ref = {(input)=> this.selectedCategory = input}>
                        {this.showCategories()}
                    </select>
                </div>
                <h1>Valgte spørsmål</h1>
                <div>
                    <Form
                        onSubmit={this.removeFromList}
                        render={({handleSubmit, form, submitting, pristine, values}) => (
                            <form onSubmit={handleSubmit}>
                                <Field name="questions" component="select" type="select" multiple>
                                    {this.state.isLoading || this.selectedCategory.value === "" ? null : this.showSelectedQuestions()}
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


                <button onClick={this.submit}>Oppdater spørsmålslisten</button>
            </div>

        )
    }

}

export default ManageQuestions