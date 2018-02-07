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
  Icon
} from "patternfly-react";
import { InputGroupAddon } from "react-bootstrap";
import { connect } from "react-redux";

import { imgIndex } from "../../ImageImport";
import ListRanking from "../../components/ListRanking";
import BtnViewGithub from "../../components/BtnViewGithub";
import "./style.css";
import { data } from "./mock/";
import { getUsers } from "../../thunk/user";

class AuthorsPage extends React.Component {
  constructor(props) {
    super(props);
    this.searchOnList = this.searchOnList.bind(this);
    this.state = {
      listUsers: this.props.users.users,
      listUsersComplete: this.props.users.users
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }
  componentWillReceiveProps(nextProps: Props) {
    let { users } = nextProps.users;
    if (this.props.users.users !== users) this.setState({ listUsers: users, listUsersComplete: users });
  }
  searchOnList(keywords) {
    let listUsers = [...this.state.listUsersComplete];
    listUsers = listUsers.filter(user => {
      console.log("keyword", keywords)
      let mtch = JSON.stringify(user.login).match(new RegExp(keywords, "gi"));
      return mtch ? true : false;
      console.log("mtch",mtch);
    });

    this.setState({listUsers})
  }
  render() {
    const placeholderSearch = "Search authors";
    const titleHeader = "Galaxy Contributors";
    let { users } = this.props;
    let { listUsers } = this.state;
    return (
      <div id="container">
        <div>
          <img
            id="imgHome"
            style={{ height: "50px" }}
            src={imgIndex}
            alt="image init"
          />
          <span className="name-tab">BROWSE AUTHORS</span>
        </div>

        <Grid width="100%" style={{ marginTop: "20px" }}>
          <Row>
            <Col md={12}>
              <h1 className="title-header">{titleHeader}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6} />
            <Col md={6}>
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
            <Col md={12}>
              <ListRanking
                height={"500px"}
                data={listUsers ? listUsers : []}
                title={null}
                twoHeaders={["Author", ""]}
                keys={["login", "url_profile"]}
              >
                <BtnViewGithub />
              </ListRanking>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
