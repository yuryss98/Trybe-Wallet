import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
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
              const { exchangeRates } = expense;
              const chaveASK = Number(exchangeRates[expense.currency].ask);
              const arredondarASK = Math.round((chaveASK + Number.EPSILON) * 100) / 100;

              const valorConvertido = chaveASK * Number(expense.value);
              const arredon = Math.round((valorConvertido + Number.EPSILON) * 100) / 100;

              const test1 = Number(expense.value).toFixed(2);

              return (
                <tr key={ expense.id }>
                  <td>
                    {' '}
                    { expense.description }
                    {' '}
                  </td>
                  <td>
                    {' '}
                    { expense.tag }
                  </td>
                  <td>
                    {' '}
                    { expense.method }
                  </td>
                  <td>
                    {' '}
                    { test1 }
                  </td>
                  <td>
                    {' '}
                    { expense.exchangeRates[expense.currency].name }
                  </td>
                  <td>
                    {' '}
                    { arredondarASK }
                  </td>
                  <td>
                    {' '}
                    { arredon }
                  </td>
                  <td>Real</td>
                  <td>Editar/Excluir</td>
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
};

export default connect(mapStateToProps)(Table);
