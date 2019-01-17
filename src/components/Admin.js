import React, { Component } from 'react'
import NewQuestion from './NewQuestion'
import ManageQuestions from './ManageQuestions'
import ReviewFeedback from './ReviewFeedback'


class Admin extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {
        return (
            <div>
                <h1>Admin</h1>
                <NewQuestion/>
                <ManageQuestions/>
                <ReviewFeedback/>
            </div>
        )
    }

}

export default Admin