import { Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/adminLogin";
import EmployeeLogin from "./components/employee/EmployeeLogin";
import EmployeeRegister from "./components/employee/EmployeeRegister";
import Home from "./components/Home";
import AdminDashboard from "./components/admin/AdminDashboard";
import DashboardLayout from "./components/DashboardLayout";
import Employees from "./components/admin/Employees";
import Departments from "./components/admin/Departments";
import Leave from "./components/admin/Leave";
import AddEmployee from "./components/admin/AddEmployee";
import AddDepartment from "./components/admin/AddDepartment";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import EmployeeRoute from "./components/EmployeeRoute";
import AdminRoute from "./components/AdminRoute";
import EditEmployee from "./components/admin/EditEmployee"
import EmployeeProfile from "./components/employee/EmployeeProfile"
import EditProfile from "./components/employee/EditProfile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/register" element={<EmployeeRegister />} />
        <Route path="/user/login" element={<EmployeeLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Departments />} />
          <Route path="leave" element={<Leave />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="edit-employee/:id" element={<EditEmployee />} />

        </Route>
        <Route
          path="/user"
          element={
            <EmployeeRoute>
              <DashboardLayout />
            </EmployeeRoute>
          }
        >
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="edit-profile/:id" element={<EditProfile />} />

        </Route>
      </Routes>
    </>
  );
};

export default App;
