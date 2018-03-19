import React from 'react';
import { Grid, Row, Col, Table } from 'patternfly-react';
import { Well } from 'react-bootstrap';
import { translate } from 'react-i18next';

import './style.css';
import LinkIcon from '../../../components/LinkIcon/';
import { formatDate, getFullNameMinimumVersion } from '../../../lib/';
import Api from '../../../service/Api';
import { getColumns } from './columns/';

const defaultProps = {
  t: () => ''
};

class TabDetails extends React.Component {
 
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
    const { spin, t } = this.props;
    const watchersCount = spin ? spin.watchers_count : 0;
    const startsCount = spin ? spin.stargazers_count : 0;
    const userSpin = spin && spin.user ? spin.user.login : 0;
    const tags = spin && spin.metadata ? spin.metadata.tags : [];
    const releases = spin ? spin.releases : [];
    const releaseModify =
      spin && spin.id ? this.formatDateRelease(releases, spin.id) : [];
    const cloneUrl = spin ? spin.clone_url : '';
    const licence = spin ? spin.license_name : '';
    const defaultBranch = spin ? spin.default_branch : '';
    const metadata = spin ? spin.metadata : {};
    const metadataAuthor =
      spin && metadata && metadata.author ? metadata.author : '';
    const metadataDescription =
      spin && metadata && metadata.description ? metadata.description : '';
    const metadataVersion =
      spin && metadata && metadata.min_miq_version
        ? getFullNameMinimumVersion(metadata.min_miq_version)
        : '';
    const metadataCompany =
      spin && metadata && metadata.company ? metadata.company : '';
    const urlDownloadLastRelease =
      spin && spin.id && spin.releases && spin.releases.length > 0
        ? `${Api.generateUrlDownload(spin.id)}${spin.releases[0].id}/download`
        : '';
    const urlIssue = spin ? spin.issues_url : '';

    const columnsListRelease = getColumns([
      t('profileSpin.headerListReleaseVersion'),
      t('profileSpin.headerListReleaseDate'),
      t('profileSpin.headerListReleaseDownload')
    ]);

    const titleIssue = t('profileSpin.titleIssue');
    const titleDownload = t('profileSpin.titleDownload');
    const titleWatch = t('profileSpin.titleWatch');
    const titleStart = t('profileSpin.titleWatch');
    const textLicense = t('profileSpin.license');
    const textDefaultBranch = t('profileSpin.defaultBranch');
    const textTag = t('profileSpin.tag');
    const textUser = t('profileSpin.user');
    const textMetadata = t('profileSpin.metadata');
    const textMetadataAuthor = t('profileSpin.medataAuthor');
    const textMetadataDescription = t('profileSpin.medataDescription');
    const textMetadataMinimumVersion = t('profileSpin.medataMinimumVersion');
    const textMetadataCompany = t('profileSpin.medataCompany');
    const titleReleases = t('profileSpin.titleReleaseHistory');

    return (
      <div id="container" style={{ marginTop: '2%' }}>
        <Grid width="100%">
          <Row className="content-links-icon">
            <Col md={7}>
              <LinkIcon message={titleIssue} icon="bug" href={urlIssue} />
              <LinkIcon message="Github Repo" icon="github" href={cloneUrl} />
              <LinkIcon
                message={titleDownload}
                icon="cloud-download"
                href={urlDownloadLastRelease}
              />
              <LinkIcon message={`${titleWatch} ${watchersCount}`} icon="eye" />
              <LinkIcon message={`${titleStart} ${startsCount}`} icon="star" />
            </Col>
          </Row>
          <Row>
            <Col md={12} className="content-details">
              <div>
                <span>
                  <strong>{textLicense}</strong>
                </span>
                <span style={{ float: 'right' }}> {licence}</span>
              </div>
              <div>
                <span>
                  <strong>{textDefaultBranch}</strong>
                </span>
                <span style={{ float: 'right' }}> {defaultBranch}</span>
              </div>
              <div>
                <span>
                  <strong>{textTag}</strong>
                </span>

                <span style={{ float: 'right' }}>
                  {tags.map((tag, index) => (
                    <span
                      key={`key_tag_${index}`}
                      className="label label-info"
                      style={{ marginRight: '1%' }}
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
              <div>
                <span>
                  <strong>{textUser}</strong>
                </span>
                <span style={{ float: 'right' }}>
                  <a href={cloneUrl}>{userSpin}</a>
                </span>
              </div>
              <div>
                <span>
                  <strong>{textMetadata}</strong>
                </span>
                <Well>
                  <div>
                    <span>
                      <strong>{textMetadataAuthor}</strong>
                    </span>
                    <span style={{ float: 'right' }}>{metadataAuthor}</span>
                  </div>
                  <div>
                    <span>
                      <strong>{textMetadataDescription}</strong>
                    </span>
                    <span style={{ float: 'right' }}>
                      {metadataDescription}
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong>{textMetadataMinimumVersion}</strong>
                    </span>
                    <span style={{ float: 'right' }}>{metadataVersion}</span>
                  </div>
                  <div>
                    <span>
                      <strong>{textMetadataCompany}</strong>
                    </span>
                    <span style={{ float: 'right' }}>{metadataCompany}</span>
                  </div>
                </Well>
              </div>
            </Col>
            <Col md={2} />
          </Row>
          <Row style={{ marginTop: '3%' }}>
            <Col md={12}>
              <h2>{titleReleases}</h2>
              <div className="table-responsive">
                <Table.PfProvider
                  striped
                  bordered
                  hover
                  columns={columnsListRelease}
                >
                  <Table.Header />
                  <Table.Body rows={releaseModify} />
                </Table.PfProvider>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
TabDetails.defaultProps = defaultProps;

export default translate()(TabDetails);
