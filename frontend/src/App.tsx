import { Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/adminLogin";
import EmployeeLogin from "./components/employee/EmployeeLogin";
import EmployeeRegister from "./components/employee/EmployeeRegister";
import Home from "./components/Home";
import AdminDashboard from "./components/admin/AdminDashboard";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Employees from "./components/admin/Employees";
import Departments from "./components/admin/Departments";
import Leave from "./components/admin/Leave";
import AddEmployee from "./components/admin/AddEmployee";
import AddDepartment from "./components/admin/AddDepartment";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Departments />} />
          <Route path="leave" element={<Leave />} />
          <Route path="/admin/add-employee" element={<AddEmployee />} />
          <Route path="/admin/add-department" element={<AddDepartment />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
