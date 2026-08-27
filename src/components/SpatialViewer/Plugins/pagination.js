import * as React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector
} from '@devexpress/dx-react-core';


const pluginDependencies = [
  { name: 'PagingPanel' },
  { name: "PaginationState" },
];

export class Pagination extends React.PureComponent {
  
  render() {
    const { pageSizes } = this.props;
    return (
      <Plugin
        name="Pagination"
        dependencies={pluginDependencies} >
        <Template name="footer">
          <TemplatePlaceholder />
            <TemplateConnector>

            {(
              {
                pagingSizeValue
              },
              {
                setPageSize,
                changePagingSizeValue
              }
            ) => (
            <div className="pagination-size-wrapper">
                Show <Select
                  value={pagingSizeValue}
                  onChange={event => {
                    changePagingSizeValue(event.target.value);
                    setPageSize(event.target.value)
                  }}
                  inputProps={{
                    name: "filter-field",
                    id: "filter-field"
                  }}
                >
                  {pageSizes.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                 
                </Select>
                entries
           </div>
          )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
