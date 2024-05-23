import { useState } from "react";
import { register } from "./api";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function RegisterForm(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const { success, data } = await register(email, password, username);
        if(success){
            navigate('/', {state: {message: data}})
        }else{
            toast(data)
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} style={{width: "70%"}} className="d-flex justify-content-center">
                <div style={{width: "60%"}} className="mt-5">
                    <div className="text-center mb-5">
                        <h2 className="text-primary text-dark">SIGN UP</h2>
                    </div>
                    <div className="d-flex justify-content-center" style={{width: "100%"}}>
                        <div style={{width: "70%"}}>
                            <div class="form-group mb-3">
                                <input type="text" value={username} class="form-control mb-2" onChange={(e) => setUsername(e.target.value) } placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <input type="email" value={email} class="form-control mb-2" onChange={(e) => setEmail(e.target.value)}  placeholder="Email" />
                            </div>
                            <div class="form-group">
                                <input type="password" value={password} class="form-control mb-2" onChange={(e) => setPassword(e.target.value) } placeholder="Password" />
                            </div>
                            <button type="submit" class="btn btn-primary btn btn-dark ms-3">register</button>
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}