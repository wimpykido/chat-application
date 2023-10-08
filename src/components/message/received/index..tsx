import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import { MessageProps } from "..";
import { useEffect, useState } from "react";
import { fetchAvatar } from "../../../api/avatar";
import heart from "../../../assets/react.png";
export const ReceivedMessage = ({
  reaction,
  message,
  displayName,
  createdAt,
}: MessageProps) => {
  const [avatarData, setAvatarData] = useState<string | null>(null);
  const theme = useTheme();
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  useEffect(() => {
    fetchAvatar(displayName)
      .then((data) => {
        setAvatarData(data);
      })
      .catch((error) => {
        console.error("Error fetching avatar:", error);
      });
  }, [displayName]);
  return (
    <Box display={"flex"} gap={1} alignSelf={"flex-start"}>
      {avatarData ? (
        <Avatar
          src={`data:image/svg+xml;utf8,${encodeURIComponent(avatarData)}`}
          alt={displayName}
        />
      ) : (
        <Avatar />
      )}
      <Stack
        display={"flex"}
        alignItems={"flex-start"}
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
    </Box>
  );
};
