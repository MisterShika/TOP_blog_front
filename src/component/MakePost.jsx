import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MakePost () {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const token = sessionStorage.getItem('token')

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(
            'http://localhost:3000/posts/addPost',
            {
                title,
                content
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(res => {
            console.log("Post successful", res.data);
            navigate('/');
        }).catch(err => {
            console.error("Error making post frontend", err)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />

            <textarea
            name="content"
            placeholder="Write your post here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            ></textarea>

            <button type="submit">Submit</button>
        </form>
    );
}

export default MakePost;