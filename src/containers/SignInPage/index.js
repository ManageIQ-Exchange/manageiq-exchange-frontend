import React from 'react';
//import { Row,Col,Pagination,FormGroup,InputGroup,FormControl,Glyphicon} from 'react-bootstrap';
import {
  Grid,
  Row,
  Col,
  Button,
  FormControl,
  FormGroup,
  HelpBlock,
  InputGroup,
  InputGroupButton,
  ControlLabel,
  Form,
  Checkbox
} from 'patternfly-react';

import Api from '../../service/Api';
import HeaderTitle from '../../components/HeaderTitle/';
import SocialButtonLogin from '../../components/SocialButtonLogin/';
import './style.css';

export default class SignIn extends React.Component {

  render() {
    const titlePage = 'LOGIN';
    const titleButtonLogin = 'Log in';
    return (
      <div>
        <HeaderTitle name={titlePage} />
      <Grid width="100%" style={{marginTop:'50px', height:'500px'}} >
        <Row style={{textAlign:'center', fontWeight: '19px'}} >
          <h1 id="header-login">Log In to Your Account</h1>
        </Row>
        <Row style={{marginTop:'5%', height:'90%'}}>

          <Col md={6}>
            <Row style={{padding: 25, marginTop:'18%'}} >
              <Col md={2}>
              </Col>
              <Col md={8}>
                <Row>
                  <Form horizontal>
                    <Col md={12}>
                      <FormGroup controlId="name" disabled={false}>
                        <ControlLabel>
                        Name
                        </ControlLabel>
                        <FormControl type="text" disabled={false} />
                        <HelpBlock>
                          Enter your name
                        </HelpBlock>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup controlId="name" disabled={false} type="password">
                        <ControlLabel>
                          Password
                        </ControlLabel>
                        <FormControl type="text" disabled={false} type="password"/>
                        <HelpBlock>
                          Enter your password
                        </HelpBlock>
                      </FormGroup>
                    </Col>
                    <Col md={12} style={{padding: 0}} >
                      <Col md={6}>
                        <FormGroup>
                          <Checkbox>
                            Keep me logged in for 30 days
                          </Checkbox>
                        </FormGroup>
                      </Col>
                      <Col md={6} style={{padding: 0}} >
                        <a style={{float:'right'}} > Forgot password</a>
                      </Col>
                    </Col>
                  </Form>
                </Row>
                <Row>

                </Row>
              </Col>
              <Col md={2}>
              </Col>
            </Row>
            <Row>
            <Col md={2}>
            </Col>
            <Col md={8}>
              <FormGroup>
                <Button bsStyle="primary" style={{width:'100%'}} >{titleButtonLogin}</Button>
              </FormGroup>
            </Col>
            <Col md={2}>
            </Col>
            </Row>
          </Col>
          <Col md={6} style={{borderLeft:'1px solid grey', padding: 8}}>
            <Row style={{marginTop:'27%'}}>
              <Col md={2} >
              </Col>
              <Col md={8} >
                <SocialButtonLogin type="github" sizeIcon={2} message="Github" />
              </Col>
              <Col md={2} >
              </Col>
            </Row>
            <Row style={{marginTop:'10px'}} >
              <Col md={2} >
              </Col>
              <Col md={8} >
                <SocialButtonLogin type="gitlab" sizeIcon={2} message="Gitlab" />
              </Col>
              <Col md={2} >
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>


      </div>
    );
  }
}
