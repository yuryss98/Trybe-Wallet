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

              const valueConverted = apiAskKey * Number(value);
              const roundedConvertedValue = valueConverted.toFixed(2);

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
                    { roundedConvertedValue }
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
