import React from 'react';
import { Grid } from 'semantic-ui-react';
import logo from '../../logo.png';
import "./ExerciciosAuthentication.css"


// import { Container } from './styles';

function ExerciciosAuthentication({ children }) {

    return (
        <div>
            <Grid verticalAlign='middle' centered textAlign='center'>
                <Grid.Row className="auth-container">
                    <Grid.Column mobile={16} tablet={12} computer={8} >
                        <div className="logo"> <img src={logo} width="150" height="150" /> </div>
                        {
                            children
                        }
                    </Grid.Column>
                    <Grid.Column className="background2" only="tablet" tablet={4} computer={8}>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {/* <div className="background">
                <div className="container">
                    

                </div>
            </div> */}
        </div>
    );
}

export default ExerciciosAuthentication;