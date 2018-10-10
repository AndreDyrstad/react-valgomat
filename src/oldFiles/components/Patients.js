import React, {Component} from 'react'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {ProgressBar, Glyphicon, Button} from 'react-bootstrap';
import '../../css/Check.css';
import viktig from '../json/viktig';
import opphold from '../json/opphold';
import problemstilliger from '../json/problemstilliger';
import axios from "axios/index";

class Patients extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viktig: [],
            opphold: [],
            first: [],
            second: [],
            third: [],
            show: [true, false, false, false, false, false, false],
            displayed: [0]
        };
    }

    sendForm = () => {

        console.log(this.state.viktig);

        const {viktig, opphold, first, second, third} = this.state;

        let list = [];

        list.push(viktig, opphold, first, second, third);

        let myJsonString = JSON.stringify(list);

        console.log(myJsonString);

        axios.post('http://localhost:5000/information', myJsonString)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    render() {

        //Switch between send and next button
        let nextButton;
        if (this.state.displayed[0] === 6)
            nextButton = <Button onClick={() => {
                this.sendForm();
            }} bsStyle="primary" id="forward">Send</Button>;
        else
            nextButton = <Button bsStyle="primary" onClick={() => {
                this.nextItem();
                window.scrollTo(0, 0)
            }} id="forward"> Neste <Glyphicon glyph="chevron-right"/></Button>

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

                <div className="inner-container">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                          crossOrigin="anonymous"/>
                    <ProgressBar striped
                                 now={((this.state.displayed[0]) / (this.state.show.length - 1)) * 100}
                                 label={`${Math.round(((this.state.displayed[0]) / this.state.show.length) * 100)}%`}/>

                    <form>
                        {this.state.show[0] && this.showIntro()}
                        {this.state.show[1] && this.showViktig()}
                        {this.state.show[2] ? this.showOpphold() : null}
                        {this.state.show[3] ? this.showFirst() : null}
                        {this.state.show[4] ? this.showSecond() : null}
                        {this.state.show[5] ? this.showThird() : null}
                        {this.state.show[6] ? this.showOppsummering() : null}
                    </form>

                </div>

                <div className="buttons">


                    {prevButton}
                    {nextButton}
                    {/*<button onClick={() => this.print()}>Print</button>*/}
                </div>
            </div>
        )
    }

    showViktig = () => {
        return (

            <div>
                <h2>Hva er viktig for deg:</h2>

                <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="viktig"
                    value={this.state.viktig}
                    onChange={this.viktigChanged}>

                    {viktig.questions.map(item => <label><Checkbox value={item.value}/>{item.label}</label>)}

                </CheckboxGroup>
            </div>
        )
    };

    showOpphold = () => {
        return (
            <div>

                <h2>Behov for type opphold:</h2>

                <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="opphold"
                    value={this.state.opphold}
                    onChange={this.oppholdChanged}>

                    {opphold.questions.map(item => <label><Checkbox value={item.value}/>{item.label}</label>)}

                </CheckboxGroup>
            </div>
        )
    };

    showFirst = () => {
        return (
            <div>
                <h2>Hva er de to viktigste problemstillingen du ønsker rehabilitering for?</h2>

                <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="first"
                    value={this.state.first}
                    onChange={this.firstChanged}>

                    {problemstilliger.questions
                        .map(
                            item => {
                                if (!this.state.second.includes(item.value) && !this.state.third.includes(item.value)) {
                                    return (<label><Checkbox value={item.value}/> {item.label}</label>)
                                }
                            }
                        )}

                </CheckboxGroup>
            </div>
        )
    };

    showSecond = () => {
        return (
            <div>
                <h2>Nevn 3 andre problemstillinger du har behov rehabilitering for?</h2>
                <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="second"
                    value={this.state.second}
                    onChange={this.secondChanged}>

                    {problemstilliger.questions.map(
                        item => {
                            if (!this.state.third.includes(item.value) && !this.state.first.includes(item.value)) {
                                return (<label><Checkbox value={item.value}/> {item.label}</label>)
                            }
                        }
                    )}

                </CheckboxGroup>
            </div>
        )
    };

    showThird = () => {
        return (
            <div>
                <h2>Har du flere rehabiliteringsbehov?</h2>

                <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="third"
                    value={this.state.third}
                    onChange={this.thirdChanged}>

                    {problemstilliger.questions.map(
                        item => {
                            if (!this.state.second.includes(item.value) && !this.state.first.includes(item.value)) {
                                return (<label><Checkbox value={item.value}/> {item.label}</label>)
                            }
                        }
                    )}

                </CheckboxGroup>
            </div>
        )
    };

    showIntro = () => {
        return (
            <div>
                <h2>Introduksjon</h2>
                <h4>Denne nettsiden er fortsatt under utvikling.
                    Resultatsiden er statisk og vil ikke bli påvirket av dine svar.
                    Den brukes foreløpig som en mal for å vise hvordan sluttresultatet vil se ut når prduktet er ferdig.
                </h4>
                <p>
                    Dersom du har behov for rehabilitering i spesialisthelsetjenesten, kan denne «valgomaten»
                    hjelpe deg til å finne det tilbudet som passer best med dine behov.
                </p>
            </div>
        )
    };

    showOppsummering = () => {
        return (
            <div>
                <h2>Oppsummering</h2>
                <div className="opp">
                    <div>
                        <h3>Hva er viktig for deg?</h3>
                        {this.state.viktig.map(item => <li> {item} </li>)}
                    </div>
                    <div>
                        <h3>Behov for type opphold</h3>
                        <ul>{this.state.opphold.map(item => <li> {item} </li>)}</ul>
                    </div>
                    <div>
                        <h3>Rehabiliteringsbehov</h3>
                        <h4>Førstevalg</h4>
                        <ul>{this.state.first.map(item => <li> {item} </li>)}</ul>
                        <h4>Andrevalg</h4>
                        <ul>{this.state.second.map(item => <li> {item} </li>)}</ul>
                        <h4>Andre behov</h4>
                        <ul>{this.state.third.map(item => <li> {item} </li>)}</ul>
                    </div>
                </div>
            </div>
        )
    };

    viktigChanged = (newState) => {
        this.setState({
            viktig: newState
        });
    };


    oppholdChanged = (newState) => {
        this.setState({
            opphold: newState
        });
    };

    firstChanged = (newState) => {
        if (newState.length > this.state.first.length) {
            if (this.state.first.length > 1) {
                console.log("Error")
            }
            else {
                this.setState({
                    first: newState
                });
            }
        } else {
            this.setState({
                first: newState
            });
        }
    };

    secondChanged = (newState) => {
        console.log(newState);
        console.log(this.state.second);
        if (newState.length > this.state.second.length) {
            if (this.state.second.length > 2) {
                console.log("Error")
            }
            else {
                this.setState({
                    second: newState
                });
            }
        } else {
            this.setState({
                second: newState
            });
        }
    };

    thirdChanged = (newState) => {
        this.setState({
            third: newState
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

export default Patients;