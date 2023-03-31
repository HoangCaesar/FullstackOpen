import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { AddBlogForm, Blog, Togglable } from '../components';

describe('Blog component tests', () => {
    const blog = {
        title: 'How to use console log like a pro coder?',
        author: 'Aemond',
        url: 'fullstack.edu.vn',
        likes: 100,
    };
    const mockLikeHandler = jest.fn();
    const mockAddHandler = jest.fn();
    test('renders title and author of a blog', () => {
        render(<Blog blog={blog} />);

        const elementTitle = screen.getByText('Title: How to use console log like a pro coder?');
        const elementAuthor = screen.getByText('Author: Aemond');

        // screen.debug(element);

        expect(elementTitle).toBeDefined();
        expect(elementAuthor).toBeDefined();

        // const { container } = render(<Blog blog={blog} />);

        // const div = container.querySelector('.blog');
        // expect(div).toHaveTextContent('How to use console log like a pro coder?');
    });

    test('a test which checks that the url and number of likes of a blog are shown when the button controlling the shown details has been clicked.', async () => {
        const { container } = render(
            <Blog blog={blog}>
                <Togglable buttonLabel="view">
                    <div className="testDiv">togglable content</div>
                </Togglable>
            </Blog>
        );

        const user = userEvent.setup();
        const button = screen.getByText('view');
        await user.click(button);

        const div = container.querySelector('.togglableContent');
        expect(div).not.toHaveStyle('display: none');

        const elementUrl = screen.getByText('URL: fullstack.edu.vn');
        const elementLikes = screen.getByText('Likes: 100');

        expect(elementUrl).toHaveTextContent('URL: fullstack.edu.vn');
        expect(elementLikes).toHaveTextContent('Likes: 100');
    });

    test('like button is clicked twice', async () => {
        render(
            <Blog blog={blog} onLike={mockLikeHandler}>
                <Togglable buttonLabel="view">
                    <div className="testDiv">togglable content</div>
                </Togglable>
            </Blog>
        );

        const user = userEvent.setup();
        const buttonView = screen.getByText('view');
        await user.click(buttonView);
        const buttonLike = screen.getByText('like');
        await user.click(buttonLike);
        await user.click(buttonLike);

        expect(mockLikeHandler.mock.calls).toHaveLength(2);
    });

    test('a test for the new blog form', async () => {
        const user = userEvent.setup();

        render(<AddBlogForm onAdd={mockAddHandler} />);

        const sendButton = screen.getByText('Create');
        await user.click(sendButton);

        expect(mockAddHandler.mock.calls).toHaveLength(1);
    });
});

describe('<Togglable />', () => {
    let container;

    beforeEach(() => {
        container = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv">togglable content</div>
            </Togglable>
        ).container;
    });

    test('renders its children', async () => {
        await screen.findAllByText('togglable content');
    });

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.togglableContent');
        expect(div).toHaveStyle('display: none');
    });

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup();
        const button = screen.getByText('show...');
        await user.click(button);

        const div = container.querySelector('.togglableContent');
        expect(div).not.toHaveStyle('display: none');
    });

    test('toggled content can be closed', async () => {
        const user = userEvent.setup();
        const button = screen.getByText('show...');
        await user.click(button);

        const closeButton = screen.getByText('Cancel');
        await user.click(closeButton);

        const div = container.querySelector('.togglableContent');
        expect(div).toHaveStyle('display: none');
    });
});

test('<AddBlogForm /> updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn();
    const user = userEvent.setup();

    render(<AddBlogForm onAdd={createNote} />);

    // const input = screen.getAllByRole('textbox');
    const input = screen.getByPlaceholderText('write title of blog here');
    const sendButton = screen.getByText('Create');

    await user.type(input, 'testing a form...');
    await user.click(sendButton);

    expect(createNote.mock.calls).toHaveLength(1);
    expect(createNote.mock.calls[0][0].title).toBe('testing a form...');
});
