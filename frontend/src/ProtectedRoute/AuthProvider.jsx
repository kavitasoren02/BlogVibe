import { createContext,useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import {
    GET_USER_INFO,
    LOGIN_ENDPOINT,
    LOGOUT,
} from "../Service/useApiService";
import { _get, _post } from "../Service/ApiService";

//create authcontext
const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();
    const [loadingAuth, setLoadingAuth] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(0);

    //Fetch user details
    async function fetchUser() {
        try{
            const { data } = await _get(GET_USER_INFO);
            setUser({
            ...data, id: data._id,
            });            

            setLoadingAuth(false);
            // if(data?.role === 'admin') navigate('/admin')
            // else if(data?.role === 'blogger') navigate('/blogger')
            // else navigate("/")
            // console.log({data});
        }catch(error){
            console.log({error})
            setUser(null);
            setLoadingAuth(false);
            navigate("/");
        }
    }

    //when component mount
    useEffect(() => {
        fetchUser();
    },[isAuthenticated]);

//handle login
async function handleLogin(payload) {
    try{
        const { data } = await _post(LOGIN_ENDPOINT,payload);
        setLoadingAuth(false);
        setIsAuthenticated(prev => prev + 1);
        return data;
    }catch(error){
        setLoadingAuth(false);
        console.log({error});
        
        throw error;
    }
  }

//handle logout
async function handleLogout() {
    await _get(LOGOUT)
    setUser(null);
    setLoadingAuth(false);
    navigate("/");
}

return (
    <AuthContext.Provider
    value={{
        user,
        handleLogin,
        handleLogout,
        loadingAuth,
        setLoadingAuth,
        fetchUser,
        setIsAuthenticated,
    }}
    >
        {children}
    </AuthContext.Provider>
 );
}
 //custom hook 
 export function useAuth() {
    const context = useContext(AuthContext);

    if(context == undefined) {
        throw new Error("useAuth must be used inside of an AuthProvider"); 
    }
    return context;
 }


