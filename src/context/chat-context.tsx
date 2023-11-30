import React, { createContext, ReactNode, useReducer } from "react";
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
export type ChatContextType = {
  data: ChatState;
  dispatch: React.Dispatch<ChatAction>;
};
export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);
export const ChatContextProvider = ({ children }: Props) => {
  const initialState = {
    chatId: null,
    user: {
      id: "",
    },
  };
  const chatReducer = (state: ChatState, action: ChatAction) => {
    switch (action.type) {
      case "CHANGE_USER":
        const currentUserUid = auth.currentUser?.uid;
        const otherUserId = action.payload.id;

        if (currentUserUid && otherUserId) {
          const chatId =
            currentUserUid > otherUserId
              ? `${currentUserUid}_${otherUserId}`
              : `${otherUserId}_${currentUserUid}`;
          console.log(chatId);
          return {
            ...state,
            user: action.payload,
            chatId: chatId,
          };
        } else {
          console.error("User IDs are not available.");
          return state;
        }

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
