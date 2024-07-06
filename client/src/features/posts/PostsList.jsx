// API_URL comes from the .env.development file
import { useState, useEffect } from "react";
import { deletePost, fetchAllPosts } from "../../services/postService";
import { Link } from "react-router-dom";
import "./PostImage.css";

function PostsList() {
    const [ posts, setPosts ] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                const posts = await fetchAllPosts();
                setPosts(posts);
                setLoading(false);
            } catch (e) {
                setError("An error occurred. Awkward...")
                console.error("Failed to fetch posts: ", e)
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, [])

    const deletePostHandler = async (id) => {
        // it deletes a post by id and then reloads the posts filtering out the deleted post
        try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (e) {
            console.error("Failed to delete posts: ", e);
        }

    }


    // Fetch posts from the API
    return <div>
    {posts.map((post) => (
        <div key={post.id} className="post-container">
            <h2>
                <Link to={`/posts/${post.id}`} className="post-title">
                {post.title}
                </Link>
            </h2>
            <div className="post-image-container">
                {post.image_url ? 
                    (
                        <img src={post.image_url} alt={post.title} className="post-image" />
                    ) : (
                        <div className="post-image-stub" />
                )}
            </div>
            <div className="post-links">
                <Link to={`/posts/${post.id}/edit`}>Edit</Link>
                {" | "}
                <button onClick={() => deletePostHandler(post.id)}>Delete</button>
            </div>
        </div>
    ))}
</div>
}


export default PostsList;