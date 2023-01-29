import { createContext, FC, PropsWithChildren, useState } from "react";
import { TodoItem } from "../components/TodoItem/TodoItem.interface";


interface TodoContextType {
  list: TodoItem[]
  addListItem: Function
  updateListItem: Function 
  updateListItemStatus: Function 
  removeListItem: Function
  saveListItems: Function
  fetchSavedList: Function
}

const TODOLIST = 'todoList'

export const TodoContext = createContext<TodoContextType>({
  list: [],
  addListItem: () => {},
  updateListItem: () => {},
  updateListItemStatus: () => {},
  removeListItem: () => {},
  saveListItems: () => {},
  fetchSavedList: () => {}
});

export const TodoContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [list, setList] = useState<TodoItem[]>([]);
 
  const addListItem = (value: string) => {
    setList([...list, {
      text: value,
      status: false
    }])
  }

  const updateListItem = (item: TodoItem, newValue: string) => {
    const copy = [...list]
    const indexOfItem = copy.indexOf(item);
    copy[indexOfItem].text = newValue;
    setList(copy)
  }
  
  const updateListItemStatus = (item: TodoItem) => {
    console.log("EDIT")
    const copy = [...list]
    const indexOfItem = copy.indexOf(item);
    copy[indexOfItem].status = !copy[indexOfItem].status
    console.log(copy[indexOfItem].status)
    setList(copy)
  }
  
  const removeListItem = (itemToRemove: TodoItem) => {
    const copy = [...list];
    const indexOfItem = copy.indexOf(itemToRemove)
    copy.splice(indexOfItem, 1)
    setList(copy)
  }

  const saveListItems = () => {
    window.localStorage.setItem(TODOLIST, JSON.stringify(list))
  }
  const fetchSavedList = () => {
    const saved = window.localStorage.getItem(TODOLIST)
    if (saved) {
      setList(JSON.parse(saved))
    }
  }

  const values = {
    list,
    addListItem,
    updateListItem,
    updateListItemStatus,
    removeListItem,
    saveListItems,
    fetchSavedList
  }


  return (
    <TodoContext.Provider value={values}>
      {children}
    </TodoContext.Provider>
  )
}