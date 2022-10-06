import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Movie({ movie }){
    const [metadata, setMetadata] = useState(null)
    const OMDB_API_KEY = "1200c1e9";

    // Will show if the movie is winning the award
    var winningMovie = true;
    
    // Will show if the user has cast a vote for the award
    var voteAlreadyCast = true;


    // Fetch the movie's metadata from movies api
    useEffect(() => {
        fetch(`http://www.omdbapi.com?apikey=${OMDB_API_KEY}&t=${movie.name}`)
            .then((response) => response.json())
            .then((data) => setMetadata(data))
    }, []);

    console.log(metadata);

    return metadata ? (
        <div class="card movie_card mb-4">
		    <img src={metadata.Poster} class="img-fluid ard-img-top" alt="Poster" />
		  
            <div class="card-body">
		  	    <i class="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
		  	    </i>
		        
                <h5 class="card-title">{movie.name}</h5>

		   		<div className="d-flex align-items-center mb-3">
                    <span class="movie_info">
                        <i className="fa fa-clock-o mr-1"></i>{metadata.Released}
                    </span>
                    &nbsp;&nbsp;
                    <i className="fa fa-circle text-dark" style={{fontSize: '0.4em'}}></i>
                    &nbsp;&nbsp;
                    <span class="movie_info">
                        <i className="fa fa-play-circle mr-1"></i>{metadata.Runtime}
                    </span>
                </div>

                <p className="movie-plot">
                    PLOT: {metadata.Plot}
                </p>

                <hr className="mb-4"/>

		    </div>


            <div className="vote-area">
                <div>Total Votes: 5 {winningMovie ? <span className="text-success">(Current Winner)</span> : ""}</div>
                
                <div>
                {voteAlreadyCast ? <span>Vote Already Cast</span> : <button className="btn btn-success btn-block">Cast Vote</button>}
                </div>
            </div>
		</div>
    )
    :
    (
        <div>
            Movie Loading...
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
