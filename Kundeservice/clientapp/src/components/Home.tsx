import * as React from 'react';
import './NavMenu.css';
import { FAQ } from './FAQ';

export class Home extends React.Component {

    public render() {
        return (
            <div className="container">
            <div className="row align-items-center h-100">

                <div className="col-6 mx-auto">
                    <div className="formBox1">
                        <form className="drop-shadow">
                            <div className="text-center">
                                <h1 className="display-4">Finn svaret under!</h1>
                                <br />
                                <div>
                                    <FAQ />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
                </div>
        );
    }
}
