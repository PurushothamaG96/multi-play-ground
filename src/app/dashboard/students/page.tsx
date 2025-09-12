"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Scrollbar from "@/components/scrollbar";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
} from "@/components/table";
import { USER_TYPE, USER_TYPE_NAME } from "@/constants/users";
import { Students } from "@/constants/students";

import CreateStudentDialog from "@/components/student/createStudent";
import ConfirmDialog from "@/components/delete/confirmDelete";
import {
  useDeleteStudentMutation,
  useStudentsQuery,
} from "@/hooks/useStudents";

const TABLE_HEAD = [
  { id: "name", name: "Name" },
  { id: "email", name: "Email" },
  { id: "phone", name: "Phone" },
  { id: "city", name: "City" },
  { id: "fullAddress", name: "Address" },
  { id: "userType", name: "Type" },
  { id: "actions", name: "Actions", align: "right" },
];

export default function StudentsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editStudent, setEditStudent] = useState<Students | null>(null);
  const [search, setSearch] = useState("");

  // delete confirmation state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading, isError } = useStudentsQuery({
    page,
    pageSize: rowsPerPage,
    search,
  });
  const deleteStudent = useDeleteStudentMutation();

  const handleEdit = (student: Students) => {
    setEditStudent(student);
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) deleteStudent.mutate(selectedId);
    setConfirmOpen(false);
    setSelectedId(null);
  };

  return (
    <Box padding={2}>
      <Box
        display="flex"
        justifyContent={{ xs: "start", sm: "space-between" }}
        alignItems="center"
      >
        <CustomBreadcrumbs
          heading="Students"
          links={[]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          + New Student
        </Button>
      </Box>

      <Card>
        <TableContainer sx={{ position: "relative", overflow: "auto" }}>
          <Scrollbar>
            <Table sx={{ minWidth: 800 }}>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ color: "red" }}>
                      Failed to load students
                    </TableCell>
                  </TableRow>
                ) : data?.students.length === 0 ? (
                  <TableNoData notFound />
                ) : (
                  data?.students.map((student: Students) => (
                    <TableRow key={student.id} hover>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.city}</TableCell>
                      <TableCell>{student.fullAddress}</TableCell>
                      <TableCell>
                        {USER_TYPE_NAME[student.userType as USER_TYPE]}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(student)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(student.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={data?.total || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Card>

      <CreateStudentDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        studentInfo={editStudent || undefined}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Student"
        description="Are you sure you want to delete this student? This action cannot be undone."
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
