"use client";
import React from "react";
import Box from "@mui/material/Box";
import StatCard from "@/components/card";
import AttendancePieChart from "@/components/pie-chart/count-chart";
import AttendanceChart from "@/components/pie-chart/atendence-xy-chart";

export default function DashboardPage() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {[
          { year: "2024", count: 1200, label: "Students" },
          { year: "2024", count: 80, label: "Teachers" },
          { year: "2024", count: 300, label: "Parents" },
          { year: "2024", count: 40, label: "Staffs" },
        ].map((item) => (
          <Box
            key={item.label}
            sx={{
              minWidth: 250,
              maxWidth: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <StatCard {...item} />
            {/* Attendance Pie Chart */}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {/* Pie Chart Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 300,
          }}
        >
          <AttendancePieChart />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: "#f06292",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <span>Girls: 540</span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: "#42a5f5",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <span>Boys: 660</span>
            </Box>
          </Box>
        </Box>
        {/* Stick Chart Section */}
        <AttendanceChart />
      </Box>
    </Box>
  );
}
