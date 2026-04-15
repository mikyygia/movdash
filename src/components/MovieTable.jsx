import "../index.css"
import { useNavigate } from 'react-router-dom'

const getGenreNames = (genreIds = [], genres = []) => {
    if (!genreIds?.length || !genres?.length) return "N/A";
    return genreIds
        .map((id) => genres.find((genre) => genre.id === id)?.name)
        .filter(Boolean)
        .join(", ") || "N/A";
};


export default function MovieTable({ movies, genreList }) {
    const navigate = useNavigate();
    const results = movies?.results ?? [];

    if (!results.length) {
        return <div className="movie-row-empty">No movies available</div>;
    }

    return (
        <div>
            <table className="movie-table">
                <thead>
                    <tr>
                        <th>poster</th>
                        <th>title</th>
                        <th>genre</th>
                        <th>year</th>
                        <th>rating</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((mov) => (
                        <tr key={mov.id} className="movie-row" onClick={() => navigate(`/movie/${mov.id}`)} style={{cursor: 'pointer'}}>
                            <td>
                                {mov.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${mov.poster_path}`}
                                        alt={mov.title}
                                    />
                                ) : (
                                    <span>...</span>
                                )}
                            </td>
                            <td>{mov.title}</td>
                            <td>{getGenreNames(mov.genre_ids, genreList?.genres)}</td>
                            <td>{mov.release_date?.slice(0, 4) || "—"}</td>
                            <td>{mov.vote_average?.toFixed(1) ?? "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}