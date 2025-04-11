import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PostDetail () {
    const { id: userId } = useParams();
    const [userInfo, setUserInfo] = useState();
    const [userPosts, setUserPosts] = useState();
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);
    const [loadingPostInfo, setLoadingPostInfo] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const userData = await axios(`http://localhost:3000/users/${userId}`);
                setUserInfo(userData.data);
                setLoadingUserInfo(false);
            }catch (error){
                console.error("Error in getting user data from front end", error);
                throw error;
            }
        }
        const fetchUserPosts = async () => {
            try{
                const posts = await axios(`http://localhost:3000/posts/postByAuthor/${userId}`);
                setUserPosts(posts.data);
                setLoadingPostInfo(false);
            }catch (error){
                console.error("Error getting user posts on user page", error);
                throw error;
            }
        }

        fetchUser();
        fetchUserPosts();
    }, []);

    return (
        <>
            {loadingUserInfo == true ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div>
                    Info
                    {userInfo.email}
                </div>
            )}
            {loadingPostInfo == true ? (
                <div>
                    Loading Posts...
                </div>
            ) : (
                <div>
                    {userPosts.map(post => (
                        <div key={post.id}>
                            <Link to={`../posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default PostDetail;