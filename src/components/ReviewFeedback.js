import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table";
import { Button } from 'react-bootstrap'
import "react-table/react-table.css";
import Fuse from 'fuse.js'
import {getApiUri} from "../global";

class ReviewFeedback extends Component{


    constructor(props){
        super(props);
        axios.get(getApiUri() + '/feedback')
            .then(res => this.setState({files:res.data}))
            .then(res => this.filterQuestions())
            .then(res => this.setState({isLoading:false}));

        this.state = {
            isLoading: true
        }
    }

    onSubmit = () => {
        axios.put(getApiUri() + '/feedback', {"feedback":[this.center.value, this.question.value, this.score.value]})
    };

    testTable = () => (
        <div>
            <ReactTable
                data={this.state.files.feedback.feedback}
                columns={[
                    {
                        Header: "Senter",
                        accessor: "center"
                    },

                    {
                        Header: "Spørsmål",
                        accessor: "question"
                    },
                    {
                        Header: "Poengsum",
                        accessor: "score"
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
            <br />
        </div>
    );

    filterQuestions = () => {
        let options = {
            keys: ["question","center"],
            threshold: 0,
        };

        let fuse = new Fuse(this.state.files.feedback.feedback, options);
        this.setState({centerDropDown: this.center.value, filtered: fuse.search(this.center.value)})
    };

    showQuestions = () => (

        this.state.filtered).map((obj, index) => {

            return(
                <option key={obj.question} value={obj.id}>{obj.question}</option>
            )
        }
    );

    showCenters = () => (

        this.state.files.centers).map((obj, index) => {

            return(
                <option key={obj.name} value={obj.name}>{obj.name}</option>
            )
        }
    );

    render(){
        return(
            <div className="admin_outer_container_tables">
                <h1>Oversikt over tilbakemeldinger</h1>

                {this.state.isLoading ? null : this.testTable()}

                <select ref = {(input)=> this.center = input} value={this.state.centerDropDown} onChange={this.filterQuestions}>
                    <option selected disabled>Velg senter</option>
                    {this.state.isLoading ? null : this.showCenters()}
                </select>
                <select ref = {(input)=> this.question = input}>
                    {this.state.isLoading ? null : this.showQuestions()}
                </select>
                <input type="text" ref = {(input) => this.score = input}/>
                <Button bsStyle="primary" onClick={() => this.onSubmit()}>Endre score</Button>
            </div>

        )
    }
}

export default ReviewFeedback