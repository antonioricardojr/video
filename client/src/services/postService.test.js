import fetchMock from 'jest-fetch-mock';
import { fetchPost, createPost, updatePost, deletePost, fetchAllPosts } from './postService';
import { API_URL } from '../constants';
import { waitFor } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/cjs/utils/index.js';

fetchMock.enableMocks();

jest.mock('../constants', () => ({
    API_URL: 'http://your-test-api-url'
}));

// Test suite for postService
describe('postService', () => {
    // Test case for fetching posts

    describe('fetchPosts', () => {
        beforeEach(() => {
            fetchMock.resetMocks();
        });
        
        it('should fetch posts successfully', async () => {
            // Your test code here
            const mockData = [{id: 1, title: 'Post 1', body: 'Body Post 1'}, {id: 2, title: 'Post 2', body: 'Body Post 2'}];
            fetch.mockResponseOnce(JSON.stringify(mockData));

            const result = await fetchAllPosts();
            expect(result).toEqual(mockData);
        });

        it('fetches a single post', async () => {
            const mockPostId = 1;
            const mockData = {id: mockPostId, title: 'Post 1', body: 'Body Post 1'};
            fetch.mockResponseOnce(JSON.stringify(mockData));

            const result = await fetchPost(mockPostId);
            expect(result).toEqual(mockData);
        });

        it('should handle errors when fetching posts', async () => {
            fetch.mockResponseOnce(JSON.stringify({message: 'Server error'}), {status: 500});
            
            await expect(fetchAllPosts()).rejects.toThrow();
        });

        it('should handle errors when fetching a single post', async () => {
            const mockPostId = 1;
            fetch.mockResponseOnce(JSON.stringify({message: 'Post not found'}), {status: 404});
            
            await expect(fetchPost(mockPostId)).rejects.toThrow();
        });
    });

    // Test case for creating a post
    describe('createPost', () => {
        it('should create a post successfully', async () => {
            const mockPostData = {title: 'Post 1', body: 'Body Post 1'};
            const mockResponse = {id: 1, title: 'Post 1', body: 'Body Post 1'};
            fetch.mockResponseOnce(JSON.stringify(mockResponse));

            const result = await createPost(mockPostData);
            expect(result).toEqual(mockResponse);
        });

        it('should handle errors when creating a post', async () => {
            const mockPostData = {title: 'Post 1', body: 'Body Post 1'};
            fetch.mockResponseOnce(JSON.stringify({message: 'Server error'}), {status: 500});
            
            await expect(createPost(mockPostData)).rejects.toThrow();
        });
    });

    // Test case for updating a post
    describe('updatePost', () => {
        it('should update a post successfully', async () => {
            const mockPostId = 1;
            const mockPostData = {title: 'Post 1', body: 'Body Post 1'};
            const mockResponse = {id: mockPostId, title: 'Post 1', body: 'Body Post 1'};
            fetch.mockResponseOnce(JSON.stringify(mockResponse));

            const result = await updatePost(mockPostId, mockPostData);
            expect(result).toEqual(mockResponse);
        });

        it('should handle errors when updating a post', async () => {
            // Your test code here
            const mockPostId = 1;
            const mockPostData = {title: 'Post 1', body: 'Body Post 1'};
            fetch.mockResponseOnce(JSON.stringify({message: 'Post not found'}), {status: 404});
            
            await expect(updatePost(mockPostId, mockPostData)).rejects.toThrow();
        });
    });

    // Test case for deleting a post
    describe('deletePost', () => {
        it('should delete a post successfully', async () => {
            const mockPostId = 1;
            fetch.mockResponseOnce(null, {status: 204});

            const result = await deletePost(mockPostId);
            expect(result).toBeNull();
        });

        it('should handle errors when deleting a post', async () => {
            // Your test code here
            const mockPostId = 1;
            fetch.mockResponseOnce(JSON.stringify({message: 'Post not found'}), {status: 500});
            
            await expect(deletePost(mockPostId)).rejects.toThrow();
        });
    });
});