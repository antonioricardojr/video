import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostsList from './PostsList';
import * as postService from '../../services/postService';

jest.mock('../../constants', () => ({ 
    API_URL: 'https://api.example.com'
}));

global.console.error = jest.fn();

jest.mock('../../services/postService', () => ({
    fetchAllPosts: jest.fn(),
    deletePost: jest.fn()
}));

describe('PostsList component', () => {

    const mockPosts = [
        { id: 1, title: "Post 1", body: "Hello World"},
        { id: 2, title: "Post 2", body: "Hello World" },
    ]

    beforeEach(() => {
        postService.fetchAllPosts.mockResolvedValue(mockPosts);
        postService.deletePost.mockResolvedValue();
    });

    test('renders PostsList component', async () => {
        render(<PostsList />, {wrapper: MemoryRouter});
        
        await waitFor(() => { screen.findByText("Post 1") });

        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post 2")).toBeInTheDocument();
    });

    test('it deletes a post when the delete button is clicked', async () => { 
        render(<PostsList />, {wrapper: MemoryRouter});
        
        const postText = "Post 1";
        await waitFor(() => { screen.findByText(postText) });

        fireEvent.click(screen.getAllByText("Delete")[0]);

        await waitFor(() => expect(postService.deletePost).toHaveBeenCalledTimes(1));

        expect(screen.queryByText(postText)).not.toBeInTheDocument();

    });

    test('it sets the error message when fetching a post fails', async () => {

        // "Failed to fetch posts: ", e
        const error = new Error("An error occured!");
        postService.fetchAllPosts.mockRejectedValue(error);

        render(<PostsList />, {wrapper: MemoryRouter});

        await waitFor(() => {

            //TODO: spy on the console instead of mocking it
            expect(console.error).toHaveBeenCalledWith(
                "Failed to fetch posts: ",
                error
            );
        });
    });

    test('it sets the error message when deleting a post fails', async () => {

        // "Failed to delete posts: ", e
        const error = new Error("An error occured!");
        postService.deletePost.mockRejectedValue(error);

        render(<PostsList />, {wrapper: MemoryRouter});

        const postText = "Post 1";
        await waitFor(() => { screen.findByText(postText) });

        fireEvent.click(screen.getAllByText("Delete")[0]);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(
                "Failed to delete posts: ",
                error
            );
        });
    });

});

describe('PostList component image_url rendering', () => {
    const mockPostWithImageUrl = [
        {
            id: 1,
            title: "Post with Image",
            body: "Hello World!",
            image_url: "https://picsum.photos/200",
        }
    ]
    
    const mockPostWithoutImageUrl = [
        {
            id: 2,
            title: "Post without Image",
            body: "Hello World!",
            image_url: null
        }
    ]

    test('renders the image with image_url exists', async () => {
        postService.fetchAllPosts.mockResolvedValue(mockPostWithImageUrl);
        render(<PostsList />, { wrapper: MemoryRouter });
        await waitFor(() => screen.getByText(mockPostWithImageUrl[0].title));


        const imgElement = screen.getByAltText(mockPostWithImageUrl[0].title);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement.src).toBe(mockPostWithImageUrl[0].image_url);

    });

    test('renders the placeholder div when image_url does not exist', async () => {
        postService.fetchAllPosts.mockResolvedValue(mockPostWithoutImageUrl);

        render(<PostsList />, { wrapper: MemoryRouter });

        await waitFor(() => screen.getByText(mockPostWithoutImageUrl[0].title));

        const placeholderDiv = screen.getByTestId("post-image-stub");
        expect(placeholderDiv).toBeInTheDocument();

    })
})