"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { routes } from "@/constants/routes";
import { useCreateUserMutation, useUpdateUserMutation } from "@/hooks/useUser";
import { USER_TYPE_NAME } from "@/constants/users";

type CreateUserDialogProps = {
  open: boolean;
  onClose: () => void;
  userInfo?: {
    id: string;
    userName: string;
    email: string;
    userType: number;
  };
};

const CreateUserDialog = ({
  open,
  onClose,
  userInfo,
}: CreateUserDialogProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate: createUser } = useCreateUserMutation();
  const { mutate: updateUser } = useUpdateUserMutation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const isEditMode = Boolean(userInfo);

  const validationSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    ...(isEditMode
      ? {}
      : {
          password: Yup.string()
            .min(6, "Min 6 characters")
            .required("Password is required"),
        }),
    userType: Yup.number().required("User type is required"),
  });

  const initialValues = {
    userName: userInfo?.userName || "",
    email: userInfo?.email || "",
    password: "",
    userType: userInfo?.userType ?? 9,
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        {isEditMode ? "Update User" : "Create User"}
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          enqueueSnackbar(isEditMode ? "Updating user..." : "Creating user...");

          const payload = { ...values };

          if (isEditMode && userInfo) {
            updateUser(
              { id: userInfo.id, ...payload },
              {
                onSuccess: () => {
                  closeSnackbar();
                  enqueueSnackbar("User updated successfully", {
                    variant: "success",
                  });
                  onClose();
                },
                onError: () => {
                  closeSnackbar();
                  setSubmitting(false);
                },
              }
            );
          } else {
            createUser(payload, {
              onSuccess: () => {
                closeSnackbar();
                enqueueSnackbar("User created successfully", {
                  variant: "success",
                });
                router.push(routes.auth.login);
              },
              onError: () => {
                closeSnackbar();
                setSubmitting(false);
              },
            });
          }
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form noValidate>
            <DialogContent dividers>
              {/* Username */}
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

              {/* Email */}
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

              {/* Password (only in create) */}
              {!isEditMode && (
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
              )}

              {/* User Type */}
              <Field
                as={TextField}
                name="userType"
                label="User Type"
                select
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="userType" />}
                error={touched.userType && Boolean(errors.userType)}
              >
                {Object.entries(USER_TYPE_NAME).map(([key, label]) => (
                  <MenuItem key={key} value={Number(key)}>
                    {label}
                  </MenuItem>
                ))}
              </Field>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose} color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : isEditMode ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateUserDialog;
