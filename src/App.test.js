import { render, screen } from '@testing-library/react';
import App from './App';

// Test runs the entire application.
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
