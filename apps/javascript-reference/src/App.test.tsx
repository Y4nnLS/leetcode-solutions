import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('filters the catalog through the accessible search field', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('Buscar no catálogo'), { target: { value: 'adicionar no começo' } });
    expect(screen.getByRole('heading', { name: 'unshift' })).toBeInTheDocument();
  });
});
