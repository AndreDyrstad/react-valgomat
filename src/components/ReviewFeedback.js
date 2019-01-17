import React, { Component } from 'react'
import axios from 'axios'


class ReviewFeedback extends Component{


    constructor(props){
        super(props);

        axios.get('http://localhost:5000/getFeedback').then(res => this.setState({files:res.data, isLoading:false}));
        this.state = {
            isLoading: true
        }

    }


    showFeedbackList = () => (

        this.state.files.feedback).map((obj, index) => {
            return(
                <tr key={obj.center + obj.question +  Math.floor((Math.random() * 1000) + 1)}>
                    <td>{obj.center}</td>
                    <td>{obj.question}</td>
                    <td>{obj.score}</td>
                </tr>
            )
        }
    );

    render(){
        return(
            <div>
                <h1>Oversikt over tilbakemeldinger</h1>
                <table>
                    <tbody>
                    <tr>
                        <th>Senter</th>
                        <th>Spørsmål</th>
                        <th>Score</th>
                    </tr>
                    {this.state.isLoading ? null : this.showFeedbackList()}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default ReviewFeedback