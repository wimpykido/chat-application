import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import { MessageProps } from "..";
import heart from "../../../assets/react.png";

export const SentMessage = ({
  message,
  displayName,
  createdAt,
  avatar,
  reaction,
}: MessageProps) => {
  console.log(reaction);
  const theme = useTheme();
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  return (
    <Box marginRight={4} display={"flex"} gap={1} alignSelf={"flex-end"}>
      <Stack
        display={"flex"}
        alignItems={"flex-end"}
        justifyContent={"center"}
        gap={1}
      >
        <Typography
          fontSize={"12px"}
          color={theme.palette.primary.contrastText}
        >
          {displayName}
        </Typography>
        {reaction ? (
          <Avatar src={heart} />
        ) : (
          <Box
            bgcolor={"#00A3FF"}
            width={"fit-content"}
            p={1.5}
            borderRadius={"10px"}
            sx={{ borderTopRightRadius: "0" }}
          >
            <Typography fontSize={"14px"} color={"white"}>
              {message}
            </Typography>
          </Box>
        )}

        <Typography fontSize={"10px"} color={"#A0A0A0"}>
          {formatTimestamp(createdAt)}
        </Typography>
      </Stack>
      {avatar ? (
        <Avatar
          src={`data:image/svg+xml;utf8,${encodeURIComponent(avatar)}`}
          alt={displayName}
        />
      ) : (
        <Avatar />
      )}
    </Box>
  );
};
