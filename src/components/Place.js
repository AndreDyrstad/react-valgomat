import React, { Component } from 'react';

class Place extends Component{

    render(){
        return(
            <div className="place">
                <h2>{this.props.name}</h2>
                <p>{this.props.probability}</p>
                <a href={this.props.link}>Link til behandlingsstedet</a>
                <p>{this.props.information}</p>
            </div>
        )
    }
}

export default Place;