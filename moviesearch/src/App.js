import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const apiKey = '98e3fb1f'; 
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    getMovies('Clueless');
  }, []);

  const getMovies = async (searchTerm) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
    );
    const data = await response.json();

    if (data.Response === 'True') {
      setMovies(data.Search);
      setSelectedMovie(data.Search[0]);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="App">
      <nav>
        <h1>Movie Night</h1>
      </nav>
      <Form getMovies={getMovies} />
      <div className="movie-list">
        {movies.map((movie) => (
          <Movie
            key={movie.imdbID}
            movie={movie}
            handleClick={handleMovieClick}
          />
        ))}
      </div>
      <MovieDisplay movie={selectedMovie} />
    </div>
  );
}

function Movie({ movie, handleClick }) {
  return (
    <div className="movie" onClick={() => handleClick(movie)}>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
}

function MovieDisplay({ movie }) {
  if (!movie) {
    return <h1>No Movie to Display</h1>;
  }

  return (
    <div className="movie-display">
      <h1>{movie.Title}</h1>
      <h2>{movie.Genre}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Plot}</h2>
      <h2>{movie.Year}</h2>
    </div>
  );
}

function Form({ getMovies }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies(searchTerm);
    setSearchTerm('');
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for a movie"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default App;
