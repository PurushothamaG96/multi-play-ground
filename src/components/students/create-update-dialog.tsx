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
  Box,
} from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Close } from "@mui/icons-material";
import { useSnackbar } from "notistack";

import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "@/hooks/useStudentParent";
import { GENDER, PARENT_RELATION } from "@/constants/system";
import { UpdateStudentDto } from "@/interfaces/student";

type CreateStudentDialogProps = {
  open: boolean;
  onClose: () => void;
  studentInfo?: UpdateStudentDto; // for edit mode
};

const CreateStudentDialog = ({
  open,
  onClose,
  studentInfo,
}: CreateStudentDialogProps) => {
  const { mutate: createStudent } = useCreateStudentMutation();
  const { mutate: updateStudent } = useUpdateStudentMutation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const isEditMode = Boolean(studentInfo);

  // Validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last name is required"),
    gender: Yup.number().required("Gender is required"),

    parent: Yup.object({
      motherName: Yup.string().required("Mother name is required"),
      fatherName: Yup.string().required("Father name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      occupation: Yup.string(),
      city: Yup.string().required("City is required"),
      fullAddress: Yup.string().required("Address is required"),
      relation: Yup.string().required("Relation is required"),
    }),
  });

  // Initial values
  const initialValues = {
    firstName: studentInfo?.firstName || "",
    middleName: studentInfo?.middleName || "",
    lastName: studentInfo?.lastName || "",
    gender: studentInfo?.gender ?? GENDER.MALE,
    parent: {
      motherName: studentInfo?.parent?.motherName || "",
      fatherName: studentInfo?.parent?.fatherName || "",
      email: studentInfo?.parent?.email || "",
      phone: studentInfo?.parent?.phone || "",
      occupation: studentInfo?.parent?.occupation || "",
      city: studentInfo?.parent?.city || "",
      fullAddress: studentInfo?.parent?.fullAddress || "",
      relation: studentInfo?.parent?.relation ?? PARENT_RELATION.FATHER,
    },
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        {isEditMode ? "Update Student" : "Create Student"}
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          enqueueSnackbar(
            isEditMode ? "Updating student..." : "Creating student..."
          );

          if (isEditMode && studentInfo) {
            updateStudent(
              { id: studentInfo.id, ...values },
              {
                onSuccess: () => {
                  closeSnackbar();
                  enqueueSnackbar("Student updated successfully", {
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
            createStudent(values, {
              onSuccess: () => {
                closeSnackbar();
                enqueueSnackbar("Student created successfully", {
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
              <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                alignItems="flex-start"
              >
                {/* Student Info */}
                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="firstName" />}
                    error={touched.firstName && Boolean(errors.firstName)}
                  />
                </Box>
                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="middleName"
                    label="Middle Name"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="middleName" />}
                    error={touched.middleName && Boolean(errors.middleName)}
                  />
                </Box>
                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="lastName" />}
                    error={touched.lastName && Boolean(errors.lastName)}
                  />
                </Box>
                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="gender"
                    label="Gender"
                    select
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="gender" />}
                    error={touched.gender && Boolean(errors.gender)}
                  >
                    {Object.entries(GENDER).map(([key, value]) => (
                      <MenuItem key={key} value={value}>
                        {key}
                      </MenuItem>
                    ))}
                  </Field>
                </Box>

                {/* Parent Info */}
                <Box flex="1 1 100%" maxWidth="33%">
                  <h4>Parent Information</h4>
                </Box>

                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="parent.motherName"
                    label="Mother Name"
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="parent.motherName" />}
                    error={
                      touched.parent?.motherName &&
                      Boolean(errors.parent?.motherName)
                    }
                  />
                </Box>
                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="parent.fatherName"
                    label="Father Name"
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="parent.fatherName" />}
                    error={
                      touched.parent?.fatherName &&
                      Boolean(errors.parent?.fatherName)
                    }
                  />
                </Box>

                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="parent.email"
                    label="Parent Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="parent.email" />}
                    error={
                      touched.parent?.email && Boolean(errors.parent?.email)
                    }
                  />
                </Box>
                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="parent.phone"
                    label="Parent Phone"
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="parent.phone" />}
                    error={
                      touched.parent?.phone && Boolean(errors.parent?.phone)
                    }
                  />
                </Box>

                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="parent.occupation"
                    label="Occupation"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="parent.occupation" />}
                    error={
                      touched.parent?.occupation &&
                      Boolean(errors.parent?.occupation)
                    }
                  />
                </Box>
                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="parent.city"
                    label="City"
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="parent.city" />}
                    error={touched.parent?.city && Boolean(errors.parent?.city)}
                  />
                </Box>

                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="parent.fullAddress"
                    label="Full Address"
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="parent.fullAddress" />}
                    error={
                      touched.parent?.fullAddress &&
                      Boolean(errors.parent?.fullAddress)
                    }
                  />
                </Box>

                <Box flex="1 1 100%" maxWidth="33%">
                  <Field
                    as={TextField}
                    name="parent.relation"
                    label="Relation"
                    select
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="parent.relation" />}
                    error={
                      touched.parent?.relation &&
                      Boolean(errors.parent?.relation)
                    }
                  >
                    {Object.entries(PARENT_RELATION).map(([key, value]) => (
                      <MenuItem key={key} value={value}>
                        {key}
                      </MenuItem>
                    ))}
                  </Field>
                </Box>
              </Box>
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

export default CreateStudentDialog;
