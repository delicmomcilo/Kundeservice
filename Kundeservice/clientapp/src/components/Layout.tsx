import * as React from 'react';
import { Glyphicon, FormControl, FormGroup } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import pic from '../Images/faq.jpg';
import './NavMenu.css';



const style = ({
    bakgrunnStil: {
        backgroundImage: `url(${pic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        height: '550px',
        width: '100%',
    },

    middleBoxMargin: {
        marginTop: '20%',
    }
})

export class Layout extends React.Component {


    public render() {
        return (
            <div className="container-fluid">
                <div className='row'>
                    <NavMenu />
                    <div className='col-sm-12'>
                        <div className="row">
                            <div style={style.bakgrunnStil}>
                                <div className="container h-100">
                                    <div className="row align-items-center h-100" style={style.middleBoxMargin}>
                                        <div className="col-6 mx-auto">
                                            <div className="text-center">
                                                <h1 className="display-4">Hva kan vi hjelpe deg med ?</h1>
                                                <p className="lead">Vi svarer deg døgnet rundt</p>


                                                <FormGroup>
                                                    <FormControl type="text" placeholder="Søk" />
                                                    <a className="btn btn-primary btn-lg" href="#" role="button"><Glyphicon glyph="search" /></a>
                                                </FormGroup>{' '}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
