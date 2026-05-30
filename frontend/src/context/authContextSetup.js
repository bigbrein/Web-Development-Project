import { createContext } from "react";
import { authActionTypes } from "./contextActionTypes.js";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return { user: action.payload };
    case authActionTypes.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

// The lack of safety in the language will be the death of me
