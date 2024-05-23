import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { useState, useEffect } from 'react';
import { getOnePlayer, updatePlayer, getAllCategories, getPlayersAndCats } from './api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useNavigate, useParams, Link} from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditForm(){

    const navigate = useNavigate();
    const params = useParams();
    console.log(params)
    
    const [player, setPlayer] = useState({
        name: '',
        info: '',
        categoryId: 0
    });
    
    const [cats, setCategories] = useState([]);

    
    useEffect(() => {
        const getPlayer= async () => {
            const response = await getOnePlayer(params.playerId);
            setPlayer(response.data);
            console.log(response)
        }

        let url = 'http://localhost:3005/players';
        const fun = async () => {
            const [cats, players] = await getPlayersAndCats(url);
            setCategories(cats);
        }
        getPlayer();
        fun();

        

    }, [params.playerId]);

    console.log(player)


    const handleName = (event) => { setPlayer({...player, name: event.target.value}) }
    const handleInfo = (event) => { setPlayer({...player, info: event.target.value}) }
    const handleUpdateCategory = (event) => { setPlayer({...player, categoryId: parseInt(event.target.value)}) }


    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const {success, data} = await updatePlayer(player);
        if(success){
            navigate('/player', {state: {message: data.message}});
        }else{
            toast(data)
            navigate('/player')
        }
    }


    return (
        <div className='container d-flex'>
            <NotificationContainer />
            <form onSubmit={handleSubmit} style={{width: "80%"}} className='d-flex'>
                <div className="form-group" style={{width: "50%"}}>
                    <div>
                        <div className='text-center mt-3 mb-4 text-primary'>
                            <h2>EDIT PLAYER</h2>
                        </div>

                        <label className='mb-1'>NAME:</label>
                        <input type="text" className="form-control mb-2" placeholder="Enter Name" value={player.name} onChange={handleName} width={10}/>

                        <label className='mb-1'>INFO:</label>
                        <input type="text" className="form-control mb-2" placeholder="Enter Info" value={player.info} onChange={handleInfo} />

                        <label className='mr-3'>CATEGORY:</label><br/>
                        <select value={player.categoryId} onChange={handleUpdateCategory}>
                            <option>------</option>
                            {
                                cats.map((c) => {
                                    return (
                                        <option key={c.id} value={c.id}>
                                            {c.name} 
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <br/><br/>
                        <div className='d-flex justify-content-between'>
                            <button type='submit' className="btn btn-dark mb-2">
                                EDIT
                            </button>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Link to={'/players'}>
                            <button className="btn btn-dark mb-2">
                                BACK
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}