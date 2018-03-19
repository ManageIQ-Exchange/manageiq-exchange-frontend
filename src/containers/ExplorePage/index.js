import React from 'react';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import ListRanking from '../../components/ListRanking';
import { getTops } from '../../thunk/top';
import { getConfigurationList } from './configuration';

import './style.css';

const defaultProps = {
  tops: {
    mostStarred: {
      name: '',
      data: []
    },
    mostWatched: {
      name: '',
      data: []
    },
    mostDownloaded: {
      name: '',
      data: []
    },
    topTags: {
      name: '',
      data: []
    },
    topContributors: {
      name: '',
      data: []
    },
    Newest: {
      name: '',
      data: []
    }
  },
  t: () => ''
};

const propTypes = {
  tops: PropTypes.object,
  t: PropTypes.func,
  getTops: PropTypes.func
};

export class ExplorePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      top: props.tops
    };
  }

  componentDidMount() {
    if (this.props.getTops) this.props.getTops();
  }

  redirectTo(id, redirectUser, redirectTag) {
    let nameRoute = redirectUser
      ? '/authors/' + id
      : redirectTag ? '/search/' : '/spin/' + id;
    let state = redirectTag ? { tag: id } : {};

    let route = { pathname: nameRoute, state };
    browserHistory.push(route);
  }
  redirectByRoute(nameRoute) {
    let route = { pathname: nameRoute };
    browserHistory.push(route);
  }

  getConfiguration() {
    const { t } = this.props;
    const translationTitle = [
      t('explorerPage.titleNewest'),
      t('explorerPage.titleDownloaded'),
      t('explorerPage.titleStarred'),
      t('explorerPage.titleWatched'),
      t('explorerPage.titleContributors'),
      t('explorerPage.titleTags')
    ];
    const translationHeaders = [
      [t('explorerPage.headerNewest1'), t('explorerPage.headerNewest2')],

      [
        t('explorerPage.headerDownloaded1'),
        t('explorerPage.headerDownloaded2')
      ],
      [t('explorerPage.headerStarred1'), t('explorerPage.headerStarred2')],
      [t('explorerPage.headerWatched1'), t('explorerPage.headerWatched2')],
      [
        t('explorerPage.headerContributors1'),
        t('explorerPage.headerContributors2')
      ],
      [t('explorerPage.headerTags1'), t('explorerPage.headerTags2')]
    ];
    return getConfigurationList(translationTitle, translationHeaders);
  }

  render() {
    let { tops, t } = this.props;
    const configurationList = this.getConfiguration();
    return (
      <div id="container">
        <Grid width="100%" style={{ marginTop: '2%' }}>
          <Row style={{ padding: 15 }}>
            <Button
              style={{ marginLeft: '3%' }}
              onClick={() => this.redirectByRoute('/search/')}
              id="btnSearch"
              bsStyle="primary"
            >
              {t('explorerPage.titleBtnSearch')}
            </Button>
            <Button
              onClick={() => this.redirectByRoute('/authors/')}
              className="btn-primary"
              bsStyle="primary"
            >
              {t('explorerPage.titleBtnBrowseAuthors')}
            </Button>
          </Row>
          <Row>
            {configurationList.map((elemConf, index) => {
              if (tops) {
                let data = tops[elemConf.nameAttribute].data.slice();
                if (elemConf.changeData) {
                  data.forEach(item => {
                    let formatDate = moment(
                      item[elemConf.namesAttributes[1]]
                    ).format('YYYY-MM-DD');
                    item[elemConf.namesAttributes[1]] = formatDate;
                  });
                }
                if (data.length === 0) return null;
                return (
                  <Col md={4} key={`list_explore_${index}`}>
                    <ListRanking
                      data={data}
                      onClickName={id => {
                        this.redirectTo(
                          id,
                          elemConf.redirectUser,
                          elemConf.redirectTag
                        );
                      }}
                      title={elemConf.name}
                      twoHeaders={elemConf.nameHeaders}
                      renderBottomBtn
                      keys={elemConf.namesAttributes}
                      idObject="id"
                      redirectTag={elemConf.redirectTag}
                    />
                  </Col>
                );
              } else return null;
            })}
          </Row>
        </Grid>
      </div>
    );
  }
}

ExplorePage.propTypes = propTypes;
ExplorePage.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    tops: state.tops
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTops: () => dispatch(getTops())
  };
};
export default compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(ExplorePage);
