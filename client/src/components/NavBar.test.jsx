import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar component', () => {
    const renderNavbar = () => {
        render(<NavBar />, { wrapper: MemoryRouter } );
    };

    test("renders both links", () => {
        // render the navbar
        renderNavbar();
        // expect the links to be there or something
        expect(screen.getByText("Posts List")).toBeInTheDocument();
        expect(screen.getByText("New Post")).toBeInTheDocument();

    })
})