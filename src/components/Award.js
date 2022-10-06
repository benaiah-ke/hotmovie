import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { URLS } from "../urls";
import { Movie } from "./Movie";

function Award({ award, movies }){
    var winners = null;

    // Get only movies nominated for award
    const nominatedMovies = movies.filter((movie) => {
        var nominated = false

        movie.nominations.forEach((nomination) => {
            if(nomination.award_id === award.id){
                nominated = true

                // Evaluate if the movie is winning in the award votes
                // No winning movie found
                if(winners === null){
                    winners = {
                        movieId: movie.id,
                        votes: nomination.votes
                    }
                }else{
                    // Check if movie has more votes than current winner(s)
                    
                }
            }
        })

        return nominated
    })

    const movieList = nominatedMovies.map((movie) => (
        <div className="col-lg-4 col-xl-4">
            <Movie key={movie.id} movie={movie} />
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
