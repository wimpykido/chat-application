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
import { email, name, password } from "../../components/form/validations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { UnauthLayout } from "../../components/templates/unauth-layout";

type SignUpFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const signUpFormDefaultValues: SignUpFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    getValues,
  } = useForm<SignUpFormFields>({
    defaultValues: signUpFormDefaultValues,
  });
  const validatePasswordMatch = (repeatPassword: string) => {
    const { password } = getValues();
    return password === repeatPassword || "Passwords do not match";
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSignUp = async (form: SignUpFormFields) => {
    try {
      const { email, password, firstName, lastName } = form;
      const displayName = `${firstName} ${lastName}`;
      console.log(auth);
      await createUserWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser) {
        console.error("No user is signed in.");
        return;
      }
      await updateProfile(auth.currentUser, { displayName });
      console.log(displayName);
      navigate("/chat");
    } catch (error: any) {
      console.error("Error creating user:", error.message);
    }
  };

  const theme = useTheme();

  return (
    <UnauthLayout>
      <Stack
        spacing={2}
        p={4}
        width={"75%"}
        maxWidth={"600px"}
        minWidth={"200px"}
      >
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.primary.contrastText,
            fontWeight: "600",
            width: "100%",
          }}
        >
          Sign Up
        </Typography>
        <Stack
          spacing={2}
          component={"form"}
          action="/home"
          sx={{
            width: "100%",
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <ControlledTextField
              name="firstName"
              control={control}
              placeholder="First Name"
              rules={name}
              required
            />
            <ControlledTextField
              name="lastName"
              control={control}
              placeholder="Last Name"
              rules={name}
              required
            />
          </Box>
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
          <ControlledTextField
            name="repeatPassword"
            control={control}
            placeholder="Repeat Password"
            type="showPassword ? 'text' : 'password'"
            rules={{
              ...password,
              validate: (value: string) => validatePasswordMatch(value),
            }}
            required
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              py: 1.5,
              textTransform: "capitalize",
              maxWidth: "600",
              boxShadow: "none",
              borderRadius: "1",
              bgcolor: "#00A3FF",
              ":hover": {
                bgcolor: "#0D82C4",
                boxShadow: "none",
              },
            }}
            color="primary"
            onClick={handleSubmit(handleSignUp)}
            disabled={!isDirty}
          >
            Register
          </Button>
        </Stack>

        <Typography
          color={theme.palette.primary.contrastText}
          variant={"body2"}
          fontWeight={500}
          textAlign={"center"}
        >
          Already have an account?{" "}
          <Box
            display="inline"
            sx={{
              fontWeight: "600",
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/sign-in")}
          >
            Sign in
          </Box>
        </Typography>
      </Stack>
    </UnauthLayout>
  );
};
