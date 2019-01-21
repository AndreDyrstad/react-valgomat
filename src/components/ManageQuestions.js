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
        if (this.state.categories.length > 1 && this.selectedCategory.value !== "Velg kategori" && this.selectedDisplayType.value !== "Velg spørsmålstype") {

            let newState = this.state.selectedQuestions;

            let current = this.state.files.questions;

            for (let i in current) {
                for (let j in obj.questions)
                    if (current[i].label === obj.questions[j]) {
                        current[i]["displayAs"] = this.selectedDisplayType.value;
                        newState[this.selectedCategory.value].push(current[i]);
                    }
            }

            this.setState({selectedQuestions: newState});
        }

    };

    removeFromList = (obj) => {
        let newState = this.state.selectedQuestions;

        for (let i in newState[this.selectedCategory.value]) {
            for (let j in obj.questions) {
                let substring = obj.questions[j].substring(0, obj.questions[j].indexOf(" -"));
                console.log(substring);

                if (newState[this.selectedCategory.value][i].label === substring) {
                    newState[this.selectedCategory.value].splice(i, 1)
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
            <option key={obj.id}>{obj.label} - {obj.displayAs}</option>
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
                <div className="manage_outer_container">
                    <div className="select_module">
                        <strong>Alle spørsmål</strong>
                        <Form
                            onSubmit={this.addToList}
                            render={({handleSubmit, form, submitting, pristine, values}) => (
                                <form onSubmit={handleSubmit}>
                                    <Field className="select-window" name="questions" component="select" type="select"
                                           multiple>
                                        {this.state.isLoading ? null : this.showAllQuestions()}
                                    </Field>
                                    <div>
                                        <select onChange={() => this.forceUpdate()}
                                                ref={(input) => this.selectedCategory = input}>
                                            <option selected disabled>Velg kategori</option>
                                            {this.showCategories()}
                                        </select>
                                    </div>
                                    <div className="buttons">
                                        <button type="submit" disabled={submitting || pristine}>
                                            Legg til spørsmål i listen
                                        </button>
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                    <div className="select_module">
                        <strong>Valgte spørsmål</strong>
                        <Form
                            onSubmit={this.removeFromList}
                            render={({handleSubmit, form, submitting, pristine, values}) => (
                                <form onSubmit={handleSubmit}>
                                    <Field className="select-window" name="questions" component="select" type="select"
                                           multiple>
                                        {this.state.isLoading || this.selectedCategory.value === "Velg kategori" ? null : this.showSelectedQuestions()}
                                    </Field>
                                    <div>
                                        <select ref={(input) => this.selectedDisplayType = input}>
                                            <option selected disabled>Velg spørsmålstype</option>
                                            <option value="checkbox">Checkbox</option>
                                            <option value="radio">Ja/Nei</option>
                                            <option value="slider">Slider</option>
                                            <option value="text">Tekstfelt</option>
                                        </select>
                                    </div>
                                    <div className="buttons">
                                        <button type="submit" disabled={submitting || pristine}>
                                            Fjern spørsmål fra listen
                                        </button>
                                    </div>
                                </form>
                            )}
                        />
                    </div>

                </div>

                <div>
                    <button className="submit_questions" onClick={this.submit}>Oppdater spørsmålslisten</button>
                </div>
            </div>

        )
    }

}

export default ManageQuestions