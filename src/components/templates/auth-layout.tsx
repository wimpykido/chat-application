import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useState } from "react";
import SmsIcon from "@mui/icons-material/Sms";
import { useThemeContext } from "../../context/theme-provider";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { SwitchTheme } from "../theme-switcher";
type Props = {
  children: ReactNode;
  avatarData: string | null;
};

export const AuthLayout = ({ children, avatarData }: Props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/sign-in");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };
  const { darkMode, toggleDarkMode } = useThemeContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  return (
    <Stack width={"100%"} minWidth={'400px'}>
      <AppBar position="static">
        <Box
          maxWidth="xl"
          sx={{
            width: "100%",
            // minWidth: "390px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
            borderBottom: `1px solid ${theme.palette.secondary.dark}`,
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              // minWidth: "400px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Box>
              <Tooltip title="Open settings">
                <Button
                  onClick={(event) => setAnchorElUser(event?.currentTarget)}
                >
                  <IconButton sx={{ p: 0 }}>
                    {avatarData ? (
                      <Avatar
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(
                          avatarData
                        )}`}
                        alt={"user"}
                      />
                    ) : (
                      <Avatar />
                    )}
                  </IconButton>
                  <Typography
                    textTransform={"none"}
                    textAlign={"center"}
                    margin={1}
                    color={darkMode ? "white" : "black"}
                  >
                    {auth.currentUser?.displayName}
                  </Typography>
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem disabled>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={toggleDarkMode}>
                  <SwitchTheme />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <SmsIcon
                sx={{
                  display: "flex",
                  mr: 1,
                  color: "#00A3FF",
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#00A3FF",
                  textDecoration: "none",
                }}
              >
                Chat
              </Typography>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      {children}
    </Stack>
  );
};
