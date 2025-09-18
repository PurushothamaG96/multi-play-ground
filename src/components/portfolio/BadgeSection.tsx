import { Box, Chip, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

interface BadgeSectionProps {
  badges: string[];
}

export default function BadgeSection({ badges }: BadgeSectionProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        py: 6,
        px: 4,
        mt: 6,
        textAlign: "center",
        borderRadius: "2xl",
        background: "linear-gradient(135deg, #f9f9f9, #f0f4ff)",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        Our Values & Strengths
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Chip
              label={badge}
              color="primary"
              variant="outlined"
              sx={{
                px: 2,
                py: 1,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "12px",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Paper>
  );
}
