import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';

describe('Testando o componente Header', () => {
  it('Verifica se é renderizado o email digitado na página de Login', () => {
    renderWithRouterAndRedux(<App />);
    const email = 'teste@teste.com';
    const password = '123456';
    userEvent.type(screen.getByTestId('email-input'), email);
    userEvent.type(screen.getByTestId('password-input'), password);
    userEvent.click(screen.getByText(/entrar/i));

    expect(screen.getByTestId('email-field').textContent).toBe(email);
  });

  it('Verifica se é renderizado o total das despesas', () => {
    renderWithRouterAndRedux(<Header />);
    expect(screen.getByTestId('total-field')).toBeInTheDocument();
  });

  it('Verifica se é renderizado o tipo da moeda que está sendo convertido:"BRL"', () => {
    renderWithRouterAndRedux(<Header />);
    expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
  });
});
