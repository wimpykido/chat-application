import { Button, Stack, Typography } from "@mui/material";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
const AccessControl = () => {
  const navigate = useNavigate();
  return (
    <Stack
      gap={4}
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      bgcolor={"black"}
    >
      <div className="cat">
        <div className="ear ear--left"></div>
        <div className="ear ear--right"></div>
        <div className="face">
          <div className="eye eye--left">
            <div className="eye-pupil"></div>
          </div>
          <div className="eye eye--right">
            <div className="eye-pupil"></div>
          </div>
          <div className="muzzle"></div>
        </div>
      </div>
      {!auth.currentUser ? (
        <>
          <Typography color={"white"}>
            Please sign in to access this page.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#00A3F" }}
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
        </>
      ) : (
        <Typography color={"white"}>WASSUP</Typography>
      )}
    </Stack>
  );
};

export default AccessControl;
