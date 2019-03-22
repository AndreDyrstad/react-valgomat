import React, {Component} from 'react'
import {Form, Field} from 'react-final-form'
import axios from "axios/index";
import {Button, Glyphicon} from 'react-bootstrap'
import center from '../json/centers'
import InformationBox from "./smallComponents/InformationBox";
import Response from "./smallComponents/Response"


class Forms extends Component {

    constructor(props) {
        super(props);
        axios.get('http://modelling.hvl.no:8020/centers')
            .then(res => this.setState({files: res.data, isLoading: false}));

        this.state = {
            isHovering: false,
            submitted: false,
            error: true,
            display: [],
            displayValue: 0,
            isLoading: true,
            showForm: false
        };

        for (let k in center.questions) this.state.display.push("none");
        this.state.display[0] = "block"

    }

    changeDisplayedPage = (value) => {

        let item = this.state.display;
        let index = this.state.displayValue;

        //Forward
        if (value > 0 && index < item.length - 1) {
            item[index] = "none";
            index++;
            item[index] = "block";
            this.setState({display: item, displayValue: index})
        }
        //Backward
        else if (value < 0 && index > 0) {
            item[index] = "none";
            index--;
            item[index] = "block";
            this.setState({display: item, displayValue: index})
        }
    };

    onSubmit = async values => {
        axios.post('http://modelling.hvl.no:8020/centers', values)
        //axios.post('http://modelling.hvl.no:8020/centers', values)
            .then(res => this.setState({submitted: true, error: false, showForm: true}))
            .catch(err => this.setState({submitted: true, error: true}))

    };

    showIntro = () => (
        <div style={this.divStyle}>
            <h1>{this.state.files.introduction.header}</h1>
            {/*<p> {this.state.files.introduction.description}</p>*/}
            <p>
                Denne nettsiden er en pilot som er laget i et samarbeid mellom Høgskolen på Vestlandet og Nasjonal kompetansetjeneste for multippel sklerose.
                Målet med nettsiden er å lage en digital plattform som kan brukes til fritt rehabiliteringsvalg i spesialisthelsetjenesten.
                For å oppnå dette, trenger vi informasjon om alle rehabiliteringsstedene i Norge som tilbyr spesialisert rehabilitering innenfor MS..
                Vi ber dere derfor om å gjennomføre denne kartleggingen.
                <br/>
                <br/>
                Kartleggingen gjennomføres ved å svare på spørsmålene under. For å få best mulig oversikt over deres tilbud, ber vi dere om å svare på så mange spørsmål som mulig.
                Noen av spørsmålene har et
                <InformationBox header="Mer information" text="Du kan lese mer informasjon i disse boksene"/>
                -ikon ved siden av seg. Ved å holde musepekeren over dette ikonet, kan du få tilgang til mer informasjon om dette spørsmålet.
                <br/>
                <br/>
                Informasjonen dere gir, vil bli brukt av valgomaten for å kunne gi en indikasjon på hvilke(t) behandlingssted(er) som ser ut til å passe best for den enkelte pasient.
            </p>
        </div>

    );

    showFullPage = () => (
        <div>

            {Object.keys(this.state.files.questions).map((zone, index) => {
                    let a = this.showPage(zone);
                    return (
                        <div className={"quest"} style={{display: this.state.display[index]}} key={zone}>
                        {index === 0 ? this.showIntro() : null}
                            <h2>{zone}</h2>
                            <div>{a}</div>

                        </div>
                    )
                }
            )}
        </div>
    );

    showResponse = () => {
        if (this.state.error) {
            return (
                <Response type="danger" header="Obs!" message="Det ser ut som at serverene våre har gått ned. Vennligst prøv igjen senere."/>
            )
        }
        else {
            return (
                    <Response type="success" header="Godkjent!" message="Tusen takk for ditt svar!"/>
            )
        }
    };

