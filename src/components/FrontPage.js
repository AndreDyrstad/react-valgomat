import React, { Component } from 'react'

class FrontPage extends Component{

    render(){
        return(
        <div>
            <h1>Introduksjon</h1>
            <p style={{"width":"50%"}}>
                Denne nettsiden er en pilot som er laget i samarbeid med Høyskolen på Vestlandet og Haukeland Sykehus.
                Målet med nettsiden er å lage en digital platform som kan brukes til fritt behandlingsvalg.
                Pasienter skal kunne svare på en rekke spørsmål og få anbefalinger på hvilke behandlingssteder som passer best.
                Siden inneholder også moduler for å samle data fra behandlingssteder samt muligheter til å administrere platformen.
            </p>
            <strong>Nettsiden inneholder bare fiktiv data!</strong>
        </div>
        )
    }

}
export default FrontPage