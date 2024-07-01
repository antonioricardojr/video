import { API_URL } from "../constants";


async function createPost(postData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw response;
        }
    } catch (e) {
        console.log("An error occurred: ", e);
  }
}

async function fetchAllPosts() {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            return await response.json();
        } else {
            throw response;
        }
    } catch (e) {
        console.log("An error occurred: ", e);
    }
}

async function fetchPost(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw response;
        }
    } catch (e) {
        console.log("An error occurred: ", e);
    }
}

async function deletePost(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (e) {
        console.log("An error occurred: ", e);
    }
}

async function updatePost(id, postData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw response;
        }
    } catch (e) {
        console.log("An error occurred: ", e);
    }
}
export { createPost, deletePost, fetchAllPosts, fetchPost, updatePost };