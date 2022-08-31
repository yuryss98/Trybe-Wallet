import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('testando componente Wallet', () => {
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

  it(`verifica se o email digitado na tela de login aparece na
      tela, verifica se a soma das despesa começa com "0.00", verifica se aparece
      a moeda  "BRL" e se a função fetch foi chamada`, () => {
    const email = screen.getByRole('heading', { level: 3, name: 'testando@testando.com' });
    const sumExpense = screen.getByRole('heading', { level: 3, name: '0.00' });
    const currency = screen.getByRole('heading', { level: 3, name: 'BRL' });

    expect(email).toBeInTheDocument();
    expect(sumExpense).toBeInTheDocument();
    expect(currency).toBeInTheDocument();

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  describe('testando o formulario de adicionar despesa', () => {
    it(`verifica se aprece na telas os inputs de : "valor", "Descrição"
        "Moeda", "Método de pagamento", "Categoria", e um botão
        com texto "Adicionar Despesa`, () => {
      const inputValue = screen.getByTestId('value-input');
      const inputDescription = screen.getByTestId('description-input');
      const selectCurrency = screen.getByTestId('currency-input');
      const selectMethodPayment = screen.getByTestId('method-input');
      const selectTag = screen.getByTestId('tag-input');
      const btnAddExpense = screen.getByRole('button', { name: 'Adicionar despesa' });

      expect(inputValue).toBeInTheDocument();
      expect(inputDescription).toBeInTheDocument();
      expect(selectCurrency).toBeInTheDocument();
      expect(selectMethodPayment).toBeInTheDocument();
      expect(selectTag).toBeInTheDocument();
      expect(btnAddExpense).toBeInTheDocument();
    });

    it(`verfica se na tela tem um Table, e se esse table tem as colunas
        com os nomes corretos`, () => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();

      const thElements = [
        'Descrição',
        'Tag',
        'Método de pagamento',
        'Valor', 'Moeda',
        'Câmbio utilizado',
        'Valor convertido',
        'Moeda de conversão',
        'Editar/Excluir',
      ];

      thElements.forEach((el) => {
        const thElement = screen.getByText(el);
        expect(thElement).toBeInTheDocument();
      });
    });
  });

  describe('testandos os inputs e o botão de adicionar despesa', () => {
    it(`verifica se é possivel digitar ou escolher itens nos inputs
        e se clicar no botão de "Adicionar despesa" os valores dos inputs
        aparecem na tabela`, async () => {
      const inputValue = screen.getByTestId('value-input');
      const inputDescription = screen.getByTestId('description-input');
      const selectCurrency = screen.getByTestId('currency-input');
      const selectMethodPayment = screen.getByTestId('method-input');
      const selectTag = screen.getByTestId('tag-input');
      const btnAddExpense = screen.getByRole('button', { name: 'Adicionar despesa' });
      const chosenCard = 'Cartão de débito';
      const chosenTag = 'Alimentação';

      userEvent.type(inputValue, '10');
      userEvent.type(inputDescription, 'Hot Dog');
      userEvent.selectOptions(selectCurrency, 'EUR');
      userEvent.selectOptions(selectMethodPayment, chosenCard);
      userEvent.selectOptions(selectTag, chosenTag);

      expect(inputValue.value).toBe('10');
      expect(inputDescription.value).toBe('Hot Dog');
      expect(selectCurrency.value).toBe('EUR');
      expect(selectMethodPayment.value).toBe(chosenCard);
      expect(selectTag.value).toBe(chosenTag);

      userEvent.click(btnAddExpense);

      const sumExpense = await screen.findByRole('heading', { level: 3, name: '51.27' });
      const descriptionExpense = screen.getByText('Hot Dog');
      const tagExpense = screen.getAllByText('Alimentação');
      const methodPaymentSelected = screen.getAllByText('Cartão de débito');
      const valorExpense = screen.getByText('10.00');
      const currency = screen.getByText('Euro/Real Brasileiro');
      const changeUsed = screen.getByText('5.13');
      const convertedValue = screen.getAllByText('51.27');
      const currencyConverted = screen.getByText('Real');
      const btnEdit = screen.getByRole('button', { name: 'Editar' });
      const btnDelete = screen.getByRole('button', { name: 'Excluir' });

      expect(sumExpense).toBeInTheDocument();
      expect(descriptionExpense).toBeInTheDocument();
      expect(tagExpense).toHaveLength(2);
      expect(methodPaymentSelected).toHaveLength(2);
      expect(valorExpense).toBeInTheDocument();
      expect(currency).toBeInTheDocument();
      expect(changeUsed).toBeInTheDocument();
      expect(convertedValue).toHaveLength(2);
      expect(currencyConverted).toBeInTheDocument();
      expect(btnEdit).toBeInTheDocument();
      expect(btnDelete).toBeInTheDocument();
    });
  });
});
