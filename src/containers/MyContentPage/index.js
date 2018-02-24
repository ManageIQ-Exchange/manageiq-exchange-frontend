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
  Spinner,
  Alert
} from 'patternfly-react';
import { connect } from 'react-redux';
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
import * as constant from './constant';

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
      listSpinsComplete: props.spins.spins,
      showAlert: false,
      messageAlert: ''
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
    this.setState({
      messageAlert: constant.messageRequestSent,
      showAlert: true
    });
    this.props.publishSpin(id).then(response => {
      this.requestSpinsCandidates();
    });
  }
  unpublishSpin(id) {
    this.setState({
      messageAlert: constant.messageRequestSent,
      showAlert: true
    });
    this.props.unpublishSpin(id).then(response => {
      this.requestSpinsCandidates();
    });
  }
  validateSpin(id) {
    this.setState({
      messageAlert: constant.messageRequestSent,
      showAlert: true
    });
    this.props.validateSpin(id).then(response => {
      this.requestSpinsCandidates();
    });
  }
  refreshSpins() {
    this.setState({
      messageAlert: constant.messageRequestSent,
      showAlert: true
    });
    this.props.refreshSpins().then(response => {
      this.requestSpinsCandidates();
    });
  }

  requestSpinsCandidates() {
    setTimeout(() => {
      this.props.getUserSpinsCandidates().then(() =>
        this.setState({
          messageAlert: constant.messageRequest
        })
      );
    }, constant.delayRequest);
  }
  onChangeSwicth(el, state, id) {
    if (state) this.publishSpin(id);
    else this.unpublishSpin(id);
  }
  onDismissAlert = () => {
    this.setState({ showAlert: false });
  };
  renderAlert = () => {
    const { showAlert, messageAlert } = this.state;
    return showAlert ?
      <Alert className="alert" type="info" onDismiss={this.onDismissAlert}>
        {messageAlert}
      </Alert>
      :
      null
  };
  render() {
    const placeholderSearch = 'Search';
    const titleBtnRefresh = 'Refresh';
    const { loadingPublish, listSpins } = this.state;
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
              If you do not see all of your repositories, review and add your
              authorized organizations.
            </p>

          </Row>
          <Row>
            <Col xs={12} md={6} style={{ padding: 0 }}>
              {this.renderAlert()}
            </Col>
            <Col xs={12} md={6} style={{ padding: 20 }}>
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
                  {titleBtnRefresh}
                  <Icon name="refresh" style={{ marginLeft: '4px' }} />
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
