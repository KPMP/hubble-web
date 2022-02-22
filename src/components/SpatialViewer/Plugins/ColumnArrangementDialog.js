import React, { useState, useCallback } from 'react'
import { Card } from './Card';
import update from 'immutability-helper';
function useForceUpdate(){
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

function ColumnArrangementDialog(props) {
  let forceUpdate = useForceUpdate();
  const [filterValue, setFilterValue] = useState('');

  const onChangeHandler = event => {
    setFilterValue(event.target.value);
  };
  
    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Write a cool JS library',
        },
        {
            id: 2,
            text: 'Make it generic enough',
        },

    ]);
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) => update(prevCards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, prevCards[dragIndex]],
            ],
        }));
    }, []);
    const renderCard = useCallback((card, index) => {
        return (<Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard}/>);
    }, []);

  return(
    <div className='column-arrage-dialog'>
    {(props.arrangeColumnsDialogOpen) &&
        <div>
          <div className="modal-backdrop" onClick={() => {props.closeDialogs()}}></div>
            <div className="sort-dialog border rounded">
            <div className="column-filter-wrapper">
                <i alt="Arrange Columns" className="fas fa-magnifying-glass"></i>
                <input
                type="text"
                value={filterValue}
                onChange={onChangeHandler}
                placeholder="Filter Columns"
                />
              </div>
              <div className="sort-dialog-options fake-link">
                <span onClick={()=>{setFilterValue('')}}>Restore Defaults</span>
              </div>
              
              <div>{cards.map((card, i) => {
                
                return renderCard(card, i ) 
                
              })}</div>
              {props.toolbarColumns && props.toolbarColumns.length > 0 ?
                <div className="dialog-content" onClick={e => {e.stopPropagation();}}>
                  {props.toolbarColumns.map((item, index) => { 

                    return (
                      <div>{ ((item.name).toLowerCase()).indexOf(filterValue.toLowerCase()) == -1 ? <div></div> :
                      <div className="sort-dialog-option-wrapper">
                        <div className="sort-dialog-options">
                          <input onClick={(e)=> {
                            if(item.hideable === false){
                              e.stopPropagation()
                            } else {
                              props.toggleColumnVisibility(item.name)
                            }
                            forceUpdate()
                          }}
                          key={props.sortedColumns}
                          type="checkbox"
                          checked={
                            props.hiddenColumnNames.findIndex((columnName)=>{if(columnName===item.name){return true}}) >= 0 ? false : true
                          }
                          name={item.name}
                          value="sort"></input>
                          <span>{item.name}</span>
                        </div>
                        <div className="sort-dialog-radio-wrapper">
                          <i alt="Arrange Columns" className="fas fa-bars"></i>
                        </div>
                      </div>
                        }
                      </div>
                    )
                  })}
                </div>
              : <div className="sort-dialog-option-wrapper"><span>No columns</span></div>
              }
          </div>
        </div>
        }
        </div>
  )
}
  
export default ColumnArrangementDialog;