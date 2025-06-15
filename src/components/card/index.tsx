import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface CardProps {
    year: string;
    count: number;
    label: "Students" | "Teachers" | "Parents" | "Staffs";
}

const StatCard: React.FC<CardProps> = ({ year, count, label }) => (
    <Card sx={{ width: 220, borderRadius: 3, boxShadow: 3 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
                {year}
            </Typography>
            <Typography variant="h3" fontWeight={700} sx={{ my: 2 }}>
                {count}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {label}
            </Typography>
        </CardContent>
    </Card>
);

export default StatCard;