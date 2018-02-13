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
  Spinner
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

const perPageOptions = [1, 2, 3];

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
      activeFilters: [],
      elementByPage: perPageOptions[0],
      filterPopularTag: [],
      filters: {},
      baseParams: { limit: perPageOptions[0] },
      params: {}
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

      this.setState({ filters, currentValue: "", baseParams, params });
    }
  }
  generateParamsFilter(filters) {
    let { baseParams } = this.state;
    let params = Object.assign({}, baseParams);
    params["page"] = 1;
    let keys = Object.keys(filters);
    keys.forEach(key => {
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
    const { currentSortType } = this.state;

    if (currentSortType !== sortType) {
      this.setState({
        currentSortType: sortType,
        isSortNumeric: sortType.isNumeric,
        isSortAscending: true
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
    let filterPopularTag = [...this.state.filterPopularTag];
    filterPopularTag.push(name);

    this.setState({ filterPopularTag });
  }

  toggleCurrentSortDirection() {
    const { isSortAscending } = this.state;
    this.setState({
      isSortAscending: !isSortAscending
    });
  }

  removeTagFilter(name, typeFilter) {
    if (typeFilter) {
      const { baseParams, filters } = this.state;
      let listFilters = [...filters[typeFilter].listFilters];

      let index = listFilters.indexOf(name);
      listFilters.splice(index, 1);

      let keys = Object.keys(filters);
      let params = Object.assign({}, baseParams);
      keys.forEach(key => {
        let value = listFilters[0];
        if (value) params[key] = value;
      });
      let newBaseParams = Object.assign({}, baseParams);
      newBaseParams["page"] = 1;
      this.props.getSpinSearch(params);

      let newFilters = Object.assign({}, filters);
      newFilters[typeFilter] = listFilters;
      this.setState({ filters: newFilters, baseParams: newBaseParams });
    } else {
      let filterPopularTag = [...this.state.filterPopularTag];
      let index = filterPopularTag.indexOf(name);
      filterPopularTag.splice(index, 1);
      this.setState({ filterPopularTag });
    }
  }
  render() {
    let {
      currentFilterType,
      currentSortType,
      currentViewType,
      isSortNumeric,
      isSortAscending,
      activeFilters,
      currentValue,
      elementByPage,
      filterPopularTag
    } = this.state;
    let { tags, search } = this.props;
    let pagination = {
      page: search.meta.current_page ? search.meta.current_page : 0,
      perPage: elementByPage,
      perPageOptions: perPageOptions
    };
    let results = search && search.spinSearch ? search.spinSearch : [];
    let keys = Object.keys(this.state.filters);
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

        {!activeFilters ||
          (activeFilters.length === 0 && (
            <Toolbar.Results>
              <Row style={{ paddingLeft: 20 }}>
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
                {filterPopularTag.map(tag => {
                  return (
                    <TagsFilter name={tag} onClick={this.removeTagFilter} />
                  );
                })}
              </Row>
              <h5>{results.length} Results</h5>
            </Toolbar.Results>
          ))}
        <Row>
          <Col xs={12} md={9}>
            <div className="content-card">
              {search.isLoading ? (
                <Spinner
                  style={{ backgroundColor: "#cccccc" }}
                  loading={search.isLoading}
                />
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
              backgroundColor: "#E1E1E1",
              overflowX: "hidden",
              padding: 0,
              textAlign: "center"
            }}
          >
            <div style={{ borderBottom: " 2px solid white", width: "100%" }}>
              <h2 style={{ color: "#848992" }}>Popular tags</h2>
            </div>
            <div>
              <div style={{ overflowY: "scroll", height: "300px" }}>
                <Row style={{ padding: 0, width: "100%", marginTop: "10px" }}>
                  {tags && tags.tags
                    ? tags.tags.map((data, index) => {
                        let infoTag = data.data;
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
                                {333}
                              </div>
                            </Col>
                          </Row>
                        );
                      })
                    : null}
                </Row>
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
