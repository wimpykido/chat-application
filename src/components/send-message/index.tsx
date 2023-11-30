import { Box, useTheme } from "@mui/material";
import { Send } from "../send-button";
import { ControlledTextField } from "../form/controlled-text-field";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { message } from "../form/validations";
import { QuickReaction } from "../quick-reaction-button";
import { Attachment } from "../attachment-message";
import { useContext } from "react";
import { ChatContext, ChatContextType } from "../../context/chat-context";

export type MessageType = {
  email: string;
  text: string;
  name: string;
  id: string;
  createdAt: number;
  reaction: boolean;
};

export const SendMessage = () => {
  const theme = useTheme();
  const { handleSubmit, control, setValue } = useForm<MessageType>({
    defaultValues: {
      text: "",
    },
  });
  const { data } = useContext(ChatContext) as ChatContextType;
  const sendMessage = async (d: MessageType) => {
    try {
      const user = auth.currentUser;
      if (!user || !data.chatId) {
        console.error("User or chatId not available");
        return;
      }
      const chatDocRef = doc(db, "chats", data.chatId);
      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          reaction: d.reaction !== undefined ? d.reaction : false,
          text: d.text,
          name: user.displayName,
          email: user.email,
          createdAt: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [data.chatId + ".lastMessage"]: {
          message: d.text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.id), {
        [data.chatId + ".lastMessage"]: {
          message: d.text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      console.log("Update successful");
      setValue("text", "");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleQuickReactionClick = () => {
    sendMessage({
      reaction: true,
      text: "",
      email: "",
      name: "",
      id: "",
      createdAt: 0,
    });
  };

  return (
    <Box
      borderTop={`1px solid ${theme.palette.secondary.dark}`}
      bgcolor={theme.palette.primary.main}
      height={"100px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={"center"}
      width={"100%"}
      // minWidth={"390px"}
    >
      <Box
        // minWidth={"360px"}
        width={"80%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        alignContent={"center"}
      >
        <Box width={"100%"} maxWidth={600}>
          <ControlledTextField
            rows={1}
            maxRows={10}
            variant="standard"
            name="text"
            rules={message}
            control={control}
            placeholder="Type message..."
            required
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <QuickReaction onQuickReactionClick={handleQuickReactionClick} />
          <Attachment />
          <Send handleSubmit={handleSubmit(sendMessage)} />
        </Box>
      </Box>
    </Box>
  );
};
