import * as React from "react";
import { PanelGroup, Panel } from 'react-bootstrap';
import SporsmalSvar from './SporsmalSvar';


const style = ({
    bakgrunnStil: {
        backgroundColor: '#222',
        color: 'white',
    },

})

interface IFaq {
    sporsmal: ISporsmalSvarProps[];
    
}

interface ISporsmalSvarProps {
    id: number;
    sporsmal: string;
    svar: string;
    fornavn: string;
    etternavn: string;
    positiv: number;
    negativ: number;
}
export class FAQ extends React.Component<{}, IFaq> {
    constructor(props: any) {
        super(props);
        this.state = {
            sporsmal:[],
        };
        this.fetchSporsmal = this.fetchSporsmal.bind(this);
        
    }

    public componentDidMount() {
        this.fetchSporsmal();

    }

    public fetchSporsmal() {
        fetch('api/SporsmalSvar/HentSporsmal')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    sporsmal: data
                });
            });


    }

    public render() {

        return <div>
            <Panel>
                <PanelGroup accordion>
                    <Panel eventKey={99999}>
                        <Panel.Heading style={style.bakgrunnStil}>
                            <Panel.Title toggle>Ofte Stilte Spørsmål</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {this.state.sporsmal.map((data) => {
                                return (
                                    <SporsmalSvar id={data.id} svar={data.svar} key={data.id} fornavn={data.fornavn} etternavn={data.etternavn} sporsmal={data.sporsmal} fetchSporsmal={this.fetchSporsmal} positiv={data.positiv} negativ={data.negativ} />
                                )
                            })}
                        </Panel.Body>
                    </Panel> 
               
                </PanelGroup>
            </Panel>
           
                        
        </div>;
    }
}
