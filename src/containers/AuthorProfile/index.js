import React from 'react';
import {
  Grid,
  Row,
  Col,
  FormControl,
  FormGroup,
  InputGroup,
  Icon
} from 'patternfly-react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import ListRanking from '../../components/ListRanking/';
import { getInformationUserProfile } from '../../thunk/user';
import { filterByAttribute } from '../../lib/';

const defaultProps = {
  spins: {
    spinsUser: [],
    userDetails: {}
  }
};

const propTypes = {
  getInformationUserProfile: PropTypes.func,
  spins: PropTypes.object,
  params: PropTypes.object
};

export class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);

    this.searchOnList = this.searchOnList.bind(this);

    this.state = {
      listSpinsUser: props.spins.spinsUser,
      listSpinsUserComplete: props.spins.spinsUser,
      userDetails: props.spins.userDetails
    };
  }
  componentDidMount() {
    const idAuthor = this.props.params ? this.props.params.idAuthor : null;
    if (idAuthor) this.props.getInformationUserProfile(idAuthor).then(() => {});
  }

  componentWillReceiveProps(nextProps) {
    let data = nextProps.spins.spinsUser;
    if (this.props.spins.spinsUser !== data)
      this.setState({ listSpinsUser: data, listSpinsUserComplete: data });
  }

  onClickNameRepository(id) {
    let route = { pathname: '/spin/' + id };
    browserHistory.push(route);
  }

  searchOnList(keywords) {
    let listSpinsUser = [...this.state.listSpinsUserComplete];
    const attributeSearch = 'user_login';

    listSpinsUser = filterByAttribute(keywords, listSpinsUser, attributeSearch);
    this.setState({ listSpinsUser });
  }

  render() {
    const { spins } = this.props;
    const { listSpinsUser } = this.state;
    const { userDetails } = spins || this.state.userDetails;
    const placeholderSearch = 'Search';
    const nameUser = userDetails && userDetails.login ? userDetails.login : '';

    return (
      <Grid width="100%" style={{ marginTop: '20px' }}>
        <Row>
          <h1 className="first-header">{nameUser}</h1>
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
              <span style={{ marginLeft: '1%' }}>
                <div style={{ width: '75%' }}>
                  <span style={{ width: '75%' }}>
                    {
                      userDetails.github_location ?
                      <span>
                        <Icon name="map-marker fa-2x" />{' '}
                        {userDetails.github_location}
                      </span>
                      :
                     null
                   }
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
            height={'500px'}
            data={listSpinsUser}
            title={null}
            twoHeaders={['Role', 'Description']}
            keys={['full_name', 'description']}
            removeBadge
            onClickName={this.onClickNameRepository}
            idObject="id"
          />
        </Row>
      </Grid>
    );
  }
}

AuthorProfile.propTypes = propTypes;
AuthorProfile.defaultProps = defaultProps;

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
