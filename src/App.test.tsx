import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders car finder game', () => {
  render(<App />);
  const titleElement = screen.getByText(/Car Finder Game/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders game mode selector', () => {
  render(<App />);
  const chooseChallengeElement = screen.getByText(/Choose Your Challenge/i);
  expect(chooseChallengeElement).toBeInTheDocument();
});

test('renders all game mode options', () => {
  render(<App />);
  const brandMultipleChoice = screen.getByText(/Brand Recognition - Multiple Choice/i);
  const brandInput = screen.getByText(/Brand Recognition - Input/i);
  const modelMultipleChoice = screen.getByText(/Model Recognition - Multiple Choice/i);
  const modelInput = screen.getByText(/Model Recognition - Input/i);
  
  expect(brandMultipleChoice).toBeInTheDocument();
  expect(brandInput).toBeInTheDocument();
  expect(modelMultipleChoice).toBeInTheDocument();
  expect(modelInput).toBeInTheDocument();
});
