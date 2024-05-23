import {Link, Outlet, useLoaderData, useLocation, useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { deleteCat, deletePlayer, getPlayersAndCats, getAllPlayers} from './api';
import photo from './images/photo.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsDisplay } from 'react-icons/bs';
import { flushSync } from 'react-dom';

export default function Players(){

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [players, setPlayers] = useState([]);
    const [user, setUser] = useState(null); 


    useEffect(() => {

        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }

        const fetchPlayersByCategory = async () => {
            try {
                if(params.catId != null){
                    const response = await axios.get(`http://localhost:3005/players/category/${params.catId}`);
                    setPlayers(response.data);
                }else{
                    const resp = await axios.get('http://localhost:3005/players')
                    setPlayers(resp.data);
                }
                
            } catch (error) {
                console.error('Error fetching players by category:', error);
            }
        };

        fetchPlayersByCategory();
    }, [location]);

    const handleClick = async (playerId) => {
        const {success, data} = await deletePlayer(playerId);
        if(success){
            navigate('/players', {state: {message: data}});
        }else{
            toast(data)
            navigate('/players')
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {players.map((b) => (
                            <div className="col" key={b.id}>
                                <div className="card border">
                                    <Link to={'/players/' + b.id} className='text-dark' style={{ textDecoration: 'none' }}>
                                        
                                        <div className="card-body">
                                            <h5 className="card-title">{b.name}</h5>
                                            {user && user.id === b.userId && (
                                                <div className='d-flex justify-content-between mb-2'>
                                                    <Link to={'/players/' + b.id + '/edit'} style={{ textDecoration: 'none' }}>
                                                        <button className='btn btn-primary'>EDIT</button>
                                                    </Link>
                                                    <button onClick={() => handleClick(b.id)} className='btn btn-danger' style={{ textDecoration: 'none' }}>
                                                        REMOVE
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
    
}