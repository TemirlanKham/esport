import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { useState, useEffect } from 'react';
import { savePlayer, getAllCategories, getPlayersAndCats } from './api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useNavigate, Link} from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateForm(){

    const navigate = useNavigate();

    const [player, setPlayer] = useState({
        name: '',
        info: '',
        categoryId: 0
    });
    const [cats, setCats] = useState([]);

    const handleName = (event) => {
        setPlayer({...player, name: event.target.value})
    }

    const handleInfo = (event) => { setPlayer({...player, info: event.target.value}) }
    const handleCat = (event) => { setPlayer({...player, categoryId: parseInt(event.target.value)}) }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const {success, data} = await savePlayer(player);
        if(success){
            navigate('/players', {state: {message: data}});
        }else{
            toast(data)
        }
        
    }

    useEffect(() => {

        let url = 'http://localhost:3005/players';
        const fun = async () => {
            const [cats, players] = await getPlayersAndCats(url);
            setCats(cats);
        }

        fun();

    }, []);

    


    return (
        <div className='container d-flex justify-content-center'>
            <NotificationContainer />
            <form onSubmit={handleSubmit} style={{width: "60%"}} className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center'  style={{width: "60%"}}>
                    <div class="form-group" style={{width: "100%"}}>
                        <div>
                            <div className='text-center text-primary mt-3 mb-3'>
                            </div>
                            <label>NAME:</label>
                            <input type="text" className="form-control" placeholder="Enter Name" value={player.name} onChange={handleName} width={10}/>

                            <label>INFO:</label>
                            <input type="text" className="form-control" placeholder="Enter Info" value={player.info} onChange={handleInfo} />

                            <label className='mr-3'>CATEGORY:</label><br/>
                            <select className='ml-3'onChange={handleCat} >
                            <option>------</option>
                                {
                                    cats.map((cat) => {
                                        return (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <br/><br/>
                            <div className='d-flex justify-content-between'>
                                <button type='submit' className="btn btn-dark mb-2">
                                    CREATE LIST
                                </button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Link to={'/players'} className='text-dark'>
                                <button className="btn btn-dark mb-2 d-flex justify-content-end" >
                                    BACK
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
            
        </div>
    );
}