import { useApolloClient } from "@apollo/client/react";
import React, { useEffect } from "react";
import { GET_ADMIN } from "../../apollo/queries/adminQuery";
import { useDispatch } from "react-redux";
import { setAuth, setLoading } from "../../features/auth/authSlice";
import { GET_USER } from "../../apollo/queries/employeeQuery";

interface Props {
  children: React.ReactNode;
}

const Authinitializer = ({ children }: Props) => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  useEffect(() => {
    const initialize = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await client.query({
          query: GET_ADMIN,
          fetchPolicy: "network-only",
        });
        // console.log(data)
        if (data?.getMe) {
          dispatch(setAuth(data.getMe));
        }
        // console.log(data.getMe)
      } catch {
        try {
          const { data } = await client.query({
            query: GET_USER,
            fetchPolicy: "network-only",
          });

          if (data?.getUser) {
            dispatch(setAuth(data.getUser));
          }
        } catch {
          // nobody is logged in
        }
      } finally {
        dispatch(setLoading(false));
      }
    };
    initialize();
  }, [client, dispatch]);
  // console.log("run before useEffect");
  return <>{children}</>;
};
export default Authinitializer;
