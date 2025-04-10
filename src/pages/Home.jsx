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
            Hello World
            {postLoading === true ? (
                <p>Loading Posts ...</p>
            ) : (
                postList.map(post => (
                    <Link to={`/posts/${post.id}`} key={post.id}>
                        {post.title}
                    </Link>
                ))
            )}
        </div>
    )
}

export default Home;