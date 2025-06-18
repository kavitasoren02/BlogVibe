import { useAuth } from "./AuthProvider";
import Loader from "../components/Loader";

export default function NoAuthRoute({ children }) {
    const { user } = useAuth();

    if( user == undefined) {
        return <Loader container={ true }/>;
    }
}
return children;