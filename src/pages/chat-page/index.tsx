import { auth } from "../../firebase";
import { Box, Typography, useTheme } from "@mui/material";
import { AuthLayout } from "../../components/templates/auth-layout";
import { SendMessage } from "../../components/send-message";
import { ChatBox } from "../../components/chat-box";
import { useContext, useEffect, useState } from "react";
import { fetchAvatar } from "../../api/avatar";
import { ChatLayout } from "../../components/templates/chats-layout";
import { ChatContext, ChatContextType } from "../../context/chat-context";
const ChatPage = () => {
  const [avatarData, setAvatarData] = useState<string | null>(null);
  const theme = useTheme();
  const user = auth.currentUser?.displayName;
  const { data } = useContext(ChatContext) as ChatContextType;
  useEffect(() => {
    user &&
      fetchAvatar(user)
        .then((data) => {
          setAvatarData(data);
        })
        .catch((error) => {
          console.error("Error fetching avatar:", error);
        });
  }, [user]);
  console.log(user);
  return (
    <AuthLayout avatarData={avatarData}>
      <ChatLayout>
        <Box
          width={"75%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          bgcolor={theme.palette.primary.light}
          height={"calc(100vh - 64px)"}
        >
          {data.chatId ? (
            <>
              <ChatBox avatarData={avatarData} />
              <SendMessage />
            </>
          ) : (
            <Typography>Start chatting!</Typography>
          )}
        </Box>
      </ChatLayout>
    </AuthLayout>
  );
};
export default ChatPage;
