import { useState, useEffect } from 'react';
import { fetchAllPosts, searchPosts } from '../services/postService';


function usePostsData(searchTerm) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                const posts = searchTerm ? await searchPosts(searchTerm) : await fetchAllPosts();
                setPosts(posts);
            } catch (e) {
                setError("An error occurred. Awkward...");
                console.error("Failed to fetch posts: ", e);
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, [searchTerm])

    return { posts, loading, error };
}

export default usePostsData;