import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

jest.mock('../features/posts/PostsList', () => {
    const MockPostsList = () => (
        <div>Your matcher for Posts List component here</div>
    );
    return MockPostsList;
});

jest.mock('../features/posts/PostDetails', () => {
    const MockPostDetails = () => (
        <div>Your matcher for Post Details component here</div>
    );

    return MockPostDetails;
 });

 jest.mock('../features/posts/NewPostForm', () => {
    const MockNewPostForm = () => (
        <div>Your matcher for New Post Form component here</div>
    );

    return MockNewPostForm;
});

jest.mock('../features/posts/EditPostForm', () => {
    const MockEditPostForm = () => (
        <div>Your matcher for Edit Post Form component here</div>
    );

    return MockEditPostForm;
 });

// jest.mock("../constants", () => ({ 
//     API_URL: "http://your-test-api-url"})
// );

describe('AppRoutes component', () => {  
    const renderWithRouter = (ui, {initialEntries = ["/"]} = {}) => {
        return render(ui, { wrapper: ({ children}) => (
            <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
        ) 
        });
    };
    test('root path renders PostList', () => {
        renderWithRouter(<AppRoutes />, { initialEntries: ['/']});
        const expectedText = "Your matcher for Posts List component here";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    test('post details path renders PostDetails', () => {
        renderWithRouter(<AppRoutes />, { initialEntries: ['/posts/1'] });
        const expectedText = "Your matcher for Post Details component here";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    test('/new path renders NewPostForm', () => { 
        renderWithRouter(<AppRoutes />, { initialEntries: ['/new'] });
        const expectedText = "Your matcher for New Post Form component here";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    test('/posts/:id/edit path renders EditPostForm', () => {
        renderWithRouter(<AppRoutes />, { initialEntries: ['/posts/1/edit'] });
        const expectedText = "Your matcher for Edit Post Form component here";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
});