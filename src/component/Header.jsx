import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Header () {
    const { user, logout } = useAuth();

    console.log(`Test:\n${JSON.stringify(user, null, 2)}`);


    return(
        <header>
            {
                user != null ? (
                    <div>
                        <Link to={`/`}>Home</Link>
                        <div>
                            Logged in as : {user.loginData.email}
                        </div>
                        <button onClick={logout}>Log Out</button>
                    </div>
                ) : (
                    <div>
                        <Link to={`/login`}>
                            Log In
                        </Link>
                        <Link to={`/signup`}>
                            Sign Up
                        </Link>
                    </div>
                )
            }
        </header>
    )
}

export default Header;