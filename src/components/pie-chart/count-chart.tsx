"use client";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Box, Typography, Paper } from "@mui/material";

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 53,
    fill: "#C3EBFA",
  },
];

const CountChart = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Title */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Students
        </Typography>
      </Box>

      {/* Chart */}
      <Box position="relative" width="100%" flex="1" minHeight={200} mb={2}>
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            height={250}
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" fill="#8884d8" />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center icon */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: "translate(-50%, -50%)" }}
        ></Box>
      </Box>

      {/* Legend/Bottom Section */}
      <Box display="flex" justifyContent="center" gap={8}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={0.5}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: "#C3EBFA", // boys color
              borderRadius: "50%",
            }}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            1,234
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Boys (55%)
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={0.5}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: "#FAE27C", // girls color
              borderRadius: "50%",
            }}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            1,234
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Girls (45%)
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CountChart;
