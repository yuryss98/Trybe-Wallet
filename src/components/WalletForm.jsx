import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchingCurrenciesThunk } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchingCurrenciesThunk());
  }

  render() {
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="expenseAmount">
          Valor:
          <input
            type="number"
            name="expenseAmount"
            id="expenseAmount"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="expenseDescription">
          Descrição:
          <input
            type="text"
            name="expenseDescription"
            id="expenseDescription"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
          >
            {currencies.map((test) => (
              <option key={ test } value="">{ test }</option>
            ))}
          </select>
        </label>

        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select
            name="paymentMethod"
            id="paymentMethod"
            data-testid="method-input"
          >
            <option value="">Dinheiro</option>
            <option value="">Cartão de crédito</option>
            <option value="">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="category">
          Categoria:
          <select
            name="category"
            id="category"
            data-testid="tag-input"
          >
            <option value="">Alimentação</option>
            <option value="">Lazer</option>
            <option value="">Trabalho</option>
            <option value="">Transporte</option>
            <option value="">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
