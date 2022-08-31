import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('testando o formulario parte 2', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, 'testando@testando.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);
  });

  const chosenCard = 'Cartão de débito';
  const chosenTag = 'Alimentação';

  describe('testando o botão de excluir', () => {
    it('testa se apertando o botão de excluir, a tabela sai da tela', async () => {
      const inputValue = screen.getByTestId('value-input');
      const inputDescription = screen.getByTestId('description-input');
      const selectCurrency = screen.getByTestId('currency-input');
      const selectMethodPayment = screen.getByTestId('method-input');
      const selectTag = screen.getByTestId('tag-input');
      const btnAddExpense = screen.getByRole('button', { name: 'Adicionar despesa' });

      userEvent.type(inputValue, '10');
      userEvent.type(inputDescription, 'Hot Dog');
      userEvent.selectOptions(selectCurrency, 'EUR');
      userEvent.selectOptions(selectMethodPayment, chosenCard);
      userEvent.selectOptions(selectTag, chosenTag);
      userEvent.click(btnAddExpense);

      expect(fetch).toHaveBeenCalled();

      const btnDeleteExpense = await screen.findByRole('button', { name: 'Excluir' });

      userEvent.click(btnDeleteExpense);

      const sumExpense = await screen.findByRole('heading', { level: 3, name: '0.00' });
      const descriptionExpense = screen.queryByText('Hot Dog');
      const tagExpense = screen.queryAllByText('Alimentação');
      const methodPaymentSelected = screen.queryAllByText('Cartão de débito');
      const valorExpense = screen.queryByText('10.00');
      const currency = screen.queryByText('Euro/Real Brasileiro');
      const changeUsed = screen.queryByText('5.13');
      const convertedValue = screen.queryByText('51.27');
      const currencyConverted = screen.queryByText('Real');
      const btnEdit = screen.queryByText('button', { name: 'Editar' });
      const btnDelete = screen.queryByText('button', { name: 'Excluir' });

      expect(sumExpense).toBeInTheDocument();
      expect(descriptionExpense).not.toBeInTheDocument();
      expect(tagExpense).toHaveLength(1);
      expect(methodPaymentSelected).toHaveLength(1);
      expect(valorExpense).not.toBeInTheDocument();
      expect(currency).not.toBeInTheDocument();
      expect(changeUsed).not.toBeInTheDocument();
      expect(convertedValue).not.toBeInTheDocument();
      expect(currencyConverted).not.toBeInTheDocument();
      expect(btnEdit).not.toBeInTheDocument();
      expect(btnDelete).not.toBeInTheDocument();
    });
  });

  describe('testando o botão de editar', () => {
    it(`testa se ao clicar no botão, o botão de "adicionar dispesa"
        muda para "Editar despesa", verifica se preenchendo novamente os inputs
        e apertando no botão de "Editar despesa" se o valor da soma muda
        e a tabela atualiza`, async () => {
      const inputValue = screen.getByTestId('value-input');
      const inputDescription = screen.getByTestId('description-input');
      const selectCurrency = screen.getByTestId('currency-input');
      const selectMethodPayment = screen.getByTestId('method-input');
      const selectTag = screen.getByTestId('tag-input');
      const btnAddExpense = screen.getByRole('button', { name: 'Adicionar despesa' });

      userEvent.type(inputValue, '10');
      userEvent.type(inputDescription, 'Hot Dog');
      userEvent.selectOptions(selectCurrency, 'EUR');
      userEvent.selectOptions(selectMethodPayment, chosenCard);
      userEvent.selectOptions(selectTag, chosenTag);
      userEvent.click(btnAddExpense);

      const btnExpenseEdit = await screen.findByRole('button', { name: 'Editar' });
      userEvent.click(btnExpenseEdit);

      userEvent.type(inputValue, '20');
      userEvent.type(inputDescription, 'Game');
      userEvent.selectOptions(selectCurrency, 'USD');
      userEvent.selectOptions(selectMethodPayment, 'Dinheiro');
      userEvent.selectOptions(selectTag, 'Lazer');

      const btnExpenseEdited = screen.getByRole('button', { name: 'Editar despesa' });
      expect(btnExpenseEdited).toBeInTheDocument();

      userEvent.click(btnExpenseEdited);

      const sumExpenseAtt = screen.getByRole('heading', { level: 3, name: '95.06' });
      expect(sumExpenseAtt).toBeInTheDocument();
    });
  });
});
