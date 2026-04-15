import "../index.css"
import { Link } from 'react-router-dom'

export default function NavBar () {
    return (
        <div className="nav-bar">
            <h1>movdash - popular movies</h1>

            <ul className="nav-links">
                <li><Link to="/">dashboard</Link></li>
                <li>about</li>
            </ul>
        </div>
    );
}