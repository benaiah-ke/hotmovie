import React, { useContext } from "react";
import { MoviesContext } from "../context/movies";
import useWinner from "../hooks/get_award_winner";

function AwardWinner({ award }){
    const {movies} = useContext(MoviesContext);

    // FIRST, we'll get the winning movie(s)
    const [winner, winners] = useWinner(award, movies);


    // Then list the winners
    if(winner){
        return (
            <div key={award.id} className="card mb-4">
                <div className="card-body">
                    <h5>{award.name}</h5>
                    <strong>Winner:</strong> {winner.name}
                </div>
            </div>
        )
    }else if(winners.length > 0){
        const winner_list = winners.map((movie) => {
            return <li key={movie.id}>
                {movie.name}
            </li>
        })
        
        return (
            <div key={award.id} className="card mb-4">
                <div className="card-body">
                    <h5>{award.name}</h5>
                    <ol>
                    {winner_list}
                    </ol>
                </div>
            </div>
        )
    }else{
        return (
            <div key={award.id} className="card mb-4">
                <div className="card-body">
                    <h5>{award.name}</h5>
                    No Winner Yet
                </div>
            </div>
        )
    }
}

export { AwardWinner }
