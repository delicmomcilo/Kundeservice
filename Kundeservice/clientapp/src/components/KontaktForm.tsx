import * as React from "react";
import { FAQ } from './FAQ';
import { Alert, FormGroup, FormControl } from "react-bootstrap";
import { setTimeout } from 'timers';


export interface IKontaktFormProps {
    onSubmit: any;
}

export interface IKontaktState {
    validForm: boolean;
    [valid: string]: boolean | string;
    visAlert: boolean;
    Fornavn: string;
    Etternavn: string;
    Epost: string;
    Sporsmal: string;
}

export class KontaktForm extends React.Component<IKontaktFormProps, IKontaktState> {

    constructor(props: any) {
        super(props);
        this.state = {
            validForm: true,
            visAlert: false,
            Fornavn: "",
            Etternavn: "",
            Epost: "",
            Sporsmal: ""
        };

        this.submitSkjema = this.submitSkjema.bind(this);
        this.settValid = this.settValid.bind(this);
   
    }

    public settValid(feltNavn: string, valid: boolean, verdi: string) {
        this.setState({
            ["valid" + feltNavn]: valid,
            [feltNavn]: verdi
        });
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

  

    public handleChange = (e: any) => {
        const { name, value }: any = e.target;
        this.setState({
            [name]: value
        } as any);

    }

    public validateField = (field: string) => {
        switch (field) {
            case "Fornavn":

                if (!this.state.Fornavn.match(new RegExp(/^[A-Za-zæøåÆØÅ\- ]+$/))) {
                    return 'error'
                };
                return null

            case "Etternavn":

                if (!this.state.Fornavn.match(new RegExp(/^[A-Za-zæøåÆØÅ\- ]+$/))) {
                    return 'error'
                };
                return null

            case "Epost":

                if (!this.state.Fornavn.match(new RegExp(/^[A-Za-zæøåÆØÅ0-9_\-,\. ]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/))) {
                    return 'error'
                };
                return null

        }

        return null;
    }


    public render() {

        let alert;
        if (this.state.visAlert) {
            alert = <Alert bsStyle="success"> <strong>Melding</strong> Spørsmålet ble sendt inn. </Alert>
        } else {
            alert = null;
        }

        return <div>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-7">
                        <div>
                            <div className="container-fluid">
                                <div>
                                    <div className="formBox">
                                        {alert}
                                        <form id="create-course-form" className="drop-shadow" onSubmit={this.submitSkjema}>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <h1>Still oss spørsmål</h1>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <FormGroup bsClass="inputBox" validationState={this.validateField("Fornavn")}>
                                                        <FormControl bsClass="input" type="name" value={this.state.Fornavn} name="Fornavn" placeholder="Fornavn" onChange={this.handleChange} />

                                                    </FormGroup>
                                                </div>

                                                <div className="col-sm-6">
                                                    <FormGroup bsClass="inputBox">
                                                        <FormControl bsClass="input" type="name" value={this.state.Etternavn} name="Etternavn" placeholder="Etternavn" onChange={this.handleChange} />

                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <FormGroup bsClass="inputBox">
                                                <FormControl bsClass="input" type="name" value={this.state.Epost} name="Epost" placeholder="E-post" onChange={this.handleChange} />

                                            </FormGroup>

                                            <FormGroup bsClass="inputBox">
                                                <FormControl bsClass="input" type="name" value={this.state.Sporsmal} name="Sporsmal" placeholder="Spørsmål" onChange={this.handleChange} />

                                            </FormGroup>

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <button type="submit"  className="button btn btn-primary">Send inn</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="row align-items-center h-100">

                            <div className="col-6 mx-auto">
                                <div className="formBox">
                                    <form className="drop-shadow">
                                        <div className="text-center">
                                            <span className="glyphicon glyphicon-earphone" />
                                            <h2>+47 47 44 23 16</h2>
                                            <h5>Du kan ringe oss døgnet rundt!</h5>
                                            <br />

                                            <button className="button btn btn-primary">Ring Oss</button>
                                          </div> 
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center h-100">

                            <div className="col-6 mx-auto">
                                <div className="formBox1">
                                    <form className="drop-shadow">
                                        <div className="text-center">
                                            <h1 className="display-4">Finn svaret under!</h1>
                                            <br />
                                            <div>
                                                <FAQ/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>;
    }

    private resetForm() {
        this.setState({
            Fornavn: "",
            Etternavn: "",
            Epost: "",
            Sporsmal: ""
        })
    }

   

  

    private submitSkjema(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const dataInn = {
            Fornavn: this.state.Fornavn,
            Etternavn: this.state.Etternavn,
            Epost: this.state.Epost,
            sporsmal: this.state.Sporsmal
        };

        const json = JSON.stringify(dataInn);
        fetch("api/SporsmalSvar/postSporsmal", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: json
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                this.toggleAlert(true);
                this.resetForm();
            } else {
                alert("Noe gikk galt! Kjekk om du tastet inn riktig input i feltene.");
            }
        });
    }
}