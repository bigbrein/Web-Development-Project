import { useReducer } from "react";
import { CommentContext, commentReducer } from "./commentContextSetup.js";

export const CommentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, { user: null });

  console.log("CommentContext state:", state); // Debugging log

  return (
    <CommentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CommentContext.Provider>
  );
};
