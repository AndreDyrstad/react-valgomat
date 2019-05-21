import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button } from 'react-bootstrap'
import {getHvlApi} from "../global";

class AddConnection extends Component{

    constructor(props){
        super(props);

        axios.post(getHvlApi() +  + '/question/all',{"entity":"patient"})
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
        axios.post(getHvlApi() + '/connections', {"connection":[this.connection1.value, this.connection2.value]})
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
            <div className="admin_outer_container_tables">
                <p>Her kan du koble sammen to spørsmål.
                    Du bestemme hvilke spørsmål du vil koble sammen ved å velge spørsmålene i hver sin dropdown-meny.
                    <br/>
                    Deretter klikker du Legg til kobling.
                    Din kobling kommer automatisk opp i listen under.
                </p>
                <select ref = {(input)=> this.connection1 = input}>
                    {this.state.isLoading ? null : this.showQuestions()}
                </select>
                <select ref = {(input)=> this.connection2 = input}>
                    {this.state.isLoading ? null : this.showQuestions()}
                </select>
                <Button bsStyle="primary" onClick={() => this.onSubmit()}>Legg til kobling</Button>
                {this.state.isLoading ? null : this.testTable()}

            </div>
        )
    }
}

export default AddConnection