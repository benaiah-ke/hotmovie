import React, { useContext } from "react";
import { MoviesContext } from "../context/movies";
import { AwardWinner } from "./AwardWinner";

function Results(){
    const {movies, awards} = useContext(MoviesContext)
    
    const results = awards.map((award) => ( <AwardWinner award={award}/> ))

    return (
        <div>
            {results}
        </div>
    );
}

export { Results }
