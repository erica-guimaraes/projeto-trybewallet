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
  // it('Verifica se o elemento com o total das despesas, do componente Header, é atualizada após adicionar uma despesa', async () => {
  //   const { store } = renderWithRouterAndRedux(<WalletForm />);
  //   const valueInput = userEvent.type(screen.getByTestId('value-input'), '100.00');
  //   userEvent.type(screen.getByTestId('description-input'), 'Roupas');
  //   userEvent.type(screen.getByTestId('currency-input'), 'USD');
  //   userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

  //   const totalExpensesValue = await store.getState().wallet.totalExpenses;
  //   expect(totalExpensesValue).toBe(100.00);
  //   valueInput.forEach((firstExpense) => {
  //     expect(firstExpense).toBeInTheDocument();
  //   });
  // });
});
describe('Testando o componente Table', () => {
  it('Verifica se é renderizado uma tabela com o cabeçalho coreto', () => {
    renderWithRouterAndRedux(<Wallet />);
    const description = screen.getByRole('columnheader', { name: /descrição/i });
    const category = screen.getByRole('columnheader', { name: /tag/i });
    const method = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const value = screen.getByText('Valor');
    const coin = screen.getByText('Moeda');
    const exchangeUsed = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const convertedValue = screen.getByRole('columnheader', { name: /valor convertido/i });
    const conversionCurrency = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const editDelete = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(description).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
    expect(exchangeUsed).toBeInTheDocument();
    expect(convertedValue).toBeInTheDocument();
    expect(conversionCurrency).toBeInTheDocument();
    expect(editDelete).toBeInTheDocument();
  });
  it('Verifica se ao adicionar uma despesa, a mesma é renderizada na tabela e a funcionalidade do botão "Excluir"', async () => {
    renderWithRouterAndRedux(<Wallet />);
    userEvent.type(screen.getByTestId('value-input'), '100');
    userEvent.type(screen.getByTestId('description-input'), 'Roupas');
    userEvent.type(screen.getByTestId('currency-input'), 'USD');
    userEvent.type(screen.getByTestId('method-input'), 'Cartão de crédito');
    userEvent.type(screen.getByTestId('tag-input'), 'Lazer');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    await screen.findByText('Roupas');
    await screen.findByText('Lazer');
    await screen.findByText('Cartão de crédito');
    await screen.findByText('100.00');
    await screen.findByText('Dólar Americano/Real Brasileiro');
    // await screen.findByText((5.10).toFixed(2));
    // await screen.findByText((509.51).toFixed(2));
    await screen.findByText('Real');
    await screen.findByText('Excluir');
    const excluir = screen.getByRole('button', { name: /excluir/i });
    expect(excluir).toBeInTheDocument();
    userEvent.click(excluir);
  });
});
