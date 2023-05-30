import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';
import Wallet from '../pages/Wallet';

describe('Testando a página de Login', () => {
  it('Verifica se existe elementos input e label e para inserir o e-mail do usuário', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const emailLabel = screen.getByText(/email:/i);

    expect(emailInput).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
  });

  it('Verifica se existe elementos input e label para inserir a senha do usuário', () => {
    renderWithRouterAndRedux(<App />);
    const senhaInput = screen.getByLabelText(/senha:/i);
    const senhaLabel = screen.getByText(/senha:/i);

    expect(senhaInput).toBeInTheDocument();
    expect(senhaLabel).toBeInTheDocument();
  });

  it('Verifica se existe um botão "Entrar"', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeInTheDocument();
  });

  it('Verifica se o botão "Entrar" é habilitado ao preencher os campos: e-mail e senha, corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const email = 'teste@teste.com';
    const password = '123456';
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(screen.getByRole('textbox', email));
    userEvent.type(screen.getByLabelText(/senha:/i), password);

    expect(button.getAttribute('disabled')).toBe('');
  });
});

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
  it('Verifica se o elemento com o total das despesas, do componente Header, é atualizada após adicionar uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);
    userEvent.type(screen.getByTestId('value-input'), '100');
    userEvent.type(screen.getByTestId('description-input'), 'Roupas');
    userEvent.type(screen.getByTestId('currency-input'), 'USD');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    const totalExpensesElement = await (screen.findByTestId('total-field'));
    const totalExpensesValue = Number(totalExpensesElement.textContent);

    expect(totalExpensesValue).toBeCloseTo(505.58, 2);
  });
});
