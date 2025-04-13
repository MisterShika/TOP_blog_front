import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home () {
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
        <div>
            <h1>TOP Blog</h1>
            {postLoading === true ? (
                <p>Loading Posts ...</p>
            ) : (
                postList.map(post => (
                    <div key={post.id}>
                        <h2>
                            <Link to={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </h2>
                        <h3>
                            {post.createdAt}
                        </h3>
                        <h4>
                            <Link to={`/users/${post.authorId}`}>
                                {post.author.email}
                            </Link>
                        </h4>
                    </div>
                ))
            )}
            <div>
                <Link to={`/login`}>
                    Log In
                </Link>
            </div>
        </div>
    )
}

export default Home;