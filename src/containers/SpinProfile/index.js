import React from 'react';
import { Grid, Row, Tabs, Tab } from 'patternfly-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { translate } from 'react-i18next';

import TabDetails from './TabDetails/';
import TabReadme from './TabReadme/';
import { getSpin } from '../../thunk/spin';

import './style.css';

const defaultProps = {
  t: key => key
};

const propTypes = {
  getSpin: PropTypes.func,
  detailsSpin: PropTypes.object,
  t: PropTypes.func
};

export class SpinProfile extends React.Component {
  componentDidMount() {
    let idSpin = this.props.params ? this.props.params.idSpin : null;
    if (idSpin) this.props.getSpin(idSpin);
  }

  render() {
    const { detailsSpin, t } = this.props;
    const descriptionSpin =
      detailsSpin && detailsSpin.spin ? detailsSpin.spin.description : '';
    const nameSpin =
      detailsSpin && detailsSpin.spin ? detailsSpin.spin.full_name : '';
    const readme =
      detailsSpin && detailsSpin.spin ? detailsSpin.spin.readme : '';
    const titleTabDetails = t('profileSpin.titleTabDetails');
    const titleReadme = 'README';
    const spin = detailsSpin && detailsSpin.spin ? detailsSpin.spin : {};

    return (
      <div id="container" style={{ marginTop: '2%' }}>
        <Grid width="100%">
          <Row>
            <h1 className="first-header">{nameSpin}</h1>
          </Row>
          <Row>
            <h2 className="second-header">{descriptionSpin}</h2>
          </Row>
          <Tabs
            id={'tabs_key'}
            defaultActiveKey={1}
            style={{ marginTop: '10px' }}
          >
            <Tab eventKey={1} key={titleTabDetails} title={titleTabDetails}>
              <TabDetails spin={spin} />
            </Tab>
            <Tab eventKey={2} title={titleReadme}>
              <Row style={{ marginTop: '10px' }}>
                <TabReadme textReadme={readme} />
              </Row>
            </Tab>
          </Tabs>
        </Grid>
      </div>
    );
  }
}
SpinProfile.propTypes = propTypes;
SpinProfile.defaultProps = defaultProps;

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
export default compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(SpinProfile);
