import * as React from "react";
import './NavMenu.css';
import { Panel, FormGroup, Button, Glyphicon } from "react-bootstrap";

interface ISporsmalSvarProps {
    id: number;
    sporsmal: string;
    svar: string;
    fornavn: string;
    etternavn: string;
    fetchSporsmal: () => void;
    positiv: number;
    negativ: number;
}

interface ISporsmalSvarState {
    svar: string;

}

class SporsmalSvar extends React.Component<ISporsmalSvarProps, ISporsmalSvarState>{
    constructor(props: Readonly<ISporsmalSvarProps>) {
        super(props);
        this.state = {
            svar: this.props.svar
        };
    }

    public postRating = (postData : any) => {
        const json = JSON.stringify(postData);
        fetch("api/SporsmalSvar/endreRating", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: json
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                this.props.fetchSporsmal();
            } else {
                alert("FeilMelding");
            }
        });


    }
    public handleChange = (e: any) => {
            const {name, value}: any = e.target;
            this.setState({
                [name]: value
            } as any);
        };

        public render() {
            return (
                <Panel eventKey={this.props.id}>
                    <Panel.Heading>
                        <Panel.Title toggle>{this.props.sporsmal}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                        <FormGroup>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-9">
                                        <div>
                                            <div className="container-fluid">
                                                <div>
                                                    <div>
                                                        <p> {this.props.svar} </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="row align-items-center h-100">

                                           
                                        <div className="row align-items-center h-100">

                                            <div className="col-6 mx-auto">
                                                    <Button onClick={() => this.postRating({ id: this.props.id, rating: true })}>
                                                        <Glyphicon glyph="chevron-up" />
                                                        {this.props.positiv}
                                                    </Button>
                                                    <div className="col-6 mx-auto">
                                                        <h3><span className="label label-primary">{this.props.positiv - this.props.negativ}</span></h3>
                                                    </div>
                                                    <Button onClick={() => this.postRating({ id: this.props.id, rating: false })}>
                                                        <Glyphicon glyph="chevron-down" />
                                                        {this.props.negativ}

                                                    </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            </div>

                        </FormGroup>
                        </Panel.Body>
                    </Panel>      
           );
        }
    }

export default SporsmalSvar;