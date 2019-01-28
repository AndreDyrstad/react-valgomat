import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";

class AddConnection extends Component{

    constructor(props){
        super(props);

        axios.post('http://modelling.hvl.no:8020/allQuestions',{"entity":"patient"})
            .then(res => this.setState({files: res.data}))
            .then(res => axios.get('http://modelling.hvl.no:8020/connections'))
            .then(res => this.setState({connections: res.data,isLoading:false}));

        this.state = {
            isLoading: true
        }
    }

    showQuestions = () => (

        this.state.files.questions).map((obj, index) => {

            return(
            <option key={obj.id + Math.floor((Math.random() * 10000) + 1)} value={obj.id}>{obj.label}</option>
            )
        }
    );

    onSubmit = () => {
        console.log(this.connection1.value);
        console.log(this.connection2.value);
        axios.post('http://modelling.hvl.no:8020/makeConnection', {"connection":[this.connection1.value, this.connection2.value]})
            .then(res => axios.get('http://modelling.hvl.no:8020/connections'))
            .then(res => this.setState({connections:res.data}))
    };


    testTable = () => (
        <div>
            <ReactTable
                data={this.state.connections.connection}
                columns={[
                    {
                                Header: "Spørsmål 1",
                                accessor: "question1"
                    },

                            {
                                Header: "Spørsmål 2",
                                accessor: "question2"
                            }
                        ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
            <br />
        </div>
    );


    render(){
        return(
            <div>
                <select ref = {(input)=> this.connection1 = input}>
                    {this.state.isLoading ? null : this.showQuestions()}
                </select>
                <select ref = {(input)=> this.connection2 = input}>
                    {this.state.isLoading ? null : this.showQuestions()}
                </select>
                <button onClick={() => this.onSubmit()}>Legg til kobling</button>
                {this.state.isLoading ? null : this.testTable()}

            </div>
        )
    }
}

export default AddConnection