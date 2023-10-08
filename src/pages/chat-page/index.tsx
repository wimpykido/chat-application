import { auth } from "../../firebase";
import { Box, useTheme } from "@mui/material";
import { AuthLayout } from "../../components/templates/auth-layout";
import { SendMessage } from "../../components/send-message";
import { ChatBox } from "../../components/chat-box";
import { useEffect, useState } from "react";
import { fetchAvatar } from "../../api/avatar";

const ChatPage = () => {
  const theme = useTheme();
  const user = auth.currentUser?.displayName;
  const [avatarData, setAvatarData] = useState<string | null>(null);
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
      <Box
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
    </AuthLayout>
  );
};
export default ChatPage;
