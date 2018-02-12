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
import { connect } from "react-redux";

import Api from "../../service/Api";
import TabDetails from "./TabDetails/";
import { getSpin } from "../../thunk/spin";
class SpinProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { idSpin } = this.props.params;
    if (idSpin) this.props.getSpin(idSpin);
  }

  render() {
    let { detailsSpin } = this.props;

    return (
      <div id="container" style={{ marginTop: "2%" }}>
        <Grid width="100%">
          <Row>
            <h1 />
          </Row>
          <Row>
            <h2>
              {detailsSpin && detailsSpin.spin
                ? detailsSpin.spin.description
                : ""}
            </h2>
          </Row>
          <Tabs defaultActiveKey={1} style={{ marginTop: "10px" }}>
            <Tab eventKey={1} title="Details">
              <TabDetails spin={detailsSpin.spin} />
            </Tab>
            <Tab eventKey={2} title="README">
              <Row style={{ marginTop: '10px' }}>
                <pre>
                  <code>
                    {detailsSpin && detailsSpin.spin
                      ? detailsSpin.spin.readme
                      : ""}
                  </code>
                </pre>
              </Row>
            </Tab>
          </Tabs>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    detailsSpin: state.detailsSpin
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSpin: id => dispatch(getSpin(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SpinProfile);
