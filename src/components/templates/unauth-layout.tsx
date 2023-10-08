import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { SwitchTheme } from "../theme-switcher";
type Props = {
  children: ReactNode;
};
export const UnauthLayout = ({ children }: Props) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.primary.main}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      {children}
      <SwitchTheme />
    </Box>
  );
};
