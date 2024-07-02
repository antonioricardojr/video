import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deletePost, fetchPost } from "../../services/postService";


function PostDetails() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const data = await fetchPost(id);
                setPost(data);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        };

        fetchCurrentPost();

    }, [id]);

    const deletePostHandler = async () => {
        // It deletes the post by the id and then redirects to the home page
        try {
            await deletePost(id);
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h2>{ post.title }</h2>
            <p>{ post.body }</p>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <Link to="/">Back to Posts</Link>
            {" | "}
            <button onClick={deletePostHandler}>Delete</button>
        </div>
    )
}


export default PostDetails;