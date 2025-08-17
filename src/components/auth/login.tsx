"use client";

import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useLogIn from "@/hooks/useLogin";
import { routes } from "@/constants/routes";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate } = useLogIn();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError, setSubmitting }) => {
          enqueueSnackbar("Logging in...");
          mutate(values, {
            onSuccess: () => {
              closeSnackbar();
              router.push(routes.protected.dashboard);
            },
            onError: (err: Error) => {
              console.log(err);
              closeSnackbar();
              setFieldError("email", "Invalid email or password");
              setFieldError("password", " ");
              setSubmitting(false);
            },
          });
        }}
      >
        {({ isSubmitting, touched, errors, isValid, dirty }) => (
          <Form noValidate>
            <Field
              as={TextField}
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              required
              helperText={<ErrorMessage name="email" />}
              error={touched.email && Boolean(errors.email)}
            />

            <Field
              as={TextField}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              helperText={<ErrorMessage name="password" />}
              error={touched.password && Boolean(errors.password)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isValid || !dirty}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "100%", height: 100 }}
      >
        <Typography>
          <Link href={routes.auth.register}>Register</Link>
        </Typography>
      </Box>
    </Paper>
  );
}
