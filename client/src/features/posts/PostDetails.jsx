import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deletePost, fetchPost } from "../../services/postService";
import "./PostImage.css";


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
                console.error("Failed to fetch the post: ", error)
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
            console.error("Failed to delete the post: ", error)
        }
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h2>{ post.title }</h2>
            <img src={post.image_url} alt={post.title} className="post-image" />
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