import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('testando componente Login', () => {
  it('verifica se ao renderizar o componente App a rota é /', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('verfica se tem os inputs na tela e verifica se eles funciona corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputEmail, 'testando');
    userEvent.type(inputPassword, '123456');

    expect(inputEmail.value).toBe('testando');
    expect(inputPassword.value).toBe('123456');
  });

  it(`verifica se tem o botão com texto "Entrar" e se esta desabilitado,
    e verifica se digitando email e senha correto o botao fica ativado, e se
    clicar no botao a rota altera para /carteira, e se o email digitado
    aparece na tela`, () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();

    expect(button.disabled).toBe(true);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');

    userEvent.type(inputEmail, 'testando@testando.com');
    userEvent.type(inputPassword, '123456');

    expect(button.disabled).toBe(false);

    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');

    const typedEmail = screen.getByRole('heading', { level: 3, name: 'testando@testando.com' });

    expect(typedEmail).toBeInTheDocument();
  });
});
