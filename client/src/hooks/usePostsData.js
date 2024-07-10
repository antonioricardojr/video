import { useState, useEffect } from 'react';
import { fetchAllPosts, searchPosts } from '../services/postService';


function usePostsData(searchTerm, page = 1) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPosts, setTotalPosts] = useState(0);
    const [perPage, setPerPage] = useState(10);


    useEffect(() => {
        async function loadPosts() {
            try {
                const data = searchTerm ? await searchPosts(searchTerm, page) : await fetchAllPosts(page);

                if (data.posts) {
                    setPosts(data.posts);
                    setTotalPosts(data.total_count);
                    setPerPage(data.per_page);
                }
            } catch (e) {
                setError("An error occurred. Awkward...");
                console.error("Failed to fetch posts: ", e);
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, [searchTerm, page])

    return { posts, loading, error, totalPosts, perPage};
}

export default usePostsData;