"use client";

import React, { useEffect, useRef } from "react";
import { Box, Typography, IconButton, Card, CardContent } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function BadgeSection({
  skills,
}: {
  skills: { url: string; title: string; alt: string }[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(true);

  // useEffect(() => {
  //   function handleScroll() {
  //     if (scrollRef.current) {
  //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
  //       setShowLeft(scrollLeft > 0);
  //       setShowRight(scrollLeft + clientWidth < scrollWidth);
  //     }
  //   }

  //   // Update visibility on initial render
  //   handleScroll();

  //   // Listen for scrolling within the badges box
  //   const scroller = scrollRef.current;
  //   scroller?.addEventListener("scroll", handleScroll);

  //   // Set up window scroll listener for auto scroll badges
  //   function windowScrollHandler() {
  //     if (scrollRef.current) {
  //       // You can adjust the delta for scrolling amount based on window scroll
  //       const delta = window.scrollY * 0.1; // adjust multiplier as desired

  //       scrollRef.current.scrollTo({ left: delta, behavior: "smooth" });
  //     }
  //   }
  //   window.addEventListener("scroll", windowScrollHandler);

  //   return () => {
  //     scroller?.removeEventListener("scroll", handleScroll);
  //     window.removeEventListener("scroll", windowScrollHandler);
  //   };
  // }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;

      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth);
      const newPosition =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ py: 5, px: { xs: 2, md: 5 }, bgcolor: "grey.100" }}>
      <Typography
        variant="h3"
        color="primary.main"
        sx={{ fontWeight: 600, mb: 3 }}
      >
        Skills
      </Typography>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            gap: 2,
            px: 1,
          }}
          ref={scrollRef}
        >
          {skills.map((skill, i) => (
            <Card
              key={i}
              sx={{
                minWidth: 250,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 2,
                px: 1,
                boxShadow: 3,
                cursor: "default",
                backgroundColor: "primary.main",
              }}
            >
              <img
                src={skill.url}
                alt={skill.alt}
                width={64}
                height={64}
                style={{ marginBottom: 8 }}
              />
              <CardContent sx={{ p: 0, textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {skill.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {showLeft && (
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              bgcolor: "grey.100",
              opacity: 0.5,
              boxShadow: 2,
              "&:hover": { bgcolor: "grey.100" },
              zIndex: 10,
            }}
            aria-label="Scroll Left"
          >
            <ChevronLeftIcon />
          </IconButton>
        )}

        {showRight && (
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              opacity: 0.5,
              transform: "translateY(-50%)",
              bgcolor: "grey.100",
              boxShadow: 2,
              "&:hover": { bgcolor: "grey.100" },
              zIndex: 10,
            }}
            aria-label="Scroll Right"
          >
            <ChevronRightIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
