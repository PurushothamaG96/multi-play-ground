"use client";

import React from "react";
import { Box, Container, IconButton, Typography, Divider } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Grid from "@mui/material/Grid";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#181716", color: "grey.100", pt: 6, pb: 4 }}
    >
      <Container maxWidth="lg">
        {/* 🔥 Top row: replaced Grid with Box for flex layout */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap", // responsive wrap if small screens
            mb: 4,
          }}
        >
          {/* Logo / Title */}
          <Typography
            variant="h6"
            sx={{ color: "common.white", fontWeight: 700 }}
          >
            Purushothama G
          </Typography>

          {/* Social Icons */}
          <Box>
            <IconButton
              sx={{ bgcolor: "common.white", width: 40, height: 40, mx: 0.5 }}
            >
              <InstagramIcon sx={{ color: "#111" }} />
            </IconButton>
            <IconButton
              sx={{ bgcolor: "common.white", width: 40, height: 40, mx: 0.5 }}
            >
              <FacebookIcon sx={{ color: "#111" }} />
            </IconButton>
            <IconButton
              sx={{ bgcolor: "common.white", width: 40, height: 40, mx: 0.5 }}
            >
              <TwitterIcon sx={{ color: "#111" }} />
            </IconButton>
            <IconButton
              sx={{ bgcolor: "common.white", width: 40, height: 40, mx: 0.5 }}
            >
              <LinkedInIcon sx={{ color: "#111" }} />
            </IconButton>
          </Box>
        </Box>

        {/* 🔥 Middle row: keep using Grid for columns */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} component={"div" as any}>
            <Typography
              variant="subtitle1"
              sx={{ color: "common.white", mb: 2, fontWeight: 600 }}
            >
              About Us
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400" }}>
              SchoolPortfolio is dedicated to empowering students with practical
              resources and expert guidance to build standout portfolios and
              launch rewarding careers. Founded by educators and career
              professionals, our platform bridges the gap between academic
              achievement and real-world opportunities. Through comprehensive
              guides, curated tools, and a supportive online community, we help
              students highlight their strengths and showcase their talents to
              universities and employers. Our mission is to make career success
              accessible to every learner, no matter their background. Join
              thousands of students using SchoolPortfolio to unlock new
              possibilities, discover their passions, and prepare for the next
              step in their educational or professional journey.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} component={"div" as any}>
            <Typography
              variant="subtitle1"
              sx={{ color: "common.white", mb: 2, fontWeight: 600 }}
            >
              Quick Links
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400", mb: 1 }}>
              Home
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400", mb: 1 }}>
              About
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400", mb: 1 }}>
              Services
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400", mb: 1 }}>
              Contact
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} component={"div" as any}>
            <Typography
              variant="subtitle1"
              sx={{ color: "common.white", mb: 2, fontWeight: 600 }}
            >
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400" }}>
              Email: info@schoolportfolio.com
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400" }}>
              Phone: +91 98765 43210
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400" }}>
              Location: Bangalore, India
            </Typography>
          </Grid>
        </Grid>

        {/* 🔥 Bottom row */}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 3 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            color: "grey.400",
            fontSize: 14,
          }}
        >
          <Typography>
            © {new Date().getFullYear()} School Portfolio. All rights reserved.
          </Typography>
          <Typography>Privacy Policy | Terms</Typography>
        </Box>
      </Container>
    </Box>
  );
}
