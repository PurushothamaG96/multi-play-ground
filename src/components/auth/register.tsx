"use client";

import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Box,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useRegister from "@/hooks/useRegister";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { redirect } from "next/navigation";
import { routes } from "@/constants/routes";
import { useSnackbar } from "notistack";

const validationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate, isSuccess, isError, error } = useRegister();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (values: typeof initialValues) => {
    mutate(values);

    if (isSuccess) {
      enqueueSnackbar("Logging Success");
      redirect(routes.auth.login);
    } else if (isError) {
      enqueueSnackbar(error?.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>
        Register
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          enqueueSnackbar("Register in...");
          mutate(values, {
            onSuccess: () => {
              closeSnackbar();
              redirect(routes.protected.dashboard);
            },
            onError: () => {
              closeSnackbar();
              setSubmitting(false);
            },
          });
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form noValidate>
            <Field
              as={TextField}
              name="userName"
              label="User Name"
              fullWidth
              margin="normal"
              required
              helperText={<ErrorMessage name="userName" />}
              error={touched.userName && Boolean(errors.userName)}
            />

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

            {errors && (
              <Typography color="error" variant="body2" mt={1}>
                {(errors as Error).message}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? "Registering..." : "Register"}
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
          <Link href={routes.auth.login}>Login</Link>
        </Typography>
      </Box>
    </Paper>
  );
}
