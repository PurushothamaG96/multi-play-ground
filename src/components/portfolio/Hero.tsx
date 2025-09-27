import { Box, Container, Typography, Button } from "@mui/material";
import Image from "next/image";

export default function Hero({ title, subtitle, image, heroSub }: any) {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText", // fixed color
        py: { xs: 6, md: 10 }, // smaller padding on mobile
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // stack on mobile
          alignItems: "center",
          gap: { xs: 3, md: 4 },
          textAlign: { xs: "center", md: "left" }, // center text on mobile
        }}
      >
        {/* Text */}
        <Box flex={1}>
          <Typography
            variant="h6"
            mb={3}
            sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            {heroSub}
          </Typography>
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            mb={3}
            sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            {subtitle}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Get Started
          </Button>
        </Box>

        {/* Image */}
        <Box flex={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={image}
            alt={title}
            width={400}
            height={450}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
