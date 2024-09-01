import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


export const UserTokenContext = createContext();

export default function UserTokenContextProvider({children}){
    const [token , setToken] = useState(null);
    const [userId , setuserId] = useState(null);
    function decodeToken() {
        const decoded = jwtDecode(localStorage.getItem("token"))
        setuserId(decoded)
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            decodeToken()
        }
    },[])
    return(
        <UserTokenContext.Provider value={{token,setToken,decodeToken,userId}}>
            {children}  
        </UserTokenContext.Provider>
    )
}