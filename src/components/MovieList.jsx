import MovieRow from "./MovieRow";

export default function MovieList ( {onFetchMovies, allGenres} ) {
    return (
        <div className="movie-list">
            <div className="search-header">
                <h1 className="section-header">movie list</h1>

                <div className="search">
                    {/* <input className="search-bar" type="text" name="search" id="search" placeholder="search for a movie" /> */}
                    <button className="search-enter-btn" onClick={onFetchMovies}>enter</button>
                </div>
            </div>
            <div className="filters">
                <p>filters: </p>
                <div>
                    <label htmlFor="genre">genre: </label>
                    <select name="genre" id="genre">
                        {/* hardcoded for now */}
                        <option value="All">All</option>
                        <option value="Action">Action</option>
                        <option value="Romance">Romance</option>
                        <option value="Comedy">Comedy</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="genre">year: </label>
                    <input type="number" name="min-year" id="min-year" className="filter-year"/>
                    <span> to </span>
                    <input type="number" name="max-year" id="max-year" className="filter-year"/>
                </div>

                <div>
                    <label htmlFor="adult">not adult: </label>
                    <input type="checkbox" name="adult" id="adult" />
                </div>                
            </div>
        
            <div>
                <MovieRow />
            </div>
        </div>
    );
}