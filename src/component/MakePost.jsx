import {useState} from 'react';

function MakePost () {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const handleSubmit = async (event) => {
        console.log("Test");
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