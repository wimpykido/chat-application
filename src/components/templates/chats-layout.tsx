import { Box, Stack, useTheme } from "@mui/material";
import { SearchBar } from "../search-bar";
import { ReactNode } from "react";
import { User } from "../user";

type ChatLayoutProps = {
  children: ReactNode;
};

export const ChatLayout = ({ children }: ChatLayoutProps) => {
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
        <SearchBar />
        <User
          displayName={"Nini Qoqoladze"}
          lastMessage={"eliso davaleba damawerine"}
          createdAt={54835839509}
        />
      </Stack>
      {children}
    </Box>
  );
};
