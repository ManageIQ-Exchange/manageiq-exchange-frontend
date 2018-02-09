import React from "react";
import {
  Grid,
  Row,
  Col,
  Button,
  Filter,
  FormControl,
  FormGroup,
  InputGroup,
  Icon,
  Paginator
} from "patternfly-react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

import ListRanking from "../../components/ListRanking/";
import { getInformationUserProfile } from "../../thunk/user";
import { filterByAttribute } from "../../lib/";

class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);

    this.searchOnList = this.searchOnList.bind(this);

    this.state = {
      listSpinsUser: [],
      listSpinsUserComplete: []
    };
  }
  componentDidMount() {
    let { idAuthor } = this.props.params;
    if (idAuthor) this.props.getInformationUserProfile(idAuthor).then(() => {});
  }

  componentWillReceiveProps(nextProps: Props) {
    let data = nextProps.spins.spinsUser;
    if (this.props.spins.spinsUser != data)
      this.setState({ listSpinsUser: data, listSpinsUserComplete: data });
  }

  onClickNameRepository(id) {
    let route = { pathname: "spin/" + id };
    browserHistory.push(route);
  }
  searchOnList(keywords) {
    let listSpinsUser = [...this.state.listSpinsUserComplete];

    listSpinsUser = filterByAttribute(keywords, listSpinsUser, "user_login");
    this.setState({ listSpinsUser });
  }

  render() {
    let { spins } = this.props;
    let { listSpinsUser } = this.state;
    let { userDetails, spinsUser } = spins;
    const placeholderSearch = "Search";
    let location = "location Default";
    return (
      <Grid width="100%" style={{ marginTop: "20px" }}>
        <Row>
          <h1>{userDetails.login ? userDetails.login : ""}</h1>
        </Row>
        <Row>
          <Col xs={12} md={6} style={{ padding: 0 }}>
            <Col xs={12} md={3} style={{ padding: 0 }}>
              <img
                src={userDetails.avatar}
                width={100}
                height={100}
                alt="image profile user"
              />
            </Col>
            <Col xs={12} md={3} style={{ padding: 0 }}>
              <span style={{ marginLeft: "1%" }}>

                <div style={{ width: "75%" }}>
                  <span style={{ width: "75%" }}>
                    {userDetails.github_location
                      ?  (<span><Icon name="map-marker fa-2x" /> {userDetails.github_location}</span>)
                      : null}
                  </span>
                </div>
              </span>
            </Col>
          </Col>
          <Col xs={12} md={6}>
            <FormGroup>
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
        </Row>
        <Row>
          <ListRanking
            height={"500px"}
            data={listSpinsUser}
            title={null}
            twoHeaders={["Role", "Description"]}
            keys={["user_login", "description"]}
            onClickName={null}
            removeBadge={true}
            onClickName={this.onClickNameRepository}
            idObject="id"
          />
        </Row>
      </Grid>
    );
  }
}
const mapStateToProps = state => {
  return {
    spins: state.spins
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getInformationUserProfile: id => dispatch(getInformationUserProfile(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthorProfile);
