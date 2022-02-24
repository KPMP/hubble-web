import * as React from "react";
import { Plugin, Getter, Action } from "@devexpress/dx-react-core";

export class ToolbarFilterState extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortedColumns: [],
      sortDialogOpen: false,
      arrangeColumnsDialogOpen: false,
    };
    this.getColumns = this.getColumns.bind(this);
    this.getSortableToolbarColumns = this.getSortableToolbarColumns.bind(this);
    this.toggleArrangeColumnsDialogState = this.toggleArrangeColumnsDialogState.bind(this);
    this.toggleSortDialogState = this.toggleSortDialogState.bind(this);
    this.closeDialogs = this.closeDialogs.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.getSortedColumns = this.getSortedColumns.bind(this);
    this.addSortedColumn = this.addSortedColumn.bind(this);
    this.removeSortedColumn = this.removeSortedColumn.bind(this);
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

  toggleSort(sortOrder){
    this.setState({columnName: sortOrder.columnName, direction: sortOrder.direction})
  }

  addSortedColumn(sortObj) {
    const sortedColumns = this.state.sortedColumns;
    if(sortedColumns.findIndex((el)=>{if(el.columnName===sortObj.columnName){return true}}) === -1 ){
      sortedColumns.push(sortObj);
      this.setState({sortedColumns});
    }else{
      sortedColumns[sortedColumns.findIndex((el)=>{if(el.columnName===sortObj.columnName){return true}})].direction = sortObj.direction
      this.setState({sortedColumns})
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
         return ( o1.columnName === o2.columnName && o1.direction === o2.direction );
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
    const { sortDialogOpen, arrangeColumnsDialogOpen } = this.state;

    return (
      <Plugin name="ToolbarFilterState">
        <Getter name="sortableToolbarColumns" computed={this.getSortableToolbarColumns} />
        <Getter name="sortedColumns" computed={this.getSortedColumns} />
        <Getter name="toolbarColumns" computed={this.getColumns} />
        <Getter name="arrangeColumnsDialogOpen" value={arrangeColumnsDialogOpen} />
        <Getter name="sortDialogOpenValue" value={sortDialogOpen} />

        <Action name="toggleArrangeColumnsDialog" action={this.toggleArrangeColumnsDialogState} />
        <Action name="toggleSortTableDialog" action={this.toggleSortDialogState} />
        <Action name="closeDialogs" action={this.closeDialogs} />
        <Action name="addSortedColumn" action={this.addSortedColumn} />
        <Action name="removeSortedColumn" action={this.removeSortedColumn} />
      </Plugin>
    );
  }
}
