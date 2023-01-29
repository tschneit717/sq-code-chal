import { ChangeEvent, ChangeEventHandler, FormEventHandler, SetStateAction, SyntheticEvent, useState } from "react";

interface InputFieldInterface {
  callback: Function;
  name: string;
  label: string;
}

export const InputField = ({callback, name, label}: InputFieldInterface) => {
  const [data, setData] = useState('')
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    callback(data)
  }
  const updateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value)
  }
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor={name}>
        {label}
        <input name={name} value={data} onChange={updateHandler} />
      </label>
      <button type="submit">Add</button>
    </form>
  )
}