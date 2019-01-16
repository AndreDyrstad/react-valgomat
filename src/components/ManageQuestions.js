import React, {Component} from 'react'
import axios from 'axios'
import {Form, Field} from 'react-final-form'

class ManageQuestions extends Component {


    constructor(props) {
        super(props);

        axios.get('http://localhost:5000/allQuestions')
            .then(res => this.setState({files: res.data, isLoading: false}))
            .then(res => this.readConfigFile());

        this.state = {
            isLoading: true,
            selectedQuestions: {},
            categories: []
        }
    }

    readConfigFile = () => {
        let jsonObj = this.state.files.config.questions;
        console.log(jsonObj);
        let keys = Object.keys(jsonObj);
        console.log(keys);


        this.setState({categories: keys, selectedQuestions: jsonObj})
    };

    addToList = (obj) => {
        if(this.state.categories.length > 1) {

            let newState = this.state.selectedQuestions;

            let current = this.state.files.questions;


            for (let i in current) {
                for (let j in obj.questions)
                    if (current[i].label === obj.questions[j])
                        newState[this.selectedCategory.value].push(current[i])
            }

            this.setState({selectedQuestions: newState});
        }

    };

    removeFromList = (obj) => {
        let newState = this.state.selectedQuestions;

        for(let i in newState[this.selectedCategory.value]){
            for(let j in obj.questions) {
                if (newState[this.selectedCategory.value][i].label === obj.questions[j]){
                    newState[this.selectedCategory.value].splice(i,1)
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
                                        Legg til kategori
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
                                    Legg til spørsmål i listen
                                </button>
                            </div>
                        </form>
                    )}
                />
                </div>
                <div>
                    <select onChange={() => this.forceUpdate()} ref = {(input)=> this.selectedCategory = input}>
                        <option selected disabled>Velg kategori</option>
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
                                    {this.state.isLoading || this.selectedCategory.value === "Velg kategori" ? null : this.showSelectedQuestions()}
                                </Field>
                                <div className="buttons">
                                    <button type="submit" disabled={submitting || pristine}>
                                        Fjern spørsmål fra listen
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                </div>

                <div>
                    <button onClick={this.submit}>Oppdater spørsmålslisten</button>
                </div>
            </div>

        )
    }

}

export default ManageQuestions