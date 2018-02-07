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
  Paginator
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

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.selectFilterType = this.selectFilterType.bind(this);
    this.updateCurrentSortType = this.updateCurrentSortType.bind(this);
    this.onSelectPerPage = this.onSelectPerPage.bind(this);
    this.addFilterPopularTag = this.addFilterPopularTag.bind(this);
    this.removeTagFilter = this.removeTagFilter.bind(this);

    this.state = {
      currentValue: "",
      currentFilterType: filters[0],
      currentSortType: sortFields[0],
      isSortNumeric: sortFields[0].isNumeric,
      isSortAscending: true,
      currentViewType: "list",
      activeFilters: [],
      elementByPage: 15,
      filterPopularTag: []
    };
  }
  componentDidMount() {
    this.props.getPopularTag();
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
  renderInput() {
    const { currentFilterType, currentValue, filterCategory } = this.state;
    if (!currentFilterType) {
      return null;
    }

    if (currentFilterType.filterType === "select") {
      return (
        <Filter.ValueSelector
          filterValues={currentFilterType.filterValues}
          currentValue={currentValue}
        />
      );
    } else if (currentFilterType.filterType === "complex-select") {
      return (
        <Filter.CategorySelector
          filterCategories={currentFilterType.filterCategories}
          currentCategory={filterCategory}
          placeholder={currentFilterType.placeholder}
        >
          <Filter.CategoryValueSelector
            categoryValues={filterCategory && filterCategory.filterValues}
            currentValue={currentValue}
            placeholder={currentFilterType.filterCategoriesPlaceholder}
          />
        </Filter.CategorySelector>
      );
    } else {
      return (
        <FormControl
          type={currentFilterType.filterType}
          value={currentValue}
          placeholder={currentFilterType.placeholder}
        />
      );
    }
  }
  onChangePage(page) {
    console.log(page);
  }
  onSelectPerPage(numItems) {
    this.setState({ elementByPage: numItems });
  }
  addFilterPopularTag(name) {
    let filterPopularTag = [...this.state.filterPopularTag];
    filterPopularTag.push(name);

    this.setState({ filterPopularTag });
  }
  removeTagFilter(name) {
    let filterPopularTag = [...this.state.filterPopularTag];
    let index = filterPopularTag.indexOf(name);
    filterPopularTag.splice(index, 1);
    this.setState({ filterPopularTag });
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
    let { tags } = this.props;
    let pagination = {
      page: 1,
      perPage: elementByPage,
      perPageOptions: [5, 10, 15]
    };
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
              <Row style={{paddingLeft: 20}}>
                {filterPopularTag.map(tag => {
                  return <TagsFilter name={tag} onClick={this.removeTagFilter}/>;
                })}
              </Row>
              <h5>{dataSearch.length} Results</h5>
            </Toolbar.Results>
          ))}
        <Row>
          <Col xs={12} md={9}>
            <div className="content-card">
              {dataSearch.map((data, index) => {
                return (
                  <Col md={3} key={`col_card_${index}`}>
                    <CardItem key={`card_${index}`} cardInformation={data} />
                  </Col>
                );
              })}
              <div style={{ padding: "0 20px" }}>
                <br />
                <br />
                <div style={null}>
                  <Paginator
                    viewType="list"
                    pagination={pagination}
                    onPageSet={this.onChangePage}
                    onPerPageSelect={this.onSelectPerPage}
                    itemCount={dataSearch.length}
                    messages={{
                      firstPage: "First Page",
                      previousPage: "Previous Page",
                      currentPage: "Current Page"
                    }}
                  />
                </div>
              </div>
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
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    tags: state.tags
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPopularTag: () => dispatch(getPopularTag())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
