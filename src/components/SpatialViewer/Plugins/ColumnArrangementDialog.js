import React, { useState, useCallback } from 'react'
import { Card } from './Card';
import update from 'immutability-helper';
function useForceUpdate(){
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}


function isFiltered(value, filterValue) {
  return (((value).toLowerCase()).indexOf(filterValue.toLowerCase()) >= 0 || filterValue == '' )
}

function ColumnArrangementDialog(props) {
  let forceUpdate = useForceUpdate();
  const [filterValue, setFilterValue] = useState('');

  const onChangeHandler = event => {
    setFilterValue(event.target.value);
  };

  const moveCard = (dragIndex, hoverIndex) => {
    props.setCards(update(props.cards, {
      $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, props.cards[dragIndex]],
      ],
    }))
  };

  const restoreDefaults = () => {
    setFilterValue('')
    props.setDefaultCards()
    props.toolbarColumns.forEach(column => {
      if(!column.defaultHidden && props.hiddenColumnNames.includes(column.name)){
        props.toggleColumnVisibility(column.name)
      } else if (column.defaultHidden && !props.hiddenColumnNames.includes(column.name)) {
        props.toggleColumnVisibility(column.name)
      }
    });
    
  }

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
                <span onClick={()=>{restoreDefaults()}}>Restore Defaults</span>
              </div>
              
              <div>{props.cards.map((card, index) => {
                return (<div key={card.text}>{ isFiltered(card.text, filterValue)
                  ?
                  <Card
                    index={index}
                    id={card.text}
                    text={card.text}
                    moveCard={moveCard}
                    hideable={card.hideable}
                    hiddenColumnNames={props.hiddenColumnNames}
                    toggleColumnVisibility={props.toggleColumnVisibility}
                    forceUpdate={forceUpdate} />
                  : <div></div>}</div>)
              })}</div>

          </div>
        </div>
        }
        </div>
  )
}
  
export default ColumnArrangementDialog;