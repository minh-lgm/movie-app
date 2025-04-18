import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormProvider, FTextField, FCheckBox } from "./form/index.js";
import { useAuth } from "../contexts/AuthContext";

export default function Form() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const from = location.state?.from?.pathname || "/";
  const [error, setError] = useState("");

  const defaultValues = {
    email: "minh@gmail.com",
    password: "minhlg",
    remember: true,
  };

  const validationSchema = {
    email: {
      required: "Email is required"
    },
    password: {
      required: "Password is required"
    },
  };

  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = useState(false);

  const handleDismiss = () => {
    navigate(-1);
  };

  const onSubmit = async (data) => {
    try {
      setError("");
      await auth.signin(data.email, () => {
        navigate(from, { replace: true });
      });
    } catch (err) {
      setError(err.message || "An error occurred during login");
    }
  };

  return (
    <Modal
      open={true}
      aria-labelledby="login-modal"
      aria-describedby="login-form"
      onClose={handleDismiss}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box>
        <Paper
          elevation={8}
          style={{
            borderRadius: "20px",
          }}
        >
          <Box sx={{ p: 4, width: "100%", maxWidth: 400 }}>
            <Typography
              variant="h4"
              component="h1"
              textAlign="center"
              gutterBottom
              color="primary"
            >
              Log in
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <FTextField
                  name="email"
                  label="Email address"
                  required
                  rules={validationSchema.email}
                />

                <FTextField
                  name="password"
                  label="Password"
                  required
                  rules={validationSchema.password}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <FCheckBox
                  name="remember"
                  label="Remember me"
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Login
                </LoadingButton>
              </Stack>
            </FormProvider>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}
