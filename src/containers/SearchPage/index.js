import React from "react";
import {
  Grid,
  Row,
  Col,
  Filter,
  Sort,
  Button,
  MenuItem,
  DropdownKebab,
  FormControl,
  Icon,
  Toolbar,
  Paginator,
  Spinner,
  Alert
} from "patternfly-react";

import Api from "../../service/Api";
import CardItem from "../../components/CardItem/";
import TagsFilter from "../../components/TagsFilter/";
import { imgIndex } from "../../ImageImport";
import "./style.css";
import { dataSearch, popularTag } from "./mock/";
import { filters } from "./mock/filter";
import sortFields from "./Sort/";
import { connect } from "react-redux";
import { getPopularTag } from "../../thunk/tags";
import { getSpinSearch } from "../../thunk/spin";

const perPageOptions = [5, 10, 15];

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.selectFilterType = this.selectFilterType.bind(this);
    this.updateCurrentSortType = this.updateCurrentSortType.bind(this);
    this.onSelectPerPage = this.onSelectPerPage.bind(this);
    this.addFilterPopularTag = this.addFilterPopularTag.bind(this);
    this.removeTagFilter = this.removeTagFilter.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.generateParamsFilter = this.generateParamsFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.toggleCurrentSortDirection = this.toggleCurrentSortDirection.bind(
      this
    );

    this.state = {
      currentValue: "",
      currentFilterType: filters[0],
      currentSortType: sortFields[0],
      isSortNumeric: sortFields[0].isNumeric,
      isSortAscending: true,
      currentViewType: "list",
      elementByPage: perPageOptions[0],
      filterPopularTag: [],
      filters: {},
      baseParams: { limit: perPageOptions[0] },
      params: {},
      showAlertAlready: false
    };
  }
  componentDidMount() {
    let { baseParams } = this.state;
    this.props.getPopularTag();
    this.props.getSpinSearch(baseParams);
    let filterPopularTag = [...this.state.filterPopularTag];
    let tag = this.props.location.state ? this.props.location.state.tag : null;
    if (tag) {
      filterPopularTag.push(tag);
      this.setState({ filterPopularTag });
    }
  }
  onSearch(e) {
    const {
      currentFilterType,
      currentValue,
      filterCategory,
      filters
    } = this.state;

    let baseParams = Object.assign({}, this.state.baseParams);

    if (e.key === "Enter") {
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

      baseParams["page"] = 1;

      this.setState({
        filters,
        currentValue: "",
        baseParams,
        params,
        showAlertAlready: false
      });
    }
  }
  generateParamsFilter(filters) {
    let { baseParams } = this.state;
    let params = Object.assign({}, baseParams);
    params["page"] = 1;
    let keys = Object.keys(filters);

    keys.forEach(key => {
      if (filters[key].listFilters && filters[key].listFilters.length > 0)
        params[key] = filters[key].listFilters[0];
    });
    return params;
  }
  selectFilterType(filterType) {
    const { currentFilterType } = this.state;
    if (currentFilterType !== filterType) {
      this.setState({ currentValue: "", currentFilterType: filterType });

      if (filterType.filterType === "complex-select") {
        this.setState({ filterCategory: undefined, categoryValue: "" });
      }
    }
  }
  updateCurrentSortType(sortType) {
    const { currentSortType, params } = this.state;

    const baseParams = Object.assign({}, this.state.baseParams);
    baseParams["sort"] = sortType.id;
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
  }
  onChange(e, type) {
    let state = Object.assign({}, this.state);
    state[type] = e.target.value;
    this.setState(state);
  }
  renderInput() {
    const { currentFilterType, currentValue, filterCategory } = this.state;
    return (
      <FormControl
        type={currentFilterType.filterType}
        onChange={e => {
          this.onChange(e, "currentValue");
        }}
        value={currentValue}
        placeholder={currentFilterType.placeholder}
        onKeyPress={this.onSearch}
      />
    );
  }
  onChangePage(page) {
    let baseParams = Object.assign(
      {},
      this.state.baseParams,
      this.state.params
    );
    baseParams["page"] = page;

    this.props.getSpinSearch(baseParams);

    this.setState({ baseParams });
  }
  onSelectPerPage(numItems) {
    let { baseParams } = this.state;

    baseParams["limit"] = numItems;
    this.props.getSpinSearch(baseParams);

    this.setState({ elementByPage: numItems, baseParams });
  }
  addFilterPopularTag(name) {
    const {
      currentFilterType,
      currentValue,
      filterCategory,
      filters
    } = this.state;
    const nameTag = "tag";
    let baseParams = Object.assign({}, this.state.baseParams);

    let filter = filters[nameTag] ? filters[nameTag] : {};
    let list = filter.listFilters ? filter.listFilters : [];
    let value = name;
    list.push(value);
    filter.listFilters = list;
    filters[nameTag] = filter;

    let params = this.generateParamsFilter(filters);
    this.props.getSpinSearch(params);

    baseParams["page"] = 1;

    this.setState({ filters, currentValue: "", baseParams, params });
  }

  toggleCurrentSortDirection() {
    const { isSortAscending, params } = this.state;
    const baseParams = Object.assign({}, this.state.baseParams);
    baseParams["order"] = !isSortAscending ? "asc" : "desc";
    const resultParams = Object.assign({}, params, baseParams);
    this.props.getSpinSearch(resultParams);
    this.setState({
      isSortAscending: !isSortAscending,
      baseParams,
      showAlertAlready: false
    });
  }

  removeTagFilter(name, typeFilter) {
    const { baseParams, filters, params } = this.state;

    const newFilters = Object.assign({}, filters);
    let listFilters = newFilters[typeFilter].listFilters;

    let index = listFilters.indexOf(name);
    listFilters.splice(index, 1);

    newFilters[typeFilter].listFilters = listFilters;
    let keys = Object.keys(filters);

    let newBaseParams = Object.assign({}, params);
    newBaseParams["page"] = 1;
    delete newBaseParams[typeFilter];

    this.props.getSpinSearch(newBaseParams);

    this.setState({
      filters: newFilters,
      baseParams: newBaseParams,
      params: newBaseParams,
      showAlertAlready: false
    });
  }
  clearFilter() {
    const { baseParams } = this.state;
    this.props.getSpinSearch(baseParams);
    this.setState({ params: {}, filters: {}, showAlertAlready: false });
  }
  render() {
    let {
      currentFilterType,
      currentSortType,
      currentViewType,
      isSortNumeric,
      isSortAscending,
      currentValue,
      elementByPage,
      filterPopularTag,
      showAlertAlready
    } = this.state;
    let { tags, search } = this.props;
    let pagination = {
      page: search.meta.current_page ? search.meta.current_page : 0,
      perPage: elementByPage,
      perPageOptions: perPageOptions
    };
    let results = search && search.spinSearch ? search.spinSearch : [];
    let keys = Object.keys(this.state.filters);
    const messageError = "There has been a problem";
    const showAlert = !showAlertAlready ? search.error !== null : false;
    return (
      <div style={{ marginTop: "1%" }}>
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
        {/*
          <div className="form-group" style={{marginLeft:'2%'}} >
            <Button onClick={null}>Action 1</Button>
            <Button onClick={null}>Action 2</Button>
            <DropdownKebab id="toolbarActionKebab">
              <MenuItem onClick={null}>Action</MenuItem>
              <MenuItem onClick={null}>Another Action</MenuItem>
              <MenuItem onClick={null}>Something Else Here</MenuItem>
              <MenuItem role="separator" className="divider" />
              <MenuItem onClick={null}>Separate</MenuItem>
            </DropdownKebab>
          </div>
          */}
        <Toolbar.RightContent>
          <Toolbar.Find
            placeholder="Find By Keyword..."
            currentIndex={1}
            totalCount={3}
            onChange={null}
            onEnter={null}
            onFindNext={null}
            onFindPrevious={null}
          />
          <Toolbar.ViewSelector>
            <Button
              title="List View"
              bsStyle="link"
              className={{ active: currentViewType === "list" }}
              onClick={null}
            >
              <Icon type="fa" name="th-list" />
            </Button>
            <Button
              title="Card View"
              bsStyle="link"
              className={{ active: currentViewType === "card" }}
              onClick={null}
            >
              <Icon type="fa" name="th" />
            </Button>
            <Button
              title="Table View"
              bsStyle="link"
              className={{ active: currentViewType === "table" }}
              onClick={() => {
                this.setViewType("table");
              }}
            >
              <Icon type="fa" name="table" />
            </Button>
          </Toolbar.ViewSelector>
        </Toolbar.RightContent>
        <Toolbar.Results>
          <Row style={{ paddingLeft: 20, marginLeft: "3%" }}>
            <h5>{results.length} Results</h5>
            {keys.map((data, index) => {
              return this.state.filters[data].listFilters
                ? this.state.filters[data].listFilters.map((element, index) => {
                    return (
                      <TagsFilter
                        name={`${data}: ${element}`}
                        onClick={() => this.removeTagFilter(element, data)}
                      />
                    );
                  })
                : null;
            })}
            {keys.length > 0 ? (
              <p style={{marginLeft: '2%'}}>
                <a onClick={this.clearFilter}>Clear All Filters</a>
              </p>
            ) : null}
          </Row>
        </Toolbar.Results>
        <Row>
          {showAlert ? (
            <Alert
              style={{ width: "50%", marginLeft: "2%" }}
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
                      <CardItem key={`card_${index}`} cardInformation={data} />
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
              overflowX: "hidden",
              padding: 0,
              textAlign: "center"
            }}
          >
            <div className="card-pf">
              <div className="card-pf-heading">
                <h2 className="card-pf-title">Popular Tags</h2>
              </div>
              <div>
                <div
                  className="card-pf-body"
                  style={{ overflowY: 'scroll', height: '300px' }}
                >
                  <Row style={{ padding: 0, width: "100%", marginTop: "10px" }}>
                    {tags && tags.tags
                      ? tags.tags.map((data, index) => {
                          let infoTag = data;
                          return (
                            <Row
                              key={`popular_tag_row_${index}`}
                              style={{ marginTop: "10px" }}
                            >
                              <Col
                                xs={6}
                                md={3}
                                mdOffset={2}
                                onClick={() =>
                                  this.addFilterPopularTag(infoTag.name)
                                }
                              >
                                <div
                                  style={{
                                    backgroundColor: "#b7b7b7",
                                    borderRadius: "10px",
                                    margin: "0 auto",
                                    width: "125px",
                                    color: "#FFFFFF"
                                  }}
                                >
                                  {infoTag.name}
                                </div>
                              </Col>
                              <Col xs={6} md={3} mdOffset={2}>
                                <div
                                  style={{
                                    backgroundColor: "#848992",
                                    color: "#FFFFFF",
                                    margin: "0 auto",
                                    borderRadius: "10px"
                                  }}
                                >
                                  {infoTag.count_spins}
                                </div>
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
            <div style={{ padding: "0 20px" }}>
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
                  firstPage: "First Page",
                  previousPage: "Previous Page",
                  currentPage: "Current Page"
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
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
