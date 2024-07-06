import { API_URL } from "../constants";


async function createPost(postData) {
    const response = await fetch(API_URL, {
        method: "POST",
        body: postData,
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(response.statusText)
    }
}

async function fetchAllPosts() {
    const response = await fetch(API_URL);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(response.statusText)
    }
}

async function fetchPost(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(response.statusText)
    }    
}

async function deletePost(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (response.status === 204) {
        return null;
    }

    throw new Error(response.statusText)
}

async function updatePost(id, postData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        body: postData,
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(response.statusText)
    }
}
export { createPost, deletePost, fetchAllPosts, fetchPost, updatePost };