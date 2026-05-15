import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Plated header', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /plated/i })).toBeInTheDocument();
});
