import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post(
                'http://localhost:3000/users/login',
                {
                    email,
                    password
                }
            );

            const token = response.data.token;
            
            login(token);
            navigate('/');
        }catch(error){
            console.error("Error in logging in from frontend", error);
            throw error;
        }
    }

    return (
        <div>
            <div>
                Errors to go here
            </div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="submit" value="Log In" />
            </form>
        </div>
    );
}

export default Login;