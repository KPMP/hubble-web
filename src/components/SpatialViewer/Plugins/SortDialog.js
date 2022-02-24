import React, { useState } from 'react';
function useForceUpdate(){
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

function SortDialog({sortDialogOpenValue, closeDialogs, sortableToolbarColumns, sortedColumns, changeColumnSorting, addSortedColumn, removeSortedColumn}) {
  let forceUpdate = useForceUpdate();

  return(
    <div>
    {(sortDialogOpenValue) &&
        <div>
          <div className="modal-backdrop" onClick={() => {closeDialogs()}}></div>
            <div className="sort-dialog border rounded">
              {sortableToolbarColumns && sortableToolbarColumns.length > 0 ?
                <div className="dialog-content" onClick={e => {e.stopPropagation();}}>
                  {sortableToolbarColumns.map((item) => { 
                    return (
                      <div className="sort-dialog-option-wrapper">
                        <div className="sort-dialog-options">
                          <input onClick={()=> {
                            if(sortedColumns.findIndex((el)=>{if(el.columnName===item.name){return true}}) >= 0){
                              changeColumnSorting({columnName: item.name, direction: null, keepOther: true, sortIndex: -1});
                              removeSortedColumn(item.name)
                            } else {
                              changeColumnSorting({columnName: item.name, direction: 'asc', keepOther: true, sortIndex: -1});
                              addSortedColumn({columnName: item.name, direction: 'asc'});
                            }
                            forceUpdate()
                          }}
                          key={sortedColumns} 
                          onChange={()=>{}} 
                          type="checkbox" checked={
                            sortedColumns.findIndex((el)=>{if(el.columnName===item.name){return true}}) >= 0 ? true : false
                          }
                          name={item.name}
                          value="sort"></input>
                          <span>{item.name}</span>
                        </div>
                        <div className="sort-dialog-radio-wrapper">
                          <span onClick={() => {
                            changeColumnSorting({columnName: item.name, direction: 'asc', keepOther: true, sortIndex: -1});
                            addSortedColumn({columnName: item.name, direction: 'asc'});
                            forceUpdate()
                            }}><i className="fas fa-arrow-up"></i>
                            <input checked={
                              sortedColumns.findIndex((el)=>{if(el.columnName===item.name && el.direction === 'asc'){return true}}) >= 0 ? true : false
                              } type="radio" name={item.name} value='asc'>
                            </input>
                          </span>

                          <span onClick={() => {
                            changeColumnSorting({columnName: item.name, direction: 'desc', keepOther: true, sortIndex: -1});
                            addSortedColumn({columnName: item.name, direction: 'desc'});
                            forceUpdate()
                          }}><i className="fas fa-arrow-down"></i>
                          <input checked={
                            sortedColumns.findIndex((el)=>{if(el.columnName===item.name && el.direction === 'desc'){return true}}) >= 0 ? true : false
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