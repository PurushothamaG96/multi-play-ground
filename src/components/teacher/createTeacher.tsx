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
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Close } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { USER_TYPE, USER_TYPE_NAME } from "@/constants/users";
import { useCreateTeacherMutation, useUpdateTeacherMutation } from "@/hooks/useTeachers";

// Adjusted type for teacher info
type CreateTeacherDialogProps = {
  open: boolean;
  onClose: () => void;
  teacherInfo?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    userType: USER_TYPE;
  };
};

const CreateTeacherDialog = ({
  open,
  onClose,
  teacherInfo,
}: CreateTeacherDialogProps) => {
  const { mutate: createTeacher } = useCreateTeacherMutation();
  const { mutate: updateTeacher } = useUpdateTeacherMutation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const isEditMode = Boolean(teacherInfo);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    userType: Yup.number().required("User type is required"),
  });

  const initialValues = {
    name: teacherInfo?.name || "",
    email: teacherInfo?.email || "",
    phone: teacherInfo?.phone || "",
    address: teacherInfo?.address || "",
    city: teacherInfo?.city || "",
    userType: teacherInfo?.userType ?? 9,
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        {isEditMode ? "Update Teacher" : "Create Teacher"}
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          enqueueSnackbar(isEditMode ? "Updating teacher..." : "Creating teacher...");
          const payload = { ...values };

          if (isEditMode && teacherInfo) {
            updateTeacher(
              { id: teacherInfo.id, ...payload },
              {
                onSuccess: () => {
                  closeSnackbar();
                  enqueueSnackbar("Teacher updated successfully", {
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
            createTeacher(payload, {
              onSuccess: () => {
                closeSnackbar();
                enqueueSnackbar("Teacher created successfully", {
                  variant: "success",
                });
                onClose();
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
              {/* Name */}
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="name" />}
                error={touched.name && Boolean(errors.name)}
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
              {/* Phone */}
              <Field
                as={TextField}
                name="phone"
                label="Phone"
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="phone" />}
                error={touched.phone && Boolean(errors.phone)}
              />
              {/* Address */}
              <Field
                as={TextField}
                name="address"
                label="Address"
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="address" />}
                error={touched.address && Boolean(errors.address)}
              />
              {/* City */}
              <Field
                as={TextField}
                name="city"
                label="City"
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="city" />}
                error={touched.city && Boolean(errors.city)}
              />
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

export default CreateTeacherDialog;
