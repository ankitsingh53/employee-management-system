import { useQuery } from "@apollo/client/react";
import { Typography } from "@mui/material";
import { GET_ADMIN } from "../../apollo/queries/adminQuery";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../golbalStore/store";


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery<any>(GET_ADMIN);
  const user = useSelector((state:RootState)=>state.auth.user)

  useEffect(() => {
    if (data?.getMe) {
      dispatch(setAuth(data.getMe));
    }
  }, [data, dispatch]);

  // console.log(data);
  // console.log(user)

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>Not Signed in or some error</h2>;
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        Welcome Back, {user?.firstName}
      </Typography>

      <Typography color="text.secondary">
        Here's what's happening today.
      </Typography>
    </>
  );
};

export default AdminDashboard;
