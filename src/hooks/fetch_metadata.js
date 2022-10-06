import { useState, useEffect } from "react";

const OMDB_API_KEY = "1200c1e9";

const useFetchMovieMetadata = (movie_name) => {
  const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        fetch(`http://www.omdbapi.com?apikey=${OMDB_API_KEY}&t=${movie_name}`)
            .then((response) => response.json())
            .then((data) => setMetadata(data))
    }, [movie_name]);

  return [metadata];
};

export default useFetchMovieMetadata;

