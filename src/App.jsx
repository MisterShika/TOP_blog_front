import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';


function App() {
    const [postList, setPostList] = useState();
    const [postLoading, setPostLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const postData = await axios('http://localhost:3000/posts');
                setPostList(postData.data);
            }catch (error){
                console.error("Error in front end user fetching", error);
            }finally{
                setPostLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div>
                Hello World
                {postLoading === true ? (
                    <p>Loading Posts ...</p>
                ) : (
                    postList.map(post => (
                        <a href="#" key={post.id}>
                            {post.title}
                        </a>
                    ))
                )}
            </div>
        </>
    )
}

export default App
