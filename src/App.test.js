import { render, screen } from '@testing-library/react';
import {App, CandidateReview, NewCandidateCard, CandidateList} from './App';


test('renders Review candidate card', () => {
  render(<App />);
  const linkElement = screen.getByText(/Review Candidate/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Review candidate card', () => {
  render(<CandidateReview/>);
  let linkElement = screen.getByText(/Review Candidate/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Review Candidate/i);
  expect(linkElement).toBeInTheDocument();
});