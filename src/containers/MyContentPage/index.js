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
  Switch,
  Spinner
} from 'patternfly-react';
import { Collapse, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';

// import ListView from "./ListView";
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

class MyContentPage extends React.Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.onHandleDetails = this.onHandleDetails.bind(this);
    this.refreshSpins = this.refreshSpins.bind(this);
    this.publishSpin = this.publishSpin.bind(this);
    this.validateSpin = this.validateSpin.bind(this);
    this.onChangeSwicth = this.onChangeSwicth.bind(this);
    this.unpublishSpin = this.unpublishSpin.bind(this);
    this.renderAdditionalInfoExpandItems = this.renderAdditionalInfoExpandItems.bind(
      this
    );
    this.state = {
      details: [],
      loadingPublish: false,
      listSpins: [],
      listSpinsComplete: []
    };
  }
  componentDidMount() {
    this.props.getUserSpinsCandidates();
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

  renderAdditionalInfoExpandItems(item) {
    return (
      item.properties &&
      Object.keys(item.properties).map(prop => {
        const classNames = cx('pficon', {
          'pficon-flavor': prop === 'hosts',
          'pficon-cluster': prop === 'clusters',
          'pficon-container-node': prop === 'nodes',
          'pficon-image': prop === 'images'
        });
        return (
          <ListView.InfoItem key={prop}>
            <ListView.Expand
              expanded={item.expanded && prop === item.expandType}
              toggleExpanded={() => {
                this.toggleExpand(item, prop);
              }}
            >
              <span className={classNames} />
              <strong>{item.properties[prop]}</strong> {prop}
            </ListView.Expand>
          </ListView.InfoItem>
        );
      })
    );
  }

  renderItem(item, index) {
    let expandText = item.compoundExpandText[item.expandType];
    return (
      <ListView.Item
        key={index}
        actions={this.renderActions(item.actions)}
        checkboxInput={<input type="checkbox" />}
        leftContent={<ListView.Icon name="plane" />}
        additionalInfo={this.renderAdditionalInfoExpandItems(item)}
        heading={item.title}
        description={item.description}
        stacked={false}
        compoundExpand
        compoundExpanded={item.expanded}
        onCloseCompoundExpand={() => this.closeExpand(item)}
      >
        <Grid.Row>
          <Grid.Col sm={11}>{expandText}</Grid.Col>
        </Grid.Row>
      </ListView.Item>
    );
  }
  onHandleDetails(index) {
    let details = [...this.state.details];
    details[index] = !details[index];
    this.setState({ details });
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
    const titleBtnValidate = 'Validate';
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
              This will add the repository to Galaxy, making it visible on the
              Search page and allowing anyone to download it. Removing the check
              mark will delete the repository from Galaxy. Use settings to
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
const mapStateToProps = state => {
  return {
    spins: state.spinsCandidates,
    user: state.user
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
