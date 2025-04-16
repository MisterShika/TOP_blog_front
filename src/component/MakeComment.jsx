import {useState} from 'react';

function MakeComment () {
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        console.log("Test");
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