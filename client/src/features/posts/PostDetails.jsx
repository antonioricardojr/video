import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from "../../constants";


function PostDetails() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    console.log('id: ', id)
    console.log(`${API_URL}/${id}`)

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setPost(json);
                    setLoading(false);
                } else {
                    throw response;
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchCurrentPost();

    }, [id]);

    const deletePost = async () => {
        // It deletes the post by the id and then redirects to the home page
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                navigate('/');
            } else {
                throw response;
            }
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
            <button onClick={deletePost}>Delete</button>
        </div>
    )
}


export default PostDetails;