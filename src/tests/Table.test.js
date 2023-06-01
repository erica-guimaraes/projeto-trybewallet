import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

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
