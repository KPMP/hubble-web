import * as React from "react";
import {
  Template,
  Plugin,
  TemplateConnector,
} from "@devexpress/dx-react-core";
import Button from "@material-ui/core/Button";
import SortDialog from './SortDialog/sortDialog';
import ColumnArrangementDialog from './ColumnArrangmentDialog/columnArrangementDialog';

const pluginDependencies = [
  { name: "Toolbar" },
  { name: "IntegratedSorting" }, 
  { name: "ToolbarButtonState" }
];

export class ToolbarButton extends React.PureComponent {
  render() {
    return (
      <Plugin name="ToolbarButton" dependencies={pluginDependencies}>
        <Template name="toolbarContent">
          <TemplateConnector>
            {(
              {
                arrangeColumnsDialogOpen,
                sortDialogOpenValue,
                toolbarColumns,
                sortableToolbarColumns,
                sortedColumns,
                hiddenColumnNames,
                rows
              },
              {
                toggleArrangeColumnsDialog,
                toggleSortTableDialog,
                closeDialogs,
                changeColumnSorting,
                toggleColumnVisibility,
                addSortedColumn,
                removeSortedColumn,
              }
            ) => (
              <div className="ml-auto">
                <Button className="border rounded" onClick={toggleArrangeColumnsDialog}>
                  <span className="icon-info spatial-info-cell">
                      <i alt="Arrange Columns" className="fas fa-bars"></i>
                  </span>
                </Button>
                &nbsp;
                <Button className="border rounded" onClick={toggleSortTableDialog}>
                  <span className="icon-info spatial-info-cell">
                      <i alt="Sort Columns" className="fas fa-sort-amount-down-alt"></i>
                  </span>
                </Button>

                <ColumnArrangementDialog
                  arrangeColumnsDialogOpen={arrangeColumnsDialogOpen}
                  closeDialogs={closeDialogs}
                  toolbarColumns={toolbarColumns}
                  sortedColumns={sortedColumns}
                  cards={this.props.cards}
                  setCards={this.props.setCards}
                  setDefaultCards={this.props.setDefaultCards}
                  hiddenColumnNames={hiddenColumnNames}
                  toggleColumnVisibility={toggleColumnVisibility}
                  addSortedColumn={addSortedColumn}
                  removeSortedColumn={removeSortedColumn}
                />
                <SortDialog
                  sortDialogOpenValue={sortDialogOpenValue}
                  sortedColumns={sortedColumns}
                  sortableToolbarColumns={sortableToolbarColumns}
                  closeDialogs={closeDialogs}
                  changeColumnSorting={changeColumnSorting}
                  addSortedColumn={addSortedColumn}
                  removeSortedColumn={removeSortedColumn}
                  rows={rows}
                />
              </div>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}