import * as React from "react";
import { Plugin, Getter, Action } from "@devexpress/dx-react-core";
import * as PropTypes from "prop-types";

export class ToolbarFilterState extends React.PureComponent {
  constructor(props) {
    super(props);
    const { defaultFilterValue } = props;
    this.state = {
      sortedColumns: [],
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
    this.getSortedColumns = this.getSortedColumns.bind(this);
    this.addSortedColumn = this.addSortedColumn.bind(this);
    this.removeSortedColumn = this.removeSortedColumn.bind(this);
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
    console.log('this.statesortedColumns', this.state.sortedColumns)
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

  toggleSort(sortOrder){
    this.setState({columnName: sortOrder.columnName, direction: sortOrder.direction})
  }

  addSortedColumn(sortObj) {
    const sortedColumns = this.state.sortedColumns;
    if(sortedColumns.findIndex((el)=>{if(el.columnName===sortObj.columnName){return true}}) === -1 ){
      console.log('added...')
      sortedColumns.push(sortObj);
      this.setState({sortedColumns});
    }else{
      sortedColumns[sortedColumns.findIndex((el)=>{if(el.columnName===sortObj.columnName){return true}})].direction = sortObj.direction
      this.setState({sortedColumns})
      console.log('not  added')
    }
  }

  removeSortedColumn(columnName) {
    const sortedColumns = this.state.sortedColumns
    sortedColumns.splice(
      sortedColumns.findIndex((el)=>{if(el.columnName===columnName){return true}}), 1
    )
    this.setState({sortedColumns})
  }

  getSortedColumns({sorting, columns}) {
    const result1 = sorting.filter((o1)=>{
      return (this.state.sortedColumns).some((o2)=>{
         return ( o1.columnName === o2.columnName && o1.direction == o2.direction);          // id is unnique both array object
       });
     });
    
    if (result1.length !== sorting.length ) {
      columns.forEach(column => {
        this.removeSortedColumn(column.columnName)
      })
      sorting.forEach(sortedElement => {
        this.addSortedColumn(sortedElement)  
      });
    }
    return this.state.sortedColumns
  }

  render() {
    const { filterValue, sortDialogOpen, arrangeColumnsDialogOpen, sortedColumns } = this.state;

    return (
      <Plugin name="ToolbarFilterState">
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
          name="sortedColumns"
          computed={this.getSortedColumns}
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
        <Action name="toggleSortOrder" action={this.toggleSort} />
        
        <Action name="addSortedColumn" action={this.addSortedColumn} />
        <Action name="removeSortedColumn" action={this.removeSortedColumn} />
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