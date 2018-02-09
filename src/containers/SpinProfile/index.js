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
import { getSpin } from '../../thunk/spin';
class SpinProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { idSpin } = this.props.params;
    if (idSpin) this.props.getSpin(idSpin)
  }

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
const mapStateToProps = state => {
  return {
    detailsSpin: state.detailsSpin
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSpin: (id) => dispatch(getSpin(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SpinProfile);
