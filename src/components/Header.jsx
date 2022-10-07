import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/header.css';

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
      <header className="header">
        <div>
          <h3 className="titleHeader">
            Trybe Wallet
            <i className="fa-solid fa-wallet" />
          </h3>
        </div>
        <div>
          <h3 data-testid="email-field">
            <i className="fa-solid fa-user" />
            { user }
          </h3>
          <div className="total">
            <h3 className="total">
              <i className="fa-solid fa-circle-dollar-to-slot" />
              Total:
            </h3>
            <h3
              data-testid="total-field"
              className="total"
            >
              { sumExpenses().toFixed(2) }

            </h3>
            <h3 data-testid="header-currency-field">BRL</h3>
          </div>
        </div>
      </header>
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
