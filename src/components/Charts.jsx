import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useState, useEffect } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

const API_TOKEN = import.meta.env.VITE_APP_API_READ_ACCESS_TOKEN;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

export default function Charts({ movies, genreList }) {
  const [ratingBudgetData, setRatingBudgetData] = useState([]);

  // Fetch budget data for first 10 movies (to avoid rate limits)
  useEffect(() => {
    const fetchBudgetData = async () => {
      if (!movies?.results?.length) return;

      const budgetPromises = movies.results.slice(0, 10).map(async (movie) => {
        try {
          const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options);
          const data = await res.json();
          return {
            rating: movie.vote_average,
            budget: data.budget ? data.budget / 1000000 : null, // Convert to millions
            title: movie.title
          };
        } catch (error) {
          console.log(`Error fetching budget for ${movie.title}:`, error);
          return null;
        }
      });

      const budgetResults = await Promise.all(budgetPromises);
      const validData = budgetResults.filter(item => item && item.budget && item.budget > 0);
      setRatingBudgetData(validData);
    };

    fetchBudgetData();
  }, [movies]);

  // Prepare data for rating vs popularity scatter plot (available immediately)
  const ratingPopularityData = movies?.results?.filter(movie =>
    movie.vote_average && movie.popularity
  ).map(movie => ({
    rating: movie.vote_average,
    popularity: movie.popularity,
    title: movie.title
  })) || [];

  // Prepare data for genre pie chart
  const genreCount = {};
  movies?.results?.forEach(movie => {
    movie.genre_ids?.forEach(genreId => {
      const genre = genreList?.genres?.find(g => g.id === genreId);
      if (genre) {
        genreCount[genre.name] = (genreCount[genre.name] || 0) + 1;
      }
    });
  });

  const genrePieData = Object.entries(genreCount).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="charts-container">
      <div className="chart-item">
        <h3>Rating vs Popularity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={ratingPopularityData}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="popularity"
              name="Popularity"
              label={{ value: 'Popularity Score', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              type="number"
              dataKey="rating"
              name="Rating"
              label={{ value: 'Rating', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value, name) => [
                value,
                name === 'popularity' ? 'Popularity' : 'Rating'
              ]}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.title || ''}
            />
            <Scatter dataKey="rating" fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-item">
        <h3>Rating vs Budget (Sample)</h3>
        <p style={{fontSize: '12px', color: '#666', marginBottom: '8px'}}>
          Shows budget data for first 10 movies (fetched individually)
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={ratingBudgetData}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="budget"
              name="Budget (M$)"
              label={{ value: 'Budget (Millions $)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              type="number"
              dataKey="rating"
              name="Rating"
              label={{ value: 'Rating', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value, name) => [
                name === 'budget' ? `$${value}M` : value,
                name === 'budget' ? 'Budget' : 'Rating'
              ]}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.title || ''}
            />
            <Scatter dataKey="rating" fill="#82ca9d" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-item">
        <h3>Genre Distribution</h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={genrePieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {genrePieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} movies`, name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}