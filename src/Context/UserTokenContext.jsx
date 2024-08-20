import { createContext, useEffect, useState } from "react";


export const UserTokenContext = createContext();

export default function UserTokenContextProvider({children}){
    const [token , setToken] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    },[])
    return(
        <UserTokenContext.Provider value={{token,setToken}}>
            {children}  
        </UserTokenContext.Provider>
    )
}