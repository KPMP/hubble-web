import * as React from "react";
import {
  Template,
  Plugin,
  TemplateConnector
} from "@devexpress/dx-react-core";
import Button from "@material-ui/core/Button";
import SortDialog from './SortDialog';
const pluginDependencies = [
  { name: "Toolbar" },
  { name: "IntegratedSorting" }, 
  { name: "ToolbarFilterState" }
];

export class ToolbarFilter extends React.PureComponent {
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
              },
              {
                toggleArrangeColumnsDialog,
                toggleSortTableDialog,
                toggleSortOrder,
                closeDialogs,
                changeColumnSorting,
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

                {arrangeColumnsDialogOpen &&
                  <div>
                    <div className="modal-backdrop" onClick={() => {closeDialogs()}}></div>
                      <div className="sort-dialog border rounded dialog-content" onClick={e => {e.stopPropagation();}}>
                        {toolbarColumns.map((item, index) => {
                          return (
                            <div className="sort-dialog-option-wrapper">
                              <div className="sort-dialog-options">
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                                <span key={index}>{item.name}</span>
                              </div>
                              <div class="sort-dialog-radio-wrapper">
                                <span><i className="fas fa-arrow-up"></i><input type="radio" id="vehicle2" name="vehicle1" value="Bike"></input></span>
                                <span><i className="fas fa-arrow-down"></i><input type="radio" id="vehicle3" name="vehicle1" value="Bike"></input></span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                  </div>
                }
                <SortDialog
                  sortDialogOpenValue={sortDialogOpenValue}
                  closeDialogs={closeDialogs}
                  sortableToolbarColumns={sortableToolbarColumns}
                  sortedColumns={sortedColumns}
                  changeColumnSorting={changeColumnSorting}
                  addSortedColumn={addSortedColumn}
                  removeSortedColumn={removeSortedColumn}
                />
              </div>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}