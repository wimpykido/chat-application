import { Box, useTheme } from "@mui/material";
import { Send } from "../send-button";
import { ControlledTextField } from "../form/controlled-text-field";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { message } from "../form/validations";
import { QuickReaction } from "../quick-reaction-button";

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

  const sendMessage = async (data: MessageType) => {
    console.log("data inside sendMessage:", data);
    const user = auth.currentUser;
    const messageData = {
      reaction: data.reaction !== undefined ? data.reaction : false,
      text: data.text,
      name: user?.displayName,
      email: user?.email,
      createdAt: serverTimestamp(),
    };
    try {
      await addDoc(collection(db, "messages"), messageData);
      setValue("text", "");
    } catch (error) {
      console.error("Error sending message:", error);
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
      bgcolor={theme.palette.primary.main}
      height={"100px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={"center"}
      width={"100%"}
      minWidth={"390px"}
    >
      <Box
        minWidth={"360px"}
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
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Send handleSubmit={handleSubmit(sendMessage)} />
          <QuickReaction onQuickReactionClick={handleQuickReactionClick} />
        </Box>
      </Box>
    </Box>
  );
};
