import { useMutation, useQuery } from "@apollo/client/react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { MY_LEAVES } from "../../apollo/queries/employeeQuery";
import { APPLY_LEAVE } from "../../apollo/mutations/employeeMutation";

const LeaveManagement = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [errors, setErrors] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const { data, refetch } = useQuery(MY_LEAVES);

const [applyLeave, { loading }] =
  useMutation(APPLY_LEAVE);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    console.log("validate")
    let valid = true;

    const err = {
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    };

    if (!formData.leaveType.trim()) {
      err.leaveType = "Required";
      valid = false;
    }

    if (!formData.startDate.trim()) {
      err.startDate = "Required";
      valid = false;
    }

    if (!formData.endDate.trim()) {
      err.endDate = "Required";
      valid = false;
    }

    if (formData.endDate < formData.startDate) {
      err.endDate = "End date should be greater";
      valid = false;
    }

    if (!formData.reason.trim()) {
      err.reason = "Required";
      valid = false;
    }

    setErrors(err);

    return valid;
  };


  const handleSubmit = async (e: any) => {
    console.log("onsubmit")
    e.preventDefault();
    console.log(errors)

    if (!validate()) return;

    // try {
    //   await applyLeave({
    //     variables: {
    //       input: formData,
    //     },
    //   });

    //   refetch();

    //   setFormData({
    //     leaveType: "",
    //     startDate: "",
    //     endDate: "",
    //     reason: "",
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <>
      <Box sx={{marginBottom: '30px'}}>
        <Typography variant="h4" sx={{fontWeight:"bold"}}>
          Leave Management
        </Typography>

        <Typography color="text.secondary">Apply for leave</Typography>
      </Box>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
        }}
      >
        <TextField
          select
          sx={{marginTop:"10px"}}
          label="Leave Type"
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="CASUAL">Casual Leave</MenuItem>

          <MenuItem value="SICK">Sick Leave</MenuItem>

          <MenuItem value="EARNED">Earned Leave</MenuItem>
        </TextField>
        {errors && <p style={{color:'red'}}>{errors.leaveType}</p>}

        <TextField
          type="date"
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          slotProps={{
            inputLabel:{
                shrink: true,
            }
          }}
          sx={{marginTop:"40px"}}
          fullWidth
        />
        {errors && <p style={{color:'red'}}>{errors.startDate}</p>}

        <TextField
          type="date"
          label="End Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          slotProps={{
            inputLabel:{
                shrink: true,
            }
          }}
          sx={{marginTop:"40px"}}
          fullWidth
        />
        {errors && <p style={{color:'red'}}>{errors.endDate}</p>}

        <TextField
          label="Reason"
          name="reason"
          multiline
          rows={4}
          value={formData.reason}
          onChange={handleChange}
          fullWidth
          sx={{marginTop:"40px"}}
        />
        {errors && <p style={{color:'red'}}>{errors.reason}</p>}
        <Box sx={{display:"flex", justifyContent:"flex-end", gap:2, mt:3}} >
          <Button variant="outlined">Cancel</Button>

          <Button variant="contained" disabled={loading} onClick={handleSubmit}>
            Apply Leave
          </Button>
        </Box>

        {data?.myLeaves.length === 0 ? (
  <Typography>No Leave Requests</Typography>
) : (
  <Box>
    <Typography sx={{variant:"h5", fontWeight:"bold", mt:5, mb:2}}>
          Leave History
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Leave Type</TableCell>

                <TableCell>Start Date</TableCell>

                <TableCell>End Date</TableCell>

                <TableCell>Reason</TableCell>

                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.myLeaves.map((leave: any) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.leaveType}</TableCell>

                  <TableCell>{new Date(leave.startDate).toLocaleDateString("en-IN")}</TableCell>

                  <TableCell>{new Date(leave.endDate).toLocaleDateString("en-IN")}</TableCell>

                  <TableCell>{leave.reason}</TableCell>

                  <TableCell>
                    <Chip
                      label={leave.status}
                      color={
                        leave.status === "APPROVED"
                          ? "success"
                          : leave.status === "REJECTED"
                            ? "error"
                            : "warning"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  </Box>
)}
      </Paper>
    </>
  );
};

export default LeaveManagement;
