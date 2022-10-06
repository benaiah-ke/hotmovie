import React, { useEffect, useState } from 'react'
import { URLS } from '../urls'

const MoviesContext = React.createContext()

function MoviesProvider({ children }){
    const [awards, setAwards] = useState([])
    const [movies, setMovies] = useState([])

    // Fetch available awards for user to vote
    useEffect(() => {
        fetch(URLS.awards)
            .then((resp) => resp.json())
            .then((awards) => setAwards(awards))
    }, [])

    // Fetch movies from our db
    useEffect(() => {
        fetch(URLS.movies)
            .then((resp) => resp.json())
            .then((movies) => setMovies(movies))
    }, [awards])

    return (
        <MoviesContext.Provider value={{awards, setAwards, movies, setMovies}}>{children}</MoviesContext.Provider>
    )
}

export { MoviesContext, MoviesProvider }