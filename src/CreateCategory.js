import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { useState, useEffect } from 'react';
import { savePlayers, getAllCategories, saveCat } from './api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useNavigate, Link} from 'react-router-dom'
import { type } from '@testing-library/user-event/dist/type';
import { toast } from 'react-toastify';

export default function CreateForm(){

    const navigate = useNavigate();

    const [categories, setCats] = useState({
        name: ''
    });

    const handleCat = (event) => { setCats({...categories, name: event.target.value}) }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log(categories);
        const {success, data} = await saveCat(categories);
        if(success){
            navigate('/players',{state: {message: data}});
        }else{
            toast(data);
        }
        
    }

    


    return (
        <div className='container d-flex justify-content-center'>
            <NotificationContainer />
            <form onSubmit={handleSubmit} style={{width: "60%"}} className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center' style={{width: "60%"}}>
                    <div class="form-group" style={{width: "100%"}}>
                        <div>
                            <div className='text-center text-primary mt-4 mb-5'>
                            </div>
                            <label className='mb-1'>NAME:</label>
                            <input type="text" className="form-control" placeholder="Enter Name" onChange={handleCat} width={10}/>
                            <br/><br/>
                            <div className='d-flex justify-content-between'>
                                <button type='submit' className="btn btn-dark mb-2">
                                    CREATE
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