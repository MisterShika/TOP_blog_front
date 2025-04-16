import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if(token){
            try{
                const decoded = (jwtDecode(token));
                console.log(decoded);
                setUser(decoded);
            }catch (error){
                console.error('Invalid token', error);
                sessionStorage.removeItem('token');
                setUser(null);
            }
        }

    }, []);

    const login = (token) => {
        sessionStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}