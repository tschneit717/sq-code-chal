import { SetStateAction, useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import { TodoItemInterface } from './TodoItem.interface';
import styles from './TodoItem.module.css'


export const TodoItem = ({ inputItem}: TodoItemInterface) => {
  const todoContext = useContext(TodoContext)
  const { updateListItem, updateListItemStatus, removeListItem } = todoContext
  const [isEditing, toggleIsEditing] = useState(false);
  const [tempText, setTempText] = useState(inputItem.text)

  const handleEditor = () => {
    toggleIsEditing(!isEditing)
  } 

  useEffect(() => {
    if (!isEditing) {
      updateListItem(inputItem, tempText)
    }
  }, [isEditing])

  return (
  <div>
    {isEditing ? 
      <input
        value={tempText}
        onChange={(e => {setTempText(e.target.value)})} /> 
      : <p style={{ textDecoration: inputItem.status ? 'line-through' : 'none'}}>
          {inputItem.text}
      </p>}

    <div className={styles.buttonWrapper}>
      <button 
        onClick={handleEditor}>
          {isEditing ? 'Stop Editing' : 'Edit'}
      </button>
      {!isEditing ? <>
        <button 
          onClick={() => updateListItemStatus(inputItem)}>
            {inputItem.status ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button 
          onClick={() => removeListItem(inputItem)}>
            Remove
        </button>
      </> : <></>}
    </div>
  </div>
  )
}