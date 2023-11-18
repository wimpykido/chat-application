import { Stack, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import { MessageType } from "../send-message";
import { Message } from "../message";
import { ChatContext, ChatContextType } from "../../context/chat-context";

type Messages = Array<MessageType>;
type chatProps = {
  avatarData: string | null;
};

export const ChatBox = ({ avatarData }: chatProps) => {
  const [messages, setMessages] = useState<Messages>([]);
  const theme = useTheme();

  // useEffect(() => {
  //   const q = query(
  //     collection(db, "messages"),
  //     orderBy("createdAt", "desc"),
  //     limit(50)
  //   );
  //   const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
  //     const fetchedMessages: any[] = [];
  //     QuerySnapshot.forEach((doc) => {
  //       fetchedMessages.push({ ...doc.data(), id: doc.id });
  //     });
  //     const sortedMessages: any = fetchedMessages.sort(
  //       (a, b) => a.createdAt - b.createdAt
  //     );
  //     setMessages(sortedMessages);
  //   });
  //   return () => unsubscribe();
  // }, []);
  console.log(messages);
  return (
    <Stack
      height={"calc(100vh - 164px)"}
      gap={3}
      p={1}
      sx={{
        minWidth: "390px",
        width: "80%",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: { xs: "1px", md: "4px" },
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.secondary.light,
          borderRadius: "5px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#333",
        },
      }}
    >
      {messages.map((mes) => {
        return (
          <Message
            reaction={mes.reaction}
            avatar={avatarData}
            email={mes.email}
            key={mes.id}
            createdAt={mes.createdAt}
            message={mes.text}
            displayName={mes.name}
          />
        );
      })}
    </Stack>
  );
};
