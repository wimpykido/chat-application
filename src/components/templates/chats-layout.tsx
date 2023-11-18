import { Box, Stack, useTheme } from "@mui/material";
import { ReactNode, useState } from "react";
import { User } from "../user";
import { Search } from "../search-comp";

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

  const theme = useTheme();
  return (
    <Box width={"100%"} display={"flex"} bgcolor={theme.palette.primary.main}>
      <Stack
        width={"30%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={2}
      >
        <Search user={user} setUser={setUser} />
        {/* <User
          displayName={user?.displayName}
          lastMessage={user?.lastMessage}
          createdAt={user?.createdAt}
        /> */}
      </Stack>
      {children}
    </Box>
  );
};
