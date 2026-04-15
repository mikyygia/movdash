import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';

const API_TOKEN = import.meta.env.VITE_APP_API_READ_ACCESS_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <div>
        <NavBar />
        <p>Loading...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <NavBar />
        <p>Movie not found</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="movie-detail" style={{textAlign: "center"}}>
        <h1>{movie.title}</h1>
        <p>released date: {movie.release_date}</p>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{width: "300px"}}
          />
        )}

        <p>Popularity: {movie.popularity}</p>
        <p>Adult Movie: {movie.adult ? "✅" : "❌"}</p>
      </div>
    </div>
  );
}