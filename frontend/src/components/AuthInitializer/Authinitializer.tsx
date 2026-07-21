import { useApolloClient } from '@apollo/client/react'
import React, { useEffect } from 'react'
import { GET_ADMIN } from '../../apollo/queries/adminQuery'
import { useDispatch } from 'react-redux';
import { setAuth, setLoading } from '../../features/auth/authSlice';

interface Props {
    children: React.ReactNode;
}

 const Authinitializer = ({children}:Props) => {
    const dispatch = useDispatch();
    const client = useApolloClient();
    useEffect(()=>{
        const initialize = async ()=>{
            try {
                console.log("inside authInitializer")
                dispatch(setLoading(true));
                const {data} = await client.query({
                    query: GET_ADMIN,
                    fetchPolicy: 'network-only'
                })
                console.log(data)
                if(data?.getMe){
                    dispatch(setAuth(data.getMe))
                }
                // console.log(data.getMe)
            } catch (error) {
                if(error instanceof Error){
                    console.log(error.message);
                }
            }finally{
                dispatch(setLoading(false))
            }
        }
        initialize();
    },[client, dispatch])
    console.log("run before useEffect");
  return <>{children}</>;
};
export default Authinitializer;