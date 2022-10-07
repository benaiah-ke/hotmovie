import React, { useContext } from "react";
import { useState } from "react";
import { MoviesContext } from "../context/movies";
import { UserContext } from "../context/user";
import { URLS } from "../urls";
import { Movie } from "./Movie";

function Award({ award }){
    const {currentUser} = useContext(UserContext)
    const {movies, setMovies} = useContext(MoviesContext)

    // Shows whether user is casting a vote for the award
    const [currentlyVoting, setVoting] = useState(false);

    // Shows whether the user has voted for a movie in the award category
    var userVotedForAward = false;

    var winners = null;

    // Filter only movies nominated for award
    const nominatedMovies = movies.filter((movie) => {
        var nominated = false
        
        movie.nominations.forEach((nomination, index) => {
            // If movie has a nomination with award_id matching the id of current award
            // the movie should be displayed under this award
            if(nomination.award_id === award.id){
                nominated = true

                // We'll get the award's nomination data for this movie (votes, voters)
                // And pass it down the movie element
                // 
                // NB: a movie can have several nominations, hence this step
                movie.nominationIndex = index


                // Check if user has already voted in the award category
                // This will be passed down to <Movie /> for proper UI display
                // True when we find first movie with user's vote
                userVotedForAward = userVotedForAward || nomination.voters.indexOf(currentUser.id) !== -1
            }
        })

        // If the movie is nominated for the award, this will be true
        // hence it will be part of nominatedMovies
        return nominated
    })

    function vote(movie, nominationIndex) {
        if(currentlyVoting){
            alert('Please wait until the current vote is submitted')
            return
        }

        // Set the voting state to true
        setVoting(true)

        // Add one vote to the movie
        movie.nominations[nominationIndex].votes += 1

        // Set the user to have voted
        movie.nominations[nominationIndex].voters.push(currentUser.id)

        // Delete the nomination index
        // Remember it was a runtime metadata
        delete movie.nominationIndex


        // Submit the vote
        fetch(URLS.movies + `/${movie.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
        .then((resp) => resp.json())
        .then((newMovie) => {
            console.log(newMovie)

            // Update movies
            setMovies(movies.map((movie) => (movie)))

            // User has already voted
            setVoting(false)
        })
        .catch((error) => {
            console.log(error)
            setVoting(false)
        })
    }

    const movieList = nominatedMovies.map((movie) => (
        <div key={movie.id} className="col-lg-4 col-xl-4 mb-4">
            <Movie
                nominationIndex={movie.nominationIndex}
                movie={movie}
                onVote={vote}
                userVotedForAward={userVotedForAward}
                />
        </div>
    ))

    return (
        <>
            <h4 className="mb-3">{award.name}</h4>

            <div className="row">
                {movieList}
            </div>
        </>
    );
}

export { Award }
