import { useSelector } from "react-redux";
import type { RootState } from "../golbalStore/store";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({children}:Props) => {
    const {isAuthenticated, loading} = useSelector((state:RootState)=>state.auth)
    
    console.log(loading)
    console.log(isAuthenticated)

    if(loading){
        return <>Loading...</>;
    }

    if(!isAuthenticated){
        return <Navigate to="/" replace/>;
    }
    return <>{children}</>;
}

export default ProtectedRoute;