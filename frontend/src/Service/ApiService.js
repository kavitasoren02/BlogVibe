import axios from "axios";
import { settings } from "../config/config";

//Create an instance of Axios with predefined configuration
const axiosInstance = axios.create({
    baseURL: settings.BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(new Error(error.message || "Something went wrong"));
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const excludeRoute = ["auth/info", "/auth/login"];

        const REDIRECT_STATUS_CODES = [ 401, 403, 429 ];
        if(
            error.response && 
            REDIRECT_STATUS_CODES.includes(error.response.status) &&
            !excludeRoute.includes(error?.config?.url)
        ){
            console.log(error.config.url);
            
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

//Get request
const _get = async (url,config) => {
    const response = await axiosInstance.get(url, config);
    return response;
};

//Post request
const _post = async (url, data, config) => {
    const response = await axiosInstance.post(url, data, config);
    return response;
};

//Put request
const _put = async (url, data, config) => {
    const response = await axiosInstance.put(url, data, config);
    return response;
};

//Delete request
const _delete = async (url, config) => { 
    const response = await axiosInstance.delete(url, config);
    return response;
};

export {
    _get,
    _post,
    _put,
    _delete,
};