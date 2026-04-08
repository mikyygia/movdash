import './App.css'
import NavBar from './components/NavBar'
import Summary from './components/Summary'
import MovieFilters from './components/MovieFilters'
import { useState, useEffect } from 'react'
import MovieTable from './components/MovieTable'

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
  const [isListView, setListview] = useState(true); 

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

      { loading ? 
        <p>loding....</p>
      : (
      <div>
        <Summary movieData={movies} genreList={genreList}/>
        {console.log(movies.results)}

        <div className="search-header">
            <h1 className="section-header">movie list</h1>

            <button onClick={() => setListview(true)}>list</button>
            <button onClick={() => setListview(false)}>table</button>

            <div className="search">
                <button className="search-enter-btn" onClick={fetchMovie}>search</button>
            </div>
        </div>

        <MovieFilters 
          onFetchMovies={fetchMovie} 
          genreList={genreList}
          viewChange={setListview}
        />

        <div>
          {
            isListView ? 
            <div>
              {movies.results?.map((mov) => {
                return (
                    <div key={mov.id}>
                      <p>{mov.title}</p>
                    </div>
                );
              })}
            </div>
          :
            <div>
                <MovieTable movies={movies} genreList={genreList} />
            </div>
          }
        </div>
      </div>)}
    </div>
  )
}

export default App
