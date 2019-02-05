import React, { Component } from 'react'

class FrontPage extends Component{

    render(){
        return(
        <div>
            <h1>Introduksjon</h1>
            <p style={{"width":"50%"}}>
                Denne nettsiden er en pilot som er laget i et samarbeid mellom Høgskolen på Vestlandet og Haukeland universitetssjukehus.
                Målet med nettsiden er å lage en digital plattform som kan brukes til fritt rehabiliteringsvalg i spesialisthelsetjenesten.
                Ved å svare på en rekke spørsmål, får en forslag om behandlingssted som synes å passe best med den enkeltes behov.
                Nettsiden inneholder også moduler for å samle data fra behandlingssteder samt muligheter til å administrere plattformen.
            </p>
            <strong>Nettsiden inneholder bare fiktive data!</strong>
        </div>
        )
    }

}
export default FrontPage