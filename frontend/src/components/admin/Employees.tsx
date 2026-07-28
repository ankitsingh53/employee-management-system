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
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { GET_DEPARTMENT, GET_EMPLOYEE } from "../../apollo/queries/adminQuery";
import { DELETE_EMP } from "../../apollo/mutations/adminMutation";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";

interface DepartmentData {
  viewDepartment: Array<{
    id: string;
    department: string;
  }>;
}

interface EmployeeDataResponse {
  getEmployee?: {
    employees: Array<{
      id: number;
      status: boolean | true;
      firstName: string;
      lastName: string;
      email: string;
      department: Array<{
        department: string;
      }>;
      phoneNumber: string;
      designation: string;
      salary: string;
      joiningDate: string;
    }>;
    totalCount: number;
  };
}

const Employees = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchBy, setSearchBy] = useState("firstName");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, loading, error } = useQuery<EmployeeDataResponse>(
    GET_EMPLOYEE,
    {
      variables: {
        page: page + 1,
        limit: rowsPerPage,
        search: debouncedSearch,
        searchBy,
      },
    },
  );
  const { data: departmentData } = useQuery<DepartmentData>(GET_DEPARTMENT);
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value));

    setPage(0);
  };
  const [deleteEmployee] = useMutation(DELETE_EMP);
  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee({
        variables: {
          id,
        },
        refetchQueries: [
          {
            query: GET_EMPLOYEE,
            variables: {
              page: page + 1,
              limit: rowsPerPage,
              search: debouncedSearch,
              searchBy,
            },
          },
        ],
        awaitRefetchQueries: true,
      });
      if (!message) {
        toast.success(" Deactivated Successfully", {
          autoClose: 2000,
        });
      } else {
        toast.success(" Activated Successfully", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  if (loading) return <Loader />;
  if (error) return <h2>`Error: ${error.message}`</h2>;
  return (
    <Box sx={{ width: "100%" }}>
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
          {searchBy === "joiningDate" ? (
            <TextField
              type="date"
              fullWidth
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          ) : searchBy === "department" ? (
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>

              <Select
                value={search}
                label="Department"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
              >
                {departmentData?.viewDepartment?.map((dept) => (
                  <MenuItem key={dept.id} value={dept.department}>
                    {dept.department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              fullWidth
              label="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
          )}

          {/* Dropdown */}
          <FormControl sx={{ width: "40%" }}>
            <InputLabel>Search By</InputLabel>

            <Select
              value={searchBy}
              label="Search By"
              onChange={(e) => {
                setSearchBy(e.target.value);
                setSearch("");
                setDebouncedSearch("");
                setPage(0);
              }}
            >
              <MenuItem value="firstName">Name</MenuItem>

              <MenuItem value="email">Email</MenuItem>

              <MenuItem value="department">Department</MenuItem>

              <MenuItem value="designation">Designation</MenuItem>

              <MenuItem value="joiningDate">Joining Date</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
        }}
      >
        {!data?.getEmployee ? <h1>Add Some Employee to organisation</h1>: (
          <Box>
        <Table>
          <TableHead>
            <TableRow>
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
            {data?.getEmployee?.employees.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{
                  backgroundColor:
                    employee.status === true ? "#f5f5f5" : "inherit",
                }}
                hover
              >
                <TableCell
                  sx={{ opacity: employee.status === false ? 0.5 : 1 }}
                >
                  {`${employee.firstName} ${employee.lastName}`}
                </TableCell>

                <TableCell
                  sx={{ opacity: employee.status === false ? 0.5 : 1 }}
                >
                  {employee.email}
                </TableCell>

                <TableCell
                  sx={{ opacity: employee.status === false ? 0.5 : 1 }}
                >
                  {employee?.department[0]
                    ? employee?.department[0].department
                    : "Not assigned"}
                </TableCell>

                <TableCell
                  sx={{ opacity: employee.status === false ? 0.5 : 1 }}
                >
                  {employee.phoneNumber}
                </TableCell>

                <TableCell
                  sx={{ opacity: employee.status === false ? 0.5 : 1 }}
                >
                  {employee.designation}
                </TableCell>

                <TableCell
                  sx={{ opacity: employee.status === false ? 0.5 : 1 }}
                >
                  {employee.salary}
                </TableCell>

                <TableCell
                  sx={{ opacity: employee.status === false ? 0.5 : 1 }}
                >
                  {employee.joiningDate}
                </TableCell>

                <TableCell>
                  <Chip
                    label={employee.status ? "Active" : "Inactive"}
                    color={employee.status === true ? "success" : "error"}
                  />
                </TableCell>

                <TableCell align="center">
                  {employee.status === true ? (
                    <Stack spacing={0.2}>
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
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color={employee.status === true ? "error" : "success"}
                        size="small"
                        onClick={() => {
                          handleDelete(employee.id);
                          setMessage(true);
                        }}
                      >
                        {employee.status ? "" : "Activate"}
                      </Button>
                    </Stack>
                  ) : (
                    <Button
                      variant="contained"
                      color={employee.status ? "error" : "success"}
                      size="small"
                      onClick={() => {
                        handleDelete(employee.id);
                        setMessage(false);
                      }}
                    >
                      {employee.status ? "Deactivate" : "Activate"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data?.getEmployee?.totalCount ?? 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 7, 10]}
        />
        </Box>
        )}
        
      </Paper>
    </Box>
  );
};

export default Employees;
