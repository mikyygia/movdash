export default function MovieFilters ( {genreList, filters, setFilters} ) {
    const handleGenreChange = (e) => {
        setFilters(prev => ({ ...prev, genre: e.target.value }));
    };

    const handleMinYearChange = (e) => {
        setFilters(prev => ({ ...prev, minYear: e.target.value }));
    };

    const handleMaxYearChange = (e) => {
        setFilters(prev => ({ ...prev, maxYear: e.target.value }));
    };

    const handleAdultChange = (e) => {
        setFilters(prev => ({ ...prev, adult: e.target.checked }));
    };

    return (
        <div className="movie-list">
            <div className="filters">
                <div>
                    <select name="genre" id="genre" value={filters.genre} onChange={handleGenreChange}>
                        <optgroup label="genre"></optgroup>

                        <option value="All">All</option>
                        {genreList?.genres?.map((genre) => {
                            return (<option key={genre.id} value={genre.id}>{genre.name}</option>)
                        })}
                    </select>
                </div>

                <div>
                    <label htmlFor="genre">year</label>
                    <input 
                        type="number" 
                        name="min-year" 
                        id="min-year" 
                        className="filter-year" 
                        style={{margin: "0 0 0 16px"}}
                        value={filters.minYear}
                        onChange={handleMinYearChange}
                    />
                    <span> to </span>
                    <input 
                        type="number" 
                        name="max-year" 
                        id="max-year" 
                        className="filter-year"
                        value={filters.maxYear}
                        onChange={handleMaxYearChange}
                    />
                </div>

                <div>
                    <label htmlFor="adult">adult: </label>
                    <input 
                        type="checkbox" 
                        name="adult" 
                        id="adult" 
                        checked={filters.adult}
                        onChange={handleAdultChange}
                    />
                </div>
            </div>
        </div>
    );
}