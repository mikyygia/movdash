import MovieRow from "./MovieRow";

export default function MovieList () {
    return (
        <div className="movie-list">
            <div className="search-header">
                <h1 className="section-header">movie list</h1>

                <div className="search-filters">
                    <input className="search-bar" type="text" name="search" id="search" placeholder="search for a movie" />
                </div>
            </div>
            

            <div>
                <MovieRow />
            </div>
        </div>
    );
}