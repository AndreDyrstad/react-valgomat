import React, {Component} from 'react'
import axios from 'axios'
import {Form, Field} from 'react-final-form'

class ManageQuestions extends Component {


    constructor(props) {
        super(props);

        axios.post('http://modelling.hvl.no:8020/question/all', {"entity": "patient"})
            .then(res => this.setState({files: res.data, isLoading: false}))
            .then(res => this.readConfigFile());

        this.state = {
            isLoading: true,
            selectedQuestions: {},
            categories: []
        }
    }

    getQuestions = () => {
        axios.post('http://modelling.hvl.no:8020/question/all', {"entity": this.selectedEntity.value})
            .then(res => this.setState({files: res.data, isLoading: true, selectedQuestions: {}}))
            .then(res => this.readConfigFile())
            .then(res => this.setState({isLoading: false}))

    };

    readConfigFile = () => {
        let jsonObj = this.state.files.config.questions;
        let keys = Object.keys(jsonObj);

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
        this.setState({isLoading: true});
        let newState = this.state.selectedQuestions;
        let newCategory = this.state.categories;

        for (let i in newState[this.selectedCategory.value]) {
            for (let j in obj.questions) {
                let substring = obj.questions[j].substring(0, obj.questions[j].indexOf(" -"));

                if (newState[this.selectedCategory.value][i].label === substring) {
                    newState[this.selectedCategory.value].splice(i, 1);
                    obj = newState[this.selectedCategory.value];
                    if (Object.keys(obj).length === 0) {
                        delete newState[this.selectedCategory.value];
                        for (let category in newCategory) {
                            if (newCategory[category] === this.selectedCategory.value)
                                newCategory.splice(category, 1);
                        }
                        this.selectedCategory.value = Object.keys(newState)[0];
                    }
                }
            }
        }
        console.log(newCategory);
        this.setState({selectedQuestions: newState, category: newCategory, isLoading: false})

    };

    addCategory = (obj) => {
        let newCategory = this.state.categories;
        let newSelectedQuestions = this.state.selectedQuestions;

        newCategory.push(obj.category);

        newSelectedQuestions[obj.category] = [];

        this.setState({categories: newCategory, selectedQuestions: newSelectedQuestions});

    };

    submit = () => {
        let response = {"response": this.state.selectedQuestions, "entity": this.selectedEntity.value};

        console.log(response);

        axios.post('http://modelling.hvl.no:8020/question/update', response)
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
            <div className="admin_outer_container">


                {/*A dropdown of all config files available*/}
                <div className="display_box">
                    <h4>Steg 1: Velg hvilke side du vil forandre på</h4>
                    <select ref={(input) => this.selectedEntity = input} onChange={() => this.getQuestions()}>
                        <option value="patient">Pasient</option>
                        <option value="center">Senter</option>
                    </select>
                </div>


                {/*Module for adding a new category*/}
                <div className="add_category">
                    <h4>Steg 2: Legg til en ny kategori (hvis det er nødvendig)</h4>
                    <Form
                        onSubmit={this.addCategory}
                        render={({handleSubmit, form, submitting, pristine, values}) => (
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <Field
                                        name="category"
                                        component="input"
                                        type="text"
                                        value="category"
                                    />{' '}
                                </label>
                                <button type="submit" disabled={submitting || pristine}>
                                    Legg til kategori
                                </button>
                            </form>
                        )}
                    />
                </div>

                {/*Module for selecting category and display type*/}
                <div className="display_box">
                    <h4>Steg 3: Velg hvilke kategori du vil endre på og hvordan du vil vise de nye spørsmålene</h4>
                    <div>
                        <select onChange={() => this.forceUpdate()}
                                ref={(input) => this.selectedCategory = input}>
                            <option selected disabled>Velg kategori</option>
                            {this.showCategories()}
                        </select>
                    </div>

                    <div>
                        <select ref={(input) => this.selectedDisplayType = input}>
                            <option selected disabled>Velg spørsmålstype</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="radio">Ja/Nei</option>
                            <option value="slider">Slider</option>
                            <option value="text">Tekstfelt</option>
                        </select>
                    </div>
                </div>

                {/*Module for adding or removing questions*/}
                <h4>Steg 4: Velg hvilke spørsmål du vil ha med/fjerne</h4>
                <p>
                    Du kan velge spørsmål i den ventre tabellen og deretter klikke "Legg til spørsmål i listen" for å legge de til. <br/>
                    Ved å holde "ctrl" på Windows eller "cmd" på macOS, mens du klikker på et spørsmål, kan du velge flere spørsmål på en gang. <br/>
                    Hvis du vil fjerne noen spørsmål fra spørreundersøkelsen, kan du velge spørsmål i den høyre listen og trykke "Fjern spørsmål fra listen". <br/>
                    For å endre kategori/spørsmålstype, se steg 3.
                </p>
                <div className="manage_outer_container">
                    <div className="select_module">
                        <Form
                            onSubmit={this.addToList}
                            render={({handleSubmit, form, submitting, pristine, values}) => (
                                <form onSubmit={handleSubmit}>


                                    <strong>Alle spørsmål</strong>

                                    <Field className="select-window" name="questions" component="select" type="select"
                                           multiple>
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
                    <div className="select_module">
                        <Form
                            onSubmit={this.removeFromList}
                            render={({handleSubmit, form, submitting, pristine, values}) => (
                                <form onSubmit={handleSubmit}>
                                    <strong>Valgte spørsmål</strong>
                                    <Field className="select-window" name="questions" component="select" type="select"
                                           multiple>
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

                </div>
                <div>
                    <button className="submit_questions" onClick={this.submit}>Oppdater spørsmålslisten</button>
                </div>
            </div>

        )
    }

}

export default ManageQuestions