import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const headerlement = screen.getByText(/Outages/i);
  expect(headerlement).toBeInTheDocument();
});
