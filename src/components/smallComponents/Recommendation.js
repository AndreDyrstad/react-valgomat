import React, {Component} from "react";
import Place from './Place';
import '../../css/Recommendation.css';

class Recommendation extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <div className="centers-container">
                    {this.props.data.centers.map(item => <div key={item.name} className="center"><Place name={item.name} probability={item.probability} match={item.match} link={item.link} information={item.about}/></div>)}
                </div>
            </div>
        )
    }
}

export default Recommendation;