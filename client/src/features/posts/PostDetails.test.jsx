import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PostDetails from './PostDetails';
import * as postService from '../../services/postService';

jest.mock('../../services/postService', () => ({ 
    fetchPost: jest.fn(),
    deletePost: jest.fn()
}));

describe('PostDetails', () => {

    const mockPost = {
        id: 1,
        title: "Test Post Title",
        body: "Test Post Body"
    };

    const renderComponent = () => {
        render(
            <MemoryRouter initialEntries={[`/posts/${mockPost.id}`]}>
                <Routes>
                    <Route path='/posts/:id' element={<PostDetails />}></Route>
                    <Route path='/' element={<div>Posts List</div>}></Route>
                </Routes>
            </MemoryRouter>
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays the fetch post data', async () => {

        postService.fetchPost.mockResolvedValue(mockPost);

        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(mockPost.title)).toBeInTheDocument();
            expect(screen.getByText(mockPost.body)).toBeInTheDocument();
        });
    });

    it('handles the error when fetching the post', async () => {
            
        const error = new Error('Failed to fetch');
        postService.fetchPost.mockRejectedValue(error);
        const consoleSpy = jest.spyOn(console, 'error')
        consoleSpy.mockImplementation(jest.fn());

        renderComponent();

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch the post: ', error)
        });
        consoleSpy.mockRestore();
    });

    it('deletes the post and redirects to the post list', async () => {
        postService.fetchPost.mockResolvedValue(mockPost);
        postService.deletePost.mockResolvedValue();

        renderComponent();

        await waitFor(() => {
            fireEvent.click(screen.getByText('Delete'));
        });

        await waitFor(() => {
            expect(postService.deletePost).toHaveBeenCalledTimes(1);
            expect(screen.getByText('Posts List')).toBeInTheDocument();
        });
    });

    it('handles the error when deleting the post', async () => {
        postService.fetchPost.mockResolvedValue(mockPost);
        const error = new Error('Failed to delete post');
        postService.deletePost.mockRejectedValue(error);
        const consoleSpy = jest.spyOn(console, 'error')
        consoleSpy.mockImplementation(jest.fn());

        renderComponent();

        await waitFor(() => {
            fireEvent.click(screen.getByText('Delete'));
        });

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Failed to delete the post: ', error)
        });
        consoleSpy.mockRestore();
    });
});