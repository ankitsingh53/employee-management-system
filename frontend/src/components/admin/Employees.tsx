import { useMutation, useQuery } from "@apollo/client/react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GET_EMPLOYEE } from "../../apollo/queries/adminQuery";
import { DELETE_EMP } from "../../apollo/mutations/adminMutation";
import { toast } from "react-toastify";

const Employees = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_EMPLOYEE);
  console.log(data);
  const [deleteEmployee] = useMutation(DELETE_EMP);
  // console.log(data)
  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee({
        variables: {
          id,
        },
        refetchQueries: [{ query: GET_EMPLOYEE }],
        awaitRefetchQueries: true,
      });
      toast.success("Deleted Successfully", {
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Employees
          </Typography>

          <Typography color="text.secondary">Manage all employees</Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/admin/add-employee")}
        >
          Add Employee
        </Button>
      </Box>

      {/* Search */}

      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <TextField label="Search Employee" fullWidth />

          <FormControl sx={{ width: 180 }}>
            <InputLabel>Department</InputLabel>

            <Select label="Department" defaultValue="">
              <MenuItem value="">All</MenuItem>

              <MenuItem value="IT">IT</MenuItem>

              <MenuItem value="HR">HR</MenuItem>

              <MenuItem value="Finance">Finance</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: 180 }}>
            <InputLabel>Status</InputLabel>

            <Select label="Status" defaultValue="">
              <MenuItem value="">All</MenuItem>

              <MenuItem value="Active">Active</MenuItem>

              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Table */}

      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Designation</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Joining Date</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>

              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.getEmployee.map((employee) => (
              <TableRow 
              key={employee.id} 
              sx={{
                backgroundColor: employee.status === true ? "#f5f5f5" : "inherit",
              }}
              hover
              >
                <TableCell>{employee.id}</TableCell>

                <TableCell>{employee.firstName}</TableCell>

                <TableCell>{employee.email}</TableCell>

                <TableCell>
                  {employee?.department[0]
                    ? employee?.department[0].department
                    : "Not assigned"}
                </TableCell>

                <TableCell>{employee.phoneNumber}</TableCell>

                <TableCell>{employee.designation}</TableCell>

                <TableCell>{employee.salary}</TableCell>

                <TableCell>{employee.joiningDate}</TableCell>

                <TableCell>
                  <Chip
                    label={employee.status ? "Active":"Inactive"}
                    color={employee.status === true ? "success" : "error"}
                  />
                </TableCell>

                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      navigate(`/admin/edit-employee/${employee.id}`)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    color={employee.status === true ? "error" : "success"}
                    size="small"
                    onClick={() => handleDelete(employee.id)}
                  >
                    {employee.status ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Employees;
