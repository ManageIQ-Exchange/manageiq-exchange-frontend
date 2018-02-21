import React from 'react';
import {
  Row,
  Col,
  Filter,
  Sort,
  FormControl,
  Toolbar,
  Paginator,
  Spinner,
  Alert
} from 'patternfly-react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import CardItem from '../../components/CardItem/';
import TagsFilter from '../../components/TagsFilter/';

import { filters } from './Filter/';
import sortFields from './Sort/';
import { connect } from 'react-redux';
import { getPopularTag } from '../../thunk/tags';
import { getSpinSearch } from '../../thunk/spin';

import './style.css';

const perPageOptions = [5, 10, 15];

const defaultProps = {
  tags: {
    tags: []
  },
  search: {
    spinSearch: [],
    meta: {
      page: 1,
      perPage: 10,
      perPageOptions: [5, 10, 15]
    }
  }
};

const propTypes = {
  tags: PropTypes.object,
  search: PropTypes.object,
  getSpinSearch: PropTypes.func,
  getPopularTag: PropTypes.func
};


export class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentValue: '',
      currentFilterType: filters[0],
      currentSortType: sortFields[0],
      isSortNumeric: sortFields[0].isNumeric,
      isSortAscending: true,
      currentViewType: 'list',
      elementByPage: perPageOptions[0],
      filterPopularTag: [],
      filters: {},
      baseParams: { limit: perPageOptions[0], sort: sortFields[0].id },
      params: {},
      showAlertAlready: false,
      tags: props.tags,
      search: props.search
    };
  }
  componentDidMount() {
    let baseParams = this.state.baseParams ? this.state.baseParams : null;
    if (this.props.getPopularTag) this.props.getPopularTag();
    if (this.props.getSpinSearch) this.props.getSpinSearch(baseParams);
    let filterPopularTag = [...this.state.filterPopularTag];
    let tag =
      this.props.location && this.props.location.state
        ? this.props.location.state.tag
        : null;
    if (tag) {
      filterPopularTag.push(tag);
      this.setState({ filterPopularTag });
    }
  }
  onSearch = e => {
    const { currentFilterType, filters } = this.state;

    let baseParams = Object.assign({}, this.state.baseParams);

    if (e.key === 'Enter') {
      let filter = filters[currentFilterType.id]
        ? filters[currentFilterType.id]
        : {};
      let list = filter.listFilters ? filter.listFilters : [];
      let value = e.target.value;
      list.push(value);
      filter.listFilters = list;
      filters[currentFilterType.id] = filter;

      let params = this.generateParamsFilter(filters);
      this.props.getSpinSearch(params);

      baseParams['page'] = 1;

      this.setState({
        filters,
        currentValue: '',
        baseParams,
        params,
        showAlertAlready: false
      });
    }
  };
  generateParamsFilter = filters => {
    let { baseParams } = this.state;
    let params = Object.assign({}, baseParams);
    params['page'] = 1;
    let keys = Object.keys(filters);

    keys.forEach(key => {
      if (filters[key].listFilters && filters[key].listFilters.length > 0)
        params[key] = filters[key].listFilters[0];
    });
    return params;
  };
  selectFilterType = filterType => {
    const { currentFilterType } = this.state;
    if (currentFilterType !== filterType) {
      this.setState({ currentValue: '', currentFilterType: filterType });
    }
  };
  updateCurrentSortType = sortType => {
    const { currentSortType, params } = this.state;

    const baseParams = Object.assign({}, this.state.baseParams);
    baseParams['sort'] = sortType.id;
    const resultParams = Object.assign({}, params, baseParams);
    this.props.getSpinSearch(resultParams);

    if (currentSortType !== sortType) {
      this.setState({
        currentSortType: sortType,
        isSortNumeric: sortType.isNumeric,
        isSortAscending: true,
        baseParams,
        showAlertAlready: false
      });
    }
  };
  onChange = (e, type) => {
    let state = Object.assign({}, this.state);
    state[type] = e.target.value;
    this.setState(state);
  };
  renderInput() {
    const { currentFilterType, currentValue } = this.state;
    return (
      <FormControl
        type={currentFilterType.filterType}
        onChange={e => {
          this.onChange(e, 'currentValue');
        }}
        value={currentValue}
        placeholder={currentFilterType.placeholder}
        onKeyPress={this.onSearch}
      />
    );
  }
  onChangePage = page => {
    let baseParams = Object.assign(
      {},
      this.state.baseParams,
      this.state.params
    );
    baseParams['page'] = page;

    this.props.getSpinSearch(baseParams);

    this.setState({ baseParams });
  };
  onSelectPerPage = numItems => {
    let { baseParams } = this.state;

    baseParams['limit'] = numItems;
    this.props.getSpinSearch(baseParams);

    this.setState({ elementByPage: numItems, baseParams });
  };
  addFilterPopularTag = name => {
    const { filters } = this.state;
    const nameTag = 'tag';
    let baseParams = Object.assign({}, this.state.baseParams);

    let filter = filters[nameTag] ? filters[nameTag] : {};
    let list = filter.listFilters ? filter.listFilters : [];
    let value = name;
    list.push(value);
    filter.listFilters = list;
    filters[nameTag] = filter;

    let params = this.generateParamsFilter(filters);
    this.props.getSpinSearch(params);

    baseParams['page'] = 1;

    this.setState({ filters, currentValue: '', baseParams, params });
  };

  toggleCurrentSortDirection = () => {
    const { isSortAscending, params } = this.state;
    const baseParams = Object.assign({}, this.state.baseParams);
    baseParams['order'] = !isSortAscending ? 'asc' : 'desc';
    const resultParams = Object.assign({}, params, baseParams);
    this.props.getSpinSearch(resultParams);
    this.setState({
      isSortAscending: !isSortAscending,
      baseParams,
      showAlertAlready: false
    });
  };

  removeTagFilter = (name, typeFilter) => {
    const { filters, params } = this.state;

    const newFilters = Object.assign({}, filters);
    let listFilters = newFilters[typeFilter].listFilters;

    let index = listFilters.indexOf(name);
    listFilters.splice(index, 1);

    newFilters[typeFilter].listFilters = listFilters;
    let newBaseParams = Object.assign({}, params);
    newBaseParams['page'] = 1;
    delete newBaseParams[typeFilter];

    this.props.getSpinSearch(newBaseParams);

    this.setState({
      filters: newFilters,
      baseParams: newBaseParams,
      params: newBaseParams,
      showAlertAlready: false
    });
  };
  clearFilter = () => {
    const { baseParams } = this.state;
    this.props.getSpinSearch(baseParams);
    this.setState({ params: {}, filters: {}, showAlertAlready: false });
  };
  redirectSpin(id) {
    let route = { pathname: `/spin/${id}` };
    browserHistory.push(route);
  }
  render() {
    const {
      currentFilterType,
      currentSortType,
      isSortNumeric,
      isSortAscending,
      elementByPage,
      showAlertAlready
    } = this.state;

    let { tags, search } = this.props;
    tags = tags || this.state.tags;
    let pagination = search
      ? {
          page: search.meta.current_page ? search.meta.current_page : 0,
          perPage: elementByPage,
          perPageOptions: perPageOptions
        }
      : this.state.meta;
    let results = search && search.spinSearch ? search.spinSearch : [];
    let keys = Object.keys(this.state.filters);
    const messageError = 'There has been a problem';
    const showAlert = !showAlertAlready ? search.error !== null : false;
    return (
      <div style={{ width: '100%', height: '100%', marginTop: '1%' }}>
        <Filter id="filter-search">
          <Filter.TypeSelector
            filterTypes={filters}
            currentFilterType={currentFilterType}
            onFilterTypeSelected={this.selectFilterType}
          />
          {this.renderInput()}
        </Filter>
        <Sort>
          <Sort.TypeSelector
            sortTypes={sortFields}
            currentSortType={currentSortType}
            onSortTypeSelected={this.updateCurrentSortType}
          />
          <Sort.DirectionSelector
            isNumeric={isSortNumeric}
            isAscending={isSortAscending}
            onClick={() => this.toggleCurrentSortDirection()}
          />
        </Sort>
        <Toolbar.RightContent>
          <Toolbar.ViewSelector />
        </Toolbar.RightContent>
        <div style={{ height: '100%', backgroundColor: '#f7f7f7' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0px 10px 10px -15px #111'
            }}
          >
            <Toolbar.Results>
              <Row style={{ paddingLeft: 20, marginLeft: '3%' }}>
                <h5>{results.length} Results</h5>
                <h5>Active filters : </h5>
                {keys.map((data, index) => {
                  return this.state.filters[data].listFilters
                    ? this.state.filters[data].listFilters.map(
                        (element, index) => {
                          return (
                            <TagsFilter
                              name={`${data}: ${element}`}
                              onClick={() =>
                                this.removeTagFilter(element, data)
                              }
                            />
                          );
                        }
                      )
                    : null;
                })}
                {keys.length > 0 ? (
                  <p style={{ marginLeft: '2%' }}>
                    <a onClick={this.clearFilter}>Clear All Filters</a>
                  </p>
                ) : null}
              </Row>
            </Toolbar.Results>
          </div>
          <div>
            <Row>
              {showAlert ? (
                <Alert
                  style={{ width: '50%', marginLeft: '2%' }}
                  type="warning"
                  onDismiss={() => this.setState({ showAlertAlready: true })}
                >
                  {messageError}
                </Alert>
              ) : null}
              <Col xs={12} md={9}>
                <div className="content-card">
                  {search.isLoading ? (
                    <Spinner loading={search.isLoading} />
                  ) : (
                    results.map((data, index) => {
                      return (
                        <Col md={3} key={`col_card_${index}`}>
                          <CardItem
                            key={`card_${index}`}
                            cardInformation={data}
                            onClick={() => {
                              this.redirectSpin(data.id);
                            }}
                          />
                        </Col>
                      );
                    })
                  )}
                </div>
              </Col>
              <Col
                xs={12}
                md={2}
                style={{
                  overflowX: 'hidden',
                  padding: 0,
                  textAlign: 'center',
                  marginTop: '2%'
                }}
              >
                <div className="card-pf">
                  <div className="card-pf-heading">
                    <h2 className="card-pf-title">Popular Tags</h2>
                  </div>
                  <div>
                    <div
                      className="card-pf-body"
                      style={{ overflowY: 'auto', height: '300px' }}
                    >
                      <Row
                        style={{ padding: 0, width: '100%', marginTop: '10px' }}
                      >
                        {tags && tags.tags
                          ? tags.tags.map((data, index) => {
                              let infoTag = data;
                              return (
                                <Row
                                  key={`popular_tag_row_${index}`}
                                  style={{ marginTop: '10px' }}
                                >
                                  <Col
                                    xs={4}
                                    md={6}
                                    mdOffset={2}
                                    xsOffset={2}
                                    style={{ textAlign: 'left' }}
                                    onClick={() =>
                                      this.addFilterPopularTag(infoTag.name)
                                    }
                                  >
                                    <a style={{ cursor: 'pointer' }}>
                                      {infoTag.name}
                                    </a>
                                  </Col>
                                  <Col xs={6} md={3}>
                                    <div>{infoTag.count_spins}</div>
                                  </Col>
                                </Row>
                              );
                            })
                          : null}
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={9}>
                <div style={{ padding: '0 20px' }}>
                  <Paginator
                    viewType="list"
                    pagination={pagination}
                    onPageSet={this.onChangePage}
                    onPerPageSelect={this.onSelectPerPage}
                    itemCount={
                      search.meta && search.meta.total_count
                        ? search.meta.total_count
                        : 0
                    }
                    messages={{
                      firstPage: 'First Page',
                      previousPage: 'Previous Page',
                      currentPage: 'Current Page'
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
SearchPage.propTypes = propTypes;
SearchPage.defaultProps = defaultProps;


const mapStateToProps = state => {
  return {
    tags: state.tags,
    search: state.search
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPopularTag: () => dispatch(getPopularTag()),
    getSpinSearch: params => dispatch(getSpinSearch(params))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
