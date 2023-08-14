import React, { useState, useEffect, useCallback } from "react";

import './App.css'
import MovieList from "./Component/MovieList";
import AddMovie from "./Component/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetctMovieHandler = useCallback (async () => {
    setError(null);
    setIsLoading(true);
    try {
      let res = await fetch("https://react-http-project-dcdba-default-rtdb.firebaseio.com/movies.json");

      if(!res.ok){
        throw new Error('Something went Wrong');
      }

      let Data = await res.json();

      const loadedMovies = [];

      for(const key in Data){
        loadedMovies.push({
          id:key,
          title:Data[key].title,
          openingText:Data[key].openingText,
          releaseDate:Data[key].releaseDate
        })
      }

      setMovies(loadedMovies);
      
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  
  useEffect(() => {
    fetctMovieHandler();
  },[fetctMovieHandler]);

  const addMovieHandler = useCallback(async (movie) =>{

    try{
      const res = await fetch("https://react-http-project-dcdba-default-rtdb.firebaseio.com/movies.json",{
      method : 'POST',
      body : JSON.stringify(movie),
      headers : {
        'Content-type': 'application/json'
      }
    })

    const Data = await res.json();
    console.log(Data);
    } catch (error){
      setError('somthing went wrong')
    }
    setIsLoading(false);
  }, [])


  let content = <p>Found no Movies</p>

  if(movies.length > 0){
    content = <MovieList setMovies={fetctMovieHandler} movies={movies} />
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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