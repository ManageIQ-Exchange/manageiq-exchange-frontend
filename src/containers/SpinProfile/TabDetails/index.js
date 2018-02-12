import React from "react";
import {
  Grid,
  Row,
  Col,
  Button,
  Icon,
  Nav,
  NavItem,
  Tabs,
  Tab
} from "patternfly-react";

import "./style.css";
import LinkIcon from "../../../components/LinkIcon/";
import ListRanking from "../../../components/ListRanking/";
import { data } from "./mock/";

export default class TabDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  formatRelease(release) {
    if (release) {
      return release.map(obj => {
        if (typeof obj !== "object") return;
        if (!obj.id) return;
        return obj;
      });
    }
  }

  render() {
    let { spin } = this.props;
  let list = spin ? this.formatRelease(spin.releases) : [];
    return (
      <div id="container" style={{ marginTop: "2%" }}>
        <Grid width="100%">
          <Row className="content-links-icon">
            <Col md={7}>
              <LinkIcon message="Issue Tacker" icon="bug" />
              <a href={spin ? spin.clone_url : ""}>
                <LinkIcon message="Github Repo" icon="github" />
              </a>
              <LinkIcon message="Download" icon="cloud-download" />
              <LinkIcon
                message={`Watch ${spin ? spin.watchers_count : 0}`}
                icon="eye"
              />
              <LinkIcon message="Star 60" icon="star" />
            </Col>
          </Row>
          <Row>
            <Col md={5} className="content-details">
              <div>
                <span>Type</span>
                <span style={{ float: "right" }}>Ansible</span>
              </div>
              <div>
                <span>Minimum Ansible Version</span>
                <span style={{ float: "right" }}>1.4</span>
              </div>
              <div>
                <span>Installation</span>
                <code style={{ color: "#c7254e", float: "right" }}>
                  $ ansible-galaxy install bennojoy.network_interface
                </code>
              </div>
              <div>
                <span>Last Commit</span>
                <span style={{ float: "right" }}> NA</span>
              </div>
              <div>
                <span>Last Commit</span>
                <span style={{ float: "right" }}> NA</span>
              </div>
            </Col>
            <Col md={2} />
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <ListRanking
              height={"300px"}
              data={list}
              onClickName={null}
              title={"Release History"}
              twoHeaders={["Version", "Release Date"]}
              keys={['id','created_at']}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}
