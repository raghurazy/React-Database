import React, { useState, useEffect, useCallback } from "react";

import './App.css'
import MovieList from "./Component/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetctMovieHandler = useCallback (async () => {
    setError(null);
    setIsLoading(true);
    try {
      let res = await fetch("https://swapi.dev/api/films/");

      if(!res.ok){
        throw new Error('Something went Wrong');
      }

      let jsonData = await res.json();
      
      const transformedMovies = jsonData.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedMovies);
      
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  
  useEffect(() => {
    fetctMovieHandler();
  },[fetctMovieHandler]);


  let content = <p>Found no Movies</p>

  if(movies.length > 0){
    content = <MovieList movies={movies} />
  }
    if (error) {
    const timeout = setTimeout(fetctMovieHandler, 5000);

    content = (
      <>
        {" "}
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            clearTimeout(timeout);
          }}
        >
          Cancel
        </button>
      </>
    )
  }

  if(isLoading){
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetctMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;