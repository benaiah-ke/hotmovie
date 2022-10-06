import React, { useContext } from "react";
import { MoviesContext } from "../context/movies";

function Results(){
    const {movies, awards} = useContext(MoviesContext)

    const resultList = awards.map((award) => (
        <div>
            {award.name}
        </div>
    ))

    return (
        <div>
            {resultList}
        </div>
    );
}

export { Results }
