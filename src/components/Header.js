import React, {Component} from 'react'
import {Nav, NavDropdown, NavItem, MenuItem, Navbar } from 'react-bootstrap'


class FrontPage extends Component {

    render() {
        return (
            <div>

                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <div>

                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/">Valgomat for MS-pasienter</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav>
                            <NavItem eventKey={1} href="\center">
                                Senter
                            </NavItem>
                            <NavItem eventKey={1} href="\patient">
                                Pasienter
                            </NavItem>
                            <NavItem eventKey={3} href="\feedback">
                                Tilbakemelding for pasienter
                            </NavItem>
                            <NavItem eventKey={2} onClick={() => window.print()}>
                                Skriv ut denne siden
                            </NavItem>
                            <NavDropdown eventKey={5} title="Admin" id="basic-nav-dropdown">
                                <MenuItem href="/admin/add" eventKey={5.1}>Legg til nytt spørsmål</MenuItem>
                                <MenuItem href="/admin/manage" eventKey={5.2}>Administrer spørsmål</MenuItem>
                                <MenuItem href="/admin/connection" eventKey={5.3}>Administrer koblinger</MenuItem>
                                <MenuItem href="/admin/feedback" eventKey={5.4}>Tilbakemeldinger fra pasienter</MenuItem>
                                <MenuItem href="/admin/center" eventKey={5.5}>Oversikt over behandlingssteder</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar>

                </div>
            </div>
        )
    }
}

export default FrontPage