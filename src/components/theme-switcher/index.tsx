import { Box, IconButton } from "@mui/material";
import { useThemeContext } from "../../context/theme-provider";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const SwitchTheme = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "text.primary",
        borderRadius: 1,
      }}
    >
      {darkMode ? "Niko Mode" : "Dark Mode"}
      <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};
