import * as React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap3/dist/css/bootstrap.css'

import { KontaktForm } from './components/KontaktForm';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { BehandleSporsmal } from './components/BehandleSporsmal';


class App extends React.Component {
    public render() {
    
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Layout />
                    <Switch>   
                        <Route path="/besvartesporsmal" component={Home} />
                        <Route path="/behandlesporsmal" component={BehandleSporsmal} />
                        <Route path="/" component={KontaktForm} />
                    </Switch>
                </React.Fragment>
            </BrowserRouter>

        );
    }
}

export default App;
