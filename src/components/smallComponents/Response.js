import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

class Response extends Component{

    constructor(props){
        super(props)
    }

    render(){

        return(
            <div className="stick">
                <Alert bsStyle={this.props.type}>
                    <strong>{this.props.header}</strong>
                    <p>{this.props.message}</p>
                    {/*<a href="http://valgomat.herokuapp.com/patient">Klikk her for å bytte til http (kan kanskje fikse
                        problemet)</a>*/}

                </Alert>
            </div>
        )
    }
}

export default Response