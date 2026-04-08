const findAverage = (results) => {
    // Σ(vote_average × vote_count) / Σ(vote_count)

    const weightedScore = results?.reduce((sum, mov) => sum + mov.vote_average * mov.vote_count, 0);
    const votes = results?.reduce((sum, mov) => sum + mov.vote_count, 0);

    return votes > 0 ? weightedScore / votes : 0;
};

const findTop3GenresID = (results) => {
    let genreList = results?.reduce((list, mov) => {
        mov.genre_ids?.forEach((g, _) => list[g] = (list[g] ?? 0) + 1)
        return list
    }, {});

    return Object.entries(genreList ?? {})
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([genre]) => genre);
};

const getGenreById = (idList, refList) => { 
    return refList.genres?.filter((g) => idList.includes(`${g.id}`))
        .map((genre) => genre.name);
}

export default function Summary ({movieData, genreList, filteredMovies}) {
    return (
        <div className="summary">
            <h1 className="section-header">summary</h1>
            <ul className="summary-stats">
                <li>
                    <h3>total movies fetched</h3>
                    <p>{movieData.results?.length || 0}</p>
                </li>

                <li>
                    <h3>total movies shown</h3>
                    <p>{filteredMovies?.length || 0}</p>
                </li>

                <li>
                    <h3>average rating score</h3>
                    <p>{findAverage(filteredMovies).toFixed(2)}</p>
                </li>

                <li>
                    <h3>most common genre</h3>
                    <p>{getGenreById(findTop3GenresID(filteredMovies), genreList)?.join(", ") || ""}</p>
                </li>
            </ul>
        </div>
    );
}