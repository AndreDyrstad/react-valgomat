import React, {Component} from 'react'
import {Form} from 'react-final-form'
import axios from "axios/index";
import {Button, Glyphicon} from 'react-bootstrap'
import Recommendation from "./smallComponents/Recommendation";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import {Field} from 'react-final-form'
import InformationBox from "./smallComponents/InformationBox";
import Response from "./smallComponents/Response"

class PatientSliders extends Component {
    constructor(props) {
        super(props);
        //modelling.hvl.no:8020
        let a = {};

        axios.get('http://modelling.hvl.no:8020/patients')
            .then(res => this.setState({files: res.data}))
            .then(res => this.initSlidersAndPages(a));

        this.state = {
            hasResponse: false,
            display: [],
            displayValue: 0,
            sliders: a,
            error: false,
            isLoading: true
        };
    }

    initSlidersAndPages = (a) => {

        Object.keys(this.state.files.questions).forEach((zone, index) => {
            this.state.files.questions[zone].forEach((obj, idx) => {
                a[obj.id] = 0;
            })
        });

        for (let k in this.state.files.questions) this.state.display.push("none");
        this.state.display[0] = "block";

        this.setState({isLoading: false})

    };

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

        this.state.sliders[Object.keys(values)[0]] = values[Object.keys(values)[0]];
        console.log(this.state.sliders);

        axios.post('http://localhost:5000/patients', this.state.sliders).then(res => this.setState({
            hasResponse: true,
            response: res.data
        }))
            .catch(err => this.setState({error:true}))
    };

    showIntro = () => (
        <div className="introduction">
            <h1>{this.state.files.introduction.header}</h1>
            {/*<p> {this.state.files.introduction.description}</p>*/}
            <p>

                Denne nettsiden er en pilot som er laget i et samarbeid mellom Høgskolen på Vestlandet og Nasjonal kompetansetjeneste for multippel sklerose.
                Målet med nettsiden er å lage en digital plattform som kan brukes til fritt rehabiliteringsvalg i spesialisthelsetjenesten.
                Ved å svare på en rekke spørsmål, får du forslag om hvilke(t) behandlingssted(er) som synes å passe best
                med dine behov.
                Dette kan være til hjelp når din behandler skal søke om rehabilitering for deg.
                <br/>
                <br/>
                Hvert spørsmål har en ‘markør’ som du kan dra langs linjen.
                Ved hjelp av dette verktøyet, kan du vekte hvert spørsmål med en tallverdi mellom 0 og 10, som antyder
                hvor viktig de ulike punktene er for deg (10 betyr høyest vektlegging).
                Alle spørsmålene som får verdien 0, vil ikke bli tatt med i betraktningen når vi anbefaler et behandlingssted.
                Det er derfor viktig at du gir verdien 0 til alle spørsmålene som IKKE angår deg eller dine behov.
                Noen av spørsmålene har et
                <InformationBox header="Mer information" text="Du kan lese mer informasjon i disse boksene"/>
                -ikon ved siden av seg.
                Ved å holde musepekeren over dette ikonet, kan du få tilgang til mer informasjon om dette spørsmålet.
                <br/>
                <br/>
                Hvis du benytter deg av Fritt behandlingsvalg (FBV), får du høyere egenandel på reise.
                Egenandel ved reise er inntil kr. 149,- hver vei uten FBV, og inntil kr. 400,- per vei med FBV.
                Egenandel for opphold kan variere mellom de ulike institusjonene så det anbefales å kontakte
                institusjonen
                direkte for mer informasjon.
                <br/>
                <br/>
                For ventetider, se linken under.


            </p>
            {this.state.files.introduction.link === undefined ? false :
                <a href={this.state.files.introduction.link}>Klikk her for å se ventetider</a>}

        </div>
    );

    showFullPage = () => (
        <div>

            {Object.keys(this.state.files.questions).map((zone, index) => {
                    let questionPage = this.showQuestionPage(zone);
                    return (
                        <div className={"quest"} style={{display: this.state.display[index]}} key={zone}>
                            {index === 0 ? this.showIntro() : null}
                            <h2>{zone}</h2>
                            <div>{questionPage}</div>

                        </div>
                    )
                }
            )}
        </div>
    );


    handleSliderChange = (obj, value) => {
        let a = this.state.sliders;
        a[obj] = value;
        this.setState({
            sliders: a
        })
    };

    showQuestionPage = (zone) => (
        this.state.files.questions[zone].map((obj, idx) => {

                if (obj.displayAs === "slider") {
                    return (
                        <div className={"question"} key={obj.label}>
                            <label>
                                {obj.label}
                                {obj.info === null ? false : <InformationBox header={obj.label} text={obj.info}/>}

                                <Slider
                                    className="slider"
                                    value={this.state.sliders[obj.id]}
                                    orientation="horizontal"
                                    max={10}
                                    onChange={(e) => this.handleSliderChange(obj.id, e)}
                                />
                                <div className='sliderValue'>{this.state.sliders[obj.id]}</div>

                            </label>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={obj.label}>
                            <label>
                                {obj.label}
                                <Field
                                    name={"id" + obj.id}
                                    component="input"
                                    type={obj.displayAs}
                                    value={obj.id}

                                />{' '}
                                {obj.info === null ? false : <InformationBox header={obj.label} text={obj.info}/>}
                            </label>
                        </div>
                    )
                }
            }
        )
    );

    render() {

        if (!this.state.hasResponse) {
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
                                <div className={"outer-container"}>

                                    <div className={"screen"}>
                                        {this.state.isLoading ? <div className="loader"/> : this.showFullPage()}
                                    </div>
                                </div>
                                {this.state.error ? <Response type="danger" header="Obs!" message="Det ser ut som at serverene våre har gått ned. Vennligst prøv igjen senere."/>
                                    : false}
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
        } else {
            return (
                <div>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                          crossOrigin="anonymous"/>
                    {/*<p>Under finner du din id. Denne er tilfeldig generert og kan brukes for å gi tilbakemeling om din behandling</p>
                    <p>{this.state.response.patient_id}</p>*/}
                    <p>{this.state.response.center}</p>
                    <Recommendation data={this.state.response}/>
                    <div>
                        <Button bsStyle="primary" id="back_to_form"
                                onClick={() => this.setState({hasResponse: false})}>{<Glyphicon glyph="chevron-left"/>}Tilbake
                            til undersøkelsen</Button>
                    </div>
                </div>
            )
        }
    }
}

export default PatientSliders