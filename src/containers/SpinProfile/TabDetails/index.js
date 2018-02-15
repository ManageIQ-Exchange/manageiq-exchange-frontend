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
  Tab,
  Table
} from "patternfly-react";
import { Well } from "react-bootstrap";
import "./style.css";
import LinkIcon from "../../../components/LinkIcon/";
import ListRanking from "../../../components/ListRanking/";
import { data } from "./mock/";
import { formatDate, getFullNameMinimumVersion } from "../../../lib/";
import Api from "../../../service/Api";
import { mockBootstrapColumns } from "./mock/";

export default class TabDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  formatDateRelease(releases, idSpin) {
    if (!releases) return [];
    let listReleases = [...releases];
    listReleases.forEach(release => {
      release.created = formatDate(release.created_at);
      release.url_download = `${Api.generateUrlDownload(idSpin)}${
        release.id
      }/download`;
    });
    return listReleases;
  }

  render() {
    const { spin } = this.props;
    const watchersCount = spin ? spin.watchers_count : 0;
    const startsCount = spin ? spin.stargazers_count : 0;
    const userSpin = spin && spin.user ? spin.user.login : 0;
    const tags = spin && spin.metadata ? spin.metadata.tags : [];
    const releases = spin ? spin.releases : [];
    const releaseModify =
      spin && spin.id ? this.formatDateRelease(releases, spin.id) : [];
    const cloneUrl = spin ? spin.clone_url : "";
    const urlRelease = spin && spin.id ? Api.generateUrlDownload(spin.id) : "";
    const licence = spin ? spin.license_name : "";
    const defaultBranch = spin ? spin.default_branch : "";
    const metadata = spin ? spin.metadata : {};
    const metadataAuthor =
      spin && metadata && metadata.author ? metadata.author : "";
    const metadataDescription =
      spin && metadata && metadata.description ? metadata.description : "";
    const metadataVersion =
      spin && metadata && metadata.min_miq_version
        ? getFullNameMinimumVersion(metadata.min_miq_version)
        : "";
    const metadataCompany =
      spin && metadata && metadata.company ? metadata.company : "";
    const urlIssue = `${cloneUrl}issue`;
    const urlDownloadLastRelease =
      spin && spin.id && spin.releases && spin.releases.length > 0
        ? `${Api.generateUrlDownload(spin.id)}${spin.releases[0].id}/download`
        : "";
    const titleReleases = "Release History";
    return (
      <div id="container" style={{ marginTop: "2%" }}>
        <Grid width="100%">
          <Row className="content-links-icon">
            <Col md={7}>
              <a>
                <LinkIcon message="Issue Tacker" icon="bug" />
              </a>
              <a href={cloneUrl}>
                <LinkIcon message="Github Repo" icon="github" />
              </a>
              <a href={urlDownloadLastRelease}>
                <LinkIcon message="Download" icon="cloud-download" />
              </a>
              <LinkIcon message={`Watch ${watchersCount}`} icon="eye" />
              <LinkIcon message={`Star ${startsCount}`} icon="star" />
            </Col>
          </Row>
          <Row>
            <Col md={9} className="content-details">
              <div>
                <span>
                  <strong>Licencia</strong>
                </span>
                <span style={{ float: "right" }}> {licence}</span>
              </div>
              <div>
                <span>
                  <strong>Default Branch</strong>
                </span>
                <span style={{ float: "right" }}> {defaultBranch}</span>
              </div>
              <div>
                <span>
                  <strong>Tag</strong>
                </span>

                <span style={{ float: "right" }}>
                  {tags.map((tag, index) => (
                    <span
                      key={`key_tag_${index}`}
                      className="label label-info"
                      style={{ marginRight: "1%" }}
                    >
                      {tag}{" "}
                    </span>
                  ))}
                </span>
              </div>
              <div>
                <span>
                  <strong>User</strong>
                </span>
                <span style={{ float: "right" }}>
                  <a href={cloneUrl}>{userSpin}</a>
                </span>
              </div>
              <div>
                <span>
                  <strong>Metadata</strong>
                </span>
                <Well>
                  <div>
                    <span>
                      <strong>Author</strong>
                    </span>
                    <span style={{ float: "right" }}>{metadataAuthor}</span>
                  </div>
                  <div>
                    <span>
                      <strong>Description</strong>
                    </span>
                    <span style={{ float: "right" }}>
                      {metadataDescription}
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong>Minimum version</strong>
                    </span>
                    <span style={{ float: "right" }}>{metadataVersion}</span>
                  </div>
                  <div>
                    <span>
                      <strong>Company</strong>
                    </span>
                    <span style={{ float: "right" }}>{metadataCompany}</span>
                  </div>
                </Well>
              </div>
            </Col>
            <Col md={2} />
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <h2>{titleReleases}</h2>
            <div className="table-responsive">
              <Table.PfProvider
                striped
                bordered
                hover
                columns={mockBootstrapColumns}
              >
                <Table.Header />
                <Table.Body rows={releaseModify} />
              </Table.PfProvider>
            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}
