import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

class Response extends Component{

    constructor(props){
        super(props)
    }

    render(){

        return(
            <div className="stick">
                <Alert bsStyle="danger">
                    <strong>Obs!</strong>
                    <p>Det ser ut som at serverene våre har gått ned. Vennligst prøv igjen senere.</p>
                    {/*<a href="http://valgomat.herokuapp.com/patient">Klikk her for å bytte til http (kan kanskje fikse
                        problemet)</a>*/}

                </Alert>
            </div>
        )
    }
}

export default Response