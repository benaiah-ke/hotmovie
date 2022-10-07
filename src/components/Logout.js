import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/user";

function Logout(){
    const {setCurrentUser} = useContext(UserContext)

    setCurrentUser(null)

    // Send to login
    return (
        <Navigate to="/login" />
    )
}

export { Logout }
