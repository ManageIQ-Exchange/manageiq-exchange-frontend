import React from 'react';
import { Grid, Row, Col, Button, Filter, FormControl, FormGroup, InputGroup, Icon } from 'patternfly-react';
import { InputGroupAddon } from 'react-bootstrap';
import TiSocialGithubCircular from 'react-icons/lib/ti/social-github-circular';

import { imgIndex } from '../../ImageImport';
import ListRanking from '../../components/ListRanking';
import BtnViewGithub from '../../components/BtnViewGithub';
import './style.css';

const data = [
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'},
  {name:'10forge', link:'a@a.a'}
];




export default class AuthorsPage extends React.Component {

  constructor(props) {
      super(props);
    }

  render() {
    const placeholderSearch = "Search authors";
    const titleHeader = "Galaxy Contributors";
    return (
      <div id="container">

        <div >
          <img id="imgHome" style={{height:'50px'}} src={imgIndex} alt="image init"  />
          <span className="name-tab">BROWSE AUTHORS</span>
        </div>

        <Grid width="100%" style={{marginTop:'20px'}} >
          <Row>
            <Col md={12}>
              <h1 className="title-header">{titleHeader}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            </Col>
            <Col md={6}>
              <FormGroup>
                <InputGroup>
                  <FormControl type="text" placeholder={placeholderSearch} />
                  <InputGroup.Addon><Icon name="search"/></InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>

          <Row >
          <Col md={12}>
            <ListRanking
              data={data}
              title={null}
              twoHeaders={['Author','']}
             >
               <BtnViewGithub/>
             </ListRanking>
           </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}
