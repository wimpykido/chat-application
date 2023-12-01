import { Box, Stack, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
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
  const { data } = useContext(ChatContext) as ChatContextType;
  const theme = useTheme();

  useEffect(() => {
    if (data.chatId) {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  return (
    // <Stack
    //   height={"calc(100vh - 164px)"}
    //   display={"flex"}
    //   flexDirection={"column"}
    // >
    //   <Box>hello</Box>
    <Stack
      height={"calc(100vh - 164px)"}
      gap={3}
      sx={{
        width: "100%",
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
      {messages.map((mes: MessageType) => {
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
    // </Stack> 
  );
};
