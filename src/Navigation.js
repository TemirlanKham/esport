import {Link, Outlet, useLoaderData, useLocation, useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { deleteCat, deletePlayer, getPlayersAndCats} from './api';
import { BsHouse, BsMenuUp } from 'react-icons/bs';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Navigation(){

    
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const [hasToken, setHasToken] = useState(false);
    
    const [categories, setCategories] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {

        let url = params.catId ? 'http://localhost:3005/players?categoryId='+params.catId : 'http://localhost:3005/players';


        if(location.state){
            toast(location.state.message);
            location.state = null
        }
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            setHasToken(true);
        }


        const getAllData = async () => {
            const [cats, players] = await getPlayersAndCats(url);
            setCategories(cats);
            setPlayers(players);
        }
        getAllData();

    }, [location])

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login",{state: {message: "YOU LOGGED OUT"}});
        window.location.reload();
    }

    const handleClickCat =  async (catId) => {
        const {success, data} = await deleteCat(catId);
        console.log(catId)
        console.log(success, data)
        if(success){
            navigate('/players', {state: {message: data}} );
        }else{
            toast(data)
            navigate('/players')
        }
        
    }


    return (
        <div style={{backgroundColor: "rgba(255,255,255, 0.9)"}}>
            <ToastContainer />
            <div className='card justify-content-around text-white' style={{display: 'flex', flexDirection: 'row', padding: "20px", margin: "0", width: "100%"}}>
                


<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div>
        <div>
            <ul className="navbar-nav mb-2 mb-lg-0 ms-lg-4">  
                <li className="nav-item"><a className="nav-link" href="#!"><Link to={'/players'}className='text-light' style={{ textDecoration: 'none' }}>
                    ALL LIST
                </Link></a></li>
                <li className="nav-item"><a className="nav-link" href="#!"> <Link to={'/players/my'} className='text-light' style={{ textDecoration: 'none' }}>
                    MY PLAYERS
                </Link></a></li>
            </ul>
        </div>
    </div>
</nav>

<div className='categories'>
    {hasToken ? (
        <div className='d-flex justify-content-evenly'>
            {categories.map((c) => (
                <div className="" key={c.id}>
                    <div className="card-body">
                        <Link to={'/players/category/'+c.id} className='text-dark' style={{ textDecoration: 'none' }}>
                            {c.name}
                        </Link><br/><br/>
                        <button className='btn btn-light' onClick={() => handleClickCat(c.id)}>
                            REMOVE
                        </button>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div>
        </div>
    )}
</div>

  <div className='mt-3 d-flex justify-content-end' style={{ fontSize: "12px" }}>
    <div>
        {hasToken ? (
            <div>
                <button className='btn btn-dark'>
                    <Link to={'/players/create'} className='text-light' style={{ textDecoration: 'none' }}>
                        ADD PLAYERS
                    </Link>
                </button>
                <button className='btn btn-dark ms-3'>
                    <Link to={'/players/createcat'} className='text-light' style={{ textDecoration: 'none' }}>
                        ADD CATEGORY
                    </Link>
                </button>
                <button className='btn btn-dark ms-3' onClick={logout}>
                    LOGOUT
                </button>   
            </div>
        ) : (
            <div>
                <button className='btn btn-dark ms-3'>
                    <Link to={'/login'} className='text-light' style={{ textDecoration: 'none' }}>
                        SIGN IN
                    </Link>
                </button>    
                <button className='btn btn-dark ms-3'>
                    <Link to={'/register'} className='text-light' style={{ textDecoration: 'none' }}>
                        SIGN UP
                    </Link>
                </button>
            </div>
        )} 
    </div>
  </div>

                <hr />
            </div>
            <hr />
            
            <div style={{minHeight: "50vh"}}>
                <Outlet />
            </div>
            <footer className="text-center text-lg-start bg-body-tertiary text-muted">
      {/* Section: Social media */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      
      </section>

      
      
    </footer>
        </div>
    );
}