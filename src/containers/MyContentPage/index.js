import React from "react";
import {
  Grid,
  Col,
  Row,
  Icon,
  FormGroup,
  InputGroup,
  FormControl,
  ListViewInfoItem,
  ListViewIcon,
  ListViewItem,
  ListViewRow,
  Button,
  DropdownKebab,
  MenuItem,
  ListView,
  Toolbar
} from "patternfly-react";
import { Collapse, Well } from "react-bootstrap";
import { connect } from "react-redux";
import cx from "classnames";

//import ListView from "./ListView";
import { getSpinUser, refreshSpins, publishSpin } from "../../thunk/user";
import "./style.css";

class MyContentPage extends React.Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.onHandleDetails = this.onHandleDetails.bind(this);
    this.renderAdditionalInfoExpandItems = this.renderAdditionalInfoExpandItems.bind(
      this
    );
    this.state = {
      details: [],
      loadingPublish: false
    };
  }
  componentDidMount() {
    this.props.getSpinsUser();
  }
  renderAdditionalInfoExpandItems(item) {
    return (
      item.properties &&
      Object.keys(item.properties).map(prop => {
        const classNames = cx("pficon", {
          "pficon-flavor": prop === "hosts",
          "pficon-cluster": prop === "clusters",
          "pficon-container-node": prop === "nodes",
          "pficon-image": prop === "images"
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
    this.setState({loadingPublish: true});
    this.props.publishSpin(id).then((response) => {
      this.setState({loadingPublish: false});
    })
  }
  render() {
    const placeholderSearch = "Search";
    const messageLoad = 'Loading';
    let { spins } = this.props;

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
              If you don&#44t see all of your repositories, review and add your
              authorized organizations.
            </p>
          </Row>
          <Row style={{ borderBottom: "1px solid grey", padding: 20 }}>
            <Col xs={12} md={6}>
              <h2 />
            </Col>
            <Col xs={12} md={6}>
              <Col xs={12} md={10}>
                <FormGroup>
                  <InputGroup>
                    <FormControl type="text" placeholder={placeholderSearch} />
                    <InputGroup.Addon>
                      <Icon name="search" />
                    </InputGroup.Addon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs={12} md={2}>
                <Button onClick={this.props.refreshSpins}>
                  <Icon name="refresh" />
                </Button>
              </Col>
            </Col>
          </Row>
          <Row>

           {spins.data
              ? spins.data.map((spin, index) => {
                  return (
                    <Row
                      key={`key_spins_own_list${index}`}
                      style={{ marginTop: "13px" }}
                    >
                      <Row
                        style={{ backgroundColor: "#F1F1F1", color: "black", padding:10 }}
                      >
                        <Col xs={12} md={4}>
                          Name: {spin.full_name}
                        </Col>
                        <Col xs={12} md={4}>
                          Id: {spin.id}
                        </Col>
                        <Col xs={6} md={2}>
                          <Button onClick={() => this.onHandleDetails(index)}>
                            More Info
                          </Button>
                        </Col>
                        <Col xs={6} md={2}>
                          <Button onClick={() => this.publishSpin(spin.id)}>
                            Publish
                          </Button>
                          <span>{this.state.loadingPublish ? messageLoad: ''} </span>
                        </Col>
                      </Row>
                      <Row style={{ backgroundColor: '#f2eaea' }}>
                        <Collapse in={this.state.details[index]}>
                          <Col xs={12} md={8}>
                            <h3>Log:</h3>
                            {spin.validation_log}
                          </Col>
                        </Collapse>
                      </Row>
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
    spins: state.spins,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSpinsUser: () => dispatch(getSpinUser()),
    refreshSpins: () => dispatch(refreshSpins()),
    publishSpin: (id) => dispatch(publishSpin(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyContentPage);
