import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { UserType } from "../components/templates/chats-layout";
type Props = {
  children: ReactNode;
};
type ChatState = {
  chatId: string | null;
  user: UserType;
};
type ChatAction = {
  type: string;
  payload: UserType;
};
export  type ChatContextType = {
  data: ChatState;
  dispatch: React.Dispatch<ChatAction>;
};
export const ChatContext = createContext<ChatContextType | undefined>(undefined);
export const ChatContextProvider = ({ children }: Props) => {
  const initialState = {
    chatId: "null",
    user: {
        id: ""
    },
  };
  const chatReducer = (state: ChatState, action: ChatAction) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: auth.currentUser
            ? auth.currentUser.uid > action.payload.id
              ? `${auth.currentUser.uid}_${action.payload.id}`
              : `${action.payload.id}_${auth.currentUser.uid}`
            : null,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider
      value={{
        data: state,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
