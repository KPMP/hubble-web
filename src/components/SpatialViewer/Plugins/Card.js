import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
const style = {
    // border: '1px dashed gray',
    // padding: '0.5rem 1rem',
    // marginBottom: '.5rem',
    // backgroundColor: 'white',
    cursor: 'move',
};
export const ItemTypes = {
    CARD: 'card',
  }

function useForceUpdate(){
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}



export const Card = ({ id, text, index, moveCard, hideable, hiddenColumnNames, toggleColumnVisibility }) => {
  let forceUpdate = useForceUpdate();

    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    console.log('hcn',hiddenColumnNames, hideable, text, forceUpdate)
    return (<div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
       
          <div className="sort-dialog-option-wrapper">
            <div className="sort-dialog-options">

              
              <input onClick={(e)=> {
                if(hideable === false){
                  e.stopPropagation()
                } else {
                  toggleColumnVisibility(text)
                }
                forceUpdate()
              }}
              key={index}
              type="checkbox"
              checked={
                hiddenColumnNames.findIndex((columnName)=>{if(columnName===text){return true}}) >= 0 ? false : true
              }
              name={text}
              value="sort"></input>
              <span>{text}</span>
            </div>
            <div className="sort-dialog-radio-wrapper">
              <i alt="Arrange Columns" className="fas fa-bars"></i>
            </div>
          </div>
		</div>);
};
