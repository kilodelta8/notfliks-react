import { useEffect, useState } from 'react';
import './App.css'
import searchIcon from './assets/Search.svg'
import MovieCard from './components/MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=f638d2f0'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchFliks("Batman");
  }, []);


  const searchFliks = async (title: string) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };


  return (
    <>
      <div className='app'>
        <h1>Notfliks</h1>

        <div className='search'>
          <input
            value={ searchTerm }
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search for Movies'
          />
          <img
            src={searchIcon}
            alt='search'
            onClick={() => searchFliks(searchTerm)}
          />
        </div>
          {movies?.length > 0 ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
        }
      </div>
    </>
  );
}

export default App
