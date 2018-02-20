import React from 'react';
import {
  Grid,
  Col,
  Row,
  Icon,
  FormGroup,
  InputGroup,
  FormControl,
  Button,
  ListView,
  Spinner
} from 'patternfly-react';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';

import {
  getUserSpinsCandidates,
  refreshSpins,
  publishSpin,
  validateSpin,
  unpublishSpin
} from '../../thunk/user';
import './style.css';
import { filterByAttribute } from '../../lib/';
import ListViewItem from './ListViewItem/';

const defaultProps = {
  spins: {
    spins: []
  }
};

const propTypes = {
  spins: PropTypes.object,
  getUserSpinsCandidates: PropTypes.func,
  refreshSpins: PropTypes.func,
  publishSpin: PropTypes.func,
  unpublishSpin: PropTypes.func,
  validateSpin: PropTypes.func
};

export class MyContentPage extends React.Component {
  constructor(props) {
    super(props);

    this.refreshSpins = this.refreshSpins.bind(this);
    this.publishSpin = this.publishSpin.bind(this);
    this.validateSpin = this.validateSpin.bind(this);
    this.onChangeSwicth = this.onChangeSwicth.bind(this);
    this.unpublishSpin = this.unpublishSpin.bind(this);

    this.state = {
      details: [],
      loadingPublish: false,
      listSpins: props.spins.spins,
      listSpinsComplete: props.spins.spins
    };
  }
  componentDidMount() {
    if (this.props.getUserSpinsCandidates) this.props.getUserSpinsCandidates();
  }
  componentWillReceiveProps(nextProps) {
    let { spins } = nextProps.spins;
    if (this.props.spins.spins !== spins)
      this.setState({ listSpins: spins, listSpinsComplete: spins });
  }

  searchOnList(keywords) {
    let listSpins = [...this.state.listSpinsComplete];

    listSpins = filterByAttribute(keywords, listSpins, 'full_name');
    this.setState({ listSpins });
  }

  publishSpin(id) {
    this.setState({ loadingPublish: true });
    this.props.publishSpin(id).then(response => {
      this.setState({ loadingPublish: false });
      this.props.getUserSpinsCandidates();
    });
  }
  unpublishSpin(id) {
    this.setState({ loadingPublish: true });
    this.props.unpublishSpin(id).then(response => {
      this.setState({ loadingPublish: false });
      this.props.getUserSpinsCandidates();
    });
  }
  validateSpin(id) {
    this.setState({ loadingPublish: true });
    this.props.validateSpin(id).then(response => {
      this.setState({ loadingPublish: false });
      this.props.getUserSpinsCandidates();
    });
  }
  refreshSpins() {
    this.setState({ loadingPublish: true });
    this.props.refreshSpins().then(response => {
      this.setState({ loadingPublish: false });
      this.props.getUserSpinsCandidates();
    });
  }
  onChangeSwicth(el, state, id) {
    if (state) this.publishSpin(id);
    else this.unpublishSpin(id);
  }
  render() {
    const placeholderSearch = 'Search';
    let { loadingPublish, listSpins } = this.state;
    return (
      <div>
        <Grid width="100%">
          <Row>
            <h1> Import Your Content from Github</h1>
          </Row>
          <Row style={{ padding: 0 }}>
            <p>
              Click the toggle next to the repository to reveal a check mark.
              This will add the repository to EXCHANGE, making it visible on the
              Search page and allowing anyone to download it. Removing the check
              mark will delete the repository from EXCHANGE. Use settings to
              enable Travis notifications and control the repository name.
            </p>
            <p>
              If you don see all of your repositories, review and add your
              authorized organizations.
            </p>
          </Row>
          <Row style={{ padding: 20 }}>
            <Col xs={12} md={6}>
              <h2 />
            </Col>
            <Col xs={12} md={6}>
              <Col xs={12} md={9}>
                <FormGroup style={{ width: '100%' }}>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder={placeholderSearch}
                      onChange={e => this.searchOnList(e.target.value)}
                    />
                    <InputGroup.Addon>
                      <Icon name="search" />
                    </InputGroup.Addon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs={12} md={2}>
                <Button onClick={this.refreshSpins}>
                  <Icon name="refresh" />
                </Button>
              </Col>
              <Col xs={1} md={1}>
                <Spinner loading={loadingPublish} />
              </Col>
            </Col>
          </Row>
          <Row>
            {listSpins
              ? listSpins.map((spin, index) => {
                  return (
                    <Row
                      key={`key_spins_own_list${index}`}
                      style={{ marginTop: '13px' }}
                    >
                      <ListViewItem
                        dataList={spin}
                        onValidate={this.validateSpin}
                        onPublish={this.onChangeSwicth}
                      />
                    </Row>
                  );
                })
              : null}
          </Row>

        </Grid>
      </div>
    );
  }
}

MyContentPage.propTypes = propTypes;
MyContentPage.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    spins: state.spinsCandidates
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserSpinsCandidates: () => dispatch(getUserSpinsCandidates()),
    refreshSpins: () => dispatch(refreshSpins()),
    publishSpin: id => dispatch(publishSpin(id)),
    unpublishSpin: id => dispatch(unpublishSpin(id)),
    validateSpin: id => dispatch(validateSpin(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyContentPage);
