import { Box, Stack, useTheme } from "@mui/material";
import { ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../user";
import { Search } from "../search-comp";
import { ChatContext, ChatContextType } from "../../context/chat-context";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

type ChatLayoutProps = {
  children: ReactNode;
};

export type UserType = {
  displayName?: string;
  id: string;
  lastMessage?: string;
  createdAt?: number;
  avatar?: string | null;
};

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  const [user, setUser] = useState<UserType | null>();
  const [users, setUsers] = useState<Array<UserType> | null>([]);
  const { dispatch } = useContext(ChatContext) as ChatContextType;
  const handleSelect = async (u: UserType) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    console.log("hi:", u);
  };

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        if (auth.currentUser) {
          const userChatsDocRef = doc(db, "userChats", auth.currentUser.uid);
          const userChatsDocSnap = await getDoc(userChatsDocRef);

          if (userChatsDocSnap.exists()) {
            const userChatsData = userChatsDocSnap.data();
            if (userChatsData) {
              const usersArray = Object.entries(userChatsData).map(
                ([chatId, chatData]) => ({
                  id: chatData.userInfo.uid,
                  displayName: chatData.userInfo.displayName,
                  createdAt: chatData.date,
                  lastMessage: chatData.lastMessage.message,
                  // Add other properties as needed
                })
              );
              setUsers(usersArray);
            } else {
              console.log("User Chats data is not in the expected format");
            }
          } else {
            console.log("User Chats data not found");
          }
        }
      } catch (error) {
        console.error("Error fetching userChats data:", error);
      }
    };
    fetchUserChats();
  }, [users]);

  const theme = useTheme();
  return (
    <Box width={"100%"} display={"flex"} bgcolor={theme.palette.primary.main}>

      <Stack
        borderRight={`1px solid ${theme.palette.secondary.dark}`}
        width={"25%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={2}
      >
        <Search user={user} setUser={setUser} />
        {users
          ?.sort((a, b) =>
            a.createdAt && b.createdAt ? a.createdAt - b.createdAt : 1
          )
          .map((user) => (
            <User
              key={user.id}
              handleSelect={() => handleSelect(user)}
              displayName={user.displayName}
              lastMessage={user.lastMessage}
              createdAt={user.createdAt}
            />
          ))}
      </Stack>
      {children}
    </Box>
  );
};
