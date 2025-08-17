"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDeleteUserMutation, useUsersQuery } from "@/hooks/useUser";
import Scrollbar from "@/components/scrollbar";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
} from "@/components/table";
import { User, USER_TYPE, USER_TYPE_NAME } from "@/constants/users";
import CreateUserDialog from "@/components/user/createUser";
import ConfirmDialog from "@/components/delete/confirmDelete";

const TABLE_HEAD = [
  { id: "userName", name: "Name" },
  { id: "email", name: "Email" },
  { id: "userType", name: "Type" },
  { id: "actions", name: "Actions", align: "right" },
];

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editUser, setEditUser] = React.useState<User | null>(null);
  const [openEditDialog, setEditDialog] = React.useState(false);
  // delete confirmation state
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading, isError } = useUsersQuery({
    page,
    pageSize: rowsPerPage,
    search,
  });

  const deleteUser = useDeleteUserMutation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setSearch(searchInput);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const deleteUserMutation = useDeleteUserMutation();

  const handleDelete = (id: number) => {
    setSelectedUserId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      deleteUserMutation.mutate(selectedUserId);
    }
    setConfirmOpen(false);
    setSelectedUserId(null);
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
    setEditDialog(true);
  };

  return (
    <Box padding={2}>
      <Box
        display={"flex"}
        justifyContent={{ xs: "start", sm: "space-between" }}
        alignItems={{ xs: "center" }}
      >
        <CustomBreadcrumbs
          heading="Users"
          links={[]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Button onClick={() => setOpenDialog(true)} variant="contained">
          + New User
        </Button>
      </Box>

      {/* Search */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{ display: "flex", gap: 2, mb: 2 }}
      >
        <TextField
          placeholder="Search users..."
          size="small"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </Box>

      <Card>
        <TableContainer sx={{ position: "relative", overflow: "auto" }}>
          <Scrollbar>
            <Table sx={{ minWidth: 720, width: "100%" }}>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ color: "red" }}>
                      Failed to load users
                    </TableCell>
                  </TableRow>
                ) : data?.users.length === 0 ? (
                  <TableNoData notFound />
                ) : (
                  data?.users.map((user: any) => (
                    <TableRow key={user.id} hover>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {USER_TYPE_NAME[user.userType as USER_TYPE]}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(user)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(user.id)}>
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
      <CreateUserDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
      {editUser && (
        <CreateUserDialog
          open={openEditDialog}
          onClose={() => setOpenDialog(false)}
          userInfo={editUser}
        />
      )}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
