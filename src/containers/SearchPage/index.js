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

export const mockFilterExampleFields = [
  {
    id: "name",
    title: "Name",
    placeholder: "Filter by Name",
    filterType: "text"
  },
  {
    id: "address",
    title: "Address",
    placeholder: "Filter by Address",
    filterType: "text"
  },
  {
    id: "birthMonth",
    title: "Birth Month",
    placeholder: "Filter by Birth Month",
    filterType: "select",
    filterValues: [
      { title: "January", id: "jan" },
      { title: "February", id: "feb" },
      { title: "March", id: "mar" },
      { title: "April", id: "apr" },
      { title: "May", id: "may" },
      { title: "June", id: "jun" },
      { title: "July", id: "jul" },
      { title: "August", id: "aug" },
      { title: "September", id: "sep" },
      { title: "October", id: "oct" },
      { title: "November", id: "nov" },
      { title: "December", id: "dec" }
    ]
  },
  {
    id: "car",
    title: "Car",
    placeholder: "Filter by Car Make",
    filterType: "complex-select",
    filterValues: [{ title: "Subaru", id: "subie" }, "Toyota"],
    filterCategoriesPlaceholder: "Filter by Car Model",
    filterCategories: [
      {
        id: "subie",
        title: "Subaru",
        filterValues: [
          {
            title: "Outback",
            id: "out"
          },
          "Crosstrek",
          "Impreza"
        ]
      },
      {
        id: "toyota",
        title: "Toyota",
        filterValues: [
          {
            title: "Prius",
            id: "pri"
          },
          "Corolla",
          "Echo"
        ]
      }
    ]
  }
];

export const mockSortFields = [
  {
    id: "name",
    title: "Name",
    isNumeric: false
  },
  {
    id: "address",
    title: "Address",
    isNumeric: false
  },
  {
    id: "birthMonth",
    title: "Birth Month",
    isNumeric: true
  },
  {
    id: "car",
    title: "Car",
    isNumeric: false
  }
];

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentValue: "",
      currentFilterType: mockFilterExampleFields[0],
      currentSortType: mockSortFields[0],
      isSortNumeric: mockSortFields[0].isNumeric,
      isSortAscending: true,
      currentViewType: "list",
      activeFilters: []
    };
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
      activeFilters
    } = this.state;

    return (
      <div style={{marginTop:'1%'}} >
        <Filter id="filter-search">
          <Filter.TypeSelector
            filterTypes={mockFilterExampleFields}
            currentFilterType={currentFilterType}
            onFilterTypeSelected={this.selectFilterType}
          />
          {this.renderInput()}
        </Filter>
        <Sort>
          <Sort.TypeSelector
            sortTypes={mockSortFields}
            currentSortType={currentSortType}
            onSortTypeSelected={this.updateCurrentSortType}
          />
          <Sort.DirectionSelector
            isNumeric={isSortNumeric}
            isAscending={isSortAscending}
            onClick={() => this.toggleCurrentSortDirection()}
          />
        </Sort>
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
              <h5>40 Results</h5>
            </Toolbar.Results>
          ))}
        <div style={{ marginTop: '2%' }}>
          <CardItem style={{ backgroundColor: 'red', width: 10 }} />
        </div>
        )}
      </div>
    );
  }
}
