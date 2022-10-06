import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../context/user";

function Movie({ movie, userVotedForAward, onVote }){
    const {currentUser} = useContext(UserContext)

    const [metadata, setMetadata] = useState(null)
    const OMDB_API_KEY = "1200c1e9";


    // The movie's nomination in the current award
    const nomination = movie.nominations[movie.nominationIndex]


    // Will show if the movie is winning the award
    var winningMovie = false;


    // Shows if the user voted for this movie for the current award
    var userVotedForMovie = nomination.voters.indexOf(currentUser.id) !== -1;


    // Keeps state of whether user has clicked the vote button and
    // the vote is currently being submitted
    // helps prevent users from submitting votes for one award more than once
    const [currentlyVotingForMovie, setVoting] = useState(false);


    // Fetch the movie's metadata from movies api
    useEffect(() => {
        fetch(`http://www.omdbapi.com?apikey=${OMDB_API_KEY}&t=${movie.name}`)
            .then((response) => response.json())
            .then((data) => setMetadata(data))
    }, []);

    function vote(){
        setVoting(true)
        onVote(movie)
    }

    const voteUi =
            userVotedForAward ?
            (
                <span>Vote for category already cast
                    { userVotedForMovie ? <span className="text-success">(For this movie)</span>:''}
                </span>
            ) :
            // Vote not cast
            (
                (currentlyVotingForMovie || userVotedForAward) ?
                // Loader to show vote is being submitted
                // Or text to show that user has already voted for award
                (
                    <button className="btn btn-block btn-disabled btn-light">
                        {currentlyVotingForMovie ? <span><i className="fa fa-spinner fa-spin"></i> Submitting Vote...</span> : <span>Currently Voting</span>}
                    </button>
                ):
                // Button to allow user to vote
                (
                    <button className="btn btn-success btn-block" onClick={vote}>Cast Vote</button>
                )
            );

    return metadata ? (
        <div className="card movie_card">
		    <img src={metadata.Poster} className="img-fluid ard-img-top" alt="Poster" />
		  
            <div className="card-body mb-0 pb-0">
                <h5 className="card-title">{movie.name}</h5>

		   		<div className="d-flex align-items-center mb-3">
                    <span className="movie_info">
                        <i className="fa fa-clock-o mr-1"></i>{metadata.Released}
                    </span>
                    &nbsp;&nbsp;
                    <i className="fa fa-circle text-dark" style={{fontSize: '0.4em'}}></i>
                    &nbsp;&nbsp;
                    <span className="movie_info">
                        <i className="fa fa-play-circle mr-1"></i>{metadata.Runtime}
                    </span>
                </div>

                <p className="movie-plot mb-0">
                    PLOT: {metadata.Plot}
                </p>

		    </div>

            <hr className="mt-3 mb-0"/>

            <div className="vote-area">
                <div className="mb-2">
                    Total Votes: {nomination.votes} {winningMovie ? <span className="text-success">(Current Winner)</span> : ""}
                </div>
                
                <div>
                    {voteUi}
                </div>
            </div>
		</div>
    )
    :
    (
        <div className="card movie_card">
            <div className="card-body">
            Loading movie info...
            </div>
        </div>
    )
}

export { Movie }

// Actors: "Kelly Marie Tran, Awkwafina, Gemma Chan"
// Awards: "Nominated for 1 Oscar. 12 wins & 59 nominations total"
// Country: "United States"
// DVD: "05 Mar 2021"
// Director: "Don Hall, Carlos López Estrada, Paul Briggs"
// Genre: "Animation, Action, Adventure"
// Plot: "In a realm known as Kumandra, a re-imagined Earth inhabited by an ancient civilization, a warrior named Raya is determined to find the last dragon."
// ​Poster: "https://m.media-amazon.com/images/M/MV5BZWNiOTc4NGItNGY4YS00…EtMDE2ODcxODEwNjkwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
// Rated: "PG"
// Released: "05 Mar 2021"
// Runtime: "107 min"
// Year: "2021"
