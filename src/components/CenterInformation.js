import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from 'react-table'
import "react-table/react-table.css";

class CenterInformation extends Component{

    constructor(prop){
        super(prop);

        axios.get('http://modelling.hvl.no:8020/centerData')
            .then(res => this.setState({files: res.data, isLoading: false}));

        this.state = {
            isLoading: true
        }

    }

    testTable = () => (
        <div>
            <ReactTable
                data={this.state.files.data}
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

    render(){
        return(
            <div>
                <h1>Oversikt over behandlingssteder</h1>

                {this.state.isLoading ? null : this.testTable()}
            </div>

        )
    }

}

export default CenterInformation;