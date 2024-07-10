// API_URL comes from the .env.development file
import { useState, useEffect } from "react";
import { deletePost } from "../../services/postService";
import { Link, useSearchParams } from "react-router-dom";
import "./PostImage.css";
import SearchBar from "./SearchBar";
import usePostsData from "../../hooks/usePostsData";
import useURLSearchParam from "../../hooks/useURLSearchParam";

import Pagination from "./Pagination";
function PostsList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("");
    
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPageFromURL = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initialPageFromURL);

    const [ posts, setPosts ] = useState([]);

    const {
        posts: fetchedPosts,
        totalPosts,
        loading, 
        error,
        perPage,
        } = usePostsData(debouncedSearchTerm, currentPage); // Note the change here

    useEffect(() => {
        if (fetchedPosts) {
            setPosts(fetchedPosts); // Update the posts once fetchedPosts is available
        }
    }, [fetchedPosts])

    useEffect(() => {
        const initialSearchTerm = searchParams.get("search") || "";
        setSearchTerm(initialSearchTerm);
    
        const pageFromURL = searchParams.get("page") || "1";
        setCurrentPage(Number(pageFromURL));
      }, [searchParams]);

    const deletePostHandler = async (id) => {
        // it deletes a post by id and then reloads the posts filtering out the deleted post
        try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (e) {
            console.error("Failed to delete posts: ", e);
        }
    }

    const handleImmediateChange = (searchValue) => {
        setSearchTerm(searchValue);
    }

    const handleDebouncedSearchChange = (searchValue) => {
        setDebouncedSearchTerm(searchValue);

    }

    const handlePageChange = (page) => { 
        setCurrentPage(page);
        setSearchParams({ search: debouncedSearchTerm, page: page });
    };

    // Fetch posts from the API
    return <div>
        <SearchBar 
            value={searchTerm}
            onSearchChange={handleDebouncedSearchChange}
            onImmediateChange={handleImmediateChange}
        />
        <Pagination 
            currentPage={currentPage}
            totalPosts={totalPosts}
            postsPerPage={perPage}
            onPageChange={handlePageChange}
         />
        {loading && <p>Loading...</p>}
        {error && <p>Error loading posts...</p>}
        {posts.map((post) => (
            <div key={post.id} className="post-container">
                <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    <Link to={`/posts/${post.id}`} className="post-title">
                    {post.title}
                    </Link>
                </h2>
                <div className="post-image-container">
                    {post.image_url ? 
                        (
                            <img src={post.image_url} alt={post.title} className="w-80 h-40 object-cover rounded-lg border border-gray-300 shadow-md" />
                        ) : (
                            <div className="w-80 h-40 object-cover rounded-lg border border-gray-300 shadow" data-testid="post-image-stub"/>
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