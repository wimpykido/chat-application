import { auth } from "../../firebase";
import { Box, useTheme } from "@mui/material";
import { AuthLayout } from "../../components/templates/auth-layout";
import { SendMessage } from "../../components/send-message";
import { ChatBox } from "../../components/chat-box";
import { useContext, useEffect, useState } from "react";
import { fetchAvatar } from "../../api/avatar";
import { ChatLayout, UserType } from "../../components/templates/chats-layout";
import { ChatContext, ChatContextType } from "../../context/chat-context";
import { type } from "os";

const ChatPage = () => {
  const theme = useTheme();
  const user = auth.currentUser?.displayName;
  const [avatarData, setAvatarData] = useState<string | null>(null);
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext) as ChatContextType;

  const handleSelect = (u: UserType) => {
    dispatch({type: "CHANGE_USER", payload: u})
  }
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
          minWidth={"390px"}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          bgcolor={theme.palette.primary.light}
          height={"calc(100vh - 64px)"}
        >
          <ChatBox avatarData={avatarData} />
          <SendMessage />
        </Box>
      </ChatLayout>
    </AuthLayout>
  );
};
export default ChatPage;
