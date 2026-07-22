import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  ADD_DEPART,
  DELETE_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from "../../apollo/mutations/adminMutation";
import { GET_DEPARTMENT } from "../../apollo/queries/adminQuery";
// import type { SelectChangeEvent } from "@mui/material";

interface FormErrors {
  department?: string;
}

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    department: "",
  });
  const [err, setErr] = useState({});
  const [editId, setEditId] = useState<number | null>(null);
  const [addDepartment] = useMutation(ADD_DEPART);
  const { data, loading, error, refetch } = useQuery(GET_DEPARTMENT, {
    fetchPolicy: "cache-and-network",
  });
  const [updateMutation] = useMutation(UPDATE_DEPARTMENT);
  const [deleteMutation] = useMutation(DELETE_DEPARTMENT);


  const customeValidate = () => {
    const formErrors: FormErrors = {};
    let isValid = true;
    const stringPattern = /^[A-Za-z\s'-]+$/;

    if (!formData.department.trim()) {
      formErrors.department = "Department is required";
      isValid = false;
    } else if (!stringPattern.test(formData.department)) {
      formErrors.department = "Only Characters are allowed";
      isValid = false;
    }

    setErr(formErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErr({ ...err, [e.target.name]: "" });
  };

  const updateDepartment = (department: any) => {
    setEditId(department.id);
    setFormData({
      department: department.department,
    });
  };

  const removeDepartment = async (id:string)=>{
    try {
    await deleteMutation({
      variables: {
        id,
      },
    });

    await refetch();
  } catch (error) {
    console.error(error);
  }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = customeValidate();
    if (!valid) return;
    try {
      if (editId) {
        await updateMutation({
          variables: {
            input: {
              id: editId,
              department: formData.department,
            },
          },
        });
      } else {
        await addDepartment({
          variables: {
            input: formData,
          },
        });
      }
      await refetch();
      setFormData({
        department: "",
      });
      setEditId(null);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  };

  //   console.log(formData)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Add Department
        </Typography>

        <Typography color="text.secondary">Fill the departments.</Typography>
      </Box>

      <Box
        component="form"
        noValidate
        autoComplete="On"
        onSubmit={handleSubmit}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
            }}
          >
            <TextField
              label="Department"
              fullWidth
              name="department"
              value={formData.department}
              onChange={handleChange}
            />

            <Button
              variant="outlined"
              onClick={() => {
                setFormData({ ...formData, department: "" });
                setEditId(null);
                setErr({...err, department: ""})
              }}
            >
              Clear
            </Button>

            <Button variant="contained" type="submit">
              {editId ? "Update Department" : "Add Department"}
            </Button>
          </Box>
          {err.department && <p style={{ color: "red" }}>{err?.department}</p>}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          ></Box>
        </Paper>
      </Box>

      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Department Name</TableCell>

              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.viewDepartment.map((department: any) => (
              <TableRow key={department.id} hover>
                <TableCell>{department.id}</TableCell>

                <TableCell>{department.department}</TableCell>

                <TableCell align="center" >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => updateDepartment(department)}
                  >
                    Edit
                  </Button>

                  <Button 
                  color="error" 
                  size="small"
                  sx={{ml:'20px'}}
                  onClick={()=>removeDepartment(department.id)}
                  >
                    Delete
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

export default AddDepartment;
