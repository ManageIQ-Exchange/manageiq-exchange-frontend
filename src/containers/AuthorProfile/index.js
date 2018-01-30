import React from "react";
import {
  Grid,
  Row,
  Col,
  Button,
  Uncontrolledp,
  Nav,
  NavItem,
  Tabs,
  Tab
} from "patternfly-react";

import Api from "../../service/Api";
import TabDetails from "./TabDetails/";

export default class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div id="container" style={{marginTop:'2%'}} >
        <Grid width="100%">
          <Tabs defaultActiveKey={1}>
            <Tab eventKey={1} title="Details">
              <TabDetails />
            </Tab>
            <Tab eventKey={2} title="README">
              README
            </Tab>
          </Tabs>
        </Grid>
      </div>
    );
  }
}
