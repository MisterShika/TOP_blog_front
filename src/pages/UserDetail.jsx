import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail () {
    const { id: userId } = useParams();
    const [userInfo, setUserInfo] = useState();
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const userData = await axios(`http://localhost:3000/users/${userId}`);
                console.log(userData);
                setUserInfo(userData.data);
                setLoadingUserInfo(false);
            }catch (error){
                console.error("Error in getting user data from front end", error);
                throw error;
            }
        }

        fetchUser();
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
        </>
    );
}

export default PostDetail;