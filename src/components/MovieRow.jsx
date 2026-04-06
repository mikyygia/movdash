import "../index.css"

export default function MovieRow () {
    return (
        <div>
            <table className="movie-row">
                <tr>
                    <th>poster</th>
                    <th>title</th>
                    <th>genre</th>
                    <th>year</th>
                    <th>rating</th>
                </tr>

                <tr>
                    <td><img style={{width: 150}} src="https://www.themoviedb.org/t/p/w1280/vIE1llfr1lcmzlsV4xn8vhgtlQN.jpg" alt="daemon of the shadow realm" /></td>
                    <td>daemon of the shadow realm</td>
                    <td>anime, shounen, fantasy, based on manga</td>
                    <td>2026</td>
                    <td>98</td>
                </tr>
            </table>
        </div>
    );
}