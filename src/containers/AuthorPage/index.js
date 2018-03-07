import React from 'react';
import {
  Grid,
  Row,
  Col,
  FormControl,
  FormGroup,
  InputGroup,
  Icon,
  Paginator
} from 'patternfly-react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import ListRanking from '../../components/ListRanking';
import BtnViewGithub from '../../components/BtnViewGithub';
import { getUsers } from '../../thunk/user';
import { filterByAttribute } from '../../lib/';

import './style.css';

const defaultProps = {
  users: {
    users: [],
    meta: {
      page: 1,
      perPage: 10,
      perPageOptions: [5, 10, 15]
    }
  },
  t: {}
};

const propTypes = {
  getUsers: PropTypes.func,
  users: PropTypes.object,
  t: PropTypes.object
};

export class AuthorsPage extends React.Component {
  constructor(props) {
    super(props);
    this.searchOnList = this.searchOnList.bind(this);
    this.onSelectPerPage = this.onSelectPerPage.bind(this);
    this.state = {
      listUsers: props.users.users,
      listUsersComplete: props.users.users,
      meta: props.users.meta,
      elementByPage: 25
    };
  }

  componentDidMount() {
    if (this.props.getUsers) {
      this.props.getUsers();
    }
  }
  componentWillReceiveProps(nextProps) {
    let { users } = nextProps.users;
    if (this.props.users.users !== users)
      this.setState({ listUsers: users, listUsersComplete: users });
  }
  searchOnList(keywords) {
    let listUsers = [...this.state.listUsersComplete];
    const attributeSearch = 'login';
    listUsers = filterByAttribute(keywords, listUsers, attributeSearch);

    this.setState({ listUsers });
  }
  redirectToAuthor(idAuthor) {
    let route = { pathname: '/authors/' + idAuthor };
    browserHistory.push(route);
  }
  onChangePage(page) {}
  onSelectPerPage(numItems) {
    this.setState({ elementByPage: numItems });
  }
  render() {
    let { users, t } = this.props;

    const placeholderSearch = t('browseAuthors.placeholderSearch');
    const titleHeader = t('browseAuthors.title');
    const titlesListHeader = [t('browseAuthors.titleListHeader'), ''];

    let { listUsers, elementByPage } = this.state;
    let { meta } = users;
    meta = meta || this.state.meta;
    let pagination = {
      page: meta.current_page,
      perPage: elementByPage,
      perPageOptions: [5, 10, 15]
    };
    return (
      <div id="container">
        <Grid width="100%" style={{ marginTop: '20px' }}>
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
                height={'500px'}
                data={listUsers || []}
                title={null}
                twoHeaders={titlesListHeader}
                keys={['login', 'url_profile']}
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
                firstPage: 'First Page',
                previousPage: 'Previous Page',
                currentPage: 'Current Page'
              }}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

AuthorsPage.propTypes = propTypes;
AuthorsPage.defaultProps = defaultProps;

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
export default compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorsPage);
