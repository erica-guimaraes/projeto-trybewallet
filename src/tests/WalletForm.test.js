import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testando o componente WalletForm', () => {
  it('Verifica se existe um formulário para adicionar uma despesa', () => {
    renderWithRouterAndRedux(<App />);
    const email = 'erica@teste.com';
    const password = '123456';
    userEvent.type(screen.getByTestId('email-input'), email);
    userEvent.type(screen.getByTestId('password-input'), password);
    userEvent.click(screen.getByText(/entrar/i));

    const value = screen.getByRole('spinbutton', { name: /valor:/i });
    const description = screen.getByRole('textbox', { name: /descrição:/i });
    const coin = screen.getByRole('combobox', { name: /moeda:/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const category = screen.getByRole('combobox', { name: /categoria:/i });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('Verifica se existe no formulário os códigos de moédas e se ocorreu alguma chamada a função fetch', () => {
    const currenciesArray = Object.values(mockData)
      .map((elemento) => elemento.code);
    const loginStep = () => {
      renderWithRouterAndRedux(<App />);
      const email = 'teste@teste.com';
      const emailInput = screen.getByRole('textbox', { name: /email:/i });
      const passwordInput = screen.getByLabelText(/senha:/i);
      const button = screen.getByRole('button', { name: /entrar/i });
      userEvent.type(emailInput, email);
      userEvent.type(passwordInput, '123456');
      userEvent.click(button);
    };
    const spyFetch = jest.spyOn(global, 'fetch');
    loginStep();
    currenciesArray.forEach(async (currency) => {
      const currencyText = await screen.findByText(currency);
      expect(currencyText).toBeInTheDocument();
    });
    expect(spyFetch).toHaveBeenCalled();
  });
});
