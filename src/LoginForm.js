import { useState } from "react";
import { doLogin } from "./api";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function LoginForm(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const { success, data } = await doLogin(email, password);
        if(success){
            navigate('/players', {state: {message: data}})
        }else{
            toast(data)
            navigate('/login')
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} style={{width: "60%"}} className="d-flex justify-content-center">
                <div style={{width: "50%"}} className="mt-5">
                    <div className="text-center mb-5">
                        <h2 className="text-primary text-dark">SIGN IN</h2>
                    </div>
                    <div className="d-flex justify-content-center" style={{width: "100%"}}>
                        <div style={{width: "70%"}}>
                            <div className="form-group">
                                <input type="email" value={email} className="form-control mb-2" onChange={(e) => setEmail(e.target.value)}  placeholder="email" style={{ color: "black" }} />
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" value={password} className="form-control mb-2" onChange={(e) => setPassword(e.target.value) } placeholder="password" style={{ color: "black" }} />
                            </div>
                            <button type="submit" className="btn btn-primary btn btn-dark ms-3">Login</button>
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}
