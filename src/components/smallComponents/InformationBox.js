import React, { Component } from 'react'
import { OverlayTrigger, Glyphicon, Popover} from 'react-bootstrap'

class InformationBox extends Component{

    constructor(props){
        super(props)
    }

    render(){

        return(
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="right"
                overlay={<Popover id="popover-trigger-hover-focus" title={this.props.header}>{this.props.text}</Popover>}
            >
                <Glyphicon glyph="glyphicon glyphicon-info-sign"/>
            </OverlayTrigger>

        )
    }
}

export default InformationBox