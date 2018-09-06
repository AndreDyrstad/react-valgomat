import React, { Component } from 'react';
import { Radio } from 'react-bootstrap';

class YesNo extends Component{

    render(){
        return(
            <div>
                <label>{this.props.name}</label>
                <div>
                    <Radio name={this.props.value} value={true}>Ja</Radio>
                    <Radio name={this.props.value} value={false}>Nei</Radio>
                </div>
            </div>
        )
    }
}
export default YesNo;