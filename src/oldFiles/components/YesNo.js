import React, { Component } from 'react';
import { Radio } from 'react-bootstrap';

class YesNo extends Component{

    constructor(props) {
        super(props);

        this.state = {
            answer: ""
        };
    }

    print = () => {
        console.log(this.state.answer)
    };

    render(){
        return(
            <div>
                <label>{this.props.name}</label>
                <div>
                    <Radio name={this.props.value} value={true} onChange={this.setTrue}>Ja</Radio>
                    <Radio name={this.props.value} value={false} onChange={this.setFalse}>Nei</Radio>
                    <button onClick={this.print}>Button</button>
                </div>
            </div>
        )
    }

    setTrue = () => {
        this.setState({
            answer: true
        });
    };

    setFalse = () => {
        this.setState({
            answer: false
        });
    };

    getState = () => {
        return this.state.answer
    }


}
export default YesNo;