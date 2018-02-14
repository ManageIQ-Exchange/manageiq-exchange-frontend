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
import { formatDate } from "../../../lib/";
import Api from "../../../service/Api"
const _ = require('underscore');
const fileDownload = require('js-file-download')

export default class TabDetails extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDownloadRelease = this.onClickDownloadRelease.bind(this);
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
  formatDateRelease(releases) {
    if ( !releases ) return [];
    let listReleases = _.clone(releases);
    listReleases.forEach(
      release => (release.created = formatDate(release.created_at))
    );
    return listReleases;
  }
  onClickDownloadRelease(idRelease) {
    const { spin } = this.props;
    Api.downloadReleaseSpin(spin.id, idRelease).then((response) => console.log("response", response));

  }
  render() {
    const { spin } = this.props;
    const list = spin ? this.formatRelease(spin.releases) : [];
    const watchersCount = spin ? spin.watchers_count : 0;
    const startsCount = spin ? spin.stargazers_count : 0;
    const userSpin = spin && spin.user ? spin.user.login : 0;
    const tags = spin && spin.metadata ? spin.metadata.tags : [];
    const releases = spin ? spin.releases : [];
    const releaseModify = this.formatDateRelease(releases);
    const cloneUrl = spin ? spin.clone_url : "";
    const urlRelease = spin && spin.id ? Api.generateUrlDownload(spin.id) : '';
    return (
      <div id="container" style={{ marginTop: "2%" }}>
        <Grid width="100%">
          <Row className="content-links-icon">
            <Col md={7}>
              <LinkIcon message="Issue Tacker" icon="bug" />
              <a href={cloneUrl}>
                <LinkIcon message="Github Repo" icon="github"  />
              </a>
              <LinkIcon message="Download" icon="cloud-download" />
              <LinkIcon message={`Watch ${watchersCount}`} icon="eye" />
              <LinkIcon message={`$Star ${startsCount}`} icon="star" />
            </Col>
          </Row>
          <Row>
            <Col md={9} className="content-details">
              <div>
                <span><strong>Type</strong></span>
                <span style={{ float: "right" }}> Ansible</span>
              </div>
              <div>
                <span><strong>Tag</strong></span>

                <span style={{ float: "right" }}>
                  {tags.map((tag, index) => <span key={`key_tag_${index}`} className="label label-info" style={{marginRight:'1%'}} >{tag} </span>)}
                </span>
              </div>
              <div>
                <span><strong>Usuario</strong></span>
                <span style={{ float: "right" }}>
                  {userSpin}
                </span>
              </div>
            </Col>
            <Col md={2} />
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <ListRanking
              height={"300px"}
              data={releaseModify}
              onClickName={this.onClickDownloadRelease}
              urlRelease={urlRelease}
              title={"Release History"}
              twoHeaders={["Version", "Release Date"]}
              keys={["tag", "created"]}
              idObject="id"
            />
          </Row>
        </Grid>
      </div>
    );
  }
}
