import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyPlayers, deletePlayer } from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';
import photo from './images/photo.svg';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function MyPlayers(){

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            const {success, data} = await getMyPlayers();
            if(success){
                setPosts(data);
            }else{
                navigate("/login", {state: { message: data }});
            }
        }
        loadPosts();
    }, [])

    const handleClick = async (playerId) => {
        const {success, data} = await deletePlayer(playerId);
        if(success){
            navigate('/players/my', {state: {message: data}});
        }else{
            toast(data)
            navigate('/players/my')
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {posts.map((p) => (
                            <div className="col" key={p.id}>
                                <div className="card border mb-3" style={{ padding: "20px"}}>
                                    <div style={{textDecoration: 'none'}}>
                                        <Link to={'/players/' + p.id} className='text-dark' style={{textDecoration: 'none'}}>
                                        <h5 className="card-title">{p.name}</h5>
                                        </Link>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <Link to={'/players/' + p.id + '/edit'}>
                                            <button className='btn btn-primary'>EDIT</button>
                                        </Link>
                                        <button onClick={() => handleClick(p.id)} className='btn btn-danger'>
                                            REMOVE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
    
}