"use client"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants";

function EditPostForm() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: post.title,
                body: post.body
            })
        })
        .then((response) => {
            if (response.ok) {
                console.log('response.ok', response.ok)
                navigate(`/posts/${id}`);
            } else {
                console.log('An error occurred.');
            }
        })
    }

    if (!post) {
        return <h2>Loading...</h2>
    }

    return (
        <div><h2>Edit Post</h2>
        
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="post-title">Title</label>
                <br />
                <input type="text" id="post-title" value={post?.title} 
                onChange={(e) => setPost({...post, title: e.target.value})}/>
            </div>
            <div>
                <label htmlFor="post-body">Body</label>
                <textarea id="post-body" value={post?.body}
                onChange={(e) => setPost({...post, body: e.target.value})}></textarea>
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
        </div>
    )
}

export default EditPostForm;