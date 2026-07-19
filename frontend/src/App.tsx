import { Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/adminLogin";
import EmployeeLogin from "./components/employee/EmployeeLogin";
import EmployeeRegister from "./components/employee/EmployeeRegister";
import Home from "./components/Home";
import AdminDashboard from "./components/admin/AdminDashboard";
import DashboardLayout from "./components/DAshboardLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
      {/* <Sidebar/> */}
      {/* <Navbar/> */}
    </>
  );
};

export default App;
