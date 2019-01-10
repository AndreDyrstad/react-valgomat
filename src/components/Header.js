import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'

class FrontPage extends Component {

    render() {
        return (
            <div className="header">

                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <div>
                    <h1>Valgomat</h1>
                </div>
                <div className="link-buttons">
                    <Button href='/patient' bsStyle="primary" id="forward">Pasient</Button>
                    <Button href='/center' bsStyle="primary" id="forward">Senter</Button>
                    <Button href='/feedback' bsStyle="primary" id="forward">Feedback</Button>
                    <Button href='/admin' bsStyle="primary" id="forward">Admin</Button>
                    <Button href='/sliders' bsStyle="primary" id="forward">Pasient slider</Button>

                </div>
            </div>
        )
    }
}

export default FrontPage