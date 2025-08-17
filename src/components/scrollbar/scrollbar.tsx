"use client";

import { memo, forwardRef, useEffect, useState } from "react";
// @mui
import Box from "@mui/material/Box";
//
import { StyledRootScrollbar, StyledScrollbar } from "./styles";
import { ScrollbarProps } from "./types";

// ----------------------------------------------------------------------

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ children, sx, ...other }, ref) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      // Run only on client
      if (typeof navigator !== "undefined") {
        setIsMobile(
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        );
      }
    }, []);

    if (isMobile) {
      return (
        <Box ref={ref} sx={{ overflow: "auto", ...sx }} {...other}>
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar
          scrollableNodeProps={{
            ref,
          }}
          clickOnTrack={false}
          sx={sx}
          {...other}
        >
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  }
);

export default memo(Scrollbar);
