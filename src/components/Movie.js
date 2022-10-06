import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Movie({ movie }){
    const [metadata, setMetadata] = useState({})
    const OMDB_API_KEY = "1200c1e9";


    // Fetch the movie's metadata from movies api
    useEffect(() => {
        fetch(`http://www.omdbapi.com?apikey=${OMDB_API_KEY}&t=${movie.name}`)
            .then((response) => response.json())
            .then((data) => setMetadata(data))
    }, []);

    console.log(metadata);

    return (
        <div>
            <span>{movie.name}</span><br/>
        </div>
    );
}

export { Movie }
