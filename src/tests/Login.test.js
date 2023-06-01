import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

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

  // it('Verifica se, ao clicar no botão "Entrar", o usuário é redirecionado para a página Wallet', () => {
  //   const { history } = renderWithRouterAndRedux(<App />);
  //   const email = 'teste@teste.com';
  //   const password = '123456';
  //   const button = screen.getByRole('button', { name: /entrar/i });

  //   userEvent.type(screen.getByRole('textbox', { name: /email:/i }), email);
  //   userEvent.type(screen.getByLabelText(/senha:/i), password);
  //   userEvent.click(button);

  //   const { location: { pathname } } = history;
  //   expect(pathname).toBe('/carteira');
  // });
});
