import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ py: 3, textAlign: "center", bgcolor: "grey.200" }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} School Portfolio
      </Typography>
    </Box>
  );
}
