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

  const fetchMovie = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://api.themoviedb.org/3/movie/popular", options);
      const data = await res.json();

      setMovies(data);
      console.log(movies);
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
      <Summary />
      <h1>testing</h1>

      {console.log(movies.results)}

      { movies.results?.map((mov, index) => {
        return (
            <div key={index}>
              <p>{mov.title}</p>
            </div>
        );
      }
      )}

      <div>
        {/* <MovieList onFetchMovies={fetchMovie}/> */}
      </div>
    </div>
  )
}

export default App
