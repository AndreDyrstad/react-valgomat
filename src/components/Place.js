import React, { Component } from 'react';

class Place extends Component{


    unpackList = () => (

        <div>
            <ul>
            {this.props.match.map((item, index) => {
                    return (
                        <div key={item}>
                            <li>{item}</li>
                        </div>
                    )
                })}
            </ul>
        </div>
    );

    render(){
        return(
            <div className="place">
                <h2>{this.props.name}</h2>
                <p>{this.props.probability}/100</p>
                <a href={this.props.link}>Link til behandlingsstedet</a>
                <p>{this.props.information}</p>
                <strong>Du ble anbefalt dette senteret fordi de tilbyr:</strong>
                <div>{this.unpackList()}</div>
            </div>
        )
    }
}

export default Place;