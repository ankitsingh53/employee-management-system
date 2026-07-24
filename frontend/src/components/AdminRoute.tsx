import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../glolbalStore/store"
import { Box, CircularProgress } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const { isAuthenticated, loading, role } = useSelector(
    (state: RootState) => state.auth
  );

  if (loading) {
    return <>
    <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
    </>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;