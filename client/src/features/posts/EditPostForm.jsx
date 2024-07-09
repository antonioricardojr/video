"use client"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";
import PostForm from "./PostForm";
import { objectToFormData } from "../../utils/formDataHelper";

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
            console.error('Failed to fetch the post: ', error)
         });
    }, [id])

    const handleEditSubmit = async (rawData) => {
        try {
            const sanitizedData = {
                    title: rawData.title,
                    body: rawData.body,
                    image: rawData.image
            }
            const formData = objectToFormData({post: sanitizedData})
            await updatePost(id, formData);
            navigate(`/posts/${post.id}`);
        } catch (error) {
            console.error("Failed to update the post: ", error);
        }
    }

    if (!post) {
        return <h2>Loading...</h2>
    }

    return (
        <PostForm 
            post={post}
            headerText="Edit Post"
            onSubmit={handleEditSubmit}
            buttonText="Save" />
    )
}

export default EditPostForm;