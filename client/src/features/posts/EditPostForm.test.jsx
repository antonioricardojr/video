import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fetchPost, updatePost } from '../../services/postService';
import { act } from 'react';
import EditPostForm from './EditPostForm';


jest.mock('../../services/postService', () => ({
    fetchPost: jest.fn(),
    updatePost: jest.fn()
}));

describe('EditPostForm component', () => {
    const mockPost = {
        title: 'Original Post Title',
        body: 'Original Post Body'
    };

    const renderForm = () => 
        render(
            <MemoryRouter initialEntries={['/posts/1/edit']}>
                <Routes>
                    <Route path="/posts/:id/edit" element={<EditPostForm />} />
                    <Route path="/posts/:id" element={<h1>Post Details</h1>} />
                </Routes>
            </MemoryRouter>
        );

    beforeEach(() => {
        fetchPost.mockResolvedValue(mockPost);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the EditPostForm component', async () => {
        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockPost.body)).toBeInTheDocument();
    });

    it('successfully updates the post and redirects', async () => {

        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        const newPost = {
            title: "New Post Title",
            body: "New Post Body"
        }

        fireEvent.change(screen.getByLabelText("Title"), { target: { value: newPost.title } });
        fireEvent.change(screen.getByLabelText("Body"), { target: { value: newPost.body } });

        await act(async () => {
            fireEvent.click(screen.getByText("Save"));
        })

        await waitFor(() => {
            expect(updatePost).toHaveBeenCalledTimes(1);
            expect(updatePost).toHaveBeenCalledWith('1', newPost);
        });

        expect(screen.getByText("Post Details")).toBeInTheDocument();
    });

    it('handles the error when fetching the post', async () =>{
        const expectedError = new Error('Fetch failed');
        fetchPost.mockRejectedValueOnce(expectedError);

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });
        
        expect(consoleSpy).toHaveBeenCalledWith(
            "Failed to fetch the post: ", 
            expectedError
        );

    });

    it('handles the error when updating the post', async () =>{
        const expectedError = new Error('Update failed');
        updatePost.mockRejectedValueOnce(expectedError);

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderForm();

        await waitFor(() => {
            fireEvent.click(screen.getByText("Save"));
        });        

        await waitFor(() => {
            expect(updatePost).toHaveBeenCalledTimes(1);
        });
        
        expect(consoleSpy).toHaveBeenCalledWith(
            "Failed to update the post: ", 
            expectedError
        );

    });
});