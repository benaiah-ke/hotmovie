import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MoviesContext } from "../context/movies";
import { UserContext } from "../context/user";
import { Award } from "./Award";
import { Results } from "./Results";

function Home(){
    const {currentUser} = useContext(UserContext)
    const {awards} = useContext(MoviesContext)

    const awardList = awards.map((award) => (
        <Award
            key={award.id}
            award={award}
            />
    ))

    // If a user is not logged in, redirect to login
    if(currentUser === null){
        return (
            <Navigate to="/login" />
        )
    }

    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-lg-8">
                    <h2 className="mb-4">NOMINATED MOVIES</h2>

                    {awardList}
                </div>

                <div className="col-lg-4">
                    <h2>LATEST RESULTS</h2>
                    <Results />
                </div>
            </div>
        </div>
    );
}

export { Home }
