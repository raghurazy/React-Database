import React, { useState } from "react";

import './App.css'
import MovieList from "./Component/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetctMovieHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let res = await fetch("https://swapi.dev/api/film/");

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
  };

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