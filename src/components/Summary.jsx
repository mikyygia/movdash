export default function Summary () {
    return (
        <div className="summary">
            <h1 className="section-header">summary</h1>

            <ul className="summary-stats">
                <li>
                    <h3>total movies fetched</h3>
                    <p>0</p>
                </li>

                <li>
                    <h3>average content score</h3>
                    <p>0.0</p>
                </li>

                <li>
                    <h3>most common genre</h3>
                    <p>romance, action, thriller</p>
                </li>
            </ul>
        </div>
    );
}