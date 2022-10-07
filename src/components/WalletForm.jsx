import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchingCurrenciesThunk,
  fetchingExchangeRates,
  actionEditedExpense,
} from '../redux/actions';
import '../styles/walletForm.css';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchingCurrenciesThunk());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  addExpenses = () => {
    const { dispatch, expenses } = this.props;
    const { currency, value } = this.state;
    const newExpense = {
      id: expenses.length,
      ...this.state,
    };

    dispatch(fetchingExchangeRates(newExpense, currency, value));

    this.setState({
      value: '',
      description: '',
    });
  };

  editedExpense = () => {
    const { dispatch } = this.props;
    dispatch(actionEditedExpense(this.state));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description } = this.state;

    return (
      <form className="formExpense">
        <label htmlFor="value" className="field">
          <h3>Valor</h3>
          <div className="control">
            <input
              className="input"
              type="number"
              name="value"
              id="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </div>
        </label>

        <label htmlFor="description" className="field">
          <h3>Descrição</h3>
          <div className="control">
            <input
              className="input"
              type="text"
              name="description"
              value={ description }
              id="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </div>
        </label>

        <label htmlFor="currency" className="control">
          <h3>Moeda</h3>
          <div className="select">
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((currency) => (
                <option key={ currency } value={ currency }>{ currency }</option>
              ))}
            </select>
          </div>
        </label>

        <label htmlFor="method" className="control">
          <h3>Método de pagamento</h3>
          <div className="select">
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>

          </div>
        </label>

        <label htmlFor="tag" className="control">
          <h3>Categoria</h3>
          <div className="select">
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
        </label>

        {
          editor ? (
            <div className="buttons">
              <button
                className="button is-primary"
                type="button"
                onClick={ this.editedExpense }
              >
                Editar despesa

              </button>
            </div>
          ) : (
            <div className="buttons">
              <button
                className="button is-primary"
                type="button"
                onClick={ this.addExpenses }
              >
                Adicionar despesa

              </button>
            </div>
          )
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  exchangeRates: state.wallet.exchangeRates,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
