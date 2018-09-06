import React, {Component} from "react";
import Place from './Place';
import '../css/Recommendation.css';
import center from '../json/treatmentCenters';

class Recommendation extends Component {

    render(){
        return(
            <div>
                <div className="centers-container">
                    {center.centers.map(item => <Place name={item.name} probability={item.probability} link={item.link} information={item.about}/>)}
                </div>
            </div>
        )
    }
}

export default Recommendation;