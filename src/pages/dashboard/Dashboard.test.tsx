import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import the library

import Dashboard from '.';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('firebase/firestore', () => ({
  onSnapshot: jest.fn(),
  snapshotEqual: jest.fn(),
  doc: jest.fn(),
}));

describe('Dashboard component', () => {
  test('renders the component', () => {
    render(<Dashboard />);
    expect(screen.getByText('My Brand')).toBeInTheDocument();
  });

  test('opens and closes the modal', () => {
    render(<Dashboard />);
    
    // Check that the modal is closed initially
    expect(screen.queryByTestId('modal')).toBeNull();

    // Trigger the "Add Category" button click
    fireEvent.click(screen.getByText('Add Category'));

    // Check that the modal is open
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // Trigger the modal close
    fireEvent.click(screen.getByText('Close Modal'));

    // Check that the modal is closed
    expect(screen.queryByTestId('modal')).toBeNull();
  });

  // Add more tests based on your component functionality
});
