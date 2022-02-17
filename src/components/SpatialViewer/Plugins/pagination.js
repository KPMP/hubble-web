import * as React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector
} from '@devexpress/dx-react-core';


const pluginDependencies = [
  { name: 'PagingPanel' },
  { name: "PaginationState" }

];

export class Pagination extends React.PureComponent {
  render() {
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
            <div>
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
                  {[20,40,80,100].map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                  



                </Select>
                entries
            {/* <button type="button" onClick={()=>{setPageSize(20)}} class="btn btn-outline-secondary border-0"><span class="oi oi-eye"></span></button> */}
           </div>
          )}

          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
