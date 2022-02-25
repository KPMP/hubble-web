import React, { useState } from 'react';
function useForceUpdate(){
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

function SortDialog(props) {
  let forceUpdate = useForceUpdate();

  return(
    <div>
    {(props.sortDialogOpenValue) &&
        <div>
          <div className="modal-backdrop" onClick={() => {props.closeDialogs()}}></div>
            <div className="sort-dialog border rounded">
              {props.sortableToolbarColumns && props.sortableToolbarColumns.length > 0 ?
                <div className="dialog-content" onClick={e => {e.stopPropagation();}}>
                  {props.sortableToolbarColumns.map((item, index) => { 
                    return (
                      <div className="sort-dialog-option-wrapper">
                        <div className="sort-dialog-options">
                          <input onClick={()=> {
                            if(props.sortedColumns.findIndex((el)=>{if(el.columnName===item.name){return true}}) >= 0){
                              props.changeColumnSorting({columnName: item.name, direction: null, keepOther: true, sortIndex: -1});
                              props.removeSortedColumn(item.name)
                            } else {
                              props.changeColumnSorting({columnName: item.name, direction: 'asc', keepOther: true, sortIndex: -1});
                              props.addSortedColumn({columnName: item.name, direction: 'asc'});
                            }
                            forceUpdate()
                          }}
                          key={props.sortedColumns} 
                          onChange={()=>{}} 
                          type="checkbox" checked={
                            props.sortedColumns.findIndex((el)=>{if(el.columnName===item.name){return true}}) >= 0 ? true : false
                          }
                          name={item.name}
                          value="sort"></input>
                          <span>{item.name}</span>
                        </div>
                        <div className="sort-dialog-radio-wrapper">
                          <span onClick={() => {
                            props.changeColumnSorting({columnName: item.name, direction: 'asc', keepOther: true, sortIndex: -1});
                            props.addSortedColumn({columnName: item.name, direction: 'asc'});
                            forceUpdate()
                            }}><i alt="Sort Column Ascending" className="fas fa-arrow-up"></i>
                            <input checked={
                              props.sortedColumns.findIndex((el)=>{if(el.columnName===item.name && el.direction === 'asc'){return true}}) >= 0 ? true : false
                              } type="radio" name={item.name} value='asc'>
                            </input>
                          </span>

                          <span onClick={() => {
                            props.changeColumnSorting({columnName: item.name, direction: 'desc', keepOther: true, sortIndex: -1});
                            props.addSortedColumn({columnName: item.name, direction: 'desc'});
                            forceUpdate()
                          }}><i alt="Sort Column Descending" className="fas fa-arrow-down"></i>
                          <input checked={
                            props.sortedColumns.findIndex((el)=>{if(el.columnName===item.name && el.direction === 'desc'){return true}}) >= 0 ? true : false
                          } type="radio" name={item.name} value='desc'>
                          </input>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              : <div className="sort-dialog-option-wrapper"><span>No sortable columns</span></div>
              }
          </div>
        </div>
        }
        </div>
  )
}
  
export default SortDialog;