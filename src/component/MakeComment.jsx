import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MakeComment ({postId}) {
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const token = sessionStorage.getItem('token')

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(
            'http://localhost:3000/comments/addComment',
            {
                postId,
                content,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(res => {
            console.log("Comment successful", res.data);
            navigate(0);
        }).catch(err => {
            console.error("Error making comment frontend", err)
        });
    };

    return (
        <form onSubmit={handleSubmit}>

            <textarea
            name="content"
            placeholder="Write your comment here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            ></textarea>

            <button type="submit">Submit</button>
        </form>
    );
}

export default MakeComment;