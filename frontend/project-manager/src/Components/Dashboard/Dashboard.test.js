import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Dashboard from './Dashboard';

import '@testing-library/jest-dom';


jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: [] }),
}));

describe('Dashboard Component', () => {
  test('renders without crashing', () => {
    render(
        <Router>
            <Dashboard />
        </Router>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders projects when loaded', async () => {
    render(
        <Router>
            <Dashboard />
        </Router>
    );
    expect(await screen.findByText(/team projects/i)).toBeInTheDocument();
  });
});
