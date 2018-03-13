import React from 'react';
import { Grid, Row, Col, Icon } from 'patternfly-react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import MdStar from 'react-icons/lib/fa/star';
import './style.css';
import imgHome from './miq-twitter-banner.png';
import Footer from '../../components/Footer/index';

const defaultProps = {
  t: () => ''
};

const propTypes = {
  t: PropTypes.func
};

export class IndexPage extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div style={{ height: '100%', overflowY: 'none' }}>
        <div id="imgHomeContent">
          <img id="imgHome" src={imgHome} alt="init" />
        </div>
        <Grid width="100%" height="40%">
          <Row style={{ height: '90%', padding: '8px' }}>
            <Col md={4}>
              <h2 style={{ color: '#878C95' }}>
                <Icon
                  className="icon icon-download"
                  name="cloud-download fa-2x"
                />
                {t('indexPage.titleDownload')}
              </h2>
              <p>{t('indexPage.textDownload')}</p>
            </Col>
            <Col md={4}>
              <h2>
                <Icon
                  className="icon icon-share "
                  name="share-alt-square fa-2x"
                />
                {t('indexPage.titleShare')}
              </h2>
              <p>{t('indexPage.textShare')}</p>
            </Col>
            <Col md={4} className="tabFeature">
              <h2>
                <MdStar style={{ color: '#FFFFFF' }} />{' '}
                {t('indexPage.titleFeatured')}
              </h2>
              <div className="content-feature">
                <p>{t('indexPage.textFeatured1')}</p>
              </div>
              <div className="content-feature">
                <p>{t('indexPage.textFeatured2')} </p>
              </div>
              <div className="content-feature">
                <p>{t('indexPage.textFeatured3')}</p>
              </div>
            </Col>
          </Row>
        </Grid>
        <div style={{ height: '40%', width: '100%' }}>
          <Footer style={{ width: '100%' }} />
        </div>
      </div>
    );
  }
}
IndexPage.propTypes = propTypes;
IndexPage.defaultProps = defaultProps;

export default translate('translations')(IndexPage);
