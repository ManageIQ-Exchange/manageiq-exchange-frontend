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
  Paginator,
  Table
} from "patternfly-react";
import { InputGroupAddon } from "react-bootstrap";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

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
    this.onSelectPerPage = this.onSelectPerPage.bind(this);
    this.state = {
      listUsers: this.props.users.users,
      listUsersComplete: this.props.users.users,
      elementByPage: 5
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
      let mtch = JSON.stringify(user.login).match(new RegExp(keywords));
      return mtch ? true : false;
    });

    this.setState({listUsers})
  }
  redirectToAuthor(idAuthor) {
    let route = { pathname:'/authors/'+ idAuthor };
    browserHistory.push(route);
  }
  onChangePage(page) {
  }
  onSelectPerPage(numItems) {
    this.setState({ elementByPage: numItems });
  }
  render() {
    const placeholderSearch = 'Search authors';
    const titleHeader = "Exchange Contributors";
    let { users } = this.props;
    let { listUsers, elementByPage } = this.state;
    let {meta} = users;
    let pagination = {
      page: meta.current_page,
      perPage: elementByPage,
      perPageOptions: [5, 10, 15]
    };
    return (
      <div id="container">
        <Grid width="100%" style={{ marginTop: "20px" }}>
          <Row>
            <Col md={12}>
              <h1 className="title-header">{titleHeader}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6} />
            <Col md={6}>
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
          </Row>

          <Row>
            <Col md={12}>
              <ListRanking
                height={"500px"}
                data={listUsers ? listUsers : []}
                title={null}
                twoHeaders={["Author", ""]}
                keys={["login", "url_profile"]}
                idObject="github_id"
                onClickName={this.redirectToAuthor}
              >
                <BtnViewGithub />
              </ListRanking>
            </Col>
          </Row>
          <Row style={{ marginTop: '4%' }}>
            <Paginator
              viewType="list"
              pagination={pagination}
              onPageSet={this.onChangePage}
              onPerPageSelect={this.onSelectPerPage}
              itemCount={listUsers.length}
              messages={{
                firstPage: "First Page",
                previousPage: "Previous Page",
                currentPage: "Current Page"
              }}
            />
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
