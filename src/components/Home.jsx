import NavBar from './NavBar'
import Summary from './Summary'
import MovieFilters from './MovieFilters'
import { useState, useEffect } from 'react'
import MovieTable from './MovieTable'
import Charts from './Charts'
import { Link } from 'react-router-dom'

const API_TOKEN = import.meta.env.VITE_APP_API_READ_ACCESS_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const [isListView, setListview] = useState(true);
  const [filters, setFilters] = useState({
    genre: "All",
    minYear: "",
    maxYear: "",
    adult: false
  });
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter movies based on current filter state
  const getFilteredMovies = () => {
    if (!movies.results) return [];

    return movies.results.filter(movie => {
      // Genre filter
      if (filters.genre !== "All" && !movie.genre_ids?.includes(parseInt(filters.genre))) {
        return false;
      }

      // Year filters
      const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
      if (filters.minYear && releaseYear && releaseYear < parseInt(filters.minYear)) {
        return false;
      }
      if (filters.maxYear && releaseYear && releaseYear > parseInt(filters.maxYear)) {
        return false;
      }

      // Adult filter
      if (!filters.adult && movie.adult) {
        return false;
      }

      return true;
    });
  };

  // Search movies by title (bypasses all filters)
  const getSearchResults = () => {
    if (!movies.results || !searchQuery.trim()) return null;

    return movies.results.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredMovies = getFilteredMovies();
  const searchResults = getSearchResults();
  const displayMovies = searchResults !== null ? searchResults : filteredMovies;

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
        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="clear-search-btn"
            >
              Clear
            </button>
          )}
        </div>

        {/* SUMMARY STATS */}
        <Summary movieData={movies} genreList={genreList} filteredMovies={displayMovies}/>
        {console.log(movies.results)}

        <div className="search-header">
            <h1 className="section-header">movie list</h1>

            <button onClick={() => setListview(true)}>list</button>
            <button onClick={() => setListview(false)}>table</button>

            <div className="search">
                <button className="search-enter-btn" onClick={fetchMovie}>search</button>
            </div>
        </div>
        
        {/* FILTERS TO SELECT FROM */}
            <MovieFilters
            genreList={genreList}
            filters={filters}
            setFilters={setFilters}
            />

        <div className='something'>

            <div className="main-content">
            {
                isListView ? 
                // LIST VIEW
                <div className="list-view">
                {displayMovies.map((mov) => {
                    return (
                        <div key={mov.id} className="movie-title">
                        <Link to={`/movie/${mov.id}`}>{mov.title}</Link>
                        </div>
                    );
                })}
                </div>
            :
                // TABLE VIEW
                <div className="table-view">
                    <MovieTable movies={{...movies, results: displayMovies}} genreList={genreList} />
                </div>
            }
            </div>


              <div className="charts-top">
                <Charts movies={movies} genreList={genreList} />
            </div>


        </div>
      </div>)}
    </div>
  )
}