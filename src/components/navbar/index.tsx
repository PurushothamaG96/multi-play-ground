"use client";

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function Navbar({ logo }: { logo: { url: string } }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // detect > 1vh
      setScrolled(window.scrollY > window.innerHeight * 0.01);
    };

    onScroll(); // run once if page is reloaded mid-scroll
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? "primary.lighter" : "primary.main",
          color: scrolled ? "common.black" : "common.white",
          transition:
            "background-color 0.45s ease, color 0.45s ease, box-shadow 0.3s ease",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={logo.url} alt="Logo" style={{ height: 80 }} />
          </Box>

          <Box sx={{ display: "flex", gap: 10 }}>
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              Home
            </Typography>
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              About
            </Typography>
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              Contact
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" sx={{ backgroundColor: "info.main" }}>
              Hire Me
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
