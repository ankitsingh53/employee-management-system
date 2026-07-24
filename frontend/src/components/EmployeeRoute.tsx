import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../glolbalStore/store";

interface Props {
  children: React.ReactNode;
}

const EmployeeRoute = ({ children }: Props) => {
  const { isAuthenticated, loading, role } = useSelector(
    (state: RootState) => state.auth
  );

  if (loading) {
    return <>Loading...</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }

  if (role !== "EMPLOYEE") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default EmployeeRoute;