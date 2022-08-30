import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;

    const sumExpenses = () => expenses.reduce((acc, curr) => {
      const { currency, value, exchangeRates } = curr;

      const exchangeRate = Number(exchangeRates[currency].ask);
      const total = exchangeRate * Number(value);
      acc += total;
      return acc;
    }, 0);

    return (
      <div>
        <h3 data-testid="email-field">{ user }</h3>
        <h3 data-testid="total-field">{ sumExpenses().toFixed(2) }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(Header);
