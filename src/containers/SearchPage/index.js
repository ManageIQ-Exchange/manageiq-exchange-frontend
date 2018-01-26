import React from 'react';
import {
  Grid,
  Row,
  Col,
  Toolbar
} from 'patternfly-react';

import Api from '../../service/Api';
import TiSocialGithubCircular from 'react-icons/lib/ti/social-github-circular';
import { imgIndex } from '../../ImageImport';

export default class SearchPage extends React.Component {

  constructor() {
  super();
}


    render() {

      return (
        <div id="container">

        <div >
          <img id="imgHome" style={{height:'50px'}} src={imgIndex} alt="image init"  />
          <span className="name-tab">SEARCH</span>
        </div>
        <Grid width="100%" style={{marginTop:'50px'}} >
          <Row >

          </Row>
        </Grid>

        </div>
      )
    }
}
