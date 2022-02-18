import * as React from "react";
import { Plugin, Getter, Action } from "@devexpress/dx-react-core";
import * as PropTypes from "prop-types";

export class ToolbarFilterState extends React.PureComponent {
  constructor(props) {
    super(props);
    const { defaultFilterValue } = props;
    this.state = {
      filterValue: defaultFilterValue,
      sortDialogOpen: false,
      arrangeColumnsDialogOpen: false,
    };
    this.changeValue = this.changeValue.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.getColumns = this.getColumns.bind(this);
    this.getSortableToolbarColumns = this.getSortableToolbarColumns.bind(this);
    this.filterColumnTitleComputed = this.filterColumnTitleComputed.bind(this);
    this.filterDataItemsComputed = this.filterDataItemsComputed.bind(this);
    this.filterExpressionComputed = this.filterExpressionComputed.bind(this);

    this.toggleArrangeColumnsDialogState = this.toggleArrangeColumnsDialogState.bind(this);
    this.toggleSortDialogState = this.toggleSortDialogState.bind(this);
    this.closeDialogs = this.closeDialogs.bind(this);

    this.toggleSort = this.toggleSort.bind(this);
    this.getSortedRows = this.getSortedRows.bind(this);
  }

  changeValue(value) {
    this.setState({
      filterValue: value
    });
  }
  clearValue() {
    this.setState({
      filterValue: ""
    });
  }
  toggleArrangeColumnsDialogState() {
    this.setState({
      arrangeColumnsDialogOpen: this.state.arrangeColumnsDialogOpen ? false : true,
      sortDialogOpen: false
    });
  }

  toggleSortDialogState() {
    this.setState({
      sortDialogOpen: this.state.sortDialogOpen ? false : true,
      arrangeColumnsDialogOpen: false
    });
  }
  closeDialogs() {
    this.setState({
      sortDialogOpen: false,
      arrangeColumnsDialogOpen: false
    });
  }
  
  getSortableToolbarColumns ({ columns }){
    return columns.filter(col => col.sortable === true);
  }

  getColumns({columns}){
    return columns
  }

  filterColumnTitleComputed({ columns }) {
    const column = columns.find(col => col.name === this.props.columnName);
    return column ? column.title : "";
  }

  filterDataItemsComputed({ rows }) {
    console.log('rows,', rows)
    return rows.reduce((acc, row) => {
      if (!acc.includes(row[this.props.columnName])) {
        acc.push(row[this.props.columnName]);
      }
      return acc;
    }, []);
  }
  filterExpressionComputed({ filterExpression, toolbarFilterValue }) {
    const newFilterExpression = {
      ...(filterExpression || { filters: [], operator: "and" })
    };
    if (toolbarFilterValue) {
      newFilterExpression.filters = [
        ...newFilterExpression.filters,
        {
          columnName: this.props.columnName,
          value: toolbarFilterValue
        }
      ];
    }
    return newFilterExpression;
  }
  getSortedRows({rows}){
    return rows
  }
  toggleSort(){
    return [{columnName: 'Data Type', direction: 'desc'}]
  }
  render() {
    const { filterValue, sortDialogOpen, arrangeColumnsDialogOpen } = this.state;

    return (
      <Plugin name="ToolbarFilterState">

        <Getter
        name="sorting"
        computed={this.toggleSort}
        />
        <Getter
          name="rows"
          computed={this.getSortedRows}
        />

        <Getter
          name="toolbarFilterColumnTitle"
          computed={this.filterColumnTitleComputed}
        />
        
        <Getter
          name="sortableToolbarColumns"
          computed={this.getSortableToolbarColumns}
        />
        <Getter
          name="toolbarColumns"
          computed={this.getColumns}
        />

        <Getter
          name="toolbarSortDialogState"
          computed={this.sortDialogStateComputed}
        />


        <Getter name="toolbarFilterValue" value={filterValue} />
        <Getter name="arrangeColumnsDialogOpen" value={arrangeColumnsDialogOpen} />
        <Getter name="sortDialogOpenValue" value={sortDialogOpen} />


        <Getter
          name="toolbarFilterDataItems"
          computed={this.filterDataItemsComputed}
        />
        <Getter
          name="filterExpression"
          computed={this.filterExpressionComputed}
        />


        <Action name="changeToolbarFilterValue" action={this.changeValue} />
        <Action name="clearToolbarFilterValue" action={this.clearValue} />

        <Action name="toggleArrangeColumnsDialog" action={this.toggleArrangeColumnsDialogState} />
        <Action name="toggleSortTableDialog" action={this.toggleSortDialogState} />
        <Action name="closeDialogs" action={this.closeDialogs} />
        
      </Plugin>
    );
  }
}

ToolbarFilterState.propTypes = {
  defaultFilterValue: PropTypes.string,
  columnName: PropTypes.string
};

ToolbarFilterState.defaultProps = {
  defaultFilterValue: "",
  columnName: ""
};
