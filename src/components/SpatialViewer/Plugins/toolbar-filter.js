import * as React from "react";
import {
  Template,
  TemplatePlaceholder,
  Plugin,
  TemplateConnector
} from "@devexpress/dx-react-core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const pluginDependencies = [
  { name: "Toolbar" },
  { name: "ToolbarFilterState" }
];

export class ToolbarFilter extends React.PureComponent {
  
  render() {
    return (
      <Plugin name="ToolbarFilter" dependencies={pluginDependencies}>
        <Template name="toolbarContent">
          {/* <TemplatePlaceholder /> */}
          <TemplateConnector>
            {(
              {
                toolbarFilterValue,
                arrangeColumnsDialogOpen,
                sortDialogOpenValue,
                toolbarFilterDataItems,
                toolbarFilterColumnTitle,
                toolbarColumns
              },
              { changeToolbarFilterValue,
                clearToolbarFilterValue,
                toggleArrangeColumnsDialog,
                toggleSortTableDialog,
              }
            ) => (
              <div className="ml-auto">
                {/* <InputLabel htmlFor="filter-field">
                  {toolbarFilterColumnTitle}:
                </InputLabel>
                <Select
                  value={toolbarFilterValue}
                  onChange={event => {
                    changeToolbarFilterValue(event.target.value);
                  }}
                  inputProps={{
                    name: "filter-field",
                    id: "filter-field"
                  }}
                >
                  {toolbarFilterDataItems.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}



                </Select>
                <Button onClick={clearToolbarFilterValue}>Clear</Button> */}
                <Button onClick={toggleArrangeColumnsDialog}>
                  <span className="icon-info spatial-info-cell">
                      <i className="fas fa-bars"></i>
                  </span>
                </Button>

                <Button onClick={toggleSortTableDialog}>
                <span className="icon-info spatial-info-cell">
                    <i className="fas fa-sort-amount-down-alt"></i>
                </span>
                </Button>

                {arrangeColumnsDialogOpen ?
                  <div className="test-sort-dialog border rounded">
                        {toolbarColumns.map((item, index) => { 
                          return (
                            <div>
                              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                              <span key={index}>{item.name}</span>
                              <span><i className="fas fa-arrow-up"></i><input type="radio" id="vehicle2" name="vehicle1" value="Bike"></input></span>
                              <span><i className="fas fa-arrow-down"></i><input type="radio" id="vehicle3" name="vehicle1" value="Bike"></input></span>

                            </div>
                          )
                        })}
                  </div>
                  : <div></div>
                }


                {sortDialogOpenValue ?
                  <div className="test-sort-dialog border rounded">
                        {toolbarColumns.map((item, index) => { 
                          return (
                            <div>
                              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                              <span key={index}>{item.name}</span>
                              <span><i className="fas fa-arrow-up"></i><input type="radio" id="vehicle2" name="vehicle1" value="Bike"></input></span>
                              <span><i className="fas fa-arrow-down"></i><input type="radio" id="vehicle3" name="vehicle1" value="Bike"></input></span>

                            </div>
                          )
                        })}
                  </div>
                  : <div></div>
                }
              </div>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
