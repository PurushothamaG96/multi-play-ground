import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to your dashboard page built with Next.js and Material-UI!
      </Typography>
    </Box>
  );
}
