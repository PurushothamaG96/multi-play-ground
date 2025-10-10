"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const SOCIAL_MEDIA = ["Linkdin", "GitHub", "LeetCode"];

export default function Contact() {
  const initialValue = {
    name: "",
    email: "",
    message: "",
  };

  const contactSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    message: Yup.string(),
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Box
      minHeight="100vh"
      sx={{ bgcolor: "common.white", color: "primary.contrastText" }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 1,
          bgcolor: "primary.main",
          py: { xs: 2.5, md: 5 },
          marginTop: 8,
        }}
      >
        <Typography variant="h2">Contact</Typography>
      </Box>

      <Box
        sx={{
          boxShadow: { xs: 5, md: 10 },
          margin: { xs: 5, md: 10 },
          padding: { xs: 2, md: 5 },
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          I'm currently taking on freelance work. If you are interested in
          hiring me for your project please use the form below to get in touch.
          Want to know how I work and what I can offer? Check out my project
          case studies and resume.
        </Typography>
        <Typography>You can also find me on the following channels</Typography>
        <Box
          marginTop={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          {SOCIAL_MEDIA.map((links) => (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={70}
              height={70}
              sx={{ boxShadow: 5, borderRadius: 2 }}
            >
              {links}
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        bgcolor="primary.light"
        sx={{
          boxShadow: { xs: 5, md: 10 },
          margin: { xs: 5, md: 10 },
          padding: { xs: 2, md: 5 },
          textAlign: "center",
        }}
      >
        <Box>
          <Formik
            initialValues={initialValue}
            validationSchema={contactSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Box
                  display="flex"
                  gap={2}
                  alignItems={{ xs: "col", md: "row" }}
                >
                  <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    type="name"
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="name" />}
                    error={touched.name && Boolean(errors.name)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "primary.main", // Custom border color
                        },
                      },
                    }}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "primary.main", // Custom border color
                        },
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Field
                    as={TextField}
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    required
                    helperText={<ErrorMessage name="message" />}
                    error={touched.message && Boolean(errors.message)}
                    sx={{
                      color: "primary.contrastText",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "info.darker", // ensure input root background matches
                        "& fieldset": {
                          borderColor: "primary.main",
                        },
                      },
                    }}
                  />
                </Box>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
