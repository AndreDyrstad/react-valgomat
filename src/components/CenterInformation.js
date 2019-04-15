import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from 'react-table'
import "react-table/react-table.css";
import Fuse from 'fuse.js'

class CenterInformation extends Component{

    constructor(prop){
        super(prop);

        axios.get('http://modelling.hvl.no:8020/centerData')
            .then(res => this.setState({files: res.data, isLoading: false}));

        this.state = {
            isLoading: true,
            filteredJson: {}
        }
    }

    filter = () => {
        if(this.searchItem.value !== undefined){

            let options = {
                keys: ["question","center","score"],
                tokenize: true,
                threshold: 0.1,
                distance: 10

            };

            let fuse = new Fuse(this.state.files.data, options);
            this.setState({filteredJson: fuse.search(this.searchItem.value)});

        }
    };

    testTable = () => (
        <div>
            <ReactTable
                data={this.state.files.data}
                columns={[
                    {
                        Header: "Behandlingssted",
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
                previousText={'Tilbake'}
                nextText={'Neste'}
                pageText={'Side'}
                ofText={'av'}
                rowsText={'rader'}

            />
            <br />
        </div>
    );

    testTable2 = () => (
        <div>
            <ReactTable
                data={this.state.filteredJson}
                columns={[
                    {
                        Header: "Behandlingssted",
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
                previousText={'Tilbake'}
                nextText={'Neste'}
                pageText={'Side'}
                ofText={'av'}
                rowsText={'rader'}

            />
            <br />
        </div>
    );

    render(){
        return(
            <div className="admin_outer_container_tables">
                <h1>Oversikt over behandlingssteder</h1>
                <p>
                    I denne tabellen kan du finne informasjon om alle behandlingsstedene som har svart på kartleggingen.
                    <br/>
                    <strong>Behandlingssted</strong>-kolonnen inneholder alle behandlingsstedene som har svart på kartleggingen.
                    <br/>
                    <strong>Spørsmål</strong>-kolonnen inneholder alle spørsmål hvor behandlingsstedet har svart ja.
                    <br/>
                    <strong>Poengsum</strong>-kolonnen forteller hvilke poengsum et behandlingssted har på et bestemt spørsmål (ikke i bruk enda).
                    <br/>
                    <br/>
                    Ved å klikke på kolonnenavnet øverst i tabellen, kan du sortere kolonnen i alfabetisk rekkefølge.
                    Hvis du klikker på kolonnenavnet igjen, vil den sortere kolonnen i omvendt alfabetisk rekkefølge.
                    Ved å holde shift-tasten og deretter klikke på to kolonnenavn,
                    vil tabellen først sorteres alfabetisk etter den første kolonnen,
                    og deretter etter den andre kolonnen.
                    <br/>
                    Du kan også bruke søkefeltet under for å søke på behandlingssteder eller spørsmål.
                </p>

                <input type="text" onChange={this.filter} ref = {(input)=> this.searchItem = input} style={{width:500+"px", fontSize:20, marginBottom:20+"px"}} placeholder="Søk på spørsmål eller hebandlingssted her"/>

                {this.state.isLoading || this.searchItem.value !== "" ? null : this.testTable()}
                {this.state.isLoading || this.searchItem.value === "" ? null : this.testTable2()}
            </div>
        )
    }

}

export default CenterInformation;