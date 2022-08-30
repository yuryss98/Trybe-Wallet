import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionRemoveExpenses, actionEditExpense } from '../redux/actions';

class Table extends Component {
  removeExpense = (expense) => {
    const { dispatch } = this.props;
    dispatch(actionRemoveExpenses(expense));
  };

  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(actionEditExpense(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>

        <tbody>
          {
            expenses.length && expenses.map((expense) => {
              const {
                exchangeRates,
                currency,
                value,
                description,
                id,
                tag,
                method,
              } = expense;

              const apiAskKey = Number(exchangeRates[currency].ask);
              const roundedAskKey = apiAskKey.toFixed(2);

              const total = apiAskKey * Number(value);
              const roundedTotal = total.toFixed(2);

              const roundedValue = Number(value).toFixed(2);

              return (
                <tr key={ id }>
                  <td>
                    { description }
                  </td>
                  <td>
                    { tag }
                  </td>
                  <td>
                    { method }
                  </td>
                  <td>
                    { roundedValue }
                  </td>
                  <td>
                    { exchangeRates[currency].name }
                  </td>
                  <td>
                    { roundedAskKey }
                  </td>
                  <td>
                    { roundedTotal }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editExpense(id) }
                    >
                      Editar

                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.removeExpense(expense) }
                    >
                      Excluir

                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
