"use client"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";

function EditPostForm() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPost(id)
        .then((data) => {
            setPost(data);
            setLoading(false);
         }).catch((error) => {
            setError(error);
            setLoading(false);
         });
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('clicked')
        await updatePost(id, post);
        navigate(`/posts/${id}`);
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