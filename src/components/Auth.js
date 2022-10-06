import { useContext, useState } from "react";
import { Route, Router, useRouteMatch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/user";
import { Login } from "./Login";
import { Signup } from "./Signup";

function Auth(){
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const match = useRouteMatch();

    // Check if user is logged in
    if(currentUser !== null){
        return <Redirect to='movies' />
    }


    return (
        <Router>
            <Route path={match.url} element={Login} />
            <Route path={`${match.url}/signup`} element={Signup} />
        </Router>
    )
}

export { Auth }
