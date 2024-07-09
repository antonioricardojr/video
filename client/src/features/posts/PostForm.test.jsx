import { render, screen, fireEvent } from '@testing-library/react';
import PostForm from './PostForm';
import { act } from 'react';
import { waitFor } from '@testing-library/dom';
import { fetchAllPosts } from '../../services/postService';

describe('PostForm', () => {
    // post is null by default, for the instance when a new post is being created
    it('renders default inputs when no post prop is passed', () => {
        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const { getByLabelText } = render(<PostForm headerText="New Post" onSubmit={mockSubmit} buttonText={buttonText}/>);
        expect(getByLabelText('Title:')).toBeInTheDocument();
        expect(getByLabelText('Body:')).toBeInTheDocument();

    });

    it('renders passed in post data', () => {
        const mockPost = {
            title: "Test Post",
            body: "This is a test post",
            image: null
        }

        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const { getByLabelText } = render(<PostForm post={mockPost} headerText="Edit Post" onSubmit={mockSubmit} buttonText={buttonText}/>);

        expect(getByLabelText('Title:')).toBeInTheDocument();
        expect(getByLabelText('Body:')).toBeInTheDocument();
        expect(getByLabelText('Title:')).toHaveValue(mockPost.title);
        expect(getByLabelText('Body:')).toHaveValue(mockPost.body);
        
    });

    it('updates the input value on change', () => {
        const mockPost = {
            title: "Test Post",
            body: "This is a test post",
            image: null
        }

        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const { getByLabelText } = render(<PostForm post={mockPost} headerText="Edit Post" onSubmit={mockSubmit} buttonText={buttonText}/>);

        fireEvent.change(getByLabelText('Title:'), { target: { value: "New Title" } });
        fireEvent.change(getByLabelText('Body:'), { target: { value: "New Body" } });

        expect(getByLabelText('Title:')).toHaveValue("New Title");
        expect(getByLabelText('Body:')).toHaveValue("New Body");
    })

    it('calls onSubmit with the form data when submitted', async () => { 
        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const headerText = "New Post";
        const { getByLabelText, getByRole } = render(
        <PostForm headerText={headerText} onSubmit={mockSubmit} buttonText={buttonText}/>);

        const titleInput = getByLabelText('Title:');
        const bodyInput = getByLabelText('Body:');
        const imageInput = getByLabelText('Image:');
        const newTitle = "New Title";
        const newBody = "New Body";

        fireEvent.change(titleInput, { target: { value: newTitle } });
        fireEvent.change(bodyInput, { target: { value: newBody } });

        await act(async () => {
            fireEvent.click(getByRole('button', { name: buttonText}));
        });

        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith({ title: newTitle, body: newBody, image: ""});

    })

    it('handles image file upload', () => {
        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const headerText = "New Post";

        const consoleSpy = jest.spyOn(console, "log");
        consoleSpy.mockImplementation(() => {});

        const { getByLabelText } = render(
            <PostForm headerText={headerText} onSubmit={mockSubmit} buttonText={buttonText}/>
        )

        // Mock a file upload
        const file = new File(['(⌐□_□)'], 'sample.png', { type: 'image/png' });
        const imageInput = getByLabelText('Image:');
        fireEvent.change(imageInput, { target: { files: [file] } });
        expect(consoleSpy).toHaveBeenCalledWith(file);

    })

});