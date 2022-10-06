import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { URLS } from "../urls";
import { Award } from "./Award";

function Home(){
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [awards, setAwards] = useState([])
    const [movies, setMovies] = useState([])

    // Fetch available awards for user to vote
    useEffect(() => {
        fetch(URLS.awards)
            .then((resp) => resp.json())
            .then((awards) => setAwards(awards))
    }, [])

    // Fetch movies from our db
    useEffect(() => {
        fetch(URLS.movies)
            .then((resp) => resp.json())
            .then((movies) => setMovies(movies))
    }, [awards])

    const awardList = awards.map((award) => (
        <Award
            key={award.id}
            award={award}
            movies={movies}
            setMovies={setMovies}
            />
    ))

    const results = <div>Results</div>

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
                    {/* {results} */}
                </div>
            </div>
        </div>
    );
}

export { Home }
