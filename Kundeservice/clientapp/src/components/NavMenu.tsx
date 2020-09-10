import * as React from 'react';
import './NavMenu.css';
import { NavLink } from 'react-router-dom';


export class NavMenu extends React.Component {
    public render() {
        return (

            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <NavLink to={'/'} activeClassName='active'>
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Kundeservice</a>
                    </div>
                    </NavLink>
                  
                    <NavLink to={'/besvartesporsmal'} activeClassName='active'>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#"><span className="glyphicon glyphicon-log-in" /> Besvarte spørsmål</a></li>
                        </ul>
                        </NavLink>
                    <NavLink to={'/behandlesporsmal'} activeClassName='active'>
                        <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><span className="glyphicon glyphicon-user" /> Administrasjon</a></li>   
                        </ul>
                        </NavLink>
                    
                </div>
            </nav>

        );
    }
}
