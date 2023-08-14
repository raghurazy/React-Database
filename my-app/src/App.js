import React, { useState } from "react";

import './App.css'
import MovieList from "./Component/MovieList";

function App() {
  const [movies, setMovies] = useState([]);

  const fetctMovieHandler = async () => {
    let res = await fetch("https://swapi.dev/api/films/");
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
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetctMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;