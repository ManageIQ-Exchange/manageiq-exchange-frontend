import React from 'react';
import { Grid, Row, Col, Button, Uncontrolledp, Nav, NavItem, Tabs, Tab } from 'patternfly-react';

import Api from '../../service/Api';

export default class AuthorProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {

      return (
        <div id="container">
          <Tabs defaultActiveKey={2} >
            <Tab eventKey={1} title="Details">
              Tab 1 content
            </Tab>
            <Tab eventKey={2} title="README">
              Tab 2 content
            </Tab>
          </Tabs>;
        </div>
      )
    }
}
