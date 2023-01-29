import { SetStateAction } from "react";

export interface TodoItemInterface {
  inputItem: {
    text: string;
    status: boolean
  }
  editCallback: Function
  markCompleteCallback: Function
  removeCallback: Function
}

export interface TodoItem {
  text: string
  status: boolean
}
