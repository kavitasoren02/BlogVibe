import { createContext, useState } from "react";
import { _post } from "../Service/ApiService";

 export const EditorContext = createContext();

 export function EditorProvider ({children}) {
    const[ title, setTitle ] = useState("");
    const[ content, setContent ] =  useState();
    const[ description, setDescription ] =  useState("");
    const[ isPublished, setIsPublished ] = useState("");
    const[images, setImages] = useState("");


    const value = {
        title,setTitle,content,setContent, isPublished, setIsPublished,description,setDescription,images,setImages
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    )
 }