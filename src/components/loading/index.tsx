import { Box, CircularProgress, useTheme } from "@mui/material";

export const Loading = () => {
  const theme = useTheme();
  return (
    <Box
      height={"100vh"}
      bgcolor={theme.palette.primary.light}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress sx={{ color: theme.palette.primary.contrastText }} />
    </Box>
  );
};