    showPage = (zone) => (

        //this.state.files.questions[zone].map((obj, idx) => {
        this.state.files.questions[zone].map((obj, idx) => {
                if (obj.displayAs === "text") {
                    return (

                        <div key={obj.label}>
                            <h4>{obj.label}</h4>
                                <Field
                                    name={obj.value}
                                    component="input"
                                    type={obj.displayAs}
                                    value={obj.id}
                                    style={{"width":"50vw","height":"30px"}}

                                />{' '}
                                {obj.info === null ? false : <InformationBox header={obj.label} text={obj.info}/>}
                        </div>

                    )
                }


                if (obj.displayAs === "radio") {
                    return (

                        <div key={obj.label}>
                            <b>{obj.label}</b>
                            {obj.info === null ? false : <InformationBox header={obj.label} text={obj.info}/>}
                            <label>
                                <Field
                                    name={"id"+obj.id}
                                    component="input"
                                    type={obj.displayAs}
                                    value="true"

                                />{' '}
                                Ja
                            </label>

                            <label>
                                <Field
                                    name={"id"+obj.id}
                                    component="input"
                                    type={obj.displayAs}
                                    value="false"
                                />{' '}
                                Nei
                            </label>
                        </div>

                    )
                }

            if (obj.displayAs === "textarea") {
                return (
                    <div key={obj.label}>
                        <h3>{obj.label}</h3>
                            <Field
                                name={obj.value}
                                component="textarea"
                                type={obj.displayAs}
                                value={obj.id}
                                style={{"width":"70vw","height":"250px"}}
                            />{' '}
                            {obj.info === null ? false : <InformationBox header={obj.label} text={obj.info}/>}
                    </div>
                )
            }

                return (
                    <div key={obj.label}>
                        <label>
                            <Field
                                name={"id"+obj.id}
                                component="input"
                                type={obj.displayAs}
                                value={obj.id}

                            />{' '}
                            {obj.label}
                            {obj.info === null ? false : <InformationBox header={obj.label} text={obj.info}/>}
                        </label>
                    </div>
                )
            }
        )
    );

    render() {
        if(this.state.showForm === false) {
            return (

                <div>

                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                          crossOrigin="anonymous"/>

                    <Form
                        onSubmit={this.onSubmit}
                        initialValues={{}}
                        render={({handleSubmit, form, submitting, pristine, values}) => (

                            <form onSubmit={handleSubmit}>
                                <div className="outer-container">
                                    <div className={"screen"}>

                                        {this.state.files === undefined ? <div className="loader"/> : this.showFullPage()}

                                        {this.state.submitted && this.showResponse()}
                                    </div>

                                </div>
                                <div className="buttons">
                                    <div>

                                        {this.state.displayValue === this.state.display.length - 1 ?
                                            <Button type="submit" bsStyle="primary" id="send"
                                                    disabled={submitting}>Send</Button> : false
                                        }
                                    </div>

                                    {this.state.displayValue === 0 ? <Button bsStyle="primary" disabled onClick={() => {
                                            this.changeDisplayedPage(-1);
                                            window.scrollTo(0, 0)
                                        }} id="back"> <Glyphicon glyph="chevron-left"/> Tilbake</Button> :

                                        <Button bsStyle="primary" onClick={() => {
                                            this.changeDisplayedPage(-1);
                                            window.scrollTo(0, 0)
                                        }} id="back"> <Glyphicon glyph="chevron-left"/> Tilbake</Button>}


                                    {this.state.displayValue !== this.state.display.length - 1 ?

                                        <Button bsStyle="primary" onClick={() => {
                                            this.changeDisplayedPage(1);
                                            window.scrollTo(0, 0)
                                        }}
                                                id="forward"> Neste <Glyphicon glyph="chevron-right"/> </Button> :

                                        <Button bsStyle="primary" disabled onClick={() => {
                                            this.changeDisplayedPage(1);
                                            window.scrollTo(0, 0)
                                        }}
                                                id="forward"> Neste <Glyphicon glyph="chevron-right"/> </Button>

                                    }
                                </div>
                            </form>
                        )}
                    />
                </div>
            )
        }
        else{
            return(
                <div>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSejA1agmxVhvC6iYvSxURlsVORxinIOU1u6SURy-I8SNCC8Ug/viewform?embedded=true" width="1000" height="1000" frameBorder="0" marginHeight="0" marginWidth="200">Laster inn ...</iframe>
                </div>
            )
        }
    };
}

export default Forms;