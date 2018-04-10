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

import ListRanking from '../../components/ListRanking/';
import { getInformationUserProfile } from '../../thunk/user';
import { filterByAttribute } from '../../lib/';

const defaultProps = {
  spins: {
    spinsUser: [],
    userDetails: {}
  },
  t: key => key
};

const propTypes = {
  getInformationUserProfile: PropTypes.func,
  spins: PropTypes.object,
  params: PropTypes.object,
  t: PropTypes.func
};

const perPageOptions = [1, 10, 15];

export class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);

    this.searchOnList = this.searchOnList.bind(this);

    this.state = {
      listSpinsUser: props.spins.spinsUser,
      listSpinsUserComplete: props.spins.spinsUser,
      userDetails: props.spins.userDetails,
      elementByPage: perPageOptions[0],
      baseParams: { limit: perPageOptions[0] }
    };
  }
  componentDidMount() {
    this.idAuthor = this.props.params ? this.props.params.idAuthor : null;
    if (this.idAuthor)
      this.props.getInformationUserProfile(
        this.idAuthor,
        this.state.baseParams
      );
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
  onChangePage = page => {
    let baseParams = Object.assign(
      {},
      this.state.baseParams,
      this.state.params
    );
    baseParams['page'] = page;

    this.props.getInformationUserProfile(this.idAuthor, baseParams);

    this.setState({ baseParams });
  };
  onSelectPerPage = numItems => {
    let { baseParams } = this.state;

    baseParams['limit'] = numItems;
    this.props.getInformationUserProfile(this.idAuthor, baseParams);

    this.setState({ elementByPage: numItems, baseParams });
  };

  render() {
    const { spins, t } = this.props;
    const { listSpinsUser, elementByPage } = this.state;
    const { userDetails } = spins || this.state.userDetails;
    const { meta } = spins;
    const placeholderSearch = t('profileAuthor.placeholderSearch');
    const titleHeaderList = [
      t('profileAuthor.titleListHeader1'),
      t('profileAuthor.titleListHeader2')
    ];
    const nameUser = userDetails && userDetails.login ? userDetails.login : '';
    const pagination = {
      page: meta.current_page,
      perPage: elementByPage,
      perPageOptions: perPageOptions
    };
    const numberItems = meta && meta.total_count ? meta.total_count : 0;
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
                alt="profile user"
              />
            </Col>
            <Col xs={12} md={3} style={{ padding: 0 }}>
              <span style={{ marginLeft: '1%' }}>
                <div style={{ width: '75%' }}>
                  <span style={{ width: '75%' }}>
                    {userDetails.github_location ? (
                      <span>
                        <Icon name="map-marker fa-2x" />{' '}
                        {userDetails.github_location}
                      </span>
                    ) : null}
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
            twoHeaders={titleHeaderList}
            keys={['full_name', 'description']}
            removeBadge
            onClickName={this.onClickNameRepository}
            idObject="id"
          />
        </Row>
        <Row style={{ marginTop: '4%' }}>
          <Paginator
            viewType="list"
            pagination={pagination}
            onPageSet={this.onChangePage}
            onPerPageSelect={this.onSelectPerPage}
            itemCount={numberItems}
            messages={{
              firstPage: 'First Page',
              previousPage: 'Previous Page',
              currentPage: 'Current Page'
            }}
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
    getInformationUserProfile: (id, params) =>
      dispatch(getInformationUserProfile(id, params))
  };
};
export default compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorProfile);
