import { createContext } from "react";
import { commentActionTypes } from "./contextActionTypes.js";

export const CommentContext = createContext();

export const commentReducer = (state, action) => {
  switch (action.type) {
    case commentActionTypes.UPLOAD:
      return { user: action.payload };
    default:
      return state;
  }
};

// The lack of safety in the language will be the death of me
