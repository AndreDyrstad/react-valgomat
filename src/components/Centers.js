import React, {Component} from 'react';
import YesNo from './YesNo';
import problemstillinger from '../json/problemstilliger';
import about from '../json/about';
import faggrupper from '../json/faggrupper';
import typeOpphold from '../json/typeOpphold';
import regioner from '../json/regioner';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {FormControl, Button, Glyphicon, ProgressBar} from 'react-bootstrap';
import '../css/Check.css';


class Centers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viktig: [],
            show: [true, false, false, false, false],
            displayed: [0]
        };
    }

    render() {

        //Switch between send and next button
        let nextButton;
        if (this.state.displayed[0] === this.state.show.length-1)
            nextButton = <Button href='/answer' bsStyle="primary" id="forward">Send</Button>;
        else
            nextButton = <Button bsStyle="primary" onClick={() => {
                this.nextItem();
                window.scrollTo(0, 0)
            }} id="forward"> Neste <Glyphicon glyph="chevron-right"/> </Button>;

        //Remove previous button when the first page is shown
        let prevButton;
        if (this.state.displayed[0] !== 0)
            prevButton = <Button bsStyle="primary" onClick={() => {
                this.previousItem();
                window.scrollTo(0, 0)
            }} id="back"> <Glyphicon glyph="chevron-left"/> Tilbake</Button>;
        else
            prevButton = <Button disabled={true} bsStyle="primary" onClick={() => {
                this.previousItem();
                window.scrollTo(0, 0)
            }} id="back"> <Glyphicon glyph="chevron-left"/> Tilbake</Button>;


        return (


            <div className="outer-container">
                <h1>Overskrift</h1>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossorigin="anonymous"/>
                <div className="inner-container">
                    <ProgressBar striped bsStyle="primary"
                                 now={((this.state.displayed[0]) / (this.state.show.length - 1)) * 100}
                                 label={`${Math.round(((this.state.displayed[0]) / this.state.show.length) * 100)}%`}/>


                    {this.state.show[0] ? this.showAbout() : null}
                    {this.state.show[1] ? this.showRegions() : null}
                    {this.state.show[2] ? this.showOpphold() : null}
                    {this.state.show[3] ? this.showFaggrupper() : null}
                    {this.state.show[4] ? this.showProblemstillinger() : null}

                    <div>

                        {prevButton}
                        {nextButton}
                        {/*<button onClick={() => this.print()}>Print</button>*/}
                    </div>
                </div>
            </div>
        )
    }

    showAbout = () => {
        return (
            <div>
                <h2>Informasjon om dere</h2>
                {about.questions.map(item => <label className="displayFullScreen">{item.label}<FormControl id={item.value} type="text"
                                                                             placeholder="Enter text"/></label>)}
            </div>
        )
    };

    showRegions = () => {
        return (
            <div>
                <h2>Generelt om tilbud og innhold</h2>
                <label>For private institusjoner: Hvilke(n) helseregion(er) er det gjort avtale med?</label>

                <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="viktig"
                    value={this.state.viktig}
                    onChange={this.viktigChanged}>

                    {regioner.questions.map(item => <label className="displayFullScreen"><Checkbox value={item.value}/>{item.label}</label>)}

                </CheckboxGroup>

                <YesNo name="Individuell rehabilitering?" value="individuellRehabilitering"/>
                <YesNo name="Rehabilitering i grupper?" value="individuellRehabilitering"/>
                <YesNo name="Tilbud om basseng?" value="individuellRehabilitering"/>
                <YesNo name="Må pasienten være selvhjulpen i daglige aktiviteter?" value="individuellRehabilitering"/>
                <YesNo name="Tilrettelagt for bevegelseshemmede?" value="individuellRehabilitering"/>
                <YesNo name="Har dere noen øvre aldersgrense?" value="individuellRehabilitering"/>
                <YesNo name="Har dere noen nedre aldersgrense?" value="individuellRehabilitering"/>
            </div>
        )
    };

    showOpphold = () => {
        return (
            <div>
                <h2>Tilbud til personer med MS</h2>
                {typeOpphold.questions.map(item => <YesNo name={item.label} value={item.value}/>)}
            </div>
        )
    };

    showProblemstillinger = () => {
        return (
            <div>
                <h2>Tilbud omfatter rehabilitering for:</h2>

                <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="viktig"
                    value={this.state.viktig}
                    onChange={this.viktigChanged}>

                    {problemstillinger.questions.map(item => <label><Checkbox value={item.value}/>{item.label}</label>)}


                    <h2>Generelle kommentarer/merknader/tilleggs- opplysninger?</h2>
                    <FormControl componentClass="textarea" placeholder="textarea" style={{ height: 200 }} />


                </CheckboxGroup>
            </div>
        )
    };

    showFaggrupper = () => {
        return (
            <div>
                <h2>Faggrupper/profesjoner som er tilknyttet MS-rehabiliteringen</h2>

                <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="viktig"
                    value={this.state.viktig}
                    onChange={this.viktigChanged}>

                    {faggrupper.questions.map(item => <label><Checkbox value={item.value}/>{item.label}</label>)}

                </CheckboxGroup>
            </div>
        )
    };

    viktigChanged = (newState) => {
        this.setState({
            viktig: newState
        });
    };


    nextItem = () => {
        let num = this.state.displayed[0];
        let num2 = num + 1;
        let array = this.state.show;

        if (num2 < array.length) {
            array[num] = false;
            array[num2] = true;

            this.setState({
                show: array,
                displayed: [...this.state.displayed[0], num2]
            });
        }
    };

    previousItem = () => {
        let num = this.state.displayed[0];
        let num2 = num - 1;
        if (num2 >= 0) {
            let array = this.state.show;

            array[num] = false;
            array[num2] = true;


            this.setState({
                show: array,
                displayed: [...this.state.displayed[0], num2]
            });
        }
    }

}

export default Centers;