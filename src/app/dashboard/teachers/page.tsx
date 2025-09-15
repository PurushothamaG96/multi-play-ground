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
import { Teachers } from "@/interfaces/teachers";

import CreateTeacherDialog from "@/components/teacher/createTeacher";
import ConfirmDialog from "@/components/delete/confirmDelete";
import { useDeleteTeacherMutation, useTeachersQuery } from "@/hooks/useTeachers";

const TABLE_HEAD = [
  { id: "name", name: "Name" },
  { id: "email", name: "Email" },
  { id: "phone", name: "Phone" },
  { id: "city", name: "City" },
  { id: "fullAddress", name: "Address" },
  { id: "userType", name: "Type" },
  { id: "actions", name: "Actions", align: "right" },
];

export default function TeachersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editTeacher, setEditTeacher] = useState<Teachers | null>(null);
  const [search, setSearch] = useState("");

  // delete confirmation state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading, isError } = useTeachersQuery({
    page,
    pageSize: rowsPerPage,
    search,
  });
  const deleteTeacher = useDeleteTeacherMutation();

  const handleEdit = (teacher: Teachers) => {
    setEditTeacher(teacher);
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) deleteTeacher.mutate(selectedId);
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
          heading="Teachers"
          links={[]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          + New Teacher
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
                      Failed to load teachers
                    </TableCell>
                  </TableRow>
                ) : data?.teachers.length === 0 ? (
                  <TableNoData notFound />
                ) : (
                  data?.teachers.map((teacher: Teachers) => (
                    <TableRow key={teacher.id} hover>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.phone}</TableCell>
                      <TableCell>{teacher.city}</TableCell>
                      <TableCell>{teacher.fullAddress}</TableCell>
                      <TableCell>
                        {USER_TYPE_NAME[teacher.userType as USER_TYPE]}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(teacher)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(teacher.id)}>
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

      <CreateTeacherDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        teacherInfo={editTeacher || undefined}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Teacher"
        description="Are you sure you want to delete this teacher? This action cannot be undone."
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
