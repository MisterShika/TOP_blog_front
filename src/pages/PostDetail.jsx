import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail () {
    const { id: postId } = useParams();
    const [postInfo, setPostInfo] = useState();
    const [commentInfo, setCommentInfo] = useState();
    const [postLoading, setPostLoading] = useState(true);
    const [commentLoading, setCommnentLoading] = useState(true);

   
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
    }, []);

    return (
        <>
            {postLoading === true ? (
                <p>Loading Post ...</p>
            ) : (
                <div>
                    <h2>{postInfo.title}</h2>
                    <h3></h3>
                    <div>
                        {postInfo.body}
                    </div>
                </div>
            )}
            {commentLoading === true ? (
                <p>Loading Comments ...</p>
            ) : (
                <div>
                    {commentInfo.map(comment => (
                        <div key={comment.id}>
                            <span>{comment.body}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default PostDetail;