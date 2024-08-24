import { render, screen } from '@testing-library/react';
import React from 'react';

import { Container } from '@/components/layout/container';

jest.mock('@/lib/utils', () => ({
  cn: (...classes) => classes.join(' '),
}));

describe('container', () => {
  it('should render children correctly', () => {
    render(
      <Container>
        <span>element</span>
      </Container>
    );

    expect(screen.getByText('element')).toBeInTheDocument();
  });

  it('should apply default and additional class names', () => {
    render(
      <Container className="extra-class">
        <span>element</span>
      </Container>
    );

    const containerElement = screen.getByText('element').parentElement;
    expect(containerElement).toHaveClass('container mx-auto extra-class');
  });
});
