import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { URLS } from "../urls";
import { Movie } from "./Movie";

function Award({ award, movies }){
    // Get only movies nominated for award
    const nominatedMovies = movies.filter((movie) => {
        var nominated = false

        movie.nominations.forEach((nomination) => {
            if(nomination.award_id === award.id){
                nominated = true
            }
        })

        return nominated
    })

    const movieList = nominatedMovies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
    ))

    return (
        <div>
            <h1>{award.name}</h1>
            {movieList}
        </div>
    );
}

export { Award }
