"use client";
import React, { useState } from "react";

import { Edit, Delete } from "@mui/icons-material";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";

type Student = {
  id: number;
  name: string;
  email: string;
  grade: string;
};

const initialStudents: Student[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", grade: "A" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", grade: "B" },
];

export default function StudentDashboard() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", grade: "" });

  const handleOpen = (index: number | null = null) => {
    setEditIndex(index);
    if (index !== null) {
      setForm(students[index]);
    } else {
      setForm({ name: "", email: "", grade: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setForm({ name: "", email: "", grade: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = { ...updated[editIndex], ...form };
      setStudents(updated);
    } else {
      setStudents([...students, { id: Date.now(), ...form }]);
    }
    handleClose();
  };

  const handleDelete = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Student Management Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Student
      </Button>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, idx) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(idx)}
                    aria-label="edit"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(idx)}
                    aria-label="delete"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editIndex !== null ? "Edit Student" : "Add Student"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Grade"
            name="grade"
            value={form.grade}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!form.name || !form.email || !form.grade}
          >
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
