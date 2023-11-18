import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CloseButton from './CloseButton';

test('CloseButton renders correctly and triggers onClick', () => {
  const mockOnClick = jest.fn();

  const { getByText } = render(<CloseButton onClick={mockOnClick} isSmall={false} />);

  const closeButton = getByText('X');

  expect(closeButton).toHaveClass('closeModalBtn');

  fireEvent.click(closeButton);

  expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test('CloseButton renders correctly with small style', () => {
  const { getByText } = render(<CloseButton onClick={() => {}} isSmall={true} />);

  const closeButton = getByText('X');

  expect(closeButton).toHaveClass('smallCloseButton');
});
