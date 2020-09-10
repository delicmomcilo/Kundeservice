import * as React from "react";
import { Panel, FormGroup, Button, Alert } from 'react-bootstrap';


export interface InputI {
    svar: string;
    id: string;
    sporsmal: string;
    fornavn: string;
    etternavn: string;
    fetchSporsmal: () => void;
}

interface InputState {
    verdi: string;
    valid: boolean;
    visAlert: boolean;
}

export default class Svar extends React.Component<InputI, InputState> {
    constructor(props: any) {
        super(props);
        this.state = {
            valid: false,
            verdi: this.props.svar,
            visAlert: false,
        };

        this.validerText = this.validerText.bind(this);
        this.slettSporsmal = this.slettSporsmal.bind(this);
    }

    public toggleAlert(value: boolean) {
        if (value) {
            this.setState({
                visAlert: true
            });
            setTimeout(() => {
                this.toggleAlert(false);
            }, 3000);
        } else {
            this.setState({
                visAlert: false
            });
        }
    }

    public slettSporsmal() {
        if (!confirm("Er du sikker på at du vil slette spørsmålet ?"))
        {
            return;
        }
        fetch(`api/SporsmalSvar/${this.props.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                alert("Slettet");
            } else {
                alert("Noe gikk galt");            
            }
        });
    }

    public postAnswer = () => {
       
        const postData = {
            id: this.props.id,
            svar: this.state.verdi
        };
        const json = JSON.stringify(postData);
        fetch("api/SporsmalSvar/postSvar", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: json
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                this.props.fetchSporsmal();       
                this.toggleAlert(true);
            } else {
                alert("Noe gikk galt.. Spørsmålene må besvares før de sendes inn.");
            }
        });
    }


    public render() {
        const svar = this.props.svar;
        const id = this.props.id;
        const verdi = this.state.verdi;

        let alert;
        if (this.state.visAlert) {
            alert = <Alert bsStyle="success"> <strong>Melding</strong> Svaret er sendt inn. </Alert>
        } else {
            alert = null;
        }
        return (
            <React.Fragment>
                <Panel eventKey={this.props.id}>
                    <Panel.Heading>
                        <Panel.Title toggle>{this.props.sporsmal}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <FormGroup>
                            {alert}
                            <textarea name={svar} id={id} value={verdi} required={true} onChange={this.validerText} className="form-control" />
                            <Button onClick={this.postAnswer} className="btn btn-primary">Send inn</Button>
                            <Button className="btn btn-danger" onClick={this.slettSporsmal}>Slett</Button>
                        </FormGroup>
                    </Panel.Body>
                </Panel>

            </React.Fragment>

        );

    }

    private validerText(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const resultat = true;
        const verdi = event.currentTarget.value;
        this.setState({
            verdi,
            valid: resultat
        });
    }

}