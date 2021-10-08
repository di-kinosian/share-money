import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Profile link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Profile/i);
    expect(linkElement).toBeInTheDocument();
});
