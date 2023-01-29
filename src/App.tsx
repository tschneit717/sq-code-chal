import React, { useContext, useEffect, useState } from 'react';
import logo from './assets/images/logo.svg';
import './assets/styles/App.css';
import { InputField } from './components/InputField/InputFIeld';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoContext } from './contexts/TodoContext';

function App() {
  const todoContext = useContext(TodoContext)
  const { list, addListItem, updateListItem, removeListItem, saveListItems, fetchSavedList} = todoContext
  const [saveStatus, setSaveStatus] = useState('')
  
  useEffect(() => {
    fetchSavedList()
  }, [])

  const saveHandler = () => {
    try {
      saveListItems()
      setSaveStatus('Success! Saved!')
      setTimeout(() => {
        setSaveStatus('')
      }, 3000)
    } catch (e) {
      setSaveStatus('Uh oh something went wrong')
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <InputField name="add" label="Add Item" callback={addListItem}></InputField>
        {list.map(item => (
          <TodoItem key={`${item.text}${Math.random}`} inputItem={item} editCallback={updateListItem} markCompleteCallback={updateListItem} removeCallback={removeListItem}></TodoItem>
        ))}
        {saveStatus ? <p>{saveStatus}</p> : <></>}
        <button onClick={saveHandler}>Save</button>
      </header>
    </div>
  );
}

export default App;
