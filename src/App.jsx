import './App.css'
import NavBar from './components/NavBar'
import Summary from './components/Summary'
import MovieList from './components/MovieList'
import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const API_TOKEN = import.meta.env.VITE_APP_API_READ_ACCESS_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genreList, setGenreList] = useState([]);

  const fetchMovie = async () => {
    setLoading(true);

    try {
      const movieRes = await fetch("https://api.themoviedb.org/3/movie/popular", options);
      const movieData = await movieRes.json();

      const genreRes = await fetch("https://api.themoviedb.org/3/genre/movie/list", options);
      const genreData = await genreRes.json();

      setMovies(movieData);
      setGenreList(genreData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div>
      <NavBar />
      <Summary movieData={movies} genreList={genreList}/>
      {console.log(movies.results)}

      <div>
        <MovieList onFetchMovies={fetchMovie}/>
      </div>

      { movies.results?.map((mov, _) => {
        return (
            <div key={mov.id}>
              {/* {console.log(mov.title + " has id: " + mov.id)} */}
              <p>{mov.title}</p>
            </div>
        );
      }
      )}

      
    </div>
  )
}

export default App
