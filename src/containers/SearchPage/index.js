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
  Toolbar
} from "patternfly-react";

import Api from "../../service/Api";
import CardItem from "../../components/CardItem/";
import { imgIndex } from "../../ImageImport";
import "./style.css";
import { dataSearch } from './mock/';
import { filters } from './mock/filter';
import sortFields from './Sort/';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.selectFilterType = this.selectFilterType.bind(this);
    this.updateCurrentSortType = this.updateCurrentSortType.bind(this);

    this.state = {
      currentValue: "",
      currentFilterType: filters[0],
      currentSortType: sortFields[0],
      isSortNumeric: sortFields[0].isNumeric,
      isSortAscending: true,
      currentViewType: "list",
      activeFilters: []
    };
  }

  selectFilterType(filterType) {
    const { currentFilterType } = this.state;
    if (currentFilterType !== filterType) {
      this.setState({ currentValue: '', currentFilterType: filterType });

      if (filterType.filterType === 'complex-select') {
        this.setState({ filterCategory: undefined, categoryValue: '' });
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

  render() {
    let {
      currentFilterType,
      currentSortType,
      currentViewType,
      isSortNumeric,
      isSortAscending,
      activeFilters,
      currentValue
    } = this.state;

    return (
      <div style={{marginTop:'1%'}} >
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
        {
          /*
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
          */
        }

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
              <h5>{dataSearch.length} Results</h5>
            </Toolbar.Results>
          ))}
        <div className="content-card">
          {dataSearch.map((data, index) => {
            return (
              <Col md={3} key={`col_card_${index}`}>
                <CardItem key={`card_${index}`} cardInformation={data} />
              </Col>
            );
          })}
        </div>
      </div>
    );
  }
}
