export default function MovieFilters ( {genreList} ) {
    return (
        <div className="movie-list">
            <div className="filters">
                <div>
                    <select name="genre" id="genre">
                        <optgroup label="genre"></optgroup>

                        <option value="All">All</option>
                        {genreList?.genres?.map((genre) => {
                            return (<option key={genre.id} value={genre.id}>{genre.name}</option>)
                        })}
                    </select>
                </div>

                <div>
                    <label htmlFor="genre">year</label>
                    <input type="number" name="min-year" id="min-year" className="filter-year" style={{margin: "0 0 0 16px"}}/>
                    <span> to </span>
                    <input type="number" name="max-year" id="max-year" className="filter-year"/>
                </div>

                <div>
                    <label htmlFor="adult">adult: </label>
                    <input type="checkbox" name="adult" id="adult" />
                </div>
            </div>
        </div>
    );
}