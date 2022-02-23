import * as React from "react";
import {
  Template,
  Plugin,
  TemplateConnector,
} from "@devexpress/dx-react-core";
import Button from "@material-ui/core/Button";
import SortDialog from './SortDialog';
import ColumnArrangementDialog from './ColumnArrangementDialog';

const pluginDependencies = [
  { name: "Toolbar" },
  { name: "IntegratedSorting" }, 
  { name: "ToolbarFilterState" }
];

export class ToolbarFilter extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Plugin name="ToolbarFilter" dependencies={pluginDependencies}>
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
                {console.log('========', this.props)}
                <ColumnArrangementDialog
                  arrangeColumnsDialogOpen={arrangeColumnsDialogOpen}
                  closeDialogs={closeDialogs}
                  toolbarColumns={toolbarColumns}
                  sortedColumns={sortedColumns}
                  cards={this.props.cards}
                  setCards={this.props.setCards}
                  hiddenColumnNames={hiddenColumnNames}
                  toggleColumnVisibility={toggleColumnVisibility}
                  addSortedColumn={addSortedColumn}
                  removeSortedColumn={removeSortedColumn}
                />
                <SortDialog
                  sortDialogOpenValue={sortDialogOpenValue}
                  closeDialogs={closeDialogs}
                  sortableToolbarColumns={sortableToolbarColumns}
                  sortedColumns={sortedColumns}
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
