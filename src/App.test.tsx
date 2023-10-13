import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

test('renders compound interest calculator title', () => {
  render(<App />);
  const titleElement = screen.getByTestId('calculator-title');
  expect(titleElement).toBeInTheDocument();
});

test('calculates results correctly', () => {
  render(<App />);
  const principalInput = screen.getByLabelText("principal-input");
  const interestRateInput = screen.getByLabelText("interest-rate-input");
  const contributionInput = screen.getByLabelText("contribution-input");
  const yearsInput = screen.getByLabelText("years-input");
  const calculateButton = screen.getByRole('button', { name: /Calculate/i });

  fireEvent.change(principalInput, { target: { value: '1000' } });
  fireEvent.change(interestRateInput, { target: { value: '5' } });
  fireEvent.change(contributionInput, { target: { value: '100' } });
  fireEvent.change(yearsInput, { target: { value: '10' } });
  fireEvent.click(calculateButton);

  const balanceElement = screen.getByText(/Future investment value/i);
  const interestElement = screen.getByText(/Total rate of return/i);
  const additionalDepositsElement = screen.getByText(/Additional deposits/i);

  expect(balanceElement).toHaveTextContent('$2,886.68');
  expect(interestElement).toHaveTextContent('44.33%');
  expect(additionalDepositsElement).toHaveTextContent('$1,000.00');
});