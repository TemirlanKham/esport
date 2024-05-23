import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import photo from './images/photo.svg';

export default function Player() {
    const player = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        if (player.success === false) {
            navigate('/players', { state: { message: player.data } })
        }
    }, [])

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{player.data.name}</h5>
                    <p className="card-text">{player.data.info}</p>
                    <Link to={'/players'} className="btn btn-primary btn-dark ms-3">Back to Players</Link>
                </div>
            </div>
        </div>
    );
}
