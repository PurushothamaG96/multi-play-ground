"use client";

import React from "react";
import ReactPlayer from "react-player/youtube";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

export default function YouTube() {
  return (
    <Card sx={{ maxWidth: 640, margin: "auto" }}>
      <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          controls
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Rick Astley - Never Gonna Give You Up
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Classic 80s music video embedded using ReactPlayer and Material UI.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href="https://youtu.be/dQw4w9WgXcQ"
          target="_blank"
        >
          Watch on YouTube
        </Button>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}
