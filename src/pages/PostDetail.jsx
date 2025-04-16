import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../component/Header';

import { useAuth } from '../AuthContext';
import MakeComment from '../component/MakeComment';

function PostDetail () {
    const { id: postId } = useParams();
    const [postInfo, setPostInfo] = useState();
    const [commentInfo, setCommentInfo] = useState();
    const [postLoading, setPostLoading] = useState(true);
    const [commentLoading, setCommnentLoading] = useState(true);

    const { user } = useAuth();
   
    useEffect(() => {
         //Getting data for the blog post
        const fetchPosts = async () => {
            try{
                const postData = await axios(`http://localhost:3000/posts/${postId}`);
                setPostInfo(postData.data);
            }catch (error){
                console.error("Error in front end fetching single post", error);
            }finally{
                setPostLoading(false);
            }
        }
        //Getting data for the blog post comments
        const fetchComments = async () => {
            try{
                const commentData = await axios(`http://localhost:3000/comments/${postId}`);
                setCommentInfo(commentData.data);
            }catch (error){
                console.error("Error in front end fetching comments for single post", error);
            }finally{
                setCommnentLoading(false);
            }
        }

        fetchPosts();
        fetchComments();

        console.log(user);
    }, []);

    return (
        <div>
            {
            //Load Posts 
            }
            {postLoading === true ? (
                <p>Loading Post ...</p>
            ) : (
                <div>
                    <Header />
                    <h2>{postInfo.title} - <Link to={`/users/${postInfo.authorId}`}>{postInfo.author.email}</Link></h2>
                    <h3>{postInfo.createdAt}</h3>
                    <div>
                        {postInfo.body}
                    </div>
                </div>
            )}
            {
            //Load Comments
            }
            {commentLoading === true ? (
                <p>Loading Comments ...</p>
            ) : (
                <div>
                    {commentInfo.map(comment => (
                        <div key={comment.id}>
                            <Link to={`/users/${comment.authorId}`}>
                                {comment.author.email}
                            </Link>
                            <span>{comment.body}</span>
                        </div>
                    ))}
                </div>
            )}
            {user != null ? (
                <div>
                    <h3>Make Post</h3>
                    <MakeComment />
                </div>
            ) : (
                <div>
                    <Link to={`/login`}>Log In</Link> to post!
                </div>
            )}
        </div>
    );
}

export default PostDetail;