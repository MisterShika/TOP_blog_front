import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import UserDetail from './pages/UserDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
    )
}

export default App
