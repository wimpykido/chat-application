import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ControlledTextField } from "../../components/form/controlled-text-field";
import { email, password } from "../../components/form/validations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { UnauthLayout } from "../../components/templates/unauth-layout";

type SignInFormFields = { email: string; password: string };
const signInFormDefaultValues: SignInFormFields = { email: "", password: "" };

export const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    // reset,
  } = useForm<SignInFormFields>({
    defaultValues: signInFormDefaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignIn = async (form: SignInFormFields) => {
    try {
      const { email, password } = form;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      navigate("/chat");
      console.log("Signed in user:", user);
    } catch (error: any) {
      console.error("Error signing in:", error.message);
    }
  };
  const theme = useTheme();
  return (
    <UnauthLayout>
      <Stack width="80%" maxWidth={400} spacing={2}>
        <Typography
          variant="h4"
          fontWeight={600}
          color={theme.palette.primary.contrastText}
          textAlign="left"
        >
          Sign in
        </Typography>

        <ControlledTextField
          name="email"
          control={control}
          placeholder="Enter email"
          rules={email}
          required
        />
        <ControlledTextField
          name="password"
          control={control}
          placeholder="Enter password"
          type={showPassword ? "text" : "password"}
          rules={password}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            textTransform: "capitalize",
            color: "black",
            fontWeight: 700,
            fontSize: 18,
            bgcolor: "#00A3FF",
            boxShadow: "none",
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#0D82C4",
              boxShadow: "none",
            },
          }}
          color="primary"
          onClick={handleSubmit(handleSignIn)}
          disabled={!isDirty}
        >
          Sign in
        </Button>

        <Typography
          color={theme.palette.primary.contrastText}
          variant="body2"
          textAlign="center"
          fontWeight={600}
        >
          Don&apos;t have an account?{" "}
          <Box
            display="inline"
            sx={{
              fontWeight: "600",
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </Box>
        </Typography>
      </Stack>
    </UnauthLayout>
  );
};
