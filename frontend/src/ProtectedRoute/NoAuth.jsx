import { useAuth } from "./AuthProvider";
import Loader from "../components/ui/Loader";
import { Navigate, useLocation } from "react-router-dom";
import { DEFAULT_ROUTE_MAPPING_BY_USER_ROLE } from "../config/config";

export default function NoAuthRoute({ children }) {
    const { user } = useAuth();
    const {pathname} = useLocation();
    console.log({pathname});
    
    if( user === undefined) {
        return <Loader container={ true }/>;
    }

    if ( user !== null && pathname !== "/" ) {
        return <Navigate to={DEFAULT_ROUTE_MAPPING_BY_USER_ROLE[user.role]} replace/>
    }
    return children;
}
