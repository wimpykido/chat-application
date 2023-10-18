import { Avatar, Box, Typography, useTheme } from "@mui/material";

type UserProps = {
  displayName: string;
  lastMessage: string;
  createdAt: number;
  avatar?: string | null;
};

export const User = ({
  displayName,
  lastMessage,
  createdAt,
  avatar,
}: UserProps) => {
  const theme = useTheme();
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  return (
    <Box
      width={"90%"}
      gap={1}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        gap={2}
      >
        {avatar ? (
          <Avatar
            src={`data:image/svg+xml;utf8,${encodeURIComponent(avatar)}`}
            alt={displayName}
          />
        ) : (
          <Avatar />
        )}
        <Box>
          <Typography
            fontSize={"14px"}
            color={theme.palette.primary.contrastText}
          >
            {displayName}
          </Typography>
          <Typography
            fontSize={"10px"}
            fontWeight={300}
            color={theme.palette.primary.contrastText}
          >
            {lastMessage}
          </Typography>
        </Box>
      </Box>
      <Typography fontSize={"14px"} color={"#A0A0A0"}>
        {formatTimestamp(createdAt)}
      </Typography>
    </Box>
  );
};
