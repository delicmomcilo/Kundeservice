import * as React from "react";
import { PanelGroup, Panel } from 'react-bootstrap';
import './NavMenu.css';
import Svar from './Svar';

const style = ({
    bakgrunnStil: {
        backgroundColor: '#222',
        color: 'white',
    },

})

interface IFaq {
    sporsmal: ISporsmalSvarProps[];
    onDelete?: any;
}

interface ISporsmalSvarProps {
    id: string;
    sporsmal: string;
    svar: string;
    fornavn: string;
    etternavn: string;
}
export class BehandleSporsmal extends React.Component<{}, IFaq> {
    constructor(props: any) {
        super(props);
        this.state = {
            sporsmal: [],
        };


    }

    public componentDidMount() {
        this.fetchSporsmal();
    }
    
    public fetchSporsmal = () => {
        fetch('api/SporsmalSvar/hentallesporsmal')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    sporsmal: data
                });
            });
    }


    public render() {


        return(

        <div className="container">
            <div className="row align-items-center h-100">
                <div className="col-6 mx-auto">
                    <div className="formBox1">
                        <form className="drop-shadow">
                            <div className="text-center">
                                 <Panel>
                                    <PanelGroup accordion>
                                        <Panel eventKey={99999}>
                                            <Panel.Heading style={style.bakgrunnStil}>
                                                <Panel.Title toggle>Her kan du besvare spørsmålene</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body>
                                                {this.state.sporsmal.map((data) => {
                                                    return (
                                                        <Svar id={data.id} svar={data.svar} key={data.id} fornavn={data.fornavn} etternavn={data.etternavn} sporsmal={data.sporsmal} fetchSporsmal={this.fetchSporsmal} />
                                                    )
                                                })}
                                            </Panel.Body>
                                        </Panel> 
                                    </PanelGroup>
                               </Panel>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}